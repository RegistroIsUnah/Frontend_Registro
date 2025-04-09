import { classesTarget, createSectionForm } from "../classes-views/classesDepartmentHeadViews.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";

export class ClassesDepartmentHeadComponents{

    static async loadClassesDepartmentHeadComponent(){
        let deptId = sessionStorage.getItem("deptId");
        let classesData = await ClassFetch.getClasesByDeptId(deptId);
    
        let div = document.createElement("div");
        div.className = "container-fluid mt-5 px-5";
        div.id = "classesList";
        let div2 = document.createElement("div");
        div2.className = "row g-5";

        let div3 = document.createElement("div");
        div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="panel.php">Panel</a> 
        | <a class="color-text" href="clases.php">Clases</a></h5>`;
        div.append(div3);
    
        for (let i = 0; i < classesData.length; i++) {

            let body = `
                <div class="my-lg-3 my-md-2 my-sm-2">
                    Código de clase: <strong>${classesData[i].codigo}</strong></br>
                    Créditos: <strong>${classesData[i].creditos}</strong></br>
                    Tiene laboratorio: <strong> ${classesData[i].tiene_laboratorio == 0 ? "No." : "Sí."}</strong></br>
                </div>
            `
            div2.insertAdjacentHTML("beforeend", classesTarget(classesData[i].nombre, body, [classesData[i].clase_id, "showSectionsClass", "Ver secciones"], "hidden"));
        }
        div.append(div2);
        document.getElementById("sectionsList") 
        ? document.getElementById("sectionsList").replaceWith(div) 
        : document.getElementById("navbar").insertAdjacentElement("afterend", div);    
    }

    static async loadSectionsClass(classId){

        window.addEventListener("beforeunload", () => sessionStorage.setItem("classId", classId));
        let sectionsClassData = await ClassFetch.getSectionsByClassId(classId);

        let div = document.createElement("div");
        div.className = "container-fluid mt-5 px-5";
        div.id = "sectionsList";
        let div2 = document.createElement("div");
        div2.className = "row g-5";

        let div3 = document.createElement("div");
        div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="panel.php">Panel</a> 
        | <a class="color-text" id="returnToClassesView" href="clases.php">Clases</a> |  <a class="color-text">Secciones</a> </h5>`;
        div.append(div3);

        let button = document.createElement("button");
        button.className = "btn btn-primary mb-4"; 
        button.id = "createSectionButton";      
        button.innerHTML = "Crear Sección";      
        button.type = "button";                    
        button.setAttribute('data-bs-toggle', 'modal');
        //button.setAttribute('data-bs-target', '#admissionModal');
        div.append(button);

        Object.values(sectionsClassData).forEach(section => {

            let { seccion_id, hora_inicio, hora_fin, estado_seccion_id, 
                estado_seccion, video_url, motivo_cancelacion, cupos, 
                docente_nombre, docente_apellido, aula_nombre, edificio_nombre } = section;

            let motivo = estado_seccion == "ACTIVA" ? "" : `Motivo de cancelación: <strong>${motivo_cancelacion}</strong></br>`;
            let body = `
            <div class="my-lg-3 my-md-2 my-sm-2">
                HI - HF: <strong>${hora_inicio} - ${hora_fin}</strong></br>
                Docente: <strong>${docente_nombre} ${docente_apellido}</strong></br>
                Cupos: <strong> ${cupos}</strong></br>
                Aula: <strong>${aula_nombre}</strong></br>
                Edificio: <strong>${edificio_nombre}</strong></br>
                Estado: <strong>${estado_seccion}</strong></br>
                ${motivo}
            </div>
            `;
            div2.insertAdjacentHTML("beforeend",
            classesTarget(`Sección ${hora_inicio.split(':').slice(0, 2).join('')}`, body, [seccion_id, "showSectionData", "Editar sección"]));

        });
    
        div.append(div2);
        document.getElementById("classesList") 
        ? document.getElementById("classesList").replaceWith(div) 
        : document.getElementById("navbar").insertAdjacentElement("afterend", div);

        document.getElementById("createSectionButton")?.addEventListener("click", () => ClassesDepartmentHeadComponents.loadCreateSectionForm(classId));  
        document.getElementById("returnToClassesView")?.addEventListener("click", () => window.addEventListener("beforeunload", () => sessionStorage.removeItem("classId")));
    }

    static async loadCreateSectionForm(classId){

        let divModal = document.createElement("div");
        divModal.id = "divModalCreateAcademicPeriod"
        divModal.innerHTML = createSectionForm();
        document.body.appendChild(divModal);
    }
    
}