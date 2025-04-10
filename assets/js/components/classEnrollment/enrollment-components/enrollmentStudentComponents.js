'use strict';

import { DepartmentFetch } from "../../../fetchs/departmentFetch.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";
import { ClassEnrollmentFetch } from "../../../fetchs/classEnrollmentFetch.js";

import { classesSection, classesList, userInformationCard } from "../enrollment-views/enrollment-student-view.js";
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

    static async loadProfessorInformationModal(section_id){

        let informationProfessor = await ClassFetch.getProfessorDataBySectionId(section_id);
        let {docente_nombre:fName, docente_apellido:lName, docente_correo:email, docente_foto:photo, departamento_nombre:deptName} = Object.values(informationProfessor)[1];

        let modal = userInformationCard(`${fName} ${lName}`, email, deptName);
        let divModal = document.createElement("div");
        divModal.id = "userModal";
        divModal.innerHTML = modal;
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('userInformationModal'));
        successModalInstance.show();
        //document.getElementById("closeUserCard") && document.getElementById("closeUserCard").addEventListener("click", () => document.getElementById("userModal").remove());
        document.getElementById('userModal') && document.getElementById('userModal').addEventListener('hidden.bs.modal', () => document.getElementById("userModal").remove());

    }

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
     * @version 0.0.3
     * @since 2025/03/15
     * 
     * @param {*} sectionId 
     * 
     * Esta función envía la solicitud de matrícula de un estudiante.
     */
    static sendEnrollmentStudent(sectionId, studentId, classHasLab, idClassSelected, className) {

        let confirmationModal = sendFormConfirmationModal(`¿Desea matricular ${className}?`);    
        let divModal = document.createElement("div");
        divModal.innerHTML = confirmationModal;
        divModal.id = "divConfirmationModal";
        document.getElementById("divConfirmationModal") ? document.getElementById("divConfirmationModal").replaceWith(divModal) : document.body.appendChild(divModal);    
        let confirmationModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));

        document.getElementById('sendFormButom').addEventListener('click', async (event) => {

            event.preventDefault();
            let sendEnrollmentData = "";
            let enrollmentResponse = "";
            if(classHasLab == 1){

                document.getElementById("divModalLabs") && document.getElementById("divModalLabs").remove();
                document.getElementById("divModalEnrolledClasses") && document.getElementById("divModalEnrolledClasses").remove();
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
                    EnrollmentStudentComponent.showResponse(enrollmentResponse, studentId, "¡La clase y su laboratorio se han matriculado exitosamente!");
                });

            }else{
                
                confirmationModalInstance.hide();    
                sendEnrollmentData = {
                    estudiante_id: studentId,
                    seccion_id: sectionId,
                    tipo_proceso: "MATRICULA"
                };
                enrollmentResponse = await ClassEnrollmentFetch.postClassEnrollmentFetch(sendEnrollmentData);
                EnrollmentStudentComponent.showResponse(enrollmentResponse, studentId, "¡La clase se ha matriculado exitosamente!");
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
        div.id = "enrolledClassesComponent";
        div.innerHTML = classesSection("cancelEnrolledClass", "Clases Matriculadas", "classesList");
        div.innerHTML += "<hr>";
        document.getElementById("enrolledClassesComponent") ? document.getElementById("enrolledClassesComponent").replaceWith(div) : document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        
        let div2 = document.createElement("div");
        div2.id = "enrolledClassesComponent";
        if(enrolledClassesData.error || enrolledClassesData.message == "No se encontraron clases matriculadas"){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">${enrolledClassesData.message}.</h4><hr>`;
            document.getElementById("classesList").firstElementChild ? document.getElementById("classesList").firstElementChild.replaceWith(div2) : document.getElementById("classesList").insertAdjacentElement("afterbegin", div2);
        }else{
            div2.innerHTML = Object.values(enrolledClassesData).map(_class => 
                classesList(`${_class.codigo} - `, _class.asignatura, _class.seccion, _class.hora_inicio, _class.hora_fin, _class.dias_seccion, '', _class.seccion_id))
                .join(" ");
            document.getElementById("classesList").firstElementChild ? document.getElementById("classesList").firstElementChild.replaceWith(div2) :  document.getElementById("classesList").insertAdjacentElement("afterbegin", div2);
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
        let div = document.createElement("div");
        div.id = "waitingClassesComponent";
        div.innerHTML = classesSection("cancelWaitingClass", "Clases en Lista de Espera", "waitingClassesList");
        div.innerHTML += "<hr>";        
        document.getElementById("waitingClassesComponent") ? document.getElementById("waitingClassesComponent").replaceWith(div) : document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        
        let div2 = document.createElement("div");
        div2.id = "waitingClassesComponent";
        if(waitingClassesData.error || waitingClassesData.message == "No se encontraron clases en espera"){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">No tiene clases en lista de espera.</h4><hr>`;
            document.getElementById("waitingClassesList").firstElementChild ? document.getElementById("waitingClassesList").firstElementChild.replaceWith(div2) : document.getElementById("waitingClassesList").insertAdjacentElement("afterbegin", div2);
        }else{

            div2.innerHTML = Object.values(waitingClassesData).map(_class => 
                classesList(`${_class.codigo} - `, _class.asignatura, _class.seccion, _class.hora_inicio, _class.hora_fin, _class.dias_seccion, '', _class.seccion_id))
                .join(" ");
            document.getElementById("waitingClassesList").firstElementChild ? document.getElementById("waitingClassesList").firstElementChild.replaceWith(div2) : document.getElementById("waitingClassesList").insertAdjacentElement("afterbegin", div2);
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
        div.id = "labClassComponent";
        document.getElementById("labClassComponent") ? document.getElementById("labClassComponent").replaceWith(div) : document.getElementById("contenido").insertAdjacentElement("beforeend", div);
        div.innerHTML = classesSection("cancelEnrolledLab", "Laboratorios Matriculados", "labsList");

        let div2 = document.createElement("div");
        div2.id = "labClassComponent";
        if(studentLabsData.error){

            div2.innerHTML = `<h4 class="btn btn-danger" style="color:white">No tiene laboratorios matriculados.</h4><hr>`;
            document.getElementById("labsList").firstElementChild ? document.getElementById("labsList").firstElementChild.replaceWith(div2) : document.getElementById("labsList").insertAdjacentElement("afterbegin", div2);
        }else{
            div2.innerHTML = Object.values(studentLabsData.laboratorios).map(lab => 
                classesList("",`Laboratorio de ${lab.asignatura}`, lab.laboratorio_codigo, lab.hora_fin, lab.hora_fin, lab.dias_laboratorio, "hidden"))
                .join(" ");
            document.getElementById("labsList").firstElementChild ? document.getElementById("labsList").firstElementChild.replaceWith(div2) : document.getElementById("labsList").insertAdjacentElement("afterbegin", div2);
            document.getElementById("cancelEnrolledLab").hidden = true;
        }
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.2
     * @since 2025/04/06
     * 
     * @param {*} typeClassButton 
     * @param {*} student_id 
     * 
     * Esta función se encarga de enviar la petición de cancelación de clase. (matriculada o en espera).
     */
    static async cancelStudentClass(typeClassButton, student_id){

        document.getElementById("divModalLabs") && document.getElementById("divModalLabs").remove();
        document.getElementById("divModalEnrolledClasses") && document.getElementById("divModalEnrolledClasses").remove();
        document.getElementById("divConfirmationModal") && document.getElementById("divConfirmationModal").remove();
        
        let enrolledClassesList = (typeClassButton == "cancelEnrolledClass") 
        ? await ClassEnrollmentFetch.getEnrolledStudentClasses(student_id) 
        : await ClassEnrollmentFetch.getWaitingStudentClasses(student_id);
        
        let classesList = Object.values(enrolledClassesList).map(enrolledClass => `
            <tr>
                <th class="labsSectionId" id="${enrolledClass.seccion_id}"> <a style="color:#012a5e;">Seleccione</a></th> 
                <th>${enrolledClass.asignatura}</th>
                <th>${enrolledClass.seccion}</th>
                <th>${enrolledClass.hora_inicio} - ${enrolledClass.hora_fin}</th>
                <th>${enrolledClass.creditos}</th>
                <th>${enrolledClass.edificio_nombre}</th>
                <th>${enrolledClass.aula_nombre}</th>
            </tr>  
        `).join(" ");

        let modalBody = `<div class="input-group flex-column secciones-disponibles"> 
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Opción</th>
                                        <th>Asignatura</th>
                                        <th>Sección</th>
                                        <th>HI - HF</th>
                                        <th>Créditos</th>
                                        <th>Edificio</th>
                                        <th>Aula</th>
                                    </tr>
                                </thead>

                                <tbody id="availableSections">
                                    ${classesList}
                                </tbody>
                            </table>
                        </div>`;

        let modal = informationModal(`Cancelar clase`, modalBody, `Cancelar clase`, "disabled", "modal-lg");
        let divModal = document.createElement("div");
        divModal.id = "divModalEnrolledClasses"
        divModal.innerHTML = modal;
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
        successModalInstance.show();

        let sectionId = null;
        document.querySelectorAll('.labsSectionId').forEach(element => {
            element.addEventListener('click', (event) => {
                sectionId = EnrollmentStudentComponent.selectSection("labsSectionId",event)
                document.getElementById("successButtomModal").disabled = sectionId == null;
            });
        });

        document.getElementById("closeModal").addEventListener("click", () => document.getElementById("divModalEnrolledClasses").remove());
        document.getElementById("successButtomModal").addEventListener("click", async () => {
            let confirmationModal = sendFormConfirmationModal(`¿Desea cancelar la clase?`);    
            let divModal = document.createElement("div");
            divModal.innerHTML = confirmationModal;
            divModal.id = "divConfirmationModal";
            document.getElementById("divConfirmationModal") ? document.getElementById("divConfirmationModal").replaceWith(divModal) : document.body.appendChild(divModal);    
            let confirmationModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
            confirmationModalInstance.show();
            document.getElementById("destroyConfirmationModal").addEventListener("click", () => document.getElementById("divConfirmationModal").remove());     
            document.getElementById('sendFormButom').addEventListener('click', async (event) => {
                
                confirmationModalInstance.hide(); 
                let cancelClassData = {
                    estudiante_id: student_id, 
                    seccion_id: sectionId
                };
                
                let cancelClassResponse = await ClassEnrollmentFetch.cancelStudentEnrolledClass(cancelClassData);
                EnrollmentStudentComponent.showResponse(cancelClassResponse, student_id, "¡La clase se ha cancelado correctamente!");

            });
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/08
     * 
     * @param {*} enrollmentResponse 
     * @param {*} studentId 
     * @param {*} message 
     * 
     * Esta función muestra una alerta con la respuesta de las matricula y cancelación de las clases.
     */
    static async showResponse(enrollmentResponse, studentId, message){
                
        document.getElementById("messageAlert") && document.getElementById("messageAlert").remove();
        let modal = enrollmentResponse.error 
        ? messageAlert("bg-danger", `Ha ocurrido un problema: ${enrollmentResponse.error}`) 
        : (!enrollmentResponse ? "" : messageAlert("bg-primary", message));
            
        if(modal){
            
            let divModal = document.createElement("div");                
            divModal.innerHTML = modal;
            document.body.appendChild(divModal);
            let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
            successModalInstance.show(); 
            setTimeout(() => divModal.remove(), 4000);
        }

        if(!enrollmentResponse.error){
            await EnrollmentStudentComponent.sectionEnrolledStudentClassesComponent(studentId);
            await EnrollmentStudentComponent.sectionWaitingStudentClasses(studentId);
            await EnrollmentStudentComponent.sectionStudentLabs(studentId);
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

    static async validateStudentEnrollDay(student_id){
        return await ClassEnrollmentFetch.validateStudentEnrollDay(student_id);
    }

}
