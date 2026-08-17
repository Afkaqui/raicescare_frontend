import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../components/pagina-interna";
import { FormularioRegistro } from "../components/cuenta/formularios";

export const metadata: Metadata = {
  title: "Crear una cuenta",
  description: "Crea tu cuenta en RaícesCare para llevar el registro de tus aportes. Es opcional: puedes aportar sin ella.",
  alternates: { canonical: "/registro" },
};

export default function Registro() {
  return (
    <>
      <EncabezadoInterno
        titulo="Crear una cuenta"
        descripcion="Opcional. Sirve para llevar el registro de tus aportes y consultarlos cuando quieras."
      />
      <CuerpoInterno>
        <FormularioRegistro />
      </CuerpoInterno>
    </>
  );
}
