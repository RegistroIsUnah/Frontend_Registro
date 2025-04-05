export let libraryView =`

<nav id="navbarBiblioteca" class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="biblioteca.php">
        <img src="assets/img/logoUNAH.png" alt="Logo" width="50" height="30" class="d-inline-block align-top me-2">
            <i class="bi bi-book me-2"></i>Biblioteca Virtual
        </a>
        
        <!-- Botón Hamburguesa -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú colapsable -->
        <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <!-- Menú principal izquierda -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">
                        <i class="bi bi-house-door me-1"></i>Registro
                    </a>
                </li>
            </ul>
            
            <!-- Menú usuario derecha -->
            <ul class="navbar-nav">
                <!-- Dropdown Usuario -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" 
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i>
                        <span id="username">${sessionStorage.getItem('nombre')}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><button class="dropdown-item text-danger" id="btnLogout">
                            <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                        </button></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Biblioteca</a></h5>
</div>

    <div class="container my-5">
        <h1 class="text-center">Biblioteca Virtual</h1>

        <!-- Campo de búsqueda -->
    <div class="row justify-content-center mb-4">
        <div class="col-12 col-md-8 col-lg-6">
            <div class="input-group shadow-sm">
                <input type="search" id="searchInput" class="form-control border-end-0" autocomplete="off" placeholder="Buscar por clase o titulo del libro">
                <button type="button" id="searchButton" class="btn btn-primary d-flex align-items-center gap-2"style="background-color: #12a9c2; border-color: #0f8fa5;">
                    Buscar
                </button>
                <!-- Contenedor de sugerencias -->
        <div id="suggestionsContainer" class="list-group shadow-sm mt-1 d-none position-absolute w-100 z-3""></div>
            </div>
        </div>
    </div>

    <br>

    <div id="registerButtonContainer" class="text-end mb-3"></div>

        <!-- Contenedor de libros -->
        <div class="row" id="bookContainer">
            <!-- Los libros se cargarán aquí dinámicamente -->
        </div>

        <!-- Contenedor de paginación -->
        <div id="pagination" class="d-flex justify-content-center my-4"></div>

    </div>

    <div class="modal fade" id="pdfModal" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title fw-bold" id="pdfModalLabel">Vista del libro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body p-0 position-relative">
                <!-- Contenedor centrado con estilos inline -->
                    <div class="sticky-top p-3 shadow-sm" style="display: flex; justify-content: center; background: #f8f9fa;">
                        <div class="input-group" style="width: auto; gap: 8px;">
                            <input type="number" id="pageNumber" class="form-control" min="1" value="1"
                            style="width: 100px; border-radius: 4px 0 0 4px; border: 1px solid #ced4da;"
                            aria-label="Número de página">
                            <button class="btn btn-primary" type="button" onclick="goToPage()"
                            style="border-radius: 0 4px 4px 0; white-space: nowrap;">Ir a página</button>
                        </div>
                    </div>

                    <div id="pdfLoading" class="d-flex justify-content-center align-items-center"></div>

                    <div id="pdfContent" class="pdf-content-container">
                        <iframe id="pdfViewer" class="w-100 h-100" title="Vista del Libro" aria-label="Contenido del libro"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>


`;