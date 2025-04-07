<!-- Menú lateral -->
<section class="main-contenedor">
    <div>
        <h3 class="panel-title">Panel Estudiantil</h3>
        <nav>
            <a href="panel.php"><small class="menu-title">MENU PRINCIPAL</small></a>
            <ul>
                <a href="panel.php">
                    <li>Panel</li>
                </a>
                <a href="perfil.php">
                    <li>Perfil</li>
                </a>
                <a href="historial.php">
                    <li>Historial Académico</li>
                </a>
                <a href="calificaciones.php">
                    <li>Calificaciones</li>
                </a>
                <a href="matricula.php">
                    <li>Matricula</li>
                </a>
                <a href="solicitudes.php">
                    <li>Solicitudes</li>
                </a>
                <a id="revisorComponent"></a>
            </ul>
        </nav>
    </div>

    <script>
         if(sessionStorage.getItem("roles").includes("revisor"))
            {
                    document.getElementById("revisorComponent").innerHTML += '<a href="revisores.php"><li id="enviarYcargar"> Revisar Aspirantes</li> </a>';  
            }        
    </script>
</section>