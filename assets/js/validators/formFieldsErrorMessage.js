/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/14
 * 
 * Esta clase contiene objectos que regresan los mensajes de error especializados para cada campo de formularios del sistema.
 */
export class FormFieldsErrorMessage{

    static getErrorMessages(fieldName, errorFile = '', actualForm) {

        let messages;

        switch (actualForm){
            
            case "registerBookForm":

                messages = {
                    titulo: "Este título no es válido",
                    fecha_publicacion: "La fecha no es válida",
                    descripcion: "La descripción está vacía",
                    tags: "No ha seleccionados categorías para el libro",
                    clase_id: "Asigne el libro a una clase",
                    autores: "Campo vacío",
                    editorial: "Nombre inválido",
                    libro: errorFile
                };

            return messages[fieldName] || "Campo requerido";

            case "admissionsForm":
                messages = {
                    nombre: "Solo letras y espacios (máx. 4 nombres)",
                    apellidos: "Ingrese exactamente dos apellidos",
                    correo: "Correo electrónico inválido",
                    telefono: "Formato: +504 9999-9999",
                    identidad: "El DNI no es correcto",
                    certificado: errorFile,
                    dni_file: errorFile,
                    foto_perfil: errorFile
                };
            
            return messages[fieldName] || "Campo requerido";

    
            default:

            break;
        }
    }
}