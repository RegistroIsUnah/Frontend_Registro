import { adminEnrollmentPage } from "../enrollment-views/enrollment-admin-view.js";
import { informationModal } from "../../modals/modals.js";

export class EnrollmentAdminComponent{

    static loadMainPage(){

        let div = document.createElement("div");
        div.innerHTML = adminEnrollmentPage();
        document.getElementById("navbar").insertAdjacentElement("afterend", div);
    }

    static loadCreateAcademicPeriodModal(){

        let createPeriodForm = `
            <form method="POST">
                <div class="form-floating mb-3">
                    <input type="number" min="1" max="3" class="form-control" placeholder="Periodo No.">
                    <label for="" class="form-label">Periodo número:</label>
                </div>
        
                <div class="form-floating mb-3">
                    <input type="date" class="form-control">
                    <label for="" class="form-label">Fecha de Inicio del Periodo</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="date" class="form-control">
                    <label for="" class="form-label">Fecha de Fin de Periodo</label>
                </div>

            </form>
        `;

        let divModal = document.createElement("div");
        divModal.id = "divModalCreateAcademicPeriod"
        divModal.innerHTML = informationModal(`Crear Periodo Académico`, createPeriodForm, `Crear Periodo Académico`, "disabled");
        document.getElementById("informationModal") && document.getElementById("informationModal").remove();
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
        successModalInstance.show();
    }

    static loadCreateEnrollmentProcessModal(){

        let createEnrollmentProcess = `
            <form method="POST">
                <div class="form-floating mb-3">
                    <input type="number" name="" min="1" max="3" class="form-control" placeholder="Periodo No.">
                    <label for="" class="form-label">Habilitar matricula para periodo número:</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" maxlength="25" class="form-control">
                    <label for="" class="form-label">Tipo de proceso</label>
                </div>
                
                <div class="form-floating mb-3">
                    <input type="date" class="form-control">
                    <label for="" class="form-label">Fecha de Inicio del Periodo</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="date" class="form-control">
                    <label for="" class="form-label">Fecha de Fin de Periodo</label>
                </div>

            </form>
        `;

        let divModal = document.createElement("div");
        divModal.id = "divModalCreateAcademicPeriod"
        divModal.innerHTML = informationModal(`Crear Proceso de Matrícula`, createEnrollmentProcess, `Crear Proceso de Matrícula`, "disabled");
        document.getElementById("informationModal") && document.getElementById("informationModal").remove();
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
        successModalInstance.show();

    }
}




/* 

 let modalBody = `<div class="input-group flex-column secciones-disponibles"> 
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Opción</th>
                                                <th>Sección</th>
                                                <th>HI - HF</th>
                                                <th>Días</th>
                                                <th>Edificio</th>
                                                <th>Aula</th>
                                                <th>Cupos</th>
                                            </tr>
                                        </thead>

                                        <tbody id="availableSections">
                                            ${labsList}
                                        </tbody>
                                    </table>
                                </div>`;
                let modal = informationModal(`Matricule su laboratorio de ${className}`, modalBody, `Matricular ${className} y su laboratorio`, "", "modal-lg");
        
                let divModal = document.createElement("div");
                divModal.id = "divModalLabs"
                divModal.innerHTML = modal;
                document.body.appendChild(divModal);
        
                let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
                successModalInstance.show();

                let labId = null;
                document.querySelectorAll('.labsSectionId').forEach(element => {
                    element.addEventListener('click', (event) => {
                        labId = EnrollmentStudentComponent.selectSection("labsSectionId",event)
                        document.getElementById("successButtomModal").disabled = labId == null;
                    });
                });
                document.getElementById("closeModal").addEventListener("click", () => document.getElementById("divModalLabs").remove());
                document.getElementById("successButtomModal").addEventListener("click", async () => {

                    successModalInstance.hide();                    
                    sendEnrollmentData = {
                        estudiante_id: studentId,
                        seccion_id: sectionId,
                        tipo_proceso: "MATRICULA",
                        laboratorio_id: labId
                    };
                    enrollmentResponse = await ClassEnrollmentFetch.postClassEnrollmentFetch(sendEnrollmentData);
                });
*/