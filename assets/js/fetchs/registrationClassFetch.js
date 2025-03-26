import { ConstValues } from "../utils/constValues.js";

class RegistrationClassFetch{

    static getRegistrableClasses(departamentId, studentId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/listar_clases_matriculables?
                                        departamento_id=${departamentId}&estudiante_id=${studentId}`)
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

    static getClassLabs(classId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/listar_laboratorios_clase?clase_id=${classId}`)
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