import { ConstValues } from "../utils/constValues.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.1.1
 * @since 2025/03/14
 * 
 * Class that contains methods to consume API endpoints specifically for the Admissions module.
 */
export class AdmissionFetch{

    //admissionGet(){};
    //admissionPatch();

    async getAdmissionsDataForm() {
        
        try {
            const [centrosData, carrerasData] = await Promise.all([
                fetch(`${ConstValues.DOMAIN_NAME}/get/centros.php`).then(response => response.json()),
                fetch(`${ConstValues.DOMAIN_NAME}/get/carreras.php`).then(response => response.json())
            ]);

            let centerOptions = ['<option value="">-- Seleccione un centro --</option>']
                .concat(centrosData.map(centro => 
                    `<option value="${centro.centro_id}">${centro.nombre}</option>`
                )).join('');

            let careerOptions = ['<option value="">-- Seleccione una carrera --</option>']
                .concat(carrerasData.map(carrera => 
                    `<option value="${carrera.carrera_id}">${carrera.nombre}</option>`
                )).join('');

            return [centerOptions, careerOptions];

        } catch (error) {
            console.error("Error en las solicitudes:", error);
            return [[], []]; 
        }
    }

    postadmissionsData(formData){

        fetch(`${ConstValues.DOMAIN_NAME}/post/aspirante.php`, {
            method: "POST",
            body: formData
        })
        .then(response => {
            //console.log(response);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Aspirante ingresado exitosamente") {
                alert(data.message);
                //form.reset();
                window.location.href = "landingPage.php";
            } else {
                alert("Error al enviar el formulario: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
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
            let dni = data.identidad;
            let fotoIdentidad = `${baseUrl}${data.fotodni}`;
            let fotoAspirante = `${baseUrl}${data.foto}`;
            let curriculum = `${baseUrl}${data.certificado_url}`;

            const nombreInput = document.getElementById("nombre");
            const identidadInput = document.getElementById("identidad");

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
    console.log("admissionFetch.js está funcionando");
    getAdmissionsDataRequest();
    });