<?php
/*include 'includes/chat.php'; // Incluye el chat*/
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calificaciones</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/calificaciones.css">
</head>

<body>

  <?php
  include 'includes/header.php'; 
  ?>

    <!-- Contenido principal -->
    <main class="contenedor">
        <!-- Menú lateral -->
        <?php
        include "includes/menu.php"
        ?>

            <section class="contenedor2">
                <div class="contenido">
                    <h2>Calificaciones</h2>
                        <!-- Ajustamos la tabla para tener 4 columnas -->
                        <table id="tabla-calificaciones" class="tabla-clases">
                            <thead>
                                <tr>
                                    <th>Clase</th>
                                    <th>Docente</th>
                                    <th>Acción</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Se llenará dinámicamente por studentGrades.js -->
                            </tbody>
                        </table>
                </div>
         </section>
    </main>

    <?php
    include 'includes/footer.php';
    ?>

<?php
    require_once("./includes/scripts.php");
    ?>

    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <script type="module" src="assets/js/components/students/studentGrades.js"></script>
    <script type="module" src="assets/js/components/students/dynamicEvaluationModal.js"></script>

    <!--<script type="module" src="assets/js/utils/chat.js"></script>-->
    <script type="module" src="assets/js/fetchs/loginFetch.js"></script>


</body>

</html>
