import { admissionsPage } from './admissions-page.js';
import { admissionsForm } from "./admissions-form.js";
import { showAdmissionApplication } from "./show-admission-application.js";
import { validateForm } from '../../validators/formValidator.js';
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { SendForm } from "../../sendForms.js";

import { CenterFetch } from "../../fetchs/centerFetch.js";
import { AdmissionFetch } from '../../fetchs/admissionFetch.js';

import { informationModal, sendFormConfirmationModal, formResponseModal } from '../modals/modals.js';
/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/15
 * 
 * Función que carga la vista principal de admisiones
 */
export let loadAdmissionsPage = () => {

    history.pushState({ view: "admissionsPage" }, "", window.location.href);

    const existingPage = document.getElementById("divAdmissionsForm");
    existingPage && document.body.removeChild(existingPage);

    const bodyAdmissionsPage = document.createElement('div');
    bodyAdmissionsPage.id = "divAdmissionsPage";
    bodyAdmissionsPage.innerHTML = admissionsPage();

    document.getElementById("navbar").insertAdjacentElement("afterend", bodyAdmissionsPage);
    //document.body.insertBefore(bodyAdmissionsPage, document.body.firstChild);
    
    document.getElementById("admissionsFormButton").addEventListener("click", function () {

        const divAdmissionsPage = document.getElementById("divAdmissionsPage");
        if (divAdmissionsPage) {
            document.body.removeChild(divAdmissionsPage);
            history.go(1);
            loadAdmissionsForm();
        }
    });

    document.getElementById("showAdmissionApplicationButton").addEventListener("click", () => {

        const divAdmissionsPage = document.getElementById("divAdmissionsPage");
        if (divAdmissionsPage) {
            document.body.removeChild(divAdmissionsPage);
            history.go(1);
            loadAdmissionApplicationView();
        }
    });
};

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.3
 * @since 2025/03/15
 * 
 * Función que carga la vista del formulario de admisiones.
 */
export async function loadAdmissionsForm(){

    history.pushState({ view: "admissionsForm" }, "", window.location.href); // Indicando la vista actual en el historial de navegador
    
    // El siguiente código construye las etiquetas que se cargarán dinámicamente en el formulario 
    let centersData = await CenterFetch.getCenters();
    
    let centerOptions = ['<option value="">-- Seleccione un centro --</option>']
    .concat(centersData.map(centro => 
        `<option value="${centro.centro_id}">${centro.nombre}</option>`
    )).join('');

    let careerOptions1 = "<option value='' selected> -- Seleccione primero un centro --</option>";
    let careerOptions2 = "<option value='' selected> -- Seleccione antes una carrera principal --</option>";
    
    // El siguiente código carga el formulario en la vista, listo con su contenido dinámico.
    const formularioContainer = document.createElement('div');
    formularioContainer.id = "divAdmissionsForm";
    formularioContainer.innerHTML = admissionsForm(centerOptions, careerOptions1, careerOptions2);
    document.getElementById("navbar").insertAdjacentElement("afterend", formularioContainer);
    //let body = document.getElementsByTagName("body")[0];
    //body.insertBefore(formularioContainer, body.firstChild);
    
    document.getElementById("centro_regional").addEventListener("change", loadPrimaryCareersToAdmissionsForm);

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/22
     * 
     *  El siguiente código carga en el formulario las carreras del centro que se ha elegido.
     */
    async function loadPrimaryCareersToAdmissionsForm(event) {
        
        if(!event.target.value){
            document.getElementById("carrera_principal").disabled = true; 
            document.getElementById("carrera_secundaria").disabled = true;
            return;
        }
        let careersCenterData = await CenterFetch.getCareersByCenter(event.target.value);
        let careerOptions = ['<option value="">-- Seleccione su carrera primaria --</option>']
        .concat(Object.values(careersCenterData).map(career => 
            `<option class="${career.examenes[0].nota_minima}" value="${career.carrera_id}">${career.carrera_nombre}</option>`
        )).join('');

        document.getElementById("carrera_principal").disabled = false;
        document.getElementById("carrera_principal").innerHTML = careerOptions;
        document.getElementById("carrera_principal").addEventListener("change", loadSecondCareersToAdmissionsForm);

        /**
         * @author estiven.mejia@unah.hn
         * @version 0.0.1
         * @since 2025/03/22
         * 
         *  El siguiente código carga las carreras de menor o igual puntaje que la carrera principal en la sección de carreras secundarias.
         */
        function loadSecondCareersToAdmissionsForm(event){

            if(!event.target.value){document.getElementById("carrera_secundaria").disabled = true; return;}

            let primaryCareerSelected = Object.values(careersCenterData).filter((career) => career.carrera_id == event.target.value);
            let secondCareers = Object.values(careersCenterData).filter((career) => 
                career.examenes[0].nota_minima <= primaryCareerSelected[0].examenes[0].nota_minima
                && career.carrera_id !== primaryCareerSelected[0].carrera_id );

            let careerOptions = ['<option value="">-- Seleccione su carrera secundaria --</option>']
            .concat(Object.values(secondCareers).map(career => 
                `<option class="${career.examenes[0].nota_minima}" value="${career.carrera_id}">${career.carrera_nombre}</option>`
            )).join('');
    
            document.getElementById("carrera_secundaria").disabled = false;
            document.getElementById("carrera_secundaria").innerHTML = careerOptions;            
        }        
    }
    
    const form = document.querySelector("#applicants-admission-form");
    form && validateForm(form.id, DataFormValidations.validationsFormAdmissions, "admissionsForm");
    //document.getElementById("applicants-admission-form").addEventListener("submit", SendForm.validateAdmissionForm);

    // Modal para confirmar el envío del formulario de admisión.
    /*
    let modal = sendFormConfirmationModal("¿Desea enviar la solicitud de admisión?");        
    let divModal = document.createElement("div");
    divModal.innerHTML = modal;
    document.body.appendChild(divModal);
    let successModalInstance = new bootstrap.Modal(document.getElementById('sendFormConfirmationModal'));
    */
        
    // Lógica para enviar el formulario y recibir su respuesta.
    document.getElementById("applicants-admission-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        
        // Limpiar modales anteriores
        const existingModal = document.getElementById('formResponseModalDiv');
        if (existingModal) {
            bootstrap.Modal.getInstance(document.getElementById('formResponseModal'))?.dispose();
            existingModal.remove();
        }
    
        // Crear nueva modal
        const repsonseModal = formResponseModal();
    
        const divModal = document.createElement('div');
        divModal.id = "formResponseModalDiv";
        divModal.innerHTML = repsonseModal;
        document.body.appendChild(divModal);
    
        const responseModalInstance = new bootstrap.Modal(document.getElementById('formResponseModal'));
        const formSendedResponse = await SendForm.validateAdmissionForm(form);
    
        // Configurar contenido
        if(formSendedResponse.message) {
            document.getElementById("formResponseModalTitle").textContent = "Enviado correctamente ✅";
            document.getElementById("formResponseModalBody").innerHTML = `<h5 style="color:green;">${formSendedResponse.message}</h5>`;
            document.getElementById("viewFormDataButton").hidden = true;
        } else if(formSendedResponse.error) {
            document.getElementById("formResponseModalTitle").textContent = "Ha ocurrido un problema...";
            document.getElementById("formResponseModalBody").innerHTML = `<h5 style="color:red;">${formSendedResponse.error}</h5>`;
            document.getElementById("viewFormDataButton").hidden = false;
        }
    
        // Manejar cierre completo
        document.getElementById('formResponseModal').addEventListener('hidden.bs.modal', () => {
            // Eliminar estilos residuales de Bootstrap
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
            
            // Eliminar backdrop
            const backdrops = document.getElementsByClassName('modal-backdrop');
            while(backdrops.length > 0) {
                backdrops[0].remove();
            }
            
            // Eliminar modal del DOM
            divModal.remove();
        });
    
        // Manejar botón "Revisar formulario"
        document.getElementById('viewFormDataButton').addEventListener('click', () => {
            responseModalInstance.hide(); // Cerrar modal correctamente
            // Aquí tu lógica adicional para revisar el formulario
        });
    
        responseModalInstance.show();
    });
}

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/23
 * 
 * Esta función renderiza la vista utilizada para visualizar el estado de la solicitud de admisión en el archivo admisiones.php
 */
export function loadAdmissionApplicationView(){

    history.pushState({ view: "admissionApplicationView" }, "", window.location.href); // Indicando la vista actual en el historial de navegador
    
    let admissionApplicationDiv = document.createElement("div");
    admissionApplicationDiv.id = "admissionApplicacionViewContainer";
    admissionApplicationDiv.innerHTML = showAdmissionApplication();
    
    document.getElementById("navbar").insertAdjacentElement("afterend", admissionApplicationDiv);
    
    // Habilita el botón hasta que el patrón del número de solicitud sea correcto.
    document.getElementById("showAdmissionApplicationInput").addEventListener("input", (event) => {
        const APPLICATION_NUMBER = /^SOL-?\d{3,16}$/;
        let isDisabled = (APPLICATION_NUMBER.test(event.target.value) && event.target.value) ? false : true;
        event.target.nextElementSibling.disabled = isDisabled;
    });

    // Muestra la información de la solicitud si se ha ingresado el número de solicitud.
    document.getElementById("showAdmissionApplicationButton").addEventListener("click", async (event) => {
        
        let applicacionNumber = (event.target.previousElementSibling.value).trim();
        let admissionData = await AdmissionFetch.getAdmissionDataByApplicationNumber(applicacionNumber);
        let admissionDataContent = "";

        if(admissionData.error){       
            admissionDataContent = `<h5 style="color:red">La solicitud de admisión con el código "${applicacionNumber}" no se ha encontrado."</h5>`
        }else{

            let resendAdmissionButton = (admissionData.estado_aspirante == "RECHAZADO") 
            ? `<button id="resendAdmissionButton" class="btn btn-outline-danger">Reenviar solicitud</button>` : "";
            let statusColor = (admissionData.estado_aspirante == "ADMITIDO") ? "GREEN" 
            : ((admissionData.estado_aspirante == "RECHAZADO" || admissionData.estado_aspirante == "CANCELADO") ? "red" : "#013775");
            let identificationType = (admissionData.tipo_documento == "PASAPORTE") ? "pasaporte" : "cédula";
 
            admissionDataContent = `
                <table class="table">
                    <thead>
                        <tr>
                            <th colspan="2" style="text-align: center; background-color: white;">
                            Estado de solicitud: <span class="fs-4" style="color: ${statusColor} !important">${admissionData.estado_aspirante}</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nombre</th>
                            <td>${admissionData.aspirante_nombre} ${admissionData.aspirante_apellido}</td>
                        </tr>
                        <tr>
                            <th scope="row">Correo</th>
                            <td>${admissionData.correo}</td>               
                        </tr>
                        <tr>
                            <th scope="row">Teléfono</th>
                            <td>${admissionData.telefono}</td>               
                        </tr>
                        <tr>
                            <th scope="row">Carrera primaria</th>
                            <td>${admissionData.carrera_principal}</td>
                        </tr>
                        <tr>
                            <th scope="row">Carrera secundaria</th>
                            <td>${admissionData.carrera_secundaria}</td>
                        </tr>
                        <tr>
                            <th scope="row">Número de ${identificationType}</th>
                            <td>${admissionData.documento}</td>               
                        </tr>
                        <tr>
                            <th scope="row">Número de solicitud</th>
                            <td>${admissionData.numSolicitud}</td>               
                        </tr>
                        <tr>
                            <th scope="row">Fecha de solicitud</th>
                            <td>${admissionData.fecha_solicitud}</td>               
                        </tr>
                        ${resendAdmissionButton}
                    </tbody>
                </table>
            `;
            let admissionDataDiv = document.createElement("div");
            admissionDataDiv.className = "container container-form my-5";
            admissionDataDiv.innerHTML = admissionDataContent;
            
            document.getElementsByClassName("container-form")[0] && document.getElementsByClassName("container-form")[0].remove();
            document.getElementById("admissionApplicationContent").insertAdjacentElement("afterend", admissionDataDiv);
            admissionData.estado_aspirante == "RECHAZADO" && document.getElementById("resendAdmissionButton").addEventListener("click", () => console.log(admissionData));
        }
    });

    // Muestra información personal y el número de solicitud si se ingresa el DNI para recuperar el número.
    document.getElementById("recoverAdmissionNumberButton").addEventListener("click", async () => {
       
        // Lógica para creación de la modal donde se ingresará la identificación del aspirante para mostrar el número de solicitud.
        let modalBody = `<div class="input-group flex-column"> 
                            <p class="mb-2 text-center">Ingrese su identificación</p> 
                            <div class="d-flex align-items-center">
                                <input id="recoverAdmissionNumberInputModal" class="form-control me-2" type="text" maxlength="13" placeholder="DNI o pasaporte">
                                <button type="submit" id="recoverAdmissionNumberButtonModal" style="background-color: #013775;" class="btn btn-primary">Ver</button> 
                            </div>
                        </div>`;

        let modal = informationModal("Recupere su número de solicitud", modalBody, "Enviar No. solicitud por correo", "hidden");
        
        let divModal = document.createElement("div");
        divModal.innerHTML = modal;
        document.body.appendChild(divModal);

        let successModalInstance = new bootstrap.Modal(document.getElementById('informationModal'));
        successModalInstance.show();

        // Habilita el botón hasta que el patrón de la identifiación sea correcto.
        /*
        document.getElementById("recoverAdmissionNumberInputModal").addEventListener("input", (event) => {
            const DNI_PASSPORT = /^(0[1-9]|[1][0-8])(0[1-9]|[12][0-9])(19[4-9][0-9]|2[01][0-9]{2})\d{5}$/;
            let isDisabled = (DNI_PASSPORT.test(event.target.value) && event.target.value) ? false : true;
            event.target.nextElementSibling.disabled = isDisabled;
        });*/

        // Lógica para mostrar en la modal información y número de solicitud del aspirante.
        document.getElementById("recoverAdmissionNumberButtonModal").addEventListener("click", async (event) => {

            let identificationNumber = (event.target.previousElementSibling.value).trim();
            let admissionData = await AdmissionFetch.getApplicationNumberByIdentification(identificationNumber);
            let dataAdmissionTable = "";

            if(!admissionData.error){
                dataAdmissionTable = `
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Datos</th>
                            <th scope="col">Datos solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Nombre</th>
                            <td>${admissionData.nombre} ${admissionData.apellido}</td>
                            </tr>
                            <tr>
                            <th scope="row">Carrera primaria</th>
                            <td>${admissionData.carrera_principal}</td>
                            </tr>
                            <tr>
                            <th scope="row">Fecha solicitud</th>
                            <td>${admissionData.fecha_solicitud}</td>               
                            </tr>
                            <tr>
                            <th scope="row" style="color:red;">Número de solicitud</th>
                            <td><strong style="color:red;">${admissionData.numSolicitud}</strong></td>                
                            </tr>
                        </tbody>
                    </table>
                    `;
                document.getElementById("successButtomModal").hidden = false;
            }else{
                dataAdmissionTable = `
                <h5 style="color:red">Hubo un problema al intentar encontrar una solicitud de admisión con el número de identificación ${identificationNumber}</h5>`
            }

            let admissionDataDiv = document.createElement("div");
            admissionDataDiv.className = "container mt-5";
            admissionDataDiv.innerHTML = dataAdmissionTable;
            document.getElementsByClassName("modal-body")[0].replaceChild(admissionDataDiv, document.getElementsByClassName("modal-body")[0].lastChild);
        });
    });

}

window.addEventListener("popstate", () => {

    switch(history.state.view){

        case "admissionsForm":

            const confirmarSalida = confirm("¿Estás seguro de que quieres salir de este formulario?");
            const formularioContainer = document.getElementById("divAdmissionsForm");
        
            if (confirmarSalida && formularioContainer) {
                document.body.removeChild(formularioContainer);
                history.back();
                loadAdmissionsPage();
            } else {
                history.pushState({ view: "admissionsForm" }, "", window.location.href);
            }

        break;

        case "admissionApplicationView":

            const admissionDataContainer = document.getElementById("admissionApplicacionViewContainer");
            
            if (admissionDataContainer) {
                document.body.removeChild(admissionDataContainer);
                history.back();
                loadAdmissionsPage();
            } else {
                history.pushState({ view: "admissionApplicationView" }, "", window.location.href);
            }

        break;
    }
});