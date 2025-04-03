/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.1
 * @since 2025/03/20
 * 
 * Funcion para cargar el pdf y buscar por numero de pagina
 */

export const openPDFModal = (pdfUrl) => {
    const pdfViewer = document.getElementById("pdfViewer");
    const pageInput = document.getElementById("pageNumber");

    const cleanUrl = pdfUrl.split('#')[0];
    const newUrl = `${cleanUrl}?t=${Date.now()}#page=1&toolbar=0&navpanes=0`;
    
    pageInput.value = 1;
    pdfViewer.src = "";

    // Cargar PDF después de limpiar
    setTimeout(() => {
        pdfViewer.src = newUrl;
    }, 100);

    const onLoadHandler = () => {
        pageInput.value = 1;
        pdfViewer.removeEventListener("load", onLoadHandler);
    };
    
    pdfViewer.addEventListener("load", onLoadHandler);
    new bootstrap.Modal(document.getElementById('pdfModal')).show();
    
};

export const goToPage = () => {
    const pageNumber = document.getElementById("pageNumber").value;
    const pdfViewer = document.getElementById("pdfViewer");

    const baseUrl = pdfViewer.src.split(/[?#]/)[0];
    const newUrl = `${baseUrl}?t=${Date.now()}#page=${pageNumber}&toolbar=0&navpanes=0`;
    
    pdfViewer.src = newUrl;
};
