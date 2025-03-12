import { DataFormValidations } from "./dataFormValidations.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/11
 * 
 * @param {*} formId
 * 
 * Method created to validate form fields. 
 */
export async function validateForm(formId) {
    const form = document.querySelector(`#${formId}`);
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');

    async function validateField(event) {
        const field = event.target;
        const validator = DataFormValidations.validationsFormAdmissions[field.name];

        let isValid = false;
        if (validator) {
            if (field.type === 'file') {
                try {
                    isValid = await validator(field.files);
                } catch (error) {
                    var errorImage = error;
                    isValid = false;
                }
            } else {
                isValid = validator(field.value.trim());
            }
        } else if (field.tagName === 'SELECT') {
            isValid = field.value !== "";
        } else {
            isValid = field.value.trim() !== "";
        }

        field.classList.toggle('is-valid', isValid);
        field.classList.toggle('is-invalid', !isValid);

        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = !isValid ? DataFormValidations.errorMessageFormValidation(field.name, errorImage) : '';
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
