import { SendForm } from './sendForms.js'
import { renderHead, renderBodyPage } from './renderIncludes.js';
import { validateForm } from './validateForm.js';

const actualPage = (window.location.pathname).split('/').pop();

renderHead();
renderBodyPage(actualPage);
document.getElementById("applicants-admission-form").addEventListener("submit", SendForm.validateAdmissionForm);

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/11
 * 
 * When the DOM is loaded, check if exists a formulary. If it exists, get the id and its sended to a function to validate its fields. 
 */
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    if (form) {
        validateForm(form.id);
    } 
});




