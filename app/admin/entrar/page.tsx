import type { Metadata } from "next";
import { CuerpoInterno, EncabezadoInterno } from "../../components/pagina-interna";
import { EntrarForm } from "./entrar-form";

export const metadata: Metadata = {
  title: "Acceso interno",
  robots: { index: false, follow: false },
};

export default function Entrar() {
  return (
    <>
      <EncabezadoInterno
        titulo="Acceso interno"
        descripcion="Plataforma de gestión de RaícesCare. El acceso es solo para cuentas autorizadas."
      />
      <CuerpoInterno>
        <EntrarForm />
        <p className="text-center text-xs text-gray-500">
          ¿Buscabas el historial de tus aportes? Esa es{" "}
          <a
            href="/cuenta/entrar"
            className="font-semibold text-gray-600 hover:underline"
          >
            otra cuenta
          </a>
          .
        </p>
      </CuerpoInterno>
    </>
  );
}
