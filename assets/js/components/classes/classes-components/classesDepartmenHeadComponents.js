import { classesTarget, createSectionForm } from "../classes-views/classesDepartmentHeadViews.js";
import { ClassFetch } from "../../../fetchs/classFetch.js";
import { DepartmentFetch } from "../../../fetchs/departmentFetch.js";
import { AdministrationFetch } from "../../../fetchs/administrationFetch.js";
import { CenterFetch } from "../../../fetchs/centerFetch.js";
import { RegularExpressions } from "../../../utils/regularExpressions.js";
import { messageAlert } from "../../modals/modals.js";
import { informationModal, sendFormConfirmationModal } from "../../modals/modals.js";
import { DocenteFetch } from "../../../fetchs/docenteFetch.js";

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

            sectionsClassData = sectionsClassData.filter(section => section.estado_seccion = "ACTIVA");
            Object.values(sectionsClassData).forEach(section => {

                let motivo = "", attribute = "";
                let { seccion_id, hora_inicio, hora_fin, estado_seccion_id, 
                    estado_seccion, video_url, motivo_cancelacion, cupos, 
                    docente_nombre, docente_apellido, aula_nombre, edificio_nombre } = section;

                if(estado_seccion != "ACTIVA"){

                    motivo =  `Motivo de cancelación: <strong>${motivo_cancelacion}</strong></br>`;
                    attribute = "hidden";
                }
                let body = `
                <div class="my-lg-3 my-md-2 my-sm-2">
                    HI - HF: <strong id="horas">${hora_inicio} - ${hora_fin}</strong></br>
                    Docente: <strong>${docente_nombre} ${docente_apellido}</strong></br>
                    Cupos: <strong> ${cupos}</strong></br>
                    Aula: <strong>${aula_nombre}</strong></br>
                    Edificio: <strong>${edificio_nombre}</strong></br>
                    Estado: <strong>${estado_seccion}</strong></br>
                    ${motivo}
                </div>
                `;
                div2.insertAdjacentHTML("beforeend",
                classesTarget(`Sección ${hora_inicio.split(':').slice(0, 2).join('')}`, body, [seccion_id, "showSectionData", "Editar sección"], attribute));

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
        modalContainer.innerHTML = createSectionForm("create-section-form", classId, proffessorOption, academicOption, buildingOption, "Crear Sección");
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
    
    static async editSection(sectionId, classId){

        document.getElementById("createSectionModal")?.remove();
        let sectionsClassData = await ClassFetch.getSectionsByClassId(classId);
        let section = sectionsClassData.find(section => section.seccion_id == sectionId);  
        let deptId = sessionStorage.getItem("dept_id");
        let proffessorsData = await DepartmentFetch.getProffesorsByDeptId(deptId);
        let buildingsData = await CenterFetch.getBuildings();

        let datosSeccion = [section.hora_inicio, section.hora_fin, section.cupos];        
        let proffessorOption = ['<option value="">-- Seleccione un Docente --</option>']
        .concat(proffessorsData.docentes.map(proffessor => 
            `<option ${`${proffessor.nombre} ${proffessor.apellido}` == `${section.docente_nombre} ${section.docente_apellido}` && "selected"} value="${proffessor.docente_id}">${proffessor.nombre} ${proffessor.apellido}</option>`
        )).join('');

        let buildingId = "";
        let buildingOption = ['<option value="" selected>-- Seleccione un Edificio --</option>']
        .concat(buildingsData.data.map(building => {
            if (building.nombre_edificio == section.edificio_nombre) {
                buildingId = building.edificio_id;
            }
            return `<option ${building.nombre_edificio == section.edificio_nombre ? 'selected' : ''} value="${building.edificio_id}">${building.nombre_edificio}</option>`;
        }))
        .join('');

        let classroomsData = await CenterFetch.getAulasByBuildingId(buildingId);
        let classroomOption = ['<option value="" selected>-- Seleccione un Aula --</option>']
        .concat(classroomsData.aulas.map(classroom => 
            `<option ${section.aula_nombre == classroom.nombre && "selected"} value="${classroom.aula_id}">${classroom.nombre}</option>`
        )).join('');
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = createSectionForm("edit-section-form", classId, proffessorOption, "", buildingOption, "Editar Sección", "hidden", classroomOption, datosSeccion);

        document.body.appendChild(modalContainer);
        const modal = new bootstrap.Modal(document.getElementById('createSectionModal'));
        modal.show();
        
        document.getElementById('edit-section-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            let editDataSection = {
                seccion_id: sectionId,
                docente_id: document.getElementById("docente_id").value,
                cupos: document.getElementById("cupos").value,
                hora_inicio: document.getElementById("hora_inicio").value,
                hora_fin: document.getElementById("hora_fin").value,
                aula_id: document.getElementById("aula_id").value
            };
        
            let response = await DepartmentFetch.editSection(editDataSection);
            let modal = response.message == "Sección modificada exitosamente" ? 
            messageAlert("bg-primary", "La sección ha sido modificada. Por favor, refresque la página.") : messageAlert("bg-danger", response.error);
        
            let divModal = document.createElement("div");
            divModal.innerHTML = modal;
            document.body.appendChild(divModal);
            let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
            successModalInstance.show();
            
            const modalElement = document.getElementById('createSectionModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
        
            modalElement.addEventListener('hidden.bs.modal', () => {
                modalContainer.remove();
            });
        
            setTimeout(() => {
                if (divModal) divModal.remove();
            }, 2000);
        });
    }

    static async cancelSection(sectionId, classId){

        const existingModals = ["divModalEditSection", "divModalCancelSection", "informationModal"];
        existingModals.forEach(id => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.remove();
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.dispose();
            }
        });

        let modalBody = `<div class="input-group flex-column"> 
                            <h5 class="mb-2 text-center">Ingrese el motivo de cancelación:</h5> 
                            <div class="d-flex align-items-center">
                                <textarea id="motivo_rechazo" name="motivo_rechazo" class="form-control me-2" type="text" mexlength="50"></textarea>
                            </div>
                        </div>`;

        let divModal = document.createElement("div");
        divModal.id = "divModalCancelSection";
        divModal.innerHTML = informationModal("Cancelar sección", modalBody, "Cancelar sección", "disabled", "modal-lg");
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
        successModalInstance.show();

        document.getElementById("motivo_rechazo").addEventListener("input", (event) => {
            document.getElementById("successButtomModal").disabled = event.target.value.length < 6;
        });

        document.getElementById("successButtomModal").addEventListener("click", async (event) => {

            let form = document.querySelector("#informationModal");
            let json = {
                seccion_id: sectionId,
                estado: "CANCELADA",
                motivo_cancelacion: form.querySelector("[name='motivo_rechazo']").value
            };

            console.log(json);
            let response = await DepartmentFetch.editSection(json);

            let modal = response.message == "Sección modificada exitosamente" ? 
            messageAlert("bg-primary", "La sección ha sido cancelada. Por favor, refresque la página.") : messageAlert("bg-danger", response.error);
    
            let divModal = document.createElement("div");
            divModal.innerHTML = modal;
            document.body.appendChild(divModal);
            let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
            successModalInstance.show(); 
            setTimeout(() => divModal.remove(), 2000);  
        });
    }

    static async showStudensListBySectionId(sectionId){

        let studentsList = await ClassFetch.getStudentsListBySectionId(sectionId);

        if(studentsList.data){

            let studentsTable = studentsList.data.map(student =>             
                `
                <tr class="${student.calificacion < 6.50 ? "table-danger" : "table-primary"}">
                    <th scope="row"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${student.numero_cuenta}</font></font></th>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${student.nombre} ${student.apellido}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${student.correo_personal}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${student.calificacion}</font></font></td>
                </tr>
                `
            ).join("");

            let div = document.createElement("div");
            div.className = "container-fluid mt-5 px-5";
            div.id = "studentsList";
            let div3 = document.createElement("div");
            div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
            div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
            | <a class="color-text" id="returnToClassesView" href="clases.php">Clases</a> |  <a class="color-text" href="clases.php">Secciones</a> </h5>`;
            div.append(div3);

            div.innerHTML += `
                            <div class="bd-example main-contenedor d-flex flex-column h-auto">
                                <table class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">No. Cuenta</font></font></th>
                                        <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Nombre</font></font></th>
                                        <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Correo</font></font></th>
                                        <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Calificación</font></font></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${studentsTable}
                                    </tbody>
                                </table>
                            </div>
                            `;
            document.getElementById("sectionsList") ? document.getElementById("sectionsList").replaceWith(div) : document.body.insertAdjacentElement("beforebegin", div);
        }
    }
    
    static async showProffesorCalificationsBySectionId(sectionId){

        let proffessorCalifications = await ClassFetch.getProffesorCalificationsBySectionId(sectionId);

        console.log(proffessorCalifications.data[0].resumen_respuestas);
        if(proffessorCalifications.data[0]){

            const palabrasMasRepetidas = [];
            Object.values(proffessorCalifications.data[0].resumen_respuestas).forEach(respuesta => {
                const propiedadRespuestas = `respuestas-${respuesta.pregunta_id}`;
                const respuestas = respuesta[propiedadRespuestas];
                
                const frecuencia = {};
                respuestas.forEach(palabra => {
                    frecuencia[palabra] = (frecuencia[palabra] || 0) + 1;
                });
                
                let palabraMasRepetida = '';
                let maxFrecuencia = 0;
                
                for (const palabra in frecuencia) {
                    if (frecuencia[palabra] > maxFrecuencia) {
                        maxFrecuencia = frecuencia[palabra];
                        palabraMasRepetida = palabra;
                    }
                }
                palabrasMasRepetidas.push(palabraMasRepetida);
            });
            
            let div = document.createElement("div");
            div.className = "container-fluid mt-5 px-5";
            div.id = "proffesorCalificationsList";
            let div3 = document.createElement("div");
            div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
            div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
            | <a class="color-text" id="returnToClassesView" href="clases.php">Clases</a> |  <a class="color-text" href="clases.php">Secciones</a> </h5>`;
            div.append(div3);

            div.innerHTML += `
                            <div class="bd-example main-contenedor d-flex flex-column h-auto">
                                <table class="table table-hover table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Pregunta de Evaluación Docente</th>
                                        <th scope="col">Calificación</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>¿El docente explica claramente los temas?</td>
                                        <td>${palabrasMasRepetidas[0]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>¿El docente está disponible para consultas?</td>
                                        <td>${palabrasMasRepetidas[1]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>¿El docente utiliza ejemplos prácticos para facilitar el aprendizaje?</td>
                                        <td>${palabrasMasRepetidas[2]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>¿El docente motiva a participar en clase?</td>
                                        <td>${palabrasMasRepetidas[3]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>¿El docente evalúa de manera justa y objetiva?</td>
                                        <td>${palabrasMasRepetidas[4]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>¿El docente cumple con los horarios establecidos?</td>
                                        <td>${palabrasMasRepetidas[5]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>¿El material de apoyo proporcionado es útil y adecuado?</td>
                                        <td>${palabrasMasRepetidas[6]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">8</th>
                                        <td>¿La retroalimentación que brinda el docente es clara y constructiva?</td>
                                        <td>${palabrasMasRepetidas[7]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">9</th>
                                        <td>¿El docente fomenta un ambiente de respeto en el aula?</td>
                                        <td>${palabrasMasRepetidas[8]}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">10</th>
                                        <td>¿Está satisfecho con el desempeño general del docente?</td>
                                        <td>${palabrasMasRepetidas[9]}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            `;
            document.getElementById("sectionsList") ? document.getElementById("sectionsList").replaceWith(div) : document.body.insertAdjacentElement("beforebegin", div);        
        }
    }

    static async loadDepartmentProffessorsTable(){

        let proffesorsList = await ClassFetch.getProffesorsByDeptId(sessionStorage.getItem("dept_id"));

        let proffesorsTableBody = Object.values(proffesorsList.docentes).map(proffesor => 

            `
            <tr>
                <th scope="row">${proffesor.numero_empleado}</th>
                <td>${proffesor.nombre} ${proffesor.apellido}</td>
                <td>${proffesor.correo}</td>
                <td><button id="${proffesor.correo}" class="btn btn-primary cambiarContraDocente">Cambiar contraseña</button></td>
            </tr>
            `
            
        ).join("");

        let div = document.createElement("div");
        div.className = "container-fluid mt-5 px-5";
        div.id = "proffesorCalificationsList";
        let div3 = document.createElement("div");
        div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
        | <a class="color-text">Docentes Departamento</a>`;
        div.append(div3);

        div.innerHTML += `
                        <div class="bd-example main-contenedor d-flex flex-column h-auto">
                            <table class="table table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">No. Empleado</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Opción</th>
                                </tr>
                                </thead>
                                <tbody>
                                    ${proffesorsTableBody}
                                </tbody>
                            </table>
                        </div>
                        `;
        document.getElementById("navbar").insertAdjacentElement("beforeend", div); 
    }

    static async loadDepartmentStudentsTable(){

        let studentsList = await ClassFetch.getStudentsByDeptId(sessionStorage.getItem("dept_id"));
        let studentsTableBody = Object.values(studentsList.estudiantes).map(student => 

            `
            <tr>
                <th scope="row">${student.numero_cuenta}</th>
                <td>${student.nombre} ${student.apellido}</td>
                <td>${student.correo_personal}</td>
                <td>${student.carrera_nombre}</td>
                <td><button id="${student.estudiante_id}" class="btn btn-primary historialAcademicoEstudiante">Historial Académico</button></td>
            </tr>
            `
        ).join("");

        let div = document.createElement("div");
        div.className = "container-fluid mt-5 px-5";
        div.id = "proffesorCalificationsList";
        let div3 = document.createElement("div");
        div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
        div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
        | <a class="color-text">Estudiantes Departamento</a>`;
        div.append(div3);

        div.innerHTML += `
                        <div class="bd-example main-contenedor d-flex flex-column h-auto">
                            <table class="table table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">No. Cuenta</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo Personal</th>
                                    <th scope="col">Carrera</th>
                                    <th scope="col">Historial Académico</th>
                                </tr>
                                </thead>
                                <tbody>
                                    ${studentsTableBody}
                                </tbody>
                            </table>
                        </div>
                        `;
        document.getElementById("navbar").insertAdjacentElement("beforeend", div);
    }

    static async loadHistoryStudent(studentId){

        let studentHistory = await ClassFetch.getStudentHistory(studentId);        
        if(!studentHistory.error){
            
            document.getElementById('proffesorCalificationsList')?.remove();        
            let studentsTableBody = studentHistory.map(item => 
                `
                <tr>
                    <td>${item.codigo}</td>
                    <td>${item.asignatura}</td>
                    <td>${item.seccion}</td>
                    <td>${item.anio}</td>
                    <td>${item.numero_periodo_id}</td>
                    <td>${item.calificacion}</td>
                    <td>${item.observacion ?? '-'}</td>
                </tr>
                `
            ).join("");
    
            console.log(studentsTableBody);
    
    
            let div = document.createElement("div");
            div.className = "container-fluid mt-5 px-5";
            div.id = "proffesorCalificationsList";
            let div3 = document.createElement("div");
            div3.className = "mx-lg-4 my-4 mb-5 mx-md-3 mx-sm-3 mx-xs-3";
            div3.innerHTML = `<h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="docente.php">Panel</a> 
            | <a class="color-text" href="docentesDepartamento.php?tipo=estudiante">Estudiantes Departamento</a> | <a class="color-text">Historial Estudiante</a>`;
            div.append(div3);
    
            div.innerHTML += `
                            <div class="bd-example main-contenedor d-flex flex-column h-auto">
                                <table class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Asignatura</th>
                                            <th>Sección</th>
                                            <th>Año</th>
                                            <th>Período</th>
                                            <th>Calificación</th>
                                            <th>Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabla-historial-body">
                                        ${studentsTableBody}
                                    </tbody>
                                </table>
                            </div>
                            `;
            document.getElementById("navbar").insertAdjacentElement("beforeend", div);       
        }
    }

    static async sendMailToResetPassword(mail){

        let confirmationModal = sendFormConfirmationModal(`¿Enviar correo a ${mail}?`);    
        let divModal = document.createElement("div");
        divModal.innerHTML = confirmationModal;
        divModal.id = "divConfirmationModal";
        document.getElementById("divConfirmationModal") ? document.getElementById("divConfirmationModal").replaceWith(divModal) : document.body.appendChild(divModal);    
        let confirmationModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
        confirmationModalInstance.show();

        document.getElementById("sendFormButom").addEventListener("click", async () => {

            confirmationModalInstance.hide();   
            let response = await DocenteFetch.sendEmailResetPassword({email: mail});
            if(response.success){

                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-success", response.message);
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3000);
            }
        });
    }
}