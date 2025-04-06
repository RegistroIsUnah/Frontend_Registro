
/**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 */

export function noAspirant() {
    document.getElementById("nombre").value = "";
    document.getElementById("documento").value = "";

    document.querySelectorAll(".photoBox").forEach(box => {
        box.innerHTML = "<p style='text-align:center; color: gray;'>Sin documento</p>";
    });

    if (document.getElementById("modalSinAspirantes")) return;

    const modalHTML = `
        <div id="modalSinAspirantes" style="
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;">
            
            <div style="
                background: white;
                padding: 30px 40px;
                border-radius: 20px;
                width: 90%;
                max-width: 400px;
                text-align: center;
                animation: slideUp 0.4s ease;
                box-shadow: 0 0 20px rgba(0,0,0,0.3);">
                
                <h2>No hay más aspirantes por revisar</h2>
                <p style="margin-top: 10px;">Has finalizado todas las revisiones disponibles.</p>
                <button id="btnVolverAlPanel" style="
                    margin-top: 20px;
                    padding: 12px 24px;
                    background-color: #005daa;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 10px #005daa88;
                ">
                    Volver al panel
                </button>
            </div>
        </div>

        <style>
            @keyframes slideUp {
                from {
                    transform: translateY(60%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #btnVolverAlPanel:hover {
                background-color: #007bff;
                box-shadow: 0 0 20px #007bff;
                transform: scale(1.05);
            }
        </style>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    document.getElementById("btnVolverAlPanel").addEventListener("click", () => {
        window.location.href = "panel.php";
    });
  
   
}