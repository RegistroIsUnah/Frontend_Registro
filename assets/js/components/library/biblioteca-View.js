export let bibliotecaView = `

<nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
        <!-- Logo o nombre de la página -->
        <a class="navbar-brand" href="#">Biblioteca Virtual</a>

            <!-- Botón de Cerrar sesión -->
            <button class="btn btn-outline-light" style="width: auto;" onclick="logout()">
                Cerrar sesión
            </button>
        </div>
    </div>
</nav>

    <div class="container my-5">
        <h1 class="text-center mb-4">Biblioteca Virtual</h1>

        <!-- Campo de búsqueda -->
    <div class="row mb-4">
        <div class="col-md-6 offset-md-3">
            <input type="text" id="searchInput" class="form-control" placeholder="Buscar por título o editorial">
        </div>
    </div>


        <!-- Contenedor de libros -->
        <div class="row" id="bookContainer">
            <!-- Los libros se cargarán aquí dinámicamente -->
        </div>

        <!-- Contenedor de paginación -->
        <div id="pagination" class="d-flex justify-content-center my-4"></div>




    </div>

    <!-- Modal para mostrar el PDF -->
    <div class="modal fade" id="pdfModal" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="pdfModalLabel">Libro PDF</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Campo de búsqueda de página -->
                    <div class="d-flex align-items-center mb-3 justify-content-center">
                        <label for="pageNumber" class="me-2">Página:</label>
                        <input type="number" id="pageNumber" min="1" value="1" class="form-control me-2" style="width: 100px;">
                        <button onclick="goToPage()" class="btn btn-primary">Ir</button>
                    </div>
                    <!-- Iframe para mostrar el PDF -->
                    <iframe id="pdfViewer" src=""></iframe>
                </div>
            </div>
        </div>
    </div>


`;