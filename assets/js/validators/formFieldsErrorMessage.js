/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/14
 * 
 * Esta clase contiene métodos que regresan los mensajes de error especializados para cada formulario del sistema.
 */
export class FormFieldsErrorMessage{

    static errorMessagesAdmissionsForm(fieldName, errorImage = '', actualForm) {

        switch (actualForm){

            case "admissionsForm":
                const messages = {
                    nombre: "Solo letras y espacios (máx. 4 nombres)",
                    apellidos: "Ingrese exactamente dos apellidos",
                    correo: "Correo electrónico inválido",
                    telefono: "Formato: +504 9999-9999",
                    identidad: "El DNI no es correcto",
                    certificado: errorImage,
                    dni_file: errorImage,
                    foto_perfil: errorImage
                };
            
            return messages[fieldName] || "Campo requerido";

            case "registerBookForm":

            break;

            default:

            break;
        }
    }
}