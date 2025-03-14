import { RegularExpressions } from "./utils/regularExpressions.js";
import { AdmissionFetch } from "./fetchs/admissionFetch.js";

export class SendForm{
    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/10
     * 
     * @param {*} event 
     * 
     * Sending admission form data and waiting for a response.
     */
    static validateAdmissionForm = (event) => {
        
        event.preventDefault();
        let form = event.target;
        let admissionFetch = new AdmissionFetch();
        let formData = new FormData();

        formData.append("nombre", form.querySelector("[name='nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("apellido", form.querySelector("[name='apellidos']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("identidad", form.querySelector("[name='identidad']").value.trim().replace(/\D/g, ''));
        formData.append("telefono", form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''));
        formData.append("correo", form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''));
        formData.append("carrera_principal_id", form.querySelector("[name='carrera_principal']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("carrera_secundaria_id", form.querySelector("[name='carrera_secundaria']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("centro_id", form.querySelector("[name='centro_regional']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));

        let foto = form.querySelector("[name='foto_perfil']").files[0];
        let fotodni = form.querySelector("[name='dni_file']").files[0];
        let certificado = form.querySelector("[name='certificado']").files[0];

        if (foto) formData.append("foto", foto);
        if (fotodni) formData.append("fotodni", fotodni);
        if (certificado) formData.append("certificado", certificado);

        admissionFetch.postadmissionsData(formData);
    
        /*
        for (let data of formData.entries()) {
            console.log(`${data[0]}:`, data[1]);
        }
        */
        
    };
        
}

