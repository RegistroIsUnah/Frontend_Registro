
export let studentClassView = `
    <main class="contenedor">
    <!-- Menú lateral -->
     <section class="main-contenedor" id="menuContainer"></section>

    <!-- Contenido principal -->
    <section class="contenedor2">
      <h2>Bienvenid@ <span id="name"></h2>
      <div class="contenido">

      <!-- INICIO DE LAS DOS VISTAS -->
    <!-- Vista de todas las clases -->
    <div id="classesView" class="classes-container">
          <h3>Mis Clases Asignadas</h3>
          <div class="classes-grid" id="classesGrid"></div>
        </div>

        <!-- Vista detalle de una clase -->
        <div id="classDetailView" style="display: none;">
          <button class="btn btn-secondary mb-3" id="backButton"></i> Volver</button>
          <div class="class-detail-container">
            <h3 id="classNameDetail"></h3>
            <div class="class-meta">
              <span id="classCodeDetail"></span> | 
              <span id="classScheduleDetail"></span> | 
              <span id="studentsCountDetail"></span> estudiantes
            </div>
            
            <div class="class-actions mt-3 mb-4">
              <button class="btn btn-primary" id="downloadListBtn">
               </i> Descargar Listado
              </button>
              <button class="btn btn-success" id="uploadVideoBtn">
                </i> Subir Video
              </button>
            </div>
            
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead style="background-color: #013775;color: white;"">
                  <tr>
                    <th>#</th>
                    <th>Cuenta</th>
                    <th>Estudiante</th>
                    <th>Calificación</th>
                  </tr>
                </thead>
                <tbody id="studentsTableBody"></tbody>
              </table>
            </div>
            
            <button class="btn btn-warning mt-3" id="saveGradesBtn">
              Guardar Calificaciones
            </button>
          </div>
        </div>


      </div>
    </section>
  </main>
  `