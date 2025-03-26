export let resendAdmissionsForm =  (numSolicitud, admissionData) => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Admisiones</a> | <a class="color-text">Reenviar Solicitud de Admisión</a></h5>
</div>

    <div class=" container alert alert-danger">

        ${admissionData.rechazos.map(rechazo => `
            <div class="tipo-rechazo">
                <p>Motivo: <strong>${rechazo.tipo_rechazo}</strong><p>
                <ul>
                    ${rechazo.motivos.map(motivo => `
                        <li>${motivo}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('')}
    </div>

    <div class="container-form container my-5">

        <h3 style="font-weight: bold;" class="text-center mb-4">Corregir datos de Inscripción para el Examen de Admisión</h3>
        <hr>
        <br>
        <form id="resend-admission-form" method="POST">
        
            <input hidden type="text" id="numSolicitud" name="numSolicitud" value="${numSolicitud}">
            <input hidden type="text" id="tipo_documento" name="tipo_documento" value="${admissionData.tipo_documento}">

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="aspirante_nombre" class="form-label">Nombre</label>
                    <input value="${admissionData.aspirante_nombre}" type="text" class="form-control" id="aspirante_nombre" name="aspirante_nombre" required placeholder="Ingrese sus nombres">
                    <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="aspirante_apellido" class="form-label">Apellidos</label>
                    <input value="${admissionData.aspirante_apellido}" type="text" class="form-control" id="aspirante_apellido" name="aspirante_apellido" required placeholder="Ingrese sus apellidos">
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="documento" class="form-label">Identificación (DNI o pasaporte)</label>
                    <input value="${admissionData.documento}" type="text" class="form-control" id="documento" name="documento" required placeholder="Si es extranjero ingrese su pasaporte">
                        <span class="invalid-feedback"></span>
                </div>

                <div class="col-md-6">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input disabled value="${admissionData.telefono}" type="tel" class="form-control" id="telefono" name="telefono" required placeholder="Teléfono celular o residencial">
                        <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="correo" class="form-label">Correo Personal</label>
                    <input disabled value="${admissionData.correo}" type="email" class="form-control" id="correo" name="correo" required placeholder="correo.ejemplo@correo.com">
                        <span class="invalid-feedback"></span>
                </div>           
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="carrera_principal" class="form-label">Carrera Principal</label>}
                    <input disabled value="${admissionData.carrera_principal}" type="text" class="form-control" id="carrera_principal" name="carrera_principal">
                    <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="carrera_secundaria" class="form-label">Carrera Secundaria</label>
                    <input disabled value="${admissionData.carrera_secundaria ? admissionData.carrera_secundaria : "No hay"}" type="text" class="form-control"  id="carrera_secundaria" name="carrera_secundaria">
                    <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">            
                <div class="col-md-6">
                    <label for="foto" class="form-label">Foto de Perfil</label>
                    <input type="file" accept=".png, .jpg, .jpeg, .webp, .tiff, .tif, .avif, application/pdf" class="form-control" id="foto" name="foto" required>
                        <span class="invalid-feedback"></span>
                </div>
                 <div class="col-md-6">
                    <label for="fotodni" class="form-label">Documento de Identificación (DNI)</label>
                    <input type="file" accept=".png, .jpg, .jpeg, .webp, .tiff, .tif, .avif, application/pdf" class="form-control" id="fotodni" name="fotodni" required>
                        <span class="invalid-feedback"></span>
                </div> 
            </div>                
                
            <div class="row mb-3">
                <div class="col-md-12">
                    <label for="certificado_url" class="form-label">Foto de Certificado de Secundaria</label>
                    <input type="file" accept=".png, .jpg, .jpeg, .webp, .tiff, .tif, .avif, application/pdf" class="form-control" id="certificado_url" name="certificado_url" required>
                    <span class="invalid-feedback"></span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-primary">Confirmar</button>
                </div>
            </div>
        </form>
    </div>
`;
