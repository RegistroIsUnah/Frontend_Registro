<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/css/landingPage.css">
        <link rel="stylesheet" href="assets/css/revisor.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

        <title>Revisor</title>
</head>
    <body>
    <section class="headerContent">
    <!-- Abrimos el header correctamente -->
    <div class="header">
        <div class="logoContainer">
        <img class="logoUNAH" src="assets/img/logoAmarillo.png" alt="Logo UNAH">
        </div>
        <h1 class="registro">DIRECCION DEL SISTEMA DE REGISTRO</h1>
    </div>
    
    </div>
    <div class="navBar">
        <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Habilitacion</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Opciones</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Salir</a>
        </li>
        </ul>
    </div>
    </section>

    <section class="bodyContainer">
    <h2 class="title">VALIDAR ASPIRANTES</h2>

    <!-- Contenedor Principal -->
    <div class="contentWrapper">
        <!-- Sección de Información -->
        <div class="inputContainer">
            <label for="nombre" class="inputLabel">Nombre:</label>
            <input type="text" id="nombre" class="inputField" readonly>

            <label for="identidad" class="inputLabel">Identidad:</label>
            <input type="text" id="identidad" class="inputField small" readonly>
        </div>
    </div>

    <!-- Sección de Fotos y Curriculum -->
    <div class="photoSection">
        <div class="photoItem">
            <h4 class="text">Foto Identidad</h4>
            <div class="photoBox"></div>
        </div>

        <div class="photoItem">
            <h4 class="text">Foto Aspirante</h4>
            <div class="photoBox"></div>
        </div>

        <div class="photoItem">
            <h4 class="text">Curriculum</h4>
            <div class="photoBox"></div>
        </div>
    </div>

    <!-- Opciones -->
    <div class="optionsContainer">
        <button class="btn btn-warning"><i class="bi bi-camera"></i> Corregir Fotos</button>
        <button class="btn btn-success"><i class="bi bi-check-circle"></i> Validar</button>
        <button class="btn btn-danger"><i class="bi bi-exclamation-triangle"></i> Corregir Datos</button>
        <button class="btn btn-primary"><i class="bi bi-scissors"></i> Recortar Fotos</button>
        <button class="btn btn-info"><i class="bi bi-person-plus"></i> Enviar y Cargar Más Aspirantes</button>
    </div>
</section>

    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script type="module" src="assets/js/fetchs/admissionFetch.js"></script>

    </body>
</html>