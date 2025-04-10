import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

export class AdministrationFetch{

    static createEnrollmentProcess(enrollmentProcessData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/crear_proceso_matricula.php`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enrollmentProcessData)
        })
        .then(response => {
            if(!response.ok){
    
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }    

    static createAcademicPeriod(academicPeriodData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/crear_periodo.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(academicPeriodData)
        })
        .then(response => {
            if(!response.ok){

                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    static getActiveAcademicPeriods(){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_periodos_activos.php`)
        .then(response =>  response.json())
        .then(data => data)
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });    
    }
}