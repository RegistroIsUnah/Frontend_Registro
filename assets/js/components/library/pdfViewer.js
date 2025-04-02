/**
 * Abre el modal con el PDF.
 */
export const openPDFModal = (pdfUrl) => {
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = pdfUrl + "#page=1&toolbar=0&navpanes=0&scrollbar=0";
    const pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'));
    pdfModal.show();
};

/**
 * Navega a una página específica del PDF.
 */
export const goToPage = () => {
    const pageNumber = document.getElementById("pageNumber").value;
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = `${pdfViewer.src}#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`;
};