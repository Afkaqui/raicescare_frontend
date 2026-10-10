"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/cta/tracking";

/**
 * Aviso para quien tiene abierta la sesión del equipo de RaícesCare.
 *
 * La sesión de MercadoPago no se puede consultar desde aquí: vive en su
 * dominio. Pero quien entra al panel suele ser quien administra la cuenta que
 * cobra, y con ella abierta MercadoPago no deja pagar ni ofrece Yape: una
 * cuenta no puede pagarse a sí misma. Mejor advertirlo antes que dejar que
 * parezca un fallo de la plataforma.
 */
export function AvisoCuentaAsociacion() {
  const [esEquipo, setEsEquipo] = useState(false);

  useEffect(() => {
    let vigente = true;
    fetch(`${API_BASE_URL}/api/v1/auth/me`, { credentials: "include" })
      .then((respuesta) => {
        if (vigente && respuesta.ok) setEsEquipo(true);
      })
      // Sin red o sin sesión no hay nada que advertir.
      .catch(() => {});
    return () => {
      vigente = false;
    };
  }, []);

  if (!esEquipo) return null;

  return (
    <aside
      role="note"
      className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900"
    >
      <p className="mb-1 font-montserrat font-bold">
        Tienes abierta la sesión del equipo de RaícesCare
      </p>
      <p>
        Si en este navegador también tienes abierta la cuenta de MercadoPago de
        la asociación, <strong>no podrás completar el pago</strong>: MercadoPago
        no permite que la cuenta que recibe el dinero se pague a sí misma, y
        tampoco mostrará Yape. Para aportar o hacer una prueba, abre esta página
        en una ventana de incógnito o paga con otra cuenta.
      </p>
    </aside>
  );
}
