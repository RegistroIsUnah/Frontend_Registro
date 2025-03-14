import { RegularExpressions } from "../utils/regularExpressions.js";
import { ValidateImage } from "./imagesValidator.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/02/12
 * 
 * Esta clase contiene objetos que se encargan de validar cada uno de los campos en los formularios del sistema.
 * Haga un objeto por cada formulario.
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
}