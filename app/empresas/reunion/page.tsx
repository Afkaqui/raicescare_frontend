import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
  ProcesoEnHabilitacion,
  QueSePedira,
} from "../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Solicitar una reunión institucional",
  description:
    "Reuniones con empresas, cooperantes e instituciones para diseñar iniciativas sociales y ambientales alineadas con sus objetivos de sostenibilidad.",
  alternates: { canonical: "/empresas/reunion" },
};

const MOTIVOS = [
  "Diseño de una iniciativa social o ambiental conjunta.",
  "Voluntariado corporativo.",
  "Articulación territorial.",
  "Seguimiento de actividades e indicadores.",
  "Elaboración de reportes de resultados.",
  "Exploración general de colaboración.",
];

export default function ReunionInstitucional() {
  return (
    <>
      <EncabezadoInterno
        titulo="Solicitar una reunión institucional"
        descripcion="Colaboramos en el diseño de iniciativas sociales y ambientales alineadas con los objetivos de sostenibilidad de empresas, instituciones y cooperantes."
      />

      <CuerpoInterno>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-montserrat text-lg font-bold text-verde-bosque">
            Motivos de reunión
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {MOTIVOS.map((motivo) => (
              <li key={motivo} className="flex gap-3">
                <span className="text-verde-hoja" aria-hidden="true">
                  ›
                </span>
                {motivo}
              </li>
            ))}
          </ul>
        </section>

        <QueSePedira
          items={[
            "Organización, sector y tipo de entidad.",
            "Persona de contacto, cargo y medio de contacto.",
            "Motivo principal de la reunión.",
            "Alcance previsto y territorio de interés.",
            "Plazos o hitos relevantes.",
            "Autorización de tratamiento de datos personales.",
          ]}
        />

        <section className="rounded-xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm">
          <h2 className="mb-3 font-montserrat text-lg font-bold text-verde-bosque">
            Nota legal
          </h2>
          <p>
            La emisión de constancias, certificados y cualquier tratamiento
            tributario dependerá de la naturaleza de la contribución, de la
            normativa aplicable y de la condición registral vigente de
            RaícesCare. Cada colaboración será evaluada individualmente.
          </p>
        </section>

        <ProcesoEnHabilitacion
          descripcion="El formulario B2B con clasificación automática y agenda controlada se habilitará en la siguiente fase. Mientras tanto coordinamos la reunión por el canal institucional y registramos la solicitud con el mismo expediente."
          asuntoContacto="Solicitud de reunión institucional"
          etiquetaContacto="Solicitar la reunión por correo"
        />
      </CuerpoInterno>
    </>
  );
}
