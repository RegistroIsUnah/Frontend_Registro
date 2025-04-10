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
                      <small>Periodo: ${periodo}</small><br>
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
//Hasta Aca.

export function renderClassDetail(clase, estudiantes) {
  document.getElementById('classNameDetail').textContent = clase.nombre_clase;
  document.getElementById('classCodeDetail').textContent = clase.codigo_clase;

  const dias = clase.seccion.dias.nombres_dias.join(', ');
  const horario = `${dias} ${clase.seccion.hora_inicio} - ${clase.seccion.hora_fin}`;
  document.getElementById('classScheduleDetail').textContent = horario;
  document.getElementById('studentsCountDetail').textContent = estudiantes.length;

  const tbody = document.getElementById('studentsTableBody');
  tbody.innerHTML = '';

  estudiantes.forEach((est, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${est.numero_cuenta}</td>
      <td>${est.nombre} ${est.apellido}</td>
      <td><input type="number" class="form-control" min="0" max="100"></td>
    `;
    tbody.appendChild(row);
  });
}

export function renderClassDetailStudent(clase) {
  document.getElementById('classNameDetail').textContent = clase.nombre_clase;
  document.getElementById('classCodeDetail').textContent = clase.codigo_clase;
  
  const dias = clase.seccion.dias.nombres_dias.join(', ');
  const horario = `${dias} ${clase.seccion.hora_inicio} - ${clase.seccion.hora_fin}`;
  document.getElementById('classScheduleDetail').textContent = horario;
  
  // Agrega otros detalles específicos para estudiantes, por ejemplo:
  document.getElementById('classDescriptionDetail').textContent = clase.descripcion || "";
}