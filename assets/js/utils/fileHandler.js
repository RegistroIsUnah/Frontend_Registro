
 /**
 * @author danielpalacios@unah.hn
 * @version 0.0.1
 */


 export function fetchFile(folder, filename) 
 {
   async function fetchFile(folder, filename) {
     try {
       const response = await fetch(`${ConstValues.DOMAIN_NAME_UPLOAD}/${folder}/${filename}`);
   
       if (!response.ok) {
         throw new Error(`Error al obtener el archivo: ${response.status}`);
       }
   
       const contentType = response.headers.get("Content-Type");
       const blob = await response.blob();
   
       const fileURL = URL.createObjectURL(blob);
   
       if (contentType.includes("image")) {
         const img = document.createElement("img");
         img.src = fileURL;
         img.alt = filename;
         img.style.maxWidth = "100%";
         document.body.appendChild(img);
       } 
       else if (contentType.includes("pdf")) {
         const iframe = document.createElement("iframe");
         iframe.src = fileURL;
         iframe.width = "100%";
         iframe.height = "600px";
         document.body.appendChild(iframe);
       } 
       else {
         const link = document.createElement("a");
         link.href = fileURL;
         link.download = filename;
         document.body.appendChild(link);
         link.click();
         link.remove();
       }
   
     } catch (error) {
       console.error("Error:", error);
     }
   }
 
 }
 
 export function renderFilePreview(container, fileUrl, fileType = null) {
   if (!container || !fileUrl) return;
 
   // Limpiar contenido previo
   container.innerHTML = "";
 
   // Detectar tipo desde extensión si no se pasa explícito
   const extension = fileUrl.split(".").pop().toLowerCase();
 
   if (!fileType) {
     if (["jpg", "jpeg", "png", "webp", "avif", "tiff"].includes(extension)) {
       fileType = "image";
     } else if (extension === "pdf") {
       fileType = "pdf";
     } else {
       fileType = "other";
     }
   }
 
   if (fileType === "image") {
     const img = document.createElement("img");
     img.src = fileUrl;
     img.alt = "Vista previa";
     img.style.width = "100%";
     img.style.height = "100%";
     img.style.objectFit = "cover";
     img.style.cursor = "pointer";
     img.onclick = () => window.open(fileUrl, "_blank");
     container.appendChild(img);
   } 
   else if (fileType === "pdf") {
     const iframe = document.createElement("iframe");
     iframe.src = fileUrl;
     iframe.width = "100%";
     iframe.height = "200px";
     iframe.style.cursor = "pointer";
     iframe.onclick = () => window.open(fileUrl, "_blank");
     container.appendChild(iframe);
   } 
   else {
     const link = document.createElement("a");
     link.href = fileUrl;
     link.textContent = "Ver Archivo";
     link.target = "_blank";
     container.appendChild(link);
   }
 }
 
 