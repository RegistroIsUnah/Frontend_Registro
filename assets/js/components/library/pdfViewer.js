/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/20
 * 
 * Funcion para cargar el pdf y buscar por numero de pagina
 */

export const openPDFModal = (pdfUrl) => {
    const pdfViewer = document.getElementById("pdfViewer");
    const loadingSpinner = document.getElementById("pdfLoading");
    const pdfContent = document.getElementById("pdfContent");
    const pageInput = document.getElementById("pageNumber");
    const modal = new bootstrap.Modal(document.getElementById('pdfModal'));

    const loading = () => {
        loadingSpinner.innerHTML = `
            <div class="spinner-container">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando Contenido...</span>
                </div>
                <p class="loading-text mt-2">Cargando contenido...</p>
            </div>
        `;
        loadingSpinner.classList.remove('hidden');
        pdfContent.classList.remove('visible');
        pdfViewer.src = '';
        pageInput.value = 1;
    };
    loading();

    const controller = new AbortController();
    const cleanUrl = pdfUrl.split('#')[0];
    
    // Verificar existencia del PDF
    fetch(cleanUrl, { 
        method: 'HEAD',
        signal: controller.signal 
    }).then(response => {
        if (!response.ok) {
            showNotFoundError();
            return;
        }
        
        const handleLoad = () => {
            loadingSpinner.classList.add('hidden');
            pdfContent.classList.add('visible');
        };

        const newUrl = `${cleanUrl}?t=${Date.now()}#page=1&toolbar=0&navpanes=0`;
        pdfViewer.src = newUrl;
        pdfViewer.addEventListener('load', handleLoad, { once: true });
    }).catch(() => {
        showNotFoundError();
    });

    const cleanup = () => {
        controller.abort();
        pageInput.removeEventListener('keypress', handleKeyPress);
        modal._element.removeEventListener('hidden.bs.modal', cleanup);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') goToPage();
    };
    
    modal._element.addEventListener('hidden.bs.modal', cleanup);
    pageInput.addEventListener('keypress', handleKeyPress);

    modal.show();
};

const showNotFoundError = () => {
    const loadingSpinner = document.getElementById("pdfLoading");
    loadingSpinner.innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center text-danger" style="height: 80vh;">
            <i class="bi bi-file-earmark-x-fill fs-1 mb-3"></i>
            <h4>¡Libro no encontrado!</h4>
            <p>El documento solicitado no está disponible</p>
            <button class="btn btn-outline-danger mt-2" data-bs-dismiss="modal">
                Cerrar
            </button>
        </div>
    `;
};

export const goToPage = () => {
    const pageNumber = document.getElementById("pageNumber").value;
    const pdfViewer = document.getElementById("pdfViewer");
    const loadingSpinner = document.getElementById("pdfLoading");
    const pdfContent = document.getElementById("pdfContent");

    if (!pageNumber || pageNumber < 1) {
        alert("Ingrese un número de página válido");
        return;
    }

    loadingSpinner.classList.remove('hidden');
    pdfContent.classList.remove('visible');

    const baseUrl = pdfViewer.src.split(/[?#]/)[0];
    const newUrl = `${baseUrl}?t=${Date.now()}#page=${pageNumber}&toolbar=0&navpanes=0`;

    const handleReload = () => {
        loadingSpinner.classList.add('hidden');
        pdfContent.classList.add('visible');
    };

    pdfViewer.addEventListener('load', handleReload, { once: true });
    pdfViewer.src = newUrl;
};