"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ETIQUETA_CONTENIDO,
  api,
  fechaCorta,
  type Contenido,
} from "../../lib/admin/api";
import { useManejadorDeError } from "../marco-admin";

export function ListaContenidos() {
  const manejarError = useManejadorDeError();
  const [tipo, setTipo] = useState("");
  const [items, setItems] = useState<Contenido[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;
    api
      .contenidos(tipo || undefined)
      .then((datos) => {
        if (vigente) setItems(datos);
      })
      .catch((fallo) => {
        if (vigente) setError(manejarError(fallo));
      });
    return () => {
      vigente = false;
    };
    // manejarError se recrea en cada render y no aporta como dependencia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={tipo}
          onChange={(e) => {
            setItems(null);
            setTipo(e.target.value);
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-verde-hoja"
        >
          <option value="">Todos los tipos</option>
          {Object.entries(ETIQUETA_CONTENIDO).map(([valor, etiqueta]) => (
            <option key={valor} value={valor}>
              {etiqueta}
            </option>
          ))}
        </select>

        <Link
          href="/admin/contenidos/nuevo"
          className="ml-auto rounded-lg bg-verde-hoja px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-verde-bosque"
        >
          Nuevo contenido
        </Link>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {!items ? (
        <p className="text-sm text-gray-500">Cargando…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="font-semibold text-azul-confianza">
            Todavía no hay contenidos
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Las secciones de campañas, iniciativas y proyectos del sitio se
            llenan desde aquí.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/admin/contenidos/${item.id}`}
                className="block h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-verde-hoja hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    {ETIQUETA_CONTENIDO[item.kind] ?? item.kind}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                      item.status === "published"
                        ? "border-green-300 bg-green-50 text-green-800"
                        : "border-gray-300 bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "published" ? "Publicado" : "Borrador"}
                  </span>
                </div>
                <h2 className="mb-1 font-montserrat font-bold text-azul-confianza">
                  {item.title}
                </h2>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {item.summary}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  Editado el {fechaCorta(item.updatedAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
