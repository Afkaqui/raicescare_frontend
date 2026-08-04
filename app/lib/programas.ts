import type {
  CtaContextualKey,
  FunctionalCtaCode,
} from "./cta/registry";

/**
 * Catálogo de líneas de acción. Los textos provienen de la auditoría V5 y las
 * piezas gráficas de DIRECCIONV5. El estado "structuring" refleja lo que la
 * auditoría permite declarar hoy: programas en estructuración, sin resultados
 * publicados.
 */
export type Programa = {
  slug: string;
  nombre: string;
  pieza: string;
  alt: string;
  desafio: string;
  intervencion: string;
  estado: "structuring";
  acento: "verde-hoja" | "azul-confianza" | "verde-bosque" | "tierra-amazonica";
  acciones: {
    code?: FunctionalCtaCode;
    contextual?: CtaContextualKey;
    params?: Record<string, string>;
  }[];
};

export const PROGRAMAS: Programa[] = [
  {
    slug: "salud-y-cuidado",
    nombre: "Raíces de Salud y Cuidado",
    pieza: "/programas/pieza-salud.png",
    alt: "Raíces de Salud y Cuidado. Desafío: en distintos territorios persisten brechas de acceso a bienes esenciales, información preventiva y mecanismos de atención frente a situaciones de emergencia y vulnerabilidad. Nuestra intervención: promovemos campañas de ayuda humanitaria, gestión transparente de donaciones y articulación con entidades competentes para facilitar orientación y derivación cuando sea necesario",
    desafio:
      "En distintos territorios persisten brechas de acceso a bienes esenciales, información preventiva y mecanismos de atención frente a situaciones de emergencia y vulnerabilidad.",
    intervencion:
      "Promovemos campañas de ayuda humanitaria, gestión transparente de donaciones y articulación con entidades competentes para facilitar orientación y derivación cuando sea necesario.",
    estado: "structuring",
    acento: "verde-hoja",
    acciones: [
      { code: "VIEW_HEALTH_CAMPAIGNS" },
      { contextual: "PARTICIPAR_VOLUNTARIO" },
    ],
  },
  {
    slug: "semillas-de-educacion",
    nombre: "Semillas de Educación",
    pieza: "/programas/pieza-educacion.png",
    alt: "Semillas de Educación. Desafío: niños, jóvenes y adultos de diversos territorios amazónicos enfrentan brechas de acceso a herramientas digitales, formación técnica y oportunidades educativas pertinentes. Nuestra intervención: diseñamos y articulamos actividades educativas no formales, alfabetización digital y formación práctica, incorporando contenidos culturales cuando sean desarrollados o validados con las comunidades participantes",
    desafio:
      "Niños, jóvenes y adultos de diversos territorios amazónicos enfrentan brechas de acceso a herramientas digitales, formación técnica y oportunidades educativas pertinentes.",
    intervencion:
      "Diseñamos y articulamos actividades educativas no formales, alfabetización digital y formación práctica, incorporando contenidos culturales cuando sean desarrollados o validados con las comunidades participantes.",
    estado: "structuring",
    acento: "azul-confianza",
    acciones: [
      { code: "VIEW_EDUCATION_INITIATIVES" },
      { contextual: "PARTICIPAR_MENTOR" },
    ],
  },
  {
    slug: "bio-amazonia",
    nombre: "Bio-Amazonía y Ecosistemas",
    pieza: "/programas/pieza-bioamazonia.png",
    alt: "Bio-Amazonía y Ecosistemas. Desafío: la degradación de ecosistemas, la pérdida de biodiversidad y los efectos del cambio climático afectan los medios de vida y la resiliencia de los territorios amazónicos. Nuestra intervención: promovemos iniciativas de investigación aplicada, restauración, monitoreo ambiental e innovación productiva, desarrolladas con aliados técnicos y participación local",
    desafio:
      "La degradación de ecosistemas, la pérdida de biodiversidad y los efectos del cambio climático afectan los medios de vida y la resiliencia de los territorios amazónicos.",
    intervencion:
      "Promovemos iniciativas de investigación aplicada, restauración, monitoreo ambiental e innovación productiva, desarrolladas con aliados técnicos y participación local.",
    estado: "structuring",
    acento: "verde-bosque",
    acciones: [
      { code: "VIEW_ENVIRONMENT_PROJECTS" },
      { contextual: "PROPONER_ALIANZA_TECNICA" },
    ],
  },
  {
    slug: "cooperacion-y-alianzas",
    nombre: "Redes de Cooperación y Alianzas",
    pieza: "/programas/pieza-cooperacion.png",
    alt: "Redes de Cooperación y Alianzas. Desafío: muchas iniciativas territoriales necesitan fortalecer su formulación, gobernanza, evidencia y articulación para acceder a oportunidades de cooperación y financiamiento. Nuestra intervención: facilitamos procesos de articulación institucional, preparación de iniciativas, gestión de alianzas y acompañamiento técnico",
    desafio:
      "Muchas iniciativas territoriales necesitan fortalecer su formulación, gobernanza, evidencia y articulación para acceder a oportunidades de cooperación y financiamiento.",
    intervencion:
      "Facilitamos procesos de articulación institucional, preparación de iniciativas, gestión de alianzas y acompañamiento técnico, de acuerdo con nuestras capacidades y con los requisitos de cada convocatoria o cooperante.",
    estado: "structuring",
    acento: "tierra-amazonica",
    acciones: [
      { code: "EVALUATE_INITIATIVE" },
      { code: "PROPOSE_ALLIANCE" },
    ],
  },
];

export function obtenerPrograma(slug: string) {
  return PROGRAMAS.find((programa) => programa.slug === slug);
}

export const ACENTOS: Record<Programa["acento"], string> = {
  "verde-hoja": "border-verde-hoja",
  "azul-confianza": "border-azul-confianza",
  "verde-bosque": "border-verde-bosque",
  "tierra-amazonica": "border-tierra-amazonica",
};
