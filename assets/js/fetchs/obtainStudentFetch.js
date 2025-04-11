
import { ConstValues } from "../utils/constValues.js";
import { handleObtainStudentHistory } from "../components/students/obtainStudentClassHistoryFetch.js";


/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */



export function searchStudent()
{
 document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const searchValue = document.getElementById('searchInput').value.trim();

        // Definir parámetros de búsqueda
        let params = new URLSearchParams();

        // Puedes usar expresiones regulares u otra lógica para detectar tipo de búsqueda
        if (!isNaN(searchValue)) {
            params.append('no_cuenta', searchValue);
        } else if (searchValue.toLowerCase().includes('departamento')) {
            params.append('departamento', searchValue);
        } else {
            params.append('nombre', searchValue);
        }

        // Cambia la ruta a la correcta según tu servidor
        fetch(`${ConstValues.DOMAIN_NAME}/get/buscar_estudiante.php?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error("Error en la solicitud");
                return response.json();
            })
            .then(data => {
                // Mostrar resultados (puedes personalizar esto)
                console.log("Respuesta del servidor:", data);
                mostrarResultados(data.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });

let estudiantesGlobal = [];

function mostrarResultados(estudiantes) {
    estudiantesGlobal = estudiantes;

    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = '';

    if (!Array.isArray(estudiantes)) {
        contenedor.innerHTML = '<p>Ocurrió un error con los datos recibidos.</p>';
        return;
    }

    if (estudiantes.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron estudiantes.</p>';
        return;
    }

    estudiantes.forEach(est => {
        const div = document.createElement('div');
        div.className = 'card mt-2 p-3 estudiante-card';
        div.style.cursor = 'pointer';
        div.innerHTML = `
            <strong>${est.nombre_completo}</strong><br>
            Cuenta: ${est.numero_cuenta}<br>
            Carrera: ${est.carrera}<br>
            Departamento: ${est.departamento}
        `;

        div.addEventListener('click', () => {
            sessionStorage.setItem('estudiante_id', est.estudiante_id);
            mostrarHistorialEstudiante(est);
        });

        contenedor.appendChild(div);
    });
}

function mostrarHistorialEstudiante(est) {
    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = '';

    // Botón de regreso
    const btnBack = document.createElement('button');
btnBack.className = 'btn btn-outline-primary d-flex align-items-center gap-2 mb-4';
btnBack.innerHTML = `
    <i class="bi bi-arrow-left-circle"></i>
    <span>Regresar a lista de estudiantes</span>
`;
btnBack.onclick = () => mostrarResultados(estudiantesGlobal);

    btnBack.onclick = () => mostrarResultados(estudiantesGlobal);
    contenedor.appendChild(btnBack);

    // Tabla de historial
    const perfilSeccion = document.createElement('div');
    perfilSeccion.className = 'perfil-seccion';
    perfilSeccion.innerHTML = `
        <br><br>
        <h3 style="color: #013775;">Asignaturas Cursadas</h3>
        <div class="historial-container">
            <table class="historial-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Asignatura</th>
                        <th>Sección</th>
                        <th>Año</th>
                        <th>Período</th>
                        <th>Calificación</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody id="tabla-historial-body">
                    <tr><td colspan="7" style="text-align: center;">Cargando historial...</td></tr>
                </tbody>
            </table>
        </div>
    `;
    contenedor.appendChild(perfilSeccion);

    // Fetch del historial
    fetch(`${ConstValues.DOMAIN_NAME}/get/listar_historial_estudiante.php?estudiante_id=${est.estudiante_id}`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-historial-body');
            tbody.innerHTML = '';

            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No se encontró historial.</td></tr>';
                return;
            }

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.codigo}</td>
                    <td>${item.asignatura}</td>
                    <td>${item.seccion}</td>
                    <td>${item.anio}</td>
                    <td>${item.numero_periodo_id}</td>
                    <td>${item.calificacion}</td>
                    <td>${item.observacion ?? '-'}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error("Error obteniendo historial académico:", err);
            const tbody = document.getElementById('tabla-historial-body');
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error al cargar historial.</td></tr>';
        });
}

    
    
    
}
   

