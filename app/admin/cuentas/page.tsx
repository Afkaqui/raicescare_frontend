import type { Metadata } from "next";
import { MarcoAdmin } from "../marco-admin";
import { Cuentas } from "./cuentas";

export const metadata: Metadata = {
  title: "Cuentas",
  robots: { index: false, follow: false },
};

export default function CuentasAdmin() {
  return (
    <MarcoAdmin>
      <h1 className="mb-2 font-montserrat text-2xl font-bold text-verde-bosque">
        Cuentas del equipo
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        Solo el superadministrador gestiona quién entra. La API vuelve a
        comprobarlo en cada petición.
      </p>
      <Cuentas />
    </MarcoAdmin>
  );
}
