// RenderRequestView.js
import { createPaginationSystem } from "../../utils/pagination.js";
import { genericCardView } from "./request-views/defaultRequestView.js";
import { ConstValues } from "../../utils/constValues.js";
import { requestModalView } from "./request-views/requestModalView.js";
import { bootstrapAlert } from "../../utils/alerts.js";

/**
 * @author 
 * @version 
 * @since
 */

// Funciones para "aplanar" y "agrupar" los datos 
function flattenRequests(dataOriginal) {
    return dataOriginal;
}
function groupRequests(originalData, itemsOnPage) {
    return itemsOnPage;
}

// 1) Crear la instancia de paginación.
const requestsPagination = createPaginationSystem({
    itemsPerPage: 9,
    containerId: "pagination-requests",
    flattenFn: flattenRequests,
    groupFn: groupRequests,
    renderFn: (dataToRender) => {
        RenderRequestView.renderCards(dataToRender);
    },
});

/**
 * Variable global que mantendrá "todas" las solicitudes del tipo actual,
 * para poder filtrar en el frontend.
 */
let solicitudesGlobalesDelTipo = [];

export class RenderRequestView {

    /**
     * Carga y muestra todas las solicitudes de CAMBIO_CARRERA
     */
    static loadAndRenderChangeCareer() {
        RenderRequestView.fetchAndRender("CAMBIO_CARRERA");
    }

    /**
     * Carga y muestra todas las solicitudes de CAMBIO_CENTRO
     */
    static loadAndRenderChangeCenter() {
        RenderRequestView.fetchAndRender("CAMBIO_CENTRO");
    }

    /**
     * Carga y muestra todas las solicitudes de CANCELACION_EXCEPCIONAL
     */
    static loadAndRenderCancelClass() {
        RenderRequestView.fetchAndRender("CANCELACION_EXCEPCIONAL");
    }

    /**
     * Hace fetch de todas las solicitudes de un tipo y las almacena en memoria.
     * Luego setea la data al paginador y dibuja la primera página.
     * @param {string} tipo - Tipo de solicitud ("CAMBIO_CARRERA", "CAMBIO_CENTRO", etc.)
     */
    static fetchAndRender(tipo) {
        const url = `${ConstValues.DOMAIN_NAME}/get/solicitudes_por_tipo.php?tipo_solicitud=${tipo}`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                // Extraer arreglo de solicitudes
                const solicitudes = response.data
                    ? response.data
                    : (Array.isArray(response) ? response : [response]);

                // Guardar en variable global
                solicitudesGlobalesDelTipo = solicitudes;

                // Renderizar
                requestsPagination.setData(solicitudesGlobalesDelTipo, true);
                requestsPagination.renderPage();
            })
            .catch(err => {
                console.error("Error al obtener solicitudes:", err);
            });
    }

    /**
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

            col.innerHTML = genericCardView({
                title: `Aspirante: ${solicitud.nombre} ${solicitud.apellido} <br> ${solicitud.numero_cuenta}`,
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

//----------------- LÓGICA DE REVISAR SOLICITUD -----------------//
window.revisarSolicitud = function (solicitud) {
    requestModalView.render();

    console.log(solicitud);
    const modalElement = document.getElementById("modalRevisionSolicitud");
    const modalBody = document.getElementById("modal-body-detalle");

    modalBody.innerHTML = "Cargando...";
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    modalBody.innerHTML = `
        <p><strong>Nombre:</strong> ${solicitud.nombre} ${solicitud.apellido}</p>
        <p><strong>No.Cuenta:</strong> ${solicitud.numero_cuenta}</p>
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

    // Resto de la lógica de revisión (rechazar, aprobar, etc.) ...
    // ...
};

//--------------------------------------------------
// 2) FILTRADO EN EL FRONTEND
//--------------------------------------------------
let selectedEstado = null;

/**
 * Filtrar las solicitudes globales en el frontend
 * basado en el estado y número de cuenta ingresado.
 */
function filtrarSolicitudesFrontEnd() {
    const numeroCuenta = document.getElementById("input-num-cuenta").value.trim();

    // 1) Filtrar sobre solicitudesGlobalesDelTipo
    let solicitudesFiltradas = solicitudesGlobalesDelTipo.filter(solic => {
        // Coincidencia de estado (si "selectedEstado" está definido)
        const coincideEstado = !selectedEstado || solic.estado === selectedEstado;
        // Coincidencia de número de cuenta (si "numeroCuenta" no está vacío)
        const coincideCuenta = !numeroCuenta || solic.numero_cuenta === numeroCuenta;
        return coincideEstado && coincideCuenta;
    });

    // 2) Setear las solicitudes filtradas en el paginador y renderizar
    requestsPagination.setData(solicitudesFiltradas, true);
    requestsPagination.renderPage();
}

// 3) Listeners que usan el filtrado local
document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById("btn-buscar");
    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            filtrarSolicitudesFrontEnd();
        });
    }

    const dropdownItems = document.querySelectorAll("#dropdown-estados .dropdown-item");
    dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
            selectedEstado = e.target.getAttribute("data-estado");
            filtrarSolicitudesFrontEnd();
        });
    });
});
