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
    
    <div id="alertas" class="position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 1050;"></div>


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
                                <div class="foto-item"></div>
                                <div class="foto-item"></div>
                                <div class="foto-item"></div>
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


    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <script type="module" src="assets/js/components/students/photosStudent.js"></script>
    <!--<script type="module" src="assets/js/utils/chat.js"></script>-->

</body>

</html>
