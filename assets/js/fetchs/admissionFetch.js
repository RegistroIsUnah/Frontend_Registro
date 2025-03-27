import { ConstValues } from "../utils/constValues.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/14
 * 
 * Class that contains methods to consume API endpoints specifically for the Admissions module.
 */
export class AdmissionFetch{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.3
     * @since 2025/03/14
     * 
     * Esta función envía los datos del formulario de admisión para registrar a un aspirante.
     */
    static postadmissionsData(formData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/aspirante.php`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.3
     * @since 2025/03/14
     * 
     * Esta función envía los datos del formulario de admisión para registrar a un aspirante.
     */
    static putadmissionsData(formData){

        return fetch(`${ConstValues.DOMAIN_NAME}/put/actualizar_aspirante.php`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/23
     * 
     * Obtener número de solicitud por número de identificación.
     */
    static getApplicationNumberByIdentification(idetificationNumber){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/recuperar_datos_aspirante.php?documento=${idetificationNumber}`)
        .then(response => response.json())
        .catch(error => console.error("Error en la solicitud:", error.message));    
    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/23
     * 
     * Obtener datos de la solicitud de admisión por el número de solicitud.
     */
    static getAdmissionDataByApplicationNumber(applicacionNumber){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_aspirante_por_solicitud.php?numSolicitud=${applicacionNumber}`)
        .then(response => response.json())
        .catch(error => { console.error("Error en la solicitud:", error.message); });
    }

        /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.3
     * @since 2025/03/26
     * 
     * Esta función envía el número de solicitud del aspirante hacia su correo.
     */
    static sendEmail(numSolicitud){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/reenviar_correo.php`, {
            method: "POST",
            body: JSON.stringify({"numSolicitud" : numSolicitud})
        })
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

}

 
