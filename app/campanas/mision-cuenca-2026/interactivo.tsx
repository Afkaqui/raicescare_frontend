"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Cuenta regresiva al cierre. Arranca vacía y se completa en el navegador: si
 * la calculara el servidor, la página cacheada mostraría la hora de cuando se
 * generó.
 */
export function CuentaRegresiva({ cierre }: { cierre: string }) {
  const [restante, setRestante] = useState<{ valor: string; texto: string } | null>(
    null,
  );

  useEffect(() => {
    function calcular() {
      const ms = new Date(cierre).getTime() - Date.now();
      if (ms <= 0) {
        setRestante({ valor: "Cerrada", texto: "Gracias por tu apoyo" });
        return;
      }
      const dias = Math.floor(ms / 864e5);
      const horas = Math.floor((ms % 864e5) / 36e5);
      setRestante(
        dias > 0
          ? { valor: `${dias} ${dias === 1 ? "día" : "días"}`, texto: `y ${horas} h para el cierre` }
          : { valor: `${horas} h`, texto: "para el cierre, hoy" },
      );
    }

    calcular();
    const intervalo = setInterval(calcular, 60_000);
    return () => clearInterval(intervalo);
  }, [cierre]);

  return (
    <div className="min-w-0">
      <strong className="block font-montserrat text-2xl font-extrabold text-verde-bosque">
        {restante?.valor ?? "—"}
      </strong>
      <span className="block text-xs leading-snug text-gray-500">
        {restante?.texto ?? "para el cierre"}
      </span>
    </div>
  );
}

type Opcion = { monto: number; texto: string };

/** Los mismos límites que valida la API para un aporte en soles. */
const MINIMO = 5;
const MAXIMO = 50_000;
/** La barra llega hasta la misión completa de una persona; más se escribe. */
const TOPE_BARRA = 4365;

/**
 * Qué cubre cada monto. Se puede elegir un atajo, mover la barra o escribir
 * cualquier importe; el botón lleva al formulario el que quede, para que no
 * haya que volver a escribirlo.
 */
export function SelectorDeMonto({
  opciones,
  inicial,
  enlaceBase,
}: {
  opciones: Opcion[];
  inicial: number;
  enlaceBase: string;
}) {
  const [monto, setMonto] = useState(inicial);
  // Lo escrito se guarda tal cual: borrar el campo para teclear otro número
  // no debe saltar a un valor que nadie escribió.
  const [texto, setTexto] = useState(String(inicial));

  const valido = Number.isFinite(monto) && monto >= MINIMO && monto <= MAXIMO;
  const atajo = opciones.find((o) => o.monto === monto);
  // Para un monto libre se dice lo que alcanza a cubrir: el mayor atajo que
  // cabe en él.
  const alcanza = [...opciones].reverse().find((o) => o.monto <= monto);

  function elegir(valor: number) {
    setMonto(valor);
    setTexto(String(valor));
  }

  const descripcion = !valido
    ? monto > MAXIMO
      ? `El máximo por operación en línea es S/ ${MAXIMO.toLocaleString("en-US")}. Para montos mayores, escríbenos y coordinamos una transferencia.`
      : `El aporte mínimo es S/ ${MINIMO}.`
    : atajo
      ? atajo.texto
      : alcanza
        ? `Alcanza, por ejemplo, para: ${alcanza.texto.charAt(0).toLowerCase()}${alcanza.texto.slice(1)}`
        : "Todo aporte suma: se destina a los rubros en orden de prioridad, empezando por el transporte.";

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Montos sugeridos">
        {opciones.map((opcion) => {
          const activo = opcion.monto === monto;
          return (
            <button
              key={opcion.monto}
              type="button"
              aria-pressed={activo}
              onClick={() => elegir(opcion.monto)}
              className={`rounded-full border-2 px-4 py-2 font-montserrat text-base font-bold transition ${
                activo
                  ? "border-verde-bosque bg-verde-bosque text-white"
                  : "border-verde-bosque/60 text-verde-bosque hover:bg-verde-bosque/5"
              }`}
            >
              S/ {opcion.monto.toLocaleString("en-US")}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 rounded-xl border border-[#d9dccf] bg-white p-4">
        <label htmlFor="monto-libre" className="font-montserrat text-sm font-bold text-verde-bosque">
          Personaliza tu aporte
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={MINIMO}
            max={TOPE_BARRA}
            step={5}
            value={Math.min(Math.max(monto || MINIMO, MINIMO), TOPE_BARRA)}
            onChange={(e) => elegir(Number(e.target.value))}
            aria-label="Monto del aporte"
            aria-valuetext={`S/ ${monto}`}
            className="h-2 min-w-0 flex-1 cursor-pointer accent-[#c98a12]"
          />
          <div className="flex w-36 shrink-0 items-center rounded-lg border border-gray-300 bg-white px-3 focus-within:border-verde-hoja focus-within:ring-2 focus-within:ring-verde-hoja/30">
            <span className="font-montserrat font-bold text-gray-500">S/</span>
            <input
              id="monto-libre"
              type="number"
              inputMode="decimal"
              min={MINIMO}
              max={MAXIMO}
              step="1"
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value);
                setMonto(Number(e.target.value));
              }}
              className="w-full min-w-0 bg-transparent py-2 pl-2 font-montserrat text-base font-bold text-verde-bosque outline-none"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Desde S/ {MINIMO}. Mueve la barra o escribe el monto que prefieras.
        </p>
      </div>

      <div
        className={`min-h-24 rounded-xl p-5 ${valido ? "bg-[#f3e3bf]" : "bg-red-50"}`}
        aria-live="polite"
      >
        <strong className="block font-montserrat text-2xl font-extrabold text-verde-bosque">
          S/ {valido ? monto.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—"}
        </strong>
        <p className={`mt-1 ${valido ? "text-gray-700" : "text-red-700"}`}>{descripcion}</p>
      </div>

      {valido ? (
        <Link
          href={`${enlaceBase}&monto=${monto}#formulario`}
          className="block rounded-lg bg-[#c98a12] px-5 py-3.5 text-center font-montserrat text-base font-extrabold text-[#1b1304] transition hover:brightness-105"
        >
          Aportar S/ {monto.toLocaleString("en-US", { maximumFractionDigits: 2 })} a Misión Cuenca 2026
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="block cursor-not-allowed rounded-lg bg-gray-200 px-5 py-3.5 text-center font-montserrat text-base font-extrabold text-gray-500"
        >
          Elige un monto válido
        </span>
      )}
    </div>
  );
}

/** Copiar al portapapeles; si el navegador no deja, al menos se selecciona. */
export function Copiable({ texto }: { texto: string }) {
  const [estado, setEstado] = useState<"listo" | "copiado" | "seleccionado">("listo");

  async function copiar(evento: React.MouseEvent<HTMLButtonElement>) {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado("copiado");
    } catch {
      const codigo = evento.currentTarget.parentElement?.querySelector("code");
      if (codigo) {
        const rango = document.createRange();
        rango.selectNodeContents(codigo);
        const seleccion = window.getSelection();
        seleccion?.removeAllRanges();
        seleccion?.addRange(rango);
      }
      setEstado("seleccionado");
    }
    setTimeout(() => setEstado("listo"), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gris-niebla/40 px-3 py-2.5 font-montserrat font-semibold text-gray-800">
      <code className="font-[inherit] break-all select-all">{texto}</code>
      <button
        type="button"
        onClick={copiar}
        className="ml-auto rounded-md border border-verde-bosque px-3 py-1 text-xs font-bold text-verde-bosque transition hover:bg-verde-bosque/5"
      >
        {estado === "copiado" ? "Copiado" : estado === "seleccionado" ? "Seleccionado" : "Copiar"}
      </button>
    </div>
  );
}
