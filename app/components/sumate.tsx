import { contactHref } from "../site-config";
import {
  ArrowRightIcon,
  MegaphoneIcon,
  ScaleIcon,
  UserGroupIcon,
} from "./icons";

const bloques = [
  {
    Icon: UserGroupIcon,
    titulo: "1. Voluntariado en Campo",
    descripcion:
      "Intervención directa en comunidades y proyectos en la selva.",
    cta: "Postula al Voluntariado",
    asunto: "Postulación al Voluntariado en Campo",
    borde: "border-verde-hoja",
    fondo: "bg-verde-hoja/10",
    texto: "text-verde-hoja",
  },
  {
    Icon: ScaleIcon,
    titulo: "2. Apoyo Pro Bono",
    descripcion:
      "Para estudiantes y profesionales de derecho, ingeniería y sistemas.",
    cta: "Ver Convocatorias",
    asunto: "Consulta por convocatorias Pro Bono",
    borde: "border-azul-confianza",
    fondo: "bg-azul-confianza/10",
    texto: "text-azul-confianza",
  },
  {
    Icon: MegaphoneIcon,
    titulo: "3. Embajadores",
    descripcion:
      "Difunde nuestra causa, organiza colectas y sé la voz de la Amazonía.",
    cta: "Kit de Embajador",
    asunto: "Solicito el Kit de Embajador de la Raíz",
    borde: "border-tierra-amazonica",
    fondo: "bg-tierra-amazonica/10",
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {bloques.map((bloque) => (
            <article
              key={bloque.titulo}
              className={`rounded-xl border-t-4 bg-white p-8 shadow-md transition-transform hover:-translate-y-1 ${bloque.borde}`}
            >
              <span
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${bloque.fondo} ${bloque.texto}`}
              >
                <bloque.Icon className="h-8 w-8" />
              </span>
              <h3 className="mb-3 font-montserrat text-xl font-bold text-azul-confianza">
                {bloque.titulo}
              </h3>
              <p className="mb-6 min-h-10 text-sm text-gray-600">
                {bloque.descripcion}
              </p>
              <a
                href={contactHref(bloque.asunto)}
                className={`flex items-center justify-center gap-2 font-bold hover:underline ${bloque.texto}`}
              >
                {bloque.cta}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
