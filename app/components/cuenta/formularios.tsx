"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LARGO_MINIMO_CLAVE, cuenta } from "../../lib/cuenta";

const entrada =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30";

function Campo({
  id,
  etiqueta,
  tipo = "text",
  valor,
  alCambiar,
  requerido,
  autoComplete,
  ayuda,
}: {
  id: string;
  etiqueta: string;
  tipo?: string;
  valor: string;
  alCambiar: (v: string) => void;
  requerido?: boolean;
  autoComplete?: string;
  ayuda?: string;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-azul-confianza"
      >
        {etiqueta}
        {requerido && <span className="ml-1 text-verde-hoja">*</span>}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        required={requerido}
        autoComplete={autoComplete}
        onChange={(e) => alCambiar(e.target.value)}
        className={entrada}
      />
      {ayuda && <p className="mt-1 text-xs text-gray-500">{ayuda}</p>}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      {children}
    </section>
  );
}

function MensajeError({ mensaje }: { mensaje: string }) {
  return (
    <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {mensaje}
    </p>
  );
}

// ------------------------------------------------------------------ registro

export function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [pais, setPais] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (clave.length < LARGO_MINIMO_CLAVE) {
      setError(`La contraseña debe tener al menos ${LARGO_MINIMO_CLAVE} caracteres`);
      return;
    }

    setEnviando(true);
    setError(null);
    try {
      await cuenta.registrar({
        email,
        fullName: nombre,
        password: clave,
        country: pais || undefined,
      });
      setListo(true);
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error inesperado");
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <Panel>
        <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
          Revisa tu correo
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          Te enviamos un enlace a <strong>{email}</strong> para confirmar que la
          dirección es tuya. Vence en 48 horas.
        </p>
        <p className="text-sm leading-relaxed text-gray-600">
          Si ya habías aportado antes con ese mismo correo, al confirmarlo esos
          aportes aparecerán en tu historial.
        </p>
      </Panel>
    );
  }

  return (
    <Panel>
      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        Crear una cuenta es opcional. Sirve para llevar el registro de tus
        aportes y consultarlos cuando quieras — puedes aportar sin ella.
      </p>

      <form onSubmit={enviar}>
        <Campo
          id="nombre"
          etiqueta="Nombre completo"
          valor={nombre}
          alCambiar={setNombre}
          requerido
          autoComplete="name"
        />
        <Campo
          id="email"
          etiqueta="Correo electrónico"
          tipo="email"
          valor={email}
          alCambiar={setEmail}
          requerido
          autoComplete="email"
        />
        <Campo
          id="clave"
          etiqueta="Contraseña"
          tipo="password"
          valor={clave}
          alCambiar={setClave}
          requerido
          autoComplete="new-password"
          ayuda={`Al menos ${LARGO_MINIMO_CLAVE} caracteres. Una frase que recuerdes resiste mejor que una palabra corta con símbolos.`}
        />
        <Campo
          id="pais"
          etiqueta="País (opcional)"
          valor={pais}
          alCambiar={setPais}
          autoComplete="country-name"
        />

        {error && <MensajeError mensaje={error} />}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-60"
        >
          {enviando ? "Creando…" : "Crear mi cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/cuenta/entrar" className="font-semibold text-verde-hoja hover:underline">
          Entra aquí
        </Link>
      </p>
    </Panel>
  );
}

// -------------------------------------------------------------------- entrar

export function FormularioEntrar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      await cuenta.entrar(email, clave);
      router.push("/mi-cuenta");
      router.refresh();
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error inesperado");
      setEnviando(false);
    }
  }

  async function recuperar() {
    if (!email) {
      setError("Escribe tu correo para enviarte el enlace");
      return;
    }
    setError(null);
    try {
      const { mensaje } = await cuenta.recuperar(email);
      setAviso(mensaje);
    } catch {
      setError("No pudimos procesar el pedido. Intenta de nuevo.");
    }
  }

  return (
    <Panel>
      <form onSubmit={enviar}>
        <Campo
          id="email"
          etiqueta="Correo electrónico"
          tipo="email"
          valor={email}
          alCambiar={setEmail}
          requerido
          autoComplete="email"
        />
        <Campo
          id="clave"
          etiqueta="Contraseña"
          tipo="password"
          valor={clave}
          alCambiar={setClave}
          requerido
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={recuperar}
          className="mb-6 text-xs font-semibold text-verde-hoja hover:underline"
        >
          Olvidé mi contraseña
        </button>

        {aviso && (
          <p className="mb-4 rounded-lg border border-gray-200 bg-gris-niebla/60 p-4 text-sm text-gray-700">
            {aviso}
          </p>
        )}
        {error && <MensajeError mensaje={error} />}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-60"
        >
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Todavía no tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-verde-hoja hover:underline">
          Crear una
        </Link>
      </p>
    </Panel>
  );
}

// ---------------------------------------------------------------- verificar

export function ConfirmarCorreo() {
  const parametros = useSearchParams();
  const token = parametros.get("token") ?? "";
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando");
  const [reclamados, setReclamados] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setEstado("error");
      setError("Este enlace no trae la información necesaria. Ábrelo tal como llegó.");
      return;
    }

    cuenta
      .verificar(token)
      .then((resultado) => {
        setReclamados((resultado as { reclamados?: number }).reclamados ?? 0);
        setEstado("listo");
      })
      .catch((fallo: Error) => {
        setError(fallo.message);
        setEstado("error");
      });
  }, [token]);

  if (estado === "cargando") {
    return (
      <Panel>
        <p className="text-sm text-gray-600">Confirmando tu correo…</p>
      </Panel>
    );
  }

  if (estado === "error") {
    return (
      <Panel>
        <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
          No pudimos confirmar el correo
        </h2>
        <p className="mb-4 text-sm text-gray-700">{error}</p>
        <Link href="/registro" className="text-sm font-semibold text-verde-hoja hover:underline">
          Volver a registrarme
        </Link>
      </Panel>
    );
  }

  return (
    <Panel>
      <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
        Correo confirmado
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        Tu cuenta ya está lista.
        {reclamados > 0 && (
          <>
            {" "}
            Encontramos <strong>{reclamados}</strong>{" "}
            {reclamados === 1 ? "aporte anterior" : "aportes anteriores"} hechos
            con este correo y los sumamos a tu historial.
          </>
        )}
      </p>
      <Link
        href="/cuenta/entrar"
        className="inline-flex rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde-bosque"
      >
        Entrar a mi cuenta
      </Link>
    </Panel>
  );
}

// -------------------------------------------------------------------- clave

export function ElegirClave() {
  const parametros = useSearchParams();
  const token = parametros.get("token") ?? "";
  const [clave, setClave] = useState("");
  const [repetida, setRepetida] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  if (!token) {
    return (
      <Panel>
        <p className="text-sm text-gray-700">
          Este enlace no trae la información necesaria. Ábrelo tal como llegó en
          el correo.
        </p>
      </Panel>
    );
  }

  if (listo) {
    return (
      <Panel>
        <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
          Contraseña guardada
        </h2>
        <Link
          href="/cuenta/entrar"
          className="inline-flex rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white transition hover:bg-verde-bosque"
        >
          Entrar a mi cuenta
        </Link>
      </Panel>
    );
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (clave !== repetida) {
      setError("Las dos contraseñas no coinciden");
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await cuenta.definirClave(token, clave);
      setListo(true);
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error inesperado");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Panel>
      <form onSubmit={enviar}>
        <Campo
          id="clave"
          etiqueta="Contraseña nueva"
          tipo="password"
          valor={clave}
          alCambiar={setClave}
          requerido
          autoComplete="new-password"
          ayuda={`Al menos ${LARGO_MINIMO_CLAVE} caracteres.`}
        />
        <Campo
          id="repetida"
          etiqueta="Repite la contraseña"
          tipo="password"
          valor={repetida}
          alCambiar={setRepetida}
          requerido
          autoComplete="new-password"
        />
        {error && <MensajeError mensaje={error} />}
        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-verde-hoja px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-verde-bosque disabled:opacity-60"
        >
          {enviando ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </Panel>
  );
}
