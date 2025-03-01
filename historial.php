<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial</title>
    <link rel="stylesheet" href="css/plantilla.css">
    <link rel="stylesheet" href="css/historial.css">
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
                <h2>Historial Académico</h2>

                <!-- Información del estudiante -->
                <div class="perfil-seccion">
                    <div class="info-estudiante">
                        <img src="" alt="" class="foto-estudiante">
                        <div class="datos-estudiante">
                            <p><strong>Nombre:</strong> Juan Perez</p>
                            <p><strong>Carrera:</strong> Ingeniería en Sistemas</p>
                            <p><strong>Número de Cuenta:</strong> 202310010001</p>
                        </div>
                        <div class="datos-estudiante">
                            <p><strong>Centro:</strong> Juan Perez</p>
                            <p><strong>Indice Global:</strong> 98</p>
                            <p><strong>Indice Académico:</strong> 90</p>
                        </div>
                    </div>
                </div>

                <!-- Tabla de historial académico -->
                <div class="perfil-seccion">
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
                            <tbody>
                                <tr>
                                    <td>MM110</td>
                                    <td>Matemáticas I</td>
                                    <td>1001</td>
                                    <td>2023</td>
                                    <td>1</td>
                                    <td>85</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                <tr>
                                    <td>FIS101</td>
                                    <td>Física I</td>
                                    <td>1002</td>
                                    <td>2023</td>
                                    <td>2</td>
                                    <td>72</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                <tr>
                                    <td>PRO100</td>
                                    <td>Programación I</td>
                                    <td>1003</td>
                                    <td>2023</td>
                                    <td>1</td>
                                    <td>90</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>

                    <!-- Paginación -->
                    <div class="paginacion">
                        <a href="#" class="activo">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
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
    </script>


</body>

</html>