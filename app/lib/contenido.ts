import { siteUrl } from "../site-config";

/**
 * Lectura del contenido publicado desde el panel.
 *
 * Se consulta en el servidor y se revalida cada minuto: al publicar algo
 * aparece solo, sin redesplegar el sitio, y sin pedirle la API al navegador de
 * cada visitante.
 *
 * Si la API no responde se devuelve vacío en vez de romper la página. Una
 * sección de campañas caída debe verse como «todavía no hay campañas», no como
 * un error: el resto del sitio sigue siendo útil.
 */

const API = process.env.NEXT_PUBLIC_API_URL ?? "";
const REVALIDAR = 60;

export type Contenido = {
  kind: string;
  slug: string;
  title: string;
  summary: string;
  parrafos: string[];
  programCode: string | null;
  location: string | null;
  startsOn: string | null;
  endsOn: string | null;
  goalAmount: string | null;
  goalCurrency: string | null;
  publishedAt: string | null;
  portada: {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;
};

/** Las imágenes las sirve la API; la ruta que devuelve es relativa a ella. */
export function urlDeImagen(ruta: string): string {
  return ruta.startsWith("http") ? ruta : `${API}${ruta}`;
}

export async function listarContenido(
  kind: "campaign" | "initiative" | "project",
  programa?: string,
): Promise<Contenido[]> {
  if (!API) return [];

  const parametros = new URLSearchParams({ kind });
  if (programa) parametros.set("program", programa);

  try {
    const respuesta = await fetch(`${API}/api/v1/content?${parametros}`, {
      next: { revalidate: REVALIDAR },
    });
    if (!respuesta.ok) return [];
    return (await respuesta.json()) as Contenido[];
  } catch {
    return [];
  }
}

export async function obtenerContenido(
  kind: "campaign" | "initiative" | "project",
  slug: string,
): Promise<Contenido | null> {
  if (!API) return null;

  try {
    const respuesta = await fetch(
      `${API}/api/v1/content/${kind}/${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDAR } },
    );
    if (!respuesta.ok) return null;
    return (await respuesta.json()) as Contenido;
  } catch {
    return null;
  }
}

/** Ruta pública de cada tipo. Debe coincidir con la que muestra el panel. */
export const RUTA_POR_TIPO = {
  campaign: "campanas",
  initiative: "iniciativas",
  project: "proyectos",
} as const;

export const ETIQUETA_POR_TIPO = {
  campaign: "Campaña",
  initiative: "Iniciativa",
  project: "Proyecto",
} as const;

export function enlaceDe(contenido: Contenido): string {
  const ruta =
    RUTA_POR_TIPO[contenido.kind as keyof typeof RUTA_POR_TIPO] ?? "campanas";
  return `/${ruta}/${contenido.slug}`;
}

export function importe(monto: string, moneda: string | null): string {
  return `${moneda === "USD" ? "US$" : "S/"} ${Number(monto).toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function fecha(valor: string): string {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** URL absoluta, que es lo que exigen las etiquetas para compartir. */
export function urlAbsoluta(ruta: string): string {
  return `${siteUrl}${ruta}`;
}
