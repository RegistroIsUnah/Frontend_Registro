import { admissionsForm } from "./components/admissions/admissions-form.js";
import { SendForm } from "./sendForms.js";
import { validateForm } from './validators/formValidator.js';
import { AdmissionFetch } from "./fetchs/admissionFetch.js";

import { loginForm } from "./components/login/login-form.js";
import { handleLogin } from "./fetchs/loginFetch.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 * 
 * @param {*} href 
 * @returns 
 * 
 * Create link labels.
*/
let linkLabel = (href) => {
    
    let linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    return linkElement;
}

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 * 
 * Se añadira la referencia al estilo CSS que corresponde a cada página.
 * Debido a que el header se comparte, no se pueden agregar todos los estilos en el mismo encabezado (se evita el choque de estilos).
 */
export function renderHead(actualPage){

    switch (actualPage){
        
        case "administradores.php":
            document.getElementsByTagName('title')[0].textContent = "Administración UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/administradores.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));    
        break;

        case "admisiones.php":
            document.getElementsByTagName('title')[0].textContent = "Admisiones UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "calificaciones.php":
            document.getElementsByTagName('title')[0].textContent = "Calificaciones UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "historial.php":
            document.getElementsByTagName('title')[0].textContent = "Historial Académico UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "landingPage.php":
            document.getElementsByTagName('title')[0].textContent = "Página Principal UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "login.php":
            document.getElementsByTagName('title')[0].textContent = "login";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/loginStyle.css"));
        break;

        case "matricula.php":
            document.getElementsByTagName('title')[0].textContent = "Matrícula UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "panel.php":
            document.getElementsByTagName('title')[0].textContent = "Panel de Estudiante";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "perfil.php":
            document.getElementsByTagName('title')[0].textContent = "Perfil UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        case "solicitudes.php":
            document.getElementsByTagName('title')[0].textContent = "Solicitudes UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
        break;

        default:

        break;

    }
}

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 * 
 * @param {*} namePage 
 * 
 * Este método renderiza los componentes o vistas de la página a la que se ha accedido.
 * En las próximas actualizaciones se tiene que renderizar los componentes y vistas, dependiendo del rol de usuario que ingresará.
 * 
 * Una página puede compartir varias vistas (e.g admisiones.php renderiza la página principal del admisiones, 
 * formulario y vista de revisores.). Para hacer que el navegador recuerde que componentes tenía, se tiene que almacenar su estado
 * en la memoria del navegador antes de actualizar la página.
 */
export function renderBodyPage(namePage) {

    if (namePage === "admisiones.php") {
        let admissionsFetch = new AdmissionFetch();
        
        admissionsFetch.getAdmissionsDataForm().then(([centerOptions, careerOptions]) => {

            let body = document.getElementsByTagName("body")[0];
            const formularioContainer = document.createElement('div');
            formularioContainer.innerHTML = admissionsForm(centerOptions, careerOptions);
            body.insertBefore(formularioContainer, body.firstChild);

            document.getElementById("applicants-admission-form").addEventListener("submit", SendForm.validateAdmissionForm);
            const form = document.querySelector("form");
            if (form) {
                validateForm(form.id);
            }

        }).catch(error => {
            console.error("Error al obtener datos del formulario:", error);
        });
    }
}




//
export function renderLoginPage() {
    
    let body = document.getElementsByTagName("body")[0];

    const loginContainer = document.createElement('div');
    loginContainer.innerHTML = loginForm;

    // Insertar el formulario al principio del cuerpo
    body.insertBefore(loginContainer, body.firstChild);

    // Manejar el evento de envío del formulario
    handleLogin();
}















