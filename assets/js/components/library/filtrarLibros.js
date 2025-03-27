/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.3
 * @since 2025/03/20
 * 
 * funcion para filtrar los libros
 */

// En filtrarLibros.js
export function filtrarLibros(searchTerm, data) {
    return data
        .map(clase => {
            // Filtrar libros dentro de cada clase
            const librosFiltrados = clase.libros.filter(libro => {
                const titulo = libro.titulo.toLowerCase();
                const editorial = libro.editorial.toLowerCase();
                const claseNombre = clase.clase_nombre.toLowerCase();
                return (
                    titulo.includes(searchTerm) ||
                    editorial.includes(searchTerm) ||
                    claseNombre.includes(searchTerm)
                );
            });
            // Conservar la estructura de la clase con los libros filtrados
            return { ...clase, libros: librosFiltrados };
        })
        // Eliminar clases sin libros después del filtrado
        .filter(clase => clase.libros.length > 0);
}