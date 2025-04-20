import { handleObtainStudent } from "./obtainStudentFetch.js";

import { EstudianteFetch } from "../../fetchs/studentFetch.js";
import { bootstrapAlert } from "../../utils/alerts.js";

/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.4
 * @since 2025/04/17
 * 
 * Funciones relacionadas con las fotos del estudiante.
 */

document.addEventListener("DOMContentLoaded", () => {
    handleObtainStudent();
    subirFoto();
    eliminarFoto();
});

function subirFoto() {
    const btnSubirFoto = document.querySelector(".btn-subir-fotos");
    if (!btnSubirFoto) return;

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.multiple = true; // Permite seleccionar varias imágenes a la vez
    inputFile.style.display = "none";
    document.body.appendChild(inputFile);

    btnSubirFoto.addEventListener("click", () => {
        const fotosActuales = document.querySelectorAll(".fotos-preview .foto-item img[src*='http']");
        if (fotosActuales.length >= 3) {
            bootstrapAlert("Ya has subido el máximo de 3 fotos.", "danger", 3000)
            return;
        }
        inputFile.click();
    });

    inputFile.addEventListener("change", () => {
        const files = inputFile.files;
        if (!files.length) return;

        const fotosActuales = document.querySelectorAll(".fotos-preview .foto-item img[src*='http']");
        const fotosDisponibles = 3 - fotosActuales.length;

        if (files.length > fotosDisponibles) {
            bootstrapAlert(`Solo puedes subir ${fotosDisponibles} foto(s) más.`, "danger", 3000);
            return;
        }

        const estudiante_id = sessionStorage.getItem("estudiante_id");

        Array.from(files).forEach((file) => {
            const formData = new FormData();
            formData.append("foto", file);
            formData.append("estudiante_id", estudiante_id);

            EstudianteFetch.postSubirFoto(formData)
                .then((response) => {
                    if (response.success) {
                        bootstrapAlert("Foto subida exitosamente.", "success", 3000);
                        handleObtainStudent(); // Recargar datos
                    } else {
                        bootstrapAlert("No se pudo subir la foto.", "danger", 3000);
                    }
                })
                .catch((error) => {
                    bootstrapAlert(`Error al subir la foto: "${error.message}`, "danger", 3000);
                })
                .finally(() => {
                    inputFile.value = "";
                });
        });
    });
}


function eliminarFoto() {
    document.querySelector(".fotos-preview")?.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar-foto")) {
            const fotoId = event.target.dataset.fotoId;
            const estudianteId = sessionStorage.getItem("estudiante_id");

            const formData = new FormData();
            formData.append("foto_id", fotoId);
            formData.append("estudiante_id", estudianteId);

            EstudianteFetch.postEliminarFoto(formData)
                .then((response) => {
                    if (response.success) {
                        bootstrapAlert("Foto eliminada exitosamente.", "success", 3000);
                        handleObtainStudent();
                    } else {
                        bootstrapAlert("No se pudo eliminar la foto.", "danger", 3000);
                    }
                })
                .catch((error) => {
                    bootstrapAlert(`Error al eliminar la foto: ${error.message}`, "danger", 3000);
                });
        }
    });
}


