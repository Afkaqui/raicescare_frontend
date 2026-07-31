import Image from "next/image";
import { contactHref } from "../site-config";
import { CheckCircleIcon } from "./icons";

const beneficiosEsg = [
  "Certificados de Donación con beneficios tributarios frente a SUNAT.",
  "Co-branding de sostenibilidad y voluntariado corporativo en zonas andino-amazónicas del Perú.",
  "Medición de huella de carbono y créditos de regeneración forestal.",
];

const beneficiosIncubadora = [
  "En paralelo al modelo de Centros de Innovación de Biodiversidad Sostenibles (CIBS), brindamos el paraguas legal y contable de RaícesCare.",
  "Acceso a fondos de Cooperación Técnica Internacional (CTI).",
  "Asesoría en software de trazabilidad digital para sus fondos.",
];

export function Alianzas() {
  return (
    <section id="alianzas" className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Sumemos fuerzas: Empresas e Iniciativas por un Perú Sostenible
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Diseñamos proyectos a la medida de tu estrategia de Sostenibilidad y
            Responsabilidad Social Corporativa (ESG).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-2xl border-t-8 border-verde-hoja bg-azul-confianza text-white shadow-xl transition duration-300 hover:-translate-y-1">
            <Image
              src="/alianzas/pieza-esg.png"
              alt="Responsabilidad Social Corporativa con impacto sostenible, medible y trazable: diseñamos proyectos alineados a tus metas ESG, con certificación de donación y reportes de auditoría en tiempo real"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <div className="flex flex-1 flex-col justify-between p-10">
              <ul className="mb-10 space-y-4 text-gray-200">
                {beneficiosEsg.map((beneficio) => (
                  <li key={beneficio} className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 shrink-0 text-verde-hoja" />
                    {beneficio}
                  </li>
                ))}
              </ul>
              <a
                href={contactHref("Quiero ser Aliado Estratégico de RaícesCare")}
                className="inline-block w-full rounded-lg bg-white px-8 py-4 text-center font-bold text-azul-confianza shadow-md transition hover:bg-gris-niebla sm:w-max"
              >
                Sé un Aliado Estratégico
              </a>
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-2xl border-t-8 border-verde-bosque bg-tierra-amazonica text-white shadow-xl transition duration-300 hover:-translate-y-1">
            <Image
              src="/alianzas/pieza-incubacion.png"
              alt="Empoderamiento de iniciativas emergentes: brindamos respaldo institucional, asesoría legal, gestión administrativa y transferencia tecnológica a proyectos socioambientales en fase inicial"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <div className="flex flex-1 flex-col justify-between p-10">
              <ul className="mb-10 space-y-4 text-gray-200">
                {beneficiosIncubadora.map((beneficio) => (
                  <li key={beneficio} className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">
                      🌱
                    </span>
                    {beneficio}
                  </li>
                ))}
              </ul>
              <a
                href={contactHref(
                  "Postulación de proyecto al ecosistema RaícesCare",
                )}
                className="inline-block w-full rounded-lg bg-white px-8 py-4 text-center font-bold text-tierra-amazonica shadow-md transition hover:bg-gray-100 sm:w-max"
              >
                Postula tu Proyecto al Ecosistema
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
