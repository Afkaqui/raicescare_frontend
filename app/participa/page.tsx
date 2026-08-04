import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
  ProcesoEnHabilitacion,
  QueSePedira,
} from "../components/pagina-interna";

export const metadata: Metadata = {
  title: "Participa en nuestra red",
  description:
    "Centro de participación de RaícesCare: voluntariado de campo, mentoría, apoyo pro bono, pasantías y programa de embajadores.",
  alternates: { canonical: "/participa" },
};

type Props = {
  searchParams: Promise<{ [clave: string]: string | string[] | undefined }>;
};

/** Un solo formulario maestro con la categoría preseleccionada por parámetro. */
const CATEGORIAS = [
  {
    id: "field_volunteering",
    titulo: "Voluntariado de campo",
    descripcion:
      "Actividades de campo previamente planificadas, sujetas a convocatoria, perfil requerido, capacitación, protocolos de seguridad y disponibilidad del proyecto.",
  },
  {
    id: "educational_mentoring",
    titulo: "Mentoría educativa",
    descripcion:
      "Acompañamiento a las actividades educativas no formales, según los contenidos y comunidades participantes de cada iniciativa.",
  },
  {
    id: "pro_bono",
    titulo: "Apoyo profesional pro bono",
    descripcion:
      "Aporte de conocimientos especializados en tareas institucionales previamente definidas.",
  },
  {
    id: "internship",
    titulo: "Pasantía o colaboración estudiantil",
    descripcion:
      "Colaboración de estudiantes en tareas acotadas, con acompañamiento y alcance definido.",
  },
  {
    id: "ambassador",
    titulo: "Programa de embajadores",
    descripcion:
      "Difusión responsable de nuestras iniciativas y campañas, respetando los mensajes, imágenes, autorizaciones y lineamientos institucionales.",
  },
  {
    id: "interest_registry",
    titulo: "Registro de interés",
    descripcion:
      "Si aún no hay convocatorias abiertas en la categoría que buscas, dejamos registrado tu interés para avisarte cuando se publiquen.",
  },
] as const;

export default async function Participa({ searchParams }: Props) {
  const params = await searchParams;
  const tipo = typeof params.type === "string" ? params.type : null;
  const programa = typeof params.program === "string" ? params.program : null;
  const seleccionada = CATEGORIAS.find((categoria) => categoria.id === tipo);

  return (
    <>
      <EncabezadoInterno
        titulo="Participa en nuestra red"
        descripcion="Comparte tu experiencia, tiempo o capacidades en las oportunidades de colaboración que RaícesCare publique según sus necesidades y proyectos vigentes."
      />

      <CuerpoInterno>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CATEGORIAS.map((categoria) => {
            const activa = categoria.id === seleccionada?.id;
            return (
              <li
                key={categoria.id}
                className={`rounded-xl border bg-white p-6 shadow-sm ${
                  activa
                    ? "border-verde-hoja ring-2 ring-verde-hoja/30"
                    : "border-gray-200"
                }`}
              >
                {activa && (
                  <p className="mb-2 text-xs font-bold tracking-wide text-verde-hoja uppercase">
                    Categoría seleccionada
                  </p>
                )}
                <h2 className="mb-2 font-montserrat text-lg font-bold text-azul-confianza">
                  {categoria.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  {categoria.descripcion}
                </p>
              </li>
            );
          })}
        </ul>

        <QueSePedira
          items={[
            "Datos de contacto y tipo de participante.",
            "Categoría de participación y disponibilidad.",
            "Formación, experiencia y competencias relevantes.",
            "Programa o territorio de interés.",
            "Autorización de tratamiento de datos personales.",
          ]}
        />

        <ProcesoEnHabilitacion
          descripcion="El formulario maestro de participación registrará tu postulación con un código de seguimiento y un responsable asignado. Mientras se habilita, puedes enviarnos tu interés por el canal institucional y lo incorporamos al mismo registro."
          asuntoContacto={
            seleccionada
              ? `Participación: ${seleccionada.titulo}${programa ? ` (${programa})` : ""}`
              : "Consulta por oportunidades de participación"
          }
          etiquetaContacto="Enviar mi interés"
        />
      </CuerpoInterno>
    </>
  );
}
