import { ConstValues } from "../utils/constValues.js";

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
}