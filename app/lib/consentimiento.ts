/**
 * Consentimiento de medición.
 *
 * El Reglamento aprobado por D.S. N.° 016-2024-JUS trata los identificadores en
 * línea como dato personal. La medición no es necesaria para que el sitio
 * funcione, así que arranca apagada y solo se enciende con una decisión
 * expresa. El silencio no cuenta como aceptación.
 */

export const CLAVE_CONSENTIMIENTO = "raicescare_consentimiento";
export const VERSION_CONSENTIMIENTO = "v1-2026-08";

export interface Consentimiento {
  medicion: boolean;
  version: string;
  fecha: string;
}

/** Avisa a la pestaña actual; el resto del árbol reacciona sin recargar. */
export const EVENTO_CONSENTIMIENTO = "raicescare:consentimiento";

export function leerConsentimiento(): Consentimiento | null {
  if (typeof window === "undefined") return null;
  try {
    const crudo = window.localStorage.getItem(CLAVE_CONSENTIMIENTO);
    if (!crudo) return null;

    const guardado = JSON.parse(crudo) as Partial<Consentimiento>;
    if (typeof guardado.medicion !== "boolean") return null;

    // Una versión distinta obliga a preguntar de nuevo: el texto cambió y el
    // consentimiento se dio sobre el anterior.
    if (guardado.version !== VERSION_CONSENTIMIENTO) return null;

    return guardado as Consentimiento;
  } catch {
    return null;
  }
}

export function guardarConsentimiento(medicion: boolean): void {
  if (typeof window === "undefined") return;

  const decision: Consentimiento = {
    medicion,
    version: VERSION_CONSENTIMIENTO,
    fecha: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify(decision));
    // Al rechazar se borra lo que hubiera quedado de antes: negarse debe
    // limpiar, no solo dejar de sumar.
    if (!medicion) {
      window.localStorage.removeItem("raicescare_anonymous_id");
      window.sessionStorage.removeItem("raicescare_session_id");
    }
  } catch {
    // Sin almacenamiento la decisión vale solo para esta página.
  }

  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO));
}

/** Sin decisión explícita, la respuesta es no. */
export function hayConsentimientoDeMedicion(): boolean {
  return leerConsentimiento()?.medicion === true;
}
