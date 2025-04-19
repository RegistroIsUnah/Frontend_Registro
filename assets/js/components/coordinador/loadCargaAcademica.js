import { CoordinadorFetch } from "../../fetchs/coordinadorFetch.js";
import { bootstrapAlert } from "../../utils/alerts.js";
import { createPaginationSystem } from '../../utils/pagination.js';

/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/04/19
 * 
 * Funcion para la carga academica
 */

export function initCargaAcademica() {
    const periodoSelect = document.getElementById('select-periodo');
    const anioInput = document.getElementById('input-anio');
    const btnCargar = document.getElementById('btn-cargar');
    const tablaBody = document.getElementById('tabla-carga');

    const pagination = createPaginationSystem({
        itemsPerPage: 10,
        containerId: 'pagination-carga',
        flattenFn: (data) => {
            return data.flatMap(clase => 
                clase.secciones.map(seccion => ({
                    seccion_id: seccion.seccion_id,
                    codigo: seccion.codigo,
                    nombre_clase: clase.nombre_clase,
                    numero_empleado: seccion.numero_empleado,
                    docente: seccion.docente,
                    estudiantes_matriculados: seccion.estudiantes_matriculados,
                    cupos_habilitados: seccion.cupos_habilitados,
                    edificio: seccion.edificio,
                    aula: seccion.aula
                }))
            );
        },
        groupFn: (_, items) => items, 
        renderFn: (items) => renderTabla(items)
    });

    function renderTabla(data) {
        tablaBody.innerHTML = '';
        if (data.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="9" class="text-center">No hay datos para mostrar.</td></tr>';
            return;
        }

        data.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.seccion_id}</td>
                <td>${item.codigo}</td>
                <td>${item.nombre_clase}</td>
                <td>${item.numero_empleado}</td>
                <td>${item.docente}</td>
                <td>${item.estudiantes_matriculados}</td>
                <td>${item.cupos_habilitados}</td>
                <td>${item.edificio}</td>
                <td>${item.aula}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    btnCargar.addEventListener('click', () => {
        const periodo = periodoSelect.value;
        const anio = anioInput.value;

        const departamentoId = sessionStorage.getItem('dept_id');
        if (!periodo || !anio) {
            bootstrapAlert("Por favor, selecciona un período y escribe un año válido.", "danger", 3000)
            return;
        }

        CoordinadorFetch.getClasesPorDepartamento(departamentoId, periodo, anio)
            .then(response => {
                if (response.success) {
                    pagination.setData(response.data);
                    pagination.renderPage();
                } else {
                    bootstrapAlert("No se pudo obtener la carga academica.", "danger", 3000)

                }
            });
    });

    // Descargar como CSV (Excel)
    document.getElementById('btn-descargar-excel').addEventListener('click', () => {
        const tabla = document.getElementById('tabla-carga');
        const rows = tabla.querySelectorAll('tr');
    
        const headers = [
            "Sección", "Código Asignatura", "Nombre Asignatura", "No. Empleado",
            "Docente", "Matriculados", "Cupos", "Edificio", "Aula"
        ];
    
        let csvContent = headers.join(";") + "\n";
    
        rows.forEach(row => {
            const cols = row.querySelectorAll('td');
            const rowData = [...cols].map(col => `"${col.textContent.trim()}"`);
            csvContent += rowData.join(";") + "\n";
        });
    
        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'carga_academica.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    
}


document.getElementById('btn-descargar-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tabla = document.getElementById('tabla-carga');
    const rows = tabla.querySelectorAll('tr');

    const headers = [
        "Sección", "Código Asignatura", "Nombre Asignatura", "No. Empleado",
        "Docente", "Matriculados", "Cupos", "Edificio", "Aula"
    ];

    const body = [];

    rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        const rowData = [...cols].map(col => col.textContent.trim());
        body.push(rowData);
    });

    doc.text("Carga Académica", 14, 15);
    doc.autoTable({
        startY: 20,
        head: [headers],
        body: body,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [0, 102, 204] },
    });

    doc.save("carga_academica.pdf");
});

