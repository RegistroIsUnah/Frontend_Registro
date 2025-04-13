<header class="nav d-flex align-items-center px-3" id="navbar" style="background-color: #013775; color: white; height: 60px;">
    <div class="nav-izq d-flex align-items-center">
        <button class="menu-toggle btn me-2 d-lg-none" style="background: none; border: none; color: white; font-size: 1.5rem;">
            ☰
        </button>
        <h1 class="m-0" style="font-size: 1.5rem; color: #ffb300" >Sistema de Registro</h1>
    </div>

    <div class="nav-der d-none d-lg-flex align-items-center ms-auto gap-3">
        <div class="usuario">
            <small class="d-block">Estudiante</small>
            <small class="email d-block"></small>
        </div>
        <button class="btn btn-danger btn-sm" id="btnLogout">
            Cerrar Sesión
        </button>
    </div>

    <!-- Dropdown para móviles/tablets (no hamburguesa) -->
    <div class="dropdown d-lg-none ms-auto">
        <button class="btn btn-link p-0" type="button" id="dropdownMenuButton" 
                data-bs-toggle="dropdown" aria-expanded="false"
                style="color: white; font-size: 1.2rem;">
            ⋮
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li>
                <button class="dropdown-item" id="btnLogout">
                  </i>Cerrar Sesión
                </button>
            </li>
        </ul>
    </div>
</header>
<script type="module" src="assets/js/fetchs/loginFetch.js"></script>

<script>
  const userRole = sessionStorage.getItem('roles');
  
  const usuarioDiv = document.querySelector('.usuario');
  
  if (userRole.includes('docente') || userRole.includes('administrador')) { 
    if (usuarioDiv) usuarioDiv.style.display = 'none';
  }
</script>