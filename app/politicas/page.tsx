import type { Metadata } from "next";
import Link from "next/link";
import { CuerpoInterno, EncabezadoInterno } from "../components/pagina-interna";
import { DOCUMENTOS, FECHA_ACTUALIZACION } from "../lib/politicas/documentos";

export const metadata: Metadata = {
  title: "Políticas y legales",
  description:
    "Política de privacidad, tratamiento de datos personales, cookies, términos de uso, aportes y canal de integridad de RaícesCare.",
  alternates: { canonical: "/politicas" },
};

export default function Politicas() {
  return (
    <>
      <EncabezadoInterno
        titulo="Políticas y legales"
        descripcion="Qué hacemos con la información que nos confías, bajo qué condiciones usamos este sitio y cómo puedes reclamarnos."
      />

      <CuerpoInterno>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DOCUMENTOS.map((documento) => (
            <li key={documento.slug}>
              <Link
                href={`/politicas/${documento.slug}`}
                className="block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-verde-hoja hover:shadow-md"
              >
                <h2 className="mb-2 font-montserrat text-lg font-bold text-azul-confianza">
                  {documento.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  {documento.resumen}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500">
          Todos los documentos se actualizaron el {FECHA_ACTUALIZACION} y están
          pendientes de revisión legal.
        </p>
      </CuerpoInterno>
    </>
  );
}
