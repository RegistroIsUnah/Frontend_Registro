import { ConstValues } from "../../utils/constValues.js";
import { StudentClassFetch } from "../../fetchs/studentClassFetch.js";

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.2
 * @since 2025‑04‑20
 */

(() => {
  /* ─────────────────────────────  estado interno ───────────────────────────── */
  let currentClaseId   = null;
  let currentDocenteId = null;
  let currentPeriodoId = null;
  let currentSeccionId = null;

  /* ─────────────────────────────── helpers UI ──────────────────────────────── */
  const creaEtiquetaEvaluado = () => {
    const s = document.createElement("span");
    s.textContent = "Docente Evaluado";
    s.classList.add("texto-evaluado");
    return s;
  };

  const cerrarModal = () => {
    const modal = document.getElementById("evaluacionModal");
    modal && (modal.style.display = "none");

    const form = document.getElementById("evaluacionForm");
    form && form.reset();
  };

  /* ───────────────────────────── modal generator ───────────────────────────── */
  function createModalHtml() {
    /* contenedor principal */
    const modal = document.createElement("div");
    modal.id = "evaluacionModal";
    modal.classList.add("modal");

    const modalContenido = document.createElement("div");
    modalContenido.classList.add("modal-contenido");

    const spanClose = document.createElement("span");
    spanClose.classList.add("close");
    spanClose.innerHTML = "&times;";
    spanClose.addEventListener("click", cerrarModal);
    modalContenido.appendChild(spanClose);

    modalContenido.insertAdjacentHTML(
      "beforeend",
      `<h3>Evaluación del Docente</h3>`
    );

    /* formulario dinámico */
    const form = document.createElement("form");
    form.id = "evaluacionForm";
    form.addEventListener("submit", evaluacion);

    const preguntas = [
      "¿El docente explica claramente los temas?",
      "¿El docente está disponible para resolver dudas?",
      "¿El material de clase es adecuado?",
      "¿El docente fomenta la participación?",
      "¿El docente cumple con los horarios?"
    ];

    preguntas.forEach((texto, idx) => {
      const div = document.createElement("div");
      div.classList.add("pregunta");

      div.insertAdjacentHTML(
        "beforeend",
        `<p>${idx + 1}. ${texto}</p>`
      );

      const select = document.createElement("select");
      select.classList.add("combobox");
      select.required = true;

      select.insertAdjacentHTML(
        "beforeend",
        `<option value="">Seleccione...</option>
         <option>Mal</option>
         <option>Bueno</option>
         <option>Excelente</option>`
      );

      div.appendChild(select);
      form.appendChild(div);
    });

    /* botón enviar */
    form.insertAdjacentHTML(
      "beforeend",
      `<button type="submit" class="btn-enviar">Enviar Evaluación</button>`
    );

    modalContenido.appendChild(form);
    modal.appendChild(modalContenido);
    document.body.appendChild(modal);
    return modal;
  }

  /* ────────────────────── función global para abrir modal ──────────────────── */
  window.evaluacionModal = (claseId, docenteId, periodoId, seccionId) => {
    currentClaseId   = claseId;
    currentDocenteId = docenteId;
    currentPeriodoId = periodoId;
    currentSeccionId = seccionId;

    let modal = document.getElementById("evaluacionModal") || createModalHtml();
    modal.style.display = "block";
  };

  /* ────────────────────────────── submit handler ───────────────────────────── */
  async function evaluacion(evt) {
    evt.preventDefault();

    /* construir payload */
    const selects    = document.querySelectorAll("#evaluacionForm .combobox");
    const respuestas = {};
    selects.forEach((s, i) => (respuestas[i + 1] = s.value));

    const payload = {
      estudiante_id : Number(sessionStorage.getItem("estudiante_id")),
      docente_id    : currentDocenteId,
      periodo_id    : currentPeriodoId,
      seccion_id    : currentSeccionId,
      respuestas
    };

    try {
      const res = await fetch(
        `${ConstValues.DOMAIN_NAME}/post/registrar_evaluacion_docente.php`,
        {
          method : "POST",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify(payload)
        }
      );
      const data = await res.json();             // asume respuesta JSON
      console.log("Evaluación registrada:", data);

      let notaDocente = data?.calificacion ?? data?.nota ?? null;
      if (notaDocente == null) {
        // si el endpoint no envía la nota, haz un fetch puntual
        const { data: clases } =
          await StudentClassFetch.getClasesEstudiante(payload.estudiante_id);
        notaDocente =
          clases.find(c => c.clase_id === currentClaseId)?.calificacion ?? "-";
      }

      const fila     = document.querySelector(`tr[data-clase-id="${currentClaseId}"]`);
      const notaCell = fila?.querySelector(".nota");

      if (fila) {
        fila.querySelector(".btn-evaluar")?.replaceWith(creaEtiquetaEvaluado());
        if (notaCell) {
          notaCell.textContent   = notaDocente;
          notaCell.style.display = "table-cell";
        }
      }

      cerrarModal();
    } catch (err) {
      console.error("Error al enviar evaluación:", err);
      alert("Error al enviar evaluación. Revisa la consola para más detalles.");
    }
  }

  document.addEventListener("DOMContentLoaded", createModalHtml);
})();
