export const verPerfilDocenteView = (docente) => {
    return `
    <section id="perfilDocenteSection" class="container mt-4">
        <h2 class="mb-4">Perfil del Docente</h2>
        <div class="row align-items-center">
            <div class="col-md-3 text-center">
                <img src="${docente.foto}" alt="Foto del Docente" class="img-fluid rounded-circle border border-3" style="max-width: 150px;">
            </div>
            <div class="col-md-9">
                <p><strong>Nombre:</strong> ${docente.nombre}</p>
                <p><strong>Correo:</strong> ${docente.correo}</p>
                <p><strong>Número de Empleado:</strong> ${docente.numero_empleado}</p>
                <p><strong>Centro Universitario:</strong> ${docente.centro_universitario}</p>
            </div>
        </div>
    </section>
    `;
};
