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

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/10
     * 
     * @param {*} deptId 
     * @returns 
     *     
     * Este método obtiene todo el contenido que se tiene que carga dinámicamente en el formulario de registro de libros
     */
    async getRegisterBookDataForm(deptId = 2) {
        
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


    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/10
     * 
     * @param {*} formData 
     * 
     * Este método envía los datos del formulario de registro de libros a una API vía HTTP
     */
    static postRegisterBook(formData){

        console.log(formData);

        fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro.php`, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            //console.log(response);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Libro registrado correctamente") {
                alert(data.message);
                
                //window.location.href = "landingPage.php";
            } else {
                alert("Error al enviar el formulario: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Error en la solicitud: " + error.message);
        });
    }
}


