import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../components/pagina-interna";
import { Historial } from "./historial";

export const metadata: Metadata = {
  title: "Mis aportes",
  description: "Historial de tus aportes a RaícesCare.",
  robots: { index: false, follow: false },
};

export default function MiCuenta() {
  return (
    <>
      <EncabezadoInterno
        titulo="Mis aportes"
        descripcion="El registro de lo que has aportado, con su estado y su código de seguimiento."
      />
      <CuerpoInterno>
        <Historial />
      </CuerpoInterno>
    </>
  );
}
