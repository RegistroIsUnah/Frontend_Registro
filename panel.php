<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Estudiante</title>
  <link rel="stylesheet" href="css/plantilla.css">
  <link rel="stylesheet" href="css/panel.css">
</head>

<body>

  <header class="nav">
    <div class="nav-izq">
      <h1>Sistema de Registro</h1>
    </div>

    <div class="nav-der">

      <div class="chat-icon" onclick="toggleChatPanel()">
        <img src="https://cdn-icons-png.flaticon.com/512/134/134914.png" alt="Chat" width="24">

      </div>

      <div class="usuario">
        <small>Estudiante</small>
        <br>
        <small>Usuario@unah.hn</small>
      </div>
    </div>
  </header>



  <!-- Contenido principal -->
  <main class="contenedor">
    <!-- Menú lateral -->
    <?php
    include "includes/menu.php"
    ?>

    <!-- Contenido principal -->
    <section class="contenedor2">
      <h2>Bienvenid@ Juan Perez</h2>
      <div class="contenido">
        <div class="card card-1">
          <p class="card-title">Estado de Matricula</p>
          <small>Periodo actual 2025</small>
          <p class="card-status">Matriculado</p>
        </div>
        <div class="card card-2">
          <p class="card-title">Indice Global</p>
          <small>Ultimo periodo</small>
          <p class="card-status">90</p>
        </div>
        <div class="card card-3">
          <p class="card-title">Solicitudes Pendientes</p>
          <small>En proceso</small>
          <p class="card-status">2 Solicitudes</p>
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
  include 'includes/footer.php'; // Incluye el header
  ?>

  <script>
    function toggleChatPanel() {
      const chatPanel = document.getElementById('chatPanel');
      chatPanel.classList.toggle('active');
    }

    function openTab(tabName) {
      // Ocultar todas las pestañas
      document.querySelectorAll('.chat-tab-content').forEach(tab => {
        tab.classList.remove('active');
      });

      // Mostrar la pestaña seleccionada
      document.getElementById(tabName).classList.add('active');

      // Actualizar botones de pestañas
      document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
      });
      document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
    }

    function listaContactos() {
      alert('Aquí se abriría la lista de contactos.');
    }

    function solicitudContacto() {
      alert('Aquí se abriría el formulario para enviar solicitudes.');
    }

    function filtrarChat() {
      const searchText = document.getElementById('chatSearch').value.toLowerCase();
      const chatItems = document.querySelectorAll('.chat-item');

      chatItems.forEach(chat => {
        const chatName = chat.querySelector('.chat-info p').textContent.toLowerCase();
        if (chatName.includes(searchText)) {
          chat.style.display = 'flex'; // Mostrar el chat
        } else {
          chat.style.display = 'none'; // Ocultar el chat
        }
      });
    }
  </script>


</body>

</html>