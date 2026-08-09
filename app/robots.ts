import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La plataforma interna no se indexa. Las páginas ya lo declaran en su
      // metadata; aquí se evita además que los buscadores la recorran.
      disallow: ["/admin/", "/seguimiento/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
