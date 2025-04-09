// historyPaginationModule.js

import { ConstValues } from "../../utils/constValues.js";
import { createPaginationSystem } from "../../utils/pagination.js" 


/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/08
 */

/**
 * Función para "aplanar" la data.
 * Como 'data' ya es un array plano, simplemente se retorna.
 * @param {Array} dataOriginal - El historial completo.
 * @returns {Array} - El mismo array de historial.
 */
function flattenStudentHistory(dataOriginal) {
    return dataOriginal;
}

/**
 * Función para "agrupar" la data.
 * En este ejemplo no se requiere ninguna agrupación especial,
 * por lo que se retorna 'itemsOnPage' sin modificaciones.
 * @param {Array} originalData - La data original completa.
 * @param {Array} itemsOnPage - Los items pertenecientes a la página actual.
 * @returns {Array} - Los items a renderizar.
 */
function groupStudentHistory(originalData, itemsOnPage) {
    return itemsOnPage;
}

/**
 * Función que se encarga de renderizar la tabla del historial del estudiante
 * utilizando los datos correspondientes únicamente a la página actual.
 * @param {Array} dataToRender - Los registros del historial a mostrar en la página actual.
 */
function renderStudentHistoryTable(dataToRender) {
    const tbody = document.getElementById('tabla-historial-body');
    if (!tbody) {
        console.error("No se encontró el elemento con id 'tabla-historial-body'.");
        return;
    }
    tbody.innerHTML = "";

    dataToRender.forEach(item => {
        const row = document.createElement('tr');
        const codigo = item.codigo || '-';
        const asignatura = item.asignatura || '-';
        const seccion = item.seccion || '-';
        const anio = item.anio || '-';
        const periodo = item.numero_periodo_id || '-';
        const calificacion = item.calificacion || '-';

        const calificacionValor = parseFloat(item.calificacion);
        let observacion = '-';
        if (!isNaN(calificacionValor)) {
            observacion = calificacionValor >= 6.5 ? 'Aprobó' : 'Reprobó';
        }

        row.innerHTML = `
            <td>${codigo}</td>
            <td>${asignatura}</td>
            <td>${seccion}</td>
            <td>${anio}</td>
            <td>${periodo}</td>
            <td>${calificacion}</td>
            <td data-observacion="${observacion}">${observacion}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Se crea la instancia del sistema de paginación para el historial del estudiante.
 * Se configura para que muestre 10 registros por página y se indique el contenedor
 * donde se mostrará los controles de paginación (botones "Anterior", "1", "2", "Siguiente", etc.).
 */
const studentHistoryPagination = createPaginationSystem({
    itemsPerPage: 10,
    containerId: "pagination-historial",
    flattenFn: flattenStudentHistory,
    groupFn: groupStudentHistory,
    renderFn: renderStudentHistoryTable,
});

/**
 * Función para obtener el historial académico del estudiante mediante fetch.
 * Una vez recibida la data, se integra al sistema de paginación para mostrarla.
 */
export function handleObtainStudentHistory() {
    const estudiante_id = sessionStorage.getItem('estudiante_id');
    const url = `${ConstValues.DOMAIN_NAME}/get/listar_historial_estudiante.php?estudiante_id=${estudiante_id}`;

    fetch(url, {
        method: "GET",
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.warn("El historial recibido no es válido.");
                return;
            }
            // Asignamos la data al paginador y renderizamos la primera página.
            studentHistoryPagination.setData(data, true);
            studentHistoryPagination.renderPage();
        })
        .catch(error => {
            console.error("Error obteniendo el historial académico:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    handleObtainStudentHistory();
});
