"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "../../lib/cta/tracking";

/** Mismo mínimo que exige la API; se avisa antes de enviar, no después. */
const LARGO_MINIMO = 12;

export function ClaveForm() {
  const parametros = useSearchParams();
  const token = parametros.get("token") ?? "";

  const [clave, setClave] = useState("");
  const [repetida, setRepetida] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lista, setLista] = useState(false);

  const corta = clave.length > 0 && clave.length < LARGO_MINIMO;
  const distintas = repetida.length > 0 && clave !== repetida;
  const puedeEnviar =
    token && clave.length >= LARGO_MINIMO && clave === repetida && !enviando;

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (!puedeEnviar) return;

    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_BASE_URL}/api/v1/auth/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: clave }),
      });

      if (!respuesta.ok) {
        const datos = (await respuesta.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(
          datos?.message ?? "No pudimos guardar la contraseña. Intenta de nuevo.",
        );
      }

      setLista(true);
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error inesperado");
    } finally {
      setEnviando(false);
    }
  }

  if (!token) {
    return (
      <Aviso titulo="Enlace incompleto">
        Este enlace no trae la información necesaria. Ábrelo tal como llegó en el
        correo, sin recortarlo.
      </Aviso>
    );
  }

  if (lista) {
    return (
      <Aviso titulo="Contraseña guardada">
        Ya puedes entrar con tu correo y la contraseña que elegiste.{" "}
        <a
          href="/admin/entrar"
          className="font-semibold text-verde-hoja hover:underline"
        >
          Ir al inicio de sesión
        </a>
        .
      </Aviso>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        Elige una contraseña de al menos {LARGO_MINIMO} caracteres. Una frase
        que recuerdes resiste mejor que una palabra corta con símbolos.
      </p>

      <Campo
        id="clave"
        etiqueta="Contraseña nueva"
        valor={clave}
        alCambiar={setClave}
        error={corta ? `Faltan ${LARGO_MINIMO - clave.length} caracteres` : undefined}
        autoComplete="new-password"
      />

      <Campo
        id="repetida"
        etiqueta="Repite la contraseña"
        valor={repetida}
        alCambiar={setRepetida}
        error={distintas ? "Las dos contraseñas no coinciden" : undefined}
        autoComplete="new-password"
      />

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!puedeEnviar}
        className="mt-6 w-full rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-50"
      >
        {enviando ? "Guardando…" : "Guardar contraseña"}
      </button>

      <p className="mt-4 text-xs text-gray-500">
        Al guardarla se cierran todas las sesiones abiertas de tu cuenta.
      </p>
    </form>
  );
}

function Campo({
  id,
  etiqueta,
  valor,
  alCambiar,
  error,
  autoComplete,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  alCambiar: (valor: string) => void;
  error?: string;
  autoComplete: string;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-azul-confianza"
      >
        {etiqueta}
      </label>
      <input
        id={id}
        type="password"
        value={valor}
        autoComplete={autoComplete}
        onChange={(evento) => alCambiar(evento.target.value)}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}

function Aviso({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-t-4 border-verde-hoja bg-white p-8 shadow-sm">
      <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
        {titulo}
      </h2>
      <p className="text-sm leading-relaxed text-gray-700">{children}</p>
    </section>
  );
}
