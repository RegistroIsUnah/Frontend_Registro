import { RegularExpressions } from "./utils/regularExpressions.js";
import { AdmissionFetch } from "./fetchs/admissionFetch.js";
import { BibliotecaFetch } from "./fetchs/bibliotecaFetch.js";

export class SendForm {
    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.2
     * @since 2025/03/10
     * 
     * @param {*} event 
     * 
     * Este método toma la información del formulario de admisión y envía su contenido al método encargado de enviar la data al servidor.
     */
    static validateAdmissionForm = async (form) => {

        let formData = new FormData();
        formData.append("nombre", form.querySelector("[name='nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("apellido", form.querySelector("[name='apellidos']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        
        let identification = form.querySelector("[name='documento']").value.trim().replace(/\D/g, '');
        formData.append("documento", identification);
        formData.append("tipo_documento_id", (RegularExpressions.DNI.test(identification)) ? 1 : ((RegularExpressions.PASSPORT.test(identification)) ? 2 : ""));
        formData.append("telefono", form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''));
        formData.append("correo", form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''));
        formData.append("carrera_principal_id", form.querySelector("[name='carrera_principal']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("carrera_secundaria_id", form.querySelector("[name='carrera_secundaria']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("centro_id", form.querySelector("[name='centro_regional']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));

        let foto = form.querySelector("[name='foto_perfil']").files[0];
        let fotodni = form.querySelector("[name='dni_file']").files[0];
        let certificado = form.querySelector("[name='certificado']").files[0];

        foto && formData.append("foto", foto);
        fotodni && formData.append("fotodni", fotodni);
        certificado && formData.append("certificado", certificado);
        
        return await AdmissionFetch.postadmissionsData(formData); // enviando los datos al método que consume el endpoint de la API.
    };

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.2
     * @since 2025/03/26
     * 
     * @param {*} event 
     * 
     * Este método toma la información del formulario de reenvío de solicitud de admisión para actualizar en la base de datos los datos que se pedían corregir.
     */
    static validateResendAdmissionForm = (form) => {
        
        let formData = new FormData();

        formData.append("numSolicitud", form.querySelector("[name='numSolicitud']").value);
        formData.append("aspirante_nombre", form.querySelector("[name='aspirante_nombre']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("aspirante_apellido", form.querySelector("[name='aspirante_apellido']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        
        let identification = form.querySelector("[name='documento']").value.trim().replace(/\D/g, '');
        formData.append("documento", identification);
        formData.append("telefono", form.querySelector("[name='telefono']").value.trim().replace(/\D/g, ''));
        formData.append("correo", form.querySelector("[name='correo']").value.trim().toLowerCase().replace(/[^a-z0-9@#._-]/g, ''));
        
        let foto = form.querySelector("[name='foto']").files[0];
        let fotodni = form.querySelector("[name='fotodni']").files[0];
        let certificado = form.querySelector("[name='certificado_url']").files[0];

        foto && formData.append("foto", foto);
        fotodni && formData.append("fotodni", fotodni);
        certificado && formData.append("certificado_url", certificado);
        
        return AdmissionFetch.putadmissionsData(formData);
    };


    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/03/16
     * 
     * @param {*} event 
     * 
     * Este método toma la información del formulario de registro de libros y envía su contenido al método encargado de enviar la data al servidor.
     */

    static validateRegisterBookForm = async (event, isEdit = false) => {

        event.preventDefault();
        let form = event.target;
        let formData = new FormData();

        formData.append("titulo", form.querySelector("[name='titulo']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        formData.append("fecha_publicacion", form.querySelector("[name='fecha_publicacion']").value.trim().replace(/\//g, '-'));
        formData.append("descripcion", form.querySelector("[name='descripcion']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));
        //formData.append("tags", JSON.stringify(Array.from(form.querySelector("[name='tags']").selectedOptions).map(option => option.value)));

        /*const autoresSelect = form.querySelector("[name='autores_lista']");
        const autores = Array.from(autoresSelect.options).map(option => {
            const nombreCompleto = option.value.trim();
            const primerEspacio = nombreCompleto.indexOf(' ');
            
            if (primerEspacio === -1) {
                return { nombre: nombreCompleto, apellido: '' };
            }
            
            const nombre = nombreCompleto.substring(0, primerEspacio);
            const apellido = nombreCompleto.substring(primerEspacio + 1);
            
            return { nombre, apellido };
        });*/


        // Obtener tags seleccionados
        const selectedTags = Array.from(form.querySelectorAll('[name="tags"]:checked')).map(checkbox => checkbox.value);
        formData.append("tags", JSON.stringify(selectedTags));

        // Autores (array de objetos)
        const autores = JSON.parse(form.autoresHidden.value || "[]");
        formData.append("autores", JSON.stringify(autores));

        //formData.append("autores", JSON.stringify(autores));

        formData.append("editorial", form.querySelector("[name='editorial']").value.trim().replace(RegularExpressions.SPECIAL_CHARACTERS, ''));

        const claseId = form.querySelector("[name='clase_id']").value;
        if (claseId) {
            formData.append("clase_id", parseInt(claseId, 10));
        }

        const libroInput = form.querySelector("[name='libro']");
        if (libroInput.files[0]) {
            formData.append("libro", libroInput.files[0]);
        }

        //formData.append("rol", form.querySelector("[name='rol']").value); 

        //BibliotecaFetch.postRegisterBook(formData);


        // Determinar si es edición o creación
    const libroId = formData.get('libro_id');
    //const isEdit = !!libroId;

    try {
        if (isEdit) {
            const response = await BibliotecaFetch.updateLibro(formData);
            alert("Libro actualizado correctamente");
        } else {
            const response = await BibliotecaFetch.postRegisterBook(formData);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
    }
}

