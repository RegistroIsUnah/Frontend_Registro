<!-- Menú lateral -->
<section class="main-contenedor">
    <div>
        <h3 class="panel-title">Panel Estudiantil</h3>
        <nav>
            <a id="panelComponent"></a>
            <ul>
                <a id="perfilComponent"></a>
                <a id="historialComponent"></a>
                <a id="calificacionesComponent"></a>
                <a id="matriculaComponent"></a>
                <a id="solicitudesComponent"></a>
                <a id="revisorComponent"></a>
                <a id="verPerfilComponent"></a>
                <a id="asignaturasComponent"></a>
                <a id="asignaturasEstudianteComponent"></a>
                <a id="solicitudesCoordinadorComponent"></a>
                <a id="cargaAcademicaCoordinadorComponent"></a>
                <a id="historialCoordinadorComponent"></a>
            </ul>
        </nav>
    </div>

    <script>
        if(sessionStorage.getItem("roles").includes("estudiante"))
        {
            document.getElementById("panelComponent").innerHTML += '<a href="panel.php"><small class="menu-title">MENU</small></a>';  
            document.getElementById("perfilComponent").innerHTML += '<a href="perfil.php"><li> Perfil</li> </a>';  
            document.getElementById("historialComponent").innerHTML += '<a href="historial.php"><li> Historial Academico</li> </a>';  
            document.getElementById("calificacionesComponent").innerHTML += '<a href="calificaciones.php"><li> Calificaciones</li> </a>';  
            document.getElementById("matriculaComponent").innerHTML += '<a href="matricula.php"><li> Matricula</li> </a>';  
            document.getElementById("solicitudesComponent").innerHTML += '<a href="solicitudes.php"><li> Solicitudes</li> </a>';
            document.getElementById("asignaturasEstudianteComponent").innerHTML += '<a href="estudiante.php"><li> Asginaturas</li> </a>';  
           
        }

        if(sessionStorage.getItem("roles").includes("revisor"))
            {
            document.getElementById("revisorComponent").innerHTML += '<a href="revisores.php"><li id="enviarYcargar"> Revisar Aspirantes</li> </a>';  
            } 

        if(sessionStorage.getItem("roles").includes("docente"))
        {
            document.getElementById("verPerfilComponent").innerHTML += '<a href=""><li> Ver Perfil</li> </a>';  
            document.getElementById("asignaturasComponent").innerHTML += '<a href="docente.php"><li> Asignaturas</li> </a>';   
        }
        if(sessionStorage.getItem("roles").includes("coordinador"))
        {
            document.getElementById("solicitudesCoordinadorComponent").innerHTML += '<a href="coordinadores.php"><li> Solicitudes</li></a>';  
            document.getElementById("cargaAcademicaCoordinadorComponent").innerHTML += '<a href=""><li> Revisar Carga Academica </li></a>';
            document.getElementById("historialCoordinadorComponent").innerHTML += '<a href="historialCoordinador.php"><li> Revisar Historial</li></a>'; 
        }

         /*if(sessionStorage.getItem("roles").includes("revisor"))
            {
                    document.getElementById("revisorComponent").innerHTML += '<a href="revisores.php"><li id="enviarYcargar"> Revisar Aspirantes</li> </a>';  
            }     */   
    </script>
</section>