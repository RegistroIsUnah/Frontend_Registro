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

            let centerOptions = ['<option value="0">-- Seleccione un centro --</option>']
                .concat(centrosData.map(centro => 
                    `<option value="${centro.centro_id}">${centro.nombre}</option>`
                )).join('');

            let careerOptions = ['<option value="0">-- Seleccione una carrera --</option>']
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