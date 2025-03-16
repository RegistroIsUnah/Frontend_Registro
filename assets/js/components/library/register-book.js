export let registerBook = `

    <div class="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow p-5 w-75" style="transform: translate(-50%, -50%)!important;">
        <h2 class="fw-bold mb-4 border-bottom pb-2 text-center" style="color: #2B3A55; border-color: #DEE2E6 !important;">Registrar libro</h2>
        <form method="POST" class="row g-4">
            <!-- Fila 1 -->
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="titulo" class="form-label fw-bold" style="color: #2B3A55;">Título del libro</label>
                    <input type="text" name="titulo" id="titulo" class="form-control" style="border-color: #DEE2E6;" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="fecha_publicacion" class="form-label fw-bold" style="color: #2B3A55;">Fecha de publicación</label>
                    <input type="date" name="fecha_publicacion" id="fecha_publicacion" class="form-control" style="border-color: #DEE2E6;" required>
                </div>
            </div>

            <!-- Descripción -->
            <div class="col-12">
                <div class="mb-3">
                    <label for="descripcion" class="form-label fw-bold" style="color: #2B3A55;">Descripción</label>
                    <textarea name="descripcion" id="descripcion" class="form-control" style="height: 100px; border-color: #DEE2E6;" required></textarea>
                </div>
            </div>

            <!-- Fila 2 -->
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="form-label fw-bold" style="color: #2B3A55;">Categorías del libro</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light" style="border-color: #DEE2E6;">+</span>
                        <input type="text" name="tags" id="tags" class="form-control" placeholder="Escribe y presiona Enter" style="border-color: #DEE2E6;" required>
                    </div>
                    <div id="tagContainer" class="mt-2"></div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="mb-3">
                    <label class="form-label fw-bold" style="color: #2B3A55;">Autores del libro</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light" style="border-color: #DEE2E6;">+</span>
                        <input type="text" name="autores" id="autores" class="form-control" placeholder="Escribe y presiona Enter" style="border-color: #DEE2E6;" required>
                    </div>
                    <div id="autorsContainer" class="mt-2"></div>
                </div>
            </div>

            <!-- Selector -->
            <div class="col-12">
                <div class="mb-3">
                    <label for="clase_id" class="form-label fw-bold" style="color: #2B3A55;">Clase asignada al libro (opcional)</label>
                    <select name="clase_id" id="clase_id" class="form-select" style="border-color: #DEE2E6;">
                        <option value="" selected>--Seleccione uno--</option>
                        <option value="">Uno</option>
                        <option value="">Dos</option>
                        <option value="">Tres</option>
                        <option value="">Cuatro</option>
                    </select>
                </div>
            </div>

            <!-- Archivo -->
            <div class="col-12">
                <div class="mb-3">
                    <label for="libro" class="form-label fw-bold" style="color: #2B3A55;">Subir libro (PDF)</label>
                    <input type="file" name="libro" id="libro" accept="application/pdf" class="form-control" style="border-color: #DEE2E6;" required>
                    <span class="invalid-feedback"></span>
                </div>
            </div>

            <input type="text" name="rol" id="rol" hidden>

            <!-- Botón -->
            <div class="col-12 text-center">
                <button type="submit" class="btn btn-dark btn-lg px-5 fw-bold">Confirmar</button>
            </div>
        </form>
    </div>

`;