import { registerBook } from "./register-book.js";
import { LibraryFetch } from "../../fetchs/libraryFetch.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"

export function loadRegisterBookForm(){

    let libraryContainer = document.createElement('div');
    libraryContainer.className = "container my-5";
    libraryContainer.innerHTML = registerBook;

    let body = document.getElementsByTagName("body")[0];
    body.insertBefore(libraryContainer, body.firstChild);
    
    LibraryFetch.getBooksTags()
    .then(data => {

        libraryContainer.querySelector("#tags").innerHTML = data;
        const form = document.querySelector("form");
        if (form) {
            validateForm(form.id, DataFormValidations.validationsRegisterBooksForm, "registerBookForm");
        }
        document.getElementById("register-book-form").addEventListener("submit", SendForm.validateRegisterBookForm);

    })
    .catch(error => console.log(error));

}

//tagsBelowInput();