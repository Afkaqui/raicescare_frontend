import Image from "next/image";
import { contactHref, site } from "../site-config";
import {
  BuildingIcon,
  DocumentIcon,
  ExternalLinkIcon,
  ScaleIcon,
} from "./icons";

/**
 * Auditoría de textos (Ventana 17): el módulo de trazabilidad se presenta como
 * prototipo. No se publican cifras hasta contar con periodo, fuente,
 * responsable y estado de validación.
 */
const modulosDemo = [
  {
    titulo: "Distribución referencial",
    descripcion:
      "Estructura propuesta para clasificar la asignación de fondos por línea de acción.",
    estado: "En registro",
  },
  {
    titulo: "Ejecución demostrativa",
    descripcion:
      "Vista de seguimiento por periodo, prevista para reemplazarse con información validada.",
    estado: "Revisado internamente",
  },
  {
    titulo: "Indicadores en proceso",
    descripcion:
      "Campos de resultados con su fuente, fecha de actualización y responsable.",
    estado: "Documentado",
  },
];

const etiquetasIntegridad = [
  "Debida diligencia",
  "Registro documental",
  "Prevención de riesgos",
  "Canal de integridad",
];

export function Transparencia() {
  return (
    <section
      id="transparencia"
      className="border-t border-gray-300 bg-gris-niebla px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Transparencia e información institucional
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Estamos implementando un sistema de registro y trazabilidad para
            organizar la información de fondos, actividades, documentos e
            indicadores de los proyectos gestionados por RaícesCare.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            La información pública se incorporará progresivamente de acuerdo con
            el nivel de validación alcanzado, las obligaciones de
            confidencialidad y la protección de datos personales.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={contactHref("Solicito documentos institucionales")}
              className="rounded-lg bg-verde-bosque px-8 py-3 text-center font-semibold text-white shadow-md hover:bg-verde-bosque/90"
            >
              Consultar documentos institucionales
            </a>
            <a
              href={contactHref("Consulta por la metodología de trazabilidad")}
              className="rounded-lg border-2 border-verde-bosque px-8 py-3 text-center font-semibold text-verde-bosque hover:bg-white"
            >
              Ver metodología de trazabilidad
            </a>
          </div>
        </div>

        <div className="mb-16 rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-8 flex flex-col gap-3 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-montserrat text-2xl font-bold text-azul-confianza">
              Vista demostrativa del módulo de trazabilidad
            </h3>
            <span className="w-max rounded-full border border-tierra-amazonica/40 bg-tierra-amazonica/10 px-4 py-1.5 text-xs font-bold tracking-wide text-tierra-amazonica uppercase">
              Prototipo
            </span>
          </div>

          <p className="mb-8 max-w-4xl text-gray-700">
            Este panel presenta la estructura funcional propuesta para el
            seguimiento institucional. Los datos mostrados son referenciales y
            serán sustituidos por información validada de proyectos y periodos
            específicos.
          </p>

          <figure className="mb-8">
            <Image
              src="/dashboard-trazabilidad.png"
              alt="Vista demostrativa del módulo de control y trazabilidad digital de RaícesCare: distribución referencial de fondos por línea de acción, ejecución por trimestre, indicadores de impacto, trazabilidad por proyecto (registro, validación, ejecución, evidencia y reporte), indicadores auditables y alertas de seguimiento"
              width={1672}
              height={833}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full rounded-lg border border-gray-200"
            />
            <figcaption className="mt-3 text-sm text-gray-500">
              Maqueta funcional del módulo. Las cifras que aparecen en la imagen
              son referenciales y no corresponden a resultados validados.
            </figcaption>
          </figure>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {modulosDemo.map((modulo) => (
              <li
                key={modulo.titulo}
                className="rounded-lg border border-gray-200 bg-gris-niebla/60 p-6"
              >
                <h4 className="mb-2 font-montserrat font-bold text-verde-bosque">
                  {modulo.titulo}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {modulo.descripcion}
                </p>
                <span className="inline-block rounded border border-gray-300 bg-white px-2 py-1 text-[11px] font-bold text-gray-700">
                  Estado: {modulo.estado}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500">
            Cada indicador publicado incluirá periodo, fuente, responsable,
            fecha de actualización y estado de validación (en registro,
            documentado, revisado internamente, verificado externamente o
            auditado).
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-2 text-center font-montserrat text-3xl font-bold text-verde-bosque">
            Información legal e institucional
          </h3>
          <p className="mx-auto mb-10 max-w-3xl text-center text-gray-600">
            Ponemos a disposición del público documentos que permiten verificar
            la constitución, representación y situación tributaria de la
            Asociación RaícesCare.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-verde-hoja bg-white shadow-sm transition hover:shadow-md">
              <PiezaLegal
                src="/legal/pieza-sunarp.png"
                alt="Inscripción en SUNARP de la Asociación RaícesCare, con la documentación registral que respalda su constitución"
              />
              <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-verde-hoja/10 text-verde-hoja">
                  <BuildingIcon />
                </span>
                <h4 className="font-montserrat text-lg font-bold text-azul-confianza">
                  Constitución e inscripción registral
                </h4>
              </div>
              <ul className="mb-6 space-y-1 text-sm text-gray-600">
                <li>{site.legalName}</li>
                <li>
                  <strong>Partida Registral:</strong> N.° {site.partidaRegistral}
                </li>
                <li>
                  <strong>Jurisdicción:</strong> {site.zonaRegistral}
                </li>
              </ul>
              <DocumentoLink href="/documentos/certificado-literal-sunarp.pdf">
                Consultar certificado literal
              </DocumentoLink>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-azul-confianza bg-white shadow-sm transition hover:shadow-md">
              <PiezaLegal
                src="/legal/pieza-sunat.png"
                alt="Registro tributario de la Asociación RaícesCare ante SUNAT"
              />
              <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-azul-confianza/10 text-azul-confianza">
                  <DocumentIcon />
                </span>
                <h4 className="font-montserrat text-lg font-bold text-azul-confianza">
                  Registro tributario
                </h4>
              </div>
              <ul className="mb-4 space-y-1 text-sm text-gray-600">
                <li>
                  <strong>RUC:</strong> {site.ruc}
                </li>
                <li>
                  <strong>Estado del contribuyente:</strong> Activo
                </li>
                <li>
                  <strong>Condición del domicilio:</strong> Habido
                </li>
              </ul>
              <p className="mb-6 text-xs leading-snug text-gray-500">
                La situación tributaria y las calificaciones especiales se
                acreditarán exclusivamente mediante las resoluciones o registros
                vigentes emitidos por la autoridad competente.
              </p>
              <DocumentoLink href="/documentos/ficha-ruc-sunat.pdf">
                Consultar ficha RUC
              </DocumentoLink>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-tierra-amazonica bg-white shadow-sm transition hover:shadow-md">
              <PiezaLegal
                src="/legal/pieza-estatutos.png"
                alt="Estatutos y controles internos de integridad de la Asociación RaícesCare"
              />
              <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tierra-amazonica/10 text-tierra-amazonica">
                  <ScaleIcon />
                </span>
                <h4 className="font-montserrat text-lg font-bold text-azul-confianza">
                  Integridad y prevención de riesgos
                </h4>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Adoptamos controles internos orientados a la identificación de
                aportantes, la documentación del origen y destino de los
                recursos y la prevención de operaciones incompatibles con
                nuestros fines institucionales. La aplicación del sistema de
                prevención y las obligaciones ante la UIF dependerán de la
                condición regulatoria vigente de la organización.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {etiquetasIntegridad.map((etiqueta) => (
                  <span
                    key={etiqueta}
                    className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-700"
                  >
                    {etiqueta}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <DocumentoLink href="/documentos/escritura-publica.pdf">
                  Consultar escritura pública
                </DocumentoLink>
                <a
                  href={contactHref("Solicito las políticas institucionales")}
                  className="inline-flex items-center gap-1 text-sm font-bold text-verde-hoja hover:underline"
                >
                  Consultar políticas institucionales
                </a>
              </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function PiezaLegal({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1448}
      height={1086}
      sizes="(min-width: 768px) 33vw, 100vw"
      className="h-auto w-full"
    />
  );
}

function DocumentoLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-verde-hoja hover:underline"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
