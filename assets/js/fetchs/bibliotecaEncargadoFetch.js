import { ConstValues } from "../utils/constValues";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/18
 */

// Función para cargar un libro específico para el encargado de biblioteca
export async function loadBooksEncargado() {
    try {
        // ID del libro a obtener (en este caso, lo dejamos fijo para pruebas)
        const libro_id = 5;

        
        const url = `${ConstValues.DOMAIN_NAME}/api/get/obtener_libro_encargado?libro_id=${libro_id}`;

        // Realizar la solicitud fetch
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar el libro');
        }
        const data = await response.json();
        //console.log("Datos del libro recibidos:", data);

        
        if (!data.libro_id) {
            throw new Error("Libro no encontrado o datos inválidos");
        }

        // Limpiar el contenedor de libros
        const bookContainer = document.getElementById('bookContainer');
        bookContainer.innerHTML = '';

        
        const estado = `
            <div class="estado" style="display: flex; gap: 20px; margin-bottom: 20px;">
                <div>
                    <select style="width: 100%; padding: 10px;">
                        <option value="">Seleccionar estado</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVO">INACTIVO</option>
                    </select>
                </div>
                <div>
                    <button type="button" class="btn btn-success">Agregar Libro</button>
                </div>
            </div>
        `;
        bookContainer.innerHTML += estado;

        
        const bookCard = `
            <div class="col-md-4 mb-4">
                <div class="card book-card" data-bs-toggle="modal" data-bs-target="#pdfModal" onclick="loadPDF('${data.libro_url}')">
                    <div class="card-body">
                        <h5 class="card-title">${data.titulo}</h5>
                        <p class="card-text">Editorial: ${data.editorial}</p>
                        <p class="card-text">${data.descripcion}</p>
                        <div>
                            <button type="button" class="btn btn-success">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        bookContainer.innerHTML += bookCard;
    } catch (error) {
        console.error('Error:', error);
    }
}


// Variable para almacenar la URL del PDF actual
let currentPdfUrl = '';

// Función para cargar el PDF en el modal 
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

// Cargar libros al iniciar la página
document.addEventListener('DOMContentLoaded', function () {
    loadBooksEncargado();
});