"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SesionExpirada, api, type Actor } from "../lib/admin/api";

/**
 * Marco de la plataforma interna: comprueba la sesión y monta la navegación.
 *
 * La comprobación ocurre en el cliente porque la sesión vive en una cookie de
 * otro subdominio. No es la barrera de seguridad —esa está en la API, que
 * rechaza cualquier petición sin sesión válida—, solo evita mostrar una
 * pantalla vacía a quien no ha entrado.
 */
export function MarcoAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ruta = usePathname();
  const [actor, setActor] = useState<Actor | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vigente = true;

    api
      .yo()
      .then((datos) => {
        if (vigente) setActor(datos.usuario);
      })
      .catch(() => {
        if (vigente) router.replace("/admin/entrar");
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [router]);

  async function salir() {
    await api.salir().catch(() => undefined);
    router.replace("/admin/entrar");
  }

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Comprobando tu sesión…</p>
      </div>
    );
  }

  if (!actor) return null;

  const enlaces = [
    { href: "/admin", etiqueta: "Bandeja" },
    ...(actor.role === "superadmin"
      ? [{ href: "/admin/cuentas", etiqueta: "Cuentas" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gris-niebla/40">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <Link href="/admin" className="font-montserrat font-bold text-verde-bosque">
            Plataforma interna
          </Link>

          <nav className="flex gap-1">
            {enlaces.map((enlace) => {
              const activo =
                enlace.href === "/admin"
                  ? ruta === "/admin"
                  : ruta.startsWith(enlace.href);
              return (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    activo
                      ? "bg-verde-hoja/10 text-verde-bosque"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {enlace.etiqueta}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              {actor.fullName}
              {actor.role === "superadmin" && (
                <span className="ml-2 rounded bg-azul-confianza px-2 py-0.5 text-xs font-semibold text-white">
                  superadmin
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={salir}
              className="font-semibold text-verde-hoja hover:underline"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

/** Traduce el vencimiento de sesión en una vuelta al inicio, no en un error. */
export function useManejadorDeError() {
  const router = useRouter();
  return (error: unknown): string => {
    if (error instanceof SesionExpirada) {
      router.replace("/admin/entrar");
      return "Tu sesión venció. Vuelve a entrar.";
    }
    return error instanceof Error ? error.message : "Error inesperado";
  };
}
