import { registerBook } from "./register-book.js";
//import { LibraryFetch } from "../../fetchs/libraryFetch.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"


import { BibliotecaFetch } from "../../fetchs/bibliotecaFetch.js";
import { filtrarLibros } from "./filtrarLibros.js";
import { openPDFModal, goToPage } from "./pdfViewer.js";
import { renderLibros } from "./renderBookView.js";
import { libraryView } from "./library-page.js";


/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.2
 * @since 2025/03/16
 * 
 * Función encargada de cargar el formulario de registro de libros a la página de biblioteca.

 */
export function loadRegisterBookForm() {

    history.pushState({ view: "registerBook" }, "", window.location.href);

    const rol = sessionStorage.getItem('rol_activo');
    const docenteId = sessionStorage.getItem('docente_id');

    const obtenerIdUnidad = async () => {
        try {
            if (rol === 'jefe de departamento') {
                return await BibliotecaFetch.getDeptoJefe(docenteId);
            } else if (rol === 'coordinador') {
                return await BibliotecaFetch.getDeptoCoordinador(docenteId);
            }
            return null;
        } catch (error) {
            console.error("Error obteniendo unidad académica:", error);
            return null;
        }
    };

    obtenerIdUnidad().then(departamentoId => {

        let bibliotecaFetch = new BibliotecaFetch();
        bibliotecaFetch.getRegisterBookDataForm(departamentoId).then(([tagsOptions, clasesOptions]) => {

            const formularioContainer = document.createElement('div');
            formularioContainer.className = "container my-5";
            formularioContainer.id = "divBookRegisterForm";
            formularioContainer.innerHTML = registerBook(tagsOptions, clasesOptions);

            let body = document.getElementsByTagName("body")[0];
            body.removeChild(body.firstChild);
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

    }).catch(error => {
        console.error("Error en el proceso de carga:", error);
        alert("Error inicializando el formulario");
    });

}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/21
 * 
 * Función encargada de cargar la vista de biblioteca.
 */

let originalData = []; //Para poder filtrar

export function loadLibraryPage() {

    history.pushState({ view: "libraryView" }, "", window.location.href);

    const rol = sessionStorage.getItem('rol_activo');

    const body = document.getElementsByTagName("body")[0];
    const bibliotecaContainer = document.createElement('div');
    bibliotecaContainer.innerHTML = libraryView;
    body.insertBefore(bibliotecaContainer, body.firstChild);

    // Cargar datos según rol
    if (rol === 'estudiante') {
        const estudianteId = sessionStorage.getItem('estudiante_id');
        loadLibrosEstudiante(estudianteId);
    } else if (rol === 'jefe de departamento' || rol === 'coordinador') {
        const docenteId = sessionStorage.getItem('docente_id');
        loadLibrosDepartamento(docenteId, rol);
    }

    // Filtrado dinámico
    document.getElementById("searchInput").addEventListener("input", function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const filtrarData = filtrarLibros(searchTerm, originalData);
        const rol = sessionStorage.getItem('rol_activo');
        const isDocente = rol === 'jefe de departamento' || rol === 'coordinador';
        renderLibros(filtrarData, isDocente);
    });


}

window.openPDFModal = openPDFModal;
window.goToPage = goToPage;


async function loadLibrosEstudiante(estudianteId) {
    try {
        // Obtener estructura básica con IDs
        const dataEstudiante = await BibliotecaFetch.getLibrosEstudiante(estudianteId);

        // Obtener detalles específicos para estudiante
        const librosDetallados = await Promise.all(
            dataEstudiante.flatMap(clase =>
                clase.libros.map(async (libro) => ({
                    ...libro,
                    detalles: await BibliotecaFetch.getLibroCompletoEstudiante(libro.libro_id)
                }))
            )
        );

        const clasesCompletas = dataEstudiante.map(clase => ({
            ...clase,
            libros: clase.libros.map(libro =>
                librosDetallados.find(l => l.libro_id === libro.libro_id)
            )
        }));

        originalData = clasesCompletas;
        renderLibros(clasesCompletas);
    } catch (error) {
        console.error("Error al cargar libros del estudiante:", error);
    }
}

async function loadLibrosDepartamento(docenteId, rol) {
    try {
        let departamentoId;

        if (rol === 'jefe de departamento') {
            departamentoId = await BibliotecaFetch.getDeptoJefe(docenteId);

        } else if (rol === 'coordinador') {
            departamentoId = await BibliotecaFetch.getDeptoCoordinador(docenteId);
        }

        // libros por clase
        const clasesConLibros = await BibliotecaFetch.getLibrosDepto(departamentoId);

        // Obtener detalles completos para cada libro
        const librosConDetalles = await Promise.all(
            clasesConLibros.flatMap(clase =>
                clase.libros.map(async (libro) => ({
                    ...libro,
                    detalles: await BibliotecaFetch.getLibroCompleto(libro.libro_id)
                }))
            )
        );

        const clasesCompletas = clasesConLibros.map(clase => ({
            ...clase,
            libros: clase.libros.map(libro =>
                librosConDetalles.find(l => l.libro_id === libro.libro_id)
            )
        }));

        originalData = clasesCompletas;
        renderLibros(clasesCompletas, true); // Renderizar con botones

        //Boton para agregar nuevo libro
        document.getElementById("registerButton").addEventListener("click", function () {

            const divLibraryPage = document.getElementById("registerButton");
            if (divLibraryPage) {
                history.go(1);
                loadRegisterBookForm();
            }
        });

        //Boton para editar libro
        document.getElementById("editButton").addEventListener("click", function () {

            const divLibraryPage = document.getElementById("editButton");
            if (divLibraryPage) {
                history.go(1);
                loadRegisterBookForm();
            }
        });

    } catch (error) {
        console.error("Error al cargar libros del departamento:", error);
    }
}


addEventListener("popstate", (event) => {
    const currentView = event.state?.view;
    const formularioContainer = document.getElementById("divBookRegisterForm");

    // Caso: Regresar desde el formulario a la vista principal
    if (currentView === "libraryView" && formularioContainer) {
        const confirmarSalida = confirm("¿Estás seguro de que quieres salir del formulario?");
        
        if (confirmarSalida) {
            document.body.removeChild(formularioContainer);
            loadLibraryPage();
        } else {
            // Mantener al usuario en el formulario
            history.pushState({ view: "registerBook" }, "", window.location.href);
        }
    }
    
});


