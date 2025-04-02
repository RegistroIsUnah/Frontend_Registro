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

//CON PAGINACION 
const ITEMS_PER_PAGE = 10; // Libros por página
let currentPage = 1;
let originalData = []; //para poder filtrar

// Modifica la función renderLibros para incluir paginación
export function renderBooksWithPagination(clasesCompletas, isDocente = false, resetPagination = false) {
    if (resetPagination) {
        currentPage = 1;
    }
    
    // Aplanar solo los libros para paginación
    const allBooks = clasesCompletas.flatMap(clase => 
        Array.isArray(clase.libros) ? clase.libros : [clase]
    );
    
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = allBooks.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    
    // Reconstruir estructura de clases para los libros paginados
    const paginatedStructure = [];
    
    // Agrupar libros por sus clases originales
    const librosEnPagina = new Set(paginatedBooks.map(libro => libro.libro_id));
    
    clasesCompletas.forEach(clase => {
        if (typeof clase.clase_id !== 'undefined') {
            // Es una clase normal
            const librosFiltrados = clase.libros.filter(libro => 
                librosEnPagina.has(libro.libro_id)
            );
            
            if (librosFiltrados.length > 0) {
                paginatedStructure.push({
                    ...clase,
                    libros: librosFiltrados
                });
            }
        } else if (librosEnPagina.has(clase.libro_id)) {
            // Es un libro individual que coincidió por nombre
            paginatedStructure.push({
                clase_nombre: `Libro: ${clase.titulo}`,
                libros: [clase]
            });
        }
    });
    
    renderLibros(paginatedStructure, isDocente);
    renderPagination(totalPages, isDocente);
}

// Función para renderizar controles de paginación
function renderPagination(totalPages, isDocente) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return; // No mostrar paginación si solo hay una página
    
    const ul = document.createElement('ul');
    ul.className = 'pagination';
    
    // Botón "Anterior"
    ul.appendChild(createPaginationItem('Anterior', currentPage > 1, () => {
        if (currentPage > 1) {
            currentPage--;
            renderBooksWithPagination(originalData, isDocente);
        }
    },isDocente
    ));
    
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
