 // Datos de ejemplo (en un sistema real estos vendrían de una base de datos)
 const classesData = {
    class1: {
      name: "Introducción a la Programación",
      code: "INF-101",
      schedule: "Lunes y Miércoles 10:00-12:00",
      students: 25,
      studentsList: [
        { id: 1, name: "María Pérez González", grade: 85 },
        { id: 2, name: "Juan Martínez López", grade: 78 },
        { id: 3, name: "Carlos Rodríguez Vargas", grade: 92 }
      ],
      video: null
    },
    class2: {
      name: "Estructuras de Datos",
      code: "INF-203",
      schedule: "Martes y Jueves 14:00-16:00",
      students: 30,
      studentsList: [
        { id: 1, name: "Ana Fernández García", grade: 88 },
        { id: 2, name: "Luis González Méndez", grade: 76 },
        { id: 3, name: "Sofía Castro Jiménez", grade: 91 }
      ],
      video: null
    }
  };

  // Variables globales
  let currentClassId = null;

  // Cargar todas las clases
  function loadAllClasses() {
    const classesGrid = document.getElementById('classesGrid');
    classesGrid.innerHTML = '';

    for (const classId in classesData) {
      const classData = classesData[classId];
      
      const classCard = document.createElement('div');
      classCard.className = 'class-card';
      classCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${classData.name}</h5>
            <p class="card-text">
              <small class="text-muted">${classData.code}</small><br>
              ${classData.schedule}<br>
              <span class="badge bg-primary">${classData.students} estudiantes</span>
            </p>
            <button class="btn btn-outline-primary view-class-btn" data-class-id="${classId}">
              Ver detalles
            </button>
          </div>
        </div>
      `;
      
      classesGrid.appendChild(classCard);
    }

    // Agregar event listeners a los botones
    document.querySelectorAll('.view-class-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        showClassDetail(this.dataset.classId);
      });
    });
  }

  // Mostrar detalles de una clase específica
  function showClassDetail(classId) {
    currentClassId = classId;
    const classData = classesData[classId];

    // Actualizar información de la clase
    document.getElementById('classNameDetail').textContent = classData.name;
    document.getElementById('classCodeDetail').textContent = classData.code;
    document.getElementById('classScheduleDetail').textContent = classData.schedule;
    document.getElementById('studentsCountDetail').textContent = classData.students;

    // Cargar lista de estudiantes
    const studentsTableBody = document.getElementById('studentsTableBody');
    studentsTableBody.innerHTML = '';
    
    classData.studentsList.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>
          <input type="number" class="form-control grade-input" 
                 min="0" max="100" value="${student.grade || ''}"
                 data-student-id="${student.id}">
        </td>
      `;
      studentsTableBody.appendChild(row);
    });

    // Cambiar vistas
    document.getElementById('classesView').style.display = 'none';
    document.getElementById('classDetailView').style.display = 'block';
  }

  // Volver a la vista de todas las clases
  function backToClasses() {
    document.getElementById('classesView').style.display = 'block';
    document.getElementById('classDetailView').style.display = 'none';
    currentClassId = null;
  }

  // Descargar listado de estudiantes
  function downloadStudentList() {
    if (!currentClassId) return;
    
    const classData = classesData[currentClassId];
    let csvContent = "Nombre,Calificación\n";
    
    classData.studentsList.forEach(student => {
      csvContent += `"${student.name}",${student.grade}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Listado_${classData.code}_${classData.name.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Guardar calificaciones
  function saveGrades() {
    if (!currentClassId) return;
    
    const inputs = document.querySelectorAll('.grade-input');
    const classData = classesData[currentClassId];
    let allValid = true;
    
    inputs.forEach(input => {
      const value = parseInt(input.value);
      const studentId = parseInt(input.dataset.studentId);
      
      if (isNaN(value)) {
        input.classList.add('is-invalid');
        allValid = false;
      } else {
        input.classList.remove('is-invalid');
        // Actualizar la calificación en los datos
        const student = classData.studentsList.find(s => s.id === studentId);
        if (student) student.grade = value;
      }
    });
    
    if (allValid) {
      alert('Calificaciones guardadas correctamente!');
    } else {
      alert('Por favor corrija las calificaciones inválidas (deben ser números entre 0 y 100)');
    }
  }

  // Subir video
  function submitVideo() {
    const title = document.getElementById('videoTitle').value;
    const url = document.getElementById('videoUrl').value;
    const description = document.getElementById('videoDescription').value;
    
    if (!currentClassId || !title || !url) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    if (!url.match(/youtube\.com|youtu\.be/)) {
      alert('Por favor ingrese un enlace válido de YouTube');
      return;
    }
    
    // Guardar video
    classesData[currentClassId].video = {
      title,
      url,
      description
    };
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('videoModal'));
    modal.hide();
    
    alert('Video guardado exitosamente!');
  }

  // Event listeners
  document.addEventListener('DOMContentLoaded', function() {
    loadAllClasses();
    
    // Botón volver
    document.getElementById('backButton').addEventListener('click', backToClasses);
    
    // Botón descargar listado
    document.getElementById('downloadListBtn').addEventListener('click', downloadStudentList);
    
    // Botón subir video
    document.getElementById('uploadVideoBtn').addEventListener('click', function() {
      const modal = new bootstrap.Modal(document.getElementById('videoModal'));
      modal.show();
    });
    
    // Botón guardar video
    document.getElementById('submitVideoBtn').addEventListener('click', submitVideo);
    
    // Botón guardar calificaciones
    document.getElementById('saveGradesBtn').addEventListener('click', saveGrades);
  });