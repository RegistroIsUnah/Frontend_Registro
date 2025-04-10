import { adminEnrollmentPage } from "../enrollment-views/enrollment-admin-view.js";
import { informationModal, messageAlert } from "../../modals/modals.js";
import { AdministrationFetch } from "../../../fetchs/administrationFetch.js";

export class EnrollmentAdminComponent{

    static loadMainPage(){

        let div = document.createElement("div");
        div.innerHTML = adminEnrollmentPage();
        document.getElementById("navbar").insertAdjacentElement("afterend", div);
    }

    static loadCreateAcademicPeriodModal(){

        let createPeriodForm = `
            <form method="POST" id="createPeriodForm">
                <div class="form-floating mb-3">
                    <input name="numero_periodo" id="numero_periodo" type="number" min="1" max="3" class="form-control" placeholder="Periodo No.">
                    <label for="numero_periodo" class="form-label">Periodo número:</label>
                </div>
        
                <div class="form-floating mb-3">
                    <input name="fecha_inicio" id="fecha_inicio" type="date" class="form-control">
                    <label for="fecha_inicio" class="form-label">Fecha de Inicio del Periodo</label>
                </div>

                <div class="form-floating mb-3">
                    <input name="fecha_fin" id="fecha_fin" type="date" class="form-control">
                    <label for="fecha_fin" class="form-label">Fecha de Fin de Periodo</label>
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

        const numeroPeriodo = document.getElementById("numero_periodo");
        const fechaInicio = document.getElementById("fecha_inicio");
        const fechaFin = document.getElementById("fecha_fin");
    
        const validateForm = () => {
            const allFieldsFilled = numeroPeriodo.value && fechaInicio.value && fechaFin.value;
            document.getElementById("successButtomModal").disabled = !allFieldsFilled;
        };
    
        numeroPeriodo.addEventListener('input', validateForm);
        fechaInicio.addEventListener('input', validateForm);
        fechaFin.addEventListener('input', validateForm);
    
        document.getElementById("successButtomModal").addEventListener("click", async () => {
            
            successModalInstance.hide();  
            const form = new FormData(document.getElementById("createPeriodForm"));
            const formData = Object.fromEntries(form.entries());

            let numeroPeriodo = formData.numero_periodo;

            let dataPeriod = {
                anio: formData.fecha_inicio.slice(0, 4),
                numero_periodo: numeroPeriodo,
                fecha_inicio: formData.fecha_inicio,
                fecha_fin: formData.fecha_fin
            };

            let response = await AdministrationFetch.createAcademicPeriod(dataPeriod);
            let divModal = document.createElement("div");
            divModal.innerHTML = !response.error ? messageAlert("bg-success", response.message) : messageAlert("bg-danger", `Ha ocurrido un problema interno de servidor: ${response.error}`);
            document.body.appendChild(divModal);
            let createAcademicPeriodAlertResponse = new bootstrap.Toast(document.getElementById('messageAlert'));
            createAcademicPeriodAlertResponse.show(); 
            setTimeout(() => divModal.remove(), 4000);
        });
    }

    static async loadCreateEnrollmentProcessModal(){

        let activePeriods = await AdministrationFetch.getActiveAcademicPeriods();
        let select = document.createElement("select");
        select.name = "numero_periodo";
        select.id = "numero_periodo";
        select.className = "form-select";
        select.innerHTML = `<option value="" selected>--Seleccione uno--</option>`;
        
        Object.values(activePeriods).forEach(period => {
            select.innerHTML += `<option value="${period.periodo_academico_id}">${period.numero_periodo} - ${period.anio} | ${period.fecha_inicio} - ${period.fecha_fin} </option>`;
        });

        let createEnrollmentProcess = `
            <form method="POST" id="createEnrollProcessForm">

                <div class="mb-3">
                    <label for="numero_periodo" class="form-label">Seleccione un periodo:</label>
                    ${select.outerHTML}
                </div>

                <div class="mb-3">
                    <label for="tipo_proceso" class="form-label">Tipo de proceso</label>
                    <select name="tipo_proceso" id="tipo_proceso" class="form-select" >
                        <option value="" selected>--Seleccione uno--</option>
                        <option value="MATRICULA">Matrícula</option>
                        <option value="ADICIONES_CANCELACIONES">Adiciones y cancelaciones</option>
                    </select>
                </div>

                <div class="form-floating mb-3">
                    <input name="fecha_inicio" id="fecha_inicio" type="date" class="form-control">
                    <label for="fecha_inicio" class="form-label">Fecha de Inicio de matrículas</label>
                </div>

                <div class="form-floating mb-3">
                    <input name="fecha_fin" id="fecha_fin" type="date" class="form-control">
                    <label for="fecha_fin" class="form-label">Fecha de Fin de Matrículas</label>
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

        const numeroPeriodo = document.getElementById("numero_periodo");
        const tipoProceso = document.getElementById("tipo_proceso");
        const fechaInicio = document.getElementById("fecha_inicio");
        const fechaFin = document.getElementById("fecha_fin");
    
        const validateForm = () => {
            const allFieldsFilled = numeroPeriodo.value && tipoProceso.value && fechaInicio.value && fechaFin.value;
            document.getElementById("successButtomModal").disabled = !allFieldsFilled;
        };
    
        numeroPeriodo.addEventListener('input', validateForm);
        tipoProceso.addEventListener('input', validateForm);
        fechaInicio.addEventListener('input', validateForm);
        fechaFin.addEventListener('input', validateForm);

        document.getElementById("successButtomModal").addEventListener("click", async () => {

            successModalInstance.hide();  
            let form = new FormData(document.getElementById("createEnrollProcessForm"));
            let formData = Object.fromEntries(form.entries());

            let enrollProcessData = {
                periodo_academico_id: String(formData.numero_periodo),
                tipo_proceso: String(formData.tipo_proceso),
                fecha_inicio: formData.fecha_inicio, 
                fecha_fin: formData.fecha_fin
            };
            

            let responseCreateEnrollProcess = await AdministrationFetch.createEnrollmentProcess(enrollProcessData);
            let divModal = document.createElement("div");
            divModal.innerHTML = !responseCreateEnrollProcess.error ? messageAlert("bg-success", responseCreateEnrollProcess.message) : messageAlert("bg-danger", `Ha ocurrido un problema interno de servidor: ${response.error}`);
            document.body.appendChild(divModal);
            let createAcademicPeriodAlertResponse = new bootstrap.Toast(document.getElementById('messageAlert'));
            createAcademicPeriodAlertResponse.show(); 
            setTimeout(() => divModal.remove(), 4000);
            console.log(responseCreateEnrollProcess);
        });

    }
}
