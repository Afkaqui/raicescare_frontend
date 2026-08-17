"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "../../lib/cta/tracking";

export function EntrarForm() {
  const router = useRouter();
  const parametros = useSearchParams();
  // Llega precargado cuando se viene redirigido desde la cuenta de aportantes.
  const [email, setEmail] = useState(parametros.get("email") ?? "");
  const [clave, setClave] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recuperando, setRecuperando] = useState(false);
  const [avisoRecuperacion, setAvisoRecuperacion] = useState<string | null>(null);

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sin esto el navegador descarta la cookie de sesión: la API vive en
        // otro subdominio.
        credentials: "include",
        body: JSON.stringify({ email, password: clave }),
      });

      if (!respuesta.ok) {
        const datos = (await respuesta.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(datos?.message ?? "No pudimos iniciar sesión");
      }

      router.push("/admin");
      router.refresh();
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error inesperado");
      setEnviando(false);
    }
  }

  /** La respuesta es la misma exista o no la cuenta; el texto lo refleja. */
  async function recuperar() {
    if (!email) {
      setError("Escribe tu correo para enviarte el enlace");
      return;
    }
    setRecuperando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_BASE_URL}/api/v1/auth/recovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const datos = (await respuesta.json().catch(() => null)) as {
        mensaje?: string;
      } | null;
      setAvisoRecuperacion(
        datos?.mensaje ??
          "Si el correo corresponde a una cuenta activa, enviamos un enlace.",
      );
    } catch {
      setError("No pudimos procesar el pedido. Intenta de nuevo.");
    } finally {
      setRecuperando(false);
    }
  }

  return (
    <form
      onSubmit={entrar}
      className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-4">
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-azul-confianza">
          Correo institucional
        </label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="clave" className="mb-1.5 block text-sm font-semibold text-azul-confianza">
          Contraseña
        </label>
        <input
          id="clave"
          type="password"
          value={clave}
          autoComplete="current-password"
          onChange={(e) => setClave(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30"
        />
      </div>

      <button
        type="button"
        onClick={recuperar}
        disabled={recuperando}
        className="mb-6 text-xs font-semibold text-verde-hoja hover:underline disabled:opacity-60"
      >
        {recuperando ? "Enviando…" : "Olvidé mi contraseña"}
      </button>

      {avisoRecuperacion && (
        <p className="mb-4 rounded-lg border border-gray-200 bg-gris-niebla/60 p-4 text-sm text-gray-700">
          {avisoRecuperacion}
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
