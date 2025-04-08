

import { docenteView } from "./docente-page.js";
import { loadMenu } from "../../utils/menu.js";
import { DocenteFetch } from "../../fetchs/docenteFetch.js";
import { loadAllClasses, renderClassDetail } from "./renderClases.js";

export function loadDocentePage() {
    history.pushState({ view: "docenteView" }, "", window.location.href);

    const rol = sessionStorage.getItem('rol_activo');

    const body = document.getElementsByTagName("body")[0];
    const DocenteContainer = document.createElement('div');
    DocenteContainer.innerHTML = docenteView;
    
    body.insertBefore(DocenteContainer, body.firstChildChild);

    const menuContainer = DocenteContainer.querySelector('#menuContainer');
    if (menuContainer) {
        menuContainer.innerHTML = loadMenu();
    }

    if (rol === 'docente') {
        const docenteId = sessionStorage.getItem('docente_id');
        loadClasesDocente(docenteId);
    }
    

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

