/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/03/21
 * 
 * Función encargada de cargar la vista de biblioteca.

 */

export function renderLibros(clases) {
    const bookContainer = document.getElementById("bookContainer");
    let container = '';

    clases.forEach(clase => {
        container += `<h3 class="mt-4">${clase.clase_nombre}</h3><hr><div class="row">`;

        clase.libros.forEach(libro => {
            container += `
                <div class="col-md-4 mb-4">
                    <div class="card book-card" onclick="openPDFModal('${libro.libro_url}')">
                        <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <p class="card-text">Editorial: ${libro.editorial}</p>
                            <p class="card-text">${libro.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        container += `</div>`;
    });

    bookContainer.innerHTML = container || "<p>No se encontraron libros.</p>"; // Mensaje si no hay resultados
}