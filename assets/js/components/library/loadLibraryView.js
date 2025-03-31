import { registerBook } from "./register-book.js";

import { SendForm } from "../../sendForms.js";
import { DataFormValidations } from "../../validators/formFieldsValidations.js";
import { validateForm } from "../../validators/formValidator.js";

import { tagsBelowInput } from "../../utils/tagsBelowInput.js"


import { BibliotecaFetch } from "../../fetchs/bibliotecaFetch.js";
import { openPDFModal, goToPage } from "./pdfViewer.js";
import { renderLibros } from "./renderBookView.js";
import { libraryView } from "./library-page.js";
import { setupAuthorHandling } from "./authorHandling.js";
import { setupSearchSuggestions } from "./searchSuggestions.js";

/**
 * @author @author kency.oseguera@unah.hn
 * @version 0.0.3
 * @since 2025/03/16
 * 
 * Función encargada de cargar el formulario de registro de libros a la página de biblioteca.
 */

// Agrega esto al inicio del archivo, después de los imports
window.handleEditBook = async (libroId) => {
    try {
        
        // Obtener los datos completos del libro
        const libro = await BibliotecaFetch.getLibroCompleto(libroId);
        
        // Cargar el formulario de registro en modo edición
        loadRegisterBookForm(libro);
        
    } catch (error) {
        console.error("Error al cargar libro para edición:", error);
        alert("No se pudo cargar el libro para editar");
    }
};

export function loadRegisterBookForm(libroData = null) {
    history.pushState({ view: "registerBook", libroId: libroData?.libro_id || null }, "", window.location.href);

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
        if (!departamentoId) {
            alert("No se pudo identificar el departamento");
            return;
        }

        let bibliotecaFetch = new BibliotecaFetch();
        bibliotecaFetch.getRegisterBookDataForm(departamentoId)
            .then(([tagsData, classesData]) => {
                const formularioContainer = document.createElement('div');
                formularioContainer.className = "container my-5";
                formularioContainer.id = "divBookRegisterForm";
                
                // Generar formulario (sin campo clase si es edición)
                formularioContainer.innerHTML = registerBook(
                    tagsData, 
                    libroData ? null : classesData, 
                    libroData
                );

                // Reemplazar contenido principal
                const body = document.getElementsByTagName("body")[0];
                body.replaceChild(formularioContainer, body.firstChild);

                // Configurar autores
                setupAuthorHandling();

                if (libroData) {
                    const form = document.getElementById("register-book-form");
                
                    // Precargar todos los campos
                    form.titulo.value = libroData.titulo || "";
                    form.editorial.value = libroData.editorial || "";
                    form.fecha_publicacion.value = libroData.fecha_publicacion || "";
                    form.descripcion.value = libroData.descripcion || "";
                    form.isbn_libro.value = libroData.isbn_libro || "";

                    const estadoLibroMap = {
                        1: "ACTIVO",
                        2: "INACTIVO"
                    };
                    
                    if (libroData.estado_libro_id) {
                        form.estado.value = estadoLibroMap[libroData.estado_libro_id] || "ACTIVO"; 
                    }
                    
                    // Manejo de tags
                    if (libroData.tags && Array.isArray(libroData.tags)) {
                        const tagIds = libroData.tags.map(t => typeof t === 'object' ? t.tag_id : t);
                        tagIds.forEach(tagId => {
                            const option = document.querySelector(`#tags option[value="${tagId}"]`);
                            if (option) option.selected = true;
                        });
                    }
    
                    if (libroData.autores && Array.isArray(libroData.autores)) {
                        const autoresContainer = document.getElementById('listaAutores');
                        const autoresHidden = document.getElementById('autoresHidden');
                        
                        // Limpiar contenedor primero
                        autoresContainer.innerHTML = '';
                        
                        // Agregar cada autor al contenedor visual
                        libroData.autores.forEach(autor => {
                            const autorItem = document.createElement('div');
                            autorItem.className = 'autor-item badge bg-light text-dark p-2 me-2 mb-2';
                            autorItem.innerHTML = `
                                ${autor.nombre} ${autor.apellido}
                                <button type="button" class="ms-2 btn-close btn-sm"></button>
                            `;
                            autoresContainer.appendChild(autorItem);
                        });
                        
                        // Guardar en campo oculto (sin autor_id)
                        const autoresSimplificados = libroData.autores.map(({ nombre, apellido }) => ({ nombre, apellido }));
                        autoresHidden.value = JSON.stringify(autoresSimplificados);
                    }
                    
                    // Cambiar el título del formulario
                    const tituloForm = document.querySelector(".container-form h2");
                    if (tituloForm) tituloForm.textContent = "Editar Libro";

    
                    const enableEditBtn = document.getElementById('enableEditBtn');
                    const submitEditBtn = document.getElementById('submitEditBtn');
                    
                
                    enableEditBtn.addEventListener('click', () => {
                        // Habilitar campos
                        form.querySelectorAll("input, select, textarea").forEach(field => {
                            field.disabled = false;
                            field.classList.add("is-valid");
                        });
                        
                        // Mostrar botón de confirmación
                        enableEditBtn.classList.add('d-none');
                        submitEditBtn.classList.remove('d-none');
                    });

                }
    
                const form = document.querySelector("form");
                if (form) {
                    validateForm(form.id, DataFormValidations.validationsRegisterBooksForm, "registerBookForm");
                }
    
                // Configurar envío
                    document.getElementById("register-book-form").addEventListener("submit", (e) => {
                        e.preventDefault();
                        SendForm.validateRegisterBookForm(e, libroData ? true : false);
                    });

            }).catch(error => {
                console.error("Error al obtener datos del formulario:", error);
                alert("Error al cargar el formulario");
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

    history.replaceState({ view: "libraryView" }, "", window.location.href);

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
        setupSearchSuggestions(clasesCompletas);
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
        renderLibros(clasesCompletas, true); // Renderizar 
        setupSearchSuggestions(clasesCompletas);

        //Boton para agregar nuevo libro
        document.getElementById("registerButton").addEventListener("click", function () {

            const divLibraryPage = document.getElementById("registerButton");
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


