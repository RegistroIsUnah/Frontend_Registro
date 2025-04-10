/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.2
 * @since 2025/03/31
 * 
 * Manejo de tags
 */

export class TagsManager {
    constructor({
        inputElement,
        addButton,
        resultsContainer,
        selectedContainer,
        availableTags = []  // Recibe tags ya cargados

    }) {
        this.input = inputElement;
        this.addBtn = addButton;
        this.resultsContainer = resultsContainer;
        this.selectedContainer = selectedContainer;
        this.availableTags = availableTags;  // Usa los tags proporcionados

        this.init();
        this.setupClickOutside();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Mostrar tags al hacer clic
        this.input.addEventListener('click', () => this.showAllTags());

        // Filtrar al escribir
        this.input.addEventListener('input', () => this.handleInput());

        // Botón agregar
        this.addBtn.addEventListener('click', () => this.addNewTag());

        // Seleccionar tag
        this.resultsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-option') && e.target.dataset.id) {
                this.selectTag(e.target.dataset.id, e.target.textContent);
            }
        });

        // Eliminar tag
        this.selectedContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-tag')) {
                e.target.parentElement.remove();
            }
        });
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            const clickedOutside = !this.input.contains(e.target) &&
                !this.resultsContainer.contains(e.target) &&
                !this.addBtn.contains(e.target);
            if (clickedOutside) {
                this.closeDropdown();
            }
        });
    }

    showAllTags() {
        this.resultsContainer.innerHTML = this.availableTags
            .map(tag => `
          <div class="tag-option" data-id="${tag.tag_id}">
            ${tag.tag_nombre}
          </div>
        `)
            .join('');

        this.resultsContainer.style.display = 'block';
    }

    handleInput() {
        const searchTerm = this.input.value.trim().toLowerCase();

        if (!searchTerm) {
            this.showAllTags();
            return;
        }

        const filteredTags = this.availableTags.filter(tag =>
            tag.tag_nombre.toLowerCase().includes(searchTerm)
        );

        if (filteredTags.length > 0) {
            this.resultsContainer.innerHTML = filteredTags
                .map(tag => `
            <div class="tag-option" data-id="${tag.tag_id}">
              ${tag.tag_nombre}
            </div>
          `)
                .join('');
        } else {
            this.resultsContainer.innerHTML = `
          <div class="no-results">
            Presiona "Agregar" para crear: <strong>${searchTerm}</strong>
          </div>
        `;
        }
    }

    selectTag(id, name) {
        if (!this.tagExists(id)) {
            this.addTagToSelection(name, id);
            this.clearInput();
        }
    }

    addNewTag() {
        const tagName = this.input.value.trim();
        if (tagName && !this.tagExists(tagName)) {
            this.addTagToSelection(tagName, tagName);
            this.clearInput();
        }
    }

    addTagToSelection(name, id) {
        const tagElement = document.createElement('span');
        tagElement.className = `selected-tag badge bg-light text-dark p-2 me-2 mb-2 ${isNaN(id) ? 'new-tag' : ''}`;
        tagElement.innerHTML = `
        ${name}
        <input type="hidden" name="tags[]" value="${id}">
        <span class="remove-tag">&times;</span>
      `;
        this.selectedContainer.appendChild(tagElement);
    }

    tagExists(value) {
        return !!document.querySelector(`input[name="tags[]"][value="${value}"]`);
    }

    clearInput() {
        this.input.value = '';
        this.closeDropdown();
    }

    closeDropdown() {
        this.resultsContainer.style.display = 'none';
    }
}