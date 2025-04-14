import { ConstValues } from "../utils/constValues.js";
import { messageAlert } from "../components/modals/modals.js";

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

    static getProffesorsByDeptId(deptId){

        return fetch(`${ConstValues.DOMAIN_NAME}/get/listar_docentes_departamento.php?dept_id=${deptId}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.log("error en la solicitud"+ error);
        })
    }

    static createSection(formData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/crear_seccion.php`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if(!response.ok){
                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error: ", error);
        return { success: false };
        });
    }

    static editSection(formData){

        return fetch(`${ConstValues.DOMAIN_NAME}/post/modificar_seccion.php`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if(!response.ok){
                
                let divModal = document.createElement("div");
                divModal.innerHTML = messageAlert("bg-danger", "Ha ocurrido un problema interno de servidor.");
                document.body.appendChild(divModal);
                let successModalInstance = new bootstrap.Toast(document.getElementById('messageAlert'));
                successModalInstance.show(); 
                setTimeout(() => divModal.remove(), 3500);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error: ", error);
        return { success: false };
        });
    }

}