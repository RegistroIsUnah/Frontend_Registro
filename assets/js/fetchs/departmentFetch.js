import { ConstValues } from "../utils/constValues.js";

class DepartmentFetch{

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

    static getAllDepartments(){

        fetch(`${ConstValues.DOMAIN_NAME}/get/departamentos.php`)
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