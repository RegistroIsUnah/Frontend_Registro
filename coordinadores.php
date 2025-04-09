<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/solicitudes.css">
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
            <div class="contenido">
                <h2>Revisar Solicitudes</h2>
                <div class="solicitudes-contenedor">
                    <!-- Tarjetas de solicitud -->
                    <div class="solicitud-card" data-url="cambioCarrera">
                        <h3>Cambio de Carrera</h3>
                        <p>Revisar solicitudes de cambio de carrera académica.</p>
                    </div>
                    <div class="solicitud-card" data-url="cambioCentro">
                        <h3>Cambio de Centro</h3>
                        <p>Revisar solicitudes de cambio de centro universitario.</p>
                    </div>
                    <div class="solicitud-card" data-url="cancelaciones">
                        <h3>Cancelaciones Excepcionales</h3>
                        <p>Revisar solicitudes de cancelaciónes de excepcionales.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php
    include 'includes/footer.php';
    include 'includes/scripts.php';
    ?>

    <script>
    document.querySelectorAll('.solicitud-card').forEach(card => {
        card.addEventListener('click', () => {
        const tipo = card.getAttribute('data-url');
        window.location.href = `solicitudesCoordinador.php?tipo=${tipo}`;
        });
    });
    </script>

</body>

</html>
