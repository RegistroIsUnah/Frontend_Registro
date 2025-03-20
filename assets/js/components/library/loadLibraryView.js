import { registerBook } from "./register-book.js";
import { LibraryFetch } from "../../fetchs/libraryFetch.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"


import { bibliotecaView } from './library-page.js';

import { BibliotecaFetch } from "../../fetchs/bibliotecaFetch.js";

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/16
 * 
 * Función encargada de cargar el formulario de registro de libros a la página de biblioteca.
 */
export function loadRegisterBookForm() {

    let libraryFetch = new LibraryFetch();
    libraryFetch.getRegisterBookDataForm().then(([tagsOptions, clasesOptions]) => {

        const formularioContainer = document.createElement('div');
        formularioContainer.className = "container my-5";
        formularioContainer.id = "divBookRegisterForm";
        formularioContainer.innerHTML = registerBook(tagsOptions, clasesOptions);

        let body = document.getElementsByTagName("body")[0];
        body.insertBefore(formularioContainer, body.firstChild);

        tagsBelowInput();

        const form = document.querySelector("form");
        if (form) {
            validateForm(form.id, DataFormValidations.validationsRegisterBooksForm, "registerBookForm");
        }
        document.getElementById("register-book-form").addEventListener("submit", SendForm.validateRegisterBookForm);

    }).catch(error => {
        console.error("Error al obtener datos del formulario:", error);
    });

}


export function loadLibraryView() {


    // Obtener el ID del estudiante (puedes obtenerlo de la sesión o de un parámetro)
    const estudianteId = sessionStorage.getItem('estudiante_id');// Reemplaza con el ID real del estudiante.

    // Crear y mostrar la vista de la biblioteca
    const body = document.getElementsByTagName("body")[0];
    const bibliotecaContainer = document.createElement('div');
    bibliotecaContainer.innerHTML = bibliotecaView;
    body.insertBefore(bibliotecaContainer, body.firstChild);

    // Obtener y mostrar los libros
    BibliotecaFetch.getLibrosEstudiante(estudianteId)
        .then(clases => {
            renderLibros(clases); // Renderiza los libros
        })
        .catch(error => {
            console.error("Error al cargar los libros:", error);
            alert("Hubo un error al cargar los libros. Por favor, intenta de nuevo.");
        });

    // Agregar funcionalidad de búsqueda
    document.getElementById("searchInput").addEventListener("input", function (event) {
        const searchTerm = event.target.value.toLowerCase();
        filtrarLibros(searchTerm);
    });
}


/**
 * Renderiza los libros en el contenedor.
 * @param {Array} books - Lista de libros.
 */
function renderLibros(clases) {
    const bookContainer = document.getElementById("bookContainer");
    let container = '';

    // Iterar sobre cada clase
    clases.forEach(clase => {
        // Agregar el nombre de la clase como un título
        container += `<h3 class="mt-4">${clase.clase_nombre}</h3>`;

        // Iterar sobre los libros de la clase
        container += `<div class="row">`;
        clase.libros.forEach(libro => {
            container += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <p class="card-text">${libro.editorial}</p>
                            <button class="btn btn-primary" onclick="openPdfModal('${libro.libro_url}')">Ver PDF</button>
                        </div>
                    </div>
                </div>
            `;
        });
        container += `</div>`;
    });

    bookContainer.innerHTML = container;
}


/**
 * Filtra los libros según el término de búsqueda.
 * @param {string} searchTerm - Término de búsqueda.
 */
function filtrarLibros(searchTerm) {
    const books = document.querySelectorAll("#bookContainer .card");
    books.forEach(book => {
        const title = book.querySelector(".card-title").textContent.toLowerCase();
        const editorial = book.querySelector(".card-text").textContent.toLowerCase();
        if (title.includes(searchTerm) || editorial.includes(searchTerm)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
}

window.openPdfModal = function (pdfUrl) {
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = pdfUrl;
    const pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'));
    pdfModal.show();
};

/**
 * Navega a una página específica del PDF.
 */
window.goToPage = function () {
    const pageNumber = document.getElementById("pageNumber").value;
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = `${pdfViewer.src}#page=${pageNumber}`;
};
