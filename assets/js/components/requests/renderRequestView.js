// RenderRequestView.js
import { createPaginationSystem } from "../../utils/pagination.js";
import { genericCardView } from "./request-views/defaultRequestView.js";
import { ConstValues } from "../../utils/constValues.js";
import { requestModalView } from "./request-views/requestModalView.js";
import { bootstrapAlert } from "../../utils/alerts.js";

/**
 * @author danielpalacios@unah.hn
 * @version 1.0.0
 * @since 2025/04/20
 */

// -----------------------------------------------------------------------------
// Utilidades de paginación
// -----------------------------------------------------------------------------
function flattenRequests(dataOriginal) {
  return dataOriginal;            // los datos ya vienen planos
}
function groupRequests(_, itemsOnPage) {
  return itemsOnPage;             // no hay agrupación
}


// -----------------------------------------------------------------------------
// Variables de estado (accesibles para el filtrado local)
// -----------------------------------------------------------------------------
let solicitudesGlobalesDelTipo = [];   // dataset completo del tipo cargado
let selectedEstado             = null; // valor del dropdown (“PENDIENTE”, etc.)
let requestsPagination;
// -----------------------------------------------------------------------------
// Clase de vista
// -----------------------------------------------------------------------------
export class RenderRequestView {

  // ---------- Loaders públicos ------------------------------------------------
  static loadAndRenderChangeCareer () { RenderRequestView.fetchAndRender("CAMBIO_CARRERA"); }
  static loadAndRenderChangeCenter () { RenderRequestView.fetchAndRender("CAMBIO_CENTRO"); }
  static loadAndRenderCancelClass  () { RenderRequestView.fetchAndRender("CANCELACION_EXCEPCIONAL"); }

  // ---------- Petición al backend + seteo del paginador -----------------------
  static fetchAndRender (tipo) {
    const url = `${ConstValues.DOMAIN_NAME}/get/solicitudes_por_tipo.php?tipo_solicitud=${tipo}`;

    fetch(url)
      .then(r => r.json())
      .then(r => {
        const solicitudes = r.data
          ? r.data
          : (Array.isArray(r) ? r : [r]);

        solicitudesGlobalesDelTipo = solicitudes;   // guardar dataset crudo
        selectedEstado             = null;          // reiniciar filtros
        document.getElementById("input-num-cuenta").value = "";

        requestsPagination.setData(solicitudesGlobalesDelTipo, true);
        requestsPagination.renderPage();
      })
      .catch(err => console.error("Error al obtener solicitudes:", err));
  }

  // ---------- Render tarjetas en el grid --------------------------------------
  static renderCards (solicitudes) {
    const cont = document.getElementById("contenedor-solicitudes");
    if (!cont) { console.error("No existe #contenedor-solicitudes"); return; }

    cont.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-4";

    solicitudes.forEach(sol => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = genericCardView({
        title      : `Aspirante: ${sol.nombre} ${sol.apellido} <br> ${sol.numero_cuenta}`,
        subtitle   : `Tipo de solicitud: ${sol.tipo_solicitud.replace("_", " ")}`,
        description: `Fecha: ${sol.fecha_solicitud}`,
        tags       : [sol.estado],
        extraHTML  : `
          <button 
            onclick='revisarSolicitud(${JSON.stringify(sol).replace(/'/g, "\\'")})'
            class="btn btn-primary mt-2"
          >
            Revisar
          </button>
        `
      });

      row.appendChild(col);
    });

    cont.appendChild(row);
  }
}

 requestsPagination = createPaginationSystem({
    itemsPerPage : 9,
    containerId  : "pagination-requests",
    flattenFn    : flattenRequests,
    groupFn      : groupRequests,
    renderFn     : RenderRequestView.renderCards,
  });
  

// -----------------------------------------------------------------------------
// Revisión de solicitud (sin cambios respecto a tu versión original)
// -----------------------------------------------------------------------------
window.revisarSolicitud = function (solicitud) {
    requestModalView.render();
  
    const modalElement = document.getElementById("modalRevisionSolicitud");
    const modalBody    = document.getElementById("modal-body-detalle");
  
    modalBody.innerHTML = "Cargando...";
    new bootstrap.Modal(modalElement).show();
  
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
  
    /* ------------- 🔽  BLOQUE QUE FALTABA 🔽 ------------- */
    const waitForElement  = (sel, t = 5000) => new Promise((ok, bad) => {
      const ini = Date.now(), int = setInterval(() => {
        const el = document.querySelector(sel);
        if (el) return clearInterval(int), ok(el);
        if (Date.now() - ini > t) clearInterval(int), bad(`No se encontró ${sel}`);
      }, 50);
    });
    const waitForElements = (sel, t = 5000) => new Promise((ok, bad) => {
      const ini = Date.now(), int = setInterval(() => {
        const els = document.querySelectorAll(sel);
        if (els.length) return clearInterval(int), ok(els);
        if (Date.now() - ini > t) clearInterval(int), bad(`No se encontró ${sel}`);
      }, 50);
    });
  
    (async () => {
      // ‑‑ esperar a que el HTML del modal ya tenga los botones y el dropdown
      const [btnAprobar, btnRechazar, dropdownItems, btnEnviar] = await Promise.all([
        waitForElement("#btn-aprobar"),
        waitForElement("#btn-rechazar"),
        waitForElements(".dropdown-item"),
        waitForElement("#btn-enviar")
      ]);
  
      let motivosSeleccionados = [];
      let decision             = null;
  
      dropdownItems.forEach(item => {
        item.addEventListener("click", e => {
          e.stopPropagation();
          const motivoId = parseInt(e.target.dataset.motivoId, 10);
          if (motivosSeleccionados.includes(motivoId)) {
            motivosSeleccionados = motivosSeleccionados.filter(id => id !== motivoId);
            e.target.classList.remove("active");
          } else {
            motivosSeleccionados.push(motivoId);
            e.target.classList.add("active");
          }
        });
      });
  
      btnAprobar.onclick = () => { decision = "APROBADA";            };
      btnRechazar.onclick = () => { decision = "DENEGADA";           };
      btnEnviar.onclick   = () => {
        if (!decision) {
          bootstrapAlert("Debes elegir 'Aprobar' o 'Rechazar' antes de enviar", "warning", 3000);
          return;
        }
        if (decision === "DENEGADA" && motivosSeleccionados.length === 0) {
          bootstrapAlert("Selecciona al menos un motivo para denegar", "warning", 3000);
          return;
        }
        procesarSolicitud(
          solicitud.solicitud_id,
          decision,
          solicitud.tipo_solicitud_id,
          motivosSeleccionados
        );
      };
  
      async function procesarSolicitud(id, estado, tipoId, motivos = []) {
        try {
          if (estado === "DENEGADA") {
            await Promise.all(motivos.map(motivoId =>
              fetch(`${ConstValues.DOMAIN_NAME}/post/rechazar_solicitud.php`, {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body   : JSON.stringify({ solicitud_id: id, motivo_id: motivoId.toString() })
              }).then(r => r.json())
            ));
            bootstrapAlert("Solicitud denegada correctamente", "success", 3000);
          } else {
            await fetch(`${ConstValues.DOMAIN_NAME}/post/aceptar_solicitud.php`, {
              method : "POST",
              headers: { "Content-Type": "application/json" },
              body   : JSON.stringify({ solicitud_id: id })
            }).then(r => r.json());
            bootstrapAlert("Solicitud aceptada correctamente", "success", 3000);
          }
        } catch (err) {
          console.error("Error procesando solicitud:", err);
          bootstrapAlert("Hubo un error, inténtalo de nuevo", "danger", 3000);
        }
      }
    })();
    /* ------------- 🔼  FIN DEL BLOQUE FALTANTE 🔼 ------------- */
  };
  

// -----------------------------------------------------------------------------
// FILTRADO Y BÚSQUEDA EN EL FRONTEND
// -----------------------------------------------------------------------------
function filtrarSolicitudesFrontEnd () {
  const numeroCuenta = document.getElementById("input-num-cuenta").value.trim();

  const filtradas = solicitudesGlobalesDelTipo.filter(sol => {
    const okEstado  = !selectedEstado || sol.estado === selectedEstado;
    const okCuenta  = !numeroCuenta  || sol.numero_cuenta === numeroCuenta;
    return okEstado && okCuenta;
  });

  requestsPagination.setData(filtradas, true);
  requestsPagination.renderPage();
}

// -----------------------------------------------------------------------------
// Listeners DOM (se enganchan una sola vez)
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

  // botón de búsqueda por No. de cuenta
  const btnBuscar = document.getElementById("btn-buscar");
  if (btnBuscar) btnBuscar.addEventListener("click", filtrarSolicitudesFrontEnd);

  // ítems del dropdown de estado
  document
    .querySelectorAll("#dropdown-estados .dropdown-item")
    .forEach(item => item.addEventListener("click", e => {
      selectedEstado = e.target.getAttribute("data-estado");
      filtrarSolicitudesFrontEnd();
    }));
});
