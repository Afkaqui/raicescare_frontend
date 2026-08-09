import type { Metadata } from "next";
import { Suspense } from "react";
import { CuerpoInterno, EncabezadoInterno } from "../../components/pagina-interna";
import { ClaveForm } from "./clave-form";

export const metadata: Metadata = {
  title: "Elegir contraseña",
  robots: { index: false, follow: false },
};

export default function ElegirClave() {
  return (
    <>
      <EncabezadoInterno
        titulo="Elegir tu contraseña"
        descripcion="Plataforma interna de RaícesCare. Esta página no forma parte del sitio público."
      />
      <CuerpoInterno>
        <Suspense fallback={<p className="text-gray-600">Cargando…</p>}>
          <ClaveForm />
        </Suspense>
      </CuerpoInterno>
    </>
  );
}
