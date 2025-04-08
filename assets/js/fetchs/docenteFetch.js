export class DocenteFetch {

    static getClasesDocente(docenteId) {
        return fetch(`${ConstValues.DOMAIN_NAME}/get/clases_docente_act.php?docenteId=${docenteId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
        
            .catch(error => {
                console.error("Error en la solicitud:", error);
                return [];
            });
    }

}