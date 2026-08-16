import type { Metadata } from "next";
import { CatalogoContenido } from "../../../components/catalogo-contenido";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Proyectos ambientales · Bio-Amazonía y Ecosistemas",
  description:
    "Iniciativas de investigación aplicada, restauración, monitoreo ambiental e innovación productiva de RaícesCare.",
  alternates: { canonical: "/programas/bio-amazonia/proyectos" },
};

export default function ProyectosBioAmazonia() {
  return (
    <>
      <EncabezadoInterno
        titulo="Proyectos ambientales"
        descripcion="Bio-Amazonía y Ecosistemas: investigación aplicada, restauración, monitoreo ambiental e innovación productiva con aliados técnicos y participación local."
        migaDeVuelta={{
          href: "/programas/bio-amazonia",
          label: "Bio-Amazonía y Ecosistemas",
        }}
      />

      <CuerpoInterno>
        <CatalogoContenido
          kind="project"
          programa="bioamazonia"
          vacio={{
            titulo: "No hay proyectos ambientales publicados",
            descripcion:
              "Cada proyecto se publicará con su ficha completa: ubicación, presupuesto, derechos sobre el área, metodología y sistema de monitoreo. Hasta entonces no se difunden fichas parciales.",
            programaCta: "environment",
          }}
        />
      </CuerpoInterno>
    </>
  );
}
