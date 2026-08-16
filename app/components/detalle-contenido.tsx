import Image from "next/image";
import Link from "next/link";
import {
  ETIQUETA_POR_TIPO,
  RUTA_POR_TIPO,
  fecha,
  importe,
  urlDeImagen,
  type Contenido,
} from "../lib/contenido";
import { UniversalCta } from "./cta/universal-cta";
import { CuerpoInterno, EncabezadoInterno } from "./pagina-interna";

/** Página de una campaña, iniciativa o proyecto publicado. */
export function DetalleContenido({ contenido }: { contenido: Contenido }) {
  const ruta = RUTA_POR_TIPO[contenido.kind as keyof typeof RUTA_POR_TIPO];
  const etiqueta =
    ETIQUETA_POR_TIPO[contenido.kind as keyof typeof ETIQUETA_POR_TIPO];

  return (
    <>
      <EncabezadoInterno
        titulo={contenido.title}
        descripcion={contenido.summary}
        migaDeVuelta={{ href: `/${ruta}`, label: etiqueta + "s" }}
      />

      <CuerpoInterno>
        {contenido.portada && (
          <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={urlDeImagen(contenido.portada.url)}
              alt={contenido.portada.altText ?? contenido.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 60rem"
              priority
            />
          </div>
        )}

        {(contenido.location || contenido.startsOn || contenido.goalAmount) && (
          <dl className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-3">
            {contenido.location && (
              <Dato etiqueta="Lugar" valor={contenido.location} />
            )}
            {contenido.startsOn && (
              <Dato
                etiqueta={contenido.endsOn ? "Periodo" : "Desde"}
                valor={
                  contenido.endsOn
                    ? `${fecha(contenido.startsOn)} — ${fecha(contenido.endsOn)}`
                    : fecha(contenido.startsOn)
                }
              />
            )}
            {contenido.goalAmount && (
              <Dato
                etiqueta="Meta de recaudación"
                valor={importe(contenido.goalAmount, contenido.goalCurrency)}
              />
            )}
          </dl>
        )}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {contenido.parrafos.map((parrafo, indice) => (
            <p
              key={indice}
              className="mb-4 leading-relaxed text-gray-700 last:mb-0"
            >
              {parrafo}
            </p>
          ))}
        </section>

        {/* Una campaña con meta pide aportar; lo demás, participar. */}
        <section className="rounded-xl border-t-4 border-verde-hoja bg-white p-8 text-center shadow-sm">
          <h2 className="mb-3 font-montserrat text-xl font-bold text-verde-bosque">
            {contenido.kind === "campaign"
              ? "Apoya esta campaña"
              : "Suma a esta iniciativa"}
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-gray-700">
            {contenido.kind === "campaign"
              ? "Tu aporte se destina a esta campaña. Recibirás un código con el que podrás consultar su estado en cualquier momento."
              : "Puedes participar con tu tiempo y tus capacidades, o proponer una alianza institucional."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {contenido.kind === "campaign" ? (
              <UniversalCta
                code="START_SINGLE_CONTRIBUTION"
                location="contenido"
                params={{ source: contenido.slug }}
              />
            ) : (
              <UniversalCta
                contextual="REGISTRAR_INTERES"
                location="contenido"
                params={{ source: contenido.slug }}
              />
            )}
          </div>
        </section>

        <p className="text-sm text-gray-600">
          <Link
            href={`/${ruta}`}
            className="font-semibold text-verde-hoja hover:underline"
          >
            Ver todas las {etiqueta.toLowerCase()}s
          </Link>
        </p>
      </CuerpoInterno>
    </>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {etiqueta}
      </dt>
      <dd className="mt-1 font-semibold text-azul-confianza">{valor}</dd>
    </div>
  );
}
