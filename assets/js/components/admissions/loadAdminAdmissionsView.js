import { AdminAdmissionsComponents } from "./admissions-components/adminAdmissionsComponents.js";
import { adminAdmissionsPage } from "./admissions-views/admin-admissions-page.js";
import { renderMenu } from "../../utils/renderMenu.js";

export class AdminAdmissionsView{

    static loadAdminAdmissionsView(){

        let div = document.createElement("div");
        div.innerHTML = adminAdmissionsPage();
        document.getElementById("navbar").insertAdjacentElement("afterend", div);
        renderMenu(document.querySelector("#mainContent"));
        document.getElementById("sendApplicantsCalificationsButton").addEventListener("click", () => AdminAdmissionsComponents.loadApplicantsCalificationsForm());
        document.getElementById("aprovedApplicantsRegisterButton").addEventListener("click", () => AdminAdmissionsComponents.loadApprovedApplicantsRegisterForm());
        document.getElementById("downloadCsvApprovedApplicants").addEventListener("click", () => AdminAdmissionsComponents.downloadApprovedApplicantsCsv());
    }
}