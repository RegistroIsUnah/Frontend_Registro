
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */


export let studentClassView = `
    <main class="contenedor">
      <!-- Menú lateral -->
      <section class="main-contenedor" id="menuContainer"></section>
      <!-- Contenido principal -->
      <section class="contenedor2">
        <h2>Bienvenid@ Estudiante <span id="name"></span></h2>
        <div class="contenido">
          <!-- Vista de todas las clases -->
          <div id="classesView" class="classes-container">
            <h3>Clases Matriculadas</h3>
            <div class="classes-grid" id="classesGrid"></div>
          </div>
          <!-- Vista detalle de una clase -->
          <div id="classDetailView" style="display: none;">
            <button class="btn btn-secondary mb-3" id="backButton">Volver</button>
            <div class="class-detail-container">
              <h3 id="classNameDetail"></h3>
              <div class="class-meta">
                <span id="classCodeDetail"></span> | 
                <span id="classScheduleDetail"></span>
              </div>
              <!-- Aquí se pueden agregar más detalles relevantes para el estudiante -->
              <p id="classDescriptionDetail"></p>
              <!-- Eliminamos o comentamos acciones exclusivas para docentes -->
              <!--
              <div class="class-actions mt-3 mb-4">
                <button class="btn btn-primary" id="downloadListBtn">Descargar Listado</button>
                <button class="btn btn-success" id="uploadVideoBtn">Subir Video</button>
              </div>
              -->
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
