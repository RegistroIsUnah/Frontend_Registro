import { ConstValues } from "../utils/constValues.js";
import { loadRegisterBookForm } from "../components/library/loadLibraryView.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.2
 * @since 2025/03/19
 */

// Función para cargar libros por departamento
export function loadBooks() {
    const token = sessionStorage.getItem('token');
    const rolActivo = sessionStorage.getItem('rol_activo'); // Obtener el rol activo
    const docenteId = sessionStorage.getItem('docente_id');

    if (!token || !rolActivo) {
        console.error('Usuario no autenticado o rol no definido');
        return;
    }

    if (rolActivo == "jefe de departamento") {
        // Obtener el departamento asociado al docente
        obtenerDepartamento(docenteId)
            .then(departamento => {
                console.log(departamento);

                // Obtener los libros del departamento
                const departamentoId = departamento.dept_id;
                obtenerLibrosPorDepartamento(docenteId, departamentoId);
            })
            .catch(error => {
                console.error('Error al obtener el departamento:', error);
            });

    } else if (rolActivo === "estudiante") {
        // Lógica para estudiantes (ya implementada)
        const estudianteId = sessionStorage.getItem('estudiante_id');
        if (!estudianteId) {
            console.error('ID de estudiante no encontrado');
            return;
        }
        const url = `${ConstValues.DOMAIN_NAME}/get/obtener_libros_estudiante.php?estudiante_id=${estudianteId}`;
        fetchBooks(url, 'estudiante');
    } else {
        console.error('Rol no válido:', rolActivo);
    }
}

// Función para obtener el departamento asociado al docente
function obtenerDepartamento(docenteId) {
    const url = `${ConstValues.DOMAIN_NAME}/get/departamentos.php`;

    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${docenteId}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el departamento');
        }
        return response.json();
    })
    .then(data => {
        // Buscar el departamento asociado al docente
        const departamento = data.find(dept => dept.jefe_docente_id === docenteId);

        if (!departamento) {
            throw new Error('No se encontró un departamento para este docente');
        }

        // Devolver el ID del departamento
        //console.log(departamento);
        sessionStorage.setItem('depto', departamento.dept_id)
        return departamento.dept_id; 
    });
}

// Función para obtener los libros por departamento
function obtenerLibrosPorDepartamento(docenteId, departamentoId) {
    const deptoId = sessionStorage.getItem('depto');

    const url = `${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_departamento.php?departamentoId=${departamentoId}`;

    // Depurar la solicitud
    console.log('URL de la solicitud:', url);
    console.log('Autenticación:', docenteId);
    console.log('ID del departamento:', deptoId);


    fetchBooks(url, 'jefe de departamento');
}

// Función genérica para obtener y renderizar libros
function fetchBooks(url, rol) {
    const token = sessionStorage.getItem('token');

    fetch(url, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('Error al cargar los libros');
        }
        return response.json();
    })
    .then(data => {


        // Limpiar el contenedor de libros (si existe)
        const bookContainer = document.getElementById('bookContainer');
        if (!bookContainer) {
            console.warn("El contenedor de libros no fue encontrado en el DOM.");
            return;
        }
        bookContainer.innerHTML = '';

        // Mostrar los libros en el contenedor
        if (rol === 'estudiante') {
            data.forEach(clase => {
                //console.log(data);
                const claseTitle = `<h2 class="mt-4">${clase.clase_nombre}</h2>`;
                bookContainer.innerHTML += claseTitle;

                clase.libros.forEach(libro => {
                    const bookCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card book-card" data-bs-toggle="modal" data-bs-target="#pdfModal" onclick="loadPDF('${libro.libro_url}')">
                                <div class="card-body">
                                    <h5 class="card-title">${libro.titulo}</h5>
                                    <p class="card-text">Editorial: ${libro.editorial}</p>
                                    <p class="card-text">${libro.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    bookContainer.innerHTML += bookCard;
                });
            });
        } else if (rol === 'Jefe de departamento') {
            // Renderizar libros para jefe de departamento
            data.forEach(clase => {
                console.log(data);

                const estado = `
                <div class="estado" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <select style="width: 100%; padding: 10px;">
                            <option value="">Seleccionar estado</option>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </div>
                    <div>
                        <button id="addBook" onclick="loadRegisterBookForm()" type="button" class="btn btn-success">Agregar Libro</button>
                    </div>
                </div>
            `;

            bookContainer.innerHTML += estado;

                const claseTitle = `<h2 class="mt-4">${clase.clase_nombre}</h2>`;
                bookContainer.innerHTML += claseTitle;

                let bookCards = ''; 

                clase.libros.forEach(libro => {
                    const bookCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card book-card">
                                <div class="card-body" onclick="openModal('${libro.libro_url}')">
                                    <h5 class="card-title">${libro.titulo}</h5>
                                    <p class="card-text">Editorial: ${libro.editorial}</p>
                                    <p class="card-text">${libro.descripcion}</p>
                                    <div>
                                        <button type="button" class="btn btn-success" onclick="handleEdit(event)">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    bookCards += bookCard; 
                });
                
                bookContainer.innerHTML += bookCards;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Variable global para almacenar la URL del PDF actual
let currentPdfUrl = '';

// Función para cargar el PDF en el modal (ámbito global)
window.loadPDF = function(pdfUrl) {
    currentPdfUrl = pdfUrl; // Guardar la URL del PDF
    const iframe = document.getElementById('pdfViewer');
    iframe.src = pdfUrl + "#page=1&toolbar=0&navpanes=0&scrollbar=0"; // Mostrar la primera página
    document.getElementById('pageNumber').value = 1; // Reiniciar el campo de búsqueda

    // Bloquear clic derecho dentro del iframe
    iframe.addEventListener('load', function() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('El clic derecho está deshabilitado en el PDF.');
        });
    });
};


// Función para ir a una página específica del PDF
window.goToPage = function() {
    const pageNumber = document.getElementById('pageNumber').value;
    const iframe = document.getElementById('pdfViewer');
    iframe.src = `${currentPdfUrl}#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`;
};

// Evento para cargar los libros cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    const bookContainer = document.getElementById('bookContainer');
    if (bookContainer) {
        loadBooks();

        const searchInput = document.getElementById('searchInput');
        
        if (searchInput) {
            searchInput.addEventListener('input', function (event) {
                const searchQuery = event.target.value; // Obtener el texto de búsqueda
                loadBooks(searchQuery); // Cargar libros filtrados
            });
        } else {
            console.error("El campo de búsqueda no fue encontrado en el DOM.");
        }
    } 
});

