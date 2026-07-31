import Image from "next/image";
import { BoltIcon, EyeIcon } from "./icons";

const valores = [
  {
    titulo: "Transparencia Radical",
    texto:
      "Adheridos estrictamente a normativas UIF, SUNAT y APCI con cumplimiento de origen de fondos.",
  },
  {
    titulo: "Empatía Comunitaria",
    texto:
      "Respeto profundo por las comunidades nativas y sus saberes ancestrales.",
  },
  {
    titulo: "Sostenibilidad Científica",
    texto:
      "Soluciones de ingeniería verde basadas en datos e investigación real.",
  },
  {
    titulo: "Trabajo en Red",
    texto:
      "Co-creación con la cooperación técnica internacional y el sector privado.",
  },
  {
    titulo: "Innovación Social",
    texto:
      "Herramientas de bio-inteligencia al servicio del bienestar humano.",
  },
];

const equipo = [
  {
    foto: "/equipo/eduardo-noriega.png",
    nombre: "Eduardo José Noriega Campos",
    cargo: "Director Ejecutivo | Ingeniero Industrial",
    enfoque: "Gestión de operaciones, bio-inteligencia e impacto tecnológico.",
  },
  {
    foto: "/equipo/wilyam-lucar.png",
    nombre: "Wilyam Abelardo Lúcar Aliaga",
    cargo: "Director Ejecutivo Adjunto | Abogado",
    enfoque: "Cumplimiento legal, alianzas institucionales y convenios.",
  },
  {
    foto: "/equipo/rosa-galvez.png",
    nombre: "Rosa Amelia Gálvez Rojas de Pilón",
    cargo: "Directora de Admin. y Finanzas | Abogada y Contadora",
    enfoque: "Control de fondos, auditoría de la DAF e inmunidad financiera.",
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="relative bg-white px-6 py-20 md:px-12">
      <Image
        src="/nosotros-fondo.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top opacity-60"
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-white/70 via-white/85 to-white"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-6 inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
              Quiénes Somos
            </h2>
            <p className="text-justify text-lg leading-relaxed text-gray-700">
              Una organización que tiene como objeto dedicarse a fines de
              asistencia social, educación, cultura e investigación científica,
              promoviendo el desarrollo humano y la sostenibilidad en el país,
              en especial de personas en condición de pobreza o pobreza extrema
              y en la Amazonía.
            </p>
            <p className="mt-4 text-justify leading-relaxed text-gray-700">
              Un equipo multidisciplinario de ingenieros, abogados y científicos
              comprometidos con la dignidad humana y la Amazonía.
            </p>
          </div>

          <div className="grid grid-cols-1 content-start gap-6 md:grid-cols-2 lg:col-span-7">
            <div className="rounded-xl border-t-4 border-verde-hoja bg-gris-niebla p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-verde-hoja/20 p-3 text-verde-hoja">
                  <BoltIcon />
                </span>
                <h3 className="font-montserrat text-2xl font-bold text-azul-confianza">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                Promover el desarrollo humano, la educación y la sostenibilidad
                en el Perú, mediante la asistencia social directa, la educación
                técnica y la investigación científica aplicada.
              </p>
            </div>

            <div className="rounded-xl border-t-4 border-azul-confianza bg-gris-niebla p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-azul-confianza/20 p-3 text-azul-confianza">
                  <EyeIcon />
                </span>
                <h3 className="font-montserrat text-2xl font-bold text-azul-confianza">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                Ser la ONGD líder y referente en Latinoamérica por integrar
                tecnología de trazabilidad digital, preservación cultural
                originaria y modelos de desarrollo comunitario sostenibles e
                inalterables.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-20 aspect-21/9 w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/nosotros-comunidad.png"
            alt="Trabajadora de RaícesCare compartiendo material informativo con una familia amazónica"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
              Valores Institucionales
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {valores.map((valor) => (
              <li
                key={valor.titulo}
                className="rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm"
              >
                <h3 className="mb-2 font-montserrat text-base font-bold text-verde-bosque">
                  {valor.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {valor.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 text-center">
          <h2 className="inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            El equipo detrás de la ciencia
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {equipo.map((persona) => (
            <div
              key={persona.nombre}
              className="flex items-start gap-5 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-lg"
            >
              <Image
                src={persona.foto}
                alt={`Retrato de ${persona.nombre}`}
                width={600}
                height={750}
                sizes="128px"
                className="h-36 w-28 shrink-0 rounded-xl bg-gris-niebla object-cover object-top shadow-sm"
              />
              <div>
                <h3 className="font-montserrat text-lg leading-tight font-bold text-azul-confianza">
                  {persona.nombre}
                </h3>
                <p className="mb-2 text-sm font-semibold text-verde-hoja">
                  {persona.cargo}
                </p>
                <p className="text-xs text-gray-600">{persona.enfoque}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
