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
        var errorField;

        let isValid = false;
        if (validator) {
            if (field.type === 'file' || field.accept === 'application/pdf') {
                try {
                    isValid = await validator(field.files);
                } catch (error) {
                    errorField = error;
                    isValid = false;
                }
            }else if(field.type === "date" || field.tagName === 'SELECT'){
            
                isValid = field.value !== "";
            }else {
                isValid = validator(field.value.trim());
            }
        } else {
            isValid = field.required ? field.value.trim() !== "" : true;
        }

        field.classList.toggle('is-valid', isValid);
        field.classList.toggle('is-invalid', !isValid);

        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = !isValid ? FormFieldsErrorMessage.getErrorMessages(field.name, errorField, actualForm) : '';
        }

        toggleSubmitButton();
    }

    function toggleSubmitButton() {
        const requiredFields = [...form.querySelectorAll('input:required, select:required, textarea:required')];
        
        const allValid = requiredFields.every(field => 
            field.classList.contains('is-valid')
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
