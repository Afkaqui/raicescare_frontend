import type { Metadata } from "next";
import { Suspense } from "react";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { ConfirmarCorreo } from "../../components/cuenta/formularios";

export const metadata: Metadata = {
  title: "Confirmar correo",
  description: "Confirmación del correo de tu cuenta de aportante.",
  robots: { index: false, follow: false },
};

export default function VerificarCorreo() {
  return (
    <>
      <EncabezadoInterno
        titulo="Confirmar tu correo"
        descripcion="Un momento mientras validamos el enlace."
      />
      <CuerpoInterno>
        <Suspense fallback={<p className="text-gray-600">Cargando…</p>}>
          <ConfirmarCorreo />
        </Suspense>
      </CuerpoInterno>
    </>
  );
}
