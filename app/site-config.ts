/**
 * Dominio público del sitio. Define NEXT_PUBLIC_SITE_URL en el entorno de
 * despliegue: de él dependen la URL canónica, el sitemap, el robots.txt y las
 * imágenes de Open Graph.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.raicescare.earth"
).replace(/\/$/, "");

/**
 * Nomenclatura según la auditoría de textos (V5): mientras no exista
 * inscripción vigente en el Registro de ONGD de APCI, la organización se
 * describe como asociación civil sin fines de lucro.
 */
export const site = {
  name: "RaícesCare",
  legalName: "Asociación RaícesCare",
  tipoLegal: "Asociación civil sin fines de lucro",
  claim: "Amazonía viva. Gestión responsable.",
  tagline: "Ciencia, cuidado y cooperación para la Amazonía y el Perú.",
  description:
    "RaícesCare es una asociación civil sin fines de lucro constituida en el Perú. Articulamos asistencia social, educación, investigación aplicada y cooperación institucional para desarrollar iniciativas orientadas al bienestar de las comunidades y al cuidado de los ecosistemas amazónicos.",
  email: "raicescare.de@gmail.com",
  linkedin: "https://www.linkedin.com/company/ra%C3%ADcescare-ongd",
  sedeOperativa: "Calle San Martín 1037, Callería, Pucallpa, Ucayali, Perú.",
  sedeLegal: "Calle Puerto de Palos 160, San Isidro, Lima, Perú.",
  ruc: "20616229371",
  partidaRegistral: "11241934",
  zonaRegistral: "Zona Registral N° VI – Sede Pucallpa",
} as const;

/** Enlace de contacto con asunto preestablecido. */
export function contactHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

/** Consejo directivo 2026-2028. */
export const equipo = [
  {
    foto: "/equipo/eduardo-noriega.png",
    nombre: "Eduardo José Noriega Campos",
    cargo: "Director Ejecutivo | Ingeniero Industrial",
    enfoque:
      "Dirección institucional, articulación de alianzas y desarrollo de iniciativas de innovación y sostenibilidad.",
    linkedin: "https://www.linkedin.com/in/ingeduardonoriegaperu/",
  },
  {
    foto: "/equipo/wyliam-lucar.png",
    nombre: "Wyliam Abelardo Lúcar Aliaga",
    cargo: "Director Ejecutivo Adjunto | Abogado",
    enfoque:
      "Asesoría jurídica institucional, gestión de convenios y acompañamiento a procesos de cooperación.",
    linkedin: "https://www.linkedin.com/in/wilyam-l%C3%BAcar-99126a43/",
  },
  {
    foto: "/equipo/rosa-galvez.png",
    nombre: "Rosa Amelia Gálvez Rojas de Pilón",
    cargo:
      "Directora de Administración y Finanzas | Abogada y Contador Mercantil",
    enfoque:
      "Gestión administrativa, control documental y seguimiento financiero institucional.",
    linkedin: null,
  },
] as const;

/** Documentos institucionales públicos, enlazados desde Transparencia. */
export const documentosPublicos = [
  "/documentos/certificado-literal-sunarp.pdf",
  "/documentos/ficha-ruc-sunat.pdf",
  "/documentos/escritura-publica.pdf",
] as const;

/**
 * Políticas exigidas por la auditoría. Mientras no estén redactadas y
 * publicadas, cada enlace abre una solicitud al correo institucional.
 */
export const politicas = [
  "Política de privacidad",
  "Tratamiento de datos personales",
  "Términos de uso",
  "Política de aportes y devoluciones",
  "Políticas institucionales",
  "Canal de consultas e integridad",
] as const;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Quiénes somos" },
  { href: "#programas", label: "Programas" },
  { href: "#alianzas", label: "Empresas y aliados" },
  { href: "#transparencia", label: "Impacto y transparencia" },
  { href: "#sumate", label: "Participa" },
] as const;
