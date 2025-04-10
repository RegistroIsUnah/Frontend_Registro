Documentación del Módulo de Paginación


Este documento describe el funcionamiento de un módulo genérico de paginación que permite mostrar datos en páginas, así como los pasos necesarios para integrarlo con distintos tipos de vistas (por ejemplo, tarjetas de solicitudes, libros, aspirantes, etc.).

1. Resumen
El módulo de paginación provee las funciones y la lógica necesarias para:

Dividir un arreglo de datos en páginas.

Navegar entre páginas (anterior, siguiente, elegir página específica).

Renderizar los controles de navegación en el DOM.

El usuario del módulo solo necesita:

Una función que “aplane” o determine qué elementos se van a paginar.

Una función que “agruppe” o reconstituya la estructura (si es necesario).

Una función que pinte los elementos en el DOM.

Al final, el paginador llama a la función de renderizado pasando solamente los elementos de la página actual.

2. Estructura del módulo
2.1. Función principal: createPaginationSystem(...)
js
Copy
export function createPaginationSystem({
  itemsPerPage = 10,
  containerId = 'pagination',
  flattenFn,
  groupFn,
  renderFn,
}) {
  let currentPage = 1;
  let originalData = [];

  function setData(data, reset = true) { ... }
  function renderPage() { ... }
  function renderPaginationControls(totalPages) { ... }
  function createPaginationItem(text, isEnabled, onClick, isActive = false) { ... }

  return {
    setData,
    renderPage
  };
}
Parámetros de entrada
itemsPerPage (number):
Número de elementos que se mostrarán en cada página.

containerId (string):
id del elemento <div> donde se inyectarán los controles de paginación (botones de “Anterior”, “Siguiente” y los números de página).

flattenFn (function(originalData) => array):
Función que recibe la data original y devuelve un arreglo de todos los items que deben ser paginados.

Útil cuando la estructura original es anidada o compleja (por ejemplo: clases > libros).

Si tu data original ya es un arreglo lineal (ej. un array de solicitudes), puede simplemente retornar la data tal cual.

groupFn (function(originalData, itemsOnPage) => any):
Función que recibe la data original completa y la lista de items que se muestran en la página actual.

Debe devolver la estructura final que se pasará a renderFn.

Si no necesitas agrupar nada especial, simplemente puedes retornar itemsOnPage.

renderFn (function(dataToRender) => void):
Función responsable de dibujar en el DOM los items (p. ej. crear tarjetas).

El paginador llamará a esta función con los datos de la página actual (tras aplanar y agrupar).

Métodos que expone
setData(data, reset = true)

Guarda la data original para paginarla.

Si reset es true, reinicia la página a la 1.

renderPage()

Calcula cuántas páginas hay.

Determina los items que corresponden a la página actual.

Llama a groupFn y luego a renderFn, pasando los items resultantes.

Finalmente llama a renderPaginationControls(...) para dibujar los botones.

3. Uso típico
3.1. Paso 1: Añadir el contenedor para los controles de paginación en el HTML
En tu archivo HTML, además del contenedor donde se pintan los datos, debes colocar un contenedor (ej. <div>) para los botones de paginación:

html
Copy
<div id="contenedor-datos"></div>
<div id="paginacion-datos"></div> <!-- Aquí se inyectarán los botones -->
id="paginacion-datos" debe coincidir con el containerId que configures en tu paginador.

3.2. Paso 2: Importar y crear una instancia del paginador
En tu archivo JavaScript (o módulo ES6), importa la función y crea el paginador. Por ejemplo:

js
Copy
import { createPaginationSystem } from "./pagination.js";

/**
 * Función que "aplana" el array si viene con estructuras anidadas.
 * Si tu data ya es un array plano, puedes retornar dataOriginal tal cual.
 */
function flattenRequests(dataOriginal) {
  return dataOriginal;
}

/**
 * Función que agrupa o reconstituye la data, si hace falta.
 * Si no requieres una estructura especial, retorna 'itemsOnPage' directamente.
 */
function groupRequests(originalData, itemsOnPage) {
  return itemsOnPage;
}

/**
 * Función que renderiza (pinta) los datos en el DOM.
 * Recibe únicamente los elementos que caben en la página actual.
 */
function renderRequestsOnPage(dataToRender) {
  const container = document.getElementById("contenedor-datos");
  if (!container) return;

  container.innerHTML = ""; // Limpia contenido anterior

  dataToRender.forEach((solicitud) => {
    // Crear tu tarjeta o elemento HTML
    // ...
  });
}

// Crear instancia del paginador
const requestsPagination = createPaginationSystem({
  itemsPerPage: 5,
  containerId: "paginacion-datos",
  flattenFn: flattenRequests,
  groupFn: groupRequests,
  renderFn: renderRequestsOnPage,
});
3.3. Paso 3: Recibir los datos y mostrarlos con paginación
Cuando obtengas los datos (p. ej. vía fetch), solo necesitas:

Llamar a requestsPagination.setData(tusDatos, true), para guardar los datos y (opcionalmente) reiniciar a la página 1.

Invocar requestsPagination.renderPage(), para que se muestre la primera página y se dibujen los botones de paginación.

Ejemplo:

js
Copy
fetch("/api/solicitudes")
  .then(res => res.json())
  .then(solicitudes => {
    requestsPagination.setData(solicitudes, true);
    requestsPagination.renderPage(); // Pinta la página inicial
  })
  .catch(err => console.error(err));
3.4. Navegación entre páginas
El paginador se encarga de inyectar los controles de navegación en el contenedor con id="paginacion-datos". Al hacer clic en “Anterior”, “Siguiente” o un número de página, se vuelve a llamar internamente a renderPage() con la página seleccionada. Esto automáticamente:

Determina los items para la nueva página.

Vuelve a pintar los datos.

Actualiza los botones (resaltando la página activa).

4. Personalización
itemsPerPage: Cambia el número de elementos por página.

containerId: Cambia el contenedor donde se generarán los botones de paginación.

Funciones flattenFn y groupFn: Ajusta cómo se tratan los datos.

Ejemplo de uso:

Libros por clase: Se “aplanan” todos los libros.

Al agrupar, se reconstruye la clase con solo los libros de esa página.

Funcion renderFn: Depende de tu estilo de render. Puede crear tarjetas, listas, tablas, etc.

5. Ejemplo de implementación final
Supongamos que tienes un componente que maneja “Solicitudes” y deseas paginarlas:

js
Copy
import { createPaginationSystem } from "./pagination.js";

function flattenRequests(dataOriginal) {
  // Ya es un array simple
  return dataOriginal;
}

function groupRequests(originalData, itemsOnPage) {
  // No necesitamos agrupar nada
  return itemsOnPage;
}

function renderRequestsOnPage(requests) {
  const container = document.getElementById("contenedor-solicitudes");
  if (!container) return;

  container.innerHTML = "";

  requests.forEach((req) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>${req.nombre} - ${req.tipo_solicitud}</h4>`;
    container.appendChild(card);
  });
}

const requestsPagination = createPaginationSystem({
  itemsPerPage: 10,
  containerId: "pagination-requests",
  flattenFn: flattenRequests,
  groupFn: groupRequests,
  renderFn: renderRequestsOnPage,
});

// Obtenemos los datos e iniciamos la paginación
fetch("/api/solicitudes")
  .then(res => res.json())
  .then(solicitudes => {
    requestsPagination.setData(solicitudes, true);
    requestsPagination.renderPage();
  })
  .catch(err => console.error(err));
Con esta configuración:

Se generará un listado de 10 solicitudes por página.

Aparecerán botones de paginación en el <div id="pagination-requests">.

Al hacer clic en un número de página o en “Anterior”/“Siguiente”, se actualizará automáticamente el contenido de <div id="contenedor-solicitudes"> para mostrar solo las solicitudes correspondientes a esa página.

6. Preguntas Frecuentes (FAQ)
¿Puedo tener múltiples paginadores en la misma página?
Sí. Simplemente crea una nueva instancia con createPaginationSystem para cada sección que desees paginar, cambiando containerId en cada una para no pisar los elementos de otro paginador.

¿Puedo cambiar dinámicamente itemsPerPage?
Puedes configurar una nueva instancia o modificar la existente reimportando la función y creando otra. Si quieres cambiarlo al vuelo, tendrías que exponer esa variable o recrear el paginador con los nuevos parámetros.

¿Es obligatorio usar flattenFn y groupFn?

flattenFn: Si tus datos ya vienen en un array plano, puede ser una función que retorne dataOriginal sin cambios.

groupFn: Si no necesitas rearmar ninguna estructura, simplemente devuélvelos tal cual.

Son útiles cuando la data está anidada (ejemplo: un array de “clases”, cada una con array interno de “libros”).

¿Qué pasa si no quiero mostrar la paginación cuando solo hay 1 página?
El módulo ya lo maneja. Si totalPages <= 1, no se dibujan los controles de paginación.
