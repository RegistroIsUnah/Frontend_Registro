/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/03
 *  
 * Página principal de admisiones para el administrador.
 */
export let adminAdmissionsPage = () => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Admisiones</a></h5>
</div>

        <div class="container mb-5" style="max-width: 95%"> 
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-12 text-center mb-sm-5">
                    <h2 class="message mb-3">Envíe las Notas de los Apirantes</h2>
                    <button style="background-color:#091c5a;" id="sendApplicantsCalificationsButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        Envíe el Archivo CSV
                    </button>
                </div>
                  <div class="mb-5 col-lg-4 col-md-6 col-sm-12 text-center">
                    <h2 class="message mb-3">Descargue el Listado de Aspirantes Aprobados</h2>
                    <button style="background-color:#091c5a;" id="downloadCsvApprovedApplicants" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        Descarcar archivo CSV
                    </button>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 text-center">
                    <h2 class="message mb-3">Registre a los Aspirantes Aprobados</h2>
                    <button style="background-color:#091c5a;" id="aprovedApplicantsRegisterButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        Envíe el Archivo CSV
                    </button>
                </div>
            </div>
        </div>

`;


export let csvFormModal = (title, button) => `
 <!-- Modal sin backdrop oscuro -->
 <div class="modal fade" id="csvModal" data-bs-backdrop="false" tabindex="-1" aria-labelledby="csvModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="csvModalLabel">${title}</h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <form id="csvForm">
           <div class="mb-3">
             <div class="form-control text-center" id="uploadArea"
               style="min-height: 120px; cursor: pointer; border: 1px solid #ccc; padding: 15px;">
               <p class="mt-2"><i class="fas fa-upload fa-2x mb-2" style="color: #6c757d;"></i></p>
               <p>Haz clic para seleccionar un archivo CSV</p>
               <small class="text-muted">Solo se aceptan archivos .csv</small>
               <input type="file" name="csvFile" id="csvFile" accept=".csv" style="display:none;">
             </div>
             <div id="fileInfo" class="mt-2" style="display:none;">
               <p><strong>Archivo seleccionado:</strong> <span id="fileName"></span></p>
             </div>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Cancelar</button>
             <button type="submit" class="btn btn-primary" id="${button}" disabled>Subir Archivo</button>
           </div>
         </form>
       </div>
     </div>
   </div>
 </div>
`;
