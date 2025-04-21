
import { ConstValues } from "../utils/constValues.js"; 

document.addEventListener("DOMContentLoaded", () => {
  const form     = document.getElementById("resetForm");
  const feedback = document.getElementById("resetMessage");

  if (!form || !feedback) {
    console.error("No se encontró #resetForm o #resetMessage");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    if (!email) {
      showMsg("⚠️ Ingresa tu correo electrónico.", "red");
      return;
    }

    try {
      const resp = await fetch(
        `${ConstValues.DOMAIN_NAME}/post/request_password_reset.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );
      const data = await resp.json();

      if (resp.ok && data.success) {
        showMsg(
          "Si el correo existe, se envió un enlace de restablecimiento.",
          "green"
        );
        form.reset();
      } else {
        showMsg(
          data.message ?? "No se pudo procesar la solicitud.",
          "red"
        );
      }
    } catch (err) {
      console.error(err);
      showMsg("Error de red o servidor. Intenta de nuevo.", "red");
    }
  });

  function showMsg(text, color) {
    feedback.textContent = text;
    feedback.style.color = color;
  }
});
