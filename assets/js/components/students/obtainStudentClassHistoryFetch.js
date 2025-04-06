import { ConstValues } from "../../utils/constValues.js";

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
            renderStudentHistory(data);
        })
        .catch(error => {
            console.error("Error obteniendo el historial académico:", error);
        });
}

function renderStudentHistory(data) {
    const tbody = document.getElementById('tabla-historial-body');
    tbody.innerHTML = "";

    data.forEach(item => {
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
document.addEventListener("DOMContentLoaded", () => {
    handleObtainStudentHistory();
});