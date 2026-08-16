import type { Metadata } from "next";
import { CatalogoContenido } from "../../../components/catalogo-contenido";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../../components/pagina-interna";

export const metadata: Metadata = {
  title: "Iniciativas educativas · Semillas de Educación",
  description:
    "Iniciativas de educación no formal, alfabetización digital y formación práctica de RaícesCare.",
  alternates: { canonical: "/programas/semillas-de-educacion/iniciativas" },
};

export default function IniciativasEducacion() {
  return (
    <>
      <EncabezadoInterno
        titulo="Iniciativas educativas"
        descripcion="Semillas de Educación: actividades educativas no formales, alfabetización digital y formación práctica desarrolladas con las comunidades participantes."
        migaDeVuelta={{
          href: "/programas/semillas-de-educacion",
          label: "Semillas de Educación",
        }}
      />

      <CuerpoInterno>
        <CatalogoContenido
          kind="initiative"
          programa="educacion"
          vacio={{
            titulo: "No hay iniciativas educativas publicadas",
            descripcion:
              "Las iniciativas se incorporarán cuando cuenten con contenidos definidos, comunidades participantes y validación institucional. Mientras tanto puedes registrar tu interés en participar como mentor o proponer una colaboración.",
            programaCta: "education",
          }}
        />
      </CuerpoInterno>
    </>
  );
}
