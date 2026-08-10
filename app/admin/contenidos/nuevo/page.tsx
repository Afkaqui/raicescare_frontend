import type { Metadata } from "next";
import { MarcoAdmin } from "../../marco-admin";
import { Editor } from "../editor";

export const metadata: Metadata = {
  title: "Nuevo contenido",
  robots: { index: false, follow: false },
};

export default function NuevoContenido() {
  return (
    <MarcoAdmin>
      <h1 className="mb-6 font-montserrat text-2xl font-bold text-verde-bosque">
        Nuevo contenido
      </h1>
      {/* Al crear no hay nada que eliminar, así que el rol no cambia nada. */}
      <Editor esSuperadmin={false} />
    </MarcoAdmin>
  );
}
