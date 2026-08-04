import { documentosInstitucionales } from "../site-config";
import { LockIcon } from "./icons";

/**
 * Ficha de un documento institucional.
 *
 * Se acredita que el documento existe y qué respalda, pero el archivo no se
 * publica: la consulta se habilitará por niveles de acceso cuando exista el
 * repositorio documental con descarga controlada.
 */
export function FichaDocumento({
  documento,
}: {
  documento: (typeof documentosInstitucionales)[number];
}) {
  return (
    <li className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-montserrat text-base font-bold text-verde-bosque">
          {documento.nombre}
        </h3>
        <span className="shrink-0 rounded-full border border-verde-hoja/40 bg-verde-hoja/10 px-3 py-1 text-[11px] font-bold tracking-wide text-verde-bosque uppercase">
          {documento.estado}
        </span>
      </div>

      <dl className="mb-4 space-y-1 text-sm text-gray-600">
        <div className="flex gap-2">
          <dt className="font-semibold text-azul-confianza">Emisor:</dt>
          <dd>{documento.emisor}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-azul-confianza">Acredita:</dt>
          <dd>{documento.acredita}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-azul-confianza">Referencia:</dt>
          <dd>{documento.referencia}</dd>
        </div>
      </dl>

      <p className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
        <LockIcon className="h-4 w-4 shrink-0 text-gray-400" />
        Consulta restringida. El acceso se habilitará por niveles de usuario.
      </p>
    </li>
  );
}

export function ListaDocumentos() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {documentosInstitucionales.map((documento) => (
        <FichaDocumento key={documento.id} documento={documento} />
      ))}
    </ul>
  );
}
