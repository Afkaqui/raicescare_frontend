import type { Metadata } from "next";
import Link from "next/link";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { contactHref } from "../../site-config";

export const metadata: Metadata = {
  title: "Gracias por tu aporte",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ [clave: string]: string | string[] | undefined }>;
};

type EstadoPago = {
  trackingCode: string;
  status: string;
  pago: {
    amount: string;
    currency: string;
    status: string;
    approvedAt: string | null;
  } | null;
  suscripcion: {
    amount: string;
    currency: string;
    frequency: number;
    frequencyType: string;
    status: string;
    nextPaymentDate: string | null;
  } | null;
};

function importe(monto: string, moneda: string) {
  const simbolo = moneda === "USD" ? "US$" : "S/";
  return `${simbolo} ${Number(monto).toFixed(2)}`;
}

function fecha(valor: string) {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function GraciasPorTuAporte({ searchParams }: Props) {
  const params = await searchParams;
  const codigo = typeof params.codigo === "string" ? params.codigo : null;
  const fallido = params.estado === "fallido";
  const api = process.env.NEXT_PUBLIC_API_URL;

  let estado: EstadoPago | null = null;

  if (codigo && api) {
    try {
      const respuesta = await fetch(
        `${api}/api/v1/payments/${encodeURIComponent(codigo)}`,
        { cache: "no-store" },
      );
      if (respuesta.ok) estado = (await respuesta.json()) as EstadoPago;
    } catch {
      estado = null;
    }
  }

  // MercadoPago suele avisar por webhook unos segundos después del retorno, así
  // que «pendiente» aquí no significa que el aporte haya fallado.
  const acreditado =
    estado?.pago?.status === "approved" ||
    estado?.suscripcion?.status === "authorized";

  return (
    <>
      <EncabezadoInterno
        titulo={
          fallido
            ? "El pago no se completó"
            : acreditado
              ? "Gracias por tu aporte"
              : "Recibimos tu aporte"
        }
        descripcion={
          fallido
            ? "No se realizó ningún cargo. Puedes intentarlo otra vez cuando quieras."
            : "Tu contribución sostiene el trabajo con comunidades y territorios amazónicos."
        }
      />

      <CuerpoInterno>
        {codigo && (
          <section className="rounded-xl border-t-4 border-verde-hoja bg-white p-8 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-gray-500">
              Código de tu aporte
            </p>
            <p className="mb-6 font-montserrat text-2xl font-bold tracking-wide text-verde-bosque">
              {codigo}
            </p>

            {estado?.pago && (
              <dl className="mb-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-gray-500">Monto</dt>
                  <dd className="font-semibold text-azul-confianza">
                    {importe(estado.pago.amount, estado.pago.currency)}
                  </dd>
                </div>
                {estado.pago.approvedAt && (
                  <div>
                    <dt className="text-sm text-gray-500">Acreditado el</dt>
                    <dd className="font-semibold text-azul-confianza">
                      {fecha(estado.pago.approvedAt)}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {estado?.suscripcion && (
              <dl className="mb-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-gray-500">Aporte mensual</dt>
                  <dd className="font-semibold text-azul-confianza">
                    {importe(
                      estado.suscripcion.amount,
                      estado.suscripcion.currency,
                    )}
                  </dd>
                </div>
                {estado.suscripcion.nextPaymentDate && (
                  <div>
                    <dt className="text-sm text-gray-500">Próximo cobro</dt>
                    <dd className="font-semibold text-azul-confianza">
                      {fecha(estado.suscripcion.nextPaymentDate)}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {!fallido && !acreditado && (
              <p className="mb-6 rounded-lg border border-gray-200 bg-gris-niebla/60 p-4 text-sm text-gray-700">
                La confirmación de la pasarela puede tardar unos minutos. Con tu
                código puedes consultar el estado cuando quieras: no necesitas
                hacer nada más.
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/seguimiento/${codigo}`}
                className="inline-flex items-center justify-center rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde-bosque"
              >
                Ver el estado de mi aporte
              </Link>
              {fallido && (
                <Link
                  href="/aportes#formulario"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Intentar de nuevo
                </Link>
              )}
            </div>
          </section>
        )}

        <section className="rounded-xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm">
          <h2 className="mb-3 font-montserrat text-lg font-bold text-verde-bosque">
            Sobre la constancia
          </h2>
          <p className="mb-3">
            La emisión de constancias y cualquier tratamiento tributario
            dependerá de la naturaleza de la contribución, de la normativa
            aplicable y de la condición registral vigente de RaícesCare.
          </p>
          <p>
            ¿Necesitas una constancia o quieres modificar tu aporte recurrente?{" "}
            <a
              href={contactHref(
                codigo ? `Consulta sobre el aporte ${codigo}` : "Consulta sobre mi aporte",
              )}
              className="font-semibold text-verde-hoja hover:underline"
            >
              Escríbenos indicando tu código
            </a>
            .
          </p>
        </section>
      </CuerpoInterno>
    </>
  );
}
