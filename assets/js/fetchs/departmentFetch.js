import { ConstValues } from "../utils/constValues.js";

export class DepartmentFetch{

    static getClassesSectionsByDepartment(departmentId, year, period){

        fetch(`${ConstValues.DOMAIN_NAME}/get/clases_departamento.php?
                                        departamentoId=${departmentId}&anio=${year}&periodo=${period}`)
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

    static getDepartmentClasses(departmentId){

        fetch(`${ConstValues.DOMAIN_NAME}/get/clases.php?dept_id${departmentId}`)
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

    /**
     * @author estiven.mejia@unah.hn
     * @version 0.0.1
     * @since 2025/04/01
     * 
     * @returns 
     * 
     * Esta función devuelve todos los departamentos del sistema.
     */
    static getAllDepartments(){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/departamentos.php`)
        .then(response => response.json())
        .then(data => {
         
            if(data.error){
                return "Ha ocurrido un problema: " + data.error;
            }else{
                return data;
            }
        })
        .catch(error => {
            console.log("error en la solicitud"+ error);
        })
    }
}