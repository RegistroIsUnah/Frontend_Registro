/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 * 
 * @param {*} tagsOptions 
 * @param {*} classesOptions 
 * @returns 
 *   
 * Formulario de registro de libros al cual se le carga contenido dinámico para mostrarlo en sus campos.
 * Este formulario solo se muestra a Jefes de departamento y Coordinadores de carrera.
 */
export let registerBook = (tagsData, classesOptions) => `



<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="biblioteca.php">Biblioteca</a> | <a class="color-text">Registro de Libro</a></h5>
</div>


<div class="container-form container my-5" >
    <h2 class="fw-bold mb-4 border-bottom pb-2 text-center" style="color: #2B3A55; border-color: #DEE2E6 !important;">Registrar libro</h2>
    <form method="POST" class="row g-4" id="register-book-form">
        <div class="col-md-6">
            <div class="mb-3">
                <label for="titulo" class="form-label fw-bold" style="color: #2B3A55;">Título del libro</label>
                <input type="text" name="titulo" id="titulo" maxlength="150" class="form-control" style="border-color: #DEE2E6;" required>
                <span class="invalid-feedback"></span>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="mb-3">
                <label for="fecha_publicacion" class="form-label fw-bold" style="color: #2B3A55;">Fecha de publicación</label>
                <input type="date" name="fecha_publicacion" id="fecha_publicacion" class="form-control" style="border-color: #DEE2E6;" placeholder="Formato: yyyy/mm/dd" required>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-12">
            <div class="mb-3">
                <label for="descripcion" class="form-label fw-bold" style="color: #2B3A55;">Descripción</label>
                <textarea name="descripcion" maxlength="200" id="descripcion" class="form-control" style="height: 100px; border-color: #DEE2E6;" required></textarea>
                <span class="invalid-feedback"></span>
            </div>
        </div>


        <label for="tags" class="form-label fw-bold" style="color: #2B3A55;">Categorias</label>
        <div class="tags-container d-flex flex-wrap gap-3">
        ${tagsData.map(tag => `
            <div class="form-check">
                <input type="checkbox" name="tags" value="${tag.tag_id}" id="tag-${tag.tag_id}" class="form-check-input">
                <label class="form-check-label" for="tag-${tag.tag_id}">
                    ${tag.tag_nombre}
                </label>
            </div>
        `).join('')}
    </div>

        <div class="col-md-6">
            <div class="mb-3">
                <label for="clase_id" class="form-label fw-bold" style="color: #2B3A55;">Clase asignada al libro</label>
                <select name="clase_id" id="clase_id" class="form-select" style="border-color: #DEE2E6;" required>
                    ${classesOptions}
                </select>
                <span class="invalid-feedback"></span>
            </div>
        </div>
        


        <div class="col-md-6">
            <div class="mb-3">
                <label for="autores" class="form-label fw-bold" style="color: #2B3A55;">Autores</label>
                
                <div class="input-group mb-2">
                    <input type="text" id="nombre" name="nombre"  class="form-control" placeholder="Nombre">
                    <input type="text" id="apellido" class="form-control" placeholder="Apellido">
                    <button type="button" class="btn btn-outline-dark" id="addAuthor">Agregar</button>
                </div>

                <div id="listaAutores" class="mt-2 d-flex flex-wrap gap-2"></div>
                <input type="hidden" name="autores" id="autoresHidden">
                <span class="invalid-feedback">Debe agregar al menos un autor</span> <!-- Mensaje de error -->
                </div>
        </div>


        <div class="col-md-6">
            <div class="mb-3">
                <label for="editorial" class="form-label fw-bold" style="color: #2B3A55;">Editorial</label>
                <input type="text" name="editorial" id="editorial" maxlength="50" class="form-control" style="border-color: #DEE2E6;" required>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-12">
            <div class="mb-3">
                <label for="libro" class="form-label fw-bold" style="color: #2B3A55;">Subir libro (PDF)</label>
                <input type="file" name="libro" id="libro" accept="application/pdf" class="form-control" style="border-color: #DEE2E6;" required>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-12 text-center">
            <button type="submit" class="btn btn-dark btn-lg px-5 fw-bold">Confirmar</button>
        </div>
    </form>
</div>
`;