
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/06
 */


import { ConstValues } from "../../utils/constValues.js";
import { CenterFetch } from "../../fetchs/centerFetch.js"; 
import { bootstrapAlert } from "../../utils/alerts.js";

//GET DE CARRERAS POR CENTRO
window.getCareersByCenter = () => {
    const centerId = sessionStorage.getItem("centro_id");
    return CenterFetch.getCareersByCenter(centerId)
      .then(data => {
        const carreras = Array.isArray(data) ? data : Object.values(data);

        console.log("Carreras para centro", centerId, carreras);
      
        const selectCarreras = document.getElementById("select-carreras");
        if (!selectCarreras) return carreras;
      
        while (selectCarreras.options.length > 1) {
          selectCarreras.remove(1);
        }
      
        carreras.forEach(carrera => {
          const option = document.createElement("option");
          option.value = carrera.carrera_id;
          option.textContent = carrera.carrera_nombre;
          selectCarreras.appendChild(option);
        });
      
        return carreras;
      });
  };

  //GET DE CENTROS
window.getCenters = () => {
  return CenterFetch.getCenters()
    .then(centers => {
      console.log("Centros disponibles:", centers);
      
      const selectCentros = document.getElementById("select-centros");
      if (!selectCentros) return centers;
      
      while (selectCentros.options.length > 1) {
        selectCentros.remove(1);
      }

      centers.forEach(centro => {
        const option = document.createElement("option");
        option.value = centro.centro_id;
        option.textContent = centro.nombre;
        selectCentros.appendChild(option);
      });

      return centers;
    });
};


//POST DE CAMBIO DE CARRERA
export function handleChangeCareer() {
  // 1) Obtener IDs del estudiante, de la carrera actual, etc.
  const estudianteId = sessionStorage.getItem("estudiante_id");
  const carreraActualId = sessionStorage.getItem("carrera_id");

  
  const selectCarreras = document.getElementById("select-carreras");
  const carreraNuevaId = selectCarreras.value;

  const archivoPdf = document.getElementById("inputPdf_career").files[0]; 
  
  const formData = new FormData();
  formData.append("estudiante_id", estudianteId);
  formData.append("tipo_solicitud", "CAMBIO_CARRERA");
  formData.append("carrera_actual_id", carreraActualId);
  formData.append("carrera_nuevo_id", carreraNuevaId);
  
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
        bootstrapAlert("Solicitud de cambio de carrera enviada con éxito","success",3000);
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
      bootstrapAlert("Error en la solicitud","danger",3000);
    });
}

export function handleChangeCenter() {
  const estudianteId = sessionStorage.getItem("estudiante_id");
  const centroActualId = sessionStorage.getItem("centro_id");

  
  const selectCentros = document.getElementById("select-centros");
  const centroaNuevoId = selectCentros.value;

  const archivoPdf = document.getElementById("inputPdf_center").files[0]; 
  
  const formData = new FormData();
  formData.append("estudiante_id", estudianteId);
  formData.append("tipo_solicitud", "CAMBIO_CENTRO");
  formData.append("centro_actual_id", centroActualId);
  formData.append("centro_nuevo_id", centroaNuevoId);
  
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
          bootstrapAlert("Solicitud de cambio de carrera enviada con éxito","success",3000);
        }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
      bootstrapAlert("Error en la solicitud","danger",3000);
    });
}


window.handleChangeCareer=handleChangeCareer;
window.handleChangeCenter=handleChangeCenter;
