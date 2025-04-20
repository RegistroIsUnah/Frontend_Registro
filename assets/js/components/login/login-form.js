export let loginForm =
    `
    <div class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" style="display:block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #013775;">
            <h4 class="modal-title" id="exampleModalCenterTitle">Inicio de sesion</h4>
            </div>
            <div class="modal-body">
            <div>
                <form id="loginForm">
                <div class="imagen">
                    <img src="assets/img/logoUNAH.png" alt="logoUNAH" style="width: 150px;">
                </div>
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input type="text" class="form-control" id="username" name="username" aria-describedby="userHelp" placeholder="Ingrese su usuario">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" id="password" placeholder="Contraseña">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Acceder</button>
                </div>
                </form>
                <div class="mensaje">
                <p id="loginMessage"></p>
                </div>
            </div>
            </div>
        </div>

        </div>
    </div>
    </div>

`;

export let resetPassword = () =>
    `
    <div class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" style="display:block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #013775;">
            <h4 class="modal-title" id="exampleModalCenterTitle">Cambio de contraseña</h4>
            </div>
            <div class="modal-body">
            <div>
                <form id="resetPasswordForm">
                <div class="imagen">
                    <img src="assets/img/logoUNAH.png" alt="logoUNAH" style="width: 150px;">
                </div>

                <div class="form-group">
                    <label for="first_password">Ingrese su nueva contraseña</label>
                    <input type="password" class="form-control" id="first_password" name="first_password" minlength="8" required>
                </div>
                <div class="form-group">
                    <label for="last_password">Vuelva a ingresar su nueva contraseña</label>
                    <input type="password" class="form-control" id="last_password" name="last_password" minlength="8" required>
                </div>
                <div class="modal-footer">
                    <button disabled id="sendResetButton" type="submit" class="btn btn-primary">Restablecer contraseña</button>
                </div>
                </form>
                <div class="mensaje">
                <p id="loginMessage"></p>
                </div>
            </div>
            </div>
        </div>

        </div>
    </div>
    </div>

`; 