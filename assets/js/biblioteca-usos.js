// Datos de ejemplo (se puedes reemplazar esto con una carga desde el backend)
const books = [
    {
        title: "Título del Libro 1",
        author: "Autor 1",
        tags: "Tag1, Tag2, Tag3",
        url: "books/Administracion_Estrategica_Arthur_A._Tho.pdf"
    },
    {
        title: "Título del Libro 2",
        author: "Autor 2",
        tags: "Tag1, Tag2, Tag3, Tag4",
        url: "books/libro2.pdf"
    },
    {
        title: "Título del Libro 3",
        author: "Autor 3",
        tags: "Tag1, Tag2, Tag3",
        url: "books/libro3.pdf"
    },

];



// Variable para almacenar la URL del PDF actual
let currentPdfUrl = '';

// Función para cargar el PDF en el modal
function loadPDF(pdfUrl) {
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

    
}


// Función para ir a una página específica
function goToPage() {
    const pageNumber = document.getElementById('pageNumber').value;
    if (pageNumber && currentPdfUrl) {
        const iframe = document.getElementById('pdfViewer');
        // Forzar la actualización del iframe
        iframe.src = currentPdfUrl + `#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`;
        iframe.contentWindow.location.reload(); // Recargar el iframe
    }
}




/// Variables de paginación y búsqueda
let currentPage = 1;
const booksPerPage = 3; // Número de libros por página
let filteredBooks = [...books]; // Copia de todos los libros para filtrar

// Función para mostrar los libros dinamicamente
function showPage(page) {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Limpiar el contenedor

    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;

    filteredBooks.slice(startIndex, endIndex).forEach(book => {
        bookContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card book-card" data-bs-toggle="modal" data-bs-target="#pdfModal" onclick="loadPDF('${book.url}')">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text"><strong>Autor:</strong> ${book.author}</p>
                        <p class="card-text"><strong>Tags:</strong> ${book.tags}</p>
                    </div>
                </div>
            </div>
        `;
    });

    updatePagination(); // Actualizar los botones de paginación
}

// Función para actualizar los botones de paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
}

// Función para cambiar de página
function changePage(page) {
    currentPage = page;
    showPage(page);
}

// Función para filtrar libros según la búsqueda
function filterBooks(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    filteredBooks = books.filter(book => {
        return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.tags.toLowerCase().includes(searchTerm)
        );
    });

    currentPage = 1; // Reiniciar a la primera página
    showPage(currentPage); // Mostrar los resultados filtrados
}

// Evento para el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', function () {
    filterBooks(this.value);
});


// Cargar la primera página al inicio
window.onload = function () {
    showPage(currentPage);
};

