import { StudentClassFetch } from "../../fetchs/studentClassFetch.js";

// Variable para saber cuál clase se está evaluando en el modal
let currentClaseId = null;

// Estas funciones deben estar en el scope o script global para que el modal funcione
window.evaluacionModal = function(claseId) {
  currentClaseId = claseId;
  document.getElementById('evaluacionModal').style.display = 'block';
};

window.cerrarModeal = function() {
  document.getElementById('evaluacionModal').style.display = 'none';
  document.getElementById('evaluacionForm').reset();
};

window.evaluacion = function(event) {
  event.preventDefault();
  
  // Ocultar botón y mostrar nota
  const fila = document.querySelector(`tr[data-clase-id="${currentClaseId}"]`);
  if (fila) {
    fila.querySelector('.btn-evaluar').style.display = 'none';
    // Mostramos la celda de nota y añadimos el texto que prefieras
    const notaCell = fila.querySelector('.nota');
    notaCell.textContent = "Docente Evaluado"; 
    notaCell.style.display = 'table-cell';
  }

  cerrarModeal();
};

// Función principal para desplegar las calificaciones
export function desplegarCalificaciones(estudianteId) {
  const tbody = document.querySelector("#tabla-calificaciones tbody");
  tbody.innerHTML = "";

  StudentClassFetch.getClasesEstudiante(estudianteId)
    .then((response) => {
      // Si tu JSON es { success: true, data: [...] }
      // extraes el arreglo así
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
          // Creamos una fila <tr> con un data-attribute para identificar la clase
          const row = document.createElement("tr");
          row.dataset.claseId = item.clase_id;

          // 1. Celda: Clase
          const claseCell = document.createElement("td");
          // Ajusta según la propiedad real (ej. item.nombre_clase o item.clase)
          claseCell.textContent = item.nombre_clase || "Sin nombre";
          row.appendChild(claseCell);

          // 2. Celda: Docente
          const docenteCell = document.createElement("td");
          // Si 'docente' es un objeto con nombre y apellido
          if (item.docente && typeof item.docente === 'object') {
            docenteCell.textContent = (item.docente.nombre || "") + " " + (item.docente.apellido || "");
          } else {
            docenteCell.textContent = item.docente || "No asignado";
          }
          row.appendChild(docenteCell);

          // 3. Celda: Acción -> Botón "Evaluar Docente"
          const accionCell = document.createElement("td");
          const evaluarBtn = document.createElement("button");
          evaluarBtn.classList.add("btn-evaluar");
          evaluarBtn.textContent = "Evaluar Docente";

          // Al hacer clic, abrimos el modal y guardamos el ID de la clase
          evaluarBtn.addEventListener("click", () => window.evaluacionModal(item.clase_id));
          accionCell.appendChild(evaluarBtn);
          row.appendChild(accionCell);

          // 4. Celda: Nota (por defecto oculta)
          const notaCell = document.createElement("td");
          notaCell.classList.add("nota");
          notaCell.style.display = "none"; // Oculta inicialmente
          // Puedes poner un texto por defecto o dejarlo vacío
          notaCell.textContent = "";
          row.appendChild(notaCell);

          // Agregamos la fila a la tabla
          tbody.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error al cargar las calificaciones:", error);
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "Error al cargar la información.";
      row.appendChild(cell);
      tbody.appendChild(row);
    });
}

// Llamada a la función con el ID del estudiante
const idEstudiante = sessionStorage.getItem("estudiante_id");
desplegarCalificaciones(idEstudiante);
