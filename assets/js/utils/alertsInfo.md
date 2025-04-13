Documentación del módulo de alertas centradas en la parte superior
Este módulo te permite mostrar notificaciones al estilo de Bootstrap, sin botón de cierre y que desaparecen automáticamente tras un tiempo configurable. Se mostrará en el centro (parte superior) de la pantalla.

1. Requisitos
Bootstrap 5+ (opcional, si quieres aprovechar la clase .alert, .fade, .show, etc.).

HTML con un contenedor para las alertas.


2. Integración 
Agrega un contenedor “fijo” en tu HTML, idealmente cerca del cierre de body:

<div id="alertas" 
     style="position: fixed; 
            top: 1rem; 
            left: 50%; 
            transform: translateX(-50%); 
            z-index: 9999;">
</div>
position: fixed; top: 1rem; left: 50%; transform: translateX(-50%);
hace que el contenedor esté en la parte superior y centrado horizontalmente.

z-index: 9999;
asegura que se muestre por encima de la mayoría de otros elementos.

3. Uso de la función
Cada vez que desees mostrar una notificación:

           mostrarAlertaBootstrap("Tu mensaje aquí", "success", 3000);

Primer parámetro (mensaje): Cadena de texto con el contenido de la alerta.
Segundo parámetro (tipo): Clases de alerta de Bootstrap:

    success (verde)

    danger (rojo)

    warning (amarillo/anaranjado)

    info (azul claro)

    primary, secondary, etc.

Tercer parámetro (duracion): Milisegundos antes de que se elimine la alerta (opcional, por defecto 3000ms = 3 segundos).


// Muestra una alerta verde durante 3s
    mostrarAlertaBootstrap("Solicitud aprobada correctamente", "success", 3000);

// Muestra una alerta roja durante 5s
    mostrarAlertaBootstrap("Error al procesar la solicitud", "danger", 5000);

// Si omites tipo y duración, tomará 'success' y 3000ms por defecto
    mostrarAlertaBootstrap("Cambios guardados correctamente");