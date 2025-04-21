// RenderRequestView.js
import { createPaginationSystem } from "../../utils/pagination.js" 
import { genericCardView } from "./request-views/defaultRequestView.js";
import { ConstValues } from "../../utils/constValues.js";
import { requestModalView } from "./request-views/requestModalView.js";
import {bootstrapAlert} from "../../utils/alerts.js"

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/08
 */


// 1. Funciones para "aplanar" y "agrupar" los datos (en este caso, solicitudes). 
//    Como las solicitudes son ya un array simple, no necesitas agrupar nada.
function flattenRequests(dataOriginal) {
    return dataOriginal; 
}
function groupRequests(originalData, itemsOnPage) {
    return itemsOnPage; 
}

// 2. Crear la instancia de paginación con tus funciones y configuración.
const requestsPagination = createPaginationSystem({
    itemsPerPage: 9,                 
    containerId: "pagination-requests", 
    flattenFn: flattenRequests,
    groupFn: groupRequests,
    renderFn: (dataToRender) => {

        RenderRequestView.renderCards(dataToRender);
    },
});

export class RenderRequestView {
    
    static loadAndRenderChangeCareer() {
        RenderRequestView.fetchAndRender("CAMBIO_CARRERA", RenderRequestView.renderRequestChangeCareerView);
    }
    static loadAndRenderChangeCenter() {
        RenderRequestView.fetchAndRender("CAMBIO_CENTRO", RenderRequestView.renderRequestChangeCenterView);
    }
    static loadAndRenderCancelClass() {
        RenderRequestView.fetchAndRender("CANCELACION_EXCEPCIONAL", RenderRequestView.renderRequestCancelClassView);
    }

    /**
     * Hace fetch de las solicitudes según un tipo y llama la función de render correspondiente.
     * @param {string} tipo - Tipo de solicitud, p.ej "CAMBIO_CARRERA", "CAMBIO_CENTRO", etc.
     * @param {function} renderFn - Función que recibe las solicitudes y las pinta.
     */
    static fetchAndRender(tipo, renderFn) {
        const url = `${ConstValues.DOMAIN_NAME}/get/solicitudes_por_tipo.php?tipo_solicitud=${tipo}`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                // Extraer arreglo de solicitudes
                const solicitudes = response.data
                    ? response.data
                    : (Array.isArray(response) ? response : [response]);

                renderFn(solicitudes);
            })
            .catch(err => {
                console.error("Error al obtener solicitudes:", err);
            });
    }

    // Los métodos específicos solo setean la data al paginador y dibujan la primera página
    static renderRequestChangeCareerView(solicitudes) {
        requestsPagination.setData(solicitudes, true);
        requestsPagination.renderPage();
    }
    static renderRequestChangeCenterView(solicitudes) {
        requestsPagination.setData(solicitudes, true);
        requestsPagination.renderPage();
    }
    static renderRequestCancelClassView(solicitudes) {
        requestsPagination.setData(solicitudes, true);
        requestsPagination.renderPage();
    }

    /**
     * Recibe un arreglo de solicitudes (ya filtrado/paginado) y genera las tarjetas.
     * @param {Array} solicitudes
     */
    static renderCards(solicitudes) {
        const contenedor = document.getElementById("contenedor-solicitudes");
        if (!contenedor) {
            console.error("No se encontró el elemento con id='contenedor-solicitudes'");
            return;
        }
        contenedor.innerHTML = "";

        const row = document.createElement("div");
        row.className = "row row-cols-1 row-cols-md-3 g-4";

        solicitudes.forEach(solicitud => {
            const col = document.createElement("div");
            col.className = "col";

            // Insertar tarjetas
            col.innerHTML = genericCardView({
                title: `Aspirante: ${solicitud.nombre} ${solicitud.apellido}`,
                subtitle: `Tipo de solicitud: ${solicitud.tipo_solicitud.replace("_", " ")}`,
                description: `Fecha: ${solicitud.fecha_solicitud}`,
                tags: [solicitud.estado],
                extraHTML: `
                    <button 
                        onclick='revisarSolicitud(${JSON.stringify(solicitud).replace(/'/g, "\\'")})'
                        class="btn btn-primary mt-2"
                    >
                        Revisar
                    </button>
                `
            });

            row.appendChild(col);
        });
        contenedor.appendChild(row);
    }
}





window.revisarSolicitud = function (solicitud) {

    //MOSTAR LA SOLICITUD
    requestModalView.render();

    console.log(solicitud);
    const modalElement = document.getElementById("modalRevisionSolicitud");
    const modalBody = document.getElementById("modal-body-detalle");

    modalBody.innerHTML = "Cargando...";
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Renderizado básico de la información en el modal
    modalBody.innerHTML = `
        <p><strong>Nombre:</strong> ${solicitud.nombre} ${solicitud.apellido}</p>
        <p><strong>Tipo:</strong> ${solicitud.tipo_solicitud.replace("_", " ")}</p>
        <p><strong>Estado:</strong> ${solicitud.estado}</p>
        <p><strong>Fecha de solicitud:</strong> ${solicitud.fecha_solicitud}</p>
        <p><strong>Descripción:</strong> ${solicitud.descripcion || "N/A"}</p>
        ${
          solicitud.archivo_pdf
            ? `
              <hr>
              <p><strong>Archivo adjunto:</strong></p>
              <iframe src="${ConstValues.DOMAIN_NAME_UPLOAD}/solicitudes_exceptcionales/${solicitud.archivo_pdf}" 
                      width="100%" height="400px" style="border:1px solid #ccc;"></iframe>
            `
            : "<p><strong>Archivo:</strong> No disponible</p>"
        }
    `;

    //REALIZAR LA SOLICITUD

    const waitForElement = (selector, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                } else if (Date.now() - start > timeout) {
                    clearInterval(interval);
                    reject(new Error(`Elemento '${selector}' no encontrado después de ${timeout}ms`));
                }
            }, 50);
        });
    };

    const waitForElements = (selector, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const interval = setInterval(() => {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    clearInterval(interval);
                    resolve(elements);
                } else if (Date.now() - start > timeout) {
                    clearInterval(interval);
                    reject(new Error(`Elementos '${selector}' no encontrados después de ${timeout}ms`));
                }
            }, 50);
        });
    };

    (async () => {
        await Promise.all([
            waitForElement("#btn-aprobar"),
            waitForElement("#btn-rechazar"),
            waitForElements(".dropdown-item"),
            waitForElement("#btn-enviar")
        ]);

        let motivosSeleccionados = [];
        let decision = null;

        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const motivoId = parseInt(e.target.dataset.motivoId);

                if (motivosSeleccionados.includes(motivoId)) {
                    motivosSeleccionados = motivosSeleccionados.filter(id => id !== motivoId);
                    e.target.classList.remove("active");
                } else {
                    motivosSeleccionados.push(motivoId);
                    e.target.classList.add("active");
                }
            });
        });

        document.getElementById("btn-aprobar").onclick = () => {
            decision = "APROBADA";
        };

        document.getElementById("btn-rechazar").onclick = () => {
            decision = "DENEGADA";
        };


        document.getElementById("btn-enviar").onclick = () => {
            if (!decision) {
                bootstrapAlert("Debes elegir primero 'Aprobar' o 'Rechazar' antes de enviar","warning",3000);
                return;
            }

            if (decision === "DENEGADA" && motivosSeleccionados.length === 0) {
                bootstrapAlert("Debe seleccionar al menos un motivo para denegar la solicitud","warning",3000);
                return;
            }

            procesarSolicitud(
                solicitud.solicitud_id,
                decision, // "APROBADA" o "DENEGADA"
                solicitud.tipo_solicitud_id,
                motivosSeleccionados
            );
        };

        async function procesarSolicitud(solicitudId, estado, tipo_solicitud_id, motivos = []) {
            if (estado === "DENEGADA") {
                try {
                    const respuestas = await Promise.all(
                        motivos.map(motivoId =>
                            fetch(`${ConstValues.DOMAIN_NAME}/post/rechazar_solicitud.php`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ solicitud_id: solicitudId, motivo_id: motivoId.toString() })
                            }).then(response => response.json())
                        )
                    );

                    console.log("Respuestas del servidor:", respuestas);
                    bootstrapAlert("Solicitud denegada correctamente","success",3000);
                } catch (error) {
                    console.error("Error al denegar la solicitud:", error);
                    bootstrapAlert("Error al procesar la solicitud. Inténtalo de nuevo","danger",3000);
                }
            } else if (estado === "APROBADA") {
                try {
                    const respuesta = await fetch(`${ConstValues.DOMAIN_NAME}/post/aceptar_solicitud.php`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ solicitud_id: solicitudId })
                    }).then(response => response.json());

                    console.log("Respuesta del servidor:", respuesta);
                    bootstrapAlert("Solicitud aceptada correctamente","success",3000);
                } catch (error) {
                    console.error("Error al aprobar la solicitud:", error);
                    bootstrapAlert("Error al procesar la solicitud. Inténtalo de nuevo","danger",3000);
                }
            }
        }
    })();
};
