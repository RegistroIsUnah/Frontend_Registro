import { ConstValues } from "../utils/constValues";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.2
 * @since 2025/03/19
 * 
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
        console.log(response);
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const rol = data.user.roles[0].toLowerCase().trim(); // Normalizar el rol

        // Almacenar el token, el rol y el ID del usuario en sessionStorage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('rol', rol);
        sessionStorage.setItem('usuario_id', data.user.details.estudiante.estudiante_id);

        // Redirigir al usuario según su rol
        if (rol === 'estudiante') {
            window.location.href = 'bibliotecaKency.php';
        } else if (rol === 'coordinador') {
            window.location.href = 'index.php';
        } else {
            document.getElementById('loginMessage').textContent = data.error || 'Se produjo un error';
            console.error('Rol no reconocido:', rol);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
}