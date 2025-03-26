export let informationModal = (title, body, successButtomTitle="Aceptar", attribute='') => `
    <div class="modal fade" id="informationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                    <button ${attribute} id="successButtomModal" type="button" class="btn btn-primary">${successButtomTitle}</button>
                </div>
            </div>
        </div>
    </div>
`;

export let sendFormConfirmationModal = (message) => `

<div class="modal fade" id="sendFormConfirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <h5>${message}</h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button id="sendFormButom" type="button" class="btn btn-success">Enviar</button>
      </div>
    </div>
  </div>
</div>
`;

//document.getElementById("applicants-admission-form").addEventListener("submit", SendForm.validateAdmissionForm);
// Modal para confirmar el envío del formulario de admisión.
/*
let modal = sendFormConfirmationModal("¿Desea enviar la solicitud de admisión?");        
let divModal = document.createElement("div");
divModal.innerHTML = modal;
document.body.appendChild(divModal);
let successModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
*/

export let formResponseModal = () => `
        <div class="modal fade" id="formResponseModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="formResponseModalTitle" class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div id="formResponseModalBody" class="modal-body"></div>
                    <div class="modal-footer">
                        <button id="viewFormDataButton" type="button" class="btn btn-warning">Revisar formulario</button>
                        <button id="acceptFormDataButton" type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>`;


export let messageAlert = (type, message) => `

<div id="messageAlert" class="position-fixed top-0 start-50 translate-middle-x mt-3 p-3 d-flex justify-content-between align-items-center text-white ${type} border-0 rounded" 
     style="z-index: 1050; min-width: 300px;" 
     role="alert" 
     aria-live="assertive" 
     aria-atomic="true">
    <div class="fw-semibold">${message}</div>
    <button type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="alert" 
            aria-label="Close"></button>
</div>
`;

/*
<div id="errorAlert" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
<div class="d-flex">
    <div class="toast-body">
        Error al reenviar el correo
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
</div>
</div>
*/