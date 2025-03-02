<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrícula</title>
    <link rel="stylesheet" href="css/plantilla.css">
    <link rel="stylesheet" href="css/matricula.css">
</head>

<body>
    <header class="nav">
        <div class="nav-izq">
            <h1>Sistema de Registro</h1>
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

    <!-- Contenido principal -->
    <main class="contenedor">
        <!-- Menú lateral -->
        <?php
        include "includes/menu.php"
        ?>

        <!-- Contenido de matrícula -->
        <section class="contenedor2">
            <div class="contenido">
                <h2>Matrícula de Clases</h2>

                
                <div class="matricula" style="margin-bottom: 20px;">
                    <h4>Seleccionar Clase y Departamento</h4>
                    <label>Departamento:</label>
                    <select>
                        <option value="">Selecciona un departamento</option>
                        <option value="IS">Ingenieria en Sistemas</option>
                        <option value="CS">Ciencias Sociales</option>
                        <option value="MM">Matematica</option>
                        <option value="CN">Ciencias Naturales</option>
                    </select>
                    <label>Clase:</label>
                    <select>
                        <option value="">Selecciona una clase</option>
                        <option value="MAT101">MAT110 - Matemáticas I</option>
                        <option value="FIS101">FIS100 - Física I</option>
                        <option value="PRO101">MM314 - Programación I</option>
                        <option value="HIS101">IS501 - Bases de Datos I</option>
                    </select>
                </div>

                <!-- Tabla de secciones disponibles -->
                <div id="seccionesDisponibles" class="secciones-disponibles">
                    <table>
                        <thead>
                            <tr>
                                <th>Sección</th>
                                <th>Hora</th>
                                <th>Docente</th>
                                <th>Días</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sección 1</td>
                                <td>8:00 AM - 10:00 AM</td>
                                <td>Juan Figueroa</td>
                                <td>Lun,mar,mie,jue,vie</td>
                            </tr>
                            <tr>
                                <td>Sección 2</td>
                                <td>10:00 AM - 12:00 PM</td>
                                <td>Ana Lopez</td>
                                <td>Lun,mar,mie</td>
                            </tr>
                            <tr>
                                <td>Sección 3</td>
                                <td>1:00 PM - 3:00 PM</td>
                                <td>Juan Martínez</td>
                                <td>Sab</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Botón para matricular la sección seleccionada -->
                <button id="btnMatricular" class="btn-matricular">Matricular</button>

                <hr>
                <!-- Lista de clases matriculadas -->
                <div class="clases-matriculadas">
                    <div class="clases-matriculadas-header">
                        <h4>Clases Matriculadas</h4>
                        <button id="btnCancelarClases" class="btn-cancelar" onclick="abrirModal()">Cancelar Clases
                            Matriculadas</button>
                    </div>
                    <ul id="listaClases">
                        <li>
                            <span>MAT110 - Sección 1</span>
                            <small>Hora: 8:00 AM - 10:00 AM, Docente: Juan Figueroa, Días: Lun,mar,mie,jue,vie</small>
                            <button style="margin-left: 10px;">Perfil del Docente</button>
                        </li>
                        <li>
                            <span>FIS100 - Sección 2</span>
                            <small>Hora: 10:00 AM - 12:00 PM, Docente: Ana Lopez, Días: Lun,mar,mie</small>
                            <button style="margin-left: 10px;">Perfil del Docente</button>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    </main>

    <?php
    include 'includes/footer.php';
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
            document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
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


</body>

</html>