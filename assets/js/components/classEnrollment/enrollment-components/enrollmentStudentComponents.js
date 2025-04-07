'use strict';

import { DepartmentFetch } from "../../../fetchs/departmentFetch.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";
import { ClassEnrollmentFetch } from "../../../fetchs/classEnrollmentFetch.js";

import { classesSection, classesList } from "../enrollment-views/enrollment-student-view.js";
import {sendFormConfirmationModal, informationModal, messageAlert } from "../../modals/modals.js";
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
        
        departmentClasses.forEach(clase => {
            select.innerHTML += `<option id="${clase.tiene_laboratorio}" value="${clase.clase_id}"> ${clase.codigo} - ${clase.nombre} </option>`;
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

        let classSections = await ClassFetch.getSectionsEnrollableByClassId(class_id);        
        classSections.forEach(section => {
            tbody.innerHTML += `<tr"> 
                                    <th class="classSectionId" id="${section.seccion_id}"> <a style="color:#012a5e;">Seleccione</a></th> 
                                    <th>${(section.hora_inicio).split(':').slice(0, 2).join(':')} - ${(section.hora_fin).split(':').slice(0, 2).join(':')}</th> 
                                    <th>${section.dias_seccion}</th> 
                                    <th>${section.edificio_nombre}</th> 
                                    <th>${section.aula_nombre}</th> 
                                    <th>${section.docente_nombre} ${section.docente_apellido}</th> 
                                    <th>${section.cupos_disponibles}</th> 
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
    static sendEnrollmentStudent(sectionId, studentId, classHasLab, idClassSelected, className) {

        let confirmationModal = sendFormConfirmationModal(`¿Desea matricular ${className}`);    
        let divModal = document.createElement("div");
        divModal.innerHTML = confirmationModal;
        divModal.id = "divConfirmationModal";
        document.body.appendChild(divModal);    
        let confirmationModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
    
        document.getElementById('sendFormButom').addEventListener('click', async (event) => {

            event.preventDefault();
            let sendEnrollmentData = "";
            let enrollmentResponse = "";
            if(classHasLab == 1){

                bootstrap.Modal.getInstance(document.getElementById('sendFormConfirmationModal')).hide();  
                let enrollableClassLabs = await ClassFetch.getEnrollableLabsByClassId(idClassSelected);
                let labsList = Object.values(enrollableClassLabs.laboratorios).map(lab => `
                    <tr>
                        <th class="labsSectionId" id="${lab.laboratorio_id}"> <a style="color:#012a5e;">Seleccione</a></th> 
                        <th>${lab.laboratorio_codigo}</th>
                        <th>${lab.hora_inicio} - ${lab.hora_fin}</th>
                        <th>${lab.dias_laboratorio}</th>
                        <th>${lab.edificio_nombre}</th>
                        <th>${lab.aula_nombre}</th>
                        <th>${lab.cupos_disponibles}</th>
                    </tr>
                `).join(" ");

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
                let modal = informationModal(`Matricule su laboratorio de ${className}`, modalBody, `Matricular ${className} y su laboratorio`, "disabled", "modal-lg");
        
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

            }else{
                
                confirmationModalInstance.hide();            
                sendEnrollmentData = {
                    estudiante_id: studentId,
                    seccion_id: sectionId,
                    tipo_proceso: "MATRICULA"
                };
                enrollmentResponse = await ClassEnrollmentFetch.postClassEnrollmentFetch(sendEnrollmentData);
            }
            
            let modal = enrollmentResponse.error 
            ? messageAlert("bg-danger", `Ha ocurrido un problema: ${enrollmentResponse.error}`) 
            : (!enrollmentResponse ? "" : messageAlert("bg-primary", "¡Matricula Exitosa!"));
            
            if(modal){

                let divModal = document.createElement("div");                
                divModal.innerHTML = modal;
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
        });
    
        confirmationModalInstance.show();
        document.getElementById("destroyConfirmationModal").addEventListener("click", () => document.getElementById("divConfirmationModal").remove());       
    }    

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * 
     * Esta función rendeirza una vista con las clases que el estudiante ha matriculado.
     */
    static async sectionEnrolledStudentClassesComponent(student_id){

        let enrolledClassesData = await ClassEnrollmentFetch.getEnrolledStudentClasses(student_id);        
        let div = document.createElement("div");
        div.innerHTML = classesSection("cancelEnrolledClass", "Clases Matriculadas", "classesList");
        div.innerHTML += "<hr>";
        document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        
        let div2 = "";
        div2 = document.createElement("div");
        if(enrolledClassesData.error || enrolledClassesData.message == "No se encontraron clases matriculadas"){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">${enrolledClassesData.message}.</h4><hr>`;
            document.getElementById("classesList").insertAdjacentElement("afterbegin", div2);
        }else{

            div2.innerHTML = Object.values(enrolledClassesData).map(_class => 
                classesList(`${_class.codigo} - `, _class.asignatura, _class.seccion, _class.hora_inicio, _class.hora_fin, _class.dias_seccion))
                .join(" ");
            document.getElementById("classesList").insertAdjacentElement("afterbegin", div2);
            document.getElementById("cancelEnrolledClass").hidden = false;
        }
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * 
     * Esta función rendeirza una vista con las clases en espera que el estudiante ha matriculado.
     */
    static async sectionWaitingStudentClasses(student_id){

        let waitingClassesData = await ClassEnrollmentFetch.getWaitingStudentClasses(student_id);
       //console.log( JSON.stringify(waitingClassesData));

        let div = document.createElement("div");
        div.innerHTML = classesSection("cancelWaitingClass", "Clases en Lista de Espera", "waitingClassesList");
        div.innerHTML += "<hr>";        
        document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        
        let div2 = document.createElement("div");
        if(waitingClassesData.error){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">No tiene clases en lista de espera.</h4><hr>`;
            document.getElementById("waitingClassesList").insertAdjacentElement("afterbegin", div2);
        }else{

            div2.innerHTML = Object.values(waitingClassesData).map(_class => 
                classesList(`${_class.codigo} - `, _class.asignatura, _class.seccion, _class.hora_inicio, _class.hora_fin, _class.dias_seccion))
                .join(" ");
            document.getElementById("waitingClassesList").insertAdjacentElement("afterbegin", div2);
            document.getElementById("cancelWaitingClass").hidden = false;
        }
    }

        /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} student_id 
     * 
     * Esta función renderiza una vista con los laboratorios que el estudiante ha matriculado.
     */
    static async sectionStudentLabs(student_id){

        let studentLabsData = await ClassEnrollmentFetch.getStudentLabs(student_id);

        let div = document.createElement("div");
        document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        div.innerHTML = classesSection("cancelEnrolledLab", "Laboratorios Matriculados", "labsList");

        let div2 = "";
        div2 = document.createElement("div");
        if(studentLabsData.error){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">No tiene laboratorios matriculados.</h4><hr>`;
            document.getElementById("labsList").insertAdjacentElement("afterbegin", div2);
        }else{
            div2.innerHTML = Object.values(studentLabsData.laboratorios).map(lab => 
                classesList("",`Laboratorio de ${lab.asignatura}`, lab.laboratorio_codigo, lab.hora_fin, lab.hora_fin, lab.dias_laboratorio))
                .join(" ");
            document.getElementById("labsList").insertAdjacentElement("afterbegin", div2);
            document.getElementById("cancelEnrolledLab").hidden = false;
        }
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/05
     * 
     * @param {*} element 
     * @param {*} event 
     * @returns 
     */
    static selectSection (element ,event) {

        const clickedElement = event.currentTarget;
        const isSelected = clickedElement.classList.contains('selected');
        let sectionId = "";
        document.querySelectorAll(`.${element}`).forEach(el => {
            el.classList.remove('selected');
        });
        
        if (!isSelected) {
            clickedElement.classList.add('selected');
            sectionId = clickedElement.id;
        } else {
            sectionId = null; 
        }
        return sectionId;
    }

}
