import { ConstValues } from "../../utils/constValues.js";
import { fetchFile } from '../../utils/fileHandler.js';
import { renderFilePreview } from '../../utils/fileHandler.js';
import { aspirantHandler } from "./aspirantHandlerFetch.js";



/**
 * @author danielpalacios@unah.hn
 * @version 0.1.0
 */

//Logica para obtener los aspirante segun cada revisor_id

let aspiranteGlobalID = null;

export function getAdmissionsDataRequest() {
    
    const revisor_id = sessionStorage.getItem('revisor_id');

    if (!revisor_id) {
        console.warn("No se encontró revisor_id en sessionStorage.");
        return;
    }

    const url = `${ConstValues.DOMAIN_NAME}/get/obtener_solicitud_aspirante.php?revisor_id=${revisor_id}`;
    console.log("URL de la solicitud:", url);

    fetch(url)
        .then(response => {
           
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (!data || Object.keys(data).length === 0) {
                console.warn("No hay solicitudes pendientes.");
                return;
            }
            console.log("Datos del aspirante:", data);
            let nombreCompleto = `${data.nombre} ${data.apellido}`;
            let dni = data.documento;
            aspiranteGlobalID = data.aspirante_id;
            const nombreInput = document.getElementById("nombre");
            const documentoInput = document.getElementById("documento");
            

            let baseUploadsUrl = `${ConstValues.DOMAIN_NAME_UPLOAD}`;
            let fotoIdentidad = `${baseUploadsUrl}/fotodni/${data.fotodni}`;
            let fotoAspirante = `${baseUploadsUrl}/fotos/${data.foto}`;
            let curriculum = `${baseUploadsUrl}/certificados/${data.certificado_url}`;
            
            let fotoIdentidadBox = document.querySelector(".photoSection .photoItem:nth-child(1) .photoBox");
            let fotoAspiranteBox = document.querySelector(".photoSection .photoItem:nth-child(2) .photoBox");
            let curriculumBox = document.querySelector(".photoSection .photoItem:nth-child(3) .photoBox");

            if (nombreInput && documentoInput) {
                nombreInput.value = nombreCompleto;
                documentoInput.value = dni;
            } else {
                console.warn("No se encontraron los campos de nombre o documento.");
            }
            
            renderFilePreview(fotoIdentidadBox, fotoIdentidad);
            renderFilePreview(fotoAspiranteBox, fotoAspirante);
            renderFilePreview(curriculumBox, curriculum);
              
            console.log("🌀 Render completo, llamando a aspirantHandler con ID:", aspiranteGlobalID);
                setTimeout(() => {
                aspirantHandler(aspiranteGlobalID);
                }, 0)
        })
        .catch(error => {
            console.error("Error obteniendo los datos del aspirante:", error);
        });
} 
