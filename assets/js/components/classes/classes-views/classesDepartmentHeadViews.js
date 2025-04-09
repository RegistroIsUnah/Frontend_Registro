export let classesTarget = (title, body, classDataArray, attribute="") => `

<div class="col-lg-3 col-md-4 col-sm-12">
    <div class="card">
        <div class="card-header">${title}</div>
        <div class="card-body">
            ${body}
        </div>
        <div class="card-footer">            
            <button id="${classDataArray[0]}" class="deleteSection btn btn-danger mb-2" ${attribute}>Inhabilitar sección</button>
            <button id="${classDataArray[0]}" class=" ${classDataArray[1]} btn btn-primary mb-2">${classDataArray[2]}</button>
        </div>
    </div>
</div>
`;

export let createSectionForm = () => `

    <!-- Modal -->
    <div class="modal fade" id="admissionModal" tabindex="-1" aria-labelledby="admissionModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-4" style="font-weight: bold;" id="admissionModalLabel">Inscripción para el Examen de Admisión</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="applicants-admission-form" method="POST">
            <div class="container-form container">
                <hr>
                <br>
                
                <div class="row mb-3">
                <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" required placeholder="Ingrese sus nombres">
                    <span class="invalid-feedback"></span>
                </div>
                <div class="col-md-6">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="apellidos" name="apellidos" required placeholder="Ingrese sus apellidos">
                    <span class="invalid-feedback"></span>
                </div>
                </div>

                <!-- Resto de tus campos del formulario... -->
                <!-- Mantén la misma estructura para todos los campos -->

                <div class="row mb-3">
                <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-primary">Confirmar</button>
                    <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Cancelar</button>
                </div>
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>

`;