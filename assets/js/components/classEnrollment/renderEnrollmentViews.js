import { classEnrollmentStudentView } from "./enrollment-views/enrollment-student-view.js";
import { EnrollmentStudentComponent } from "./enrollment-components/enrollmentStudentComponents.js";
import { messageAlert } from "../modals/modals.js";

export class RenderEnrollmentView{

    static async renderClassEnrollmentStudentView () {

        let idStudent = sessionStorage.getItem("estudiante_id");
        let div = document.createElement("div");
        div.innerHTML = classEnrollmentStudentView();
        document.getElementsByTagName("body")[0].insertAdjacentElement("afterbegin", div);
    
        let departmentSelect = await EnrollmentStudentComponent.departmentOptionsComponents();
        document.getElementById("departmentSelect").replaceWith(departmentSelect); 
        
        document.getElementById("departmentSelect").addEventListener("change", async (event) => {
            
            let idDeptSelected = event.target.options[event.target.selectedIndex].value;  
            document.getElementById("classesSelect").disabled = !idDeptSelected;

            let classesSelect = await EnrollmentStudentComponent.classesOptionsComponents(idDeptSelected, idStudent);
            document.getElementById("classesSelect").replaceWith(classesSelect); 

            document.getElementById("classesSelect").addEventListener("change", async (event) => {
                
                let idClassSelected = event.target.options[event.target.selectedIndex].value;  
                let sectionsClass = await EnrollmentStudentComponent.sectionsTableComponent(idClassSelected);
                document.getElementById("availableSections").replaceWith(sectionsClass); 
        
                document.querySelectorAll('.classSectionId').forEach(element => {
                    element.addEventListener('click', (event) => {
                        const clickedElement = event.currentTarget;
                        const isSelected = clickedElement.classList.contains('selected');
                        
                        document.querySelectorAll('.classSectionId').forEach(el => {
                            el.classList.remove('selected');
                        });
                        
                        if (!isSelected) {
                            clickedElement.classList.add('selected');
                            sectionId = clickedElement.id;
                        } else {
                            sectionId = null; 
                        }
                    });
                });
                
                document.getElementById("btnMatricular").addEventListener("click", (event) => {
                    
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
                    EnrollmentStudentComponent.sendEnrollmentStudent(sectionId, idStudent);
                });
                let sectionId = null;
            });
        });

        //await EnrollmentStudentComponent.sectionEnrolledStudentClassesComponent(idStudent);
        //await EnrollmentStudentComponent.sectionWaitingStudentClasses(idStudent);
        //await EnrollmentStudentComponent.sectionStudentLabs(idStudent);
    }
}
