import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/01
 * 
 * Clase que contiene el consumo de los Endpoints propios de matrícula.
 */
export class ClassEnrollmentFetch{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/01
     * 
     * Esta función envía la matrícula de un estudiante.
     */
    static postClassEnrollmentFetch(enrollmentData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/matricular_estudiante.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(enrollmentData)
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

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * @returns 
     * 
     * Esta función trae las clases matriculadas de un estudiante.
     */
    static getEnrolledStudentClasses(student_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_clases_matriculadas.php?estudiante_id=${student_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * @returns 
     * 
     * Esta función trae las clases en lista de espera de un estudiante.
     */
    static getWaitingStudentClasses(student_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_clases_lista_espera.php?estudiante_id=${student_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * @returns 
     * 
     * Esta función trae los laboratorios que tiene matriculados el estudiante.
     */
    static getStudentLabs(student_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_laboratorios_matriculado.php?estudiante_id=${student_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} cancelClassData 
     * @returns 
     * 
     * Esta función consume el Endpoint de cancelación de clase y recibe la respuesta.
     */
    static cancelStudentEnrolledClass(cancelClassData){

        //console.log(JSON.stringify(cancelClassData));

        return fetch(`${ConstValues.DOMAIN_NAME}/delete/cancelar_seccion_laboratorio.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cancelClassData)
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
    static validateStudentEnrollDay(student_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/matricula_estudiante.php?estudiante_id=${student_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }
    
}