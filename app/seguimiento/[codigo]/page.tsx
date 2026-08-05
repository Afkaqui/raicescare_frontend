import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { contactHref } from "../../site-config";

export const metadata: Metadata = {
  title: "Seguimiento de solicitud",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ codigo: string }> };

const ETIQUETA_ESTADO: Record<string, string> = {
  received: "Recibida",
  automatic_validation: "Validación automática",
  under_review: "En revisión",
  additional_information_requested: "Información adicional solicitada",
  eligible: "Elegible",
  not_eligible: "No elegible",
  in_process: "En proceso",
  closed: "Cerrada",
};

const ETIQUETA_TIPO: Record<string, string> = {
  contribution: "Aporte",
  participation_application: "Participación",
  alliance_proposal: "Propuesta de alianza",
  initiative_assessment: "Evaluación de iniciativa",
  institutional_meeting: "Reunión institucional",
};

type Seguimiento = {
  trackingCode: string;
  requestType: string;
  status: string;
  submittedAt: string;
  historial: { newStatus: string; publicComment: string | null; changedAt: string }[];
  resultado: { publicMessage: string | null; decidedAt: string } | null;
};

function fecha(valor: string) {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function Seguimiento({ params }: Props) {
  const { codigo } = await params;
  const api = process.env.NEXT_PUBLIC_API_URL;

  let solicitud: Seguimiento | null = null;

  if (api) {
    try {
      const respuesta = await fetch(
        `${api}/api/v1/requests/${encodeURIComponent(codigo)}`,
        { cache: "no-store" },
      );
      if (respuesta.ok) solicitud = (await respuesta.json()) as Seguimiento;
    } catch {
      solicitud = null;
    }
  }

  if (!solicitud) notFound();

  return (
    <>
      <EncabezadoInterno
        titulo={`Solicitud ${solicitud.trackingCode}`}
        descripcion={`${ETIQUETA_TIPO[solicitud.requestType] ?? solicitud.requestType} · presentada el ${fecha(solicitud.submittedAt)}`}
      />

      <CuerpoInterno>
        <section className="rounded-xl border-t-4 border-verde-hoja bg-white p-8 shadow-sm">
          <p className="mb-1 text-sm font-semibold text-gray-500">
            Estado actual
          </p>
          <p className="font-montserrat text-2xl font-bold text-verde-bosque">
            {ETIQUETA_ESTADO[solicitud.status] ?? solicitud.status}
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 font-montserrat text-lg font-bold text-verde-bosque">
            Historial
          </h2>
          <ol className="space-y-5 border-l-2 border-gris-niebla pl-6">
            {solicitud.historial.map((paso, indice) => (
              <li key={`${paso.newStatus}-${indice}`} className="relative">
                <span className="absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full bg-verde-hoja" />
                <p className="font-semibold text-azul-confianza">
                  {ETIQUETA_ESTADO[paso.newStatus] ?? paso.newStatus}
                </p>
                <p className="text-xs text-gray-500">{fecha(paso.changedAt)}</p>
                {paso.publicComment && (
                  <p className="mt-1 text-sm text-gray-700">
                    {paso.publicComment}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {solicitud.resultado?.publicMessage && (
          <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-3 font-montserrat text-lg font-bold text-verde-bosque">
              Resultado
            </h2>
            <p className="text-gray-700">{solicitud.resultado.publicMessage}</p>
          </section>
        )}

        <p className="text-sm text-gray-600">
          ¿Necesitas actualizar algún dato de esta solicitud?{" "}
          <a
            href={contactHref(`Consulta sobre la solicitud ${solicitud.trackingCode}`)}
            className="font-semibold text-verde-hoja hover:underline"
          >
            Escríbenos indicando tu código
          </a>
          .
        </p>
      </CuerpoInterno>
    </>
  );
}
