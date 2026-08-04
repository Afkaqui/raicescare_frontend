/**
 * Trazabilidad de CTA — Fase 1.
 *
 * Cada interacción genera un identificador y se envía al backend. El registro
 * nunca debe impedir la navegación: se usa sendBeacon y cualquier fallo se
 * ignora silenciosamente.
 */

const CLAVE_SESION = "raicescare_session_id";
const CLAVE_ANONIMO = "raicescare_anonymous_id";

export interface CtaEvent {
  ctaId: string;
  ctaLabel: string;
  location: string;
  destination: string;
  sourcePage: string;
  campaign?: string;
  sessionId: string;
  anonymousUserId: string;
  interactionId: string;
  timestamp: string;
}

function nuevoId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

function idPersistente(clave: string, almacen: Storage | null): string {
  if (!almacen) return nuevoId();
  try {
    const guardado = almacen.getItem(clave);
    if (guardado) return guardado;
    const generado = nuevoId();
    almacen.setItem(clave, generado);
    return generado;
  } catch {
    // Modo privado o almacenamiento bloqueado: el id vive solo en memoria.
    return nuevoId();
  }
}

/** Id de sesión: se renueva al cerrar la pestaña. */
export function obtenerSessionId(): string {
  if (typeof window === "undefined") return "";
  return idPersistente(CLAVE_SESION, window.sessionStorage);
}

/** Id anónimo: persiste entre visitas. No contiene datos personales. */
export function obtenerAnonymousId(): string {
  if (typeof window === "undefined") return "";
  return idPersistente(CLAVE_ANONIMO, window.localStorage);
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const RUTA_EVENTOS = "/api/v1/events/cta";

/**
 * Registra el clic. Devuelve el interactionId para que el proceso destino
 * pueda conservar la trazabilidad hasta el cierre del expediente.
 */
export function trackCtaEvent(
  datos: Omit<
    CtaEvent,
    "sessionId" | "anonymousUserId" | "interactionId" | "timestamp"
  >,
): string {
  const interactionId = nuevoId();

  if (typeof window === "undefined") return interactionId;

  const evento: CtaEvent = {
    ...datos,
    sessionId: obtenerSessionId(),
    anonymousUserId: obtenerAnonymousId(),
    interactionId,
    timestamp: new Date().toISOString(),
  };

  // Capa 1: dataLayer para GA4, si existe.
  const ventana = window as Window & { dataLayer?: unknown[] };
  ventana.dataLayer?.push({ event: "cta_click", ...evento });

  // Capa 2: registro propio. Sin API configurada no se intenta el envío.
  if (!API_BASE) return interactionId;

  const url = `${API_BASE}${RUTA_EVENTOS}`;
  const cuerpo = JSON.stringify(evento);

  try {
    if (navigator.sendBeacon) {
      // text/plain evita el preflight CORS: sendBeacon no puede completarlo de
      // forma fiable. El backend acepta este content-type y lo parsea como JSON.
      navigator.sendBeacon(
        url,
        new Blob([cuerpo], { type: "text/plain;charset=UTF-8" }),
      );
    } else {
      void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: cuerpo,
        keepalive: true,
      }).catch(() => undefined);
    }
  } catch {
    // La analítica nunca bloquea la navegación.
  }

  return interactionId;
}
