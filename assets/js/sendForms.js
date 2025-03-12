import { RegularExpressions } from "./regularExpressions.js";

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
        let errors = [];
    
        //let inputs = form.querySelectorAll("input, select, textarea");
    
        let nombre = form.querySelector("[name='nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, '');
        let apellidos = form.querySelector("[name='apellidos']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, '');
        let carrera_principal = form.querySelector("[name='carrera_principal']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, '');
        let carrera_secundaria = form.querySelector("[name='carrera_secundaria']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, '');
        let identidad = form.querySelector("[name='identidad']").value.trim().replace(/\D/g, ''); 
        let telefono = form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''); 
        let correo = form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''); 
        let centro_regional = form.querySelector("[name='centro_regional']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, '');
        let certificado = form.querySelector("[name='certificado']").value.trim();
        let foto_perfil = form.querySelector("[name='foto_perfil']").value.trim();
        let foto_dni = form.querySelector("[name='dni']").value.trim().replace(/\D/g, ''); 
    
    }

}

