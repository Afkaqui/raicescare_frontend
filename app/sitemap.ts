import type { MetadataRoute } from "next";
import { documentosPublicos, siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const actualizado = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: actualizado,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/hero-amazonia.png`,
        `${siteUrl}/nosotros/comunidad-1.png`,
        `${siteUrl}/programas/salud-cuidado.png`,
        `${siteUrl}/programas/educacion.png`,
        `${siteUrl}/programas/bio-amazonia.png`,
        `${siteUrl}/programas/cooperacion-global.png`,
      ],
    },
    ...documentosPublicos.map((documento) => ({
      url: `${siteUrl}${documento}`,
      lastModified: actualizado,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
