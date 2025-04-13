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
            <div class="container mt-5">
                <div class="input-group">
                        <label for="busqueda" class="visually-hidden">Buscar</label>
                        <input id="busqueda" type="text" class="form-control" placeholder="Buscar por Nombre o Fecha (AAAA-MM-DD)">
                        <button type="button" class="btn btn-outline-primary">Buscar</button>
                        <button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><h6 class="dropdown-header">Filtrar Por:</h6></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" data-estado-solicitud-id="1">Pendientes</a></li>
                            <li><a class="dropdown-item" data-estado-solicitud-id="2">Aprobadas</a></li>
                            <li><a class="dropdown-item" data-estado-solicitud-id="3">Denegadas</a></li>
                        </ul>
                </div>
                <br>
                <br>
            <div id="contenedor-solicitudes"></div>
            <div id="pagination-requests"></div>
            <div id="alertas" style="position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); z-index: 9999;"></div>
        </section>
    </main>


    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>
</body>

</html>
