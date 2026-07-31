import Image from "next/image";
import { contactHref } from "../site-config";
import { ArrowRightIcon } from "./icons";

const bloques = [
  {
    imagen: "/sumate/pieza-voluntariado.png",
    alt: "1. Voluntariado en Campo: intervención directa en comunidades y proyectos en la selva. Voluntarios de RaícesCare conversando con una pobladora amazónica",
    cta: "Postula al Voluntariado",
    asunto: "Postulación al Voluntariado en Campo",
    borde: "border-verde-hoja",
    texto: "text-verde-hoja",
  },
  {
    imagen: "/sumate/pieza-pro-bono.png",
    alt: "2. Apoyo Pro Bono: para estudiantes y profesionales de derecho, ingeniería y sistemas. Equipo de profesionales voluntarios trabajando en un proyecto de RaícesCare",
    cta: "Ver Convocatorias",
    asunto: "Consulta por convocatorias Pro Bono",
    borde: "border-azul-confianza",
    texto: "text-azul-confianza",
  },
  {
    imagen: "/sumate/pieza-embajadores.png",
    alt: "3. Embajadores: difunde nuestra causa, organiza colectas y sé la voz de la Amazonía. Embajadora de RaícesCare grabando un mensaje para difundir la causa",
    cta: "Kit de Embajador",
    asunto: "Solicito el Kit de Embajador de la Raíz",
    borde: "border-tierra-amazonica",
    texto: "text-tierra-amazonica",
  },
];

export function Sumate() {
  return (
    <section id="sumate" className="bg-gris-niebla px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
          Sé parte del cambio que quieres ver
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-700">
          Tu talento y tiempo pueden regenerar la selva y transformar familias.
          Encuentra tu lugar en nuestra red.
        </p>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {bloques.map((bloque) => (
            <li
              key={bloque.imagen}
              className={`flex flex-col overflow-hidden rounded-xl border-t-4 bg-white shadow-md transition-transform hover:-translate-y-1 ${bloque.borde}`}
            >
              <Image
                src={bloque.imagen}
                alt={bloque.alt}
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-auto w-full"
              />
              <a
                href={contactHref(bloque.asunto)}
                className={`flex items-center justify-center gap-2 p-6 font-bold hover:underline ${bloque.texto}`}
              >
                {bloque.cta}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
