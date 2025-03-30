import { ConstValues } from "../utils/constValues.js";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.4
 * @since 2025/03/20
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con la biblioteca.
 */
export class BibliotecaFetch {

    static getLibrosEstudiante(estudianteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_estudiante?estudiante_id=${estudianteId}&page=1&limit=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => data)
            .catch(error => {
                console.error("Error en la solicitud:", error);
                return [];
            });
    }

    static getLibroCompletoEstudiante(libroId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libro?libro_id=${libroId}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .catch(error => {
                console.error(`Error obteniendo libro (estudiante) ${libroId}:`, error);
                return [];
            });
    }

    static getDeptoJefe(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/departamentos`)
            .then(response => response.json())
            .then(data => {
                const depto = data.find(dept => dept.jefe_docente_id === docenteId);
                return depto.dept_id;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error.message);
                return [];
            });
    }

    static getDeptoCoordinador(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/carreras`)
            .then(response => response.json())
            .then(data => {
                const carrerasArray = Object.values(data);
                const depto = carrerasArray.find(dept => dept.coordinador_docente_id === docenteId);
                return depto ? depto.dept_id : null;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error.message);
                return [];
            });
    }

    static getLibrosDepto(departamentoId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_departamento?departamentoId=${departamentoId}`)
            .then(response => response.json())
            .catch(error => {
                console.error("Error en la solicitud:", error.message);
                return [];
            });
    }

    static getLibroCompleto(libroId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libro_encargado?libro_id=${libroId}`)
            .then(response => response.json())
            .catch(error => {
                console.error(`Error obteniendo libro ${libroId}:`, error.message);
                return [];
            });
    }

    getRegisterBookDataForm(departamentoId) {
        return Promise.all([
            fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags`).then(res => res.json()),
            fetch(`${ConstValues.DOMAIN_NAME}/get/clases_depto?dept_id=${departamentoId}`).then(res => res.json())
        ])
            .then(([tagsData, classesData]) => {
                let classesOptions = ['<option value="">-- Seleccione una clase --</option>']
                    .concat(classesData.map(clase =>
                        `<option value="${clase.clase_id}">${clase.nombre}</option>`
                    )).join('');
                return [tagsData, classesOptions];
            })
            .catch(error => {
                console.error("Error en las solicitudes:", error.message);
                return [[], []];
            });
    }


    static postRegisterBook(formData) {
        return fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
                return data;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error.message);
            });
    }

    static updateLibro(formData) {
        return fetch(`${ConstValues.DOMAIN_NAME}/put/modificar_libro`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
                return data;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    }

}
