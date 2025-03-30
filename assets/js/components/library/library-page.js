export let libraryView =`

<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <!-- Logo y nombre -->
        <a class="navbar-brand" href="#">Biblioteca Virtual</a>
        
        <!-- Botón Hamburguesa (se muestra en móviles) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú colapsable -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" 
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i> <!-- Icono de perfil (opcional) -->
                        <span id="username">Usuario</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><button class="dropdown-item text-danger" onclick="logout()">
                            <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                        </button></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="biblioteca.php">Biblioteca</a></h5>
</div>

    <div class="container my-5">
        <h1 class="text-center">Biblioteca Virtual</h1>

        <!-- Campo de búsqueda -->
    <div class="row mb-4">
        <div class="col-md-6 offset-md-3">
            <input type="text" id="searchInput" class="form-control" placeholder="Buscar por clase, título o editorial">
            <button type="button" id="searchButton" class="btn btn-primary" ">Buscar</button>
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