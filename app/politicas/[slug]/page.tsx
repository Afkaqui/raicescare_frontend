import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CuerpoInterno, EncabezadoInterno } from "../../components/pagina-interna";
import {
  DOCUMENTOS,
  FECHA_ACTUALIZACION,
  VERSION_DOCUMENTOS,
  documentoPorSlug,
  type Seccion,
} from "../../lib/politicas/documentos";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCUMENTOS.map((documento) => ({ slug: documento.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const documento = documentoPorSlug(slug);
  if (!documento) return {};

  return {
    title: documento.titulo,
    description: documento.descripcionMeta,
    alternates: { canonical: `/politicas/${documento.slug}` },
  };
}

export default async function Politica({ params }: Props) {
  const { slug } = await params;
  const documento = documentoPorSlug(slug);
  if (!documento) notFound();

  return (
    <>
      <EncabezadoInterno
        titulo={documento.titulo}
        descripcion={documento.resumen}
      />

      <CuerpoInterno>
        <BorradorAviso />

        <p className="text-sm text-gray-500">
          Última actualización: {FECHA_ACTUALIZACION} · Versión{" "}
          <code className="rounded bg-gris-niebla px-1.5 py-0.5 text-xs">
            {VERSION_DOCUMENTOS}
          </code>
        </p>

        {documento.secciones.map((seccion) => (
          <SeccionDocumento key={seccion.titulo} seccion={seccion} />
        ))}

        <nav className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
            Otros documentos
          </h2>
          <ul className="space-y-2 text-sm">
            {DOCUMENTOS.filter((otro) => otro.slug !== documento.slug).map(
              (otro) => (
                <li key={otro.slug}>
                  <Link
                    href={`/politicas/${otro.slug}`}
                    className="font-semibold text-verde-hoja hover:underline"
                  >
                    {otro.titulo}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </CuerpoInterno>
    </>
  );
}

function BorradorAviso() {
  return (
    <section className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
      <h2 className="mb-2 font-montserrat text-base font-bold text-amber-900">
        Borrador pendiente de revisión legal
      </h2>
      <p className="text-sm leading-relaxed text-amber-900">
        Este documento describe con exactitud lo que la plataforma hace hoy y se
        redactó siguiendo la Ley N.° 29733 y su Reglamento (D.S. N.°
        016-2024-JUS). Todavía no ha sido revisado por asesoría legal, y algunos
        puntos —señalados dentro del texto— dependen de decisiones que la
        organización aún debe tomar.
      </p>
    </section>
  );
}

function SeccionDocumento({ seccion }: { seccion: Seccion }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
        {seccion.titulo}
      </h2>

      {seccion.parrafos?.map((parrafo) => (
        <p key={parrafo.slice(0, 40)} className="mb-4 text-sm leading-relaxed text-gray-700 last:mb-0">
          {parrafo}
        </p>
      ))}

      {seccion.lista && (
        <ul className="mt-2 space-y-2 text-sm text-gray-700">
          {seccion.lista.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-verde-hoja" aria-hidden="true">
                ›
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {seccion.tabla && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-gris-niebla">
                {seccion.tabla.encabezados.map((encabezado) => (
                  <th
                    key={encabezado}
                    className="py-2 pr-4 font-semibold text-azul-confianza"
                  >
                    {encabezado}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seccion.tabla.filas.map((fila) => (
                <tr key={fila.join("|")} className="border-b border-gray-100">
                  {fila.map((celda) => (
                    <td key={celda} className="py-3 pr-4 align-top text-gray-700">
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {seccion.aviso && (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed font-semibold text-amber-900">
          {seccion.aviso}
        </p>
      )}
    </section>
  );
}
