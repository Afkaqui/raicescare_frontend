import Link from "next/link";
import { contactHref } from "../site-config";

/** Cabecera común de las páginas internas (rutas de proceso y catálogo). */
export function EncabezadoInterno({
  titulo,
  descripcion,
  migaDeVuelta = { href: "/", label: "Inicio" },
}: {
  titulo: string;
  descripcion: string;
  migaDeVuelta?: { href: string; label: string };
}) {
  return (
    <header className="border-b-4 border-verde-hoja bg-verde-bosque px-6 py-16 text-white md:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href={migaDeVuelta.href}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition hover:text-white"
        >
          <span aria-hidden="true">‹</span> {migaDeVuelta.label}
        </Link>
        <h1 className="mb-4 font-montserrat text-3xl font-bold md:text-4xl">
          {titulo}
        </h1>
        <p className="max-w-3xl text-lg text-gray-200">{descripcion}</p>
      </div>
    </header>
  );
}

/**
 * Aviso para los procesos cuyo formulario en línea corresponde a una fase
 * posterior. El correo institucional queda como contingencia, nunca como
 * proceso principal.
 */
export function ProcesoEnHabilitacion({
  titulo = "Formulario en línea en habilitación",
  descripcion,
  asuntoContacto,
  etiquetaContacto = "Escribir al correo institucional",
}: {
  titulo?: string;
  descripcion: string;
  asuntoContacto: string;
  etiquetaContacto?: string;
}) {
  return (
    <aside className="rounded-xl border border-tierra-amazonica/30 bg-tierra-amazonica/5 p-6">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-tierra-amazonica/40 bg-tierra-amazonica/10 px-3 py-1 text-xs font-bold tracking-wide text-tierra-amazonica uppercase">
          En habilitación
        </span>
        <h2 className="font-montserrat text-lg font-bold text-azul-confianza">
          {titulo}
        </h2>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-gray-700">{descripcion}</p>
      <a
        href={contactHref(asuntoContacto)}
        className="inline-flex items-center justify-center rounded-lg border-2 border-verde-bosque px-6 py-3 text-sm font-semibold text-verde-bosque transition hover:bg-verde-bosque hover:text-white"
      >
        {etiquetaContacto}
      </a>
    </aside>
  );
}

/** Lista de los datos que pedirá un formulario maestro cuando se habilite. */
export function QueSePedira({
  titulo = "Qué se solicitará",
  items,
}: {
  titulo?: string;
  items: string[];
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
        {titulo}
      </h2>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-verde-hoja" aria-hidden="true">
              ›
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Contenedor estándar del cuerpo de una página interna. */
export function CuerpoInterno({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gris-niebla px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">{children}</div>
    </div>
  );
}
