
import { ConstValues } from "../utils/constValues.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.2
 * @since 2025/03/18
 */

// Función para cargar libros por estudiante
export async function loadBooks(searchQuery = '') {
    try {
        // Obtener el ID del estudiante (en este caso, lo dejamos fijo para pruebas)
        const estudianteId = 1;

        const url = `${ConstValues.DOMAIN_NAME}/api/get/obtener_libros_estudiante?estudiante_id=${estudianteId}`;

        // Realizar la solicitud fetch
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error al cargar los libros');
        }
        const data = await response.json();
        //console.log("Datos recibidos:", data);

        // Limpiar el contenedor de libros (si existe)
        const bookContainer = document.getElementById('bookContainer');
        if (!bookContainer) {
            console.warn("El contenedor de libros no fue encontrado en el DOM.");
            return; // Salir de la función si el contenedor no existe
        }
        bookContainer.innerHTML = '';

        // Filtrar libros según el texto de búsqueda
        const filteredData = data.filter(clase => {
            // Filtrar por clase, título o editorial
            return (
                clase.clase_nombre.toLowerCase().includes(searchQuery.toLowerCase()) || // Filtrar por clase
                clase.libros.some(libro => 
                    libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || // Filtrar por título
                    libro.editorial.toLowerCase().includes(searchQuery.toLowerCase())  // Filtrar por editorial
                )
            );
        });

        // Mostrar los libros en el contenedor
        filteredData.forEach(clase => {
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
    } catch (error) {
        console.error('Error:', error);
    }
}

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

// Función para ir a una página específica del PDF (ámbito global)
window.goToPage = function() {
    const pageNumber = document.getElementById('pageNumber').value;
    const iframe = document.getElementById('pdfViewer');
    iframe.src = `${currentPdfUrl}#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`;
};

document.addEventListener('DOMContentLoaded', function () {
    // Cargar libros al iniciar la página (solo si estamos en la página de la biblioteca)
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