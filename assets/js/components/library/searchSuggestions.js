import { filtrarLibros } from "./filtrarLibros.js";
import { renderLibros } from "./renderBookView.js";

export const debounce = (func, wait) => { // Función a ejecutar después del tiempo de espera y Tiempo de espera en milisegundos.
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
    let allBooksData = [...data];

    // Identifica si el término coincide con una clase. term es el valor actual en el input
    const isClassSearch = (term) => { 
        return allBooksData.some(clase => 
            clase.clase_nombre.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Filtra SOLO la clase completa
    const filterByClass = (term) => {
        return allBooksData.filter(clase => 
            clase.clase_nombre.toLowerCase().includes(term.toLowerCase())
        );
    };

    const showSuggestions = (results) => {
        suggestionsContainer.innerHTML = "";
        
        //oculta el contenedor si no hay resultados o el termino es muy corto
        if (results.length === 0 || searchInput.value.length < 2) {
            suggestionsContainer.classList.add("d-none");
            return;
        }

        results.slice(0, 10).forEach(item => {
            const suggestion = document.createElement("a");
            suggestion.className = "list-group-item list-group-item-action";
            suggestion.textContent = `${item.titulo}`;
            suggestion.addEventListener("click", () => { //Al hacer clic en una sugerencia, llena el input y oculta el contenedor.
                searchInput.value = item.titulo;
                suggestionsContainer.classList.add("d-none");
            });
            suggestionsContainer.appendChild(suggestion);
        });
        suggestionsContainer.classList.remove("d-none");
    };

    const handleInput = debounce((term) => {
        //Si el input esta vacio muestra todos los libros
        if (term === "") {
            renderLibros(allBooksData, isDocente);
            suggestionsContainer.classList.add("d-none");
            return;
        }
        
        /*if (term.length < 2) {
            suggestionsContainer.classList.add("d-none");
            return;
        }*/

        // No mostrar sugerencias si es búsqueda por clase
        if (isClassSearch(term)) {
            suggestionsContainer.classList.add("d-none");
            return;
        }

        const results = filtrarLibros(term, allBooksData);
        const flatResults = results.flatMap(clase => clase.libros);
        showSuggestions(flatResults);
    }, 300);

    // Al hacer clic en Buscar
    searchButton.addEventListener("click", () => {
        suggestionsContainer.classList.add("d-none");
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === "") {
            renderLibros(allBooksData, isDocente);
        } 
        // Si es búsqueda por clase
        else if (isClassSearch(searchTerm)) {
            const classResults = filterByClass(searchTerm);
            renderLibros(classResults, isDocente);
        } 
        // Búsqueda normal
        else {
            const resultados = filtrarLibros(searchTerm, allBooksData);
            renderLibros(resultados, isDocente);
        }
    });

    searchInput.addEventListener("input", (e) => {
        if (e.target.value === "") {
            renderLibros(allBooksData, isDocente);
        }
        handleInput(e.target.value);
    });

    //Oculta sugerencias al hacer clic fuera.
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.add("d-none");
        }
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchButton.click();
        }
    });
}