
<!DOCTYPE html>
<html lang="es">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Estudiante</title>
  <link rel="stylesheet" href="assets/css/plantilla.css">
  <link rel="stylesheet" href="assets/css/panel.css">
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

    <!-- Contenido principal -->
    <section class="contenedor2">
      <h2>Bienvenid@ <span id="name"></h2>
      <div class="contenido">
        <div class="card card-1">
          <p class="card-title">Carrera Matriculada</p>
          <p class="card-status"><span id="carrerName"></span></p>
        </div>
        <div class="card card-2">
          <p class="card-title">Indice Global</p>
          <p class="card-status" id="globalTerm"></p>
          <small>Ultimo periodo</small>
          <p class="card-status" id="lastTerm"></p>
        </div>
        <div class="card card-3">
          <p class="card-title">Solicitudes Pendientes</p>
          <small>En proceso</small>
          <p class="card-status"><span id="solicitudes"></span></p>
        </div>
        <div class="card card-4">
          <p class="card-title">Porcentaje Aprobado</p>
          <small>Información</small>
          <p class="card-status">85% completo
          </p>
        </div>

      </div>
    </section>
  </main>

  
  <?php
  include 'includes/footer.php';
  ?>
  <?php
  require_once("./includes/scripts.php");
  ?>
  <?php
  include 'includes/chat.php'; // Incluye el chat
  ?>
    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <script type="module" src="assets/js/utils/chat.js"></script>
    <script type="module" src="assets/js/fetchs/loginFetch.js"></script>

</body>

</html>
