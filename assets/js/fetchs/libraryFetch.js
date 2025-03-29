import { ConstValues } from "../utils/constValues.js";

export class LibraryFetch{

    static getStudentBooks(studentId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_estudiante?estudiante_id=${studentId}`)
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

    static getBookByStudent(bookId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libro?libro_id=${bookId}`)
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

    static getBookByLibrarian(bookId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libro_encargado?libro_id=${bookId}`)
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

    static getDepartmentBooks(departmentId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_departamento?departamentoId=${departmentId}`)
        .then(response => {
            if(!response.ok){
                throw new Error(`Èrror en la solicitud: ${response.status} ${response.statusText}`);
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


    async getRegisterBookDataForms(deptId = 2) {
        
        try {
            const [tagsData, classesData] = await Promise.all([
                fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags.php`).then(response => response.json()),
                fetch(`${ConstValues.DOMAIN_NAME}/get/clases_depto.php?dept_id=${deptId}`).then(response => response.json())
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

/*
    static getBooksTags() {

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && (Array.isArray(data) || typeof data === 'object')) {

                let tagsOptions = ['<option value="">-- Seleccione la categoría del libro --</option>']
                .concat(data.map(tag => 
                    `<option value="${tag.tag_id}">${tag.tag_nombre}</option>`
                )).join('');

                return tagsOptions;

            } else {
                throw new Error("La respuesta no contiene datos válidos");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message);
            throw error;
        });
    }*/


    static postRegisterBooks(formData) {
        console.log("Datos a enviar:", formData);
    
        fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro.php`, {
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
            alert("Error en la solicitud: " + error.message);
        });
    }
}


