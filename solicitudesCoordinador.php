<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes Coordinador</title>
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/solicitudes.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    

</head>

<body>
    <?php
     include 'includes/header.php'; 
    ?>
    <!-- Contenido principal -->
    <main class="contenedor">
        <!-- Menú lateral -->
        <?php
        include "includes/menu.php";
        ?>


        <section class="contenedor2">
                <div class="input-group">
                    <input id="input-num-cuenta" type="text" class="form-control" placeholder="Buscar por No. Cuenta"> <button id="btn-buscar" type="button" class="btn btn-outline-primary">Buscar</button>
                    <button 
                    type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" id="dropdown-estados">
                        <h6 class="dropdown-header">Filtrar Por:</h6>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" data-estado="PENDIENTE">Pendientes</a></li>
                        <li><a class="dropdown-item" data-estado="APROBADA">Aprobadas</a></li>
                        <li><a class="dropdown-item" data-estado="DENEGADA">Denegadas</a></li>
                    </ul>
                </div>
                <br><br>
            <div id="contenedor-solicitudes"></div>
            <div id="pagination-requests"></div>
            <div 
              id="alertas" 
              style="position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); z-index: 9999;"
            ></div>
        </section>
    </main>


    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>
</body>

</html>
