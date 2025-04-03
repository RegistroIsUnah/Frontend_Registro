
import { ConstValues } from "../../utils/constValues.js";
import { fetchFile } from '../../utils/fileHandler.js';
import { renderFilePreview } from "../../utils/fileHandler.js";
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 * @since 2025/04/01
 */

export function handleObtainStudent() {

    const estudiante_id = sessionStorage.getItem('estudiante_id');
    const url = `${ConstValues.DOMAIN_NAME}/get/datos_estudiantes.php?estudianteid=${estudiante_id}`;

    fetch(url, {
        method: "GET",
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            if (!data?.success || typeof data.data !== 'object') {
                console.warn("No se pudo cargar el perfil del estudiante.");
                return;
            }
            cargarPerfilEstudiante(data.data);
            console.log(data);
        })
        .catch(error => {
            console.error("Error obteniendo el perfil del estudiante:", error);
        });
}

//Datos que comparten multiples vistas
function cargarDatosComunes(data) {
    const nombreCompleto = data.informacion_personal.nombre_completo;
    const globalTerm = data.academico.indice_global;
    const lastTerm = data.academico.indice_periodo;
    const carrerName = data.academico.carreras;
    const accountName = data.informacion_personal.numero_cuenta;

    const nameInput = document.getElementById("name");
    const globalTermInput = document.getElementById("globalTerm");
    const lastTermInput = document.getElementById("lastTerm");
    const carrerInput = document.getElementById("carrerName");
    const accountNameInput = document.getElementById("accountName");

  
     if(nameInput) nameInput.innerHTML = nombreCompleto;
     if(globalTermInput) globalTermInput.innerHTML = globalTerm;
     if(lastTermInput) lastTermInput.innerHTML = lastTerm;
     if(carrerInput) carrerInput.innerHTML = carrerName;
     if (accountNameInput) accountNameInput.innerHTML = accountName;

     const email = data.informacion_personal.correo;
     const emailElements = document.querySelectorAll('.email');
     
     emailElements.forEach(el => {
       el.innerHTML = email;
     }); 
    
  }

//CARGA LA INFORMACION A DESPLEGAR EN TODAS LAS VISTAS DE PANEL.PHP
function cargarPerfilEstudiante(data) {
    const currentPage = window.location.pathname;

    // Detectar Cada vista de Panel.php
    if (currentPage.includes("perfil.php")) {
      cargarVistaPerfil(data);
    } else if (currentPage.includes("panel.php")) {
      cargarVistaPanel(data);
    } else if (currentPage.includes("historial.php")) {
        cargarVistaHistorial(data);
    } else if (currentPage.includes("calificaciones.php")) {
      cargarVistaHistorial(data);
    } else if (currentPage.includes("matricula.php")) {
      cargarVistaMatricula(data);
    } else if (currentPage.includes("solicitudes.php")) {
      cargarVistaSolcitudes(data);
    } 
    console.log("✅ Perfil del estudiante cargado correctamente");
  }


  //Vista de Panel.php
  function cargarVistaPanel(data) {
    cargarDatosComunes(data);

    const request = data.academico.solicitudes_pendientes;
    const requestInput = document.getElementById("solicitudes");
    if(requestInput) requestInput.innerHTML = request;
  
    const card2 = document.querySelector(".card-2");
    const globalTerm = data.academico.indice_global;
  
    card2.classList.remove("card-good", "card-warning", "card-bad");
  
    if (globalTerm > 8) {
      card2.classList.add("card-good");
    } else if (globalTerm > 5 && globalTerm <= 7) {
      card2.classList.add("card-warning");
    } else if (globalTerm <= 5) {
      card2.classList.add("card-bad");
    }
  }

  //Vista de Perfil
  function cargarVistaPerfil(data) {
    //Mostrar Informacion
    cargarDatosComunes(data);
    // Mostrar Imagenes
    const fotos = data.fotos; // <-- Esto debe ser un array de nombres ["foto1.jpg", ...]
    const fotoItems = document.querySelectorAll(".fotos-preview .foto-item");
  
    if (Array.isArray(fotos) && fotos.length > 0) {
      fotos.forEach((fotoNombre, index) => {
        if (fotoItems[index]) {
          const fotoUrl = `${ConstValues.DOMAIN_NAME_UPLOAD}/${fotoNombre}`;
          renderFilePreview(fotoItems[index], fotoUrl, "image");
        }
      });
    }
  }

  function cargarVistaHistorial(data) {
    cargarDatosComunes(data);
  
    const centro = data.academico.centro;
    const centroInput = document.getElementById("centro");
    if (centroInput) centroInput.innerHTML = centro;
  
    const foto = data.fotos?.[0];
    const fotoEstudiante = document.querySelector(".foto-estudiante");
  
    if (foto && fotoEstudiante) {
      const fotoUrl = `${ConstValues.DOMAIN_NAME_UPLOAD}/${foto}`;
      fotoEstudiante.src = fotoUrl;
      fotoEstudiante.alt = "Foto de perfil";
    }
  
  }

  function cargarVistaCalificaciones(data)
  {
    cargarDatosComunes(data);
  }

  function cargarVistaMatricula(data)
  {
    cargarDatosComunes(data);
  }

  function cargarVistaSolcitudes(data)
  {
    cargarDatosComunes(data);
  }

window.addEventListener("DOMContentLoaded", () => {
    handleObtainStudent();
  });

 