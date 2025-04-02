import { ConstValues } from "../utils/constValues.js";

class ClassFetch{

    static getSectionsByClassId(classId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/secciones.php?clase_id=${classId}`)
        .then(response => {
            if (!response.ok){
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("error en la solicitud");
        })
    }

    

    


}