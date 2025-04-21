import { ConstValues } from "../utils/constValues.js";

/**
 * @author danielpalacios@unah.hn
 * @version 0.0.2
 * @since 2025‑04‑20
 */

export class StudentClassFetch {
  static async getClasesEstudiante(estudianteId) {
    const url = `${ConstValues.DOMAIN_NAME}/get/clases_estudiante_act.php?estudianteId=${estudianteId}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

    return res.json();      // { data: [...] }
  }
}
