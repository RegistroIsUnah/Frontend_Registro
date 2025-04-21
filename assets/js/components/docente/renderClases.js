/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/04/07
 * 
 * Función encargada de cargar estructura de las clases y detalles.
 */

import { createPaginationSystem } from "../../utils/pagination.js";
import { notasIndividuales } from "./loadDocenteView.js";

export function loadAllClasses(clasesArray) {
  const classesGrid = document.getElementById('classesGrid');
  classesGrid.innerHTML = '';

  if (!clasesArray.length) {
    classesGrid.innerHTML = '<p>No hay clases asignadas.</p>';
    return;
  }

  clasesArray.forEach(clase => {
    const {
      clase_id,
      codigo_clase,
      nombre_clase,
      creditos,
      tiene_laboratorio,
      seccion,
      periodo_academico
    } = clase;

    const dias = seccion.dias.nombres_dias.join(', ');
    const horario = `${dias} ${seccion.hora_inicio} - ${seccion.hora_fin}`;
    const ubicacion = `${seccion.ubicacion.edificio}, ${seccion.ubicacion.aula}`;
    const periodo = `Año ${periodo_academico.anio}, Periodo ${periodo_academico.numero_periodo_id}`;
    const labBadge = tiene_laboratorio ? `<span class="badge bg-warning text-dark">Con Laboratorio</span>` : '';

    const classCard = document.createElement('div');
    classCard.className = 'class-card';
    classCard.innerHTML = `
          <div class="card mb-3">
              <div class="card-body">
                  <h5 class="card-title">${nombre_clase}</h5>
                  <p class="card-text">
                      <small class="text-muted">${codigo_clase}</small><br>
                      ${horario}<br>
                      <strong>Créditos:</strong> ${creditos}<br>
                      <strong>Ubicación:</strong> ${ubicacion}<br>
                      ${labBadge}
                  </p>
                  <button class="btn btn-outline-primary view-class-btn" data-class-id="${clase_id}">
                      Ver detalles
                  </button>
              </div>
          </div>
      `;

    classesGrid.appendChild(classCard);
  });
}

let pagination;

export function renderClassDetail(clase, estudiantes) {
  document.getElementById('classNameDetail').textContent = clase.nombre_clase;
  document.getElementById('classCodeDetail').textContent = clase.codigo_clase;

  const dias = clase.seccion.dias.nombres_dias.join(', ');
  const horario = `${dias} ${clase.seccion.hora_inicio} - ${clase.seccion.hora_fin}`;
  document.getElementById('classScheduleDetail').textContent = horario;
  document.getElementById('studentsCountDetail').textContent = estudiantes.length;

  if (!pagination) {
    pagination = createPaginationSystem({
      itemsPerPage: 12,
      containerId: 'pagination',
      flattenFn: (data) => data,
      groupFn: (original, currentItems) => currentItems,
      renderFn:  (currentItems) => renderStudentRows(currentItems, clase)
    });
  }

  pagination.setData(estudiantes);
  pagination.renderPage();
}

function renderStudentRows(estudiantes, clase) {
  const tbody = document.getElementById('studentsTableBody');
  tbody.innerHTML = '';

  estudiantes.forEach((est, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${est.numero_cuenta}</td>
      <td>${est.nombre} ${est.apellido}</td>
      <td>
        <input type="number" class="form-control grade-input" min="0" max="100" data-cuenta="${est.numero_cuenta}">
      </td>
      <td>
        <select class="form-select estado-select">
          <option value="">---</option>
          <option value="1">Abandonada</option>
          <option value="2">Reprobada</option>
          <option value="3">Aprobada</option>
          <option value="4">Cancelada</option>
          <option value="5">Pendiente</option>
        </select>
      </td>
      <td>
        <input type="text" class="form-control obs-input" placeholder="Observación">
      </td>
      <td>
      <button type="button" class="guardar-btn btn"  style="background-color: #12a9c2; color:white;" data-seccion-id="${clase.seccion.seccion_id}"> Calificar </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  notasIndividuales();
}


export function renderClassDetailStudent(clase) {
  document.getElementById('classNameDetail').textContent = clase.nombre_clase;
  document.getElementById('classCodeDetail').textContent = clase.codigo_clase;
  
  const dias = clase.seccion.dias.nombres_dias.join(', ');
  const horario = `${dias} ${clase.seccion.hora_inicio} - ${clase.seccion.hora_fin}`;
  document.getElementById('classScheduleDetail').textContent = horario;

  document.getElementById('classDescriptionDetail').textContent = clase.descripcion || "";

  // Mostrar el video si existe
  const videoContainer = document.getElementById('videoContainer');
  if (clase.seccion.video_url) {
    const videoId = extractYouTubeId(clase.seccion.video_url);
    if (videoId) {
      videoContainer.innerHTML = `
        <div class="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      videoContainer.innerHTML = `<p>No se pudo cargar el video.</p>`;
    }
  } else {
    videoContainer.innerHTML = `<p>Esta clase no tiene video introductorio.</p>`;
  }
}


function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


