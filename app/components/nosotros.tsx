import Image from "next/image";
import { Carrusel, type Diapositiva } from "./carrusel";

const galeriaComunidad: Diapositiva[] = [
  {
    src: "/nosotros/pieza-1.png",
    alt: "Quiénes Somos: una organización dedicada a la asistencia social, educación, cultura e investigación científica, promoviendo el desarrollo humano y la sostenibilidad en el país, especialmente en personas en condición de pobreza o pobreza extrema y en la Amazonía. Ámbitos: asistencia social y ayuda humanitaria; educación, capacitación y cultura; investigación científica e ingeniería verde; alianzas y cooperación internacional",
  },
  {
    src: "/nosotros/pieza-2.png",
    alt: "Quiénes Somos: una organización dedicada a la asistencia social, educación, cultura e investigación científica, junto a una familia amazónica que revisa material informativo de RaícesCare",
  },
  {
    src: "/nosotros/pieza-3.png",
    alt: "Quiénes Somos: una organización dedicada a la asistencia social, educación, cultura e investigación científica, junto a una voluntaria de RaícesCare que entrega un plantón a dos niños de la comunidad",
  },
];

const misionVision = [
  {
    src: "/nosotros/mision.png",
    alt: "Nuestra Misión: promover el desarrollo humano, la educación y la sostenibilidad en el Perú, mediante la asistencia social directa, la educación técnica y la investigación científica aplicada",
  },
  {
    src: "/nosotros/vision.png",
    alt: "Nuestra Visión: ser la ONGD líder y referente en Latinoamérica por integrar tecnología de trazabilidad digital, preservación cultural originaria y modelos de desarrollo comunitario sostenibles e inalterables",
  },
];

const valores = [
  {
    imagen: "/valores/transparencia-radical.png",
    titulo: "Transparencia Radical",
    texto:
      "Adheridos estrictamente a normativas UIF, SUNAT y APCI con cumplimiento de origen de fondos. Cumplimiento normativo, trazabilidad de fondos 100% verificable, reportes auditables y públicos, y compromiso con la ética y la rendición de cuentas.",
  },
  {
    imagen: "/valores/empatia-comunitaria.png",
    titulo: "Empatía Comunitaria",
    texto:
      "Respeto profundo por las comunidades nativas y sus saberes ancestrales.",
  },
  {
    imagen: "/valores/sostenibilidad-cientifica.png",
    titulo: "Sostenibilidad Científica",
    texto:
      "Soluciones de ingeniería verde basadas en datos e investigación real.",
  },
  {
    imagen: "/valores/trabajo-en-red.png",
    titulo: "Trabajo en Red",
    texto:
      "Co-creación con la cooperación técnica internacional y el sector privado.",
  },
  {
    imagen: "/valores/innovacion-social.png",
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
    foto: "/equipo/wyliam-lucar.png",
    nombre: "Wyliam Lúcar Aliaga",
    cargo: "Director Adjunto | Abogado",
    enfoque: "Cumplimiento legal, alianzas institucionales y convenios.",
  },
  {
    foto: "/equipo/rosa-galvez.png",
    nombre: "Rosa Amelia Gálvez Rojas de Pilón",
    cargo: "Directora de Finanzas | Abogada y Contador Mercantil",
    enfoque: "Control de fondos, auditoría de la DAF e inmunidad financiera.",
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="relative bg-white px-6 py-20 md:px-12">
      <div
        className="absolute inset-0 bg-[url('/nosotros-fondo.png')] bg-cover bg-fixed bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-white/55 via-white/75 to-white/90"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-6 inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Quiénes Somos
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Una organización que tiene como objeto dedicarse a fines de
            asistencia social, educación, cultura e investigación científica,
            promoviendo el desarrollo humano y la sostenibilidad en el país, en
            especial de personas en condición de pobreza o pobreza extrema y en
            la Amazonía.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            Un equipo multidisciplinario de ingenieros, abogados y científicos
            comprometidos con la dignidad humana y la Amazonía.
          </p>
        </div>

        <div className="mx-auto mb-20 max-w-4xl">
          <Carrusel
            diapositivas={galeriaComunidad}
            etiqueta="Quiénes somos: nuestro trabajo con las comunidades amazónicas"
            proporcion="aspect-4/3"
          />
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {misionVision.map((pieza) => (
            <div
              key={pieza.src}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <Image
                src={pieza.src}
                alt={pieza.alt}
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
              Valores Institucionales
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {valores.map((valor, indice) => (
              <li
                key={valor.titulo}
                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${
                  // Con un número impar de valores, el último se centra ocupando
                  // las dos columnas pero conservando el ancho de una.
                  indice === valores.length - 1 && valores.length % 2 === 1
                    ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]"
                    : ""
                }`}
              >
                <Image
                  src={valor.imagen}
                  alt={`${valor.titulo}: ${valor.texto}`}
                  width={1672}
                  height={941}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 text-center">
          <h2 className="inline-block border-b-2 border-verde-hoja pb-2 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            El equipo detrás de la ciencia
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {equipo.map((persona) => (
            <li
              key={persona.nombre}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <Image
                src={persona.foto}
                alt={`${persona.nombre}, ${persona.cargo}. ${persona.enfoque}`}
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
