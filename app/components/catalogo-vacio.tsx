import { UniversalCta } from "./cta/universal-cta";

/**
 * Estado vacío de los catálogos (campañas, iniciativas, proyectos).
 *
 * La arquitectura lo exige de forma expresa: no mostrar una página vacía ni
 * inventar contenido. "Registrar interés" no es un proceso nuevo, reutiliza el
 * formulario maestro de participación con la categoría interest_registry.
 */
export function CatalogoVacio({
  titulo,
  descripcion,
  programa,
}: {
  titulo: string;
  descripcion: string;
  programa: string;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <h2 className="mb-4 font-montserrat text-2xl font-bold text-verde-bosque">
        {titulo}
      </h2>
      <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-gray-700">
        {descripcion}
      </p>
      <UniversalCta
        contextual="REGISTRAR_INTERES"
        location="programas"
        params={{ program: programa }}
      />
    </section>
  );
}
