import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UniversalCta } from "../../components/cta/universal-cta";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { ACENTOS, PROGRAMAS, obtenerPrograma } from "../../lib/programas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGRAMAS.map((programa) => ({ slug: programa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programa = obtenerPrograma(slug);
  if (!programa) return {};
  return {
    title: programa.nombre,
    description: programa.intervencion,
    alternates: { canonical: `/programas/${programa.slug}` },
  };
}

export default async function FichaPrograma({ params }: Props) {
  const { slug } = await params;
  const programa = obtenerPrograma(slug);
  if (!programa) notFound();

  return (
    <>
      <EncabezadoInterno
        titulo={programa.nombre}
        descripcion={programa.desafio}
        migaDeVuelta={{ href: "/programas", label: "Líneas de acción" }}
      />

      <CuerpoInterno>
        <div
          className={`overflow-hidden rounded-xl border-t-4 bg-white shadow-sm ${ACENTOS[programa.acento]}`}
        >
          <div className="relative aspect-16/9 w-full bg-white">
            <Image
              src={programa.pieza}
              alt={programa.alt}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <span className="mb-6 inline-block rounded-full border border-gray-300 bg-gris-niebla px-3 py-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
            Programa en estructuración
          </span>
          <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
            Desafío
          </h2>
          <p className="mb-6 leading-relaxed text-gray-700">
            {programa.desafio}
          </p>
          <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
            Nuestra intervención
          </h2>
          <p className="leading-relaxed text-gray-700">
            {programa.intervencion}
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {programa.acciones.map((accion, indice) => (
            <UniversalCta
              key={`${programa.slug}-ficha-${indice}`}
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
      </CuerpoInterno>
    </>
  );
}
