export let libraryView =`

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="biblioteca.php">Biblioteca</a></h5>
</div>

    <div class="container my-5">
        <h1 class="text-center">Biblioteca Virtual</h1>

        <!-- Campo de búsqueda -->
    <div class="row justify-content-center mb-4">
        <div class="col-12 col-md-8 col-lg-6">
            <div class="input-group shadow-sm">
                <input type="search" id="searchInput" class="form-control border-end-0" placeholder="Buscar por clase o titulo del libro">
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

    <div class="modal fade" id="pdfModal" tabindex="-1 ">
    <div class="modal-dialog modal-xl"> <!-- Tamaño extra grande -->
        <div class="modal-content">
        <div class="modal-header bg-light">
            <h5 class="modal-title fw-bold"  id="pdfModalLabel">Vista previa del libro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body p-0"> 
            <div class="sticky-top p-3 shadow-sm"> <!-- Barra de búsqueda fija -->
            <div class="input-group">
                <input type="number" id="pageNumber" class="form-control" min="1" value="1"onkeyup="if(event.key === 'Enter') goToPage()">
                <button onclick="goToPage()" class="btn btn-outline-secondary" >Ir a página</button>
            </div>
            </div>

            <div id="iframeContainer"  style="height: 80vh;">
            <iframe id="pdfViewer" class="w-100 h-100"></iframe>
            </div>
        </div>
        </div>
    </div>
    </div>


`;