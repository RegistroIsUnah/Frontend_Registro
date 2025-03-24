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

    static async getDeptoJefe(docenteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/departamentos`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            
            const data = await response.json();

            const depto = data.find(dept => dept.jefe_docente_id === docenteId);
            //console.log(depto);
            return depto.dept_id;

        } catch (error) {
            console.error("Error al obtener departamentos:", error);
            
            return [];
        }
    }

    static async getDeptoCoordinador(docenteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_detalles_carrera`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            
            const data = await response.json();
            const depto = data.find(dept => dept.coordinador_docente_id === docenteId);

            return depto.dept_id;

        } catch (error) {
            console.error("Error al obtener carreras:", error);
            return [];
        }
    }

    static async getLibrosDepto(departamentoId) {
        try {

            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_departamento?departamentoId=${departamentoId}`);
            //console.log(response);

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
      
        } catch (error) {
            console.error("Error al obtener libros del departamento:", error);
            return [];
        }
    }


    static async getLibroCompleto(libroId) {
        try {
            const response = await fetch(
                `${ConstValues.DOMAIN_NAME}/get/obtener_libro?libro_id=${libroId}`
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo detalles del libro ${libroId}:`, error);
            return null;
        }
    }

}