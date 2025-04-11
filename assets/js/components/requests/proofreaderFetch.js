
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/03/20
 */

import { ConstValues } from "../../utils/constValues.js";

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/03/18
 */
export function handleProofreaderRequest() {

    if(sessionStorage.getItem("roles").includes("revisor"))
        {
            
            document.getElementById("proofreaderOption").remove();
        } 
        else
        {
            const btnRequest = document.getElementById('proofreaderRequest');

            if (!btnRequest) {
                console.error("Error: El botón con id 'proofreaderRequest' no existe en el DOM.");
                return;
            }

            btnRequest.addEventListener('click', function () {
                console.log("Botón presionado, enviando solicitud...");

                const usuario_id = sessionStorage.getItem('userId');
                console.log(usuario_id);
                const roles = JSON.stringify([5]);

                const formData = new FormData();
                formData.append('usuario_id', usuario_id);
                formData.append('roles', roles);

                fetch(`${ConstValues.DOMAIN_NAME}/post/asignar_roles.php`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    console.log(`Estado HTTP: ${status}`);
                    console.log('Respuesta del backend:', body);
                })
                .catch(error => {
                    console.error('Error al asignar roles:', error);
                });

            });
        }

    
}

// Ejecutar la función solo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    handleProofreaderRequest();
});


