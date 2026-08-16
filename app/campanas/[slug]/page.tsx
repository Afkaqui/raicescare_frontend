import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetalleContenido } from "../../components/detalle-contenido";
import { obtenerContenido, urlAbsoluta, urlDeImagen } from "../../lib/contenido";
import { SECCIONES } from "../../lib/contenido-rutas";

const SECCION = SECCIONES.campanas;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const contenido = await obtenerContenido(SECCION.kind, slug);
  if (!contenido) return { title: "No encontrado" };

  const ruta = `/${SECCION.ruta}/${contenido.slug}`;
  return {
    title: contenido.title,
    description: contenido.summary,
    alternates: { canonical: ruta },
    openGraph: {
      title: contenido.title,
      description: contenido.summary,
      url: urlAbsoluta(ruta),
      type: "article",
      images: contenido.portada
        ? [urlDeImagen(contenido.portada.url)]
        : undefined,
    },
  };
}

export default async function DetalleCampanas({ params }: Props) {
  const { slug } = await params;
  const contenido = await obtenerContenido(SECCION.kind, slug);
  if (!contenido) notFound();

  return <DetalleContenido contenido={contenido} />;
}
