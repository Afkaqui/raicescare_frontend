import Image from "next/image";
import { UniversalCta } from "./cta/universal-cta";

export function Alianzas() {
  return (
    <section id="alianzas" className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Empresas y aliados por un Perú sostenible
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Colaboramos en el diseño de iniciativas sociales y ambientales
            alineadas con los objetivos de sostenibilidad de empresas,
            instituciones y cooperantes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-8 border-t-verde-hoja bg-white shadow-lg">
            <Image
              src="/alianzas/pieza-esg.png"
              alt="Soluciones para empresas y organizaciones: colaboramos en el diseño de iniciativas sociales y ambientales alineadas con los objetivos de sostenibilidad de empresas, instituciones y cooperantes. Podemos participar, según el alcance acordado, en formulación y gestión de proyectos, voluntariado corporativo, articulación territorial, seguimiento de actividades e indicadores y elaboración de reportes de resultados"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <div className="flex flex-1 flex-col justify-between gap-6 p-8">
              <p className="rounded-lg border border-gray-200 bg-gris-niebla p-4 text-sm leading-relaxed text-gray-700">
                <strong className="text-azul-confianza">Nota legal:</strong> la
                emisión de constancias, certificados y cualquier tratamiento
                tributario dependerá de la naturaleza de la contribución, de la
                normativa aplicable y de la condición registral vigente de
                RaícesCare. Cada colaboración será evaluada individualmente.
              </p>
              <UniversalCta
                code="REQUEST_INSTITUTIONAL_MEETING"
                location="empresas"
                className="py-4 text-base"
                fullWidth
              />
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-8 border-t-tierra-amazonica bg-white shadow-lg">
            <Image
              src="/alianzas/pieza-incubacion.png"
              alt="Fortalecimiento de iniciativas emergentes: evaluamos oportunidades de colaboración con proyectos sociales y ambientales que necesiten fortalecer su formulación, gobernanza, gestión documental, articulación institucional o herramientas de seguimiento"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <div className="flex flex-1 flex-col justify-between gap-6 p-8">
              <p className="rounded-lg border border-gray-200 bg-gris-niebla p-4 text-sm leading-relaxed text-gray-700">
                <strong className="text-azul-confianza">Importante:</strong> la
                aceptación de una iniciativa estará sujeta a evaluación técnica,
                legal, financiera y reputacional. RaícesCare no garantiza la
                obtención de financiamiento ni la selección en convocatorias.
              </p>
              <UniversalCta
                contextual="EVALUAR_ELEGIBILIDAD"
                location="empresas"
                className="py-4 text-base"
                fullWidth
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
