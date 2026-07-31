import Image from "next/image";
import { contactHref } from "../site-config";
import { BookIcon, GlobeIcon, LinkIcon, PlusIcon } from "./icons";

type Programa = {
  titulo: string;
  imagen: string;
  alt: string;
  Icon: typeof PlusIcon;
  acento: string;
  problematica: string;
  solucion: string;
  cta: { label: string; href: string; estilo: string }[];
};

const programas: Programa[] = [
  {
    titulo: "1. Raíces de Salud & Cuidado",
    imagen: "/programas/salud-cuidado.png",
    alt: "Personal de RaícesCare entregando un kit de auxilio a una familia amazónica",
    Icon: PlusIcon,
    acento: "verde-hoja",
    problematica:
      "Vulnerabilidad extrema, desnutrición infantil, falta de kits de emergencia y violencia de género e intrafamiliar en comunidades aisladas.",
    solucion:
      "Redes de auxilio humanitario directo, canalización de donaciones transparentes y acompañamiento integral a víctimas de violencia.",
    cta: [
      {
        label: "Donar Kits",
        href: "#donar",
        estilo:
          "bg-verde-hoja text-white hover:bg-verde-bosque",
      },
      {
        label: "Voluntariado",
        href: "#sumate",
        estilo:
          "border border-verde-hoja text-verde-hoja hover:bg-gray-50",
      },
    ],
  },
  {
    titulo: "2. Semillas de Educación",
    imagen: "/programas/educacion.png",
    alt: "Jóvenes amazónicos en un taller de herramientas digitales",
    Icon: BookIcon,
    acento: "azul-confianza",
    problematica:
      "Brecha digital, pérdida de lenguas originarias y falta de oportunidades técnicas laborales en jóvenes amazónicos.",
    solucion:
      "Talleres no formales gratuitos de herramientas digitales, capacitación en oficios técnicos y rescate del patrimonio cultural y lingüístico de la selva.",
    cta: [
      {
        label: "Financiar Beca",
        href: "#donar",
        estilo: "bg-azul-confianza text-white hover:bg-azul-confianza/90",
      },
      {
        label: "Ser Mentor",
        href: "#sumate",
        estilo:
          "border border-azul-confianza text-azul-confianza hover:bg-gray-50",
      },
    ],
  },
  {
    titulo: "3. Bio-Amazonía & Ecosistemas",
    imagen: "/programas/bio-amazonia.png",
    alt: "Equipo científico tomando muestras de suelo en la cuenca del Ucayali",
    Icon: GlobeIcon,
    acento: "verde-bosque",
    problematica:
      "Deforestación, degradación de suelos en la cuenca del Ucayali y cambio climático.",
    solucion:
      "Explicamos el crecimiento verde con evidencia, a través de estudios biotecnológicos de regeneración, herramientas de bio-inteligencia e ingeniería verde transferidas de forma gratuita a agricultores locales.",
    cta: [
      {
        label: "Patrocinar Hectárea",
        href: "#donar",
        estilo: "bg-verde-bosque text-white hover:bg-verde-bosque/90",
      },
      {
        label: "Alianza B2B",
        href: "#alianzas",
        estilo:
          "border border-verde-bosque text-verde-bosque hover:bg-gray-50",
      },
    ],
  },
  {
    titulo: "4. Redes de Cooperación Global",
    imagen: "/programas/cooperacion-global.png",
    alt: "Equipo de RaícesCare articulando proyectos con cooperantes",
    Icon: LinkIcon,
    acento: "tierra-amazonica",
    problematica:
      "Escasez de proyectos andino-amazónicos listos para financiamiento y brechas de articulación con fondos climáticos.",
    solucion:
      "Gestión de Cooperación Técnica Internacional (CTI), celebración de convenios y estructuración de proyectos socioambientales auditables para donantes corporativos.",
    cta: [
      {
        label: "Postula tu Proyecto",
        href: "#alianzas",
        estilo: "bg-tierra-amazonica text-white hover:bg-tierra-amazonica/90",
      },
      {
        label: "Convenio B2B",
        href: contactHref("Convenio B2B con RaícesCare ONGD"),
        estilo:
          "border border-tierra-amazonica text-tierra-amazonica hover:bg-gray-50",
      },
    ],
  },
];

/** Clases de acento por programa (escritas completas para que Tailwind las detecte). */
const acentos: Record<string, { borde: string; fondo: string; texto: string }> =
  {
    "verde-hoja": {
      borde: "border-verde-hoja",
      fondo: "bg-verde-hoja/10",
      texto: "text-verde-hoja",
    },
    "azul-confianza": {
      borde: "border-azul-confianza",
      fondo: "bg-azul-confianza/10",
      texto: "text-azul-confianza",
    },
    "verde-bosque": {
      borde: "border-verde-bosque",
      fondo: "bg-verde-bosque/10",
      texto: "text-verde-bosque",
    },
    "tierra-amazonica": {
      borde: "border-tierra-amazonica",
      fondo: "bg-tierra-amazonica/10",
      texto: "text-tierra-amazonica",
    },
  };

export function Programas() {
  return (
    <section
      id="programas"
      className="border-t border-b border-gray-300 bg-gris-niebla px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Nuestras Líneas de Acción
          </h2>
          <p className="mx-auto max-w-2xl text-lg">
            Intervenimos con precisión donde la ayuda es más necesaria,
            basándonos en ciencia y empatía comunitaria.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programas.map((programa) => {
            const acento = acentos[programa.acento];
            return (
              <article
                key={programa.titulo}
                className={`flex flex-col overflow-hidden rounded-xl border-t-4 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl ${acento.borde}`}
              >
                <Image
                  src={programa.imagen}
                  alt={programa.alt}
                  width={1672}
                  height={941}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />

                <div className="flex flex-1 flex-col p-8">
                  <span
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${acento.fondo} ${acento.texto}`}
                  >
                    <programa.Icon />
                  </span>
                  <h3 className="mb-4 font-montserrat text-xl font-bold text-azul-confianza">
                    {programa.titulo}
                  </h3>
                  <div className="flex-1 text-sm">
                    <p className="mb-3">
                      <strong className="text-verde-bosque">
                        La problemática:
                      </strong>{" "}
                      {programa.problematica}
                    </p>
                    <p className="mb-6">
                      <strong className="text-verde-bosque">
                        La Solución: RaícesCare:
                      </strong>{" "}
                      {programa.solucion}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    {programa.cta.map((cta) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        className={`w-full rounded py-2 text-center font-semibold transition-colors ${cta.estilo}`}
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
