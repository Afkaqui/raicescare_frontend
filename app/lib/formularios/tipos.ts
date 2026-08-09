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
  | "multiselect"
  /** Importe con montos sugeridos: las opciones se muestran como atajos. */
  | "monto";

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
  /** Solo para campos numéricos y de monto. */
  minimo?: number;
  maximo?: number;
  /** Se antepone al importe: «S/». */
  prefijo?: string;
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

/**
 * Un formulario con pago no termina al abrir el expediente: continúa hacia la
 * pasarela. El expediente se crea igual aunque el pago no se complete, de modo
 * que un aporte abandonado deja rastro y puede retomarse.
 */
export interface ConfiguracionPago {
  /** Campo cuyo valor es el importe a cobrar. */
  campoMonto: string;
  /** Campo que distingue aporte único de recurrente. */
  campoModalidad: string;
  /** Valor de `campoModalidad` que significa recurrente. */
  valorRecurrente: string;
  /** Moneda por defecto si el formulario no deja elegirla. */
  moneda: "PEN" | "USD";
  /** Campo que permite al aportante elegir moneda. */
  campoMoneda?: string;
}

export interface DefinicionFormulario {
  /** Tipo de expediente que abrirá en el backend. */
  requestType:
    | "contribution"
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
  /** Si está presente, al enviar se continúa hacia la pasarela de pago. */
  pago?: ConfiguracionPago;
  /** Texto del botón final. Por defecto, «Enviar solicitud». */
  etiquetaEnvio?: string;
}

export const VERSION_POLITICA = "v1-2026-08";
