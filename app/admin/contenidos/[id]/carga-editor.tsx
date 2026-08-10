"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, type Actor, type Contenido } from "../../../lib/admin/api";
import { useManejadorDeError } from "../../marco-admin";
import { Editor } from "../editor";

/**
 * Carga el contenido y quién lo está editando. El rol se consulta aquí y no se
 * hereda del marco porque el editor lo necesita para decidir si muestra el
 * botón de eliminar — que igual la API vuelve a comprobar.
 */
export function CargaEditor({ id }: { id: string }) {
  const manejarError = useManejadorDeError();
  const [contenido, setContenido] = useState<Contenido | null>(null);
  const [actor, setActor] = useState<Actor | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;
    Promise.all([api.contenido(id), api.yo()])
      .then(([item, yo]) => {
        if (!vigente) return;
        setContenido(item);
        setActor(yo.usuario);
      })
      .catch((fallo) => {
        if (vigente) setError(manejarError(fallo));
      });
    return () => {
      vigente = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-700">{error}</p>
        <Link
          href="/admin/contenidos"
          className="mt-3 inline-block text-sm font-semibold text-verde-hoja hover:underline"
        >
          Volver a contenidos
        </Link>
      </div>
    );
  }

  if (!contenido || !actor) {
    return <p className="text-sm text-gray-500">Cargando contenido…</p>;
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/contenidos"
          className="text-sm font-semibold text-verde-hoja hover:underline"
        >
          ‹ Contenidos
        </Link>
        <h1 className="mt-2 font-montserrat text-2xl font-bold text-verde-bosque">
          {contenido.title}
        </h1>
      </div>
      <Editor existente={contenido} esSuperadmin={actor.role === "superadmin"} />
    </>
  );
}
