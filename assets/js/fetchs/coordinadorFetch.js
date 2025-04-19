import { ConstValues } from "../utils/constValues.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/04/19
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con el coordinador.
 */
export class CoordinadorFetch {

    static getClasesPorDepartamento(departamentoId, periodo, anio) {
        const url = `${ConstValues.DOMAIN_NAME}/get/clases_departamento.php?departamentoId=${departamentoId}&periodo=${periodo}&anio=${anio}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => data)
            .catch(error => {
                console.error("Error al obtener clases del departamento:", error);
                return [];
            });
    }
}