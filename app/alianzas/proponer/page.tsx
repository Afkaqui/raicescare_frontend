import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
  ProcesoEnHabilitacion,
  QueSePedira,
} from "../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Proponer una alianza",
  description:
    "Formulario único de alianzas de RaícesCare: técnica, institucional, financiera o de cooperación, académica, territorial y voluntariado corporativo.",
  alternates: { canonical: "/alianzas/proponer" },
};

type Props = {
  searchParams: Promise<{ [clave: string]: string | string[] | undefined }>;
};

/** Un único formulario de alianzas; solo cambia el tipo preseleccionado. */
const TIPOS = [
  { id: "technical", titulo: "Alianza técnica" },
  { id: "institutional", titulo: "Alianza institucional" },
  { id: "financial", titulo: "Alianza financiera o de cooperación" },
  { id: "academic", titulo: "Alianza académica" },
  { id: "territorial", titulo: "Alianza territorial" },
  { id: "corporate_volunteering", titulo: "Voluntariado corporativo" },
] as const;

export default async function ProponerAlianza({ searchParams }: Props) {
  const params = await searchParams;
  const tipo = typeof params.type === "string" ? params.type : null;
  const seleccionado = TIPOS.find((item) => item.id === tipo);

  return (
    <>
      <EncabezadoInterno
        titulo="Proponer una alianza"
        descripcion="Promovemos alianzas responsables entre comunidades, instituciones públicas, academia, organizaciones sociales, cooperantes y empresas."
      />

      <CuerpoInterno>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
            Tipo de alianza
          </h2>
          <ul className="flex flex-wrap gap-3">
            {TIPOS.map((item) => (
              <li key={item.id}>
                <span
                  className={`inline-block rounded-lg border px-4 py-2 text-sm font-semibold ${
                    item.id === seleccionado?.id
                      ? "border-verde-hoja bg-verde-hoja/10 text-verde-bosque"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {item.titulo}
                </span>
              </li>
            ))}
          </ul>
          {seleccionado && (
            <p className="mt-4 text-sm text-gray-600">
              Llegaste con <strong>{seleccionado.titulo}</strong>{" "}
              preseleccionada. Podrás cambiarla al completar la propuesta.
            </p>
          )}
        </section>

        <QueSePedira
          items={[
            "Organización proponente y tipo de entidad.",
            "Persona de contacto y cargo.",
            "Tipo de alianza y objetivo de la colaboración.",
            "Territorio, población y línea de acción relacionada.",
            "Recursos, capacidades o aportes previstos por cada parte.",
            "Plazos estimados y documentación de respaldo.",
            "Autorización de tratamiento de datos personales.",
          ]}
        />

        <ProcesoEnHabilitacion
          descripcion="La propuesta abrirá un expediente con código de seguimiento, responsable asignado y plazos de respuesta. La aceptación estará sujeta a evaluación técnica, legal, financiera y reputacional; RaícesCare no garantiza la obtención de financiamiento ni la selección en convocatorias."
          asuntoContacto={
            seleccionado
              ? `Propuesta de alianza: ${seleccionado.titulo}`
              : "Propuesta de alianza institucional"
          }
          etiquetaContacto="Enviar mi propuesta"
        />
      </CuerpoInterno>
    </>
  );
}
