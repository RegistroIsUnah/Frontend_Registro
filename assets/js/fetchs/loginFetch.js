import { ConstValues } from "../utils/constValues.js";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.2
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

            //console.log(data);
            
            const roles = data.user.roles.map(role => role.toLowerCase().trim()); // Normalizar los roles

            sessionStorage.setItem('roles', JSON.stringify(roles)); // Almacenar todos los roles
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem("userId",data.user.id);

            if (roles.includes('estudiante')) {
                sessionStorage.setItem('nombre', data.user.details.estudiante.nombre);
                sessionStorage.setItem('apellido', data.user.details.estudiante.apellido);
                sessionStorage.setItem('estudiante_id', data.user.details.estudiante.estudiante_id);
                sessionStorage.setItem('rol_activo', 'estudiante'); 
                
                if(roles.includes('revisor'))
                {
                    sessionStorage.setItem('revisor_id', data.user.details.revisor_id);
                }

                const ruta = window.location.pathname.split('/').pop();
                if(ruta == "biblioteca.php"){

                    window.location.href = 'biblioteca.php'; 
                }else{
                    console.log(data);
                    window.location.href = 'panel.php'; 
                }

                //Caso jefe o coordinador
            }else if (roles.includes('jefe de departamento') || roles.includes('coordinador')) {                sessionStorage.setItem('rol_activo', 'jefe de departamento' ||'coordinador');
                const rolActivo = roles.includes('jefe de departamento') 
                    ? 'jefe de departamento' 
                    : 'coordinador';
                
                sessionStorage.setItem('docente_id', data.user.details.docente.docente_id);
                sessionStorage.setItem('rol_activo', rolActivo);

                const ruta = window.location.pathname.split('/').pop();
                if(ruta == "biblioteca.php"){

                    window.location.href = 'biblioteca.php'; 
                }else{
                    window.location.href = 'docente.php'; 
                }
                
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

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/03/19
 */
//LogOut; funcionamiento: <a id="btnLogout">Salir</a> puede ser un <button> tambien.

/*El DOMContentLoad permite cargar la pagina y detectar si hay un boton con el id btnLogout */
/*
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("btnLogout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  });
  */

export function logout()
{
    const url = `${ConstValues.DOMAIN_NAME}/post/logout.php`;
    fetch(url,
        {
            method:"POST"
        })
        .then(response =>{
            if (!response.ok)
            {
                throw new Error("No se pudo cerrar la sesion");
            }
            return response.json();
        })
        .then(data =>{
            console.log("LogOut exitoso:", data.message);
            sessionStorage.clear();
            window.location.href = "index.php";
        })
        .catch(error => {
            console.error("Error al cerrar sesión:", error);
            alert("Ocurrió un error al cerrar sesión.");
    });
}

document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "btnLogout") {
      logout();
    }
  });