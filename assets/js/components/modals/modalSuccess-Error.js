/**
 * @author kency.oseguera@unah.hn
 * @version 0.0.1
 * @since 2025/04/04
 */

import {alertModal} from "./modals.js";

export class ModalManager {
    static show(message, isSuccess = true, onCloseCallback = null) {
        const containerId = 'modals-global-container';
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }
        
        container.innerHTML = alertModal(message, isSuccess);
        
        const modalElement = document.getElementById('alertModal');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            if (onCloseCallback) onCloseCallback();
            modalInstance.dispose();
        });
    }
}