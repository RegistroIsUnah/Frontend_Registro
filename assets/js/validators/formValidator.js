import { FormFieldsErrorMessage } from "./formFieldsErrorMessage.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/11
 * 
 * @param {*} formId
 * 
 * Esté método toma el formulario y valida sus campos. 
 * Cuando todos los campos están validados, habilita el botón de envío.
 * 
 * Se propone que este método funcione para todos los formularios del sistema, pero aún no está adaptado.
 * Si usted no encuentra la forma de adaptar este método para varios formularios, haga otro método que valide su formulario.
 */
export async function validateForm(formId, validationsForm, actualForm) {
    const form = document.querySelector(`#${formId}`);
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');

    async function validateField(event) {
        const field = event.target;
        const validator =  validationsForm[field.name];

        let isValid = false;
        if (validator) {
            if (field.type === 'file') {
                try {
                    isValid = await validator(field.files);
                } catch (error) {
                    var errorImage = error;
                    isValid = false;
                }
            }else if(field.type === "date"){
                isValid = field.value !== "";
            } else {
                isValid = validator(field.value.trim());
            }
        } else if (field.tagName === 'SELECT') {
            isValid = field.value !== "" || field.value != 0;
        } else {
            isValid = field.value.trim() !== "";
        }

        field.classList.toggle('is-valid', isValid);
        field.classList.toggle('is-invalid', !isValid);

        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = !isValid ? FormFieldsErrorMessage.errorMessagesAdmissionsForm(field.name, errorImage, actualForm) : '';
        }

        toggleSubmitButton();
    }

    function toggleSubmitButton() {
        const allValid = [...form.querySelectorAll('input, select, textarea')].every(input => 
            input.classList.contains('is-valid')
        );
        submitButton.disabled = !allValid;
    }

    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', validateField);
        if (input.type === 'file') {
            input.addEventListener('change', validateField);
        }
    });

    toggleSubmitButton();
}
