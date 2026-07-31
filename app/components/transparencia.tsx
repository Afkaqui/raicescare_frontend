import Image from "next/image";
import { contactHref, site } from "../site-config";
import {
  BuildingIcon,
  DocumentIcon,
  ExternalLinkIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "./icons";

const distribucion = [
  { etiqueta: "Programas", porcentaje: 55, color: "#458823" },
  { etiqueta: "Educación", porcentaje: 20, color: "#02254a" },
  { etiqueta: "Ciencia", porcentaje: 15, color: "#03391a" },
  { etiqueta: "Admin.", porcentaje: 10, color: "#576d76" },
];

/** conic-gradient acumulado a partir de los porcentajes de distribución. */
const donutGradient = (() => {
  let acumulado = 0;
  const tramos = distribucion.map(({ porcentaje, color }) => {
    const desde = acumulado;
    acumulado += porcentaje;
    return `${color} ${desde}% ${acumulado}%`;
  });
  return `conic-gradient(${tramos.join(", ")})`;
})();

const trimestres = ["T1", "T2", "T3", "T4"];

export function Transparencia() {
  return (
    <section
      id="transparencia"
      className="border-t border-gray-300 bg-gris-niebla px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-verde-bosque md:text-4xl">
            Cuentas claras, impacto real
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Nos adherimos a estándares de transparencia radical: cada sol o
            dólar invertido tiene una ruta verificable mediante nuestro módulo
            de Trazabilidad Digital.
          </p>
        </div>

        <div className="mb-16 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
          <h3 className="mb-8 font-montserrat text-2xl font-bold text-azul-confianza">
            Módulo de Trazabilidad Digital
          </h3>

          <div className="mb-10 grid grid-cols-1 gap-8 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="px-4">
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Distribución de Fondos 2026
              </h4>
              <div className="flex items-center gap-6">
                <div
                  className="flex h-30 w-30 items-center justify-center rounded-full shadow-inner"
                  style={{ background: donutGradient }}
                  role="img"
                  aria-label={distribucion
                    .map((d) => `${d.etiqueta} ${d.porcentaje}%`)
                    .join(", ")}
                >
                  <div className="h-20 w-20 rounded-full bg-white" />
                </div>
                <ul className="space-y-2 text-sm">
                  {distribucion.map((item) => (
                    <li key={item.etiqueta} className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      />
                      {item.etiqueta} {item.porcentaje}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 pt-6 md:pt-0">
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Ejecución por Trimestre
              </h4>
              <div className="relative h-32 border-b-2 border-l-2 border-gray-300">
                <svg
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Curva creciente de ejecución presupuestal del T1 al T4"
                >
                  <polyline
                    fill="none"
                    stroke="#458823"
                    strokeWidth={2}
                    points="0,80 30,50 60,30 100,10"
                  />
                  <circle cx="30" cy="50" r="3" fill="#03391a" />
                  <circle cx="60" cy="30" r="3" fill="#03391a" />
                  <circle cx="97" cy="10" r="3" fill="#03391a" />
                </svg>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                {trimestres.map((trimestre) => (
                  <span key={trimestre}>{trimestre}</span>
                ))}
              </div>
            </div>

            <div className="px-4 pt-6 md:pt-0">
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Impacto Directo (YTD)
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="rounded bg-verde-hoja/10 p-2 text-verde-hoja">
                    <UsersIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="text-verde-bosque">1,200+</strong>{" "}
                    <span className="text-sm text-gray-500">Familias</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="rounded bg-azul-confianza/10 p-2 text-azul-confianza">
                    <ShieldCheckIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="text-azul-confianza">100%</strong>{" "}
                    <span className="text-sm text-gray-500">
                      Auditado UIF/APCI
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <a
              href={contactHref("Solicito el histórico de fondos de RaícesCare")}
              className="rounded-lg bg-verde-bosque px-8 py-3 text-center font-semibold text-white shadow-md hover:bg-verde-bosque/90"
            >
              Ver Histórico de Fondos
            </a>
            <a
              href={contactHref("Solicito la Memoria Anual de RaícesCare")}
              className="rounded-lg border-2 border-verde-bosque px-8 py-3 text-center font-semibold text-verde-bosque hover:bg-gray-50"
            >
              Solicitar Memoria Anual
            </a>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-2 text-center font-montserrat text-3xl font-bold text-verde-bosque">
            Cumplimiento Legal y Formalización
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
            Garantizamos la máxima credibilidad ante cooperantes mediante
            documentación institucional verificable y de dominio público.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-verde-hoja bg-white shadow-sm transition hover:shadow-md">
              <FotoLegal
                src="/legal/sunarp.png"
                alt="Partida registral de RaícesCare inscrita en la Zona Registral N° VI de Pucallpa"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-verde-hoja/10 text-verde-hoja">
                    <BuildingIcon />
                  </span>
                  <h4 className="text-lg font-bold text-azul-confianza">
                    Inscripción SUNARP
                  </h4>
                </div>
                <ul className="mb-4 space-y-1 text-sm text-gray-600">
                  <li>
                    <strong>Partida Registral:</strong> N°{" "}
                    {site.partidaRegistral}
                  </li>
                  <li>
                    <strong>Jurisdicción:</strong> {site.zonaRegistral}
                  </li>
                  <li>
                    <strong>Sede:</strong> Pucallpa - Ucayali
                  </li>
                </ul>
                <DocumentoLink href="/documentos/certificado-literal-sunarp.pdf">
                  Ver Certificado Literal
                </DocumentoLink>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-azul-confianza bg-white shadow-sm transition hover:shadow-md">
              <FotoLegal
                src="/legal/sunat.png"
                alt="Tablero institucional de cumplimiento legal de RaícesCare junto a documentación oficial"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-azul-confianza/10 text-azul-confianza">
                    <DocumentIcon />
                  </span>
                  <h4 className="text-lg font-bold text-azul-confianza">
                    Registro SUNAT
                  </h4>
                </div>
                <ul className="mb-4 space-y-1 text-sm text-gray-600">
                  <li>
                    <strong>RUC:</strong> {site.ruc}
                  </li>
                  <li>
                    <strong>Estado:</strong> Activo / Habido
                  </li>
                  <li>
                    <strong>Beneficio:</strong> Exoneración Renta/IGV
                  </li>
                </ul>
                <DocumentoLink href="/documentos/ficha-ruc-sunat.pdf">
                  Ver Ficha RUC Oficial
                </DocumentoLink>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-verde-bosque bg-white shadow-sm transition hover:shadow-md">
              <FotoLegal
                src="/legal/estatutos.png"
                alt="Firma de documentación institucional junto al informe de cumplimiento SPLAFT"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tierra-amazonica/10 text-tierra-amazonica">
                    <ScaleIcon />
                  </span>
                  <h4 className="text-lg font-bold text-azul-confianza">
                    Estatutos &amp; UIF
                  </h4>
                </div>
                <p className="mb-3 text-justify text-xs leading-snug text-gray-600">
                  Objeto social estrictamente orientado a ciencia, asistencia y
                  educación. Contamos con Oficial de Cumplimiento SPLAFT.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-700">
                    Cero Lavado de Activos
                  </span>
                  <span className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-700">
                    Transparencia UIF / APCI
                  </span>
                </div>
                <DocumentoLink href="/documentos/escritura-publica.pdf">
                  Ver Escritura Pública
                </DocumentoLink>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function FotoLegal({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-44 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover object-center"
      />
    </div>
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
      className="inline-flex items-center gap-1 text-sm font-bold text-verde-hoja hover:underline"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
