import { ConstValues } from "../utils/constValues.js";
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


    static async getLibroCompletoEstudiante(libroId) {
        try {
            const response = await fetch(
                `${ConstValues.DOMAIN_NAME}/get/obtener_libro?libro_id=${libroId}`
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo libro (estudiante) ${libroId}:`, error);
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
            console.log(response);

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            //console.log(data);
            return data;

        } catch (error) {
            console.error("Error al obtener libros del departamento:", error);
            return [];
        }
    }


    static async getLibroCompleto(libroId) {
        try {
            const response = await fetch(
                `${ConstValues.DOMAIN_NAME}/get/obtener_libro_encargado?libro_id=${libroId}`
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo libro ${libroId}:`, error);
            return [];
        }
    }

    async getRegisterBookDataForm(departamentoId) {

        try {
            const [tagsData, classesData] = await Promise.all([
                fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags`).then(response => response.json()),
                fetch(`${ConstValues.DOMAIN_NAME}/get/clases_depto?dept_id=${departamentoId}`).then(response => response.json())
            ]);

            let tagsOptions = ['<option value="">-- Seleccione una categoría --</option>']
                .concat(tagsData.map(tag =>
                    `<option value="${tag.tag_id}">${tag.tag_nombre}</option>`
                )).join('');

            let classesOptions = ['<option value="">-- Seleccione una clase --</option>']
                .concat(classesData.map(clase =>
                    `<option value="${clase.clase_id}">${clase.nombre}</option>`
                )).join('');

            return [tagsOptions, classesOptions];

        } catch (error) {
            console.error("Error en las solicitudes:", error);
            return [[], []];
        }
    }

    static postRegisterBook(formData) {
        console.log("Datos a enviar:", formData);

        fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro`, {
            method: "POST",
            body: formData, // No necesitas headers para FormData
        })
            .then(response => {
                console.log("Respuesta del servidor:", response);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.mensaje == "Libro registrado correctamente") {
                    alert(data.mensaje);
                    // Redirigir o recargar la página
                    // window.location.href = "landingPage.php";
                } else {
                    alert("Error al enviar el formulario: " + (data.mensaje || "Error desconocido"));
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert(error.message);
            });
    }


}
