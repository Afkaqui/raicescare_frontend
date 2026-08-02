import Image from "next/image";
import { contactHref } from "../site-config";
import {
  ArrowRightIcon,
  MegaphoneIcon,
  ScaleIcon,
  UserGroupIcon,
} from "./icons";

const bloques = [
  {
    imagen: "/sumate/pieza-voluntariado.png",
    alt: "Voluntariado de campo: voluntarios de RaícesCare conversando con una pobladora en una comunidad amazónica",
    Icon: UserGroupIcon,
    titulo: "Voluntariado de campo",
    descripcion:
      "Participa en actividades de campo previamente planificadas, sujetas a convocatoria, perfil requerido, capacitación, protocolos de seguridad y disponibilidad del proyecto.",
    cta: "Ver oportunidades de voluntariado",
    asunto: "Consulta por oportunidades de voluntariado",
    borde: "border-verde-hoja",
    fondo: "bg-verde-hoja/10",
    texto: "text-verde-hoja",
    boton: "border-verde-hoja text-verde-hoja hover:bg-verde-hoja hover:text-white",
  },
  {
    imagen: "/sumate/pieza-pro-bono.png",
    alt: "Apoyo pro bono y pasantías: profesionales y estudiantes voluntarios trabajando en un proyecto de RaícesCare",
    Icon: ScaleIcon,
    titulo: "Apoyo pro bono y pasantías",
    descripcion:
      "Convocatorias para profesionales y estudiantes que deseen aportar conocimientos especializados en tareas previamente definidas.",
    cta: "Ver oportunidades pro bono",
    asunto: "Consulta por oportunidades pro bono y pasantías",
    borde: "border-azul-confianza",
    fondo: "bg-azul-confianza/10",
    texto: "text-azul-confianza",
    boton:
      "border-azul-confianza text-azul-confianza hover:bg-azul-confianza hover:text-white",
  },
  {
    imagen: "/sumate/pieza-embajadores.png",
    alt: "Embajadores institucionales: voluntaria de RaícesCare grabando un mensaje para difundir las campañas",
    Icon: MegaphoneIcon,
    titulo: "Embajadores institucionales",
    descripcion:
      "Ayuda a difundir responsablemente nuestras iniciativas y campañas, respetando los mensajes, imágenes, autorizaciones y lineamientos institucionales.",
    cta: "Conocer el programa de embajadores",
    asunto: "Consulta por el programa de embajadores",
    borde: "border-tierra-amazonica",
    fondo: "bg-tierra-amazonica/10",
    texto: "text-tierra-amazonica",
    boton:
      "border-tierra-amazonica text-tierra-amazonica hover:bg-tierra-amazonica hover:text-white",
  },
];

export function Sumate() {
  return (
    <section id="sumate" className="bg-gris-niebla px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
          Participa en nuestra red
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-lg text-gray-700">
          Comparte tu experiencia, tiempo o capacidades en las oportunidades de
          colaboración que RaícesCare publique según sus necesidades y proyectos
          vigentes.
        </p>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {bloques.map((bloque) => (
            <li
              key={bloque.titulo}
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
              <div className="flex flex-1 flex-col p-8">
                <span
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${bloque.fondo} ${bloque.texto}`}
                >
                  <bloque.Icon className="h-8 w-8" />
                </span>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-azul-confianza">
                  {bloque.titulo}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-600">
                  {bloque.descripcion}
                </p>
                <a
                  href={contactHref(bloque.asunto)}
                  className={`mt-auto flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition ${bloque.boton}`}
                >
                  {bloque.cta}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
