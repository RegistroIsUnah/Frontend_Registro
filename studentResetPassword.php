<?php
require_once("./includes/head.php");  
?>
<body>

<div class="modal fade show" id="resetModal" tabindex="-1" role="dialog"
     aria-hidden="false" style="display:block;">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">

      <!-- Header azul --------------------------------------------------->
      <div class="modal-header text-white" style="background-color:#013775;">
        <h4 class="modal-title">Recuperar contraseña</h4>
      </div>

      <!-- Body ---------------------------------------------------------->
      <div class="modal-body">
        <form id="resetForm">
          <!-- logo -->
          <div class="imagen text-center mb-3">
            <img src="assets/img/logoUNAH.png" alt="logoUNAH" style="width:150px;">
          </div>

          <!-- texto descriptivo -->
          <p class="text-center mb-4">
            Ingrese su correo, se le enviara un enlace para reestablecer su contraseña
          </p>

          <!-- campo correo -->
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email"
                   class="form-control"
                   id="email"
                   name="email"
                   placeholder="correo"
                   required>
          </div>

          <!-- botones -->
          <div class="modal-footer px-0">
            <a href="login.php" class="btn btn-secondary">
              Volver a inicio de sesión
            </a>
            <button type="submit" class="btn btn-primary" id="sendResetLinkBtn">
              Enviar enlace
            </button>
          </div>
        </form>

        <!-- feedback -->
        <div class="mensaje">
          <p id="resetMessage" class="mt-3"></p>
        </div>
      </div>

    </div>
  </div>
</div>

<?php
require_once("./includes/scripts.php");
?>
<!-- al final de studentResetPassword.php  -->
<script type="module" src="assets/js/fetchs/studentPasswordForgot.js"></script>

</body>
</html>
