import { registerBook } from "./register-book.js";
import { LibraryFetch } from "../../fetchs/libraryFetch.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"
import { loadBooks } from "../../fetchs/bibliotecaFetch.js";
import { bibliotecaView } from "./biblioteca-View.js";
/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/16
 * 
 * Función encargada de cargar el formulario de registro de libros a la página de biblioteca.
 */
export function loadRegisterBookForm() {

    let libraryFetch = new LibraryFetch();
    libraryFetch.getRegisterBookDataForm().then(([tagsOptions, classesOptions]) => {
        
        const formularioContainer = document.createElement('div');
        formularioContainer.className = "container my-5";
        formularioContainer.id = "divBookRegisterForm";
        formularioContainer.innerHTML = registerBook(tagsOptions, classesOptions);

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

window.loadRegisterBookForm = loadRegisterBookForm;

export function loadLibraryView() {
    let body = document.getElementsByTagName("body")[0];
    let bibliotecaContainer = document.createElement('div');
    bibliotecaContainer.innerHTML = bibliotecaView;
    body.insertBefore(bibliotecaContainer, body.firstChild);

    loadBooks();
}
