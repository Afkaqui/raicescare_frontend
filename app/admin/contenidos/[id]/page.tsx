import type { Metadata } from "next";
import { MarcoAdmin } from "../../marco-admin";
import { CargaEditor } from "./carga-editor";

export const metadata: Metadata = {
  title: "Editar contenido",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function EditarContenido({ params }: Props) {
  const { id } = await params;
  return (
    <MarcoAdmin>
      <CargaEditor id={id} />
    </MarcoAdmin>
  );
}
