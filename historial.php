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
                <h2>Historial Académico</h2>

                <!-- Información del estudiante -->
                <div class="perfil-seccion">
                    <div class="info-estudiante">
                        <img src="" alt="" class="foto-estudiante">
                        <div class="datos-estudiante">
                            <p><strong>Nombre:</strong> <span id="name"></span> </p>
                            <p><strong>Carrera:</strong> <span id="carrerName"></span> </p>
                            <p><strong>Número de Cuenta:</strong> 202310010001</p>
                        </div>
                        <div class="datos-estudiante">
                            <p><strong>Centro:</strong> <span id="centro"></span></p>
                            <p><strong>Indice Global:</strong> <span id="globalTerm"></span> </p>
                            <p><strong>Indice Académico:</strong> <span id="lastTerm"></span> </p>
                        </div>
                    </div>
                </div>

                <!-- Tabla de historial académico -->
                <div class="perfil-seccion">
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
                            <tbody>
                                <tr>
                                    <td>MM110</td>
                                    <td>Matemáticas I</td>
                                    <td>1001</td>
                                    <td>2023</td>
                                    <td>1</td>
                                    <td>85</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                <tr>
                                    <td>FIS101</td>
                                    <td>Física I</td>
                                    <td>1002</td>
                                    <td>2023</td>
                                    <td>2</td>
                                    <td>72</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                <tr>
                                    <td>PRO100</td>
                                    <td>Programación I</td>
                                    <td>1003</td>
                                    <td>2023</td>
                                    <td>1</td>
                                    <td>90</td>
                                    <td data-observacion="Aprobó">Aprobó</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>

                    <!-- Paginación -->
                    <div class="paginacion">
                        <a href="#" class="activo">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <?php
    include 'includes/footer.php';
    ?>


    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <script type="module" src="assets/js/utils/chat.js"></script>

</body>

</html>
