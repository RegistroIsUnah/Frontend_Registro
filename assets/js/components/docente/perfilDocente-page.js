import { ConstValues } from "../../utils/constValues";

export function verPerfilDocenteView(docente) {
    return `
    <main class="contenedor">
    <!-- Menú lateral -->
     <section class="main-contenedor" id="menuContainer"></section>

    <!-- Contenido principal -->
    <section class="contenedor2">
      <div class="contenido">

    <div class="container mt-4  perfil-docente-container">
            <h2 class="mb-4" style="border-bottom: 2px solid #ffb300;">Perfil del Docente</h2>
            <div class="row align-items-center">
                <div class="col-md-3 text-center">
                    <img src="${ConstValues.UPLOADS_BASE_URL}${docente.foto}" alt="Foto del docente" class="img-fluid rounded-circle shadow-sm mb-3" style="width: 150px; height: 150px; object-fit: cover;">
                </div>
                <div class="col-md-9">
                    <p><strong>Nombre:</strong> ${docente.nombre} ${docente.apellido}</p>
                    <p><strong>Correo:</strong> ${docente.correo}</p>
                    <p><strong>Número de Empleado:</strong> ${docente.numero_empleado}</p>
                    <p><strong>Centro Universitario:</strong> ${docente.nombre_centro}</p>
                    <p><strong>Departamento:</strong> ${docente.nombre_departamento}</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  </main>

    `;
}
