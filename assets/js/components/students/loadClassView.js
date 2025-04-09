// loadStudentPage.js

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */


import { studentClassView } from "./asignatures-view.js";
import { loadMenu } from "../../utils/menu.js";
import { renderClassDetail, renderClassDetailStudent } from "../docente/renderClases.js";
import{loadAllClasses} from "../docente/renderClases.js";
import {StudentClassFetch} from "../../fetchs/studentClassFetch.js"

export function loadStudentPage() {
    history.pushState({ view: "studentClassView" }, "", window.location.href);
    
    const body = document.getElementsByTagName("body")[0];
    const studentContainer = document.createElement('div');
    studentContainer.innerHTML = studentClassView;
    
    body.insertBefore(studentContainer, body.lastChild);
    
    // Cargar menú
    const menuContainer = studentContainer.querySelector('#menuContainer');
    if (menuContainer) {
        menuContainer.innerHTML = loadMenu();
    }
    if (typeof initMenuToggle === "function") {
        initMenuToggle();
    }
    
    // Obtener el ID del estudiante
    const estudianteId = sessionStorage.getItem('estudiante_id');
    loadClasesEstudiante(estudianteId);

    // Evento para ver detalles de una clase
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('view-class-btn')) {
            const claseId = e.target.dataset.classId;
            const clase = storedClases.find(c => c.clase_id == claseId);
            if (clase) {
                renderClassDetailStudent(clase);
                document.getElementById('classesView').style.display = 'none';
                document.getElementById('classDetailView').style.display = 'block';
            }
        }
    });
}

let storedClases = [];

async function loadClasesEstudiante(estudianteId) {
    try {
        const result = await StudentClassFetch.getClasesEstudiante(estudianteId);
        if (result?.success) {
            storedClases = result.data;
            loadAllClasses(result.data);
        } else {
            console.error("No se pudieron cargar las clases del estudiante");
        }
    } catch (error) {
        console.error("Error en loadClasesEstudiante:", error);
    }
}
