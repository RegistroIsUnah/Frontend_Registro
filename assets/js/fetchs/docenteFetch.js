import { ConstValues } from "../utils/constValues";

export class DocenteFetch {

    static getClasesDocente(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/clases_docente_act.php?docenteId=${docenteId}`)
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


    static getEstudiantesClase(seccionId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/lista_estudiantes_seccion.php?seccion_id=${seccionId}`)
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