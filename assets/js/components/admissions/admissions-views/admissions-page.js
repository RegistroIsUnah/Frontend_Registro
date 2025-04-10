/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 *  
 * Página de admisiones, la cuál tiene acceso todas las personas que ingresen desde internet.
 */
export let admissionsPage = () => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Admisiones</a></h5>
</div>
<div id="carouselExampleControls" class="carousel slide m-lg-5 m-md-4 m-sm-3" data-bs-ride="carousel">

            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="./assets/img/admissions/banner-2025-08-PAC.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./assets/img/admissions/banner-pruebas2-11.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./assets/img/admissions/banner-pruebas2-12.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./assets/img/admissions/thumbnail-BANNER-WEB-29.jpg" class="d-block w-100" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="container mb-5" style="max-width: 95%"> 
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6 col-sm-12 text-center mb-sm-5">
                    <h1 class="message mb-3">Inscripciones II PAC 2025</h1>
                    <button style="background-color:#091c5a;" id="admissionsFormButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        ¡Inscríbase ahora!
                    </button>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                    <h1 class="message mb-3">Vea su solicitud de admisión</h1>
                    <button style="background-color:#091c5a;" id="showAdmissionApplicationButton" type="button" class="btn btn-primary btn-lg w-50 py-3 glow-on-click">
                        Ver estado de mi solicitud
                    </button>
                </div>
            </div>
        </div>

`;
