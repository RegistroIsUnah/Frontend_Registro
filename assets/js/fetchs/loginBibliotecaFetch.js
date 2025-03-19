import { ConstValues } from "../utils/constValues.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.0
 * @since 2025/03/17
 * 
 */

export function handleLoginBiblioteca() {

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${ConstValues.DOMAIN_NAME}/api/post/login.php`, {
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
                //console.log('Respuesta del backend:', data); // Verifica la respuesta
                if (data.token) {
                    // Guardar el token en localStorage 
                    localStorage.setItem('token', data.token);

                    // Redirigir según el rol del usuario
                    const roles = data.user.roles;
                    if (roles.includes('Biblioteca_Estudiante')) {
                        window.location.href = 'bibliotecaKency.php';  
                    } else if (roles.includes('Biblioteca_Coordinador')) {
                        window.location.href = 'bibliotecaEncargado.php'; 
                    } else {
                        // Si no tiene un rol específico, redirigir a una página por defecto
                        window.location.href = 'index.php'; 
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