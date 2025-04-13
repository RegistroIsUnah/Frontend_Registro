import { csvFormModal } from "../admissions-views/admin-admissions-page.js";
import { AdmissionFetch } from "../../../fetchs/admissionFetch.js";
import { messageAlert } from "../../modals/modals.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/05/09
 * 
 * @param {*} classId 
 */
export class AdminAdmissionsComponents {

  static async downloadApprovedApplicantsCsv(){
    AdmissionFetch.downloadApprovedApplicantsCsv();
  }
  
  static loadApplicantsCalificationsForm() {
    this.renderCsvForm("Subir Notas de Aspirantes", "sendApplicantsCalifications");
    this.setupFileValidation("sendApplicantsCalifications");
  }

  static loadApprovedApplicantsRegisterForm() {
    this.renderCsvForm("Subir Notas de Aspirantes Aprobados", "sendApprovedApplicantsCalifications");
    this.setupFileValidation("sendApprovedApplicantsCalifications");
  }
  
  static renderCsvForm(title, buttonId) {

    const existingModal = document.getElementById('csvModal');
    if (existingModal) existingModal.remove();  
    document.body.insertAdjacentHTML('beforeend', csvFormModal(title, buttonId));
    const modal = new bootstrap.Modal(document.getElementById('csvModal'));
    modal.show();
  
    setTimeout(() => {
      document.getElementById('uploadArea')?.addEventListener('click', () => {
        document.getElementById('csvFile')?.click();
      });
      this.setupFileValidation(buttonId);
    }, 100);
  }
  
  static setupFileValidation(buttonId) {
    const fileInput = document.getElementById('csvFile');
    let file = null; 

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
          file = fileInput.files[0];
        if (file.name.toLowerCase().trim().endsWith('.csv')) {
          this.processFile(file, buttonId);
        } else {
          alert('Por favor, suba un archivo .CSV válido.');
        }
      }
    });

    document.getElementById('csvForm').addEventListener('submit', async (e) => {

      e.preventDefault();          
      document.getElementById(buttonId).disabled = true;
      
      //const formData = new FormData(document.getElementById('csvForm'));
      let response = "";
      let divModal = document.createElement("div");
      
      switch(buttonId) {
        case "sendApplicantsCalifications":
            const formDataCalificaciones = new FormData(); 
            formDataCalificaciones.append('archivo_csv', file);
            response = await AdmissionFetch.sendApplicantsCalifications(formDataCalificaciones);
            divModal.innerHTML = !response.error 
                ? messageAlert("bg-success", response.message) 
                : messageAlert("bg-danger", response.error);
            break;
    
        case "sendApprovedApplicantsCalifications":
            const formDataAprobados = new FormData(); 
            formDataAprobados.append('estudiantes_csv', file);
            response = await AdmissionFetch.sendApprovedAplicantsCalifications(formDataAprobados);
            divModal.innerHTML = !response.error 
                ? messageAlert("bg-success", response.message) 
                : messageAlert("bg-danger", response.error);
            break;
    
        default: 
            break;
    }
    
      document.getElementById('csvModal')?.remove();      
      document.body.appendChild(divModal);
      let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
      successModalInstance.show(); 
      setTimeout(() => divModal.remove(), 4000);
    });
  }
  
  static processFile(file, buttonId) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileInfo').style.display = 'block';
    document.getElementById(buttonId).disabled = false;
    document.getElementById('uploadArea').innerHTML = `
      <p class="mt-2">
        <i class="fas fa-file-csv fa-2x mb-2" style="color: #28a745;"></i>
      </p>
      <p>Archivo listo para subir</p>
      <small class="text-success">${file.name}</small>
    `;
  }
}
