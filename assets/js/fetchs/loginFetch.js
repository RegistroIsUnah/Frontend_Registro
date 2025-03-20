import { ConstValues } from "../utils/constValues.js";

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


    const url = `${ConstValues.DOMAIN_NAME}/post/login.php`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        // console.log(response);
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }
        return response.json();
    })
    .then(data => {

        const roles = data.user.roles;
      
        // roles.forEach(element => {
        //     console.log(element);
        // });

        // Almacenar el token, el rol y el ID del usuario en sessionStorage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('rol', JSON.stringify(roles));
        
        // Redirigir al usuario según su rol
        if (roles.includes("estudiante") || roles.includes("revisor")) {
            sessionStorage.setItem('usuario_id', data.user.details.estudiante.estudiante_id);

        } else if (roles.includes("coordinador") || roles.includes("jefe_departamento") || roles.includes("docente") ) {
            sessionStorage.setItem('usuario_id', data.user.details.docente.docente_id);

        } else {
            document.getElementById('loginMessage').textContent = data.error || 'Se produjo un error';
            console.error('Rol no reconocido:', rol);
        }
        window.location.href = 'biblioteca.php';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
}