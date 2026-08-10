"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ETIQUETA_CONTENIDO,
  PROGRAMAS_CODIGO,
  aSlug,
  api,
  subirArchivo,
  type Archivo,
  type Contenido,
  type ContenidoForm,
} from "../../lib/admin/api";
import { API_BASE_URL } from "../../lib/cta/tracking";
import { useManejadorDeError } from "../marco-admin";

const VACIO: ContenidoForm = {
  kind: "campaign",
  slug: "",
  title: "",
  summary: "",
  body: "",
  status: "draft",
};

export function Editor({
  existente,
  esSuperadmin,
}: {
  existente?: Contenido;
  esSuperadmin: boolean;
}) {
  const router = useRouter();
  const manejarError = useManejadorDeError();

  const [datos, setDatos] = useState<ContenidoForm>(
    existente
      ? {
          kind: existente.kind,
          slug: existente.slug,
          title: existente.title,
          summary: existente.summary,
          body: existente.body,
          programCode: existente.programCode ?? undefined,
          location: existente.location ?? undefined,
          startsOn: existente.startsOn?.slice(0, 10),
          endsOn: existente.endsOn?.slice(0, 10),
          goalAmount: existente.goalAmount ? Number(existente.goalAmount) : undefined,
          goalCurrency: existente.goalCurrency ?? undefined,
          coverMediaId: existente.coverMediaId ?? undefined,
          status: existente.status,
        }
      : VACIO,
  );

  const [portada, setPortada] = useState<Archivo | null>(
    existente?.portada
      ? {
          id: existente.coverMediaId ?? "",
          url: `/api/v1/media/${existente.portada.storageKey}`,
          originalName: "",
          width: null,
          height: null,
          altText: existente.portada.altText,
        }
      : null,
  );

  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const entradaArchivo = useRef<HTMLInputElement>(null);
  // El slug se deriva del título solo mientras nadie lo haya tocado a mano.
  const slugManual = useRef(Boolean(existente));

  function actualizar<C extends keyof ContenidoForm>(
    campo: C,
    valor: ContenidoForm[C],
  ) {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
  }

  useEffect(() => {
    if (!slugManual.current && datos.title) {
      setDatos((previo) => ({ ...previo, slug: aSlug(previo.title) }));
    }
  }, [datos.title]);

  async function elegirArchivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    setSubiendo(true);
    setError(null);
    try {
      const subido = await subirArchivo(
        archivo,
        datos.title ? `Imagen de ${datos.title}` : "",
      );
      setPortada(subido);
      actualizar("coverMediaId", subido.id);
    } catch (fallo) {
      setError(manejarError(fallo));
    } finally {
      setSubiendo(false);
      if (entradaArchivo.current) entradaArchivo.current.value = "";
    }
  }

  async function guardar(estado: "draft" | "published") {
    setGuardando(true);
    setError(null);
    setAviso(null);

    const cuerpo: ContenidoForm = {
      ...datos,
      status: estado,
      // Los vacíos se omiten: el validador espera ausencia, no cadena vacía.
      programCode: datos.programCode || undefined,
      location: datos.location || undefined,
      startsOn: datos.startsOn || undefined,
      endsOn: datos.endsOn || undefined,
      goalAmount: datos.goalAmount || undefined,
      goalCurrency: datos.goalAmount ? (datos.goalCurrency ?? "PEN") : undefined,
      coverMediaId: datos.coverMediaId || undefined,
    };

    try {
      if (existente) {
        await api.guardarContenido(existente.id, cuerpo);
        setDatos((previo) => ({ ...previo, status: estado }));
        setAviso(
          estado === "published" ? "Publicado y visible en el sitio." : "Guardado como borrador.",
        );
      } else {
        const creado = await api.crearContenido(cuerpo);
        router.replace(`/admin/contenidos/${creado.id}`);
      }
    } catch (fallo) {
      setError(manejarError(fallo));
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar() {
    if (!existente) return;
    if (
      !window.confirm(
        `Se eliminará «${existente.title}» de forma definitiva. Si solo quieres quitarlo del sitio, usa «Despublicar».\n\n¿Eliminar igual?`,
      )
    ) {
      return;
    }

    try {
      await api.eliminarContenido(existente.id);
      router.replace("/admin/contenidos");
    } catch (fallo) {
      setError(manejarError(fallo));
    }
  }

  const publicado = datos.status === "published";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Tarjeta titulo="Contenido">
            <Campo etiqueta="Tipo">
              <select
                value={datos.kind}
                onChange={(e) => actualizar("kind", e.target.value)}
                disabled={Boolean(existente)}
                className={entrada}
              >
                {Object.entries(ETIQUETA_CONTENIDO).map(([valor, etiqueta]) => (
                  <option key={valor} value={valor}>
                    {etiqueta}
                  </option>
                ))}
              </select>
              {existente && (
                <p className="mt-1 text-xs text-gray-500">
                  El tipo no se cambia después de crear: forma parte de la
                  dirección pública.
                </p>
              )}
            </Campo>

            <Campo etiqueta="Título">
              <input
                value={datos.title}
                onChange={(e) => actualizar("title", e.target.value)}
                className={entrada}
              />
            </Campo>

            <Campo etiqueta="Dirección en el sitio">
              <input
                value={datos.slug}
                onChange={(e) => {
                  slugManual.current = true;
                  actualizar("slug", aSlug(e.target.value));
                }}
                className={`${entrada} font-mono text-xs`}
              />
              <p className="mt-1 text-xs text-gray-500">
                /{datos.kind === "campaign" ? "campanas" : datos.kind === "initiative" ? "iniciativas" : "proyectos"}/
                {datos.slug || "…"}
              </p>
            </Campo>

            <Campo etiqueta="Resumen">
              <textarea
                value={datos.summary}
                onChange={(e) => actualizar("summary", e.target.value)}
                rows={2}
                maxLength={400}
                className={entrada}
              />
              <p className="mt-1 text-xs text-gray-500">
                {datos.summary.length}/400 · aparece en los listados y en los
                buscadores.
              </p>
            </Campo>

            <Campo etiqueta="Cuerpo">
              <textarea
                value={datos.body}
                onChange={(e) => actualizar("body", e.target.value)}
                rows={12}
                className={entrada}
              />
              <p className="mt-1 text-xs text-gray-500">
                Separa los párrafos con una línea en blanco. No se admite
                marcado: el sitio se encarga del formato.
              </p>
            </Campo>
          </Tarjeta>

          <Tarjeta titulo="Detalles">
            <Campo etiqueta="Programa">
              <select
                value={datos.programCode ?? ""}
                onChange={(e) => actualizar("programCode", e.target.value)}
                className={entrada}
              >
                <option value="">Sin programa asociado</option>
                {PROGRAMAS_CODIGO.map((programa) => (
                  <option key={programa.valor} value={programa.valor}>
                    {programa.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo etiqueta="Lugar">
              <input
                value={datos.location ?? ""}
                onChange={(e) => actualizar("location", e.target.value)}
                placeholder="Callería, Ucayali"
                className={entrada}
              />
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo etiqueta="Inicio">
                <input
                  type="date"
                  value={datos.startsOn ?? ""}
                  onChange={(e) => actualizar("startsOn", e.target.value)}
                  className={entrada}
                />
              </Campo>
              <Campo etiqueta="Cierre">
                <input
                  type="date"
                  value={datos.endsOn ?? ""}
                  onChange={(e) => actualizar("endsOn", e.target.value)}
                  className={entrada}
                />
              </Campo>
            </div>

            {datos.kind === "campaign" && (
              <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                <Campo etiqueta="Meta de recaudación (opcional)">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={datos.goalAmount ?? ""}
                    onChange={(e) =>
                      actualizar(
                        "goalAmount",
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className={entrada}
                  />
                </Campo>
                <Campo etiqueta="Moneda">
                  <select
                    value={datos.goalCurrency ?? "PEN"}
                    onChange={(e) => actualizar("goalCurrency", e.target.value)}
                    className={entrada}
                  >
                    <option value="PEN">S/</option>
                    <option value="USD">US$</option>
                  </select>
                </Campo>
              </div>
            )}
          </Tarjeta>
        </div>

        <div className="space-y-6">
          <Tarjeta titulo="Portada">
            {portada ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${API_BASE_URL}${portada.url}`}
                  alt={portada.altText ?? "Portada seleccionada"}
                  className="w-full rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPortada(null);
                    actualizar("coverMediaId", undefined);
                  }}
                  className="text-xs font-semibold text-gray-600 hover:underline"
                >
                  Quitar portada
                </button>
              </div>
            ) : (
              <p className="mb-3 text-sm text-gray-600">
                Sin portada. El listado se verá solo con texto.
              </p>
            )}

            <input
              ref={entradaArchivo}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={elegirArchivo}
              className="mt-3 block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-verde-hoja file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-verde-bosque"
            />
            <p className="mt-2 text-xs text-gray-500">
              {subiendo ? "Subiendo…" : "PNG, JPG o WebP, hasta 6 MB."}
            </p>
          </Tarjeta>

          <Tarjeta titulo="Publicación">
            <p className="mb-4 text-sm">
              Estado actual:{" "}
              <strong className={publicado ? "text-verde-hoja" : "text-gray-600"}>
                {publicado ? "Publicado" : "Borrador"}
              </strong>
            </p>

            {aviso && (
              <p className="mb-3 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800">
                {aviso}
              </p>
            )}
            {error && (
              <p className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => guardar("published")}
                disabled={guardando}
                className="w-full rounded-lg bg-verde-hoja px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-verde-bosque disabled:opacity-50"
              >
                {guardando ? "Guardando…" : publicado ? "Guardar cambios" : "Publicar"}
              </button>

              <button
                type="button"
                onClick={() => guardar("draft")}
                disabled={guardando}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                {publicado ? "Despublicar" : "Guardar borrador"}
              </button>
            </div>

            {publicado && (
              <p className="mt-3 text-xs text-gray-500">
                Despublicar lo quita del sitio pero no lo borra: puedes volver a
                publicarlo cuando quieras.
              </p>
            )}
          </Tarjeta>

          {existente && esSuperadmin && (
            <Tarjeta titulo="Zona de riesgo">
              <button
                type="button"
                onClick={eliminar}
                className="w-full rounded-lg border-2 border-red-300 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Eliminar definitivamente
              </button>
              <p className="mt-2 text-xs text-gray-500">
                No tiene vuelta atrás. Solo el superadministrador puede hacerlo.
              </p>
            </Tarjeta>
          )}
        </div>
      </div>
    </div>
  );
}

const entrada =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-verde-hoja focus:ring-2 focus:ring-verde-hoja/30";

function Tarjeta({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-montserrat text-base font-bold text-verde-bosque">
        {titulo}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Campo({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-azul-confianza">
        {etiqueta}
      </label>
      {children}
    </div>
  );
}
