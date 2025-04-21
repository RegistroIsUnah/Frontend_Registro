import { loadAdmissionsForm, loadAdmissionsPage, loadAdmissionApplicationView, loadResendAdmissionsForm } from './components/admissions/loadAdmissionsView.js'
import { loadLoginView, loadResetProffessorPasswordView } from './components/login/loadLoginView.js';
import { loadLibraryPage, loadRegisterBookForm } from './components/library/loadLibraryView.js';
import { RenderEnrollmentView } from './components/classEnrollment/renderEnrollmentViews.js';
import { AdminAdmissionsView } from './components/admissions/loadAdminAdmissionsView.js';
import { RenderClassesViews } from './components/classes/renderClassesViews.js';
import { RenderRequestView } from './components/requests/renderRequestView.js';
import { loadDocentePage, loadPerfilDocenteView } from './components/docente/loadDocenteView.js';
import {loadStudentPage} from './components/students/loadClassView.js'
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
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/footer.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
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

        case "index.php":
            document.getElementsByTagName('title')[0].textContent = "Página Principal UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            break;

        case "login.php": case "reset_password.php":
            document.getElementsByTagName('title')[0].textContent = "login";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/loginStyle.css"));
            break;

        case "matricula.php":
            document.getElementsByTagName('title')[0].textContent = "Matrícula UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/matricula.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/perfil.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
            
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
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/biblioteca.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/loginStyle.css"));


            break;
        
        case "solicitudesCoordinador.php":
            document.getElementsByTagName('title')[0].textContent = "Solicitudes Coordinador";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/solicitudes.css"));
            break;

        case "clases.php":
            document.getElementsByTagName('title')[0].textContent = "Carga Académica UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/matricula.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
        break;
        case "docente.php": case "docentesDepartamento.php":
            document.getElementsByTagName('title')[0].textContent = "Docentes UNAH";
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/loginStyle.css"));
            document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/docente.css"));

        break;

        case "estudiante.php":
                document.getElementsByTagName('title')[0].textContent = "Estudiantes UNAH";
                document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
                document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/plantilla.css"));
                document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/loginStyle.css"));
                document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/docente.css"));

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
    const rol = sessionStorage.getItem("rol_activo");


    switch (namePage) {

        case "admisiones.php":

            if(sessionStorage.getItem("roles") && sessionStorage.getItem("roles").includes("administrador")){
                
                AdminAdmissionsView.loadAdminAdmissionsView();
            
            }else{

                let actualAdmissionView = (history.state == null) ? "admissionsPage" : history.state.view;

                switch (actualAdmissionView) {

                    case "admissionsForm":
                        loadAdmissionsForm();
                    break;

                    case "admissionApplicationView":
                        loadAdmissionApplicationView();
                    break;

                    case "resendAdmissionsForm":
                        loadResendAdmissionsForm();
                    break;
                    
                    case "admissionsPage": case null: case "":
                        loadAdmissionsPage();
                    break;

                    default:
                        console.warn("Vista no reconocida:", actualAdmissionView);
                    break;
                }
            }

            break;

        case "login.php":
            loadLoginView();
            let roles = sessionStorage.getItem("roles");
            if (roles.includes("estudiante"))
            {
                forgotPass = document.getElementById("forgotPassword");
                forgotPass.hidden = false;
            }
        break;

        case "matricula.php":

            if(!sessionStorage.getItem("roles")){

                sessionStorage.setItem("returnPage", "matricula.php");
                window.location.href = 'login.php';
                
            }else{
            
                let roles = sessionStorage.getItem("roles");
                switch(true){

                    case(roles.includes("estudiante")):
                        RenderEnrollmentView.validateStudentEnrollDay();
                    break;

                    case(roles.includes("administrador")):
                        RenderEnrollmentView.renderEnrollmentAdministratorView();
                    break

                    default:
                        window.location.href = 'index.php';
                    break;
                }
            }
        break;

        case "biblioteca.php":

            let actualLibraryView = (history.state == null) ? "libraryView" : history.state.view;

            if (!rol) {                
                loadLoginView();
                history.replaceState(null, "biblioteca.php");
                break;
            }

            switch (actualLibraryView) {

                case "registerBook":

                    loadRegisterBookForm();
                    break;

                case "libraryView": case null: case "":

                    loadLibraryPage();
                    break;

                default:
                    loadLibraryPage(); // Vista por defecto
                    history.replaceState({ view: "libraryView" }, "", "biblioteca.php");
                    break;
            }

        break;

        case "clases.php":
            if(!sessionStorage.getItem("roles")){

                sessionStorage.setItem("returnPage", "clases.php");
                window.location.href = 'login.php';
                
            }else{

                let roles = sessionStorage.getItem("roles");
                switch(true){

                    case(roles.includes("jefe de departamento")):
                        RenderClassesViews.renderClassesDepartmentHeadView();
                    break;

                    case(roles.includes("coordinador")):
                        RenderClassesViews.renderClassesCoordinatorView();
                    break;

                    default:
                        window.location.href = 'index.php';
                    break;
                }
            }

        
            break;
        
                    case "solicitudesCoordinador.php":
            if (!sessionStorage.getItem("roles")) {
                window.location.href = 'login.php';
                break;
            }

            const solicitudMap = {
                cambioCarrera: RenderRequestView.loadAndRenderChangeCareer,
                cambioCentro: RenderRequestView.loadAndRenderChangeCenter,
                cancelaciones: RenderRequestView.loadAndRenderCancelClass
            };

            const tipo = new URLSearchParams(window.location.search).get("tipo");

            if (tipo) {
                const renderFunction = solicitudMap[tipo];
                if (renderFunction) {
                    renderFunction();
                } else {
                    window.location.href = 'index.php';
                }
            } else {
            }
            break;

            case "docentesDepartamento.php":
                if(!sessionStorage.getItem("roles")){

                    sessionStorage.setItem("returnPage", "docentesDepartamento.php");
                    window.location.href = 'login.php';
                    
                }else{
    
                    let roles = sessionStorage.getItem("roles");
                    switch(true){
    
                        case(roles.includes("jefe de departamento")):

                            const urlParams = new URLSearchParams(window.location.search);
                            const tipo = urlParams.get('tipo'); 
                            
                            if(tipo == "docente"){

                                RenderClassesViews.renderDepartmentProffessorsView();
                            }else if(tipo == "estudiante"){
                                RenderClassesViews.renderDepartmentStudentsView();
                            }
                        break;

                        default:
                            window.location.href = 'index.php';
                        break;
                    }
                }

            break;
    
    
            case "docente.php":

                let actualDocenteView = (history.state == null) ? "docenteView" : history.state.view;
                if (!rol) {                
                    
                    window.location.href = 'login.php';
                    history.replaceState(null, "docente.php");
                    break;
                }

                switch (actualDocenteView) {

                    case "docenteView":

                        loadDocentePage();
                        break;

                    case "verPerfilDocenteView": case null: case "":

                        loadPerfilDocenteView();
                        break;

                    default:
                        loadDocentePage();
                        history.replaceState({ view: "docenteView" }, "", "docente.php");
                    break;
                }
            break;

            case "estudiante.php":

            let actualEstudianteView = (history.state == null) ? "estudianteView" : history.state.view;
            
            if (!rol) {                
                
                loadLoginView();
                history.replaceState(null, "estudiante.php");
                break;
            }

            switch (actualEstudianteView) {

                case "estudianteView":

                    loadStudentPage();
                    break;

                default:
                    console.warn("Vista no reconocida:", actualEstudianteView);
                    loadStudentPage(); 
                    history.replaceState({ view: "estudianteView" }, "", "estudiante.php");
                    break;
            }
            break;

            case "reset_password.php":
                let urlParams = new URLSearchParams(window.location.search);
                
                loadResetProffessorPasswordView(urlParams.get('token'));
            break;
    }
}
