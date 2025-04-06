/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/05
 * 
 * @returns 
 */
export let classEnrollmentStudentView = () => `

<header class="nav">
    <div class="nav-izq">
        <h1>Sistema de Registro</h1>
    </div>

    <div class="nav-der">
        <div class="chat-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/134/134914.png" alt="Chat" width="24">
        </div>

        <div class="usuario">
            <small>Estudiante</small>
            <br>
            <small>Usuario@unah.hn</small>
        </div>
    </div>
</header>

<main class="contenedor">
    <section class="contenedor2">
        <div class="contenido" id="contenido">
            <h2>Matrícula de Asignaturas</h2>

            <div class="matricula">
                <div>
                    <label>Departamento:</label>
                    <select id="departmentSelect">
                        <option value="" disabled selected> -- Espere a que Carguen los Departamentos -- </option>
                    </select>
                </div>
                
                <div>
                    <label>Asignaturas:</label>
                    <select id="classesSelect">
                        <option value="" disabled selected> -- Seleccione primero un Departamento -- </option>
                    </select>
                </div>
            </div>

            <!-- Tabla de secciones disponibles -->
            <div class="secciones-disponibles">
                <table>
                    <thead>
                        <tr>
                            <th>Opción</th>
                            <th>HI - HF</th>
                            <th>Días</th>
                            <th>Edificio</th>
                            <th>Aula</th>
                            <th>Catedrático</th>
                            <th>Cupos</th>
                        </tr>
                    </thead>

                    <tbody id="availableSections">
                        <tr>
                            <td colspan="7" class="mensaje-tabla my-5 text-center">
                                Seleccione una clase para ver sus secciones disponibles
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Botón para matricular la sección seleccionada -->
            <button id="btnMatricular" class="btn-matricular">Matricular Clase</button>

            <hr>
            
        </div>
    </section>
</main>
`;

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/05
 * 
 * @param {*} cancelBtn 
 * @param {*} classText 
 * @param {*} classList 
 * @returns 
 */
export let classesSection = (cancelBtn, classText, classList) => `
    <div class="clases-matriculadas">
        <div class="clases-matriculadas-header">
            <h4>${classText}</h4>
            <button id="${cancelBtn}" class="btn-cancelar" hidden>Cancelar ${classText}</button>
        </div>
        <ul id="${classList}">
            
        </ul>
    </div>
`;

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/05
 * 
 * @param {*} codigo 
 * @param {*} asignatura 
 * @param {*} seccion 
 * @param {*} hi 
 * @param {*} hf 
 * @param {*} dias 
 * @returns 
 */
export let classesList = (codigo="", asignatura, seccion, hi, hf, dias) => `
    <li>
        <span>${codigo} <strong>${asignatura}</strong>, Sección <strong>${seccion}</strong></span>
        <small style="color:white" class="btn btn-secondary mx-1">HI: ${(hi).split(':').slice(0, 2).join(':')}, HF: ${(hf).split(':').slice(0, 2).join(':') }</small>  
        <small style="color:white" class="btn btn-secondary">Días: ${dias}</small>
        <button style="margin-left: 10px;">Perfil del Docente</button>
    </li>
`;


