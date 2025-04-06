/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/20
 * 
 * @param {*} title 
 * @param {*} body 
 * @param {*} successButtomTitle 
 * @param {*} attribute 
 * @returns 
 */
export let informationModal = (title, body, successButtomTitle="Aceptar", attribute='', size="") => `

    <div class="modal fade" id="informationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ${size} modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeModal" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                    <button ${attribute} disabled id="successButtomModal" type="button" data-bs-dismiss="modal" class="btn btn-primary">${successButtomTitle}</button>
                </div>
            </div>
        </div>
    </div>
`;

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/20
 * 
 */
export let sendFormConfirmationModal = (message) => `

<div class="modal fade" id="sendFormConfirmationModal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <h5>${message}</h5>
      </div>
      <div class="modal-footer">
        <button type="button" id="destroyConfirmationModal" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button id="sendFormButom" type="button" class="btn btn-success">Enviar</button>
      </div>
    </div>
  </div>
</div>
`;

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/20
 * 
 * @returns 
 * 
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


/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/20
 * 
 * @param {*} type 
 * @param {*} message 
 * @returns 
 */
export let messageAlert = (type, message) => `

<div id="messageAlert" class="position-fixed top-0 start-50 translate-middle-x mt-3 p-3 d-flex justify-content-between align-items-center text-white ${type} border-0 rounded" 
     style="z-index: 1050; min-width: 300px;" 
     role="alert" 
     aria-live="assertive" 
     aria-atomic="true">
    <div class="fw-semibold">${message}</div>
</div>
`;
