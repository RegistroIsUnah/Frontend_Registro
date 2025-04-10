<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/historial.css">
</head>

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
                <h2>Buscar Historial Académico</h2>

                <!-- Barra de Busqueda -->
                <div class="container mt-5">
                    <div class="searchBar">
                    <form id="searchForm" class="d-flex">
                        <input id="searchInput" class="form-control me-2" type="search" placeholder="Buscar por estudiante, No. cuenta o departamento" aria-label="Buscar estudiante">
                        <button class="btn btn-primary" type="submit">Buscar</button>
                    </form>
                    </div>
                </div>

                <div class="container mt-3" id="resultados">
                    <!-- Aquí se mostrarán los resultados -->
                </div>

                <!-- Tabla de historial académico -->
                <div class="perfil-seccion">
                    <br>
                    <br>
                    <h3 style="color: #013775;">Asignaturas Cursadas</h3>
                    <div class="historial-container">
                        <table class="historial-table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Asignatura</th>
                                    <th>Sección</th>
                                    <th>Año</th>
                                    <th>Período</th>
                                    <th>Calificación</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-historial-body">
                                <!-- JS insertará las filas aquí -->
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </section>

    </main>

    <?php
    include 'includes/footer.php';
    ?>
    <script type="module">
        import { searchStudent } from './assets/js/fetchs/obtainStudentFetch.js';
        searchStudent();
    </script>

</body>

</html>
