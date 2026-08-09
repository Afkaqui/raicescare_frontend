import { API_BASE_URL } from "../cta/tracking";

/**
 * Cliente del back-office.
 *
 * Todo va con `credentials: "include"`: la sesión vive en una cookie del
 * dominio y la API está en otro subdominio, así que sin esto el navegador no
 * la manda y toda petición saldría 401.
 */

export class SesionExpirada extends Error {
  constructor() {
    super("La sesión venció");
    this.name = "SesionExpirada";
  }
}

async function pedir<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(`${API_BASE_URL}/api/v1${ruta}`, {
    ...opciones,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opciones.headers },
  });

  if (respuesta.status === 401) throw new SesionExpirada();

  if (!respuesta.ok) {
    const datos = (await respuesta.json().catch(() => null)) as {
      message?: string | { message?: string }[];
    } | null;
    const mensaje = Array.isArray(datos?.message)
      ? (datos.message[0]?.message ?? "Petición rechazada")
      : (datos?.message ?? `Error ${respuesta.status}`);
    throw new Error(mensaje);
  }

  return respuesta.json() as Promise<T>;
}

export const api = {
  yo: () => pedir<{ usuario: Actor }>("/auth/me"),
  salir: () => pedir<{ cerrada: boolean }>("/auth/logout", { method: "POST" }),
  resumen: () => pedir<Resumen>("/backoffice/resumen"),
  bandeja: (parametros: URLSearchParams) =>
    pedir<Bandeja>(`/backoffice/requests?${parametros.toString()}`),
  expediente: (id: string) => pedir<Expediente>(`/backoffice/requests/${id}`),
  transicionar: (id: string, cuerpo: Transicion) =>
    pedir<{ trackingCode: string; previousStatus: string; status: string }>(
      `/requests/${id}/status-transitions`,
      { method: "POST", body: JSON.stringify(cuerpo) },
    ),
};

export type Actor = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export type Resumen = {
  porEstado: Record<string, number>;
  porTipo: Record<string, number>;
  abiertos: number;
  sinAsignar: number;
};

export type FilaBandeja = {
  id: string;
  trackingCode: string;
  requestType: string;
  category: string | null;
  status: string;
  submittedAt: string;
  asignado: boolean;
  solicitante: string | null;
  pago: { amount: string; currency: string; status: string } | null;
};

export type Bandeja = {
  total: number;
  pagina: number;
  paginas: number;
  filas: FilaBandeja[];
};

export type Transicion = {
  newStatus: string;
  publicComment?: string;
  internalComment?: string;
  reasonCode?: string;
};

export type Expediente = {
  id: string;
  trackingCode: string;
  requestType: string;
  category: string | null;
  source: string | null;
  status: string;
  submittedAt: string;
  closedAt: string | null;
  formData: Record<string, unknown> | null;
  persona: {
    fullName: string;
    email: string | null;
    phone: string | null;
    country: string | null;
  } | null;
  organizacion: {
    legalName: string;
    organizationType: string | null;
    registrationNumber: string | null;
    website: string | null;
  } | null;
  historial: {
    newStatus: string;
    previousStatus: string | null;
    publicComment: string | null;
    internalComment: string | null;
    changedAt: string;
    autor: { fullName: string; role: string } | null;
  }[];
  consentimientos: {
    consentType: string;
    policyVersion: string;
    accepted: boolean;
    acceptedAt: string | null;
  }[];
  pagos: {
    amount: string;
    currency: string;
    status: string;
    statusDetail: string | null;
    paymentTypeId: string | null;
    payerEmail: string | null;
    approvedAt: string | null;
  }[];
  suscripcion: {
    amount: string;
    currency: string;
    frequency: number;
    status: string;
    nextPaymentDate: string | null;
  } | null;
  interaccion: {
    ctaCode: string;
    visibleLabel: string;
    sourcePage: string;
    sourceSection: string;
    occurredAt: string;
  } | null;
};

// ------------------------------------------------------------- etiquetas

export const ETIQUETA_ESTADO: Record<string, string> = {
  received: "Recibida",
  automatic_validation: "Validación automática",
  under_review: "En revisión",
  additional_information_requested: "Información solicitada",
  eligible: "Elegible",
  not_eligible: "No elegible",
  in_process: "En proceso",
  closed: "Cerrada",
};

export const ETIQUETA_TIPO: Record<string, string> = {
  contribution: "Aporte",
  participation_application: "Participación",
  alliance_proposal: "Alianza",
  initiative_assessment: "Iniciativa",
  institutional_meeting: "Reunión",
};

/** Espeja las transiciones que el backend permite; él vuelve a validarlas. */
export const TRANSICIONES: Record<string, string[]> = {
  received: ["automatic_validation", "under_review", "closed"],
  automatic_validation: [
    "under_review",
    "additional_information_requested",
    "not_eligible",
    "in_process",
    "closed",
  ],
  under_review: [
    "additional_information_requested",
    "eligible",
    "not_eligible",
    "in_process",
  ],
  additional_information_requested: ["under_review", "closed"],
  eligible: ["in_process", "closed"],
  not_eligible: ["closed"],
  in_process: ["closed"],
  closed: [],
};

export const COLOR_ESTADO: Record<string, string> = {
  received: "bg-blue-50 text-blue-800 border-blue-200",
  automatic_validation: "bg-cyan-50 text-cyan-800 border-cyan-200",
  under_review: "bg-amber-50 text-amber-900 border-amber-300",
  additional_information_requested:
    "bg-orange-50 text-orange-900 border-orange-300",
  eligible: "bg-green-50 text-green-800 border-green-300",
  not_eligible: "bg-red-50 text-red-800 border-red-200",
  in_process: "bg-violet-50 text-violet-800 border-violet-200",
  closed: "bg-gray-100 text-gray-700 border-gray-300",
};

export function fechaCorta(valor: string): string {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function fechaHora(valor: string): string {
  return new Date(valor).toLocaleString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function importe(monto: string, moneda: string): string {
  return `${moneda === "USD" ? "US$" : "S/"} ${Number(monto).toFixed(2)}`;
}
