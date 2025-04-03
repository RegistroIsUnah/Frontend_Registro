<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modal Example</title>
    <style>
        /* Estilos para la modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Contenido de la página</h1>
    <p>Este es el contenido principal de la página.</p>

    <script>
        // Función que devuelve el HTML de la modal
        function successModal() {
            return `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h2>¡Éxito!</h2>
                        <p>La operación se completó correctamente.</p>
                        <button id="closeModalButton">Cerrar</button>
                    </div>
                </div>
            `;
        }

        // Crear y agregar la modal al DOM
        let modal = successModal();
        let divModal = document.createElement("div");
        divModal.innerHTML = modal;
        document.body.appendChild(divModal);

        // Cerrar la modal al hacer clic en el botón
        document.getElementById("closeModalButton").addEventListener("click", function () {
            document.body.removeChild(divModal);
        });
    </script>
</body>
</html>