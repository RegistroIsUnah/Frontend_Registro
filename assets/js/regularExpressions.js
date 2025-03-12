/**
 * @author estiven.mejia@unah.hn
 * @version 0.0.1
 * @since 2025/03/11
 */
export class RegularExpressions{

    static SPECIAL_CHARACTERS = /[<>={}[\]\/\\;:'"(),`~!$%^&*+?]/g;

    static F_NAME = /^([A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+\s?){1,4}$/
    static L_NAME = /^([A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+)(\s[A-Za-zÁÉÍÓÚÄËÏÖÜáéíóúäëïöü][a-záéíóúäëïöü]+){1}$/;
    static DNI = /^\d{13}$/;
    static PHONE_NUMBER = /^(\(?\+?504\)?)?\s*[2983]\d{3}[- ]?\d{4}$/;
    static EMAIL = /^([A-Za-z0-9]+([._-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?)$/;
    
}
