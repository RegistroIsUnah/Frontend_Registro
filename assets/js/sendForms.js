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
    
        let formData = new FormData();
    
        formData.append("nombre", form.querySelector("[name='nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("apellidos", form.querySelector("[name='apellidos']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("carrera_principal", form.querySelector("[name='carrera_principal']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("carrera_secundaria", form.querySelector("[name='carrera_secundaria']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("identidad", form.querySelector("[name='identidad']").value.trim().replace(/\D/g, ''));
        formData.append("telefono", form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''));
        formData.append("correo", form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''));
        formData.append("centro_regional", form.querySelector("[name='centro_regional']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        
        let certificado = form.querySelector("[name='certificado']").files[0];
        let foto_perfil = form.querySelector("[name='foto_perfil']").files[0];
        let foto_dni = form.querySelector("[name='dni_file']").files[0];
    
        if (certificado) formData.append("certificado", certificado);
        if (foto_perfil) formData.append("foto_perfil", foto_perfil);
        if (foto_dni) formData.append("dni_file", foto_dni);
    
        if (errors.length > 0) {
            console.log("Errores en el formulario:", errors);
            return;
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
        
        /*
        fetch("http://localhost/tu_proyecto/api/admission.php", {
            method: "POST",
            body: formData // No agregamos headers, FormData maneja eso automáticamente
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.success) {
                alert("Formulario enviado con éxito");
                form.reset();
            } else {
                alert("Error al enviar el formulario: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
        */
    };
        
}

