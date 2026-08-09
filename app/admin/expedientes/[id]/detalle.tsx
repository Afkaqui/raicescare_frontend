"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ETIQUETA_ESTADO,
  ETIQUETA_TIPO,
  TRANSICIONES,
  api,
  fechaHora,
  importe,
  type Expediente,
} from "../../../lib/admin/api";
import { EtiquetaEstado } from "../../bandeja";
import { useManejadorDeError } from "../../marco-admin";

export function Detalle({ id }: { id: string }) {
  const manejarError = useManejadorDeError();
  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    try {
      setExpediente(await api.expediente(id));
    } catch (fallo) {
      setError(manejarError(fallo));
    } finally {
      setCargando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  if (cargando) return <p className="text-sm text-gray-500">Cargando expediente…</p>;

  if (error || !expediente) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-700">{error ?? "No se encontró"}</p>
        <Link href="/admin" className="mt-3 inline-block text-sm font-semibold text-verde-hoja hover:underline">
          Volver a la bandeja
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm font-semibold text-verde-hoja hover:underline">
          ‹ Bandeja
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-montserrat text-2xl font-bold text-verde-bosque">
            {expediente.trackingCode}
          </h1>
          <EtiquetaEstado estado={expediente.status} />
          <span className="text-sm text-gray-600">
            {ETIQUETA_TIPO[expediente.requestType] ?? expediente.requestType}
            {expediente.category && ` · ${expediente.category}`}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Tarjeta titulo="Solicitante">
            {expediente.persona ? (
              <Datos
                filas={[
                  ["Nombre", expediente.persona.fullName],
                  ["Correo", expediente.persona.email],
                  ["Teléfono", expediente.persona.phone],
                  ["País", expediente.persona.country],
                ]}
              />
            ) : (
              <p className="text-sm text-gray-500">Sin datos de persona.</p>
            )}
            {expediente.organizacion && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <Datos
                  filas={[
                    ["Organización", expediente.organizacion.legalName],
                    ["Tipo", expediente.organizacion.organizationType],
                    ["Registro", expediente.organizacion.registrationNumber],
                    ["Sitio web", expediente.organizacion.website],
                  ]}
                />
              </div>
            )}
          </Tarjeta>

          {expediente.formData && Object.keys(expediente.formData).length > 0 && (
            <Tarjeta titulo="Respuestas del formulario">
              <Datos
                filas={Object.entries(expediente.formData).map(([clave, valor]) => [
                  clave,
                  typeof valor === "string" ? valor : JSON.stringify(valor),
                ])}
              />
            </Tarjeta>
          )}

          {expediente.pagos.length > 0 && (
            <Tarjeta titulo="Pagos">
              <ul className="space-y-3">
                {expediente.pagos.map((pago, indice) => (
                  <li
                    key={indice}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-montserrat font-bold text-verde-bosque">
                      {importe(pago.amount, pago.currency)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {pago.status}
                      {pago.statusDetail && ` · ${pago.statusDetail}`}
                      {pago.paymentTypeId && ` · ${pago.paymentTypeId}`}
                    </span>
                    <span className="text-xs text-gray-500">
                      {pago.approvedAt ? fechaHora(pago.approvedAt) : "sin acreditar"}
                    </span>
                  </li>
                ))}
              </ul>
              {expediente.suscripcion && (
                <p className="mt-4 rounded-lg bg-violet-50 p-3 text-sm text-violet-900">
                  Aporte recurrente de{" "}
                  <strong>
                    {importe(
                      expediente.suscripcion.amount,
                      expediente.suscripcion.currency,
                    )}
                  </strong>{" "}
                  · estado {expediente.suscripcion.status}
                  {expediente.suscripcion.nextPaymentDate &&
                    ` · próximo cobro ${fechaHora(expediente.suscripcion.nextPaymentDate)}`}
                </p>
              )}
            </Tarjeta>
          )}

          <Tarjeta titulo="Historial">
            <ol className="space-y-4 border-l-2 border-gris-niebla pl-5">
              {expediente.historial.map((paso, indice) => (
                <li key={indice} className="relative">
                  <span className="absolute top-1.5 -left-[1.65rem] h-3 w-3 rounded-full bg-verde-hoja" />
                  <p className="font-semibold text-azul-confianza">
                    {ETIQUETA_ESTADO[paso.newStatus] ?? paso.newStatus}
                  </p>
                  <p className="text-xs text-gray-500">
                    {fechaHora(paso.changedAt)}
                    {paso.autor
                      ? ` · ${paso.autor.fullName}`
                      : " · sistema"}
                  </p>
                  {paso.publicComment && (
                    <p className="mt-1 text-sm text-gray-700">
                      <span className="font-semibold">Público:</span>{" "}
                      {paso.publicComment}
                    </p>
                  )}
                  {paso.internalComment && (
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="font-semibold">Interno:</span>{" "}
                      {paso.internalComment}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Tarjeta>
        </div>

        <div className="space-y-6">
          <CambiarEstado
            expediente={expediente}
            alCambiar={() => void cargar()}
            manejarError={manejarError}
          />

          <Tarjeta titulo="Consentimientos">
            <ul className="space-y-2 text-sm">
              {expediente.consentimientos.map((consentimiento, indice) => (
                <li key={indice} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className={consentimiento.accepted ? "text-verde-hoja" : "text-gray-400"}
                  >
                    {consentimiento.accepted ? "✓" : "✕"}
                  </span>
                  <span className="text-gray-700">
                    {consentimiento.consentType}
                    <span className="block text-xs text-gray-500">
                      {consentimiento.policyVersion}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Tarjeta>

          {expediente.interaccion && (
            <Tarjeta titulo="Origen">
              <Datos
                filas={[
                  ["Botón", expediente.interaccion.visibleLabel],
                  ["Página", expediente.interaccion.sourcePage],
                  ["Sección", expediente.interaccion.sourceSection],
                  ["Clic", fechaHora(expediente.interaccion.occurredAt)],
                ]}
              />
            </Tarjeta>
          )}
        </div>
      </div>
    </div>
  );
}

function CambiarEstado({
  expediente,
  alCambiar,
  manejarError,
}: {
  expediente: Expediente;
  alCambiar: () => void;
  manejarError: (error: unknown) => string;
}) {
  const permitidas = TRANSICIONES[expediente.status] ?? [];
  const [destino, setDestino] = useState("");
  const [publico, setPublico] = useState("");
  const [interno, setInterno] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);

  if (permitidas.length === 0) {
    return (
      <Tarjeta titulo="Estado">
        <p className="text-sm text-gray-600">
          Este expediente está cerrado. No admite más cambios de estado.
        </p>
      </Tarjeta>
    );
  }

  async function aplicar() {
    if (!destino) return;
    setEnviando(true);
    setFallo(null);

    try {
      await api.transicionar(expediente.id, {
        newStatus: destino,
        publicComment: publico.trim() || undefined,
        internalComment: interno.trim() || undefined,
      });
      setDestino("");
      setPublico("");
      setInterno("");
      alCambiar();
    } catch (error) {
      setFallo(manejarError(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Tarjeta titulo="Cambiar estado">
      <select
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
      >
        <option value="">Elige el nuevo estado</option>
        {permitidas.map((estado) => (
          <option key={estado} value={estado}>
            {ETIQUETA_ESTADO[estado] ?? estado}
          </option>
        ))}
      </select>

      <label className="mb-1 block text-xs font-semibold text-azul-confianza">
        Comentario público
      </label>
      <textarea
        value={publico}
        onChange={(e) => setPublico(e.target.value)}
        rows={3}
        placeholder="Lo verá el solicitante en su página de seguimiento"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
      />

      <label className="mb-1 block text-xs font-semibold text-azul-confianza">
        Nota interna
      </label>
      <textarea
        value={interno}
        onChange={(e) => setInterno(e.target.value)}
        rows={2}
        placeholder="Solo para el equipo"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
      />

      {fallo && (
        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {fallo}
        </p>
      )}

      <button
        type="button"
        onClick={aplicar}
        disabled={!destino || enviando}
        className="w-full rounded-lg bg-verde-hoja px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-verde-bosque disabled:opacity-50"
      >
        {enviando ? "Guardando…" : "Aplicar cambio"}
      </button>

      <p className="mt-2 text-xs text-gray-500">
        Quedará registrado a tu nombre en el historial.
      </p>
    </Tarjeta>
  );
}

function Tarjeta({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-montserrat text-base font-bold text-verde-bosque">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Datos({ filas }: { filas: [string, string | null | undefined][] }) {
  return (
    <dl className="space-y-2 text-sm">
      {filas
        .filter(([, valor]) => valor)
        .map(([etiqueta, valor]) => (
          <div key={etiqueta} className="flex flex-wrap gap-x-2">
            <dt className="min-w-[7rem] text-gray-500">{etiqueta}</dt>
            <dd className="flex-1 break-words text-gray-800">{valor}</dd>
          </div>
        ))}
    </dl>
  );
}
