import type { Metadata } from "next";
import { Suspense } from "react";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../../components/pagina-interna";
import { ElegirClave } from "../../components/cuenta/formularios";

export const metadata: Metadata = {
  title: "Elegir contraseña",
  description: "Recuperación de acceso a tu cuenta de aportante.",
  robots: { index: false, follow: false },
};

export default function ClaveCuenta() {
  return (
    <>
      <EncabezadoInterno
        titulo="Elegir una contraseña nueva"
        descripcion="Al guardarla se cierran las sesiones abiertas de tu cuenta."
      />
      <CuerpoInterno>
        <Suspense fallback={<p className="text-gray-600">Cargando…</p>}>
          <ElegirClave />
        </Suspense>
      </CuerpoInterno>
    </>
  );
}
