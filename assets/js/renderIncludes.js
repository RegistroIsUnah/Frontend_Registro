import { admissionsForm } from "./components/admissions/admissions-form.js";
import { SendForm } from "./sendForms.js";
import { validateForm } from './validators/formValidator.js';
import { AdmissionFetch } from "./fetchs/admissionFetch.js";

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
 * Puts link label in head labels to add css in the code.
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
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
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



















