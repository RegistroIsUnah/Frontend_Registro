import { docenteView } from "./docente-page.js";
import { loadMenu } from "../../utils/menu.js";


export function loadDocentePage(){
    history.pushState({ view: "docenteView" }, "", window.location.href);


    const body = document.getElementsByTagName("body")[0];
    const DocenteContainer = document.createElement('div');
    DocenteContainer.innerHTML = docenteView;
    
    body.insertBefore(DocenteContainer, body.firstChildChild);

    const menuContainer = DocenteContainer.querySelector('#menuContainer');
    if (menuContainer) {
        menuContainer.innerHTML = loadMenu();
    }
    

} 

