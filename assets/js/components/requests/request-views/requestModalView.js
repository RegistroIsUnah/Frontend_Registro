
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
                        <div class="btn-group">
                            <button id="btn-rechazar" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-exclamation-triangle"></i> Rechazar por:
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" data-motivo-id="1">Falta copia de la cedula</a></li>
                                <li><a class="dropdown-item" data-motivo-id="2">Falta de Requisitos</a></li>
                                <li><a class="dropdown-item" data-motivo-id="3">Error en el Formulario</a></li>
                                <li><a class="dropdown-item" data-motivo-id="4">Falta de Pago de Matricula</a></li>
                                <li><a class="dropdown-item" data-motivo-id="5">Otro</a></li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-info" id="btn-enviar">Enviar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML("beforeend", modalHTML);
        
    }
};