import type { Metadata } from "next";
import { Bandeja } from "./bandeja";
import { MarcoAdmin } from "./marco-admin";

export const metadata: Metadata = {
  title: "Bandeja",
  robots: { index: false, follow: false },
};

export default function PanelAdmin() {
  return (
    <MarcoAdmin>
      <h1 className="mb-6 font-montserrat text-2xl font-bold text-verde-bosque">
        Bandeja de expedientes
      </h1>
      <Bandeja />
    </MarcoAdmin>
  );
}
