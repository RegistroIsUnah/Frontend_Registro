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

/*
    async getRegisterBookDataForm(deptId = 5) {
        
        try {
            const [tagsData, classesData] = await Promise.all([
                fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags.php`).then(response => response.json()),
                fetch(`${ConstValues.DOMAIN_NAME}/get/clases.php?dept_id=${deptId}`).then(response => response.json())
            ]);

            let tagsOptions = ['<option value="">-- Seleccione una o varias categorías --</option>']
                .concat(centrosData.map(centro => 
                    `<option value="${tagsData.tag_id}">${centro.nombre}</option>`
                )).join('');

            let classesOptions = ['<option value="">-- Seleccione una clase --</option>']
                .concat(carrerasData.map(carrera => 
                    `<option value="${classesData.ca}">${carrera.nombre}</option>`
                )).join('');

            return [centerOptions, careerOptions];

        } catch (error) {
            console.error("Error en las solicitudes:", error);
            return [[], []]; 
        }
    }
        */


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

                let tagsOptions = ['<option value="">-- Seleccione las categorías del libro --</option>']
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


