import type { Metadata } from "next";
import Link from "next/link";
import { UniversalCta } from "./components/cta/universal-cta";
import { contactHref } from "./site-config";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const DESTINOS = [
  {
    href: "/programas",
    titulo: "Líneas de acción",
    detalle: "Los cuatro ámbitos en los que trabajamos.",
  },
  {
    href: "/transparencia",
    titulo: "Impacto y transparencia",
    detalle: "Documentos institucionales y metodología de trazabilidad.",
  },
  {
    href: "/participa",
    titulo: "Participa",
    detalle: "Voluntariado, mentoría, pro bono y embajadores.",
  },
  {
    href: "/aportes",
    titulo: "Apoya nuestras iniciativas",
    detalle: "Aporte mensual o único, con sus condiciones.",
  },
];

export default function NoEncontrada() {
  return (
    <>
      <header className="border-b-4 border-verde-hoja bg-verde-bosque px-6 py-16 text-white md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-montserrat text-6xl font-bold text-verde-hoja">
            404
          </p>
          <h1 className="mb-4 font-montserrat text-3xl font-bold md:text-4xl">
            No encontramos esta página
          </h1>
          <p className="max-w-3xl text-lg text-gray-200">
            El enlace pudo cambiar, o el contenido todavía no está publicado.
            Estamos incorporando la información de forma progresiva, a medida
            que cada sección cuenta con respaldo suficiente.
          </p>
        </div>
      </header>

      <div className="bg-gris-niebla px-6 py-16 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 font-montserrat text-lg font-bold text-verde-bosque">
              ¿Buscabas un documento institucional?
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              El certificado literal, la ficha RUC y la escritura pública ya no
              se descargan directamente. Publicamos su existencia y su estado, y
              el archivo se entrega bajo solicitud mientras habilitamos el
              acceso por niveles de usuario.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/transparencia"
                className="inline-flex items-center justify-center rounded-lg border-2 border-verde-bosque px-6 py-3 text-sm font-semibold text-verde-bosque transition hover:bg-verde-bosque hover:text-white"
              >
                Ver información legal
              </Link>
              <a
                href={contactHref("Solicito un documento institucional")}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Solicitar un documento
              </a>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
              O continúa por aquí
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DESTINOS.map((destino) => (
                <li key={destino.href}>
                  <Link
                    href={destino.href}
                    className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-verde-hoja hover:shadow-md"
                  >
                    <span className="font-montserrat font-bold text-azul-confianza">
                      {destino.titulo}
                    </span>
                    <span className="mt-1 text-sm text-gray-600">
                      {destino.detalle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row">
            <UniversalCta
              code="VIEW_PROGRAMS"
              location="footer"
              params={{ source: "not_found" }}
              className="flex-1"
            />
            <UniversalCta
              code="DONATE_ENTRY"
              location="footer"
              params={{ source: "not_found" }}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </>
  );
}
