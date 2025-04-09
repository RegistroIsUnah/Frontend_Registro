export const loadMenu = () => {
    const roles = JSON.parse(sessionStorage.getItem("roles")) || [];
    
    let menuHTML = `
    <div>
        <h3 class="panel-title">Panel Principal</h3>
        <nav>
            ${generateMenuItems(roles)}
        </nav>
    </div>
    `;
    
    return menuHTML;
};

const generateMenuItems = (roles) => {
    let items = [];
    
    items.push('<a id="panelComponent"></a><ul>');
    
    if (roles.includes("estudiante")) {
        items.push(
            '<a id="perfilComponent"><a href="perfil.php"><li><i class="fas fa-user"></i> Perfil</li></a></a>',
            '<a id="historialComponent"><a href="historial.php"><li><i class="fas fa-history"></i> Historial Académico</li></a></a>',
            '<a id="calificacionesComponent"><a href="calificaciones.php"><li><i class="fas fa-star"></i> Calificaciones</li></a></a>',
            '<a id="matriculaComponent"><a href="matricula.php"><li><i class="fas fa-edit"></i> Matrícula</li></a></a>',
            '<a id="solicitudesComponent"><a href="solicitudes.php"><li><i class="fas fa-envelope"></i> Solicitudes</li></a></a>',
            '<a id="asignaturasEstudianteComponent"><a href=""><li><i class="fas fa-envelope"></i> Solicitudes</li></a></a>'
        );
    }
    
    if (roles.includes("revisor")) {
        items.push(
            '<a id="revisorComponent"><a href="revisores.php"><li id="enviarYcargar"><i class="fas fa-search"></i> Revisar Aspirantes</li></a></a>'
        );
    }
    
    if (roles.includes("docente")) {
        items.push(
            '<a id="verPerfilComponent"><a href="#"><li><i class="fas fa-id-card"></i> Ver Perfil</li></a></a>',
            '<a id="asignaturasComponent"><a href="#" id="asignaturasLink"><li><i class="fas fa-book"></i> Asignaturas</li></a></a>'
        );
    }

    if (roles.includes("coordinador"))
    {
        items.push(
            '<a id="solicitudesCoordinadorComponent"><a href="coordinadores.php"><li><i class="fas fa-id-card"></i>Solicitudes</li></a></a>',
            '<a id="cargaAcademicaCoordinadorComponent"><a href="#"><li><i class="fas fa-book"></i>Revisar Carga Academica</li></a></a>',
            '<a id="historialCoordiandorComponent"><a href="historialCoordinador.php"><li><i class="fas fa-book"></i>A</li></a></a>'
        );
    }
    
    items.push('</ul>');
    return items.join('');
};
