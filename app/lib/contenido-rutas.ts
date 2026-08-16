import type { Metadata } from "next";

/**
 * Definición compartida de las tres secciones públicas de contenido.
 *
 * Las páginas de listado y de detalle son idénticas salvo por estos textos, así
 * que se declaran una vez en lugar de repetir tres archivos casi iguales.
 */
export interface SeccionContenido {
  kind: "campaign" | "initiative" | "project";
  ruta: string;
  titulo: string;
  descripcion: string;
  vacio: { titulo: string; descripcion: string; programaCta: string };
  metadata: Metadata;
}

export const SECCIONES: Record<string, SeccionContenido> = {
  campanas: {
    kind: "campaign",
    ruta: "campanas",
    titulo: "Campañas",
    descripcion:
      "Campañas activas de RaícesCare. Cada una indica su finalidad, su alcance y cómo puedes apoyarla.",
    vacio: {
      titulo: "No hay campañas activas publicadas",
      descripcion:
        "Las campañas se incorporan cuando han completado su proceso de revisión y cuentan con información suficiente para su publicación: finalidad, costos, inventario, destino y protocolo de entrega.",
      programaCta: "health_care",
    },
    metadata: {
      title: "Campañas",
      description:
        "Campañas activas de RaícesCare: finalidad, alcance y cómo apoyarlas.",
      alternates: { canonical: "/campanas" },
    },
  },
  iniciativas: {
    kind: "initiative",
    ruta: "iniciativas",
    titulo: "Iniciativas",
    descripcion:
      "Iniciativas educativas y comunitarias en marcha, con su ámbito y su estado.",
    vacio: {
      titulo: "No hay iniciativas publicadas",
      descripcion:
        "Las iniciativas se publican cuando cuentan con objetivos, responsables y comunidades participantes definidos.",
      programaCta: "education",
    },
    metadata: {
      title: "Iniciativas",
      description:
        "Iniciativas educativas y comunitarias de RaícesCare en marcha.",
      alternates: { canonical: "/iniciativas" },
    },
  },
  proyectos: {
    kind: "project",
    ruta: "proyectos",
    titulo: "Proyectos",
    descripcion:
      "Proyectos de investigación aplicada y conservación en territorios amazónicos.",
    vacio: {
      titulo: "No hay proyectos publicados",
      descripcion:
        "Los proyectos se publican cuando cuentan con formulación, gobernanza y acuerdos territoriales definidos.",
      programaCta: "environment",
    },
    metadata: {
      title: "Proyectos",
      description:
        "Proyectos de investigación aplicada y conservación de RaícesCare.",
      alternates: { canonical: "/proyectos" },
    },
  },
};
