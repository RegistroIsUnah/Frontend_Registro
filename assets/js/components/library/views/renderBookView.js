import { ConstValues } from "../../../utils/constValues";
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

    if (!clasesCompletas || !Array.isArray(clasesCompletas)) {
        bookContainer.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }
    
    container += `
        <div class="row">
            ${clasesCompletas.map(libro => {
                if (!libro.detalles) {
                    return '<div class="text-danger col-12">Error cargando libro</div>';
                }
                
                // Si viene de una clase normal
                if (libro.clase_nombre) {
                    return generateBookCard(libro.detalles, isDocente, libro.clase_nombre);
                }
                // Si es un libro individual (búsqueda)
                return generateBookCard(libro, isDocente);
            }).join('') || '<p class="text-muted">No se encontraron libros</p>'}  
        </div>
    `
    bookContainer.innerHTML = container;
}

function generateBookCard(libro, isDocente, claseNombre = '') {

    return ` 
    <div class="col-md-4 mb-4">
        <div class="card book-card">
            <div class="card-body">
            ${claseNombre ? `<div class="class-name-badge mb-2"><span class="badge bg-primary">${claseNombre}</span></div>` : ''}
                <div onclick="openPDFModal('${ConstValues.UPLOADS_BASE_URL}${libro.libro_url}')">
                    <h5 class="card-title" >${libro.titulo}</h5><hr>
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

export function renderAddBookButton(isDocente) {
    const container = document.getElementById('registerButtonContainer');
    if (isDocente) {
        container.innerHTML = `
            <button id="registerButton" class="btn" style="background-color: #12a9c2!important; color: white;">
                Agregar Libro
            </button>
        `;
    } else {
        container.innerHTML = '';
    }
}

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/20
 * 
 * Util para la paginacion de los libros
 */

//CON PAGINACION 
const ITEMS_PER_PAGE = 12; // Libros por página
let currentPage = 1;
let originalData = []; //para poder filtrar

export function renderBooksWithPagination(clasesCompletas, isDocente = false, resetPagination = false) {
    if (resetPagination) {
        currentPage = 1;
    }
    
     const allBooks = clasesCompletas.flatMap(clase => {
        if (typeof clase.clase_id !== 'undefined') {
            return clase.libros.map(libro => ({
                ...libro,
                detalles: libro.detalles || libro,
                clase_nombre: clase.clase_nombre
            }));
        }
        return [clase];
    });
    
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = allBooks.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    
    renderLibros(paginatedBooks, isDocente);
    renderPagination(totalPages, isDocente);
}

// Función para renderizar controles de paginación
function renderPagination(totalPages, isDocente) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return; // No mostrar paginación si solo hay una página
    
    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center';
    
    // Botón "Anterior"
    ul.appendChild(createPaginationItem('Anterior', currentPage > 1, () => {
        if (currentPage > 1) {
            currentPage--;
            renderBooksWithPagination(originalData, isDocente);
        }
    }));
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        ul.appendChild(createPaginationItem(i, i !== currentPage, () => {
            currentPage = i;
            renderBooksWithPagination(originalData, isDocente);
        }, i === currentPage));
    }
    
    // Botón "Siguiente"
    ul.appendChild(createPaginationItem('Siguiente', currentPage < totalPages, () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderBooksWithPagination(originalData, isDocente);
        }
    }, isDocente));
    
    paginationContainer.appendChild(ul);
}

// Helper para crear elementos de paginación
function createPaginationItem(text, isEnabled, onClick, isActive = false) {
    const li = document.createElement('li');
    li.className = `page-item ${isActive ? 'active' : ''} ${!isEnabled ? 'disabled' : ''}`;
    
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = text;
    a.addEventListener('click', (e) => {
        e.preventDefault();
        if (isEnabled) onClick();
    });
    
    li.appendChild(a);
    return li;
}

export function setOriginalData(data) {
    originalData = data;
}

