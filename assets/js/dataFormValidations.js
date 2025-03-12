import { RegularExpressions } from "./regularExpressions.js";
import { ValidateImage } from "./validateImage.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/02/12
 * 
 * Class used to validate every form of the system.
 */
export class DataFormValidations {

    static imageFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    static imageDimensions = 2 * 1024 * 1024;

    static validationsFormAdmissions = {
        nombre: value => RegularExpressions.F_NAME.test(value),
        apellidos: value => RegularExpressions.L_NAME.test(value),
        correo: value => RegularExpressions.EMAIL.test(value),
        telefono: value => RegularExpressions.PHONE_NUMBER.test(value),
        identidad: value => RegularExpressions.DNI.test(value),

        certificado: files => ValidateImage.validateImageFile(files[0], DataFormValidations.imageFormats, DataFormValidations.imageDimensions, 1024, 1024),
        dni_file: files => ValidateImage.validateImageFile(files[0], DataFormValidations.imageFormats, DataFormValidations.imageDimensions, 1024, 1024),
        foto_perfil: files => ValidateImage.validateImageFile(files[0], DataFormValidations.imageFormats, DataFormValidations.imageDimensions, 1024, 1024)
    };

    static errorMessageFormValidation(fieldName, errorImage = '') {
        const messages = {
            nombre: "Solo letras y espacios (máx. 4 nombres)",
            apellidos: "Ingrese exactamente dos apellidos",
            correo: "Correo electrónico inválido",
            telefono: "Formato: +504 9999-9999",
            identidad: "Debe tener 13 dígitos",
            certificado: errorImage,
            dni_file: errorImage,
            foto_perfil: errorImage
        };
        return messages[fieldName] || "Campo requerido";
    }

}