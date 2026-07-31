import Image from "next/image";
import { site } from "../site-config";
import { LinkedInIcon, MailIcon, MapPinIcon } from "./icons";

const accesos = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Quiénes Somos y Valores" },
  { href: "#programas", label: "Líneas de Acción" },
  { href: "#alianzas", label: "Alianzas y Ecosistema" },
  { href: "#transparencia", label: "Transparencia e Impacto" },
  { href: "#sumate", label: "Súmate y Participa" },
];

export function SiteFooter() {
  return (
    <footer className="bg-verde-bosque px-6 pt-16 pb-8 text-white md:px-12">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo-emblema.png"
              alt=""
              width={512}
              height={512}
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />
            <h2 className="font-montserrat text-3xl font-bold text-white">
              RaícesCare
            </h2>
          </div>
          <p className="mb-3 font-bold text-verde-hoja italic">
            «{site.claim}»
          </p>
          <p className="text-sm leading-relaxed text-gray-300">
            Ciencia, cuidado y comunidad para regenerar la Amazonía y
            transformar realidades desde el Perú. Laboratorio de Evidencia de
            Crecimiento Verde.
          </p>
        </div>

        <div>
          <h2 className="mb-6 font-montserrat text-xl font-bold text-white">
            Contacto Institucional
          </h2>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MailIcon className="h-5 w-5 shrink-0 text-verde-hoja" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 shrink-0 text-verde-hoja" />
              <span>Sede Operativa: {site.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <LinkedInIcon className="h-5 w-5 shrink-0 text-verde-hoja" />
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn: RaícesCare ONGD
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-6 font-montserrat text-xl font-bold text-white">
            Accesos Rápidos
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {accesos.map((acceso) => (
              <li key={acceso.href}>
                <a
                  href={acceso.href}
                  className="flex items-center gap-2 transition hover:text-verde-hoja"
                >
                  <span className="text-verde-hoja" aria-hidden="true">
                    ›
                  </span>
                  {acceso.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-gray-600/50 pt-8 text-center text-xs text-gray-400">
        <p className="mx-auto mb-4 max-w-5xl leading-relaxed">
          {site.legalName} es una ONGD sin fines de lucro debidamente inscrita
          en SUNARP con Partida Registral N° {site.partidaRegistral} y RUC{" "}
          {site.ruc} (Estado: Activo). Todas las donaciones cuentan con la
          protección de nuestro Sistema de Prevención de Lavado de Activos y
          Trazabilidad Digital (Art. 59°-61° de Estatutos). Adheridos a
          normativas UIF, SUNAT y APCI con estricto cumplimiento de origen de
          fondos y exención fiscal.
        </p>
        <p>© 2026 {site.legalName} ONGD. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
