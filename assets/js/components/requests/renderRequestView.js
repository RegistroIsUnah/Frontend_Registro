// RenderRequestView.js
import { createPaginationSystem } from "../../utils/pagination.js" 
import { genericCardView } from "./request-views/defaultRequestView.js";
import { ConstValues } from "../../utils/constValues.js";

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
                        onclick="revisarSolicitud(${solicitud.solicitud_id})"
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
