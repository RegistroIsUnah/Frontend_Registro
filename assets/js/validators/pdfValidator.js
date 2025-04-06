/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/16
 * 
 * Esta clase contiene un método encargado de validar PDFs.
 */
export class PDFValidator {
    static allowedTypes = ["application/pdf"];
    
    static async validatePdfFile(file, maxSizeMB) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("No se seleccionó un archivo.");
                return;
            }

            if (!PDFValidator.allowedTypes.includes(file.type)) {
                reject("Error: El archivo tiene que ser de formato PDF.");
                return;
            }

            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size > maxSizeBytes) {
                reject(`Error: El archivo debe pesar menos de ${maxSizeMB} MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const arr = new Uint8Array(event.target.result).subarray(0, 4);
                const header = arr.reduce((acc, byte) => acc + byte.toString(16), "");
                if (header !== "25504446") {
                    reject("Error: El archivo no es un PDF válido.");
                } else {
                    resolve(true);
                }
            };
            reader.onerror = () => reject("Error al leer el archivo.");
            reader.readAsArrayBuffer(file.slice(0, 4));
        });
    }
}
