import { ClassesDepartmentHeadComponents } from "./classes-components/classesDepartmenHeadComponents.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.5
 * @since 2025/04/10
 * 
 */
export class RenderClassesViews{
    
    static async renderDepartmentProffessorsView(){
       await ClassesDepartmentHeadComponents.loadDepartmentProffessorsTable();
       document.querySelectorAll(".cambiarContraDocente").forEach(element => {
        element.addEventListener("click", async (event) => {

            await ClassesDepartmentHeadComponents.sendMailToResetPassword(event.target.id);
        });
    });
    }

    static async renderDepartmentStudentsView(){
        await ClassesDepartmentHeadComponents.loadDepartmentStudentsTable();
        document.querySelectorAll(".historialAcademicoEstudiante").forEach(element => {
            element.addEventListener("click", async (event) => {
                await ClassesDepartmentHeadComponents.loadHistoryStudent(event.target.id);
            });
        });
    }

    static async renderClassesDepartmentHeadView(){

        if(sessionStorage.getItem("classId")){
            await ClassesDepartmentHeadComponents.loadSectionsClass(sessionStorage.getItem("classId"));
        }else{
            await ClassesDepartmentHeadComponents.loadClassesDepartmentHeadComponent();
            document.querySelectorAll(".showSectionsClass").forEach(element => {
                element.addEventListener("click", async (event) => {
                    await ClassesDepartmentHeadComponents.loadSectionsClass(event.target.id);                
                });
            });
        }

        document.querySelectorAll(".showSectionData").forEach(button => {
            button.addEventListener("click", async (event) => {

                //console.log((event.target.parentElement).parentElement);
                await ClassesDepartmentHeadComponents.editSection(event.target.id, sessionStorage.getItem("classId"));
            });
        });

        document.querySelectorAll(".deleteSection").forEach(button => {
            button.addEventListener("click", async (event) => {

                console.log(event.target.id);
                await ClassesDepartmentHeadComponents.cancelSection(event.target.id, sessionStorage.getItem("classId"));
            });
        });

        document.querySelectorAll(".getStudentsListBySectionId").forEach(button => {
            button.addEventListener("click", async (event) => {
                await ClassesDepartmentHeadComponents.showStudensListBySectionId(event.target.id); 
            });
        });

        document.querySelectorAll(".getProffesorCalificationsBySectionId").forEach(button => {
            button.addEventListener("click", async (event) => {
                await ClassesDepartmentHeadComponents.showProffesorCalificationsBySectionId(event.target.id); 
            });
        });

        document.getElementById("docentesDepartamentoComponent")?.addEventListener("click", (e) => {
            e.preventDefault(); 
            console.log("se ha presionado");
          });
    }
}