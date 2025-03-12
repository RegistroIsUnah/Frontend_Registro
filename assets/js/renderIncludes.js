import { admissionsForm } from "./components/admissions/admissions-form.js";

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
export function renderHead(){
    
    document.getElementsByTagName('title')[0].textContent = "Admisiones Universitarias";
    document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/admisiones.css"));
    document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/landingPage.css"));
    document.getElementsByTagName("head")[0].appendChild(linkLabel("./assets/css/validateForms.css"));
}

export function renderBodyPage(namePage) {
    if (namePage === "admisiones.php") {
        
        let body = document.getElementsByTagName("body")[0];
        const formularioContainer = document.createElement('div');
        formularioContainer.innerHTML = admissionsForm;
        body.insertBefore(formularioContainer, body.firstChild);
    }
}




















