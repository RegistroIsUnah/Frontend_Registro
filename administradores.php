<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administradores</title>
  <link rel="stylesheet" href="css/administradores.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>

  <div class="dashboard">
    <!-- Sidebar -->
    <div class="sidebar">
      <h3 class="mb-4">Panel de Administrador</h3>
      <nav class="nav flex-column">
        <a class="nav-link active" href="#!" onclick="showModule('docentes')">
          <i class="bi bi-people-fill me-2"></i> Gestionar Docentes
        </a>
        <a class="nav-link" href="#!" onclick="showModule('academica')">
          <i class="bi bi-book me-2"></i> Planificación Académica
        </a>
        <a class="nav-link" href="#!" onclick="showModule('matricula')">
          <i class="bi bi-clipboard-check me-2"></i> Proceso de Matrícula
        </a>

      </nav>
    </div>

    <!-- Contenido Principal -->
    <div class="main-content">
      <div class="container-fluid">
        <!-- Módulo de Docentes (visible por defecto) -->
        <div id="docentes-module">
          <h2 class="mb-4" style="color: #012a5e;">Gestión de Docentes</h2>

          <!-- Botón para abrir modal -->
          <button type="button" class="btn mb-4" data-bs-toggle="modal" data-bs-target="#modalNuevoDocente">
            <i class="bi bi-person-plus"></i> Nuevo Docente
          </button>

          <!-- Tabla de Docentes Registrados -->
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead class="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Número de empleado</th>
                  <th>Centro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Pérez</td>
                  <td>12345</td>
                  <td>Ciudad Universitaria</td>
                  <td>
                    <button class="btn btn-sm btn-success me-2">
                      <i class="bi bi-pencil"></i> Editar
                    </button>

                  </td>
                </tr>
                <tr>
                  <td>María López</td>
                  <td>67890</td>
                  <td>Centro Regional CURL</td>
                  <td>
                    <button class="btn btn-sm btn-success me-2">
                      <i class="bi bi-pencil"></i> Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <!-- Los demás módulos (ocultos inicialmente) -->
        <div id="academica-module" class="d-none">
          <h2>Planificación Académica</h2>
          <!-- Contenido para planificación académica -->
        </div>





        <div id="matricula-module" class="d-none">
          <h2>Proceso de Matrícula</h2>
          <!-- Contenido para proceso de matrícula -->

          <!-- Activar/Desactivar Proceso de Matrícula -->
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              <h5>Activación de matricula</h5>
            </div>
            <div class="card-body">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="activarMatricula">
                <label class="form-check-label" for="activarMatricula">
                  Activar proceso de matrícula
                </label>
              </div>
            </div>
          </div>

          <!-- Calendario de Matrícula -->
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              <h5>Calendario de Matrícula</h5>
            </div>
            <div class="card-body">
              <form id="formCalendarioMatricula">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                    <input type="date" class="form-control" id="fechaInicio" required>
                  </div>
                  <div class="col-md-6">
                    <label for="fechaFin" class="form-label">Fecha de Fin</label>
                    <input type="date" class="form-control" id="fechaFin" required>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-calendar-plus"></i> Generar Calendario
                </button>
              </form>

              <!-- Calendario Generado (Estático) -->
              <div class="mt-4">
                <h6>Calendario Programado</h6>
                <ul class="list-group">
                  <li class="list-group-item">Matrícula Primer Periodo 2025: 10/01/2025 - 07/04/2025</li>
                  <li class="list-group-item">Matrícula Segundo Periodo 2025: 20/04/2025 - 21/08/2025</li>
                  <li class="list-group-item">Matrícula Tercer Periodo 2025: 11/09/2025 - 15/12/2025</li>
                </ul>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Nuevo docente -->
  <div class="modal fade" id="modalNuevoDocente" tabindex="-1" aria-labelledby="modalRegistroLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header text-white " style="background-color: #12a9c2;">
          <h5 class="modal-title">Registro de Docente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form id="formularioDocente">
          <div class="modal-body">

            <!-- Sección de Foto -->
            <div class="row mb-4">
              <div class="col-md-4 text-center">
                <img src="" id="previewFoto" class="profile-preview" alt="Previsualización de foto">
                <input type="file" class="form-control mt-2" id="fotoDocente" accept="image/png, image/jpeg">
              </div>

              <!-- Datos Básicos -->
              <div class="col-md-8">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Nombre(s)</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Apellidos</label>
                    <input type="text" class="form-control">
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Número de empleado</label>
                    <input type="number" min="0" class="form-control">
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Centro</label>
                    <select class="form-select">
                      <option value="">Seleccionar centro</option>
                      <option>Ciudad Universitaria</option>
                      <option>Centro Regional CURL</option>

                    </select>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar Docente</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>





  <!-- Bootstrap JS + Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

  <script>
    // Función para cambiar entre módulos
    function showModule(moduleId) {
      // Oculta todos los módulos
      document.querySelectorAll('[id$="-module"]').forEach(module => {
        module.classList.add('d-none');
      });

      // Muestra el módulo seleccionado
      document.getElementById(`${moduleId}-module`).classList.remove('d-none');
    }

    // Lógica del modal
    document.getElementById('fotoDocente')?.addEventListener('change', function(e) {
      const reader = new FileReader();
      reader.onload = function() {
        document.getElementById('previewFoto').src = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    });

    document.getElementById('formularioDocente')?.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Docente registrado exitosamente!');
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalNuevoDocente'));
      modal.hide();
    });
  </script>

</body>

</html>