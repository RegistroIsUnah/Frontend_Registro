
import { ConstValues } from "../../../utils/constValues";

/**
 * Función para renderizar los libros en lista plana con paginación
 */

// Configuración de paginación
const ITEMS_PER_PAGE = 12; // Libros por página
let currentPage = 1;
let originalData = []; // Para poder filtrar

// Función principal de renderizado
export function renderLibros(libros, isDocente = false) {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = "";

    if (!bookContainer) return;

    let container = '';

    if (!libros || !Array.isArray(libros)) {
        bookContainer.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }
    
    container += `
        <div class="row">
            ${libros.map(libro => {
                if (!libro.detalles) {
                    return '<div class="text-danger col-12">Error cargando libro</div>';
                }
                
                // Si viene de una clase normal
                if (libro.clase_nombre) {
                    return generateBookCard(libro.detalles, isDocente, libro.clase_nombre);
                }
                // Si es un libro individual (búsqueda)
                return generateBookCard(libro, isDocente);
            }).join('')}
        </div>
    ` || '<p class="text-muted">No se encontraron libros</p>';
    
    bookContainer.innerHTML = container;
}

// Función para generar tarjetas de libro individuales
function generateBookCard(libro, isDocente, claseNombre = '') {
    return ` 
    <div class="col-md-4 mb-4">
        <div class="card book-card">
            <div class="card-body d-flex flex-column">
                ${claseNombre ? `
                <div class="class-name-badge mb-2">
                    <span class="badge bg-primary text-truncate" title="${claseNombre}" >
                        ${claseNombre}
                    </span>
                </div>
                ` : ''}
                
                <div class="flex-grow-1" onclick="openPDFModal('${ConstValues.UPLOADS_BASE_URL}${libro.libro_url}')">
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

                <div class="tags-section mb-2">
                    ${libro.tags.map(tag => `
                        <span class="badge bg-secondary me-1 mb-1">${typeof tag === 'object' ? tag.tag_nombre : tag}</span>
                    `).join('')}
                </div>
                
                ${isDocente ? generateAdminControls(libro.libro_id) : ''}
            </div>
        </div>
    </div>
    `;
}

// Función para generar controles de administrador
function generateAdminControls(libroId) {
    return `
        <div class="admin-controls mt-auto pt-2">
            <button type="button" class="btn btn-success btn-sm" onclick="handleEditBook(${libroId})">
                Editar
            </button>
        </div>
    `;
}

// Renderizado con paginación
export function renderBooksWithPagination(clasesCompletas, isDocente = false, resetPagination = false) {
    if (resetPagination) {
        currentPage = 1;
    }
    
    // Aplanar la estructura de clases y libros
    const allBooks = clasesCompletas.flatMap(clase => {
        if (typeof clase.clase_id !== 'undefined') {
            // Es una clase normal - agregar nombre de clase a cada libro
            return clase.libros.map(libro => ({
                ...libro,
                detalles: libro.detalles || libro,
                clase_nombre: clase.clase_nombre
            }));
        }
        // Es un libro individual (resultado de búsqueda)
        return [clase];
    });
    
    // Calcular paginación
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = allBooks.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    
    // Renderizar libros paginados
    renderLibros(paginatedBooks, isDocente);
    renderPagination(totalPages, isDocente);
}

// Función para renderizar controles de paginación
function renderPagination(totalPages, isDocente) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center';
    
    // Botón "Anterior"
    ul.appendChild(createPaginationItem('&laquo; Anterior', currentPage > 1, () => {
        if (currentPage > 1) {
            currentPage--;
            renderBooksWithPagination(originalData, isDocente);
        }
    }));
    
    // Números de página
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        ul.appendChild(createPaginationItem('1', true, () => {
            currentPage = 1;
            renderBooksWithPagination(originalData, isDocente);
        }));
        if (startPage > 2) {
            ul.appendChild(createPaginationItem('...', false, null));
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        ul.appendChild(createPaginationItem(i, i !== currentPage, () => {
            currentPage = i;
            renderBooksWithPagination(originalData, isDocente);
        }, i === currentPage));
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            ul.appendChild(createPaginationItem('...', false, null));
        }
        ul.appendChild(createPaginationItem(totalPages, true, () => {
            currentPage = totalPages;
            renderBooksWithPagination(originalData, isDocente);
        }));
    }
    
    // Botón "Siguiente"
    ul.appendChild(createPaginationItem('Siguiente &raquo;', currentPage < totalPages, () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderBooksWithPagination(originalData, isDocente);
        }
    }));
    
    paginationContainer.appendChild(ul);
}

// Helper para crear elementos de paginación
function createPaginationItem(text, isEnabled, onClick, isActive = false) {
    const li = document.createElement('li');
    li.className = `page-item ${isActive ? 'active' : ''} ${!isEnabled ? 'disabled' : ''}`;
    
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.innerHTML = text;
    if (isEnabled && onClick) {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            onClick();
        });
    }
    
    li.appendChild(a);
    return li;
}

// Función para establecer datos originales
export function setOriginalData(data) {
    originalData = data;
}

// Función para renderizar botón de agregar libro
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