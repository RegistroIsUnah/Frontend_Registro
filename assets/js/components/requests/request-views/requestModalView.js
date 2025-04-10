
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */


export const requestModalView = {
    render() {
        if (document.getElementById("modalRevisionSolicitud")) return;

        const modalHTML = `
        <div class="modal fade" id="modalRevisionSolicitud" tabindex="-1" aria-labelledby="modalRevisionLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalRevisionLabel">Detalle de Solicitud</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body" id="modal-body-detalle">
                        Cargando...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="btn-aprobar">Aprobar</button>
                        <button type="button" class="btn btn-danger" id="btn-rechazar">Rechazar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML("beforeend", modalHTML);
    }
};
