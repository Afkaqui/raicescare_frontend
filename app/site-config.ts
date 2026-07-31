/**
 * Dominio público del sitio. Define NEXT_PUBLIC_SITE_URL en el entorno de
 * despliegue: de él dependen la URL canónica, el sitemap, el robots.txt y las
 * imágenes de Open Graph.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.raicescare.earth"
).replace(/\/$/, "");

export const site = {
  name: "RaícesCare ONGD",
  legalName: "Asociación RaícesCare",
  claim: "Amazonía viva. Impacto verificable.",
  tagline: "Ciencia, cuidado y comunidad para regenerar la Amazonía.",
  description:
    "En RaícesCare ONGD unimos la investigación ambiental, la trazabilidad digital y la asistencia humanitaria para regenerar ecosistemas vulnerables y transformar vidas desde la selva peruana.",
  email: "raicescare.de@gmail.com",
  linkedin: "https://www.linkedin.com/company/ra%C3%ADcescare-ongd/",
  sedeOperativa:
    "Calle San Martín 1037, Callería, Pucallpa, Ucayali, Perú.",
  sedeLegal: "Calle Puerto de Palos 160, San Isidro, Lima, Perú.",
  ruc: "20616229371",
  partidaRegistral: "11241934",
  zonaRegistral: "Zona Registral N° VI",
} as const;

/** Enlace de contacto con asunto preestablecido. */
export function contactHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

/** Documentos institucionales públicos, enlazados desde Transparencia. */
export const documentosPublicos = [
  "/documentos/certificado-literal-sunarp.pdf",
  "/documentos/ficha-ruc-sunat.pdf",
  "/documentos/escritura-publica.pdf",
] as const;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#programas", label: "Programas" },
  { href: "#alianzas", label: "Alianzas" },
  { href: "#transparencia", label: "Transparencia" },
  { href: "#sumate", label: "Súmate" },
] as const;
