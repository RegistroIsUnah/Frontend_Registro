export function downloadStudentList() {
    const tbody = document.getElementById('studentsTableBody');
    const rows = Array.from(tbody.rows);

    // Encabezado del archivo CSV
    let csvContent = "\uFEFF" + '"Cuenta";"Estudiante";"Calificación";"Estado";"Observación"\n';

    rows.forEach((row) => {
        const cuenta = row.cells[1].textContent.trim();
        const estudiante = row.cells[2].textContent.trim();

        const calificacionInput = row.querySelector('.grade-input');
        const estadoSelect = row.querySelector('.estado-select');
        const obsInput = row.querySelector('.obs-input');

        const calificacion = calificacionInput ? calificacionInput.value.trim() : '';
        const estado = estadoSelect ? estadoSelect.options[estadoSelect.selectedIndex].text.trim() : '';
        const observacion = obsInput ? obsInput.value.trim() : '';

        const cuentaText = `="${cuenta}"`; // Para que Excel no lo convierta a número

        csvContent += `${cuentaText};"${estudiante}";"${calificacion}";"${estado}";"${observacion}"\n`;
    });

    // Crear un Blob y la URL de descarga
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'listado_estudiantes.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
