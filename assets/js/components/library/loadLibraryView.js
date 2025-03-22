import { registerBook } from "./register-book.js";
import { LibraryFetch } from "../../fetchs/libraryFetch.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"


import { bibliotecaView } from './library-page.js';
import { BibliotecaFetch } from "../../fetchs/bibliotecaFetch.js";
import { filtrarLibros } from "./filtrarLibros.js";
import { openPDFModal, goToPage } from "./pdfViewer.js";
import { renderLibros } from "./renderBookView.js";



/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/16
 * 
 * Función encargada de cargar el formulario de registro de libros a la página de biblioteca.

 */
export function loadRegisterBookForm() {

    let libraryFetch = new LibraryFetch();
    libraryFetch.getRegisterBookDataForm().then(([tagsOptions, clasesOptions]) => {

        const formularioContainer = document.createElement('div');
        formularioContainer.className = "container my-5";
        formularioContainer.id = "divBookRegisterForm";
        formularioContainer.innerHTML = registerBook(tagsOptions, clasesOptions);

        let body = document.getElementsByTagName("body")[0];
        body.removeChild(body.firstChild);
        body.insertBefore(formularioContainer, body.firstChild);

        tagsBelowInput();

        const form = document.querySelector("form");
        if (form) {
            validateForm(form.id, DataFormValidations.validationsRegisterBooksForm, "registerBookForm");
        }
        document.getElementById("register-book-form").addEventListener("submit", SendForm.validateRegisterBookForm);

    }).catch(error => {
        console.error("Error al obtener datos del formulario:", error);
    });

}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/21
 * 
 * Función encargada de cargar la vista de biblioteca.

 */


let originalData = []; //Para poder filtrar

export function loadLibraryPage() {

    const estudianteId = sessionStorage.getItem('estudiante_id');//Tomando el id del sessionStorage

    const body = document.getElementsByTagName("body")[0];
    const bibliotecaContainer = document.createElement('div');
    bibliotecaContainer.innerHTML = bibliotecaView;
    body.insertBefore(bibliotecaContainer, body.firstChild);

    // Obtener y mostrar los libros
    BibliotecaFetch.getLibrosEstudiante(estudianteId)
        .then(clases => {
            //console.log(clases);
            originalData = clases;
            renderLibros(originalData);
        })
        .catch(error => {
            console.error("Error al cargar los libros:", error);
        });

    // Filtrado dinámico
    document.getElementById("searchInput").addEventListener("input", function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const filtrarData = filtrarLibros(searchTerm, originalData);
        renderLibros(filtrarData);
    });

}

window.openPDFModal = openPDFModal;
window.goToPage = goToPage;