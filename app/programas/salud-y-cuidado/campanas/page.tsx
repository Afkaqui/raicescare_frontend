import type { Metadata } from "next";
import { CatalogoContenido } from "../../../components/catalogo-contenido";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Campañas activas · Raíces de Salud y Cuidado",
  description:
    "Campañas de ayuda humanitaria de RaícesCare. Se publican cuando completan su proceso de revisión y cuentan con información suficiente.",
  alternates: { canonical: "/programas/salud-y-cuidado/campanas" },
};

export default function CampanasSalud() {
  return (
    <>
      <EncabezadoInterno
        titulo="Campañas activas"
        descripcion="Raíces de Salud y Cuidado: campañas de ayuda humanitaria, gestión transparente de donaciones y articulación con entidades competentes."
        migaDeVuelta={{
          href: "/programas/salud-y-cuidado",
          label: "Raíces de Salud y Cuidado",
        }}
      />

      <CuerpoInterno>
        <CatalogoContenido
          kind="campaign"
          programa="salud"
          vacio={{
            titulo: "No hay campañas activas publicadas",
            descripcion:
              "Las campañas se incorporarán cuando hayan completado su proceso de revisión y cuenten con información suficiente para su publicación: finalidad, costos, inventario, destino y protocolo de entrega.",
            programaCta: "health_care",
          }}
        />
      </CuerpoInterno>
    </>
  );
}
