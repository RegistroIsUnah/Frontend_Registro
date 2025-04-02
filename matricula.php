<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrícula</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/matricula.css">
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

        <!-- Contenido de matrícula -->
        <section class="contenedor2">
            <div class="contenido">
                <h2>Matrícula de Asignaturas</h2>


<div class="matricula">
    <div>
        <label>Departamento:</label>
        <select>
            <option value="">Seleccionar departamento</option>
            <option value="">Ingenieria en Sistemas</option>
            <option value="">Ciencias Sociales</option>
            <option value="">Matematica</option>
            <option value="">Ciencias Naturales</option>
        </select>
    </div>
    <div>
        <label>Asignaturas:</label>
        <select>
            <option value="">Seleccionar asignatura</option>
            <option value="">MAT110 - Matemáticas I</option>
            <option value="">FIS100 - Física I</option>
            <option value="">MM314 - Programación I</option>
            <option value="">IS501 - Bases de Datos I</option>
        </select>
    </div>
</div>
                

                <!-- Tabla de secciones disponibles -->
                <div id="seccionesDisponibles" class="secciones-disponibles">
                    <table>
                        <thead>
                            <tr>
                                <th>Sección</th>
                                <th>Hora Inicio</th>
                                <th>Hora Final</th>
                                <th>Docente</th>
                                <th>Días</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sección 1</td>
                                <td>8:00 </td>
                                <td>9:00 </td>
                                <td>Juan Figueroa</td>
                                <td>Lun,mar,mie,jue,vie</td>
                            </tr>
                            <tr>
                                <td>Sección 2</td>
                                <td>10:00 </td>
                                <td>11:00 </td>
                                <td>Ana Lopez</td>
                                <td>Lun,mar,mie</td>
                            </tr>
                            <tr>
                                <td>Sección 3</td>
                                <td>14:00 </td>
                                <td>15:00 </td>
                                <td>Juan Martínez</td>
                                <td>Sab</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Botón para matricular la sección seleccionada -->
                <button id="btnMatricular" class="btn-matricular">Matricular</button>

                <hr>
                <!-- Lista de clases matriculadas -->
                <div class="clases-matriculadas">
                    <div class="clases-matriculadas-header">
                        <h4>Asignaturas Matriculadas</h4>
                        <button id="btnCancelarClases" class="btn-cancelar" onclick="abrirModal()">Cancelar Asignatura
                            Matriculada</button>
                    </div>
                    <ul id="listaClases">
                        <li>
                            <span>MAT110 - Sección 1</span>
                            <small>HI: 8:00, HF: 9:00, Docente: Juan Figueroa, Días: Lun,mar,mie,jue,vie</small>
                            <button style="margin-left: 10px;">Perfil del Docente</button>
                        </li>
                        <li>
                            <span>FIS100 - Sección 2</span>
                            <small>HI: 10:00, HF: 11:00, Docente: Ana Lopez, Días: Lun,mar,mie</small>
                            <button style="margin-left: 10px;">Perfil del Docente</button>
                        </li>
                    </ul>
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
