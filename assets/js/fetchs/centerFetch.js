import { ConstValues } from "../utils/constValues.js";

export class CenterFetch{

    static getBuldingClassrooms(buildingId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/aulas_edificio.php?edificio_id=${buildingId}`)
        .then(response => {
            if (!response.ok){
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("error en la solicitud");
        })

    }

    /**
     * Puede enviar opcionalmente un ID del centro.
     * Si no espepcifiícia el ID del centro obtendrá todas las carreras.
     */
    static getCareersByCenter(centerId = null) {

        let route = (!centerId) 
            ? `${ConstValues.DOMAIN_NAME}/get/carreras.php` 
            : `${ConstValues.DOMAIN_NAME}/get/carreras.php?centro_id=${centerId}`;
    
        fetch(route)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && (Array.isArray(data) || typeof data === 'object')) {
                console.log("Datos recibidos:", JSON.stringify(data));
            } else {
                console.error("La respuesta no contiene datos válidos:", data);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message);
        });
    }

    static getCenters() {
        fetch(`${ConstValues.DOMAIN_NAME}/get/centros.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && (Array.isArray(data) || typeof data === 'object')) {
                console.log("Datos recibidos:", JSON.stringify(data));
            } else {
                console.error("La respuesta no contiene datos válidos:", data);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message);
        });
    }

}