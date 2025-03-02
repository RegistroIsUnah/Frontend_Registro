<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes</title>
    <link rel="stylesheet" href="css/plantilla.css">
    <link rel="stylesheet" href="css/solicitudes.css">
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

        <section class="contenedor2">
            <div class="contenido">
                <h2>Realizar Solicitudes</h2>
                <div class="solicitudes-contenedor">
                    <!-- Tarjetas de solicitud -->
                    <div class="solicitud-card" onclick="abrirModal('cambio-carrera')">
                        <h3>Cambio de Carrera</h3>
                        <p>Solicitar un cambio de carrera académica.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('cancelaciones-excepcionales')">
                        <h3>Cancelaciones Excepcionales</h3>
                        <p>Solicitar la cancelación de materias.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('cambio-centro')">
                        <h3>Cambio de Centro</h3>
                        <p>Solicitar un cambio de centro universitario.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('pago-reposicion')">
                        <h3>Pago de Reposición</h3>
                        <p>Realizar pago de reposición.</p>
                    </div>
                </div>

                <!-- Modal -->
                <div id="modal" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal()">&times;</span>

                        <!-- Contenido del modal cambio de carrera -->
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
                                    <option value="">Seleccione una carrea</option>
                                    <option value="">Informática Administrativa</option>
                                    <option value="">Economia</option>
                                    <option value="">Psiccologia</option>
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


        // Función para abrir el modal
        function abrirModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
        }

        // Función para cerrar el modal
        function cerrarModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }
    </script>


</body>

</html>