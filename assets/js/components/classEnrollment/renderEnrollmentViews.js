import { classEnrollmentStudentView } from "./enrollment-views/enrollment-student-view.js";
import { EnrollmentStudentComponent } from "./enrollment-components/enrollmentStudentComponents.js";
import { messageAlert } from "../modals/modals.js";
import { renderMenu } from "../../utils/renderMenu.js";
export class RenderEnrollmentView{

    static async renderClassEnrollmentStudentView () {

        let idStudent = sessionStorage.getItem("estudiante_id");
        let div = document.createElement("div");
        div.innerHTML = classEnrollmentStudentView();

        document.getElementsByTagName("body")[0].insertAdjacentElement("afterbegin", div);
        renderMenu(document.querySelector("#mainContent"));

    
        let departmentSelect = await EnrollmentStudentComponent.departmentOptionsComponents();
        document.getElementById("departmentSelect").replaceWith(departmentSelect); 
        
        document.getElementById("departmentSelect").addEventListener("change", async (event) => {
            
            let tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="7" class="mensaje-tabla my-5 text-center">
                                Seleccione una clase para ver sus secciones disponibles
                            </td>`;

            document.getElementById("availableSections") && document.getElementById("availableSections").replaceChildren(tr);
            let idDeptSelected = event.target.options[event.target.selectedIndex].value;  
            document.getElementById("classesSelect").disabled = !idDeptSelected;

            let classesSelect = await EnrollmentStudentComponent.classesOptionsComponents(idDeptSelected, idStudent);
            document.getElementById("classesSelect").replaceWith(classesSelect); 

            document.getElementById("classesSelect").addEventListener("change", async (event) => {
                
                let { id: classHasLab, value: idClassSelected, text : className } = event.target.options[event.target.selectedIndex]; 
                let sectionsClass = await EnrollmentStudentComponent.sectionsTableComponent(idClassSelected);
                document.getElementById("availableSections").replaceWith(sectionsClass); 

                let sectionId = null;
                document.querySelectorAll('.classSectionId').forEach(element => {
                    element.addEventListener('click', (event) => sectionId = EnrollmentStudentComponent.selectSection("classSectionId",event))});
                
                document.getElementById("btnMatricular").addEventListener("click", (event) => {

                    document.getElementById("sendFormConfirmationModal") && document.getElementById("sendFormConfirmationModal").remove();
                    
                    if (!sectionId) {

                        let modal = messageAlert("bg-danger", "Por favor, seleccione una sección primero.");  

                        let divModal = document.createElement("div");
                        divModal.innerHTML = modal;
                        document.body.appendChild(divModal);
                        let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                        
                        successModalInstance.show(); 

                        setTimeout(() => divModal.remove(), 2000);
                        
                        return;
                    }
                    EnrollmentStudentComponent.sendEnrollmentStudent(sectionId, idStudent, classHasLab, idClassSelected, className.split(" - ")[1].trim());
                });
            });
        });

        await EnrollmentStudentComponent.sectionEnrolledStudentClassesComponent(idStudent);
        await EnrollmentStudentComponent.sectionWaitingStudentClasses(idStudent);
        await EnrollmentStudentComponent.sectionStudentLabs(idStudent);
    }
}