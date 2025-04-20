import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.4
 * @since 2025/03/16
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con docente.
 */
export class DocenteFetch {

    static getClasesDocente(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/clases_docente_act.php?docenteId=${docenteId}`)
            .then(response => {
                //console.log(response);

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
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
                //console.log(response);

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                return data;
            })
        
            .catch(error => {
                console.error("Error en la solicitud:", error);
                return [];
            });
    }

    static subirVideoIntro(seccionId, videoUrl) {
        return fetch(`${ConstValues.DOMAIN_NAME}/post/asignar_video_seccion.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seccionId, videoUrl })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error al subir el video:", error);
        return { success: false };
        });
    }


    static calificarEstudiante(data) {
        //console.log(data);
        return fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_calificacion_estudiante.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error al subir calificaciones:", error);
            return { success: false };
        });
    }


    static getPerfilDocente(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_datos_docente.php?docente_id=${docenteId}`)
            .then(response => {
                //console.log(response);

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                return data;
            })
        
            .catch(error => {
                console.error("Error en la solicitud:", error);
                return [];
            });
    }
    

    static actualizarCalificacion(data) {
        //console.log(data);
        return fetch(`${ConstValues.DOMAIN_NAME}/post/actualizar_calificacion_estudiante.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error al subir calificaciones:", error);
            return { success: false };
        });
    }

    static sendEmailResetPassword(mail){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/request_password_reset.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error(error);
            return { success: false };
        });
    }

    static changeProffesorPassword(values){

        
        return fetch(`${ConstValues.DOMAIN_NAME}/post/confirm_password_reset.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {

            if(!response.ok){
                                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error(error);
            return { success: false };
        });

    }


}