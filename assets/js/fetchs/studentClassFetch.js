import { ConstValues } from "../utils/constValues.js";


/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */


export class StudentClassFetch {
    static getClasesEstudiante(estudianteId) {
        const url = `${ConstValues.DOMAIN_NAME}/get/clases_estudiante_act.php?estudianteId=${estudianteId}`;
        return fetch(url)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                return [];
            });
    }
}