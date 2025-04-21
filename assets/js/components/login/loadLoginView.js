import { login } from "../../fetchs/loginFetch.js";
import { loginForm, resetPassword } from "./login-form.js"
import { DocenteFetch } from "../../fetchs/docenteFetch.js";
import { messageAlert } from "../modals/modals.js";

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

export function loadResetProffessorPasswordView(tokenUrl) {
    let body = document.getElementsByTagName("body")[0];
    let loginContainer = document.createElement('div');
    loginContainer.innerHTML = resetPassword;
    body.appendChild(loginContainer);

    const firstPassword = document.getElementById("first_password");
    const lastPassword = document.getElementById("last_password");
    const messageElement = document.getElementById("loginMessage");

    firstPassword.addEventListener("input", (event) => {
        document.getElementById("sendResetButton").disabled = true;

        if (!event.target.value) {
            messageElement.innerText = "Ingrese una contraseña válida.";
        } else {
            messageElement.innerText = "";
        }
    });

    lastPassword.addEventListener("input", (event) => {
        const firstValue = firstPassword.value;
        const secondValue = event.target.value;

        if (secondValue && firstValue !== secondValue) {
            messageElement.innerText = "Las contraseñas no coinciden.";
            document.getElementById("sendResetButton").disabled = true;
        }else if(secondValue == ""){

            document.getElementById("sendResetButton").disabled = true;
        }else {
            messageElement.innerText = "";
            document.getElementById("sendResetButton").disabled = false;
        }
    });

    document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("hola que tal");
        let response = await DocenteFetch.changeProffesorPassword({token: tokenUrl, password: document.getElementById("last_password").value});

        if(!response.error){

            let divModal = document.createElement("div");
            divModal.innerHTML = messageAlert("bg-danger", response.message);
            document.body.appendChild(divModal);
            let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
            successModalInstance.show(); 
            setTimeout(() => divModal.remove(), 2500);

            if(!document.getElementById("messageAlert")) window.location.href = "login.php"

        }else{

            let divModal = document.createElement("div");
            divModal.innerHTML = messageAlert("bg-danger", response.error);
            document.body.appendChild(divModal);
            let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
            successModalInstance.show(); 
            setTimeout(() => divModal.remove(), 2500);
        }
    });
}