/**
 * Catálogo único de CTA — Fase 1 de la arquitectura.
 *
 * Regla estructural: 12 CTA funcionales y 5 enlaces de verificación. Los
 * botones con texto contextual NO son procesos nuevos: reutilizan uno de los
 * 12 códigos con parámetros distintos (ver CTA_CONTEXTUALES).
 */

export type FunctionalCtaCode =
  | "DONATE_ENTRY"
  | "VIEW_PROGRAMS"
  | "VIEW_HEALTH_CAMPAIGNS"
  | "VIEW_EDUCATION_INITIATIVES"
  | "VIEW_ENVIRONMENT_PROJECTS"
  | "VIEW_PARTICIPATION_OPPORTUNITIES"
  | "PROPOSE_ALLIANCE"
  | "EVALUATE_INITIATIVE"
  | "REQUEST_INSTITUTIONAL_MEETING"
  | "START_RECURRING_CONTRIBUTION"
  | "START_SINGLE_CONTRIBUTION"
  | "VIEW_TRANSPARENCY";

export type CtaProcessType =
  | "navigation"
  | "contribution"
  | "participation"
  | "alliance"
  | "initiative_evaluation"
  | "institutional_meeting"
  | "transparency";

export type CtaVariant = "primary" | "secondary" | "informational";

export type CtaAnalyticsCategory = "conversion" | "engagement" | "verification";

export interface CtaDefinition {
  code: FunctionalCtaCode;
  label: string;
  destination: string;
  processType: CtaProcessType;
  variant: CtaVariant;
  defaultParams?: Record<string, string>;
  analyticsCategory: CtaAnalyticsCategory;
}

export const CTA_REGISTRY: Record<FunctionalCtaCode, CtaDefinition> = {
  DONATE_ENTRY: {
    code: "DONATE_ENTRY",
    label: "Donar ahora",
    destination: "/aportes",
    processType: "contribution",
    variant: "primary",
    analyticsCategory: "conversion",
  },
  VIEW_PROGRAMS: {
    code: "VIEW_PROGRAMS",
    label: "Conocer nuestros programas",
    destination: "/programas",
    processType: "navigation",
    variant: "secondary",
    analyticsCategory: "engagement",
  },
  VIEW_HEALTH_CAMPAIGNS: {
    code: "VIEW_HEALTH_CAMPAIGNS",
    label: "Conocer campañas activas",
    destination: "/programas/salud-y-cuidado/campanas",
    processType: "navigation",
    variant: "primary",
    defaultParams: { status: "active" },
    analyticsCategory: "engagement",
  },
  VIEW_EDUCATION_INITIATIVES: {
    code: "VIEW_EDUCATION_INITIATIVES",
    label: "Conocer iniciativas educativas",
    destination: "/programas/semillas-de-educacion/iniciativas",
    processType: "navigation",
    variant: "primary",
    analyticsCategory: "engagement",
  },
  VIEW_ENVIRONMENT_PROJECTS: {
    code: "VIEW_ENVIRONMENT_PROJECTS",
    label: "Conocer proyectos ambientales",
    destination: "/programas/bio-amazonia/proyectos",
    processType: "navigation",
    variant: "primary",
    analyticsCategory: "engagement",
  },
  VIEW_PARTICIPATION_OPPORTUNITIES: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Ver oportunidades de participación",
    destination: "/participa",
    processType: "participation",
    variant: "primary",
    analyticsCategory: "conversion",
  },
  PROPOSE_ALLIANCE: {
    code: "PROPOSE_ALLIANCE",
    label: "Proponer una alianza",
    destination: "/alianzas/proponer",
    processType: "alliance",
    variant: "secondary",
    analyticsCategory: "conversion",
  },
  EVALUATE_INITIATIVE: {
    code: "EVALUATE_INITIATIVE",
    label: "Evaluar mi iniciativa",
    destination: "/iniciativas/evaluacion",
    processType: "initiative_evaluation",
    variant: "primary",
    analyticsCategory: "conversion",
  },
  REQUEST_INSTITUTIONAL_MEETING: {
    code: "REQUEST_INSTITUTIONAL_MEETING",
    label: "Solicitar una reunión institucional",
    destination: "/empresas/reunion",
    processType: "institutional_meeting",
    variant: "primary",
    analyticsCategory: "conversion",
  },
  START_RECURRING_CONTRIBUTION: {
    code: "START_RECURRING_CONTRIBUTION",
    label: "Realizar un aporte mensual",
    destination: "/aportes",
    processType: "contribution",
    variant: "primary",
    defaultParams: { type: "recurring", program: "sembrador-futuro" },
    analyticsCategory: "conversion",
  },
  START_SINGLE_CONTRIBUTION: {
    code: "START_SINGLE_CONTRIBUTION",
    label: "Realizar un aporte único",
    destination: "/aportes",
    processType: "contribution",
    variant: "primary",
    defaultParams: { type: "single" },
    analyticsCategory: "conversion",
  },
  VIEW_TRANSPARENCY: {
    code: "VIEW_TRANSPARENCY",
    label: "Consultar transparencia y metodología",
    destination: "/transparencia",
    processType: "transparency",
    variant: "informational",
    analyticsCategory: "verification",
  },
};

/**
 * Botones con texto contextual. No crean proceso nuevo: reutilizan un código
 * funcional con parámetros de preselección.
 */
export const CTA_CONTEXTUALES = {
  CONOCER_FORMAS_COLABORAR: {
    code: "DONATE_ENTRY",
    label: "Conocer formas de colaborar",
    params: { source: "donation_intro" },
  },
  PARTICIPAR_VOLUNTARIO: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Participar como voluntario",
    params: { type: "field_volunteering" },
  },
  PARTICIPAR_MENTOR: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Participar como mentor",
    params: { type: "educational_mentoring" },
  },
  OPORTUNIDADES_PRO_BONO: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Ver oportunidades pro bono",
    params: { type: "pro_bono" },
  },
  PROGRAMA_EMBAJADORES: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Conocer el programa de embajadores",
    params: { type: "ambassador" },
  },
  REGISTRAR_INTERES: {
    code: "VIEW_PARTICIPATION_OPPORTUNITIES",
    label: "Registrar interés",
    params: { type: "interest_registry" },
  },
  PROPONER_ALIANZA_TECNICA: {
    code: "PROPOSE_ALLIANCE",
    label: "Proponer una alianza técnica",
    params: { type: "technical" },
  },
  EVALUAR_ELEGIBILIDAD: {
    code: "EVALUATE_INITIATIVE",
    label: "Evaluar elegibilidad del proyecto",
    params: { source: "emerging_initiatives" },
  },
  VER_METODOLOGIA: {
    code: "VIEW_TRANSPARENCY",
    label: "Ver metodología de trazabilidad",
    params: { view: "methodology" },
  },
  CONSULTAR_DOCUMENTOS: {
    code: "VIEW_TRANSPARENCY",
    label: "Consultar documentos institucionales",
    params: { view: "documents" },
  },
} as const satisfies Record<
  string,
  { code: FunctionalCtaCode; label: string; params: Record<string, string> }
>;

export type CtaContextualKey = keyof typeof CTA_CONTEXTUALES;

/**
 * Enlaces de verificación: acceso documental, no conversión comercial.
 * Se miden aparte (analyticsCategory: "verification").
 */
export const ENLACES_VERIFICACION = [
  {
    id: "certificado_literal",
    label: "Consultar certificado literal",
    href: "/documentos/certificado-literal-sunarp.pdf",
  },
  {
    id: "ficha_ruc",
    label: "Consultar ficha RUC",
    href: "/documentos/ficha-ruc-sunat.pdf",
  },
  {
    id: "escritura_publica",
    label: "Consultar escritura pública",
    href: "/documentos/escritura-publica.pdf",
  },
] as const;

/** Construye el destino final con los parámetros de origen y preselección. */
export function construirDestino(
  code: FunctionalCtaCode,
  params?: Record<string, string>,
): string {
  const definicion = CTA_REGISTRY[code];
  const query = new URLSearchParams({
    ...definicion.defaultParams,
    ...params,
  });
  const cadena = query.toString();
  return cadena ? `${definicion.destination}?${cadena}` : definicion.destination;
}
