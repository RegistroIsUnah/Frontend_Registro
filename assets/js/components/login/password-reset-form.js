export let passwordResetForm =
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
                <div class="modal-footer">
                    <span href="#" class="btn btn-danger" id="forgotPassword">Regresar</span>
                    <button type="submit" class="btn btn-primary">Enviar</button>
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