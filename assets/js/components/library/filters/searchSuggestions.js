/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/28
 * 
 * funcion para filtrar los libros con el buscador aplicando sugerencias
 */

import { filterBooks } from "./filterBooks.js";
import { renderBooksWithPagination, setOriginalData } from "../views/renderBookView.js";

export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export function setupSearchSuggestions(data) {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const suggestionsContainer = document.getElementById("suggestionsContainer");
    const rol = sessionStorage.getItem('rol_activo');
    const isDocente = rol === 'jefe de departamento' || rol === 'coordinador';
    
    setOriginalData(data);
    let allBooksData = [...data];

    // Identifica si el término coincide con nombres de clase (exacto o parcial)
    const isPotentialClassSearch = (term) => {
        return allBooksData.some(clase => 
            clase.clase_nombre.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Identifica coincidencia exacta con clase
    const isExactClassMatch = (term) => {
        return allBooksData.some(clase => 
            clase.clase_nombre.toLowerCase() === term.toLowerCase()
        );
    };

    // Filtra clases (coincidencia exacta)
    const filterByClass = (term) => {
        return allBooksData.filter(clase => 
            clase.clase_nombre.toLowerCase() === term.toLowerCase()
        );
    };

    // Muestra sugerencias solo para libros individuales
    const showSuggestions = (results) => {
        suggestionsContainer.innerHTML = "";
        
        if (results.length === 0 || searchInput.value.length < 2) {
            suggestionsContainer.classList.add("d-none");
            return;
        }

        results.slice(0, 10).forEach(item => {
            const suggestion = document.createElement("a");
            suggestion.className = "list-group-item list-group-item-action";
            suggestion.textContent = `${item.titulo}`;
            suggestion.addEventListener("click", () => {
                searchInput.value = item.titulo;
                suggestionsContainer.classList.add("d-none");
                executeSearch();
            });
            suggestionsContainer.appendChild(suggestion);
        });
        suggestionsContainer.classList.remove("d-none");
    };

    // Función centralizada para ejecutar búsquedas
    const executeSearch = () => {
        suggestionsContainer.classList.add("d-none");
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === "") {
            renderBooksWithPagination(allBooksData, isDocente, true);
            return;
        }
        
        // Primero verificar si es búsqueda exacta por clase
        if (isExactClassMatch(searchTerm)) {
            const classResults = filterByClass(searchTerm);
            renderBooksWithPagination(classResults, isDocente, true);
            return;
        }
        
        // Si no es clase, buscar libros individuales
        const bookResults = filterBooks(searchTerm, allBooksData);
        renderBooksWithPagination(bookResults, isDocente, true);
    };

    // Manejo de input con debounce
    const handleInput = debounce((term) => {
        if (term === "") {
            renderBooksWithPagination(allBooksData, isDocente, true);
            suggestionsContainer.classList.add("d-none");
            return;
        }
        
        // Ocultar sugerencias si el término coincide con nombres de clase
        if (isPotentialClassSearch(term)) {
            suggestionsContainer.classList.add("d-none");
            return;
        }

        // Mostrar solo sugerencias de libros individuales
        const results = filterBooks(term, allBooksData);
        const flatResults = results.flatMap(clase => clase.libros);
        showSuggestions(flatResults);
    }, 300);

    // Event Listeners
    searchButton.addEventListener("click", executeSearch);

    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.trim();
        if (term === "") {
            renderBooksWithPagination(allBooksData, isDocente, true);
        }
        handleInput(term);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            executeSearch();
        }
    });

    // Ocultar sugerencias al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.add("d-none");
        }
    });
}