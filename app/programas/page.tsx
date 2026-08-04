import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UniversalCta } from "../components/cta/universal-cta";
import { CuerpoInterno, EncabezadoInterno } from "../components/pagina-interna";
import { ACENTOS, PROGRAMAS } from "../lib/programas";

export const metadata: Metadata = {
  title: "Líneas de acción",
  description:
    "Los cuatro ámbitos de trabajo de RaícesCare: salud y cuidado, educación, bio-Amazonía y cooperación, sujetos a disponibilidad de recursos, alianzas y capacidades técnicas.",
  alternates: { canonical: "/programas" },
};

export default function CatalogoProgramas() {
  return (
    <>
      <EncabezadoInterno
        titulo="Nuestras líneas de acción"
        descripcion="Organizamos nuestro trabajo en cuatro ámbitos complementarios, sujetos a la disponibilidad de recursos, alianzas, capacidades técnicas y evaluación de cada intervención."
      />

      <CuerpoInterno>
        <p className="text-sm text-gray-600">
          Los cuatro programas se presentan con la misma jerarquía. No publicamos
          cifras de impacto mientras no cuenten con periodo, fuente y estado de
          validación.
        </p>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROGRAMAS.map((programa) => (
            <li
              key={programa.slug}
              className={`flex flex-col overflow-hidden rounded-xl border-t-4 bg-white shadow-sm ${ACENTOS[programa.acento]}`}
            >
              <div className="relative aspect-16/9 w-full bg-white">
                <Image
                  src={programa.pieza}
                  alt={programa.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <Link
                  href={`/programas/${programa.slug}`}
                  className="font-montserrat text-xl font-bold text-verde-bosque hover:underline"
                >
                  {programa.nombre}
                </Link>
                <p className="text-sm leading-relaxed text-gray-700">
                  {programa.intervencion}
                </p>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  {programa.acciones.map((accion, indice) => (
                    <UniversalCta
                      key={`${programa.slug}-${indice}`}
                      {...(accion.contextual
                        ? { contextual: accion.contextual }
                        : { code: accion.code! })}
                      location="programas"
                      params={{ program: programa.slug, ...accion.params }}
                      variant={indice === 0 ? "primary" : "secondary"}
                      className="flex-1"
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CuerpoInterno>
    </>
  );
}
