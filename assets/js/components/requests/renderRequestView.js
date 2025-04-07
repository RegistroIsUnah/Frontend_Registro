import { genericCardView } from "./request-views/defaultRequestView.js";
import { ConstValues } from "../../utils/constValues.js";

export class RenderRequestView {
    static loadAndRenderChangeCareer() {
        RenderRequestView.fetchAndRender("CAMBIO_CARRERA", RenderRequestView.renderRequestChangeCareerView);
    }

    static loadAndRenderChangeCenter() {
        RenderRequestView.fetchAndRender("CAMBIO_CENTRO", RenderRequestView.renderRequestChangeCenterView);
    }
    
    static loadAndRenderCancelClass() {
        RenderRequestView.fetchAndRender("CANCELACION_EXCEPCIONAL", RenderRequestView.renderRequestCancelClassView);
    }
    static fetchAndRender(tipo, renderFn) {
        const url = `${ConstValues.DOMAIN_NAME}/get/obtener_solicitud.php?tipo=${tipo}`;
        fetch(url)
            .then(res => res.json())
            .then(solicitudes => {
                console.log("Solicitudes recibidas:", solicitudes); 
                renderFn(solicitudes);
            })
            .catch(err => {
                console.error("Error al obtener solicitudes:", err);
            });
    }

    static renderRequestChangeCareerView(solicitudes) {
        this.renderCards(solicitudes);
    }

    static renderRequestChangeCenterView(solicitudes) {
        this.renderCards(solicitudes);
    }

    static renderRequestCancelClassView(solicitudes) {
        this.renderCards(solicitudes);
    }

    static renderCards(solicitudes) {
        const contenedor = document.getElementById("contenedor-solicitudes");
        contenedor.innerHTML = "";

        solicitudes.forEach(solicitud => {
            const cardHTML = genericCardView({
                title: `Aspirante: ${solicitud.estudiante_nombre} ${solicitud.estudiante_apellido}`,
                subtitle: `Tipo: ${solicitud.tipo_solicitud.replace("_", " ")}`,
                description: `Fecha: ${solicitud.fecha_solicitud} | Estado: ${solicitud.estado_solicitud}`,
                items: [`ID estudiante: ${solicitud.estudiante_id}`],
                tags: [solicitud.estado_solicitud],
                onClick: `verPDF('http://localhost/Proyecto_IS802/Backend_Registro/archivos/solicitudes/${solicitud.archivo_pdf}')`,
                extraHTML: `<button onclick="revisarSolicitud(${solicitud.solicitud_id})" class="btn btn-primary mt-2">Revisar</button>`
            });

            contenedor.innerHTML += cardHTML;
        });
    }
}
