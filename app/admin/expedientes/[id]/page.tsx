import type { Metadata } from "next";
import { MarcoAdmin } from "../../marco-admin";
import { Detalle } from "./detalle";

export const metadata: Metadata = {
  title: "Expediente",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function ExpedienteAdmin({ params }: Props) {
  const { id } = await params;
  return (
    <MarcoAdmin>
      <Detalle id={id} />
    </MarcoAdmin>
  );
}
