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
                    sessionStorage.setItem('nombre', data.user.details.estudiante.nombre);

                    // Redirigir según el rol del usuario
                    const roles = data.user.roles;
                    if (roles.includes('estudiante')) {
                        sessionStorage.setItem("userId",data.user.id);

                        window.location.href = 'panel.php'; // Redirigir a la página de estudiantes
                    } else if (roles.includes('docente')) {
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