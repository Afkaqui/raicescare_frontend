import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioMaestro } from "../components/formulario/formulario-maestro";
import { FORMULARIO_APORTE } from "../lib/formularios/definiciones";
import {
  CuerpoInterno,
  EncabezadoInterno,
  QueSePedira,
} from "../components/pagina-interna";
import { site } from "../site-config";

export const metadata: Metadata = {
  title: "Apoya nuestras iniciativas",
  description:
    "Ventana central de aportes de RaícesCare: modalidad, finalidad, condiciones y constancia antes de cualquier pago.",
  alternates: { canonical: "/aportes" },
};

type Props = {
  searchParams: Promise<{ [clave: string]: string | string[] | undefined }>;
};

const MODALIDADES = {
  recurring: {
    titulo: "Aporte mensual",
    campania: "Programa Sembrador de Futuro",
    detalle:
      "Contribuye periódicamente al sostenimiento de programas y actividades institucionales. Podrás consultar las condiciones del aporte, modificarlo o solicitar su cancelación según el medio de pago habilitado.",
  },
  single: {
    titulo: "Aporte único",
    campania: "Apoyo para campañas y proyectos",
    detalle:
      "Elige un monto y selecciona la campaña o línea de acción que deseas apoyar. Cuando no se indique una finalidad específica, el aporte se asignará según las prioridades institucionales informadas.",
  },
} as const;

export default async function Aportes({ searchParams }: Props) {
  const params = await searchParams;
  const tipo = typeof params.type === "string" ? params.type : null;
  const modalidad =
    tipo === "recurring" || tipo === "single" ? MODALIDADES[tipo] : null;

  return (
    <>
      <EncabezadoInterno
        titulo="Apoya nuestras iniciativas"
        descripcion="Tu contribución puede ayudarnos a desarrollar actividades sociales, educativas y ambientales conforme a los proyectos y campañas vigentes."
      />

      <CuerpoInterno>
        {modalidad && (
          <section className="rounded-xl border-l-4 border-verde-hoja bg-white p-6 shadow-sm">
            <p className="mb-1 text-xs font-bold tracking-wide text-verde-hoja uppercase">
              Modalidad seleccionada
            </p>
            <h2 className="font-montserrat text-xl font-bold text-verde-bosque">
              {modalidad.titulo}
            </h2>
            <p className="mt-1 mb-3 text-sm font-semibold text-azul-confianza">
              {modalidad.campania}
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {modalidad.detalle}
            </p>
          </section>
        )}

        <div id="formulario">
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-verde-bosque">
            Realiza tu aporte
          </h2>
          <Suspense
            fallback={<p className="text-gray-600">Cargando formulario…</p>}
          >
            <FormularioMaestro definicion={FORMULARIO_APORTE} />
          </Suspense>
        </div>

        <QueSePedira
          titulo="Qué verás antes de confirmar un aporte"
          items={[
            "Finalidad del aporte y campaña o línea de acción seleccionada.",
            "Monto y modalidad: única o recurrente.",
            "Tratamiento de los aportes sin finalidad específica.",
            "Política de privacidad y consentimiento de tratamiento de datos.",
            "Condiciones de cancelación del aporte recurrente.",
            "Tipo de constancia que se emite y su alcance.",
            "Estado posterior del aporte y su seguimiento.",
          ]}
        />

        <section className="rounded-xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm">
          <h2 className="mb-3 font-montserrat text-lg font-bold text-verde-bosque">
            Información sobre los aportes
          </h2>
          <p className="mb-3">
            {site.legalName} registra las contribuciones recibidas y aplica
            controles documentales conforme a sus procedimientos internos y a
            las obligaciones legales aplicables. Partida Registral N.°{" "}
            {site.partidaRegistral} · RUC N.° {site.ruc}.
          </p>
          <p className="mb-3">
            El pago se procesa íntegramente en el entorno de MercadoPago.
            RaícesCare no recibe ni almacena los datos de tu tarjeta.
          </p>
          <p>
            La emisión de constancias y cualquier tratamiento tributario
            dependerá de la naturaleza de la contribución, de la normativa
            aplicable y de la condición registral vigente de RaícesCare.
          </p>
        </section>
      </CuerpoInterno>
    </>
  );
}
