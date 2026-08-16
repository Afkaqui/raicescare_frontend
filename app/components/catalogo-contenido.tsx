import Image from "next/image";
import Link from "next/link";
import {
  enlaceDe,
  fecha,
  importe,
  listarContenido,
  urlDeImagen,
  type Contenido,
} from "../lib/contenido";
import { CatalogoVacio } from "./catalogo-vacio";

/**
 * Catálogo de campañas, iniciativas o proyectos publicados desde el panel.
 *
 * Cuando no hay nada publicado cae al estado vacío de siempre, que no es un
 * error sino una postura: la arquitectura pide no inventar contenido ni dejar
 * una página muda, sino ofrecer registrar interés.
 */
export async function CatalogoContenido({
  kind,
  programa,
  vacio,
}: {
  kind: "campaign" | "initiative" | "project";
  programa?: string;
  vacio: { titulo: string; descripcion: string; programaCta: string };
}) {
  const items = await listarContenido(kind, programa);

  if (items.length === 0) {
    return (
      <CatalogoVacio
        titulo={vacio.titulo}
        descripcion={vacio.descripcion}
        programa={vacio.programaCta}
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.slug}>
          <Tarjeta contenido={item} />
        </li>
      ))}
    </ul>
  );
}

function Tarjeta({ contenido }: { contenido: Contenido }) {
  return (
    <Link
      href={enlaceDe(contenido)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-verde-hoja hover:shadow-md"
    >
      {contenido.portada && (
        <div className="relative aspect-16/9 w-full bg-white">
          <Image
            src={urlDeImagen(contenido.portada.url)}
            alt={contenido.portada.altText ?? contenido.title}
            fill
            // Sin recorte: las piezas se ven completas, como el resto del sitio.
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-montserrat text-lg font-bold text-azul-confianza group-hover:text-verde-bosque">
          {contenido.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">
          {contenido.summary}
        </p>

        <dl className="space-y-1 text-xs text-gray-500">
          {contenido.location && (
            <div className="flex gap-2">
              <dt className="font-semibold">Lugar</dt>
              <dd>{contenido.location}</dd>
            </div>
          )}
          {contenido.startsOn && (
            <div className="flex gap-2">
              <dt className="font-semibold">Desde</dt>
              <dd>{fecha(contenido.startsOn)}</dd>
            </div>
          )}
          {contenido.goalAmount && (
            <div className="flex gap-2">
              <dt className="font-semibold">Meta</dt>
              <dd>{importe(contenido.goalAmount, contenido.goalCurrency)}</dd>
            </div>
          )}
        </dl>

        <span className="mt-4 text-sm font-semibold text-verde-hoja">
          Ver detalle ›
        </span>
      </div>
    </Link>
  );
}
