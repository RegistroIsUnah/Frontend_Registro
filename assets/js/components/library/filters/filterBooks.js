/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.3
 * @since 2025/03/20
 * 
 * funcion para filtrar los libros
 */

export function filterBooks(searchTerm, data) {
    // Normaliza texto removiendo acentos y convirtiendo a minúsculas
    const normalizeText = (text = '') => {
        return text
            .toLowerCase()
            .normalize("NFD")  // Separa caracteres base de sus acentos (ej: "México" → "M" + "é" + "xico")
            .replace(/[\u0300-\u036f]/g, "");  // Elimina los signos diacríticos (tildes)
    };

    const normalizedSearchTerm = normalizeText(searchTerm);

    return data
        .map(clase => {
            const librosFiltrados = clase.libros.filter(libro => {
                // Normalizar todos los campos relevantes
                const tituloNormalizado = normalizeText(libro.titulo);
                const claseNormalizado = normalizeText(clase.clase_nombre);

                return (
                    tituloNormalizado.includes(normalizedSearchTerm) ||
                    claseNormalizado.includes(normalizedSearchTerm)
                );
            });

            return { ...clase, libros: librosFiltrados };
        })
        .filter(clase => clase.libros.length > 0);  // Eliminar clases vacías
}