"use client";

import Link from "next/link";
import {
  CTA_CONTEXTUALES,
  CTA_REGISTRY,
  construirDestino,
  type CtaContextualKey,
  type CtaVariant,
  type FunctionalCtaCode,
} from "../../lib/cta/registry";
import { trackCtaEvent } from "../../lib/cta/tracking";

type UbicacionCta =
  | "header"
  | "hero"
  | "footer"
  | "programas"
  | "alianzas"
  | "transparencia"
  | "donaciones"
  | "participa"
  | "empresas";

type PropsBase = {
  /** Dónde aparece el botón. Se usa para separar el origen en la analítica. */
  location: UbicacionCta;
  /** Texto alternativo. Por defecto usa el del catálogo. */
  label?: string;
  /** Parámetros adicionales de preselección u origen. */
  params?: Record<string, string>;
  variant?: CtaVariant;
  campaign?: string;
  className?: string;
  fullWidth?: boolean;
};

type Props =
  | (PropsBase & { code: FunctionalCtaCode; contextual?: never })
  | (PropsBase & { contextual: CtaContextualKey; code?: never });

const estilos: Record<CtaVariant, string> = {
  primary:
    "bg-verde-hoja text-white shadow-md hover:bg-verde-bosque focus-visible:outline-verde-bosque",
  secondary:
    "border-2 border-verde-bosque text-verde-bosque hover:bg-verde-bosque hover:text-white focus-visible:outline-verde-bosque",
  informational:
    "border border-azul-confianza text-azul-confianza hover:bg-azul-confianza hover:text-white focus-visible:outline-azul-confianza",
};

/**
 * Botón único de CTA. No deben programarse enlaces sueltos por sección:
 * todo pasa por aquí para conservar catálogo, parámetros y trazabilidad.
 */
export function UniversalCta({
  code,
  contextual,
  location,
  label,
  params,
  variant,
  campaign,
  className = "",
  fullWidth = false,
}: Props) {
  const contexto = contextual ? CTA_CONTEXTUALES[contextual] : null;
  const codigo = (contexto?.code ?? code) as FunctionalCtaCode;
  const definicion = CTA_REGISTRY[codigo];

  const texto = label ?? contexto?.label ?? definicion.label;
  const parametros = {
    ...contexto?.params,
    ...params,
    source: params?.source ?? location,
  };
  const destino = construirDestino(codigo, parametros);
  const apariencia = variant ?? definicion.variant;

  return (
    <Link
      href={destino}
      data-cta-code={codigo}
      data-cta-location={location}
      data-cta-category={definicion.analyticsCategory}
      onClick={() => {
        trackCtaEvent({
          ctaId: `${location}_${codigo.toLowerCase()}`,
          ctaLabel: texto,
          ctaCode: codigo,
          location,
          destination: destino,
          sourcePage:
            typeof window === "undefined" ? "" : window.location.pathname,
          campaign,
        });
      }}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        estilos[apariencia]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {texto}
    </Link>
  );
}
