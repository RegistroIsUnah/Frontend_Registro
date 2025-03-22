/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/10
 *  
 * Página de admisiones, la cuál tiene acceso todas las personas que ingresen desde internet.
 */
export let admissionsPage = () => `

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

        <div class="accessDynamicContainer container mb-3 d-flex flex-column align-items-center">
            <h1 class="message mb-3">Inscripciones II PAC 2025</h1>
            <button id="admissionsFormButton" type="button" class="btn btn-primary btn-lg w-50">
                ¡Inscríbase ahora!
            </button>
        </div>

`;
