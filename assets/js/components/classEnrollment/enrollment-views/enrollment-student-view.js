export let classEnrollmentStudentView = () => `

<header class="nav">
    <div class="nav-izq d-flex align-items-center">
        <button class="menu-toggle btn me-2 d-lg-none" style="background: none; border: none; color: white; font-size: 1.5rem;">
            ☰
        </button>
        <h1 class="m-0" style="font-size: 1.5rem; color: #ffb300" >Sistema de Registro</h1>
    </div>

    <div class="nav-der d-none d-lg-flex align-items-center ms-auto gap-3">
        <div class="usuario">
            <small class="d-block">Estudiante</small>
            <small class="email d-block"></small>
        </div>
        <button class="btn btn-danger btn-sm" id="btnLogout">
            Cerrar Sesión
        </button>
    </div>
</header>

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

export let classesList = (codigo="", asignatura, seccion, hi, hf, dias) => `
    <li>
        <span>${codigo} <strong>${asignatura}</strong>, Sección <strong>${seccion}</strong></span>
        <small style="color:white" class="btn btn-secondary mx-1">HI: ${(hi).split(':').slice(0, 2).join(':')}, HF: ${(hf).split(':').slice(0, 2).join(':') }</small>  
        <small style="color:white" class="btn btn-secondary">Días: ${dias}</small>
        <button style="margin-left: 10px;">Perfil del Docente</button>
    </li>
`;


/*
            <!-- Lista de clases matriculadas -->
            <div class="clases-matriculadas">
                <div class="clases-matriculadas-header">
                    <h4>Asignaturas Matriculadas</h4>
                    <button id="btnCancelarClases" class="btn-cancelar">Cancelar Asignatura Matriculada</button>
                </div>
                <ul id="listaClases">
                    <li>
                        <span>MAT110 - Sección 1</span>
                        <small>HI: 8:00, HF: 9:00, Docente: Juan Figueroa, Días: Lun,mar,mie,jue,vie</small>
                        <button style="margin-left: 10px;">Perfil del Docente</button>
                    </li>
                    <li>
                        <span>FIS100 - Sección 2</span>
                        <small>HI: 10:00, HF: 11:00, Docente: Ana Lopez, Días: Lun,mar,mie</small>
                        <button style="margin-left: 10px;">Perfil del Docente</button>
                    </li>
                </ul>
            </div>

            <hr>
            
            <!-- Lista de clases en espera -->
            <div class="clases-matriculadas">
                <div class="clases-matriculadas-header">
                    <h4>Asignaturas en Lista de Espera</h4>
                    <button id="btnCancelarClases" class="btn-cancelar">Cancelar Asignatura en Lista de espera</button>
                </div>
                <ul id="listaClases">
                    <li>
                        <span>MAT110 - Sección 1</span>
                        <small>HI: 8:00, HF: 9:00, Docente: Juan Figueroa, Días: Lun,mar,mie,jue,vie</small>
                        <button style="margin-left: 10px;">Perfil del Docente</button>
                    </li>
                    <li>
                        <span>FIS100 - Sección 2</span>
                        <small>HI: 10:00, HF: 11:00, Docente: Ana Lopez, Días: Lun,mar,mie</small>
                        <button style="margin-left: 10px;">Perfil del Docente</button>
                    </li>
                </ul>
            </div>

            <hr>

            <!-- Labs en espera -->
            <div class="clases-matriculadas">
                <div class="clases-matriculadas-header">
                    <h4>Laboratorios Matriculados</h4>
                </div>
                <ul id="listaClases">
                    <li>
                        <span>MAT110 - Sección 1</span>
                        <small>HI: 8:00, HF: 9:00, Docente: Juan Figueroa, Días: Lun,mar,mie,jue,vie</small>
                    </li>
                    <li>
                        <span>FIS100 - Sección 2</span>
                        <small>HI: 10:00, HF: 11:00, Docente: Ana Lopez, Días: Lun,mar,mie</small>
                    </li>
                </ul>
            </div>
*/