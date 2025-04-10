import { ModalManager } from "../../modals/modalSuccess-Error.js";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/20
 * 
 * funion para administrar el registro de autores
 */

export function setupAuthorHandling() {
    const actualizarAutoresHidden = () => {
        const autores = Array.from(document.querySelectorAll(".autor-item")).map(item => {
            const nombre = item.querySelector(".autor-nombre").textContent.trim();
            const apellido = item.querySelector(".autor-apellido").textContent.trim();
            return { nombre, apellido };
        });
        document.getElementById("autoresHidden").value = JSON.stringify(autores);
    };

    document.getElementById("addAuthor").addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();

        if (!nombre || !apellido) {
           ModalManager.show("Completa nombre y apellido", false);
            return;
        }

        const lista = document.getElementById("listaAutores");
        const autorItem = document.createElement("div");
        autorItem.className = "autor-item badge bg-light text-dark p-2";
        autorItem.innerHTML = `
            <span class="autor-nombre">${nombre}</span>
            <span class="autor-apellido">${apellido}</span>
            <span class="remove-author ">&times;</span>
        `;

        /*autorItem.querySelector("button").addEventListener("click", () => {
            lista.removeChild(autorItem);
            actualizarAutoresHidden();
        });*/

        lista.appendChild(autorItem);
        actualizarAutoresHidden();

        // Limpiar campos
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        
    });

    // Eliminar autores
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-author')) {
            e.target.closest('.autor-item').remove();
            actualizarAutoresHidden();
        }
    });
}