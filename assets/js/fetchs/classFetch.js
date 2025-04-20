import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

export class ClassFetch{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/01     
     * 
     * @param {*} classId 
     * 
     * Esta función obtiene las secciones de una sola clase en el sistema.
     */
    static getSectionsEnrollableByClassId(classId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/seccion_detalles_matricula.php?clase_id=${classId}`)
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        })
    }

    static getSectionsByClassId(classId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/seccion_detalles.php?clase_id=${classId}`)
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        })
    }
    
    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/01
     * 
     * @param {*} dept_id 
     * @returns 
     * 
     * Esta función devuelve los datos de las clases de un solo departamento por el ID del estudiante.
     */
    static getClasesByDeptAndStudentId(dept_id, student_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_clases_matriculables.php?departamento_id=${dept_id}&estudiante_id=${student_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        })
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/01
     * 
     * @param {*} dept_id 
     * @returns 
     * 
     * Esta función devuelve los datos de las clases de un solo departamento
     */
    static getClasesByDeptId(dept_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/clases_depto.php?dept_id=${dept_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        })
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} dept_id 
     * @returns 
     * 
     * Esta función devuelve los laboratorios disponibles a matricular de una clase.
     */
    static getEnrollableLabsByClassId(class_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/laboratorio_detalles_matricula.php?clase_id=${class_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getProfessorDataBySectionId(section_id){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_docente_por_seccion.php?seccion_id=${section_id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getStudentsListBySectionId(sectionId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/lista_estudiantes_seccion.php?seccion_id=${sectionId}`)
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
        .then(data => {
            
            if(data.error){
                                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", data.error);
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return data;  
        })
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getProffesorCalificationsBySectionId(sectionId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/evaluacion_seccion_docente.php?seccion_id=${sectionId}`)
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
        .then(data => {

            if(!data.data[0]){
                                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "No hay evaluaciones para docente en esta sección.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return data;        })
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getProffesorsByDeptId(deptId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_docentes_departamento.php?dept_id=${deptId}`)
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
        .then(data => data )
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getStudentsByDeptId(deptId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/estudiantes_por_departamento.php?departamento_id=${deptId}`)
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
        .then(data => data )
        .catch(error => {
            console.log("error en la solicitud: "+ error);
        });
    }

    static getStudentHistory(studentId){
    
        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_historial_estudiante.php?estudiante_id=${studentId}`)
        .then(response => {

            if(!response.ok){
                                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "No se ha encontrado el historial de este estudiante.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 2500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error obteniendo el historial académico:", error);
        });
    }
}