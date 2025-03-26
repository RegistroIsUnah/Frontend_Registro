import { renderHead, renderBodyPage} from './renderIncludes.js';

const actualPage = (window.location.pathname).split('/').pop();

document.addEventListener("DOMContentLoaded", function () {

    renderHead(actualPage); // Simplemente añade los estilos correspondientes a cada encabezado de página.
    renderBodyPage(actualPage);  // Renderiza las vistas y componentes de la página, de acuerdo a solicitud de información a visualizar.
});     

