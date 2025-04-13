
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/06
 */

import { ConstValues } from "../../utils/constValues.js";
import { bootstrapAlert } from "../../utils/alerts.js";


export function cancelExceptionalClass() {
  const estudianteId = sessionStorage.getItem("estudiante_id");
  const archivoPdf = document.getElementById("inputPdf_cancelClass").files[0]; 
  
  const formData = new FormData();
  formData.append("estudiante_id", estudianteId);
  formData.append("tipo_solicitud", "CANCELACION_EXCEPCIONAL");
  if (archivoPdf) {
    formData.append("archivo_pdf", archivoPdf);
  }

  const url = `${ConstValues.DOMAIN_NAME}/post/crear_solicitud_estudiante.php`; 
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      if(data.message.includes("Solicitud creada correctamente"))
            {
              bootstrapAlert("Solicitud de cancelacion de clases excepcional enviada con éxito","success",3000);
            }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
      bootstrapAlert("Error en la solicitud","danger",3000);
    });
}

export function repositionRequest() {
  const estudianteId = sessionStorage.getItem("estudiante_id");
  const archivoPdf = document.getElementById("inputPdf_reposition").files[0]; 
  
  const formData = new FormData();
  formData.append("estudiante_id", estudianteId);
  formData.append("tipo_solicitud", "PAGO_REPOSICION");
  if (archivoPdf) {
    formData.append("archivo_pdf", archivoPdf);
  }

  const url = `${ConstValues.DOMAIN_NAME}/post/crear_solicitud_estudiante.php`; 
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if(data.message.includes("Solicitud creada correctamente"))
            {
              bootstrapAlert("Solicitud de reposicion enviada con éxito","success",3000);
            }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
      bootstrapAlert("Error en la solicitud","danger",3000);
    });
}

window.cancelExceptionalClass=cancelExceptionalClass;
window.repositionRequest=repositionRequest;