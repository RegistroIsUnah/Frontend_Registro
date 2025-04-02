<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/landingPage.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <title>landingPage</title>
</head>
<body>

    <?php include 'includes/navbarUNAH.php'; ?>

    <section class="bodyContent">

        <div class="infoContainer">
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="assets/img/avisoNo1.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="assets/img/avisoNo2.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="assets/img/avisoNo3.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="assets/img/avisoNo4.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </div>

        <div class="accessDynamicContainer">
            <span class="message">Bienvenido(a) al Sistema de Registro</span>
            <a href="login.php" type="button" class="btn btn-primary">Ingresa a tu cuenta</a>
        </div>

        <div class="dynamicContainers">
            <div class="leftDynamicContainer" id="dynamics">
            <span class="dynamicRightMessage">Creacion de Expediente II PAC 2025</span>
            <span id="dynamicSpan">Pertenece a nuestra familia universitaria, del 22 al 29 de abril.</span>
            <a href="./admisiones.php" type="button" class="btn btn-primary">Acceder</a>
            
            </div>
            <div class="rightDynamicContainer" id="dynamics">
                <span class="dynamicRightMessage">¡Hecha un vistazo a la Biblioteca!</span>
                <span id="dynamicSpan">Accede a miles de libros, revistas y artículos en línea, disponibles 24/7 desde cualquier dispositivo.</span>
                <a href="./biblioteca.php" type="button" class="btn btn-primary" id="dynamicRightButton">Acceder</a>
            </div>
        </div>
    </section>

    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
