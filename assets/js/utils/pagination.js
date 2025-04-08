// pagination.js

export function createPaginationSystem({
    itemsPerPage = 10,
    containerId = 'pagination',
    flattenFn,
    groupFn,
    renderFn,
  }) {
    let currentPage = 1;
    let originalData = [];
    
    // 1) Guardar o actualizar la data original
    function setData(data, reset = true) {
      originalData = data;
      if (reset) {
        currentPage = 1;
      }
    }
    
    // 2) Calcular qué se muestra en la página actual y renderizar
    function renderPage() {
      // Aplana los items según la función específica
      const allItems = flattenFn(originalData);
  
      // Cálculo de paginación
      const totalPages = Math.ceil(allItems.length / itemsPerPage);
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      
      // Items de la página actual
      const itemsOnPage = allItems.slice(startIdx, endIdx);
  
      // Agruparlos según la lógica particular
      const groupedData = groupFn(originalData, itemsOnPage);
      
      // Llamar a la función de render para este tipo de card
      renderFn(groupedData);
  
      // Renderizar la barra de paginación
      renderPaginationControls(totalPages);
    }
    
    // 3) Renderizar los controles de paginación
    function renderPaginationControls(totalPages) {
      const paginationContainer = document.getElementById(containerId);
      if (!paginationContainer) return;
      
      // Limpiar contenido
      paginationContainer.innerHTML = '';
      
      // Si solo hay 1 página o menos, no se muestra nada
      if (totalPages <= 1) return;
      
      const ul = document.createElement('ul');
      ul.className = 'pagination';
      
      // Botón "Anterior"
      ul.appendChild(createPaginationItem('Anterior', currentPage > 1, () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage();
        }
      }, currentPage === 1));
      
      // Números de página
      for (let i = 1; i <= totalPages; i++) {
        ul.appendChild(createPaginationItem(
          i,
          i !== currentPage,
          () => {
            currentPage = i;
            renderPage();
          },
          i === currentPage
        ));
      }
      
      // Botón "Siguiente"
      ul.appendChild(createPaginationItem('Siguiente', currentPage < totalPages, () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage();
        }
      }, currentPage === totalPages));
      
      paginationContainer.appendChild(ul);
    }
    
    // 4) Crear cada item en la barra de paginación
    function createPaginationItem(text, isEnabled, onClick, isActive = false) {
      const li = document.createElement('li');
      li.className = `page-item ${isActive ? 'active' : ''} ${!isEnabled ? 'disabled' : ''}`;
      
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = text;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        if (isEnabled) onClick();
      });
      
      li.appendChild(a);
      return li;
    }
  
    // Retornamos las funciones que nos interesan usar desde afuera
    return {
      setData,
      renderPage,
      // Si necesitas exponer currentPage o manipularlo externamente, podrías exponerlo también.
    };
  }
  