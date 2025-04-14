import { docenteView } from "./docente-page.js";
import { DocenteFetch } from "../../fetchs/docenteFetch.js";
import { loadAllClasses, renderClassDetail } from "./renderClases.js";
import { ModalManager } from "../modals/modalSuccess-Error.js";
import { downloadStudentList } from "./downloadStudentList.js";
import {RegularExpressions} from "../../utils/regularExpressions.js"
import { verPerfilDocenteView } from "./perfilDocente-page.js";
import { renderMenu } from "../../utils/renderMenu.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Archivo para cargar vista y funcionalidades de vista docente
 */

export function loadDocentePage() {
    history.pushState({ view: "docenteView" }, "", window.location.href);

    const rol = sessionStorage.getItem('roles');
    renderInMainContent(docenteView);
    renderMenu(document.querySelector("#mainContent"));

    if (rol.includes("docente")) {
        const docenteId = sessionStorage.getItem('docente_id');
        loadClasesDocente(docenteId);
    }

    //AQUI COMIENZAN LAS FUNCIONES DE LOS BOTONES
    document.getElementById('uploadVideoBtn').addEventListener('click', () => {
        const modal = document.getElementById('videoModal');
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    });
    // Manejo del botón "Volver"
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'backButton') {
            document.getElementById('classDetailView').style.display = 'none';
            document.getElementById('classesView').style.display = 'block';
        }
    });

    // Botón de ver detalles
    document.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('view-class-btn')) {
            const claseId = e.target.dataset.classId;
            const clase = storedClases.find(c => c.clase_id == claseId);
            const seccionId = clase?.seccion?.seccion_id;

            if (seccionId) {
                await loadEstudiantesClase(clase, seccionId);
            }
        }
    });

    const submitVideoBtn = document.getElementById('submitVideoBtn');
    if (submitVideoBtn) {
        submitVideoBtn.addEventListener('click', handleVideoUpload);
    }


    const downloadButton = document.getElementById('downloadListBtn');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadStudentList);
    }

    document.getElementById('verPerfilComponent')?.addEventListener('click', (e) => {
        e.preventDefault();
        loadPerfilDocenteView();  
    });
    
    document.getElementById('asignaturasComponent')?.addEventListener('click', (e) => {
        e.preventDefault();
        loadDocentePage();
    });
    

}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Funcion para cargar Perfil del docente
 */

export async function loadPerfilDocenteView() {
    history.pushState({ view: "verPerfilDocente" }, "", window.location.href);
    const docenteId = sessionStorage.getItem('docente_id');

    try {
        const response = await DocenteFetch.getPerfilDocente(docenteId);
        if (response?.success) {
            const docente = response.data;
            renderInMainContent(verPerfilDocenteView(docente));
            renderMenu(document.querySelector("#mainContent"));

        } else {
            console.error("No se pudo cargar la información del docente.");
        }
    } catch (err) {
        console.error("Error al obtener datos del docente:", err);
    }
}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Función para cargar las clases del docente
 */
let storedClases = [];

async function loadClasesDocente(docenteId) {
    try {
        const result = await DocenteFetch.getClasesDocente(docenteId);
        if (result?.success) {
            storedClases = result.data;
            loadAllClasses(result.data);
        } else {
            console.error("No se pudieron cargar las clases del docente");
        }
    } catch (error) {
        console.error("Error en loadClasesDocente:", error);
    }
}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Función para cargar los estudiantes de la seccion
 */
async function loadEstudiantesClase(clase, seccionId) {
    try {
        const result = await DocenteFetch.getEstudiantesClase(seccionId);
        if (result?.success) {
            renderClassDetail(clase, result.data);
            document.getElementById('classesView').style.display = 'none';
            document.getElementById('classDetailView').style.display = 'block';
            //notasIndividuales();

        } else {
            console.error("No se pudieron cargar los estudiantes.");
        }
    } catch (error) {
        console.error("Error en loadEstudiantesClase:", error);
    }
}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Función para manejar el evento de subida de video
 */
async function handleVideoUpload() {
    const videoUrlInput = document.getElementById('videoUrl');
    const videoUrl = videoUrlInput.value.trim();

    if (!videoUrl) {
        alert('Por favor, ingresa la URL del video.');
        return;
    }

    const isYouTube = RegularExpressions.YOUTUBE_URL.test(videoUrl);
    if (!isYouTube) {
        ModalManager.show("Por favor ingresa un enlace válido de YouTube.", false);
        return;
    }

    const seccionId = storedClases[0]?.seccion?.seccion_id;

    try {
        const result = await DocenteFetch.subirVideoIntro(seccionId, videoUrl);

        if (result?.success) {
            ModalManager.show("Video ingresado Correctamente", true);
            const closeBtn = document.querySelector('[data-bs-dismiss="modal"]');
            if (closeBtn) {
                closeBtn.click();
            }
            const modalElement = document.getElementById('videoModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
            videoUrlInput.value = '';
        } else {
            ModalManager.show("Error al subir el video", false);
        }
    } catch (error) {
        console.error('Error al subir el video', error);
        ModalManager.show("Ocurrió un error al intentar subir el video.", false);

    }
}


/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Función para guardar las calificaciones de los estudiantes
 */

export function notasIndividuales() {
    const botonesGuardar = document.querySelectorAll('.guardar-btn');

    botonesGuardar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const row = boton.closest('tr');
            const calificacionInput = row.querySelector('.grade-input');
            const estadoSelect = row.querySelector('.estado-select');
            const obsInput = row.querySelector('.obs-input');

            const numeroCuenta = calificacionInput.dataset.cuenta;
            const calificacion = parseFloat(calificacionInput.value);
            let estadoCursoId = parseInt(estadoSelect.value);
            const observacion = obsInput.value;
            //const seccionId = storedClases[0]?.seccion?.seccion_id;
            const seccionId = boton.dataset.seccionId;

            if (isNaN(calificacion)) {
                ModalManager.show("La calificación ingresada no es válida.", false);
                return;
            }

            // Si la calificación es mayor o igual a 65, se marca como aprobado
            if (![1, 4, 5].includes(estadoCursoId)) {
                estadoCursoId = calificacion >= 65 ? 3 : 2; // Aprobado si calificación >= 65, sino reprobado
                estadoSelect.value = estadoCursoId;
            }

            const data = {
                numero_cuenta: numeroCuenta,
                seccion_id: seccionId,
                calificacion,
                observacion,
                estado_curso_id: estadoCursoId
            };

            try {
                const result = await DocenteFetch.calificarEstudiante(data);

                if (result?.success) {
                    ModalManager.show("Calificación registrada correctamente.", true);
                } else {
                    ModalManager.show("Ya existe una calificación registrada para este estudiante.", false);
                }
            } catch (error) {
                console.error("Error al registrar calificación:", error);
            }
        });
    });
}



/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/04/09
 * 
 * Crea un nuevo contenedor para no perder el header
 */

function renderInMainContent(htmlString) {
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
        mainContent.innerHTML = htmlString;
    } else {
        console.error("No se encontró el contenedor #mainContent en el DOM.");
    }
}

