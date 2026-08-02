import Image from "next/image";
import { contactHref } from "../site-config";

type Programa = {
  titulo: string;
  /** Pieza institucional con el texto auditado incorporado. */
  pieza?: string;
  /** Fotografía sin texto: el contenido se rotula en HTML. */
  foto?: string;
  alt: string;
  desafio: string;
  intervencion: string;
  acento: string;
  cta: { label: string; href: string; primario?: boolean }[];
};

const programas: Programa[] = [
  {
    titulo: "Raíces de Salud y Cuidado",
    pieza: "/programas/pieza-salud.png",
    alt: "Raíces de Salud y Cuidado. Desafío: en distintos territorios persisten brechas de acceso a bienes esenciales, información preventiva y mecanismos de atención frente a situaciones de emergencia y vulnerabilidad. Nuestra intervención: promovemos campañas de ayuda humanitaria, gestión transparente de donaciones y articulación con entidades competentes para facilitar orientación y derivación cuando sea necesario",
    desafio:
      "En distintos territorios persisten brechas de acceso a bienes esenciales, información preventiva y mecanismos de atención frente a situaciones de emergencia y vulnerabilidad.",
    intervencion:
      "Promovemos campañas de ayuda humanitaria, gestión transparente de donaciones y articulación con entidades competentes para facilitar orientación y derivación cuando sea necesario.",
    acento: "verde-hoja",
    cta: [
      {
        label: "Conocer campañas activas",
        href: contactHref("Consulta por campañas activas de ayuda humanitaria"),
        primario: true,
      },
      { label: "Participar como voluntario", href: "#sumate" },
    ],
  },
  {
    titulo: "Semillas de Educación",
    foto: "/programas/educacion.png",
    alt: "Jóvenes amazónicos en un taller de herramientas digitales de RaícesCare",
    desafio:
      "Niños, jóvenes y adultos de diversos territorios amazónicos enfrentan brechas de acceso a herramientas digitales, formación técnica y oportunidades educativas pertinentes.",
    intervencion:
      "Diseñamos y articulamos actividades educativas no formales, alfabetización digital y formación práctica, incorporando contenidos culturales cuando sean desarrollados o validados con las comunidades participantes.",
    acento: "azul-confianza",
    cta: [
      {
        label: "Conocer iniciativas educativas",
        href: contactHref("Consulta por iniciativas educativas"),
        primario: true,
      },
      { label: "Participar como mentor", href: "#sumate" },
    ],
  },
  {
    titulo: "Bio-Amazonía y Ecosistemas",
    pieza: "/programas/pieza-bioamazonia.png",
    alt: "Bio-Amazonía y Ecosistemas. Desafío: la degradación de ecosistemas, la pérdida de biodiversidad y los efectos del cambio climático afectan los medios de vida y la resiliencia de los territorios amazónicos. Nuestra intervención: promovemos iniciativas de investigación aplicada, restauración, monitoreo ambiental e innovación productiva, desarrolladas con aliados técnicos y participación local",
    desafio:
      "La degradación de ecosistemas, la pérdida de biodiversidad y los efectos del cambio climático afectan los medios de vida y la resiliencia de los territorios amazónicos.",
    intervencion:
      "Promovemos iniciativas de investigación aplicada, restauración, monitoreo ambiental e innovación productiva, desarrolladas con aliados técnicos y participación local.",
    acento: "verde-bosque",
    cta: [
      {
        label: "Conocer proyectos ambientales",
        href: contactHref("Consulta por proyectos ambientales"),
        primario: true,
      },
      { label: "Proponer una alianza técnica", href: "#alianzas" },
    ],
  },
  {
    titulo: "Redes de Cooperación y Alianzas",
    pieza: "/programas/pieza-cooperacion.png",
    alt: "Redes de Cooperación y Alianzas. Desafío: muchas iniciativas territoriales necesitan fortalecer su formulación, gobernanza, evidencia y articulación para acceder a oportunidades de cooperación y financiamiento. Nuestra intervención: facilitamos procesos de articulación institucional, preparación de iniciativas, gestión de alianzas y acompañamiento técnico",
    desafio:
      "Muchas iniciativas territoriales necesitan fortalecer su formulación, gobernanza, evidencia y articulación para acceder a oportunidades de cooperación y financiamiento.",
    intervencion:
      "Facilitamos procesos de articulación institucional, preparación de iniciativas, gestión de alianzas y acompañamiento técnico, de acuerdo con nuestras capacidades y con los requisitos de cada convocatoria o cooperante.",
    acento: "tierra-amazonica",
    cta: [
      {
        label: "Evaluar mi iniciativa",
        href: contactHref("Evaluación de iniciativa para cooperación"),
        primario: true,
      },
      { label: "Proponer una alianza", href: "#alianzas" },
    ],
  },
];

/** Clases de acento por programa (escritas completas para que Tailwind las detecte). */
const acentos: Record<string, { borde: string; boton: string; enlace: string }> =
  {
    "verde-hoja": {
      borde: "border-verde-hoja",
      boton: "bg-verde-hoja text-white hover:bg-verde-bosque",
      enlace: "border-verde-hoja text-verde-hoja hover:bg-verde-hoja/10",
    },
    "azul-confianza": {
      borde: "border-azul-confianza",
      boton: "bg-azul-confianza text-white hover:bg-azul-confianza/90",
      enlace:
        "border-azul-confianza text-azul-confianza hover:bg-azul-confianza/10",
    },
    "verde-bosque": {
      borde: "border-verde-bosque",
      boton: "bg-verde-bosque text-white hover:bg-verde-bosque/90",
      enlace: "border-verde-bosque text-verde-bosque hover:bg-verde-bosque/10",
    },
    "tierra-amazonica": {
      borde: "border-tierra-amazonica",
      boton: "bg-tierra-amazonica text-white hover:bg-tierra-amazonica/90",
      enlace:
        "border-tierra-amazonica text-tierra-amazonica hover:bg-tierra-amazonica/10",
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
            Nuestras líneas de acción
          </h2>
          <p className="mx-auto max-w-3xl text-lg">
            Organizamos nuestro trabajo en cuatro ámbitos complementarios,
            sujetos a la disponibilidad de recursos, alianzas, capacidades
            técnicas y evaluación de cada intervención.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {programas.map((programa) => {
            const acento = acentos[programa.acento];
            return (
              <article
                key={programa.titulo}
                className={`flex flex-col overflow-hidden rounded-xl border-t-4 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl ${acento.borde}`}
              >
                <Image
                  src={programa.pieza ?? programa.foto!}
                  alt={programa.alt}
                  width={1672}
                  height={941}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />

                {programa.foto && (
                  <div className="border-t border-gray-100 p-8 text-sm">
                    <h3 className="mb-4 font-montserrat text-xl font-bold text-verde-bosque">
                      {programa.titulo}
                    </h3>
                    <p className="mb-3">
                      <strong className="text-azul-confianza">Desafío:</strong>{" "}
                      {programa.desafio}
                    </p>
                    <p>
                      <strong className="text-azul-confianza">
                        Nuestra intervención:
                      </strong>{" "}
                      {programa.intervencion}
                    </p>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 p-6 sm:flex-row">
                  {programa.cta.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className={`flex-1 rounded-lg px-5 py-3 text-center text-sm font-semibold transition-colors ${
                        cta.primario ? acento.boton : `border ${acento.enlace}`
                      }`}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
