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
