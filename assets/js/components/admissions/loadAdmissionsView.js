import { admissionsForm } from "./admissions-form.js";
import { SendForm } from "../../sendForms.js";
import { validateForm } from '../../validators/formValidator.js';
import { AdmissionFetch } from "../../fetchs/admissionFetch.js";

import { admissionsPage } from './admissions-page.js';

/**
 * @author estiven.mejia@unah.hn
 * @version 0.1.1
 * @since 2025/03/15
 * 
 * Función que carga la vista principal de admisiones
 */
export let loadAdmissionsPage = () => {

    history.pushState({ view: "admissionsPage" }, "", window.location.href);

    const existingPage = document.getElementById("divAdmissionsForm");
    if (existingPage) {
        document.body.removeChild(existingPage);
    }

    const bodyAdmissionsPage = document.createElement('div');
    bodyAdmissionsPage.id = "divAdmissionsPage";
    bodyAdmissionsPage.innerHTML = admissionsPage();
    document.body.insertBefore(bodyAdmissionsPage, document.body.firstChild);

    
    document.getElementById("admissionsFormButton").addEventListener("click", function () {

        const divAdmissionsPage = document.getElementById("divAdmissionsPage");
        if (divAdmissionsPage) {
            document.body.removeChild(divAdmissionsPage);
        }
        loadAdmissionsForm();
    });
};

/**
 * @author estiven.mejia@unah.hn
 * @version 0.1.1
 * @since 2025/03/15
 * 
 * Función que carga la vista del formulario de admisiones
 */
export function loadAdmissionsForm(){
    
    history.pushState({ view: "admissionsForm" }, "", window.location.href);

    let admissionsFetch = new AdmissionFetch();
    admissionsFetch.getAdmissionsDataForm().then(([centerOptions, careerOptions]) => {

        let body = document.getElementsByTagName("body")[0];
        const formularioContainer = document.createElement('div');
        formularioContainer.id = "divAdmissionsForm";
        formularioContainer.innerHTML = admissionsForm(centerOptions, careerOptions);
        body.insertBefore(formularioContainer, body.firstChild);

        document.getElementById("applicants-admission-form").addEventListener("submit", SendForm.validateAdmissionForm);
        const form = document.querySelector("form");
        if (form) {
            validateForm(form.id);
        }
        
    }).catch(error => {
        console.error("Error al obtener datos del formulario:", error);
    });   
}

window.addEventListener("popstate", function (event) {

    const confirmarSalida = confirm("¿Estás seguro de que quieres salir de este formulario?");

    if (confirmarSalida) {
        const formularioContainer = document.getElementById("divAdmissionsForm");
        if (formularioContainer) {
            document.body.removeChild(formularioContainer);
        }

        if (event.state && event.state.view === "admissionsForm") {
            loadAdmissionsPage();
        }
    } else {
        history.pushState({ view: "admissionsForm" }, "", window.location.href);
    }
});



/**
 * @author estiven.mejia@unah.hn
 * @version 0.1.1
 * @since 2025/03/15
 * 
 * Función que carga la vista de admisiones para los revisores
 */
export function loadAdmissionsReviewersPage(){}

