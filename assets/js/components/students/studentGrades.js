import { StudentClassFetch } from "../../fetchs/studentClassFetch.js";

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */



let currentClaseId = null;

window.evaluacionModal = function(claseId, docenteId, periodoId) {
  currentClaseId = claseId;
  window.currentDocenteId = docenteId;
  window.currentPeriodoId = periodoId;
  document.getElementById('evaluacionModal').style.display = 'block';
};

window.cerrarModeal = function() {
  document.getElementById('evaluacionModal').style.display = 'none';
  document.getElementById('evaluacionForm').reset();
};

window.evaluacion = function(event) {
  event.preventDefault();

  const fila = document.querySelector(`tr[data-clase-id="${currentClaseId}"]`);
  if (fila) {
    fila.querySelector('.btn-evaluar').style.display = 'none';
    const notaCell = fila.querySelector('.nota');
    notaCell.textContent = "Docente Evaluado"; 
    notaCell.style.display = 'table-cell';
  }

  cerrarModeal();
};

export function desplegarCalificaciones(estudianteId) {
  const tbody = document.querySelector("#tabla-calificaciones tbody");
  tbody.innerHTML = "";

  StudentClassFetch.getClasesEstudiante(estudianteId)
    .then((response) => {
      const clases = response.data || [];
      
      if (clases.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4; 
        cell.textContent = "No se encontraron clases.";
        row.appendChild(cell);
        tbody.appendChild(row);
      } else {
        clases.forEach((item) => {
          const row = document.createElement("tr");
          row.dataset.claseId = item.clase_id;

          const claseCell = document.createElement("td");
          claseCell.textContent = item.nombre_clase || "Sin nombre";
          row.appendChild(claseCell);

          const docenteCell = document.createElement("td");
          if (item.docente && typeof item.docente === 'object') {
            docenteCell.textContent = (item.docente.nombre || "") + " " + (item.docente.apellido || "");
          } else {
            docenteCell.textContent = item.docente || "No asignado";
          }
          row.appendChild(docenteCell);

          const accionCell = document.createElement("td");
          const evaluarBtn = document.createElement("button");
          evaluarBtn.classList.add("btn-evaluar");
          evaluarBtn.textContent = "Evaluar Docente";

          evaluarBtn.addEventListener("click", () => {
            console.log("Abriendo modal con:", item.clase_id, item.docente?.docente_id, item.periodo_academico?.numero_periodo_id);
            window.evaluacionModal(
              item.clase_id,
              item.docente?.docente_id ?? null,
              item.periodo_academico?.numero_periodo_id ?? null
            );
          });

          accionCell.appendChild(evaluarBtn);
          row.appendChild(accionCell);

          const notaCell = document.createElement("td");
          notaCell.classList.add("nota");
          notaCell.style.display = "none"; 
          notaCell.textContent = "";
          row.appendChild(notaCell);

          tbody.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error al cargar las calificaciones:", error);
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "Error al cargar datos.";
      row.appendChild(cell);
      tbody.appendChild(row);
    });
}

const idEstudiante = sessionStorage.getItem("estudiante_id");
desplegarCalificaciones(idEstudiante);
