"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cuenta, type Aportante } from "../../lib/cuenta";

/**
 * Enlace a la cuenta de aportante en la cabecera.
 *
 * Se resuelve en el cliente porque la sesión vive en una cookie de otro
 * subdominio. Mientras no se sabe no se pinta nada: mostrar «Entrar» y
 * cambiarlo un instante después a «Mi cuenta» produce un parpadeo peor que
 * esperar.
 */
export function EnlaceCuenta({ compacto }: { compacto?: boolean }) {
  const [aportante, setAportante] = useState<Aportante | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let vigente = true;
    cuenta
      .yo()
      .then(({ aportante: quien }) => {
        if (vigente) setAportante(quien);
      })
      .catch(() => {
        // Sin API no hay sesión que mostrar; el resto del sitio sigue igual.
        if (vigente) setAportante(null);
      });
    return () => {
      vigente = false;
    };
  }, []);

  if (aportante === undefined) return null;

  const clases = compacto
    ? "block py-3 text-center hover:bg-gris-niebla"
    : "whitespace-nowrap transition-colors hover:text-verde-hoja";

  if (aportante) {
    return (
      <Link href="/mi-cuenta" className={clases}>
        Mis aportes
      </Link>
    );
  }

  return (
    <Link href="/cuenta/entrar" className={clases}>
      Entrar
    </Link>
  );
}
