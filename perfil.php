<?php
/*
include 'includes/chat.php'; // Incluye el chat*/
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/perfil.css">
    <link rel="stylesheet" href="assets/css/plantilla.css">
</head>

<body>
    <?php
    include 'includes/header.php'; 
    ?>

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
                            <span class="perfil-valor" id="name"></span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Número de Cuenta:</span>
                            <span class="perfil-valor" id="accountName"></span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Correo Personal:</span>
                            <span class="perfil-valor email"></span>
                        </div>
                    </div>

                    <!-- Información académica -->
                    <div class="perfil-seccion">
                        <h3>Información Académica</h3>
                        <div class="perfil-item">
                            <span class="perfil-label">Carrera:</span>
                            <span class="perfil-valor" id="carrerName"></span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Índice Académico:</span>
                            <span class="perfil-valor" id="globalTerm"></span>
                        </div>
                        <div class="perfil-item">
                            <span class="perfil-label">Correo Electrónico:</span>
                            <span class="perfil-valor email"></span>
                        </div>
                    </div>

                    <!-- Sección para mostrar fotos -->

                    <div class="perfil-seccion fotos-seccion">
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

<?php
  require_once("./includes/scripts.php");
  ?>
    <script type="module" src="assets/js/fetchs/loginFetch.js"></script>


    <script>
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


    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <!--<script type="module" src="assets/js/utils/chat.js"></script>-->

</body>

</html>
