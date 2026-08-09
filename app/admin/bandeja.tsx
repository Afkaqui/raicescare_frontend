"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  COLOR_ESTADO,
  ETIQUETA_ESTADO,
  ETIQUETA_TIPO,
  api,
  fechaCorta,
  importe,
  type Bandeja as DatosBandeja,
  type Resumen,
} from "../lib/admin/api";
import { useManejadorDeError } from "./marco-admin";

const TIPOS = Object.entries(ETIQUETA_TIPO);
const ESTADOS = Object.entries(ETIQUETA_ESTADO);

export function Bandeja() {
  const manejarError = useManejadorDeError();

  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("abiertos");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [datos, setDatos] = useState<DatosBandeja | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);

    const parametros = new URLSearchParams({ page: String(pagina) });
    if (tipo) parametros.set("type", tipo);
    if (estado) parametros.set("status", estado);
    if (busqueda.trim()) parametros.set("q", busqueda.trim());

    try {
      const [bandeja, contadores] = await Promise.all([
        api.bandeja(parametros),
        api.resumen(),
      ]);
      setDatos(bandeja);
      setResumen(contadores);
    } catch (fallo) {
      setError(manejarError(fallo));
    } finally {
      setCargando(false);
    }
    // manejarError se recrea en cada render y no aporta como dependencia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo, estado, busqueda, pagina]);

  // La búsqueda espera a que dejes de escribir; los filtros aplican al instante.
  useEffect(() => {
    const temporizador = setTimeout(cargar, busqueda ? 350 : 0);
    return () => clearTimeout(temporizador);
  }, [cargar, busqueda]);

  function cambiarFiltro(accion: () => void) {
    setPagina(1);
    accion();
  }

  return (
    <div className="space-y-6">
      {resumen && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Contador etiqueta="Sin resolver" valor={resumen.abiertos} destacado />
          <Contador etiqueta="Sin asignar" valor={resumen.sinAsignar} />
          <Contador
            etiqueta="En revisión"
            valor={resumen.porEstado.under_review ?? 0}
          />
          <Contador etiqueta="Cerradas" valor={resumen.porEstado.closed ?? 0} />
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={busqueda}
            onChange={(e) => cambiarFiltro(() => setBusqueda(e.target.value))}
            placeholder="Código, nombre, correo u organización"
            className="min-w-[16rem] flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30"
          />

          <select
            value={tipo}
            onChange={(e) => cambiarFiltro(() => setTipo(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
          >
            <option value="">Todos los tipos</option>
            {TIPOS.map(([valor, etiqueta]) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>

          <select
            value={estado}
            onChange={(e) => cambiarFiltro(() => setEstado(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
          >
            <option value="abiertos">Sin resolver</option>
            <option value="">Todos los estados</option>
            {ESTADOS.map(([valor, etiqueta]) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {cargando && !datos ? (
          <p className="p-8 text-center text-sm text-gray-500">Cargando…</p>
        ) : !datos?.filas.length ? (
          <div className="p-10 text-center">
            <p className="font-semibold text-azul-confianza">
              No hay expedientes que coincidan
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Prueba quitando filtros, o espera a que llegue la primera
              solicitud.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead className="border-b-2 border-gris-niebla bg-gris-niebla/40">
                <tr>
                  {["Código", "Tipo", "Solicitante", "Estado", "Recibida", ""].map(
                    (encabezado) => (
                      <th
                        key={encabezado}
                        className="px-4 py-3 font-semibold text-azul-confianza"
                      >
                        {encabezado}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {datos.filas.map((fila) => (
                  <tr
                    key={fila.id}
                    className="border-b border-gray-100 transition hover:bg-gris-niebla/30"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-verde-bosque">
                      {fila.trackingCode}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {ETIQUETA_TIPO[fila.requestType] ?? fila.requestType}
                      {fila.pago && (
                        <span className="ml-2 text-xs text-gray-500">
                          {importe(fila.pago.amount, fila.pago.currency)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {fila.solicitante ?? (
                        <span className="text-gray-400">Sin identificar</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <EtiquetaEstado estado={fila.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {fechaCorta(fila.submittedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/expedientes/${fila.id}`}
                        className="font-semibold text-verde-hoja hover:underline"
                      >
                        Abrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {datos && datos.paginas > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {datos.total} expedientes · página {datos.pagina} de {datos.paginas}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={datos.pagina <= 1}
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setPagina((p) => Math.min(datos.paginas, p + 1))}
              disabled={datos.pagina >= datos.paginas}
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Contador({
  etiqueta,
  valor,
  destacado,
}: {
  etiqueta: string;
  valor: number;
  destacado?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm ${
        destacado ? "border-t-4 border-verde-hoja" : "border-gray-200"
      }`}
    >
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {etiqueta}
      </p>
      <p className="mt-1 font-montserrat text-2xl font-bold text-verde-bosque">
        {valor}
      </p>
    </div>
  );
}

export function EtiquetaEstado({ estado }: { estado: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${
        COLOR_ESTADO[estado] ?? "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      {ETIQUETA_ESTADO[estado] ?? estado}
    </span>
  );
}
