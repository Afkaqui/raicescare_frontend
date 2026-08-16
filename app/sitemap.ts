import type { MetadataRoute } from "next";
import { DOCUMENTOS } from "./lib/politicas/documentos";
import { RUTA_POR_TIPO, listarContenido } from "./lib/contenido";
import { PROGRAMAS } from "./lib/programas";
import { siteUrl } from "./site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const actualizado = new Date();

  const rutas: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/hero-amazonia.png`,
        `${siteUrl}/nosotros/pieza-1.png`,
        `${siteUrl}/programas/pieza-salud.png`,
        `${siteUrl}/programas/pieza-educacion.png`,
        `${siteUrl}/programas/pieza-bioamazonia.png`,
        `${siteUrl}/programas/pieza-cooperacion.png`,
      ],
    },
    {
      url: `${siteUrl}/programas`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROGRAMAS.map((programa) => ({
      url: `${siteUrl}/programas/${programa.slug}`,
      lastModified: actualizado,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${siteUrl}${programa.pieza}`],
    })),
    {
      url: `${siteUrl}/programas/salud-y-cuidado/campanas`,
      lastModified: actualizado,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/programas/semillas-de-educacion/iniciativas`,
      lastModified: actualizado,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/programas/bio-amazonia/proyectos`,
      lastModified: actualizado,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/aportes`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/participa`,
      lastModified: actualizado,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/alianzas/proponer`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/iniciativas/evaluacion`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/empresas/reunion`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/transparencia`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/politicas`,
      lastModified: actualizado,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    // Los documentos legales deben ser encontrables: forman parte de lo que se
    // le debe al titular de los datos, no son letra chica escondida.
    ...DOCUMENTOS.map((documento) => ({
      url: `${siteUrl}/politicas/${documento.slug}`,
      lastModified: actualizado,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...(["campanas", "iniciativas", "proyectos"] as const).map((ruta) => ({
      url: `${siteUrl}/${ruta}`,
      lastModified: actualizado,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  // Lo publicado desde el panel entra al sitemap solo; si la API no responde,
  // el sitemap sigue siendo válido con las rutas fijas.
  const publicados = (
    await Promise.all(
      (["campaign", "initiative", "project"] as const).map((kind) =>
        listarContenido(kind),
      ),
    )
  ).flat();

  return [
    ...rutas,
    ...publicados.map((item) => ({
      url: `${siteUrl}/${RUTA_POR_TIPO[item.kind as keyof typeof RUTA_POR_TIPO]}/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : actualizado,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
