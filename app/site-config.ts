export const site = {
  name: "RaícesCare ONGD",
  legalName: "Asociación RaícesCare",
  claim: "Amazonía viva. Impacto verificable.",
  tagline: "Ciencia, cuidado y comunidad para regenerar la Amazonía.",
  email: "raicescare.de@gmail.com",
  linkedin: "https://www.linkedin.com/company/ra%C3%ADcescare-ongd/",
  address:
    "Calle San Martín 1037, Callería, Pucallpa, Ucayali, Perú.",
  ruc: "20616229371",
  partidaRegistral: "11241934",
  zonaRegistral: "Zona Registral N° VI",
} as const;

/** Enlace de contacto con asunto preestablecido. */
export function contactHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#programas", label: "Programas" },
  { href: "#alianzas", label: "Alianzas" },
  { href: "#transparencia", label: "Transparencia" },
  { href: "#sumate", label: "Súmate" },
] as const;
