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

    static show(message, isSuccess = true, autoClose = true) {
        const modal = document.getElementById('responseModal');
        const modalMessage = document.getElementById('modalMessage');
        const modalIcon = modal.querySelector('.modal-icon');

        modalMessage.textContent = message;
        modalIcon.className = `modal-icon fas ${isSuccess ? 'fa-check-circle success' : 'fa-times-circle error'}`;
        modal.style.display = 'flex';

        if (autoClose) {
            setTimeout(() => this.hide(), 4000);
        }
    }

    static hide() {
        const modal = document.getElementById('responseModal');
        if (modal) modal.style.display = 'none';
    }
}

// Inicializar al importar el módulo
ModalManager.initialize();
