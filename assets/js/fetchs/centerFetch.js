import { ConstValues } from "../utils/constValues.js";

/**
 *
 * @author estiven.mejia@unah.hn
 * @version 0.0.3
 * @since 2025/03/14
 * 
 * Los consumidores de endpoints solo devuelven la data para mantener la flexibilidad en caso de usarse en múltiples partes.
 */
export class CenterFetch{

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.3
     * @since 2025/03/14
     * 
     * @returns 
     * 
     * Devuelve el ID y el nombre de todos los centros que hay en el sistema.
     */
    static getCenters() {

        return fetch(`${ConstValues.DOMAIN_NAME}/get/centros.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        /* Devuelve un arreglo de objetos (un objeto por cada centro) */
        .then(data => { return data; })
        .catch(error => { console.error("Error en la solicitud:", error.message); });

    }

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.2
     * @since 2025/03/14
     * 
     * @param {*} centerId 
     * 
     * Puede enviar opcionalmente un ID del centro.
     * Si no espepcifiícia el ID del centro obtendrá todas las carreras.
     */
    static getCareersByCenter(centerId = null) {

        let route = (!centerId) 
            ? `${ConstValues.DOMAIN_NAME}/get/carreras.php` 
            : `${ConstValues.DOMAIN_NAME}/get/carreras.php?centro_id=${centerId}`;
    
        return fetch(route)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => { return data; })
        .catch(error => { console.error("Error en la solicitud:", error.message); });
    }


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

    static getBuildings(){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_edificios.php`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud"+ error);
        })
    }

    static getAulasByBuildingId(buildingId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/aulas_edificio.php?edificio_id=${buildingId}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud"+ error);
        })
        
    }

}