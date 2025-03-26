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
    static putadmissionsData(numSolicitud){

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

 /**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 */

function getAdmissionsDataRequest() {
    const userData = JSON.parse(sessionStorage.getItem("user_data"));
    const revisor_id = userData?.id_revisor; // Obtener ID del revisor

    if (!revisor_id) {
        console.warn("No se encontró revisor_id en sessionStorage.");
        return;
    }

    const url = `${ConstValues.DOMAIN_NAME}/api/get/obtener_solicitud_aspirante?revisor_id=${revisor_id}`;
    console.log("URL de la solicitud:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                console.warn("No hay solicitudes pendientes.");
                return;
            }

            console.log("Datos del aspirante:", data);

            let baseUrl = ConstValues.DOMAIN_NAME;
            let nombreCompleto = `${data.nombre} ${data.apellido}`;
            let dni = data.documento;
            let fotoIdentidad = `${baseUrl}${data.fotodni}`;
            let fotoAspirante = `${baseUrl}${data.foto}`;
            let curriculum = `${baseUrl}${data.certificado_url}`;

            const nombreInput = document.getElementById("nombre");
            const identidadInput = document.getElementById("documento");

            if (nombreInput && identidadInput) {
                nombreInput.value = nombreCompleto;
                identidadInput.value = dni;
            } else {
                console.warn("No se encontraron los campos de nombre o identidad.");
            }

            let fotoIdentidadBox = document.querySelector(".photoSection .photoItem:nth-child(1) .photoBox");
            let fotoAspiranteBox = document.querySelector(".photoSection .photoItem:nth-child(2) .photoBox");
            let curriculumBox = document.querySelector(".photoSection .photoItem:nth-child(3) .photoBox");

            if (fotoIdentidadBox) {
                fotoIdentidadBox.style.backgroundImage = `url(${fotoIdentidad})`;
                fotoIdentidadBox.style.backgroundSize = "cover";
                fotoIdentidadBox.style.backgroundPosition = "center";
            }

            if (fotoAspiranteBox) {
                fotoAspiranteBox.style.backgroundImage = `url(${fotoAspirante})`;
                fotoAspiranteBox.style.backgroundSize = "cover";
                fotoAspiranteBox.style.backgroundPosition = "center";
            }

            if (curriculumBox) {
                curriculumBox.innerHTML = `<a href="${curriculum}" target="_blank">Ver Curriculum</a>`;
            }
        })
        .catch(error => {
            console.error("Error obteniendo los datos del aspirante:", error);
        });
} 

document.addEventListener("DOMContentLoaded", () => {
    getAdmissionsDataRequest();
    });