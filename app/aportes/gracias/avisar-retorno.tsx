"use client";

import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../lib/cta/tracking";

/**
 * Avisa a la API con qué resultado volvió el aportante de la pasarela.
 *
 * Es el único rastro posible de los intentos que MercadoPago rechaza antes de
 * crear un pago: en esos casos no hay notificación ni pago que consultar, y sin
 * esto el expediente se queda en «recibido» sin que nadie sepa por qué.
 *
 * No pinta nada y no bloquea: si el aviso falla, la persona igual ve su
 * pantalla. Lo peor que pasa es que se pierde una anotación.
 */
export function AvisarRetorno({
  codigo,
  resultado,
}: {
  codigo: string;
  resultado: "success" | "pending" | "failure";
}) {
  // En desarrollo el efecto corre dos veces; sin esto se anotaría por duplicado.
  const avisado = useRef(false);

  useEffect(() => {
    if (avisado.current || !API_BASE_URL) return;
    avisado.current = true;

    void fetch(
      `${API_BASE_URL}/api/v1/payments/${encodeURIComponent(codigo)}/return`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultado }),
        keepalive: true,
      },
    ).catch(() => undefined);
  }, [codigo, resultado]);

  return null;
}
