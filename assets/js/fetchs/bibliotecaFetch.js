import { ConstValues } from "../utils/constValues.js";
/**
 * @author kency.oseguera@unah.hn
 * @version 0.1.4
 * @since 2025/03/20
 * 
 * Clase que contiene métodos para consumir endpoints relacionados con la biblioteca.
 */
export class BibliotecaFetch {

    static async getLibrosEstudiante(estudianteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_estudiante?estudiante_id=${estudianteId}&page=1&limit=10`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            //console.log(data)
            return data;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return [];
        }
    }


    static async getLibroCompletoEstudiante(libroId) {
        try {
            const response = await fetch(
                `${ConstValues.DOMAIN_NAME}/get/obtener_libro?libro_id=${libroId}`
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo libro (estudiante) ${libroId}:`, error);
            return [];
        }
    }

    static async getDeptoJefe(docenteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/departamentos`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();

            const depto = data.find(dept => dept.jefe_docente_id === docenteId);
            //console.log(depto);
            return depto.dept_id;

        } catch (error) {
            console.error("Error al obtener departamentos:", error);

            return [];
        }
    }

    static async getDeptoCoordinador(docenteId) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_detalles_carrera`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            const depto = data.find(dept => dept.coordinador_docente_id === docenteId);

            return depto.dept_id;

        } catch (error) {
            console.error("Error al obtener carreras:", error);
            return [];
        }
    }

    static async getLibrosDepto(departamentoId) {
        try {

            const response = await fetch(`${ConstValues.DOMAIN_NAME}/get/obtener_libros_por_departamento?departamentoId=${departamentoId}&page=1&limit=10`);
            //console.log(response);

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            //console.log(data);
            return data;

        } catch (error) {
            console.error("Error al obtener libros del departamento:", error);
            return [];
        }
    }


    static async getLibroCompleto(libroId) {
        try {
            const response = await fetch(
                `${ConstValues.DOMAIN_NAME}/get/obtener_libro_encargado?libro_id=${libroId}`
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo libro ${libroId}:`, error);
            return [];
        }
    }

    async getRegisterBookDataForm(departamentoId) {

        try {
            const [tagsResponse, classesData] = await Promise.all([
                fetch(`${ConstValues.DOMAIN_NAME}/get/listar_tags`),
                fetch(`${ConstValues.DOMAIN_NAME}/get/clases_depto?dept_id=${departamentoId}`).then(response => response.json())
            ]);

           /* let tagsOptions = ['<option value="">-- Seleccione una categoría --</option>']
                .concat(tagsData.map(tag =>
                    `<option value="${tag.tag_id}">${tag.tag_nombre}</option>`
                )).join('');*/

                clase.libros.forEach(libro => {
                    const bookCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card book-card" data-bs-toggle="modal" data-bs-target="#pdfModal" onclick="loadPDF('${libro.libro_url}')">
                                <div class="card-body">
                                    <h5 class="card-title">${libro.titulo}</h5>
                                    <p class="card-text">Editorial: ${libro.editorial}</p>
                                    <p class="card-text">${libro.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    bookContainer.innerHTML += bookCard;
                });
            });
        } else if (rol === 'Jefe de departamento') {
            // Renderizar libros para jefe de departamento
            data.forEach(clase => {
                console.log(data);

                const estado = `
                <div class="estado" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <select style="width: 100%; padding: 10px;">
                            <option value="">Seleccionar estado</option>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </div>
                    <div>
                        <button id="addBook" onclick="loadRegisterBookForm()" type="button" class="btn btn-success">Agregar Libro</button>
                    </div>
                </div>
            `;

            bookContainer.innerHTML += estado;

                const claseTitle = `<h2 class="mt-4">${clase.clase_nombre}</h2>`;
                bookContainer.innerHTML += claseTitle;

                let bookCards = ''; 

                clase.libros.forEach(libro => {
                    const bookCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card book-card">
                                <div class="card-body" onclick="openModal('${libro.libro_url}')">
                                    <h5 class="card-title">${libro.titulo}</h5>
                                    <p class="card-text">Editorial: ${libro.editorial}</p>
                                    <p class="card-text">${libro.descripcion}</p>
                                    <div>
                                        <button type="button" class="btn btn-success" onclick="handleEdit(event)">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    bookCards += bookCard; 
                });
                

            let classesOptions = ['<option value="">-- Seleccione una clase --</option>']
                .concat(classesData.map(clase =>
                    `<option value="${clase.clase_id}">${clase.nombre}</option>`
                )).join('');

            return [tagsData, classesOptions];

        } catch (error) {
            console.error("Error en las solicitudes:", error);
            return [[], []];
        }
    }

    static async postRegisterBook(formData) { 
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/post/registrar_libro`, {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            //console.log(data);
    
            if (!response.ok) {
                throw new Error(data.mensaje || "Error desconocido");
            }
            alert(data.mensaje);
            window.location.reload(); // Recargar para ver cambios
    
        } catch (error) {
            console.error("Error completo:", error);
            alert(`Error: ${error.message}`);
        }
    }

    static async updateLibro(formData) {
        try {
            const response = await fetch(`${ConstValues.DOMAIN_NAME}/put/modificar_libro`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log(data);
            return data;
            
        } catch (error) {
            throw new Error("Error en la solicitud: " + error.message);
        }
    }


}
