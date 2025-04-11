import { classesTarget, createSectionForm } from "../classes-views/classesDepartmentHeadViews.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";
import { DepartmentFetch } from "../../../fetchs/departmentFetch.js";
import { AdministrationFetch } from "../../../fetchs/administrationFetch.js";
import { CenterFetch } from "../../../fetchs/centerFetch.js";
import { RegularExpressions } from "../../../utils/regularExpressions.js";
import { messageAlert } from "../../modals/modals.js";
import { RenderClassesViews } from "../renderClassesViews.js";
import { renderMenu } from "../../../utils/renderMenu.js";

export class ClassesDepartmentHeadComponents{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/05/09
     * 
     */
    static async loadClassesDepartmentHeadComponent(){
        let deptId = sessionStorage.getItem("dept_id");
        let classesData = await ClassFetch.getClasesByDeptId(deptId);
    
        let div = document.createElement("div");
        div.className = "container-fluid mt-5 px-5";
        div.id = "classesList";
        let div2 = document.createElement("div");
        div2.className = "row g-5";

        let div3 = document.createElement("div");
        div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
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
        ? document.getElementById("sectionsList").replaceWith(div) : document.getElementById("navbar")?.insertAdjacentElement("afterend", div);
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/05/09
     * 
     * @param {*} classId 
     */
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
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
        | <a class="color-text" id="returnToClassesView" href="clases.php">Clases</a> |  <a class="color-text">Secciones</a> </h5>`;
        div.append(div3);

        let button = document.createElement("button");
        button.className = "btn btn-primary mb-4 mx-4";
        button.id = "createSectionButton";
        button.innerHTML = "Crear Sección";
        button.type = "button";
        div.append(button);        

        if(sectionsClassData.message != "No se encontraron secciones para esta clase."){

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
        }else{

            div2.insertAdjacentHTML("beforeend", `
                <div class="col-lg-6 col-md-6 col-sm-6 offset-lg-3 offset-md-3 offset-sm-3">
                    <div class="card">
                        <div class="card-body">
                            <h4>Presione el botón <strong>"Crear sección"</strong> para añadir una sección.</h4>
                        </div>
                    </div>
                </div>
            `);
            div.append(div2);
            document.getElementById("classesList") 
            ? document.getElementById("classesList").replaceWith(div) 
            : document.getElementById("navbar").insertAdjacentElement("afterend", div);
        }

        document.getElementById("createSectionButton")?.addEventListener("click", () => ClassesDepartmentHeadComponents.loadCreateSectionForm(classId));  
        document.getElementById("returnToClassesView")?.addEventListener("click", () => window.addEventListener("beforeunload", () => sessionStorage.removeItem("classId")));
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/05/09
     * 
     * @param {*} classId 
     * 
     * Esta función carga el formulario de crear sección y lo envía hacia el endpoint.
     */
    static async loadCreateSectionForm(classId) {

        let deptId = sessionStorage.getItem("dept_id");
        let proffessorsData = await DepartmentFetch.getProffesorsByDeptId(deptId);
        let academicPeriodsData = await AdministrationFetch.getActiveAcademicPeriods();
        let buildingsData = await CenterFetch.getBuildings();

        console.log(proffessorsData);
        
        let proffessorOption = ['<option value="" selected>-- Seleccione un Docente --</option>']
        .concat(proffessorsData.docentes.map(proffessor => 
            `<option value="${proffessor.docente_id}">${proffessor.nombre} ${proffessor.apellido}</option>`
        )).join('');

        let academicOption = ['<option value="" selected>-- Seleccione un Periodo --</option>']
        .concat(Object.values(academicPeriodsData).map(period => 
            `<option value="${period.periodo_academico_id}">${period.numero_periodo} - ${period.anio}</option>`
        )).join('');

        let buildingOption = ['<option value="" selected>-- Seleccione un Edificio --</option>']
        .concat(buildingsData.data.map(building => 
            `<option value="${building.edificio_id}">${building.nombre_edificio}</option>`
        )).join('');

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = createSectionForm(classId, proffessorOption, academicOption, buildingOption);
        document.body.appendChild(modalContainer);
        const modal = new bootstrap.Modal(document.getElementById('createSectionModal'));
        modal.show();
        modalContainer.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modalContainer);
        });

        document.getElementById("edificio_id").addEventListener("change", async (event) => {
            let selectedOption = event.target.options[event.target.selectedIndex];

            let classroomsData = await CenterFetch.getAulasByBuildingId(selectedOption.value);

            let classroomOption = ['<option value="" selected>-- Seleccione un Aula --</option>']
            .concat(classroomsData.aulas.map(classroom => 
                `<option value="${classroom.aula_id}">${classroom.nombre}</option>`
            )).join('');
    
            document.getElementById("aula_id").disabled = false;
            document.getElementById("aula_id").innerHTML = classroomOption;
            console.log(classroomOption);
        });

        document.getElementById('create-section-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = document.querySelector("#create-section-form");            
            const diasRegexMap = [
                { regex: /^[Ll]unes$/i, value: 1 },
                { regex: /^[Mm]artes$/i, value: 2 },
                { regex: /^[Mm]i[ée]rcoles$/i, value: 3 }, 
                { regex: /^[Jj]ueves$/i, value: 4 },
                { regex: /^[Vv]iernes$/i, value: 5 },
                { regex: /^[Ss][áa]bado$/i, value: 6 },
                { regex: /^[Dd]omingo$/i, value: 7 }
            ];
            
            const diasTexto = form.querySelector("[name='dias']").value;
            
            const numerosDias = diasTexto
                .split(',')
                .map(dia => {
                    const diaLimpio = dia.trim().toLowerCase();
                    const coincidencia = diasRegexMap.find(({ regex }) => regex.test(diaLimpio));
                    return coincidencia ? coincidencia.value : null;
                })
                .filter(num => num !== null)
                .join(',');
            
            let formData = new FormData();
            
            formData.append("clase_id", form.querySelector("[name='clase_id']").value.trim().replace(/\D/g, ''));
            formData.append("docente_id", form.querySelector("[name='docente_id']").value.trim().replace(/\D/g, ''));
            formData.append("periodo_academico_id", form.querySelector("[name='periodo_academico_id']").value.trim().replace(/\D/g, ''));
            formData.append("aula_id", form.querySelector("[name='aula_id']").value.trim().replace(/\D/g, ''));
            formData.append("hora_inicio", form.querySelector("[name='hora_inicio']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
            formData.append("hora_fin", form.querySelector("[name='hora_fin']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
            formData.append("cupos", form.querySelector("[name='cupos']").value.trim().replace(/\D/g, ''));
            formData.append("dias", numerosDias);
            
            let response = await DepartmentFetch.createSection(formData);

            let divModal = document.createElement("div");
            if(!response.error){ modal.hide();}
            divModal.innerHTML = !response.error ? messageAlert("bg-success", response.message) : messageAlert("bg-danger", `${response.error}`);
            document.body.appendChild(divModal);
            let createAcademicPeriodAlertResponse = new bootstrap.Toast(document.getElementById('messageAlert'));
            createAcademicPeriodAlertResponse.show(); 
            setTimeout(() => divModal.remove(), 4000);
        });
    }       
}