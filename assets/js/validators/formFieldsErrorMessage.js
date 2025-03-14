export class FormFieldsErrorMessage{

    static errorMessagesAdmissionsForm(fieldName, errorImage = '') {
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