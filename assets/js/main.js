import { renderHead, renderBodyPage} from './renderIncludes.js';

const actualPage = (window.location.pathname).split('/').pop();

document.addEventListener("DOMContentLoaded", function () {

    let body = document.getElementsByTagName("body")[0];
    renderHead(actualPage); // Simplemente añade los estilos correspondientes a cada encabezado de página.
    renderBodyPage(actualPage, body);  // Renderiza las vistas y componentes de la página, de acuerdo a solicitud de información a visualizar.
});     

