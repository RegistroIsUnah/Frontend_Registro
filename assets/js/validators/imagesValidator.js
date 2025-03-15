/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/12
 * 
 * @param {*} formId
 * 
 * Class used to validate every imagen that is sended by a form.
 * Can use this method to validate all the images.
 * 
 * Falta agregar que acepte otros tipos de datos.
 */
class ValidateImage {
    static async validateImageFile(file, allowedTypes, maxSize, minWidth, minHeight) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("No se seleccionó un archivo.");
                return;
            }

            if (file.type === "application/pdf") {
                resolve(true);
                return;
            }

            if (!allowedTypes.includes(file.type)) {
                reject("Error: El archivo tiene que ser de formato jpeg, jpg, png, webp, avif, tiff, tif o PDF.");
                return;
            }

            if (file.size > maxSize) {
                reject(`Error: La imagen debe pesar menos de ${maxSize / (1024 * 1024)}MB.`);
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = function () {
                if (img.width > minWidth || img.height > minHeight) {
                    reject(`Error: La imagen no puede superar los ${minWidth}x${minHeight} píxeles.`);
                } else {
                    resolve(true);
                }
            };

            img.onerror = function () {
                reject("Error: No se pudo cargar la imagen.");
            };
        });
    }
}
export {ValidateImage};