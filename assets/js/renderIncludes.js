import { loadAdmissionsForm, loadAdmissionsPage } from './components/admissions/loadAdmissionsView.js'
import { loginForm } from "./components/login/login-form.js";
import { login } from "./fetchs/loginFetch.js";

import { loadRegisterBookForm } from './components/library/loadLibraryView.js';

import { loadLibraryPage } from './components/library/loadLibraryView.js';
/**
 * 
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
export function renderHead(actualPage) {

    switch (actualPage) {

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
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/calificaciones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "historial.php":
            document.getElementsByTagName('title')[0].textContent = "Historial Académico UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/historial.css"));
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
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/matricula.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "panel.php":
            document.getElementsByTagName('title')[0].textContent = "Panel de Estudiante";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/panel.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "perfil.php":
            document.getElementsByTagName('title')[0].textContent = "Perfil UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/perfil.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "solicitudes.php":
            document.getElementsByTagName('title')[0].textContent = "Solicitudes UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/solicitudes.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "biblioteca.php":
            document.getElementsByTagName('title')[0].textContent = "Biblioteca UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "bibliotecaKency.php":
            document.getElementsByTagName('title')[0].textContent = "Biblioteca UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/biblioteca.css"));
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

    const body = document.getElementsByTagName("body")[0];

    switch (namePage) {

        case "administradores.php":

            break;

        case "admisiones.php":

            let actualAdmissionView = (history.state == null) ? "admissionsPage" : history.state.view;

            switch (actualAdmissionView) {

                case "admissionsForm":

                    loadAdmissionsForm();
                    break;

                case "admissionReviewers":

                    console.log("Cargando vista de revisores...");
                    break;

                case "admissionsPage": case null: case "":

                    loadAdmissionsPage();
                    break;

                default:
                    console.warn("Vista no reconocida:", actualAdmissionView);
                    break;
            }

            break;

        case "calificaciones.php":

            break;

        case "historial.php":

            break;

        case "landingPage.php":

            break;

        case "login.php":

            let loginContainer = document.createElement('div');
            loginContainer.innerHTML = loginForm;
            body.appendChild(loginContainer);
            login();

            break;

        case "bibliotecaKency.php":
          

        loadLibraryPage();
            break;

        case "matricula.php":

            break;

        case "panel.php":

            break;

        case "perfil.php":

            break;

        case "solicitudes.php":

            break;

        case "biblioteca.php":

            loadRegisterBookForm();

            break;
    }

    if (namePage == "admisiones.php") {

    }
}
