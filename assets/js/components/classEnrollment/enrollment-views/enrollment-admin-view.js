/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/04/06
 *  
 * Página principal de matricula para el administrador.
 */
export let adminEnrollmentPage = () => `

<main class="contenedor" id="mainContent">

    <section class="main-contenedor" id="menuContainer"></section>
    <div class="container my-5" style="max-width: 95%"> 
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
</main>
`;
