import type { Metadata } from "next";
import { MarcoAdmin } from "../marco-admin";
import { ListaContenidos } from "./lista";

export const metadata: Metadata = {
  title: "Contenidos",
  robots: { index: false, follow: false },
};

export default function Contenidos() {
  return (
    <MarcoAdmin>
      <h1 className="mb-6 font-montserrat text-2xl font-bold text-verde-bosque">
        Campañas, iniciativas y proyectos
      </h1>
      <ListaContenidos />
    </MarcoAdmin>
  );
}
