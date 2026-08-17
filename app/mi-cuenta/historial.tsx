"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ETIQUETA_ESTADO_APORTE,
  cuenta,
  fechaAporte,
  importeAporte,
  type Aportante,
  type Historial as DatosHistorial,
} from "../lib/cuenta";

export function Historial() {
  const router = useRouter();
  const [aportante, setAportante] = useState<Aportante | null>(null);
  const [datos, setDatos] = useState<DatosHistorial | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;

    cuenta
      .yo()
      .then(async ({ aportante: quien }) => {
        if (!vigente) return;
        if (!quien) {
          router.replace("/cuenta/entrar");
          return;
        }
        setAportante(quien);
        // Sin correo confirmado el historial está cerrado; se le dice, no se
        // le manda a una pantalla de error.
        if (quien.verificado) setDatos(await cuenta.misAportes());
      })
      .catch((fallo: Error) => vigente && setError(fallo.message))
      .finally(() => vigente && setCargando(false));

    return () => {
      vigente = false;
    };
  }, [router]);

  async function salir() {
    await cuenta.salir().catch(() => undefined);
    router.replace("/");
  }

  if (cargando) return <p className="text-sm text-gray-500">Cargando tu cuenta…</p>;
  if (!aportante) return null;

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p className="font-montserrat font-bold text-verde-bosque">
            {aportante.fullName}
          </p>
          <p className="text-sm text-gray-600">{aportante.email}</p>
        </div>
        <button
          type="button"
          onClick={salir}
          className="ml-auto text-sm font-semibold text-verde-hoja hover:underline"
        >
          Cerrar sesión
        </button>
      </section>

      {!aportante.verificado ? (
        <section className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
          <h2 className="mb-2 font-montserrat font-bold text-amber-900">
            Falta confirmar tu correo
          </h2>
          <p className="text-sm leading-relaxed text-amber-900">
            Te enviamos un enlace al registrarte. Al abrirlo verás aquí tus
            aportes, incluidos los que hayas hecho antes con este mismo correo.
          </p>
        </section>
      ) : (
        <>
          {datos && datos.total > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Resumen etiqueta="Aportes registrados" valor={String(datos.total)} />
              <Resumen
                etiqueta="Total acreditado"
                valor={
                  Object.entries(datos.sumaPorMoneda)
                    .map(([moneda, suma]) => importeAporte(String(suma), moneda))
                    .join(" · ") || "—"
                }
              />
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          {!datos?.aportes.length ? (
            <section className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <h2 className="mb-2 font-montserrat text-lg font-bold text-verde-bosque">
                Todavía no hay aportes
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-gray-700">
                Cuando hagas uno aparecerá aquí, con su estado y su código de
                seguimiento.
              </p>
              <Link
                href="/aportes"
                className="inline-flex rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde-bosque"
              >
                Hacer un aporte
              </Link>
            </section>
          ) : (
            <ul className="space-y-4">
              {datos.aportes.map((aporte) => (
                <li
                  key={aporte.trackingCode}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-verde-bosque">
                      {aporte.trackingCode}
                    </span>
                    <span className="rounded-full border border-gray-300 bg-gris-niebla/60 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                      {ETIQUETA_ESTADO_APORTE[aporte.estado] ?? aporte.estado}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {fechaAporte(aporte.fecha)}
                    </span>
                  </div>

                  {aporte.pago && (
                    <p className="font-montserrat text-xl font-bold text-verde-bosque">
                      {importeAporte(aporte.pago.amount, aporte.pago.currency)}
                    </p>
                  )}

                  {aporte.suscripcion && (
                    <p className="mt-1 text-sm text-violet-800">
                      Aporte mensual de{" "}
                      {importeAporte(
                        aporte.suscripcion.amount,
                        aporte.suscripcion.currency,
                      )}
                    </p>
                  )}

                  {aporte.destino && (
                    <p className="mt-2 text-sm text-gray-600">
                      Destino: {aporte.destino}
                    </p>
                  )}

                  <Link
                    href={`/seguimiento/${aporte.trackingCode}`}
                    className="mt-3 inline-block text-sm font-semibold text-verde-hoja hover:underline"
                  >
                    Ver seguimiento ›
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function Resumen({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="rounded-xl border-t-4 border-verde-hoja bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {etiqueta}
      </p>
      <p className="mt-1 font-montserrat text-xl font-bold text-verde-bosque">
        {valor}
      </p>
    </div>
  );
}
