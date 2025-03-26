import { FormFieldsErrorMessage } from "./formFieldsErrorMessage.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.3
 * @since 2025/03/11
 * 
 * @param {*} formId 
 * @param {*} validationsForm 
 * @param {*} actualForm 
 * 
 * Esté método toma el formulario y valida sus campos. 
 * Cuando todos los campos están validados, habilita el botón de envío.
 * 
 * 2025/03/11
 * Se propone que este método funcione para todos los formularios del sistema, pero aún no está adaptado.
 * Si usted no encuentra la forma de adaptar este método para varios formularios, haga otro método que valide su formulario.
 * 
 * 2025/03/18
 * TODO // Este método actualmente está adaptado para el formulario de admisiones y registro de libros.
 * TODO // El creador de este método considera que ya está generalizado, pero aún puede haber excepciones.
 */
export function validateForm(formId, validationsForm, actualForm) {
    const form = document.querySelector(`#${formId}`);
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');

    function validateInitialFields() {
        if (formId === 'resend-admission-form') {
            const fields = form.elements;
            
            Array.from(fields).forEach(field => {
                if (field.disabled || (field.value && field.value.trim() !== '')) {
                    const fakeEvent = {
                        target: field,
                        preventDefault: () => {}
                    };
                    validateField(fakeEvent);
                }
            });
        }
    }

    async function validateField(event) {
        let field = event.target;
        if (field.disabled) {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = '';
            }
            toggleSubmitButton();
            return;
        }

        let validator = validationsForm[field.name];
        let errorField;

        let isValid = false;
        if (validator) {
            if (field.type == 'file' || field.accept == 'application/pdf') {
                try {
                    isValid = await validator(field.files);
                } catch (error) {
                    errorField = error;
                    isValid = false;
                }
            } else if (field.type === "date" || field.tagName === 'select') {
                isValid = field.value !== "";
            } else {
                isValid = await validator(field.value.trim());
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

    Array.from(form.elements).forEach(field => {
        if (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
            field.addEventListener('input', validateField);
            field.addEventListener('change', validateField);
            field.addEventListener('blur', validateField);
        }
    });

    validateInitialFields();

    function toggleSubmitButton() {
        const invalidFields = form.querySelectorAll('.is-invalid').length;
        submitButton.disabled = invalidFields > 0;
    }





    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.2
     * @since 2025/03/11
     * 
     * Esté metodo habilita el botón submit del formulario cuando todos los campos ya están validados y aceptados.
     */
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
