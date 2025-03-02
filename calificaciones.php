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
    <link rel="stylesheet" href="css/calificaciones.css">
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
                <h2>Calificaciones</h2>

                <!-- Tabla de Clases -->
                <table class="tabla-clases">
                    <thead>
                        <tr>
                            <th>Clase</th>
                            <th>Docente</th>
                            <th>Acción</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="clase-item" data-clase-id="1">
                            <td>Matemáticas</td>
                            <td>Juan Perez</td>
                            <td><button class="btn-evaluar" onclick="evaluacionModal('1')">Evaluar Docente</button>
                            </td>
                            <td class="nota" style="display: none;">85</td>
                        </tr>

                        <tr class="clase-item" data-clase-id="2">
                            <td>Programación</td>
                            <td>Maria Lopez</td>
                            <td><button class="btn-evaluar" onclick="evaluacionModal('2')">Evaluar Docente</button>
                            </td>
                            <td class="nota" style="display: none;">90</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Modal de Evaluación -->
        <div id="evaluacionModal" class="modal">
            <div class="modal-contenido">
                <span class="close" onclick="cerrarModeal()">&times;</span>
                <h3>Evaluación del Docente</h3>
                <form id="evaluacionForm" onsubmit="evaluacion(event)">
                    <div class="pregunta">
                        <p>1. ¿El docente explica claramente los temas?</p>
                        <select class="combobox" required>
                            <option value="">Seleccione...</option>
                            <option value="mal">Mal</option>
                            <option value="bueno">Bueno</option>
                            <option value="excelente">Excelente</option>
                        </select>
                    </div>

                    <div class="pregunta">
                        <p>2. ¿El docente está disponible para consultas?</p>
                        <select class="combobox" required>
                            <option value="">Seleccione...</option>
                            <option value="mal">Mal</option>
                            <option value="bueno">Bueno</option>
                            <option value="excelente">Excelente</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-enviar">Enviar Evaluación</button>
                </form>
            </div>
        </div>
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


        let currentClaseId = null;

        function evaluacionModal(claseId) {
            currentClaseId = claseId;
            document.getElementById('evaluacionModal').style.display = 'block';
        }

        function cerrarModeal() {
            document.getElementById('evaluacionModal').style.display = 'none';
            document.getElementById('evaluacionForm').reset();
        }

        function evaluacion(event) {
            event.preventDefault();

            // Ocultar botón y mostrar nota
            const fila = document.querySelector(`tr[data-clase-id="${currentClaseId}"]`);
            fila.querySelector('.btn-evaluar').style.display = 'none';
            fila.querySelector('.nota').style.display = 'table-cell';

            cerrarModeal();
        }
    </script>


</body>

</html>