import Image from "next/image";
import { equipo } from "../site-config";
import { Carrusel, type Diapositiva } from "./carrusel";
import { ArrowRightIcon } from "./icons";

const galeriaComunidad: Diapositiva[] = [
  {
    src: "/nosotros/pieza-1.png",
    alt: "Quiénes somos: RaícesCare es una asociación civil sin fines de lucro constituida en el Perú, con actividades de asistencia social, educación, cultura, investigación científica y cooperación",
  },
  {
    src: "/nosotros/pieza-2.png",
    alt: "Quiénes somos: trabajamos con profesionales y aliados de distintas disciplinas junto a comunidades amazónicas",
  },
  {
    src: "/nosotros/pieza-3.png",
    alt: "Quiénes somos: iniciativas destinadas principalmente a comunidades y territorios amazónicos",
  },
];

const misionVision = [
  {
    src: "/nosotros/mision.png",
    alt: "Nuestra misión: contribuir al desarrollo humano y al cuidado de los territorios amazónicos mediante iniciativas de asistencia social, educación, investigación aplicada y cooperación desarrolladas con responsabilidad, participación comunitaria y evidencia verificable",
  },
  {
    src: "/nosotros/vision.png",
    alt: "Nuestra visión: ser una organización amazónica reconocida por integrar cooperación, conocimiento científico, tecnología y participación comunitaria en iniciativas sociales y ambientales transparentes, sostenibles y replicables",
  },
];

const valores = [
  {
    imagen: "/valores/transparencia-rendicion.png",
    titulo: "Transparencia y rendición de cuentas",
    texto:
      "Gestionamos la información institucional, financiera y operativa mediante controles internos, documentación de respaldo y mecanismos progresivos de trazabilidad, de acuerdo con las obligaciones que resulten aplicables.",
  },
  {
    imagen: "/valores/respeto-participacion.png",
    titulo: "Respeto y participación comunitaria",
    texto:
      "Reconocemos la autonomía, los conocimientos y las prioridades de las comunidades, promoviendo su participación informada en las iniciativas que las involucran.",
  },
  {
    imagen: "/valores/decisiones-evidencia.png",
    titulo: "Decisiones basadas en evidencia",
    texto:
      "Diseñamos y evaluamos nuestras intervenciones utilizando información técnica, conocimiento local, indicadores verificables y metodologías adecuadas a cada territorio.",
  },
  {
    imagen: "/valores/colaboracion-red.png",
    titulo: "Colaboración y trabajo en red",
    texto:
      "Promovemos alianzas responsables entre comunidades, instituciones públicas, academia, organizaciones sociales, cooperantes y empresas.",
  },
  {
    imagen: "/valores/innovacion-proposito.png",
    titulo: "Innovación con propósito",
    texto:
      "Aplicamos herramientas tecnológicas, metodologías participativas y conocimiento interdisciplinario para mejorar la gestión, el aprendizaje y la toma de decisiones.",
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
            Quiénes somos
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            RaícesCare es una asociación civil sin fines de lucro constituida en
            el Perú. Nuestro objeto institucional comprende actividades de
            asistencia social, educación, cultura, investigación científica y
            cooperación orientadas al desarrollo humano y la sostenibilidad.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            Trabajamos con profesionales y aliados de distintas disciplinas para
            diseñar, articular y ejecutar iniciativas destinadas principalmente
            a comunidades y territorios amazónicos.
          </p>
        </div>

        <div className="mx-auto mb-20 max-w-4xl">
          <Carrusel
            diapositivas={galeriaComunidad}
            etiqueta="Quiénes somos: nuestro trabajo con las comunidades amazónicas"
            proporcion="aspect-16/9"
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
              Nuestros valores
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
            Equipo institucional
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {equipo.map((persona) => (
            <li
              key={persona.nombre}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {persona.linkedin ? (
                <a
                  href={persona.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Perfil profesional de ${persona.nombre} en LinkedIn`}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-hoja"
                >
                  <TarjetaEquipo persona={persona} />
                </a>
              ) : (
                <TarjetaEquipo persona={persona} />
              )}

              <div className="mt-auto border-t border-gray-100 p-4">
                {persona.linkedin ? (
                  <a
                    href={persona.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-azul-confianza px-4 py-2.5 text-sm font-bold text-azul-confianza transition hover:bg-azul-confianza hover:text-white"
                  >
                    Ver perfil profesional
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="text-center text-sm text-gray-500">
                    Perfil profesional disponible próximamente
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TarjetaEquipo({
  persona,
}: {
  persona: (typeof equipo)[number];
}) {
  return (
    <Image
      src={persona.foto}
      alt={`${persona.nombre}, ${persona.cargo}. ${persona.enfoque}`}
      width={1448}
      height={1086}
      sizes="(min-width: 1024px) 33vw, 100vw"
      className="h-auto w-full"
    />
  );
}
