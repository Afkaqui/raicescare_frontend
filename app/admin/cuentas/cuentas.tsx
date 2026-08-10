"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/cta/tracking";
import { SesionExpirada, fechaCorta, type Actor } from "../../lib/admin/api";
import { useManejadorDeError } from "../marco-admin";

type Cuenta = Actor & {
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  lockedUntil: string | null;
};

async function pedir<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(`${API_BASE_URL}/api/v1${ruta}`, {
    ...opciones,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opciones.headers },
  });
  if (respuesta.status === 401) throw new SesionExpirada();
  if (!respuesta.ok) {
    const datos = (await respuesta.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(datos?.message ?? `Error ${respuesta.status}`);
  }
  return respuesta.json() as Promise<T>;
}

export function Cuentas() {
  const manejarError = useManejadorDeError();
  const [cuentas, setCuentas] = useState<Cuenta[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("admin");
  const [creando, setCreando] = useState(false);

  async function cargar() {
    try {
      setCuentas(await pedir<Cuenta[]>("/users"));
    } catch (fallo) {
      setError(manejarError(fallo));
    }
  }

  useEffect(() => {
    void cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function crear(evento: React.FormEvent) {
    evento.preventDefault();
    setCreando(true);
    setError(null);
    setAviso(null);

    try {
      const resultado = await pedir<{
        invitacionEnviada: boolean;
        aviso?: string;
      }>("/users", {
        method: "POST",
        body: JSON.stringify({ email, fullName: nombre, role: rol }),
      });

      setAviso(
        resultado.invitacionEnviada
          ? `Cuenta creada. Le enviamos a ${email} un enlace para que elija su contraseña.`
          : (resultado.aviso ?? "Cuenta creada, pero no se pudo enviar la invitación."),
      );
      setEmail("");
      setNombre("");
      await cargar();
    } catch (fallo) {
      setError(manejarError(fallo));
    } finally {
      setCreando(false);
    }
  }

  async function accion(ruta: string, opciones: RequestInit, exito: string) {
    setError(null);
    setAviso(null);
    try {
      await pedir(ruta, opciones);
      setAviso(exito);
      await cargar();
    } catch (fallo) {
      setError(manejarError(fallo));
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 font-montserrat text-base font-bold text-verde-bosque">
          Crear una cuenta
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          No se define ninguna contraseña desde aquí: se le envía un enlace para
          que la elija. Ni tú llegas a conocerla.
        </p>

        <form onSubmit={crear} className="grid gap-3 sm:grid-cols-[1fr_1fr_10rem_auto]">
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            className={entrada}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className={entrada}
          />
          <select value={rol} onChange={(e) => setRol(e.target.value)} className={entrada}>
            <option value="admin">Administrador</option>
            <option value="superadmin">Superadministrador</option>
          </select>
          <button
            type="submit"
            disabled={creando}
            className="rounded-lg bg-verde-hoja px-5 py-2 text-sm font-semibold text-white transition hover:bg-verde-bosque disabled:opacity-50"
          >
            {creando ? "Creando…" : "Crear"}
          </button>
        </form>
      </section>

      {aviso && (
        <p className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {aviso}
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b-2 border-gris-niebla bg-gris-niebla/40">
              <tr>
                {["Persona", "Rol", "Estado", "Último acceso", "Acciones"].map((c) => (
                  <th key={c} className="px-4 py-3 font-semibold text-azul-confianza">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(cuentas ?? []).map((cuenta) => (
                <tr key={cuenta.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-800">
                      {cuenta.fullName}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {cuenta.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {cuenta.role === "superadmin" ? "Superadministrador" : "Administrador"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                        cuenta.status === "active"
                          ? "border-green-300 bg-green-50 text-green-800"
                          : "border-gray-300 bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cuenta.status === "active" ? "Activa" : "Suspendida"}
                    </span>
                    {cuenta.lockedUntil && (
                      <span className="ml-2 text-xs text-amber-700">bloqueada</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cuenta.lastLoginAt ? fechaCorta(cuenta.lastLoginAt) : "nunca entró"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() =>
                          accion(
                            `/users/${cuenta.id}/force-password-change`,
                            { method: "POST" },
                            `Se le envió a ${cuenta.email} un enlace para elegir contraseña nueva. Sus sesiones quedaron cerradas.`,
                          )
                        }
                        className="text-verde-hoja hover:underline"
                      >
                        Enviar enlace
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          accion(
                            `/users/${cuenta.id}/status`,
                            {
                              method: "PATCH",
                              body: JSON.stringify({
                                status: cuenta.status === "active" ? "suspended" : "active",
                              }),
                            },
                            cuenta.status === "active"
                              ? "Cuenta suspendida y sesiones cerradas."
                              : "Cuenta reactivada.",
                          )
                        }
                        className="text-gray-600 hover:underline"
                      >
                        {cuenta.status === "active" ? "Suspender" : "Reactivar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Se eliminará la cuenta de ${cuenta.fullName}. Lo que hizo seguirá constando en la bitácora.\n\n¿Eliminar?`,
                            )
                          ) {
                            void accion(
                              `/users/${cuenta.id}`,
                              { method: "DELETE" },
                              "Cuenta eliminada.",
                            );
                          }
                        }}
                        className="text-red-700 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!cuentas && <p className="p-8 text-center text-sm text-gray-500">Cargando…</p>}
      </div>

      <p className="text-sm text-gray-500">
        Suspender cierra sus sesiones al instante. Eliminar no borra su rastro:
        el historial de los expedientes sigue diciendo quién decidió qué.
      </p>
    </div>
  );
}

const entrada =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30";
