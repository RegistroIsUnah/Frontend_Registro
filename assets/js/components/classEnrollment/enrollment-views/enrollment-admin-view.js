/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/06
 *  
 * Página principal de matricula para el administrador.
 */
export let adminEnrollmentPage = () => `

    <div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
        <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Matrícula</a></h5>
    </div>

    <div class="container mb-5" style="max-width: 95%"> 
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6 col-sm-12 text-center mb-sm-5">
                <h2 class="message mb-3">Crear Periodo Académico</h2>
                <button style="background-color:#091c5a;" id="createAcademicPeriod" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                    Agregar periodo académico
                </button>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                <h2 class="message mb-3">Crear Proceso de Matrícula</h2>
                <button style="background-color:#091c5a;" id="crearEnrollmentProcess" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                    Agregar proceso de matrícula
                </button>
            </div>
        </div>
    </div>
`;
