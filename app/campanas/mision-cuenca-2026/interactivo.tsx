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

/**
 * Qué cubre cada monto. El botón lleva el importe elegido al formulario, para
 * que quien eligió S/ 110 no tenga que volver a escribirlo.
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
  const [elegido, setElegido] = useState(
    opciones.find((o) => o.monto === inicial) ?? opciones[0],
  );

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Elige un monto">
        {opciones.map((opcion) => {
          const activo = opcion.monto === elegido.monto;
          return (
            <button
              key={opcion.monto}
              type="button"
              aria-pressed={activo}
              onClick={() => setElegido(opcion)}
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

      <div className="min-h-24 rounded-xl bg-[#f3e3bf] p-5" aria-live="polite">
        <strong className="block font-montserrat text-2xl font-extrabold text-verde-bosque">
          S/ {elegido.monto.toLocaleString("en-US")}
        </strong>
        <p className="mt-1 text-gray-700">{elegido.texto}</p>
      </div>

      <Link
        href={`${enlaceBase}&monto=${elegido.monto}#formulario`}
        className="block rounded-lg bg-[#c98a12] px-5 py-3.5 text-center font-montserrat text-base font-extrabold text-[#1b1304] transition hover:brightness-105"
      >
        Aportar S/ {elegido.monto.toLocaleString("en-US")} a Misión Cuenca 2026
      </Link>
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
