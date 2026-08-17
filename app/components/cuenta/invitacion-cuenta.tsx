"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cuenta, type Aportante } from "../../lib/cuenta";

/**
 * Aviso sobre la cuenta en el formulario de aporte.
 *
 * Nunca bloquea ni interrumpe: informa. A quien ya entró le confirma que su
 * aporte quedará registrado; a quien no, le ofrece la opción sin insinuar que
 * haga falta, porque no hace falta.
 */
export function InvitacionCuenta() {
  const [aportante, setAportante] = useState<Aportante | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let vigente = true;
    cuenta
      .yo()
      .then(({ aportante: quien }) => vigente && setAportante(quien))
      .catch(() => vigente && setAportante(null));
    return () => {
      vigente = false;
    };
  }, []);

  if (aportante === undefined) return null;

  if (aportante) {
    return (
      <section className="rounded-xl border-l-4 border-verde-hoja bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-700">
          Estás en tu cuenta como <strong>{aportante.fullName}</strong>. Este
          aporte quedará en{" "}
          <Link href="/mi-cuenta" className="font-semibold text-verde-hoja hover:underline">
            tu historial
          </Link>
          .
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm leading-relaxed text-gray-700">
        Puedes aportar sin cuenta, sin ningún paso extra. Si prefieres llevar el
        registro de tus aportes y consultarlos después,{" "}
        <Link href="/cuenta/entrar" className="font-semibold text-verde-hoja hover:underline">
          entra
        </Link>{" "}
        o{" "}
        <Link href="/registro" className="font-semibold text-verde-hoja hover:underline">
          crea una
        </Link>
        . Si aportas ahora y te registras luego con el mismo correo, este aporte
        aparecerá igual.
      </p>
    </section>
  );
}
