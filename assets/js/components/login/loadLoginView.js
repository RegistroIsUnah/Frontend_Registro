import { login } from "../../fetchs/loginFetch.js";
import { loginForm } from "./login-form.js"

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/19 
 */
export function loadLoginView(){

    let body = document.getElementsByTagName("body")[0];
    let loginContainer = document.createElement('div');
    loginContainer.innerHTML = loginForm;
    body.appendChild(loginContainer);

    // Agregar clase especial cuando estemos en biblioteca
    if (window.location.pathname.includes('biblioteca.php')) {
        body.classList.add('library-login-body');
    }

    login();
}