<?php
//include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carga Académica</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/cargaPeriodo.css">
</head>

<?php
include 'includes/header.php';
?>

<div id="alertas" class="position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 1050;"></div>

<!-- Contenido principal -->
<main class="contenedor">
    <!-- Menú lateral -->
    <?php include "includes/menu.php"; ?>

    <section class="contenedor2">
        <div class="contenido">
            <h2>Carga Académica</h2>

            <div class="filtros-carga mb-4">
                <div class="row g-3 align-items-center">
                    <div class="col-md-3 col-sm-6">
                        <label for="select-periodo" class="form-label">Período:</label>
                        <select id="select-periodo" class="form-select">
                            <option value="">—</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    <div class="col-md-3 col-sm-6">
                        <label for="input-anio" class="form-label">Año:</label>
                        <input type="number" id="input-anio" class="form-control" placeholder="Ej. 2023" min="2000" max="2100">
                    </div>

                    <div class="col-md-3 col-sm-6 d-flex align-items-end">
                        <button id="btn-cargar" class="btn btn-primary w-100">Cargar</button>
                    </div>

                    <div class="d-flex gap-3 mb-3">
                    <button id="btn-descargar-excel" class="btn btn-success">Descargar Excel</button>
                    <button id="btn-descargar-pdf" class="btn btn-success">Descargar PDF</button>
                    </div>

                </div>
            </div>


            <!-- Tabla de Cargas Académicas -->
            <div class="table-container mt-4">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="encabezado-carga">
                            <tr>
                                <th>Sección</th>
                                <th>Código</th>
                                <th>Asignatura</th>
                                <th>No. Empl</th>
                                <th>Docente</th>
                                <th>Matriculados</th>
                                <th>Cupos</th>
                                <th>Edificio</th>
                                <th>Aula</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-carga">

                        </tbody>
                    </table>
                </div>
            </div>
            <div id="pagination-carga" class="mt-3"></div>
        </div>
    </section>
</main>


<?php
include 'includes/footer.php';
include 'includes/scripts.php';
?>

<script type="module">
    import {
        initCargaAcademica
    } from './assets/js/components/coordinador/loadCargaAcademica.js';
    initCargaAcademica();
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>


</body>

</html>