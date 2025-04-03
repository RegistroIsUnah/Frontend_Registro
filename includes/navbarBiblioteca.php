<nav  id="navbarBiblioteca" class="navbar navbar-expand-lg" id="navbarBiblioteca">
    <div class="container-fluid">
        <!-- Logo y nombre -->
        <a class="navbar-brand" href="#">Biblioteca Virtual</a>
        
        <!-- Botón Hamburguesa (se muestra en móviles) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú colapsable -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" 
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i> <!-- Icono de perfil (opcional) -->
                        <span id="username">Usuario</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><button class="dropdown-item text-danger" onclick="logout()">
                            <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                        </button></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>