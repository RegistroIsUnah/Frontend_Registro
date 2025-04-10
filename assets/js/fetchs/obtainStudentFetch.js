
import { ConstValues } from "../utils/constValues.js";
import { handleObtainStudentHistory } from "../components/students/obtainStudentClassHistoryFetch.js";

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

    
    function mostrarResultados(estudiantes) {
        const contenedor = document.getElementById('resultados');
        contenedor.innerHTML = '';
    
        if (!Array.isArray(estudiantes)) {
            contenedor.innerHTML = '<p>Ocurrió un error con los datos recibidos.</p>';
            console.error("Esperado un array, pero recibimos:", estudiantes);
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
    
                handleObtainStudentHistory();
            });
    
            contenedor.appendChild(div);
        });
    }
    
    
}
   

