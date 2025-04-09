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
    }
}