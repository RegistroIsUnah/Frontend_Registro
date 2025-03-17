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

                let tagsOptions = ['<option value="0">-- Seleccione las categorías del libro --</option>']
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
    }

    static postBookRegister(){

        fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro.php`, {
            method: "POST",
            body: formData
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


