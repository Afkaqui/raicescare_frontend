import type { Metadata } from "next";
import { CatalogoContenido } from "../components/catalogo-contenido";
import {
  CuerpoInterno,
  EncabezadoInterno,
} from "../components/pagina-interna";
import { SECCIONES } from "../lib/contenido-rutas";

const SECCION = SECCIONES.proyectos;

export const metadata: Metadata = SECCION.metadata;

export default function ListadoProyectos() {
  return (
    <>
      <EncabezadoInterno
        titulo={SECCION.titulo}
        descripcion={SECCION.descripcion}
      />
      <CuerpoInterno>
        <CatalogoContenido kind={SECCION.kind} vacio={SECCION.vacio} />
      </CuerpoInterno>
    </>
  );
}
