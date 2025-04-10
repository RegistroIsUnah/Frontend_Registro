import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

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
     * @version 0.0.2
     * @since 2025/03/26
     * 
     * Esta función envía un correo con el número de solicitud al aspirante.
     */
    static sendEmail(email){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/reenviar_correo.php`, {
            method: "POST",
            body: JSON.stringify({"correo" : email})
        })
        .then(response => response.json())
        .then(data => data )
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    static sendApplicantsCalifications(formData){
        console.log(formData);

        return fetch(`${ConstValues.DOMAIN_NAME}/post/procesar_aspirantes.php`, {
            method: "POST",
            body: formData
        })
        .then(response => {
            if(!response.ok){
                    
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    static sendApprovedAplicantsCalifications(formData){

        console.log(formData);

        return fetch(`${ConstValues.DOMAIN_NAME}/post/procesar_aspirantes_aprobados.php`, {
            method: "POST",
            body: formData
        })
        .then(response => {
            if(!response.ok){
                    
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
        });
    }

    static downloadApprovedApplicantsCsv(){
        fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_aspirantes_admitidos.php`)
          .then(response => {
            if(!response.ok){
              let divModal = document.createElement("div");
              divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
              document.body.appendChild(divModal);
              let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
              successModalInstance.show(); 
              setTimeout(() => divModal.remove(), 3500);
              throw new Error("Error en el servidor al obtener la ruta del CSV.");
            }
            return response.json();
          })
          .then(data => {
            if(data.success && data.file){
              const fileUrl = `${ConstValues.CSV_ROUTE}${data.file}`; 
              return fetch(fileUrl)
                .then(response => {
                  if(!response.ok){
                    let divModal = document.createElement("div");
                    divModal.innerHTML = messageAlert("bg-danger", "No se pudo descargar el archivo CSV.");
                    document.body.appendChild(divModal);
                    let toastInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                    toastInstance.show();
                    setTimeout(() => divModal.remove(), 3500);
                    throw new Error("Error al obtener el archivo CSV.");
                  }
                  return response.blob();
                })
                .then(blob => {
                  const blobUrl = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = blobUrl;
                  a.download = data.file.split('/').pop() || "aspirantes_admitidos.csv";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(blobUrl);
                  return data; 
                });
            } else {
              throw new Error("La respuesta no contiene la ruta del CSV.");
            }
          })
          .catch(error => { 
            console.error("Error en la solicitud:", error.message);
          });
      }
      
}

 
