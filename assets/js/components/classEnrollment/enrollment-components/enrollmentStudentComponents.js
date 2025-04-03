'use strict';

import { DepartmentFetch } from "../../../fetchs/departmentFetch.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";
import { ClassEnrollmentFetch } from "../../../fetchs/classEnrollmentFetch.js";

import { sendFormConfirmationModal } from "../../modals/modals.js";

/**
/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/15
 * 
 * Clase que contiene los componentes que serán renderizados en la vista de matrpicula del estudiante.
 */
export class EnrollmentStudentComponent{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/15
     * 
     * @returns 
     * 
     * Esta función renderiza un select con los departamentos disponibles en el sistema entre las opciones.
     */
    static async departmentOptionsComponents (){

        let select = document.createElement("select");
        select.id = "departmentSelect";

        select.innerHTML += `<option value=""> -- Seleccionar Departamento -- </option>`;
        let departments = await DepartmentFetch.getAllDepartments();

        departments.forEach(department => {
            select.innerHTML += `<option value="${department.dept_id}"> ${department.nombre} </option>`;
        });
        return select;
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/15
     * 
     * @param {*} dept_id 
     * @returns 
     * 
     * Esta función renderiza un select con las clases disponibles de un departamento en específico, entre sus opciones.
     */
    static async classesOptionsComponents (dept_id, student_id){

        let select = document.createElement("select");
        select.id = "classesSelect";

        select.innerHTML += `<option value=""> -- Seleccionar Asignatura -- </option>`;
        let departmentClasses = await ClassFetch.getClasesByDeptAndStudentId(dept_id, student_id);  //getClasesByDeptId(dept_id);

        console.log(departmentClasses);
        if(departmentClasses.tiene_laboratorio == 1){
            
            //console.log(departmentClasses.);
        }

        departmentClasses.forEach(clase => {
            select.innerHTML += `<option value="${clase.clase_id}"> ${clase.codigo} - ${clase.nombre} </option>`;
        });
        return select;
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/15
     * 
     * @param {*} class_id 
     * @returns 
     * 
     * Esta función renderiza un tbody con las secciones disponibles de una clase en específico, entre sus opciones.
     */
    static async sectionsTableComponent (class_id){

        let tbody = document.createElement("tbody");
        tbody.id = "availableSections";

        let classSections = await ClassFetch.getSectionsByClassId(class_id);

        //console.log(classSections);
        
        classSections.forEach(section => {
            tbody.innerHTML += `<tr"> 
                                    <th class="classSectionId" id="${section.seccion_id}"> <a style="color:#012a5e;">Seleccione</a></th> 
                                    <th>${(section.hora_inicio).split(':').slice(0, 2).join(':')} - ${(section.hora_fin).split(':').slice(0, 2).join(':')}</th> 
                                    <th>Días</th> 
                                    <th>${section.edificio_nombre}</th> 
                                    <th>${section.aula_nombre}</th> 
                                    <th>${section.docente_nombre} ${section.docente_apellido}</th> 
                                    <th>${section.cupos}</th> 
                                <tr>`;
        });
        return tbody;
        
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/15
     * 
     * @param {*} sectionId 
     * 
     * Esta función envía la solicitud de matrícula de un estudiante.
     */
    static sendEnrollmentStudent(sectionId, studentId) {

        let confirmationModal = sendFormConfirmationModal("¿Desea matricular la clase seleccionada?");    
        let divModal = document.createElement("div");
        divModal.innerHTML = confirmationModal;
        document.body.appendChild(divModal);    
        let confirmationModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
    
        document.getElementById('sendFormButom').addEventListener('click', async () => {

            confirmationModalInstance.hide();            

            let sendEnrollmentData = {
                estudiante_id: studentId,
                seccion_id: sectionId,
                tipo_proceso: "MATRICULA"
            };

            let enrollmentResponse = await ClassEnrollmentFetch.postClassEnrollmentFetch(sendEnrollmentData);
        });
    
        confirmationModalInstance.show();
    
        document.getElementById('sendFormConfirmationModal').addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(divModal);
        });
    }    


    static async sectionEnrolledStudentClassesComponent(student_id){

        let enrolledClassesData = await ClassEnrollmentFetch.getEnrolledStudentClasses(student_id);

    }

    static async sectionWaitingStudentClasses(student_id){

        let waitingClassesData = await ClassEnrollmentFetch.getWaitingStudentClasses(student_id);
    }

    static async sectionStudentLabs(student_id){

        let studentLabsData = await ClassEnrollmentFetch.getStudentLabs(student_id);
    }

}
