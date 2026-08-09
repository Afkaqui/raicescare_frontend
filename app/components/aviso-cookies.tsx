"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  guardarConsentimiento,
  leerConsentimiento,
} from "../lib/consentimiento";

/**
 * Aviso de consentimiento de medición.
 *
 * Las dos opciones tienen el mismo peso visual a propósito: presentar
 * «Aceptar» como botón destacado y «Rechazar» como enlace discreto vicia el
 * consentimiento, que la norma exige libre.
 *
 * No bloquea la página. Un muro que impide leer hasta aceptar tampoco produce
 * un consentimiento libre, y aquí no hay nada que dependa de la medición.
 */
export function AvisoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Se decide en el cliente: en el servidor no se sabe qué eligió la persona,
    // y renderizarlo siempre provocaría un parpadeo en quien ya decidió.
    if (!leerConsentimiento()) setVisible(true);
  }, []);

  if (!visible) return null;

  function decidir(medicion: boolean) {
    guardarConsentimiento(medicion);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="titulo-cookies"
      aria-describedby="texto-cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-verde-hoja bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 p-5 md:flex-row md:items-center md:gap-8 md:p-6">
        <div className="flex-1">
          <h2
            id="titulo-cookies"
            className="mb-1.5 font-montserrat text-base font-bold text-verde-bosque"
          >
            ¿Nos dejas medir cómo usas el sitio?
          </h2>
          <p id="texto-cookies" className="text-sm leading-relaxed text-gray-700">
            Guardaríamos un identificador anónimo en tu navegador para saber qué
            secciones resultan útiles. No usamos publicidad ni rastreadores de
            terceros, y puedes navegar y escribirnos igual si prefieres que no.{" "}
            <Link
              href="/politicas/cookies"
              className="font-semibold text-verde-hoja hover:underline"
            >
              Ver qué guardamos
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => decidir(false)}
            className="rounded-lg border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            Solo lo necesario
          </button>
          <button
            type="button"
            onClick={() => decidir(true)}
            className="rounded-lg border-2 border-verde-hoja bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:border-verde-bosque hover:bg-verde-bosque"
          >
            Aceptar la medición
          </button>
        </div>
      </div>
    </div>
  );
}
