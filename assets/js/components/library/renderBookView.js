import { ConstValues } from "../../utils/constValues";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/20
 * 
 * funion para renderizar los libros segun rol ya sea estudiante, jefe o coordinador
 */

export function renderLibros(clasesCompletas, isDocente = false) {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = "";

    if (!bookContainer) return;

    let container = '';

    if (isDocente) {
        container += generateNewBook();
    }
    
    if (!clasesCompletas || !Array.isArray(clasesCompletas)) {
        bookContainer.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }
    
    container += clasesCompletas.map(clase => `
        
            <h3 class="class="mt-4">${clase.clase_nombre}</h3><hr>
            <div class="row">
                ${clase.libros.map(libro => libro.detalles 
                    ? generateBookCard(libro.detalles, isDocente)
                    : '<div class="text-danger">Error cargando libro</div>'
                ).join('')}
            </div>
        
    `).join('') || '<p class="text-muted">No se encontraron libros</p>';
    bookContainer.innerHTML = container;
}

function generateBookCard(libro, isDocente) {

    return ` 
    <div class="col-md-4 mb-4">
        <div class="card book-card">
            <div class="card-body">
                <div onclick="openPDFModal('${ConstValues.UPLOADS_BASE_URL}${libro.libro_url}')">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <p class="card-subtitle mb-2 text-muted">${libro.editorial}</p>
                    <p class="card-text">${libro.descripcion}</p>
                </div>
                
                <div class="autor-section mt-3">
                    <h6>Autor(es):</h6>
                    <ul class="list-unstyled">
                        ${libro.autores.map(autor => `
                            <li>${autor.nombre} ${autor.apellido}</li>
                        `).join('')}
                    </ul>
                </div>

                <div class="tags-section">
                    ${libro.tags.map(tag => `
                        <span class="badge bg-secondary me-1">${typeof tag === 'object' ? tag.tag_nombre : tag}</span>
                    `).join('')}
                </div>
                ${isDocente ? generateAdminControls(libro.libro_id) : ''}
            </div>
        </div>
    </div>
`;
}

function generateAdminControls(libroId) {
    return `
        <div class="admin-controls mt-3">

            <button type="button" class="btn btn-success" onclick="handleEditBook(${libroId})">
                Editar
            </button>
        </div>
    `;
}

function generateNewBook(){
    return `
        <div class="text-end mb-3">
            <button type="button" id="registerButton" class="btn" style="background-color: #12a9c2!important; color: white;">Agregar Libro</button>
        </div>
        `;
}