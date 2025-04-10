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
    <div class="modal fade" id="createSectionModal" tabindex="-1" aria-labelledby="admissionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered"> <!-- Agregada clase modal-dialog-centered -->
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4" style="font-weight: bold;">Crear Sección</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="create-section-form">
                            
                        <input type="number" id="clase_id" name="clase_id" hidden>
                
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="docente_id" class="form-label">Docente</label>
                                <select class="form-select" id="docente_id" name="docente_id" required disabled>
                                </select>
                                    <span class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-6">
                                <label for="periodo_academico_id" class="form-label">Periodo Académico</label>
                                <select class="form-select" id="periodo_academico_id" name="periodo_academico_id" required disabled>
                                </select>
                                    <span class="invalid-feedback"></span>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="aula_id" class="form-label">Aula</label>
                                <select class="form-select" id="aula_id" name="aula_id" required disabled>
                                </select>
                                    <span class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-4">
                                <label for="hora_inicio" class="form-label">Hora de inicio</label>
                                <input type="text" class="form-control" id="hora_inicio" name="hora_inicio" required placeholder="HH:MM:SS (Formato 24H)">
                                <span class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-4">
                                <label for="hora_fin" class="form-label">Hora de fin</label>
                                <input type="text" class="form-control" id="hora_fin" name="hora_fin" required placeholder="HH:MM:SS (Formato 24H)">
                                <span class="invalid-feedback"></span>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="cupos" class="form-label">Cupos</label>
                                <input type="number" class="form-control" id="cupos" name="cupos" required placeholder="Ingrese una cantidad">
                                <span class="invalid-feedback"></span>
                            </div>
                            <div class="col-md-6">
                                <label for="dias" class="form-label">Días</label>
                                <input type="text" class="form-control" id="dias" name="dias" required placeholder="Lunes, Martes, Miércoles...">
                                <span class="invalid-feedback"></span>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-12 text-center">
                                <button type="button" class="btn btn-danger ms-2" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary">Confirmar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
`;
/*
{
    *   "clase_id": 1,
    *   "docente_id": 2,
    *   "periodo_academico_id": 3,
    *   "aula_id": 4,
    *   "hora_inicio": "08:00:00",
    *   "hora_fin": "10:00:00",
    *   "cupos": 30,
    *   "dias": "Lunes,Miércoles"
    * }
    **/