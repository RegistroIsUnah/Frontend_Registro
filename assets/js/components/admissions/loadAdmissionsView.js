import { admissionsForm } from "./admissions-form.js";
import { SendForm } from "../../sendForms.js";
import { validateForm } from '../../validators/formValidator.js';
import { AdmissionFetch } from "../../fetchs/admissionFetch.js";

import { admissionsPage } from './admissions-page.js';

import { DataFormValidations } from "../../validators/formFieldsValidations.js";

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
        history.go(1);
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
            validateForm(form.id, DataFormValidations.validationsFormAdmissions, "admissionsForm");
        }
        
    }).catch(error => {
        console.error("Error al obtener datos del formulario:", error);
    });   
}

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/15
 *  * 
 * Este evento detecta cuando una persona sale de la vista del formulario y quiere volver atrás.
 * Carga la página anterior si presiona el botón de volver del navegador.
 * TODO // Esta lógica es necesaria, ya que la página de admisiones funciona con vistas cargadas dinámicamente en el archivo .php
 */
window.addEventListener("popstate", function (event) {

    const confirmarSalida = confirm("¿Estás seguro de que quieres salir de este formulario?");

    if (confirmarSalida) {
        const formularioContainer = document.getElementById("divAdmissionsForm");
        if (formularioContainer) {
            document.body.removeChild(formularioContainer);
            this.history.go(-1);
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

