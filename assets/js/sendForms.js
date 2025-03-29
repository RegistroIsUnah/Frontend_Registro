import { RegularExpressions } from "./utils/regularExpressions.js";
import { AdmissionFetch } from "./fetchs/admissionFetch.js";
//import { LibraryFetch } from "./fetchs/libraryFetch.js";
import { BibliotecaFetch } from "./fetchs/bibliotecaFetch.js";
import { loadLibraryPage } from "./components/library/loadLibraryView.js";

export class SendForm {
    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/10
     * 
     * @param {*} event 
     * 
     * Este método toma la información del formulario de admisión y envía su contenido al método encargado de enviar la data al servidor.
     */
    static validateAdmissionForm = (event) => {

        event.preventDefault();
        let form = event.target;
        let admissionFetch = new AdmissionFetch();
        let formData = new FormData();

        formData.append("nombre", form.querySelector("[name='nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("apellido", form.querySelector("[name='apellidos']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("identidad", form.querySelector("[name='identidad']").value.trim().replace(/\D/g, ''));
        formData.append("telefono", form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''));
        formData.append("correo", form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''));
        formData.append("carrera_principal_id", form.querySelector("[name='carrera_principal']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("carrera_secundaria_id", form.querySelector("[name='carrera_secundaria']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("centro_id", form.querySelector("[name='centro_regional']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));

        let foto = form.querySelector("[name='foto_perfil']").files[0];
        let fotodni = form.querySelector("[name='dni_file']").files[0];
        let certificado = form.querySelector("[name='certificado']").files[0];

        if (foto) formData.append("foto", foto);
        if (fotodni) formData.append("fotodni", fotodni);
        if (certificado) formData.append("certificado", certificado);

        admissionFetch.postadmissionsData(formData); // enviando los datos al método que consume el endpoint de la API.
    };

    static validateRegisterBookForm = async (event) => {

        event.preventDefault();
        let form = event.target;
        let formData = new FormData();
        const isEditMode = form.hasAttribute('data-edit-mode');

        formData.append("titulo", form.querySelector("[name='titulo']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("fecha_publicacion", form.querySelector("[name='fecha_publicacion']").value.trim().replace(/\//g, '-'));
        formData.append("descripcion", form.querySelector("[name='descripcion']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        //formData.append("tags", JSON.stringify(Array.from(form.querySelector("[name='tags']").selectedOptions).map(option => option.value)));

        // Obtener tags seleccionados
        const selectedTags = Array.from(form.querySelectorAll('[name="tags"]:checked')).map(checkbox => checkbox.value);
        formData.append("tags", JSON.stringify(selectedTags));

        // Autores (array de objetos)
        const autores = JSON.parse(form.autoresHidden.value || "[]");
        formData.append("autores", JSON.stringify(autores));

        formData.append("editorial", form.querySelector("[name='editorial']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));

        const libroInput = form.querySelector("[name='libro']");
        if (libroInput.files[0]) {
            formData.append("libro", libroInput.files[0]);
        }

        // Solo procesar clase_id si existe el campo (no en edición)
    if (!isEditMode) {
        const claseId = form.querySelector("[name='clase_id']")?.value;
        if (claseId) {
            formData.append("clase_id", parseInt(claseId, 10));
        }
    }


        // Validación condicional del archivo
        if (isEditMode) {
            const libroId = document.getElementById('libro_id')?.value;
            if (libroId && !formData.has('libro_id')) {
                formData.append('libro_id', libroId);
            }

            const autoresHidden = document.getElementById('autoresHidden');
            if (autoresHidden) {
                try {
                    const autores = JSON.parse(autoresHidden.value);
                    // Eliminar autor_id si existe (solo para edición)
                    const autoresLimpios = autores.map(({ autor_id, ...rest }) => rest);
                    formData.set('autores', JSON.stringify(autoresLimpios));
                } catch (error) {
                    console.error("Error procesando autores:", error);
                }
            }
        }

        //formData.append("rol", form.querySelector("[name='rol']").value); 

        //BibliotecaFetch.postRegisterBook(formData);
        if (isEditMode && !formData.has('libro_id')) {
            const libroId = document.getElementById('libro_id')?.value;
            if (libroId) formData.append('libro_id', libroId);
        }


        try {
            if (isEditMode) {
                await BibliotecaFetch.updateLibro(formData);
                loadLibraryPage();
            } else {
                await BibliotecaFetch.postRegisterBook(formData);
            }
            loadLibraryPage();
        } catch (error) {
            alert(`${error.message}`);
        }


        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

    };
}

