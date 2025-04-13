/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/05
 * 
 * @returns 
 */
export let classEnrollmentStudentView = () => `
   
<main class="contenedor" id="mainContent">
    <section class="main-contenedor" id="menuContainer"></section>
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
            <button id="${cancelBtn}" class="btn-cancelar cancelClass" hidden>Cancelar ${classText}</button>
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
export let classesList = (codigo="", asignatura, seccion, hi, hf, dias, attribute="", idSection) => `
    <li>
        <span>${codigo} <strong>${asignatura}</strong>, Sección <strong>${seccion}</strong></span>
        <small style="color:white" class="btn btn-secondary mx-1">HI: ${(hi).split(':').slice(0, 2).join(':')}, HF: ${(hf).split(':').slice(0, 2).join(':') }</small>  
        <small style="color:white" class="btn btn-secondary">Días: ${dias}</small>
        <button ${attribute} id="${idSection}" class="showProfessorInformationButton" style="margin-left: 10px;">Perfil del Docente</button>
    </li>
`;

/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/08
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} dept 
 * @returns 
 * 
 * Tarjeta para mostrar información general del docente.
 */
//<button type="button" id="closeUserCard" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
export let userInformationCard = (name, email, dept) => `

        <div class="modal fade perfil-container" id="userInformationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content perfil-seccion">
                <div class="modal-header">
                <h3 class="mb-0">Datos Generales del Docente</h3>
                </div>
                <div class="modal-body">
                    <div class="perfil-item">
                        <span class="perfil-label">Nombre:</span>
                        <span class="perfil-valor">${name}</span>
                    </div>
                    <div class="perfil-item">
                        <span class="perfil-label">Correo:</span>
                        <span class="perfil-valor">${email}</span>
                    </div>
                    <div class="perfil-item">
                        <span class="perfil-label">Departamento:</span>
                        <span class="perfil-valor">${dept}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
