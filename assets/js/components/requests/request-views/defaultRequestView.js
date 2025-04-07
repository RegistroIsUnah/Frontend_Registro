export const genericCardView = ({
    title,
    subtitle = '',
    description = '',
    items = [],
    tags = [],
    onClick = null,
    extraHTML = ''
}) => `
    <div class="col-md-4 mb-4">
        <div class="card book-card">
            <div class="card-body" ${onClick ? `onclick="${onClick}" style="cursor:pointer;"` : ''}>
                <h5 class="card-title">${title}</h5>
                ${subtitle ? `<p class="card-subtitle mb-2 text-muted">${subtitle}</p>` : ''}
                ${description ? `<p class="card-text">${description}</p>` : ''}
                
                ${items.length ? `
                    <div class="item-section mt-3">
                        <ul class="list-unstyled">
                            ${items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${tags.length ? `
                    <div class="tags-section">
                        ${tags.map(tag => `
                            <span class="badge bg-secondary me-1">${typeof tag === 'object' ? tag.nombre || tag.tag_nombre : tag}</span>
                        `).join('')}
                    </div>
                ` : ''}

                ${extraHTML}
            </div>
        </div>
    </div>
`;

/*
genericCardView({
    title: `Aspirante: ${aspirante.nombre} ${aspirante.apellido}`,
    subtitle: `Carrera Solicitada: ${aspirante.carrera}`,
    description: `Centro: ${aspirante.centro} | Estado: ${aspirante.estado}`,
    items: [`Correo: ${aspirante.correo}`, `Teléfono: ${aspirante.telefono}`],
    tags: [aspirante.estado],
    onClick: `loadAspirantDetail(${aspirante.id})`,
    extraHTML: `<button onclick="revisarSolicitud(${aspirante.id})" class="btn btn-primary mt-2">Revisar</button>`
});
*/