

import { docenteView } from "./docente-page.js";
import { loadMenu } from "../../utils/menu.js";
import { DocenteFetch } from "../../fetchs/docenteFetch.js";
import { loadAllClasses, renderClassDetail } from "./renderClases.js";
import { ModalManager } from "../modals/modalSuccess-Error.js";

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

    const seccionId = storedClases[0]?.seccion?.seccion_id;

    if (!seccionId) {
        alert('No se ha encontrado la sección de la clase.');
        return;
    }

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
        console.error('Error al subir el video');
        ModalManager.show("Ocurrió un error al intentar subir el video.", false);

    }
}

// Vincular el evento de clic al botón "Guardar"


