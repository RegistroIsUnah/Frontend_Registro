/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/03
 *  
 * Página principal de admisiones para el administrador.
 */
export let adminAdmissionsPage = () => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Admisiones</a></h5>
</div>

        <div class="container mb-5" style="max-width: 95%"> 
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6 col-sm-12 text-center mb-sm-5">
                    <h2 class="message mb-3">Envíe las Notas de los Apirantes</h2>
                    <button style="background-color:#091c5a;" id="sendApplicantsCalificationsButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        ¡Inscríbase ahora!
                    </button>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                    <h2 class="message mb-3">Registre a los Aspirantes Aprobados</h2>
                    <button style="background-color:#091c5a;" id="aprovedApplicantsRegisterButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        Ver estado de mi solicitud
                    </button>
                </div>
            </div>
        </div>

`;
