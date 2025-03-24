export function renderLibros(clases, isDocente = false) {
    const bookContainer = document.getElementById("bookContainer");
    if (!bookContainer) return;

    let container = '';

    if (isDocente) {
        container += generateNewBook();
    }
    
    if (!clases || !Array.isArray(clases)) {
        bookContainer.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }

    clases.forEach(clase => {
        container += `<h3 class="mt-4">${clase.clase_nombre}</h3><hr><div class="row">`;
        
        clase.libros.forEach(libro => {
            container += generateBookCard(libro, isDocente);
        });

        container += `</div>`;
    });

    bookContainer.innerHTML = container || "<p>No se encontraron libros.</p>";
}

function generateBookCard(libro, isDocente) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card book-card">
                <div class="card-body">
                    <div onclick="openPDFModal('${libro.libro_url}')">
                        <h5 class="card-title">${libro.titulo}</h5>
                        <p class="card-text">Editorial: ${libro.editorial}</p>
                        <p class="card-text">${libro.descripcion}</p>
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
            <button type="button" class="btn btn-success" onclick="handleEditBook(${libroId})"> Editar </button>
            <button type="button" class="btn btn-danger" onclick="handleDeleteBook(${libroId})"> Eliminar </button>

        </div>
    `;
}

function generateNewBook(){
    return `
        <div class="text-end mb-3">
            <button class="btn btn-primary" onclick="loadRegisterBookForm()">
                <i class="fas fa-plus"></i> Agregar Libro
            </button>
        </div>
        `;
}