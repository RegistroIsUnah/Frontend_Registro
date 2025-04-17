import { ConstValues } from "../utils/constValues.js";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.4
 * @since 2025/04/17
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con las fotos del estudiante.
 */
export class EstudianteFetch {

    static postSubirFoto(formData) {
        return fetch(`${ConstValues.DOMAIN_NAME}/post/subir_fotos_estudiante.php`, {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Error al subir la foto');
                    });
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error.message);
                throw error;
            });
    }


}