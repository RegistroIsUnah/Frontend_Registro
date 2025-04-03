export class ModalManager {
    static initialize() {
        const modal = document.getElementById('responseModal');
        if (!modal) return;

        // Listeners específicos para este modal
        modal.querySelector('.book-modal-close').addEventListener('click', () => this.hide());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.hide();
        });
    }

    static show(message, isSuccess = true) {
        const modal = document.getElementById('responseModal');
        const messageElement = document.getElementById('bookModalMessage');
        const icon = modal.querySelector('.book-modal-icon');

        messageElement.textContent = message;
        icon.className = `book-modal-icon fas ${
            isSuccess ? 'fa-check-circle book-modal-success' : 'fa-times-circle book-modal-error'
        }`;
        
        modal.style.display = 'flex';
        setTimeout(() => this.hide(), 12000);
    }

    static hide() {
        const modal = document.getElementById('responseModal');
        if (modal) modal.style.display = 'none';
    }
}