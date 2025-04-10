/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.3
 * @since 2025/03/20
 * 
 * funcion para filtrar los libros
 */

export function filtrarLibros(searchTerm, data) {
    return data.map(clase => {
         // Si el nombre de la clase coincide, incluir todos sus libros
         const claseCoincide = clase.clase_nombre.toLowerCase().includes(searchTerm);

         // Filtrar libros que coincidan con el término (solo si la clase no coincide)
         const librosFiltrados = claseCoincide 
             ? clase.libros 
             : clase.libros.filter(libro => {
                 const titulo = libro.titulo.toLowerCase();
                 const editorial = libro.editorial.toLowerCase();
                 return titulo.includes(searchTerm) || editorial.includes(searchTerm);
             });
 
         // Retorna la clase solo si tiene libros o coincide con el nombre de la clase
         return librosFiltrados.length > 0 ? { ...clase, libros: librosFiltrados } : null;
    }).filter(clase => clase !== null);
}