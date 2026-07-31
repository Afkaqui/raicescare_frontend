import Image from "next/image";
import { contactHref, site } from "../site-config";
import {
  BuildingIcon,
  DocumentIcon,
  ExternalLinkIcon,
  ScaleIcon,
} from "./icons";

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

        <div className="mb-16 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <Image
            src="/dashboard-trazabilidad.png"
            alt="Módulo de Control y Trazabilidad Digital de RaícesCare: distribución de fondos 2026 (Programas 55%, Educación 20%, Ciencia 15%, Administración 10%), ejecución por trimestre con 91% acumulado al T4 sobre una meta anual de 92%, impacto directo con 1,200+ familias beneficiadas, 100% auditado UIF/APCI, 48 comunidades atendidas y 96% de trazabilidad verificada; trazabilidad por proyecto (registro, validación, ejecución, evidencia y reporte) e indicadores auditables"
            width={1672}
            height={833}
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="h-auto w-full"
          />

          <div className="flex flex-col justify-center gap-4 border-t border-gray-100 p-8 sm:flex-row">
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
                src="/legal/pieza-sunarp.png"
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
                src="/legal/pieza-sunat.png"
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
                src="/legal/pieza-estatutos.png"
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
      className="inline-flex items-center gap-1 text-sm font-bold text-verde-hoja hover:underline"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
}
