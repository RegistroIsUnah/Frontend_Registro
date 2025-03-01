<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="stylesheet" href="css/perfil.css">
    <link rel="stylesheet" href="css/plantilla.css">
</head>

<body>
    <header class="nav">
        <div class="nav-izq">
            <h1 style="margin: 0; font-size: 2rem;">Sistema de Registro</h1>
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

    <?php
    include "includes/menu.php"
    ?>

        <!-- Contenido de matrícula -->
        <section class="contenedor2">

            <div class="contenido">
                <h2>Perfil del Estudiante</h2>
                <div class="perfil-container">
                    <!-- Información general -->
                    <div class="perfil-seccion">
                        <h3>Datos Generales</h3>
                        <div class="perfil-item">
                            <span class="perfil-label">Nombre:</span>
                            <span class="perfil-valor">Juan Perez</span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Número de Cuenta:</span>
                            <span class="perfil-valor">202310010001</span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Correo Personal:</span>
                            <span class="perfil-valor">juanperez@gmail.com</span>
                        </div>
                    </div>

                    <!-- Información académica -->
                    <div class="perfil-seccion">
                        <h3>Información Académica</h3>
                        <div class="perfil-item">
                            <span class="perfil-label">Año de Ingreso:</span>
                            <span class="perfil-valor">2023</span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Carrera:</span>
                            <span class="perfil-valor">Ingeniería en Sistemas</span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Índice Académico:</span>
                            <span class="perfil-valor">92.5</span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Correo Electrónico:</span>
                            <span class="perfil-valor">usuario@unah.hn</span>
                        </div>
                    </div>

                    <!-- Sección para mostrar fotos -->
                    <div class="perfil-seccion">
                        <h3>Fotos</h3>
                        <div class="fotos-container">
                            <!-- Previsualización de fotos -->
                            <div class="fotos-preview">

                                <div class="foto-item">
                                    <img src="" alt="Foto 1">
                                    <span class="eliminar-foto">&times;</span>
                                </div>

                                <div class="foto-item">
                                    <img src="" alt="Foto 2">
                                    <span class="eliminar-foto">&times;</span>
                                </div>
                            </div>


                            <button class="btn-subir-fotos">Subir Foto</button>


                            <small class="fotos-mensaje">Máximo 3 fotos permitidas.</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php
    include 'includes/footer.php'; // Incluye el header
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


        function handleFileUpload(event) {
            const input = event.target;
            const preview = document.getElementById('fotosPreview');
            const mensaje = document.getElementById('fotosMensaje');

            // Limpiar previsualización anterior
            preview.innerHTML = '';

            // Verificar el número de archivos seleccionados
            if (input.files.length > 3) {
                mensaje.textContent = '¡Máximo 3 fotos permitidas!';
                mensaje.style.color = 'red';
                input.value = ''; // Limpiar el input
                return;
            } else {
                mensaje.textContent = 'Máximo 3 fotos permitidas.';
                mensaje.style.color = '#555';
            }

            // Mostrar las fotos seleccionadas
            if (input.files.length > 0) {
                preview.innerHTML = ''; // Limpiar el mensaje de "No hay fotos"
                Array.from(input.files).forEach((file, index) => {
                    if (index < 3) { // Solo mostrar las primeras 3 fotos
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            preview.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                preview.innerHTML = '<p>No hay fotos seleccionadas.</p>';
            }
        }
    </script>


</body>

</html>