import { StudentClassFetch } from "../../fetchs/studentClassFetch.js";

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.4
 * @since 2025‑04‑20
 */

export async function desplegarCalificaciones(estudianteId) {
  const tbody = document.querySelector("#tabla-calificaciones tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  try {
    const { data: clases } = await StudentClassFetch.getClasesEstudiante(estudianteId);

    if (!clases?.length) {
      tbody.innerHTML = `<tr><td colspan="4">No se encontraron clases.</td></tr>`;
      return;
    }

    clases.forEach(item => {
      const row = document.createElement("tr");
      row.dataset.claseId = item.clase_id;

      /* ─── Clase ─── */
      row.insertAdjacentHTML(
        "beforeend",
        `<td>${item.nombre_clase ?? "Sin nombre"}</td>`
      );

      /* ─── Docente ─── */
      const docente =
        item.docente && typeof item.docente === "object"
          ? `${item.docente.nombre ?? ""} ${item.docente.apellido ?? ""}`
          : item.docente ?? "No asignado";
      row.insertAdjacentHTML("beforeend", `<td>${docente}</td>`);

      /* ─── Acción ─── */
      const accionCell = document.createElement("td");
      const evaluarBtn = document.createElement("button");
      evaluarBtn.className = "btn-evaluar";
      evaluarBtn.textContent = "Evaluar Docente";
      evaluarBtn.onclick = () =>
        window.evaluacionModal(
          item.clase_id,
          item.docente?.docente_id ?? null,
          item.periodo_academico?.numero_periodo_id ?? null,
          item.seccion?.seccion_id ?? null
        );
      accionCell.appendChild(evaluarBtn);
      row.appendChild(accionCell);

      /* ─── Nota (oculta hasta evaluar) ─── */
      const notaCell = document.createElement("td");
      notaCell.className = "nota";
      notaCell.style.display = "none";          // se revelará tras la evaluación
      row.appendChild(notaCell);

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="4">Error al cargar datos.</td></tr>`;
  }
}

/* Primera carga */
desplegarCalificaciones(sessionStorage.getItem("estudiante_id"));

/* Exponemos la función */
window.desplegarCalificaciones = desplegarCalificaciones;
