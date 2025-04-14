import { ClassesDepartmentHeadComponents } from "./classes-components/classesDepartmenHeadComponents.js";

export class RenderClassesViews{

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
        })

    }
}