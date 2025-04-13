
export let docenteView = `
    <main class="contenedor">
    <!-- Menú lateral -->
     <section class="main-contenedor" id="menuContainer"></section>

    <!-- Contenido principal -->
    <section class="contenedor2">
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
                    <th>Estado</th>
                    <th>OBS</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody id="studentsTableBody"></tbody>
              </table>
            </div>
            
         
          </div>
        </div>


      </div>
    </section>
  </main>


  <!-- MODAL DE SUBIR VIDEO -->
         

 <!-- Modal para subir video -->
 <div class="modal fade" id="videoModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Subir Video Introductorio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="videoForm">
            <div class="mb-3">
              <label for="videoUrl" class="form-label">URL de YouTube</label>
              <input type="url" class="form-control" id="videoUrl" 
                     pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+" required>
              <div class="form-text">Ejemplo: https://www.youtube.com/watch?v=ABCD1234</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="submitVideoBtn">Guardar</button>
        </div>
      </div>
    </div>
  </div>





`



