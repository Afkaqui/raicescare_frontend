import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioMaestro } from "../../components/formulario/formulario-maestro";
import { FORMULARIO_INICIATIVA } from "../../lib/formularios/definiciones";
import { CuerpoInterno, EncabezadoInterno } from "../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Evaluar mi iniciativa",
  description:
    "Evaluación de elegibilidad de iniciativas sociales y ambientales que buscan fortalecer su formulación, gobernanza y articulación institucional.",
  alternates: { canonical: "/iniciativas/evaluacion" },
};

const DIMENSIONES = [
  "Pertinencia respecto de nuestras líneas de acción.",
  "Formulación: objetivos, actividades y resultados esperados.",
  "Gobernanza y responsables de la iniciativa.",
  "Situación legal y documental de la organización proponente.",
  "Capacidad de gestión y seguimiento.",
  "Riesgos reputacionales, sociales y ambientales.",
];

export default function EvaluacionIniciativas() {
  return (
    <>
      <EncabezadoInterno
        titulo="Evaluar mi iniciativa"
        descripcion="Evaluamos oportunidades de colaboración con proyectos sociales y ambientales que necesiten fortalecer su formulación, gobernanza, gestión documental, articulación institucional o herramientas de seguimiento."
      />

      <CuerpoInterno>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
            Qué se evalúa
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {DIMENSIONES.map((dimension) => (
              <li key={dimension} className="flex gap-3">
                <span className="text-verde-hoja" aria-hidden="true">
                  ›
                </span>
                {dimension}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-montserrat text-lg font-bold text-verde-bosque">
            Resultado de la evaluación
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-700">
            Cada solicitud recorre estados verificables hasta su cierre. El
            resultado se comunica siempre, incluso cuando la iniciativa no
            resulta elegible.
          </p>
          <p className="text-sm font-semibold text-azul-confianza">
            Recibida → Revisión interna → Información adicional → Elegible / No
            elegible → Cerrada
          </p>
        </section>
        <div id="formulario">
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-verde-bosque">
            Presenta tu iniciativa
          </h2>
          <Suspense fallback={<p className="text-gray-600">Cargando formulario…</p>}>
            <FormularioMaestro definicion={FORMULARIO_INICIATIVA} />
          </Suspense>
        </div>
      </CuerpoInterno>
    </>
  );
}
