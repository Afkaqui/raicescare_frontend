/**
 * Motor declarativo de los formularios maestros.
 *
 * La arquitectura exige cuatro formularios, no uno por botón. Cada proceso se
 * describe con pasos y campos; el componente que los renderiza es único.
 */

export type TipoCampo =
  | "texto"
  | "textarea"
  | "email"
  | "telefono"
  | "numero"
  | "fecha"
  | "select"
  | "multiselect";

export interface Campo {
  nombre: string;
  etiqueta: string;
  tipo: TipoCampo;
  requerido?: boolean;
  ayuda?: string;
  marcador?: string;
  opciones?: { valor: string; etiqueta: string }[];
  /** Solo se muestra si otro campo tiene uno de estos valores. */
  dependeDe?: { campo: string; valores: string[] };
  /** Se precarga desde el parámetro de la URL con este nombre. */
  desdeParametro?: string;
}

export interface Paso {
  titulo: string;
  descripcion?: string;
  campos: Campo[];
}

export interface Consentimiento {
  tipo: string;
  etiqueta: string;
  obligatorio: boolean;
}

export interface DefinicionFormulario {
  /** Tipo de expediente que abrirá en el backend. */
  requestType:
    | "participation_application"
    | "alliance_proposal"
    | "institutional_meeting"
    | "initiative_assessment";
  titulo: string;
  descripcion: string;
  /** Campo cuyo valor se guarda como categoría del expediente. */
  campoCategoria?: string;
  pasos: Paso[];
  consentimientos: Consentimiento[];
  /** Texto del aviso de privacidad mostrado antes de aceptar. */
  avisoPrivacidad: string;
}

export const VERSION_POLITICA = "v1-2026-08";
