import { ConstValues } from "../utils/constValues.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/19
 */

export function login() {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('loginMessage');

        const url = `${ConstValues.DOMAIN_NAME}/post/login.php`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión. Por favor, inténtelo otra vez.');
            }
            return response.json();
        })
        .then(data => {

            console.log(data);
            
            const roles = data.user.roles.map(role => role.toLowerCase().trim()); // Normalizar los roles

            sessionStorage.setItem('roles', JSON.stringify(roles)); // Almacenar todos los roles
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem("userId",data.user.id);

            // Priorizar el rol de "estudiante" si está presente
            if (roles.includes('estudiante')) {
                sessionStorage.setItem('nombre', data.user.details.estudiante.nombre);
                sessionStorage.setItem('apellido', data.user.details.estudiante.apellido);
                sessionStorage.setItem('estudiante_id', data.user.details.estudiante.estudiante_id);
                sessionStorage.setItem('rol_activo', 'estudiante'); 

                const ruta = window.location.pathname.split('/').pop();
                if(ruta == "biblioteca.php"){

                    window.location.href = 'biblioteca.php'; 
                }else{
                    console.log(data);
                    window.location.href = 'panel.php'; 
                }

            } else if (roles.includes('docente')) {

                sessionStorage.setItem('nombre', data.user.details.docente.nombre);
                sessionStorage.setItem('apellido', data.user.details.docente.apellido);
                sessionStorage.setItem('docente_id', data.user.details.docente.docente_id);
                window.location.href = 'panel.php'; // Redirigir a la página de estudiantes
                window.location.href = 'docente.php'; // Redirigir a la página de docentes

            } else if (roles.includes('jefe de departamento')) {
                sessionStorage.setItem('rol_activo', 'jefe de departamento');
                sessionStorage.setItem('docente_id', data.user.details.docente.docente_id);
                
            } else {
                console.error('Rol no reconocido:', roles);
            }
            //window.location.href = 'biblioteca.php'; 
        })
        .catch(error => {
            // Mostrar el mensaje al usuario
            loginMessage.textContent = error.message;
            console.error('Error:', error);
        });              
    });
}