import { ConstValues } from "../utils/constValues.js";
import { ConstValues } from "../utils/constValues.js";
import { loadRegisterBookForm } from "../components/library/loadLibraryView.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.3
 * @since 2025/03/20
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con la biblioteca.
 */
export class BibliotecaFetch {

    static async getLibrosEstudiante(estudianteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_estudiante?estudiante_id=${estudianteId}`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            //console.log(data)
            return data;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return []; 
        }
    }


}