import type { Metadata } from "next";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { FormularioEntrar } from "../../components/cuenta/formularios";

export const metadata: Metadata = {
  title: "Entrar a mi cuenta",
  description: "Accede a tu cuenta de aportante de RaícesCare.",
  alternates: { canonical: "/cuenta/entrar" },
};

export default function EntrarCuenta() {
  return (
    <>
      <EncabezadoInterno
        titulo="Entrar a mi cuenta"
        descripcion="Consulta el historial de tus aportes y su estado."
      />
      <CuerpoInterno>
        <FormularioEntrar />
      </CuerpoInterno>
    </>
  );
}
