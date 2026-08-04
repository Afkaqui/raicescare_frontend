import type { MetadataRoute } from "next";
import { PROGRAMAS } from "./lib/programas";
import { documentosPublicos, siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...documentosPublicos.map((documento) => ({
      url: `${siteUrl}${documento}`,
      lastModified: actualizado,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  return rutas;
}
