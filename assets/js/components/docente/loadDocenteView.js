import { docenteView } from "./docente-page.js";
import { loadMenu } from "../../utils/menu.js";
import { DocenteFetch } from "../../fetchs/docenteFetch.js";
import { loadAllClasses, renderClassDetail } from "./renderClases.js";
import { ModalManager } from "../modals/modalSuccess-Error.js";
import { downloadStudentList } from "./downloadStudentList.js";
import {RegularExpressions} from "../../utils/regularExpressions.js"

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

    const body = document.getElementsByTagName("body")[0];
    const DocenteContainer = document.createElement('div');
    DocenteContainer.innerHTML = docenteView;

    body.insertBefore(DocenteContainer, body.firstChildChild);

    if (rol.includes("docente")) {
        const docenteId = sessionStorage.getItem('docente_id');
        loadClasesDocente(docenteId);
    }

    //para el menu
    const menuContainer = DocenteContainer.querySelector('#menuContainer');
    if (menuContainer) {
        menuContainer.innerHTML = loadMenu();
    }
    if (typeof initMenuToggle === "function") {
        initMenuToggle();
    }

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

    document.getElementById('saveGradesBtn').addEventListener('click', async () => {
        const rows = document.querySelectorAll('#studentsTableBody tr');
        const seccionId = storedClases[0]?.seccion?.seccion_id;

        for (const row of rows) {
            const calificacionInput = row.querySelector('.grade-input');
            const estadoSelect = row.querySelector('.estado-select');
            const obsInput = row.querySelector('.obs-input');

            const numeroCuenta = calificacionInput.dataset.cuenta;
            const calificacion = parseFloat(calificacionInput.value);
            const estadoCursoId = parseInt(estadoSelect.value);
            const observacion = obsInput.value;

            // Verificación de datos antes de enviar
            if (!numeroCuenta || isNaN(calificacion) || !estadoCursoId) {
                ModalManager.show("Por favor complete los campos: calificacion, estado.", false)
                continue;
            }

            // Cambiar el estado automáticamente solo si el docente no ha seleccionado uno
            let estadoSugerido = estadoCursoId; 
            if (![1, 4, 5].includes(estadoCursoId)) { 
                if (calificacion >= 65) {
                    estadoSugerido = 3; // Aprobado
                } else {
                    estadoSugerido = 2; // Reprobado
                }
            }

            estadoSelect.value = estadoSugerido;

            const data = {
                numero_cuenta: numeroCuenta,
                seccion_id: seccionId,
                calificacion,
                observacion,
                estado_curso_id: estadoSugerido
            };

            try {
                const result = await DocenteFetch.calificarEstudiante(data);
                if (result.success) {
                    console.log(`Guardado exitoso para ${numeroCuenta}`);
                    ModalManager.show("Calificaciones Guardadas Correctamente")
                } else {
                    console.error(`Error al guardar ${numeroCuenta}:`, result);
                }
            } catch (err) {
                console.error(`Fallo para ${numeroCuenta}:`, err);
            }
        }
    });


    document.querySelectorAll('.grade-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const row = e.target.closest('tr');
            const calificacion = parseFloat(e.target.value);
            const estadoSelect = row.querySelector('.estado-select');

            if (!isNaN(calificacion)) {
                if (![1, 4, 5].includes(parseInt(estadoSelect.value))) {
                    let estadoSugerido = calificacion >= 65 ? 3 : 2; // Aprobado o Reprobado
                    estadoSelect.value = estadoSugerido;
                }
            }
        });
    });

}

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

async function loadEstudiantesClase(clase, seccionId) {
    try {
        const result = await DocenteFetch.getEstudiantesClase(seccionId);
        if (result?.success) {
            renderClassDetail(clase, result.data);
            document.getElementById('classesView').style.display = 'none';
            document.getElementById('classDetailView').style.display = 'block';
        } else {
            console.error("No se pudieron cargar los estudiantes.");
        }
    } catch (error) {
        console.error("Error en loadEstudiantesClase:", error);
    }
}

// Función para manejar el evento de subida de video
async function handleVideoUpload() {
    const videoUrlInput = document.getElementById('videoUrl');
    const videoUrl = videoUrlInput.value.trim();

    if (!videoUrl) {
        alert('Por favor, ingresa la URL del video.');
        return;
    }

    //Para validar rutas
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


//Funcion para cargar Perfil del docente
export async function loadPerfilDocenteView() {
    history.pushState({ view: "perfilDocenteView" }, "", window.location.href);

    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = ''; 
    const container = document.createElement('div');

    const menu = document.createElement('div');
    menu.id = 'menuContainer';
    menu.innerHTML = loadMenu();
    container.appendChild(menu);

    const docenteId = sessionStorage.getItem('docente_id');

    try {
        const result = await DocenteFetch.getPerfilDocente(docenteId);
        if (result?.success) {
            const perfilHTML = verPerfilDocenteView(result.data);
            container.innerHTML += perfilHTML;
        } else {
            container.innerHTML += `<div class="alert alert-danger mt-3">No se pudo cargar la información del docente.</div>`;
        }
    } catch (error) {
        console.error("Error al cargar perfil del docente:", error);
        container.innerHTML += `<div class="alert alert-danger mt-3">Error al obtener los datos del docente.</div>`;
    }

    body.appendChild(container);
}

