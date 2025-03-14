import { renderHead, renderBodyPage } from './renderIncludes.js';

const actualPage = (window.location.pathname).split('/').pop();

renderHead(actualPage);
renderBodyPage(actualPage);    

console.log(actualPage);