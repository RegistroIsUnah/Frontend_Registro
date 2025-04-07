<?php
include 'includes/chat.php'; // Incluye el chat
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/plantilla.css">
    <link rel="stylesheet" href="assets/css/solicitudes.css">
</head>

<body>
 
    <?php
     include 'includes/header.php'; 
    ?>

    <!-- Contenido principal -->
    <main class="contenedor">
        <!-- Menú lateral -->
        <?php
        include "includes/menu.php";
        ?>

        <section class="contenedor2">
            <div class="contenido">
                <h2>Realizar Solicitudes</h2>
                <div class="solicitudes-contenedor">
                    <!-- Tarjetas de solicitud -->
                    <div class="solicitud-card" onclick="abrirModal('modal-cambio-carrera'); getCareersByCenter()">
                        <h3>Cambio de Carrera</h3>
                        <p>Solicitar un cambio de carrera académica.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-cambio-centro'); getCenters()">
                        <h3>Cambio de Centro</h3>
                        <p>Solicitar un cambio de centro universitario.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-pago-reposicion')">
                        <h3>Pago de Reposición</h3>
                        <p>Realizar pago de reposición.</p>
                    </div>
                    <div class="solicitud-card" onclick="abrirModal('modal-cancelaciones')">
                        <h3>Cancelaciones Excepcionales</h3>
                        <p>Solicitar la cancelación de materias.</p>
                    </div>
                    <div class="solicitud-card" id="proofreaderOption" onclick="abrirModal('modal-solicitud-revisor')">
                        <h3>Solicitud de Revisor</h3>
                        <p>Realizar una solicitud para revisar a los nuevos aspirantes.</p>
                    </div>

                </div>

                <!-- Modal de Cambio de Carrera -->
                <div id="modal-cambio-carrera" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cambio-carrera')">&times;</span>
                        <div class="cambio-carrera">
                        <h3>Solicitud de Cambio de Carrera</h3>
                        <hr style="color: #ffb300;">
                        <div class="info-estudiante">
                            <p><strong>Centro de Estudio Actual:</strong> <span class="centro"></span></p>
                            <p><strong>Carrera Actual:</strong> <span id="carrerName"></span></p>
                            <p><strong>Índice Académico:</strong> <span id="globalTerm"></span></p>
                        </div>
                        <br>
                        <div class="seleccionar-carrera">
                            <label><strong>Seleccione la carrera a la cual desea hacer el cambio</strong></label>

                            <!-- SELECT con ID para poder accederlo desde JS -->
                            <select id="select-carreras">
                            <option value="">Seleccione una carrera</option>
                            </select>

                        </div>
                        <br>
                        <div class="subir-archivo">
                                <h4>Subir Justificación (PDF):</h4>
                                <input id="inputPdf_career" type="file" accept=".pdf">
                            </div>
                        <br>
                        <button class="btn-enviar" onclick="handleChangeCareer()">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>

                <!-- Modal de Cambio de Centro -->
                <div id="modal-cambio-centro" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cambio-centro')">&times;</span>
                        <div class="cambio-centro">
                        <h3>Cambio de Centro</h3>
                        <hr style="color: #ffb300;">
                        <div class="info-estudiante">
                            <p><strong>Estudiante:</strong> <span id="name"></span></p>
                            <p><strong>Centro de Estudio Actual:</strong> <span class="centro"></span></p>
                        </div>
                        <br>

                        <!-- Selección del Nuevo Centro -->
                        <div class="seleccionar-centro">
                            <label><strong>Seleccione el centro al que desea cambiarse:</strong></label>
                            <select id="select-centros">
                            <option value="">Seleccione un centro</option>
                            </select>
                        </div>
                        <br>
                        <div class="subir-archivo">
                                <h4>Subir Justificación (PDF):</h4>
                                <input id="inputPdf_center" type="file" accept=".pdf">
                            </div>
                        <br>
                        <button class="btn-enviar"  onclick="handleChangeCenter()">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>

                   <!-- Modal de Pago de Reposicion -->
                   <div id="modal-pago-reposicion" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-pago-reposicion')">&times;</span>
                        <div class="cancelaciones-excepcionales">
                            <h3>Pago de Reposicion</h3>
                            <hr style="color: #ffb300;">

                            <!-- Área para subir archivos -->
                            <div class="subir-archivo">
                                <h4>Boleta de Reposicion (PDF):</h4>
                                <input id="inputPdf_reposition" type="file" accept=".pdf">
                            </div>

                            <br>
                            <button class="btn-enviar" onclick="repositionRequest()">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>

                <!-- Modal de Cancelaciones Excepcionales -->
                <div id="modal-cancelaciones" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-cancelaciones')">&times;</span>
                        <div class="cancelaciones-excepcionales">
                            <h3>Cancelaciones Excepcionales</h3>
                            <hr style="color: #ffb300;">

                            <!-- Área para subir archivos -->
                            <div class="subir-archivo">
                                <h4>Subir Justificación (PDF):</h4>
                                <input id="inputPdf_cancelClass" type="file" accept=".pdf">
                            </div>

                            <br>
                            <button class="btn-enviar" onclick="cancelExceptionalClass()">Enviar Solicitud</button>
                        </div>
                    </div>
                </div>


                        <!-- Modal de Solicitud de Revisor -->
                <div id="modal-solicitud-revisor" class="modal">
                    <div class="modal-contenido">
                        <span class="cerrar-modal" onclick="cerrarModal('modal-solicitud-revisor')">&times;</span>
                        <div class="cambio-centro">
                            <h3>Solicitud para Revisor</h3>
                            <hr style="color: #ffb300;">
                            <div class="info-estudiante">
                                <p><strong>Estudiante: <span id="name"></span></strong></p>
                                <button class="btn-enviar" id="proofreaderRequest">Enviar Solicitud</button>
                                 <!-- <button class="btn-enviar" onclick="cerrarModal('modal-solicitud-revisor')">Cancelar</button> -->
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </main>

    <?php
    include 'includes/footer.php';
    ?>

    <script>
        // Función para abrir un modal específico
        function abrirModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        }

        // Función para cerrar un modal específico
        function cerrarModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        }
    </script>
    <script type="module" src="assets/js/components/students/obtainStudentFetch.js"></script>
    <script type="module" src="assets/js/components/requests/careerCenterRequest.js"></script>
    <script type="module" src="assets/js/components/requests/repositionCancelClass.js"></script>

    <script type="module" src="./assets/js/components/requests/proofreaderFetch.js"></script>
    <script type="module" src="assets/js/utils/chat.js"></script>

</body>

</html>
