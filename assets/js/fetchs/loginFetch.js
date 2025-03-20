import { ConstValues } from "../utils/constValues.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/15
 * 
 */

export function handleLogin() {

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${ConstValues.DOMAIN_NAME}/post/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw error; });
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del backend:', data); // Verifica la respuesta
                //Guardar Nombre
                if (data.token) {
                    // Guardar el token en localStorage 
                    sessionStorage.setItem('token', data.token);
                    

                    sessionStorage.setItem("userId",data.user.id);
                    sessionStorage.setItem("roles",data.user.roles);

                    // Redirigir según el rol del usuario
                    const roles = data.user.roles;
                    console.log(roles);
                    if (roles.includes('estudiante')) {
                        
                        sessionStorage.setItem('nombre', data.user.details.estudiante.nombre);
                        sessionStorage.setItem('apellido', data.user.details.estudiante.apellido);
                        sessionStorage.setItem('estudiante_id', data.user.details.estudiante.estudiante_id);
                        
                        console.log(sessionStorage.getItem("roles"));

                        window.location.href = 'panel.php'; // Redirigir a la página de estudiantes
                    } else if (roles.includes('docente')) {

                        sessionStorage.setItem('nombre', data.user.details.docente.nombre);
                        sessionStorage.setItem('apellido', data.user.details.docente.apellido);
                        sessionStorage.setItem('docente_id', data.user.details.docente.docente_id);
                        window.location.href = 'panel.php'; // Redirigir a la página de estudiantes
                        window.location.href = 'docente.php'; // Redirigir a la página de docentes
                    } else if (roles.includes('coordinador')) {
                        window.location.href = 'coordinador.php'; // Redirigir a la página de coordinadores
                    } else {
                        // Si no tiene un rol específico, redirigir a una página por defecto
                        window.location.href = 'perfil.php'; //Solo por prueba ya que no tenemos vista de docente
                    }
                } else {
                    document.getElementById('loginMessage').textContent = data.error || 'Se produjo un error';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loginMessage').textContent = error.error || 'Error al conectar con el servidor';
            });
    });
}