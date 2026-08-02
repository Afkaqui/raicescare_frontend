import { equipo, site, siteUrl } from "../site-config";

/**
 * JSON-LD (schema.org) para que los buscadores reconozcan a la organización,
 * sus datos registrales y sus canales oficiales en resultados enriquecidos.
 */
export function DatosEstructurados() {
  const datos = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${siteUrl}/#organizacion`,
        name: site.name,
        alternateName: site.legalName,
        legalName: site.legalName,
        description: site.description,
        slogan: site.claim,
        url: siteUrl,
        logo: `${siteUrl}/logo-raicescare.png`,
        image: `${siteUrl}/opengraph-image.png`,
        email: site.email,
        taxID: site.ruc,
        vatID: site.ruc,
        identifier: `Partida Registral SUNARP N° ${site.partidaRegistral}`,
        areaServed: { "@type": "Country", name: "Perú" },
        knowsLanguage: ["es-PE"],
        knowsAbout: [
          "Asistencia social y ayuda humanitaria",
          "Educación, capacitación y cultura",
          "Investigación científica aplicada",
          "Cooperación y articulación institucional",
        ],
        address: [
          {
            "@type": "PostalAddress",
            name: "Sede Operativa",
            streetAddress: "Calle San Martín 1037, Callería",
            addressLocality: "Pucallpa",
            addressRegion: "Ucayali",
            addressCountry: "PE",
          },
          {
            "@type": "PostalAddress",
            name: "Sede Legal",
            streetAddress: "Calle Puerto de Palos 160",
            addressLocality: "San Isidro",
            addressRegion: "Lima",
            addressCountry: "PE",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Contacto institucional",
          email: site.email,
          availableLanguage: ["Spanish"],
        },
        sameAs: [site.linkedin],
        employee: equipo.map((persona) => ({
          "@type": "Person",
          name: persona.nombre,
          jobTitle: persona.cargo.split("|")[0].trim(),
          description: persona.enfoque,
          image: `${siteUrl}${persona.foto}`,
          ...(persona.linkedin ? { sameAs: [persona.linkedin] } : {}),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#sitio`,
        url: siteUrl,
        name: site.name,
        description: site.description,
        inLanguage: "es-PE",
        publisher: { "@id": `${siteUrl}/#organizacion` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
