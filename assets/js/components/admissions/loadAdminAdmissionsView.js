//import { AdminAdmissionsComponents } from "./admissions-components/adminAdmissionsComponents.js";
import { adminAdmissionsPage } from "./admissions-views/admin-admissions-page.js";

export class AdminAdmissionsView{

    static loadAdminAdmissionsView(){

        let div = document.createElement("div");
        div.innerHTML = adminAdmissionsPage();
        document.getElementById("navbar").insertAdjacentElement("afterend", div);
    }
}