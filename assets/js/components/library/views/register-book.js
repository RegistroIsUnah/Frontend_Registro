/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 *   
 * Formulario de registro de libros al cual se le carga contenido dinámico para mostrarlo en sus campos y reutilizado para edicion.
 * Este formulario solo se muestra a Jefes de departamento y Coordinadores de carrera.
 */
import { ConstValues } from "../../../utils/constValues.js";

export let registerBook = (tagsData, classesOptions, libroData = null) => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="biblioteca.php">Biblioteca</a> | <a class="color-text">${libroData ? `Edición de Libro` : `Registro de Libro`}</a></h5>
</div>


<div class="container-form container my-5" >
    <h2 class="fw-bold mb-4 border-bottom pb-2 text-center" style="color: #2B3A55; border-color: #DEE2E6 !important;">${libroData ? `Editar Libro` : `Registrar Libro`}</h2>
    <form method="POST" class="row g-4" id="register-book-form"${libroData ? 'data-edit-mode="true"' : ''} >${libroData ? `
        <!-- Campo oculto para el ID del libro -->
        <input type="hidden" name="libro_id" id="libro_id" value="${libroData.libro_id}">
    ` : ''}
        <div class="col-md-6">
            <div class="mb-3">
                <label for="titulo" class="form-label fw-bold" style="color: #2B3A55;">Título del libro</label>
                <input type="text" name="titulo" id="titulo" maxlength="150" class="form-control" autocomplete="off" style="border-color: #DEE2E6;"${libroData ? 'disabled' : ''} required>
                <span class="invalid-feedback"></span>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="mb-3">
                <label for="fecha_publicacion" class="form-label fw-bold" style="color: #2B3A55;">Fecha de publicación</label>
                <input type="date" name="fecha_publicacion" id="fecha_publicacion" class="form-control" style="border-color: #DEE2E6;" placeholder="Formato: yyyy/mm/dd"  ${libroData ? 'disabled' : ''}  required>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-12">
            <div class="mb-3">
                <label for="descripcion" class="form-label fw-bold" style="color: #2B3A55;">Descripción</label>
                <textarea name="descripcion" maxlength="200" id="descripcion" class="form-control" autocomplete="off" style="height: 100px; border-color: #DEE2E6;"  ${libroData ? 'disabled' : ''}  required></textarea>
                <span class="invalid-feedback"></span>
            </div>
        </div>

<div class="col-md-6">
            <div class="mb-3">
       <div class="tags-section mb-4">
  <label for="categorias" class="form-label fw-bold" style="color: #2B3A55; " >Categorías</label>
  
  <div class="position-relative">
    <div class="input-group">
      <input type="text" id="tagInput" class="form-control"  autocomplete="off" placeholder="Haz clic para ver categorias disponibles" ${libroData ? 'disabled' : ''}>
      <button class="btn btn-outline-dark" type="button" id="tagAddBtn"${libroData ? 'disabled' : ''}>Agregar</button>
    </div>
    
    <!-- Contenedor de resultados -->
    <div id="tagResults" class="tag-results"></div>
  </div>
  
  <!-- Tags seleccionados -->
  <div id="selectedTags" class="selected-tags-container mt-2">
  ${(libroData?.tags || []).map(tag => {
    const tagId = tag.tag_id || tag;
    const tagName = tag.tag_nombre || tag;

    return `
      <span class="selected-tag badge bg-light text-dark p-2 me-2 mb-2">
        ${tagName}
        <input type="hidden" name="tags[]" value="${tagId}" >
        <span class="remove-tag ${libroData ? 'disabled' : ''}">&times;</span>
      </span>
    `;
}).join('')}
</div>
</div>
</div>
</div>

        ${!libroData ? `  <!-- Solo mostrar campo clase si NO estamos editando -->
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="clase_id" class="form-label fw-bold" style="color: #2B3A55;">Clase</label>
                    <select name="clase_id" id="clase_id" class="form-select" required>
                        ${classesOptions}
                    </select>
                    <span class="invalid-feedback"></span>

                </div>
            </div>
        ` : ''}
        


        <div class="col-md-6">
            <div class="mb-3">
                <label for="autores" class="form-label fw-bold" style="color: #2B3A55;">Autores</label>
                
                <div class="input-group mb-2">
                    <input type="text" id="nombre" name="nombre"  class="form-control" autocomplete="off" placeholder="Nombre" ${libroData ? 'disabled' : ''}>
                    <input type="text" id="apellido" class="form-control" autocomplete="off" placeholder="Apellido" ${libroData ? 'disabled' : ''}>
                    <button type="button" class="btn btn-outline-dark" id="addAuthor"${libroData ? 'disabled' : ''}>Agregar</button>
                </div>

                <div id="listaAutores" class="mt-2 d-flex flex-wrap gap-2" ></div>
                <input type="hidden" name="autores" id="autoresHidden" autocomplete="off" ${libroData ? 'disabled' : ''}>
                <span class="invalid-feedback">Debe agregar al menos un autor</span>
                </div>
        </div>


        <div class="col-md-6">
            <div class="mb-3">
                <label for="editorial" class="form-label fw-bold" style="color: #2B3A55;">Editorial</label>
                <input type="text" name="editorial" id="editorial" maxlength="50" class="form-control" autocomplete="off" style="border-color: #DEE2E6;" ${libroData ? 'disabled' : ''}  required>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        
        ${libroData ? `
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="estado" class="form-label fw-bold" style="color: #2B3A55;">Estado del Libro</label>
                    <select name="estado" id="estado" class="form-select"  ${libroData ? 'disabled' : ''} required>
                        <option value="ACTIVO" ${libroData.estado_libro_id === 'ACTIVO' ? 'selected' : ''}>Activo</option>
                        <option value="INACTIVO" ${libroData.estado_libro_id === 'INACTIVO' ? 'selected' : ''}>Inactivo</option>
                    </select>
                    <span class="invalid-feedback"></span>
                </div>
            </div>
        ` : ''}

        <div class="col-md-6">
            <div class="mb-3">
                <label for="isbn_libro" class="form-label fw-bold" style="color: #2B3A55;">ISBN</label>
                <input type="text" name="isbn_libro" id="isbn_libro" maxlength="50" class="form-control" autocomplete="off" style="border-color: #DEE2E6;" ${libroData ? 'disabled' : ''} required>
                <span class="invalid-feedback"></span>
            </div>
        </div>
        

        <div class="col-12">
        <div class="mb-3">
            <label for="libro" class="form-label fw-bold" style="color: #2B3A55;">
                ${libroData ? 'Actualizar PDF (opcional)' : 'Subir libro (PDF)'}
            </label>
            <input type="file" name="libro" id="libro" accept="application/pdf, application/epub+zip, application/vnd.amazon.ebook, 
            application/x-mobi8-ebook, text/plain, application/rtf, text/rtf" class="form-control" ${!libroData ? 'required' : ""} ${libroData ? 'disabled' : ''}>
            <span class="invalid-feedback"></span>

            ${libroData?.libro_url ? `
                <div class="mt-2">
                    <small>PDF actual: </small>
                    <a href="${ConstValues.UPLOADS_BASE_URL}${libroData.libro_url}" target="_blank" class="btn btn-sm btn-outline-primary">
                        <i class="fas fa-file-pdf"></i> Ver PDF actual
                    </a>
                </div>
            ` : ''}
        </div>
    </div>

    <div class="col-12 text-center">
    ${libroData ? `
        <button type="button" id="enableEditBtn" class="btn btn-success btn-lg px-5 fw-bold">Habilitar Edición</button>
        <button type="submit" class="btn btn-dark btn-lg px-5 fw-bold d-none" id="submitEditBtn">Confirmar cambios</button>
    ` : `
        <button type="submit" class="btn btn-dark btn-lg px-5 fw-bold">Registrar libro</button>
    `}
    </div>

    </form>

<div id="responseModal" class="book-modal">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body">
            <i class="modal-icon fas fa-check-circle success"></i>
            <p id="modalMessage"></p>
        </div>
    </div>
</div>


</div>
`;
