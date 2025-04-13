import { ConstValues } from "../../utils/constValues.js";


/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/09
 */



(function () {
    // Variables globales para mantener el estado actual
    let currentClaseId = null;
    window.currentDocenteId = null;
    window.currentPeriodoId = null; 

    /**
     * Crea y agrega dinámicamente el HTML del modal de evaluación en el body.
     */
    function createModalHtml() {
      const modal = document.createElement("div");
      modal.id = "evaluacionModal";
      modal.classList.add("modal");
  
      const modalContenido = document.createElement("div");
      modalContenido.classList.add("modal-contenido");
  
      const spanClose = document.createElement("span");
      spanClose.classList.add("close");
      spanClose.innerHTML = "&times;";
      spanClose.addEventListener("click", cerrarModal);
      modalContenido.appendChild(spanClose);
  
      // Título del modal
      const titulo = document.createElement("h3");
      titulo.textContent = "Evaluación del Docente";
      modalContenido.appendChild(titulo);
  
      // Crear el formulario
      const form = document.createElement("form");
      form.id = "evaluacionForm";
      form.addEventListener("submit", evaluacion);
  
      const preguntas = [
        {
          id: 1,
          texto: "¿El docente explica claramente los temas?"
        },
        {
          id: 2,
          texto: "¿El docente está disponible para consultas?"
        },
        {
          id: 2,
          texto: "¿El docente está disponible para consultas?"
        },
        {
          id: 3,
          texto: "¿El docente utiliza ejemplos prácticos para facilitar el aprendizaje?"
        },
        {
          id: 4,
          texto: "¿El docente motiva a participar en clase?"
        },
        {
          id: 5,
          texto: "¿El docente evalúa de manera justa y objetiva?"
        },
        {
          id: 6,
          texto: "¿El docente cumple con los horarios establecidos?"
        },
        {
          id: 7,
          texto: "¿El material de apoyo proporcionado es útil y adecuado?"
        },
        {
          id: 8,
          texto: "¿La retroalimentación que brinda el docente es clara y constructiva?"
        },
        {
          id: 9,
          texto: "¿El docente fomenta un ambiente de respeto en el aula?"
        },
        {
          id: 10,
          texto: "¿Está satisfecho con el desempeño general del docente?"
        }
      ];
  
      preguntas.forEach((pregunta) => {
        const divPregunta = document.createElement("div");
        divPregunta.classList.add("pregunta");
  
        const parrafo = document.createElement("p");
        parrafo.textContent = `${pregunta.id}. ${pregunta.texto}`;
        divPregunta.appendChild(parrafo);
  
        const select = document.createElement("select");
        select.classList.add("combobox");
        select.required = true;
  
        // Opción por defecto
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione...";
        select.appendChild(opcionDefault);
  
        // Opciones fijas
        ["Mal", "Bueno", "Excelente"].forEach((opcionText) => {
          const opcion = document.createElement("option");
          opcion.value = opcionText;
          opcion.textContent = opcionText;
          select.appendChild(opcion);
        });
  
        divPregunta.appendChild(select);
        form.appendChild(divPregunta);
      });
  
      // Crear el botón de envío
      const btnEnviar = document.createElement("button");
      btnEnviar.type = "submit";
      btnEnviar.classList.add("btn-enviar");
      btnEnviar.textContent = "Enviar Evaluación";
      form.appendChild(btnEnviar);
  
      // Agregar el formulario al contenido del modal
      modalContenido.appendChild(form);
      // Agregar el contenido al contenedor principal
      modal.appendChild(modalContenido);
      // Agregar el modal a la página (body)
      document.body.appendChild(modal);
    }
    window.evaluacionModal = function(claseId, docenteId, periodoId) {
        currentClaseId = claseId;
        window.currentDocenteId = docenteId;
        window.currentPeriodoId = periodoId; // ✅ Aquí se guarda el valor dinámico
      
        let modal = document.getElementById("evaluacionModal");
        if (!modal) {
          createModalHtml();
          modal = document.getElementById("evaluacionModal");
        }
        if (modal) {
          modal.style.display = "block";
        } else {
          console.error("No se pudo crear el modal.");
        }
      };
    window.cerrarModal = function () {
      const modal = document.getElementById("evaluacionModal");
      if (modal) {
        modal.style.display = "none";
      }
      const form = document.getElementById("evaluacionForm");
      if (form) {
        form.reset();
      }
    };
  
    function evaluacion(event) {
      event.preventDefault();
  
      const selects = document.querySelectorAll("#evaluacionForm .combobox");
      const respuestas = {};
      selects.forEach((select, index) => {
        respuestas[String(index + 1)] = select.value; 
      });
  
      const dataBody = {
        docente_id: window.currentDocenteId, 
        periodo_id: window.currentPeriodoId,
        respuestas: respuestas
      };
  
      const url = `${ConstValues.DOMAIN_NAME}/post/registrar_evaluacion_docente.php`
      console.log("Enviando evaluación con:", dataBody);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
      })
        .then(async (response) => {
          const contentType = response.headers.get("Content-Type");
      
          if (!response.ok) {
            const text = await response.text(); // leer el error aunque sea HTML
            console.error("Respuesta no OK:", text);
            throw new Error(`Error del servidor: ${response.status}`);
          }
      
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            const text = await response.text();
            console.warn("Respuesta no JSON:", text);
            throw new Error("La respuesta del servidor no es JSON");
          }
        })
        .then((result) => {
          console.log("Evaluación registrada:", result);
          const fila = document.querySelector(`tr[data-clase-id="${currentClaseId}"]`);
          if (fila) {
            const btnEvaluar = fila.querySelector(".btn-evaluar");
            if (btnEvaluar) btnEvaluar.style.display = "none";
            const notaCell = fila.querySelector(".nota");
            if (notaCell) {
              notaCell.textContent = "Evaluación Enviada";
              notaCell.style.display = "table-cell";
            }
          }
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al enviar evaluación:", error);
          alert("Error al enviar evaluación. Revisa la consola para más detalles.");
        });
      
    }
      document.addEventListener("DOMContentLoaded", createModalHtml);
  })();
  