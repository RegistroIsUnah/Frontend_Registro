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
export let registerBook = (tagsOptions, classesOptions) => `

<div class="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow p-5 w-75" style="transform: translate(-50%, -50%)!important;">
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
                <input type="text" name="fecha_publicacion" id="fecha_publicacion" class="form-control" style="border-color: #DEE2E6;" placeholder="Formato: yyyy/mm/dd" required>
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

        <div class="col-md-6">
            <div class="mb-3">
                <label for="tags" class="form-label fw-bold" style="color: #2B3A55;">Categoría del libro</label>
                <select name="tags" id="tags" class="form-select" style="border-color: #DEE2E6;" required>
                    ${tagsOptions}
                </select>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-md-6">
            <div class="mb-3">
                <label for="clase_id" class="form-label fw-bold" style="color: #2B3A55;">Clase asignada al libro</label>
                <select name="clase_id" id="clase_id" class="form-select" style="border-color: #DEE2E6;">
                    ${classesOptions}
                </select>
                <span class="invalid-feedback"></span>
            </div>
        </div>

        <div class="col-md-6">
            <div class="mb-3">
                <label for="autores" class="form-label fw-bold" style="color: #2B3A55;">Autores del libro</label>
                <div class="input-group">
                    <button type="button" class="input-group-text bg-light" style="border-color: #DEE2E6;" id="addAuthor">+</button>
                    <input type="text" name="autores" id="autores" class="form-control" placeholder="Escriba y presione Enter" style="border-color: #DEE2E6;">
                    <span class="invalid-feedback"></span>
                </div>
                
                <section id="autorsContainer" class="mt-2 d-flex flex-wrap gap-2"></section>
                
                <select name="autores_lista" id="autores_lista" class="form-select d-none" multiple>
                    <!-- Las opciones se generarán aquí -->
                </select>
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

        <input type="text" value="COORDINADOR" name="rol" id="rol" hidden>

        <div class="col-12 text-center">
            <button type="submit" class="btn btn-dark btn-lg px-5 fw-bold">Confirmar</button>
        </div>
    </form>
</div>
`;