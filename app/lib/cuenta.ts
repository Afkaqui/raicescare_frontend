import { API_BASE_URL } from "./cta/tracking";

/**
 * Cliente de la cuenta de aportante.
 *
 * Separado del cliente del back-office a propósito: son dos sesiones distintas,
 * con cookies distintas, y no deben poder confundirse en el código como no
 * pueden confundirse en la base.
 */

/**
 * La API indica que esas credenciales pertenecen a otra puerta.
 *
 * Solo se emite cuando la contraseña resultó correcta contra la otra tabla, así
 * que no revela qué cuentas existen: quien lo recibe ya conocía la clave.
 */
export class PuertaEquivocada extends Error {
  constructor(
    mensaje: string,
    readonly destino: string,
  ) {
    super(mensaje);
    this.name = "PuertaEquivocada";
  }
}

export type Aportante = {
  id: string;
  email: string;
  fullName: string;
  verificado: boolean;
};

export type Aporte = {
  trackingCode: string;
  modalidad: string | null;
  estado: string;
  fecha: string;
  destino: string | null;
  pago: {
    amount: string;
    currency: string;
    status: string;
    approvedAt: string | null;
    paymentTypeId: string | null;
  } | null;
  suscripcion: {
    amount: string;
    currency: string;
    frequency: number;
    status: string;
    nextPaymentDate: string | null;
  } | null;
};

export type Historial = {
  total: number;
  sumaPorMoneda: Record<string, number>;
  aportes: Aporte[];
};

async function pedir<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(`${API_BASE_URL}/api/v1${ruta}`, {
    ...opciones,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opciones.headers },
  });

  if (!respuesta.ok) {
    const datos = (await respuesta.json().catch(() => null)) as {
      message?: string | { message?: string }[];
      destino?: string;
    } | null;
    const mensaje = Array.isArray(datos?.message)
      ? (datos.message[0]?.message ?? "Petición rechazada")
      : (datos?.message ?? `Error ${respuesta.status}`);

    if (respuesta.status === 409 && datos?.destino) {
      throw new PuertaEquivocada(mensaje, datos.destino);
    }
    throw new Error(mensaje);
  }

  return respuesta.json() as Promise<T>;
}

export const cuenta = {
  registrar: (datos: {
    email: string;
    fullName: string;
    password: string;
    phone?: string;
    country?: string;
  }) =>
    pedir<{ registrado: boolean }>("/donors/register", {
      method: "POST",
      body: JSON.stringify(datos),
    }),
  verificar: (token: string) =>
    pedir<{ verificado: boolean }>("/donors/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),
  entrar: (email: string, password: string) =>
    pedir<{ aportante: Aportante }>("/donors/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  salir: () => pedir<{ cerrada: boolean }>("/donors/logout", { method: "POST" }),
  yo: () => pedir<{ aportante: Aportante | null }>("/donors/me"),
  recuperar: (email: string) =>
    pedir<{ mensaje: string }>("/donors/recovery", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  definirClave: (token: string, password: string) =>
    pedir<{ definida: boolean }>("/donors/password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    }),
  misAportes: () => pedir<Historial>("/donors/me/contributions"),
};

export const ETIQUETA_ESTADO_APORTE: Record<string, string> = {
  received: "Pendiente de pago",
  automatic_validation: "Confirmando",
  in_process: "Activo",
  closed: "Completado",
  not_eligible: "No procesado",
};

export function importeAporte(monto: string, moneda: string): string {
  return `${moneda === "USD" ? "US$" : "S/"} ${Number(monto).toFixed(2)}`;
}

export function fechaAporte(valor: string): string {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const LARGO_MINIMO_CLAVE = 12;
