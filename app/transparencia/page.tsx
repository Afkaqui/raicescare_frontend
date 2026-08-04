import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
  ProcesoEnHabilitacion,
} from "../components/pagina-interna";
import { ENLACES_VERIFICACION } from "../lib/cta/registry";
import { site } from "../site-config";
import { ExternalLinkIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "Impacto y transparencia",
  description:
    "Documentos institucionales de RaícesCare y metodología del sistema de registro y trazabilidad, con sus estados de validación.",
  alternates: { canonical: "/transparencia" },
};

type Props = {
  searchParams: Promise<{ [clave: string]: string | string[] | undefined }>;
};

const ESTADOS_VALIDACION = [
  {
    estado: "En registro",
    detalle: "El dato fue cargado y aún no cuenta con respaldo documental.",
  },
  {
    estado: "Documentado",
    detalle: "Existe documentación de respaldo asociada al registro.",
  },
  {
    estado: "Revisado internamente",
    detalle: "Un responsable interno verificó la consistencia del registro.",
  },
  {
    estado: "Verificado externamente",
    detalle: "Un tercero independiente contrastó la información.",
  },
  {
    estado: "Auditado",
    detalle:
      "El registro forma parte de un proceso de auditoría con alcance definido.",
  },
];

export default async function TransparenciaPagina({ searchParams }: Props) {
  const params = await searchParams;
  const vista = typeof params.view === "string" ? params.view : null;

  return (
    <>
      <EncabezadoInterno
        titulo="Impacto y transparencia"
        descripcion="Estamos implementando un sistema de registro y trazabilidad para organizar la información de fondos, actividades, documentos e indicadores de los proyectos gestionados por RaícesCare."
      />

      <CuerpoInterno>
        <section
          id="documentos"
          className={`rounded-xl border bg-white p-8 shadow-sm ${
            vista === "documents"
              ? "border-verde-hoja ring-2 ring-verde-hoja/30"
              : "border-gray-200"
          }`}
        >
          <h2 className="mb-2 font-montserrat text-2xl font-bold text-verde-bosque">
            Documentos institucionales
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-700">
            Ponemos a disposición del público los documentos que permiten
            verificar la constitución, representación y situación tributaria de
            la {site.legalName}. Son enlaces de verificación, no de conversión.
          </p>
          <ul className="space-y-3">
            {ENLACES_VERIFICACION.map((enlace) => (
              <li key={enlace.id}>
                <a
                  href={enlace.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-verification-link={enlace.id}
                  className="inline-flex items-center gap-2 text-sm font-bold text-verde-hoja hover:underline"
                >
                  {enlace.label}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 text-sm text-gray-700 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-azul-confianza">
                Partida Registral
              </dt>
              <dd>N.° {site.partidaRegistral}</dd>
            </div>
            <div>
              <dt className="font-semibold text-azul-confianza">
                Jurisdicción
              </dt>
              <dd>{site.zonaRegistral}</dd>
            </div>
            <div>
              <dt className="font-semibold text-azul-confianza">RUC</dt>
              <dd>{site.ruc}</dd>
            </div>
          </dl>
        </section>

        <section
          id="metodologia"
          className={`rounded-xl border bg-white p-8 shadow-sm ${
            vista === "methodology"
              ? "border-verde-hoja ring-2 ring-verde-hoja/30"
              : "border-gray-200"
          }`}
        >
          <h2 className="mb-2 font-montserrat text-2xl font-bold text-verde-bosque">
            Metodología de trazabilidad
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-700">
            Cada indicador que se publique llevará periodo, fuente, responsable,
            fecha de actualización y estado de validación. La información
            pública se incorporará progresivamente según el nivel de validación
            alcanzado, las obligaciones de confidencialidad y la protección de
            datos personales.
          </p>
          <ul className="space-y-3">
            {ESTADOS_VALIDACION.map((item) => (
              <li
                key={item.estado}
                className="rounded-lg border border-gray-200 bg-gris-niebla/50 p-4"
              >
                <p className="font-montserrat text-sm font-bold text-azul-confianza">
                  {item.estado}
                </p>
                <p className="text-sm text-gray-700">{item.detalle}</p>
              </li>
            ))}
          </ul>
        </section>

        <ProcesoEnHabilitacion
          titulo="Repositorio documental en habilitación"
          descripcion="El repositorio con fichas por documento, versionado y registro de descargas se habilitará junto con el backend. Si necesitas un documento institucional que aún no está publicado, puedes solicitarlo por el canal institucional."
          asuntoContacto="Solicito documentos institucionales"
          etiquetaContacto="Solicitar un documento"
        />
      </CuerpoInterno>
    </>
  );
}
