<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes</title>
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/solicitudes.css">
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
        include "includes/menu.php";
        ?>

        <section class="contenedor2">
            <div class="contenido">
                <h2>Realizar Solicitudes</h2>
                <div class="solicitudes-contenedor">
                    <!-- Tarjetas de solicitud -->
                    <div class="solicitud-card" onclick="abrirModal('modal-cambio-carrera')">
                        <h3>Cambio de Carrera</h3>
                        <p>Solicitar un cambio de carrera académica.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-cancelaciones')">
                        <h3>Cancelaciones Excepcionales</h3>
                        <p>Solicitar la cancelación de materias.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-cambio-centro')">
                        <h3>Cambio de Centro</h3>
                        <p>Solicitar un cambio de centro universitario.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-pago-reposicion')">
                        <h3>Pago de Reposición</h3>
                        <p>Realizar pago de reposición.</p>
                    </div>
                </div>

                <!-- Modal de Cambio de Carrera -->
                <div id="modal-cambio-carrera" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cambio-carrera')">&times;</span>
                        <div class="cambio-carrera">
                            <h3>Solicitud de Cambio de Carrera</h3>
                            <hr style="color: #ffb300;">
                            <div class="info-estudiante">
                                <p><strong>Centro de Estudio:</strong> Ciudad Universitaria</p>
                                <p><strong>Carrera Actual:</strong> Ingeniería en Sistemas</p>
                                <p><strong>Índice Académico:</strong> 85.5</p>
                            </div>
                            <br>
                            <div class="seleccionar-carrera">
                                <label><strong>Seleccione la carrera a la cual desea hacer el cambio</strong></label>
                                <select>
                                    <option value="">Seleccione una carrera</option>
                                    <option value="">Informática Administrativa</option>
                                    <option value="">Economía</option>
                                    <option value="">Psicología</option>
                                </select>
                            </div>
                            <div class="razon-cambio">
                                <label><strong>Razón del Cambio:</strong></label>
                                <textarea rows="4" placeholder="Explique la razón del cambio de carrera..."></textarea>
                            </div>
                            <br>
                            <button class="btn-enviar">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>


                <!-- Modal de Cancelaciones Excepcionales -->
                <div id="modal-cancelaciones" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cancelaciones')">&times;</span>
                        <div class="cancelaciones-excepcionales">
                            <h3>Cancelaciones Excepcionales</h3>
                            <hr style="color: #ffb300;">

                            <!-- Tabla de Clases Actuales -->
                            <div class="clases-actuales">
                                <h4>Asignaturas:</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sel</th>
                                            <th>Código</th>
                                            <th>Clase</th>
                                            <th>Sección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" name="clase" value="matematica"></td>
                                            <td>MAT110</td>
                                            <td>Matemática I</td>
                                            <td>1400</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" name="clase" value="fisica"></td>
                                            <td>FIS100</td>
                                            <td>Física I</td>
                                            <td>1200</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" name="clase" value="programacion"></td>
                                            <td>MM314</td>
                                            <td>Programación I</td>
                                            <td>0800</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                 <!-- Opciones de Justificación -->
            <div class="opciones-justificacion">
                <h4>Seleccione la justificación:</h4>
                <select id="justificacion">
                    <option value="">Seleccione una opción</option>
                    <option value="">Enfermedad o problema de salud</option>
                    <option value="">Calamidad Familiar</option>
                    <option value=""> Separación o muerte del cónyuge, enfermedad grave de padres, hijos o cónyuge</option>
                    <option value="">Problemas o cambios laborales</option>
                </select>
            </div>


                            <!-- Área para subir archivos -->
                            <div class="subir-archivo">
                                <label><strong>Subir Justificación (PDF):</strong></label>
                                <input type="file" accept=".pdf">
                            </div>

                            <br>
                            <button class="btn-enviar">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>


                <!-- Modal de Cambio de Centro -->
                <div id="modal-cambio-centro" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cambio-centro')">&times;</span>
                        <div class="cambio-centro">
                            <h3>Cambio de Centro</h3>
                            <hr style="color: #ffb300;">
                            <div class="info-estudiante">
                                <p><strong>Estudiante:</strong> Juan Pérez</p>
                                <p><strong>Centro Actual:</strong> Ciudad Universitaria</p>
                            </div>
                            <br>

                            <!-- Selección del Nuevo Centro -->
                            <div class="seleccionar-centro">
                                <label><strong>Seleccione el centro al que desea cambiarse:</strong></label>
                                <select>
                                    <option value="">Seleccione un centro</option>
                                    <option value="">CU</option>
                                    <option value="">UNAH-TEC Danli Centro Tecnológico de Danlí </option>
                                    <option value="">CURNO Centro Universitario Regional Nororiental</option>
                                    <option value="">UNAH-VS Valle de Sula</option>
                                </select>
                            </div>
                            <br>
                            <button class="btn-enviar">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    </main>

    <?php
    include 'includes/footer.php';
    ?>

    <script>
        // Función para abrir un modal específico
        function abrirModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        }

        // Función para cerrar un modal específico
        function cerrarModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        }


        function toggleChatPanel() {
            const chatPanel = document.getElementById('chatPanel');
            chatPanel.classList.toggle('active');
        }

        function openTab(tabName) {
            document.querySelectorAll('.chat-tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
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
                    chat.style.display = 'flex';
                } else {
                    chat.style.display = 'none';
                }
            });
        }
    </script>
</body>

</html>
