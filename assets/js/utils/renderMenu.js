//Para cargar el menu 
import {loadMenu} from "../utils/menu.js"

export function renderMenu(container) {
    const menuContainer = container.querySelector('#menuContainer');
    if (menuContainer) {
        menuContainer.innerHTML = loadMenu();
    }
    if (typeof initMenuToggle === "function") {
        initMenuToggle();
    }
}