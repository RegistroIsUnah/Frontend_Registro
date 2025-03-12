export let admissionsForm = `
    <div class="container my-5">
        <!-- Formulario de Inscripción -->
        <h1 style="font-weight: bold;" class="text-center mb-4">Inscripción para el Examen de Admisión</h1>
        <hr>
        <br>
        <form id="applicants-admission-form" method="POST">
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" required>
                    <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="carrera_principal" class="form-label">Carrera Principal</label>
                    <select class="form-select" id="carrera_principal" name="carrera_principal" required>
                        <option value="">Seleccione una carrera</option>
                        <option value="Ingeniería">Ingeniería</option>
                        <option value="Medicina">Medicina</option>
                        <option value="Derecho">Derecho</option>
                        <option value="Administración">Administración</option>
                    </select>
                        <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="carrera_secundaria" class="form-label">Carrera Secundaria</label>
                    <select class="form-select" id="carrera_secundaria" name="carrera_secundaria" required>
                        <option value="">Seleccione una carrera</option>
                        <option value="Ingeniería">Ingeniería</option>
                        <option value="Medicina">Medicina</option>
                        <option value="Derecho">Derecho</option>
                        <option value="Administración">Administración</option>
                    </select>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="identidad" class="form-label">Identidad (DNI)</label>
                    <input type="text" class="form-control" id="identidad" name="identidad" required>
                        <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="telefono" name="telefono" required>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="correo" class="form-label">Correo Personal</label>
                    <input type="email" class="form-control" id="correo" name="correo" required>
                        <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="centro_regional" class="form-label">Centro Regional</label>
                    <select class="form-select" id="centro_regional" name="centro_regional" required>
                        <option value="">Seleccione un centro regional</option>
                        <option value="Centro 1">Centro 1</option>
                        <option value="Centro 2">Centro 2</option>
                        <option value="Centro 3">Centro 3</option>
                    </select>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="certificado" class="form-label">Foto de Certificado de Secundaria</label>
                    <input type="file" class="form-control" id="certificado" name="certificado" required>
                        <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="foto_perfil" class="form-label">Foto de Perfil</label>
                    <input type="file" class="form-control" id="foto_perfil" name="foto_perfil" required>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="dni_file" class="form-label">Documento de Identificación (DNI)</label>
                    <input type="file" class="form-control" id="dni_file" name="dni_file" required>
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <!-- Botón de Confirmar -->
            <div class="row mb-3">
                <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-primary">Confirmar</button>
                </div>
            </div>
        </form>
    </div>
`;