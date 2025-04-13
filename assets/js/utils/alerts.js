/**
 * Muestra una alerta de Bootstrap que desaparece tras 'duracion' milisegundos.
 *
 * @param {string} mensaje   - El texto de la alerta.
 * @param {string} [tipo]    - Clase de estilo de Bootstrap ('success', 'danger', 'warning', 'info', etc.).
 * @param {number} [duracion] - Tiempo en ms antes de que la alerta desaparezca (p.ej. 3000 = 3s).
 */
export function bootstrapAlert(mensaje, tipo = 'success', duracion = 3000) {
    // Creamos el contenedor de la alerta
    const alertaDiv = document.createElement('div');
    alertaDiv.classList.add('alert', `alert-${tipo}`, 'fade', 'show');
    alertaDiv.setAttribute('role', 'alert');
  
    // Insertamos el mensaje como texto
    alertaDiv.textContent = mensaje;
  
    // Buscamos el contenedor principal
    const contenedorAlertas = document.getElementById('alertas');
    if (!contenedorAlertas) {
      console.warn("No se encontró el contenedor '#alertas'");
      return;
    }
  
    // Agregamos la alerta al contenedor
    contenedorAlertas.appendChild(alertaDiv);
  
    // Programamos su eliminación tras 'duracion' milisegundos
    setTimeout(() => {
      alertaDiv.classList.remove('show');  // dispara la transición fade out
      alertaDiv.addEventListener('transitionend', () => {
        alertaDiv.remove(); // removemos del DOM cuando termina la animación
      });
    }, duracion);
  }
  