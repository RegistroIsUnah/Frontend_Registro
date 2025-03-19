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
    <div class="usuario">
        <small>Estudiante</small>
        <br>
        <small>Usuario@unah.hn</small>
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
        <span>
            VALIDAR ASPIRANTES
        </span>
        <div class="contentContainer">

            <div class="infoContainer">infoContainer</div>
            <div class="studentContainer">studentContainer</div>
            <div class="imagesContainer">imagesContainer</div>
            <div class="optionsContainer">optionsContainer</div>

        </div>


    </section>


    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    </body>
</html>