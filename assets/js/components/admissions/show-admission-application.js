export let showAdmissionApplication = () => `

<div class="mx-lg-5 my-5 mx-md-3 mx-sm-3 mx-xs-3">
    <h5><a class="color-text" href="index.php">Inicio</a> | <a class="color-text" href="">Admisiones</a> | <a class="color-text">Estado de solicitud de admisión</a></h5>
</div>

<div id="admissionApplicationContent" class="container d-flex justify-content-center align-items-center">
    <div class="row w-100">     
        <div class="col-6 mx-auto">
            <div class="input-group flex-column"> 
                <p class="mb-2 text-center">Ingrese su número de solicitud</p> 
                <div class="d-flex align-items-center">
                    <input id="showAdmissionApplicationInput" class="form-control me-2" type="text" maxlength="13" placeholder="Número de solicitud">
                    <button disabled type="submit" id="showAdmissionApplicationButton" style="background-color: #013775;" class="btn btn-primary">Ver</button> 
                </div>
                <a  id="recoverAdmissionNumberButton" class="custom-link text-secondary text-decoration-none mt-2">Recupere su número de solicitud</a>
            </div>
        </div>
    </div>
</div>
`;

export let recoverApplicationNumberView = () => `


`;