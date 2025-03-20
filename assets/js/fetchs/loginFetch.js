import { ConstValues } from "../utils/constValues";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.3
 * @since 2025/03/19
 */

// Función para iniciar sesión
export function login() {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const url = `${ConstValues.DOMAIN_NAME}/post/login`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const roles = data.user.roles.map(role => role.toLowerCase().trim()); // Normalizar los roles

            sessionStorage.setItem('roles', JSON.stringify(roles)); // Almacenar todos los roles

            // Priorizar el rol de "estudiante" si está presente
            if (roles.includes('estudiante')) {
                sessionStorage.setItem('estudiante_id', data.user.details.estudiante.estudiante_id);
                sessionStorage.setItem('token', data.token);

                sessionStorage.setItem('rol_activo', 'estudiante'); // Almacenar el rol activo
                window.location.href = 'bibliotecaKency.php'; 
            } else if (roles.includes('jefe de departamento')) {
                sessionStorage.setItem('rol_activo', 'jefe de departamento');
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('docente_id', data.user.details.docente.docente_id);


                window.location.href = 'bibliotecaKency.php'; 
            } else {
                document.getElementById('loginMessage').textContent = data.error || 'Se produjo un error';
                console.error('Rol no reconocido:', roles);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}