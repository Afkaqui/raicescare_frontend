import Image from "next/image";
import { contactHref, politicas, site } from "../site-config";
import { BuildingIcon, LinkedInIcon, MailIcon, MapPinIcon } from "./icons";

const accesos = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Quiénes somos" },
  { href: "#programas", label: "Programas" },
  { href: "#alianzas", label: "Empresas y aliados" },
  { href: "#transparencia", label: "Impacto y transparencia" },
  { href: "#sumate", label: "Participa" },
];

export function SiteFooter() {
  return (
    <footer className="bg-verde-bosque px-6 pt-16 pb-8 text-white md:px-12">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
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
          <p className="max-w-md text-sm leading-relaxed text-gray-300">
            {site.tipoLegal} orientada a iniciativas de asistencia social,
            educación, investigación aplicada y cooperación para comunidades y
            territorios amazónicos.
          </p>
          <p className="mt-4 text-sm text-gray-300">
            Partida Registral N.° {site.partidaRegistral} · RUC N.° {site.ruc}
          </p>
        </div>

        <div>
          <h2 className="mb-6 font-montserrat text-xl font-bold text-white">
            Contacto institucional
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
              <span>
                <strong className="font-semibold text-white">
                  Sede operativa:
                </strong>{" "}
                {site.sedeOperativa}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BuildingIcon className="h-5 w-5 shrink-0 text-verde-hoja" />
              <span>
                <strong className="font-semibold text-white">
                  Sede legal:
                </strong>{" "}
                {site.sedeLegal}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <LinkedInIcon className="h-5 w-5 shrink-0 text-verde-hoja" />
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn institucional
              </a>
            </li>
          </ul>

          <h2 className="mt-8 mb-4 font-montserrat text-xl font-bold text-white">
            Accesos rápidos
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
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

        <div>
          <h2 className="mb-6 font-montserrat text-xl font-bold text-white">
            Políticas y legales
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {politicas.map((politica) => (
              <li key={politica}>
                <a
                  href={contactHref(`Solicito: ${politica}`)}
                  className="flex items-center gap-2 transition hover:text-verde-hoja"
                >
                  <span className="text-verde-hoja" aria-hidden="true">
                    ›
                  </span>
                  {politica}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/documentos/certificado-literal-sunarp.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-verde-hoja"
              >
                <span className="text-verde-hoja" aria-hidden="true">
                  ›
                </span>
                Documentación legal
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-400">
            Los documentos de política se encuentran en elaboración; solicítalos
            al correo institucional mientras se publican.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-gray-600/50 pt-8 text-center text-xs text-gray-400">
        <p className="mx-auto mb-4 max-w-4xl leading-relaxed">
          {site.legalName} es una {site.tipoLegal.toLowerCase()} constituida en
          el Perú, inscrita en SUNARP con Partida Registral N.°{" "}
          {site.partidaRegistral} ({site.zonaRegistral}) y con RUC N.°{" "}
          {site.ruc}. Pucallpa, Ucayali, Perú.
        </p>
        <p>© 2026 {site.legalName}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
