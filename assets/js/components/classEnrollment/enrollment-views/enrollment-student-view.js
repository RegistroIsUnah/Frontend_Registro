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
        <div class="contenido">
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
        </div>
    </section>
</main>
`;

/*
export let classEnrollmentStudentView = () => `

        <header class="nav">
            <div class="nav-izq">
                <h1>Sistema de Registro</h1>
            </div>
            </div>

            <div class="nav-der">

                <div class="chat-icon" onclick="toggleChatPanel()">
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
                <div class="contenido">
                    <h2>Matrícula de Asignaturas</h2>


    <div class="matricula">
        <div>
            <label>Departamento:</label>
            <select>
                <option value="">Seleccionar departamento</option>
                <option value="">Ingenieria en Sistemas</option>
                <option value="">Ciencias Sociales</option>
                <option value="">Matematica</option>
                <option value="">Ciencias Naturales</option>
            </select>
        </div>
        <div>
            <label>Asignaturas:</label>
            <select>
                <option value="">Seleccionar asignatura</option>
                <option value="">MAT110 - Matemáticas I</option>
                <option value="">FIS100 - Física I</option>
                <option value="">MM314 - Programación I</option>
                <option value="">IS501 - Bases de Datos I</option>
            </select>
        </div>
    </div>
                    

                    <!-- Tabla de secciones disponibles -->
                    <div id="seccionesDisponibles" class="secciones-disponibles">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sección</th>
                                    <th>Hora Inicio</th>
                                    <th>Hora Final</th>
                                    <th>Docente</th>
                                    <th>Días</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sección 1</td>
                                    <td>8:00 </td>
                                    <td>9:00 </td>
                                    <td>Juan Figueroa</td>
                                    <td>Lun,mar,mie,jue,vie</td>
                                </tr>
                                <tr>
                                    <td>Sección 2</td>
                                    <td>10:00 </td>
                                    <td>11:00 </td>
                                    <td>Ana Lopez</td>
                                    <td>Lun,mar,mie</td>
                                </tr>
                                <tr>
                                    <td>Sección 3</td>
                                    <td>14:00 </td>
                                    <td>15:00 </td>
                                    <td>Juan Martínez</td>
                                    <td>Sab</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Botón para matricular la sección seleccionada -->
                    <button id="btnMatricular" class="btn-matricular">Matricular Clase</button>

                    <hr>
                    <!-- Lista de clases matriculadas -->
                    <div class="clases-matriculadas">
                        <div class="clases-matriculadas-header">
                            <h4>Asignaturas Matriculadas</h4>
                            <button id="btnCancelarClases" class="btn-cancelar" onclick="abrirModal()">Cancelar Asignatura
                                Matriculada</button>
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
                    <!-- Lista de clases matriculadas -->
                    <div class="clases-matriculadas">
                        <div class="clases-matriculadas-header">
                            <h4>Asignaturas en Lista de Espera</h4>
                            <button id="btnCancelarClases" class="btn-cancelar" onclick="abrirModal()">Cancelar Asignatura
                                en Lista de espera</button>
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

                </div>
            </section>
        </main>

        <?php
        include 'includes/footer.php';
        include 'includes/scripts.php';
        ?>

        <script>
            function toggleChatPanel() {
                const chatPanel = document.getElementById('chatPanel');
                chatPanel.classList.toggle('active');
            }

            function openTab(tabName) {
                // Ocultar todas las pestañas
                document.querySelectorAll('.chat-tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });

                // Mostrar la pestaña seleccionada
                document.getElementById(tabName).classList.add('active');

                // Actualizar botones de pestañas
                document.querySelectorAll('.tab-button').forEach(button => {
                    button.classList.remove('active');
                });
                document.querySelector(`[
  (onclick = "openTab('${tabName}')")
]`).classList.add('active');
            }

            function listaContactos() {
                alert('Aquí se abriría la lista de contactos.');
            }

            function solicitudContacto() {
                alert('Aquí se abriría el formulario para enviar solicitudes.');
            }

            function filtrarChat() {
                const searchText = document.getElementById('chatSearch').value.toLowerCase();
                const chatItems = document.querySelectorAll('.chat-item');

                chatItems.forEach(chat => {
                    const chatName = chat.querySelector('.chat-info p').textContent.toLowerCase();
                    if (chatName.includes(searchText)) {
                        chat.style.display = 'flex'; // Mostrar el chat
                    } else {
                        chat.style.display = 'none'; // Ocultar el chat
                    }
                });
            }
        </script>



`;
*/