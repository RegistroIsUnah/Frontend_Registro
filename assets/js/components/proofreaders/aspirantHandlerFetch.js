

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.5
 * @since 2025/03/19
 */


import { ConstValues } from "../../utils/constValues.js";
import { getAdmissionsDataRequest } from "./proofReaderContent.js";

export function aspirantHandler(aspiranteId) {
  let accion = null;
  let motivosSeleccionados = [];

  const validarBtn = document.getElementById("validarBtn");
  const corregirMenu = document.querySelectorAll(".dropdown-menu .dropdown-item");
  const denegarBtn = document.getElementById("denegarBtn");
  const enviarBtn = document.getElementById("enviarYcargar");

  if (!validarBtn || corregirMenu.length === 0 || !denegarBtn || !enviarBtn) {
    console.warn("Algunos botones no se encontraron en el DOM.");
    return;
  }

  // Limpia eventos anteriores (opcional si haces una sola carga del DOM base)
  validarBtn.onclick = () => {
    accion = "aceptar";
    motivosSeleccionados = [];
    enviarBtn.disabled = false;

    validarBtn.classList.replace("btn-outline-success", "btn-success");
    denegarBtn.classList.replace("btn-danger", "btn-outline-danger");
  };

  corregirMenu.forEach(item => {
    item.onclick = (e) => {
      const motivoId = parseInt(e.target.dataset.motivoId);

      if (motivosSeleccionados.includes(motivoId)) {
        motivosSeleccionados = motivosSeleccionados.filter(id => id !== motivoId);
        e.target.classList.remove("active");
      } else {
        motivosSeleccionados.push(motivoId);
        e.target.classList.add("active");
      }

      if (motivosSeleccionados.length > 0) {
        accion = "rechazar";
        enviarBtn.disabled = false;

        denegarBtn.classList.replace("btn-outline-danger", "btn-danger");
        validarBtn.classList.replace("btn-success", "btn-outline-success");
      } else {
        enviarBtn.disabled = true;
      }
    };
  });

  enviarBtn.onclick = async () => {
    const aspirante_id = Number(aspiranteId);
    const revisor_id = Number(sessionStorage.getItem("revisor_id"));

    if (!aspirante_id || !revisor_id) {
      alert("Faltan datos del aspirante o revisor.");
      return;
    }

    if (accion === "rechazar" && motivosSeleccionados.length === 0) {
      alert("Selecciona al menos un motivo antes de enviar.");
      return;
    }

    const formBody = new URLSearchParams();
    formBody.append("aspirante_id", aspirante_id);
    formBody.append("revisor_id", revisor_id);
    formBody.append("accion", accion);
    if (accion === "rechazar") {
      formBody.append("motivos", JSON.stringify(motivosSeleccionados));
    }

    try {
      const response = await fetch(`${ConstValues.DOMAIN_NAME}/post/procesar_revision_aspirante.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      const result = await response.json();
      console.log("Revisión enviada:", result);

      // Reset visual
      accion = null;
      motivosSeleccionados = [];
      enviarBtn.disabled = true;
      denegarBtn.disabled = true;

      corregirMenu.forEach(item => item.classList.remove("active"));
      validarBtn.classList.replace("btn-success", "btn-outline-success");
      denegarBtn.classList.replace("btn-danger", "btn-outline-danger");

      // Cargar siguiente aspirante
      getAdmissionsDataRequest();

    } catch (error) {
      console.error("Error al enviar revisión:", error);
    }
  };
}
