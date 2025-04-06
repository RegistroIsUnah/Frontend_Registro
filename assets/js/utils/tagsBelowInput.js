/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @date 2025/03/17
 * 
 * Este código está sujeto a poder ser generalizado, por el momento solo se necesita en la inserción de nombres de autores para libros
 */
export let tagsBelowInput = () => {

    const authors = [];
    const autoresContainer = document.getElementById('autorsContainer');
    const selectElement = document.getElementById('autores_lista');
    const addButton = document.getElementById('addAuthor');
    const authorInput = document.getElementById('autores');
    
    function createAuthorTag(author, index) {
        const tag = document.createElement('div');
        tag.className = 'd-inline-flex align-items-center bg-primary text-white rounded-pill p-1 px-2 fs-6';
        
        const span = document.createElement('span');
        span.textContent = author;
        
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-link text-white p-0 ms-2 fs-5 lh-1';
        deleteButton.innerHTML = '×';

        deleteButton.onclick = () => {
            authors.splice(index, 1);
            updateDisplay();
        };

        tag.appendChild(span);
        tag.appendChild(deleteButton);
        return tag;
    }

    function updateDisplay() {
        autoresContainer.innerHTML = '';
        selectElement.innerHTML = '';
        
        authors.forEach((author, index) => {
            autoresContainer.appendChild(createAuthorTag(author, index));
            
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            option.selected = true;
            selectElement.appendChild(option);
        });
    }

    function addAuthor() {
        const author = authorInput.value.trim();
        if(author && !authors.includes(author)) {
            authors.push(author);
            authorInput.value = '';
            updateDisplay();
        }
    }

    addButton.addEventListener('click', addAuthor);

    authorInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addAuthor();
            e.preventDefault();
        }
    });
}