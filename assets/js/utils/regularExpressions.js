/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/11
 * 
 * Regular expressions to use in all the Frontend project.
 */
export class RegularExpressions{

    static SPECIAL_CHARACTERS = /[<>={}[\]\\;:'"(),`~!$%^&*+?]/g;

    static F_NAME = /^([A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+\s?){1,4}$/
    static L_NAME = /^([A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+)(\s[A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+){1}$/;
    static DNI = /^(0[1-9]|[1][0-8])(0[1-9]|[12][0-9])(19[4-9][0-9]|2[01][0-9]{2})\d{5}$/;
    static PHONE_NUMBER = /^(\(?\+?504\)?)?\s*[2983]\d{3}[- ]?\d{4}$/;
    static EMAIL = /^([A-Za-z0-9]+([._-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?)$/;    

    static BOOK_TITLE = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s\-,;:!?¿¡."'\(\)]{3,}$/;
    static DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    static DESCRIPTION = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s\-,;:!?¿¡."'\(\)]{3,200}$/
    static AUTHOR_NAME = /^([a-záéíóúñüÁÉÍÓÚÑÜ\s'-]+)\s+([a-záéíóúñüÁÉÍÓÚÑÜ\s'.-]+)$/;
}
