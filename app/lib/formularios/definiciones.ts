import type { DefinicionFormulario } from "./tipos";

const AVISO_BASE =
  "Los datos que entregues se usarán únicamente para gestionar esta solicitud, " +
  "cumplir obligaciones administrativas y comunicarnos contigo sobre ella. No se " +
  "ceden a terceros. Puedes solicitar su acceso, rectificación o supresión escribiendo " +
  "al correo institucional.";

/** Participación — 5 categorías, un solo formulario (secciones 6.2 y 9.2). */
export const FORMULARIO_PARTICIPACION: DefinicionFormulario = {
  requestType: "participation_application",
  titulo: "Postulación de participación",
  descripcion:
    "Cuéntanos cómo quieres colaborar. Revisaremos tu postulación y te responderemos con un código de seguimiento.",
  campoCategoria: "tipoParticipacion",
  avisoPrivacidad: AVISO_BASE,
  pasos: [
    {
      titulo: "Oportunidad",
      descripcion: "Qué tipo de colaboración te interesa.",
      campos: [
        {
          nombre: "tipoParticipacion",
          etiqueta: "Tipo de participación",
          tipo: "select",
          requerido: true,
          desdeParametro: "type",
          opciones: [
            { valor: "field_volunteering", etiqueta: "Voluntariado de campo" },
            { valor: "educational_mentoring", etiqueta: "Mentoría educativa" },
            { valor: "pro_bono", etiqueta: "Apoyo profesional pro bono" },
            { valor: "internship", etiqueta: "Pasantía o colaboración estudiantil" },
            { valor: "ambassador", etiqueta: "Programa de embajadores" },
            { valor: "interest_registry", etiqueta: "Registro de interés" },
          ],
        },
        {
          nombre: "programa",
          etiqueta: "Programa de interés",
          tipo: "select",
          desdeParametro: "program",
          opciones: [
            { valor: "salud-y-cuidado", etiqueta: "Raíces de Salud y Cuidado" },
            { valor: "semillas-de-educacion", etiqueta: "Semillas de Educación" },
            { valor: "bio-amazonia", etiqueta: "Bio-Amazonía y Ecosistemas" },
            { valor: "cooperacion-y-alianzas", etiqueta: "Redes de Cooperación y Alianzas" },
            { valor: "sin-preferencia", etiqueta: "Sin preferencia" },
          ],
        },
      ],
    },
    {
      titulo: "Datos de contacto",
      campos: [
        { nombre: "nombreCompleto", etiqueta: "Nombre completo", tipo: "texto", requerido: true },
        { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", requerido: true },
        { nombre: "telefono", etiqueta: "Teléfono", tipo: "telefono" },
        { nombre: "pais", etiqueta: "País y ciudad", tipo: "texto" },
      ],
    },
    {
      titulo: "Perfil",
      descripcion:
        "No pedimos documentos en este primer contacto: los solicitaremos si postulas a una actividad concreta.",
      campos: [
        { nombre: "ocupacion", etiqueta: "Profesión u ocupación", tipo: "texto" },
        { nombre: "organizacion", etiqueta: "Organización donde trabajas o estudias", tipo: "texto" },
        {
          nombre: "experiencia",
          etiqueta: "Experiencia relevante",
          tipo: "textarea",
          ayuda: "Qué has hecho antes que se relacione con esta colaboración.",
        },
        { nombre: "competencias", etiqueta: "Competencias o especialidades", tipo: "texto" },
        { nombre: "idiomas", etiqueta: "Idiomas", tipo: "texto" },
      ],
    },
    {
      titulo: "Disponibilidad",
      campos: [
        { nombre: "disponibilidadDesde", etiqueta: "Disponible desde", tipo: "fecha" },
        {
          nombre: "dedicacion",
          etiqueta: "Dedicación estimada",
          tipo: "select",
          opciones: [
            { valor: "puntual", etiqueta: "Actividad puntual" },
            { valor: "algunas_horas_semana", etiqueta: "Algunas horas a la semana" },
            { valor: "medio_tiempo", etiqueta: "Medio tiempo" },
            { valor: "por_definir", etiqueta: "Por definir" },
          ],
        },
        {
          nombre: "viaje",
          etiqueta: "¿Puedes viajar a campo?",
          tipo: "select",
          opciones: [
            { valor: "si", etiqueta: "Sí" },
            { valor: "no", etiqueta: "No" },
            { valor: "segun_condiciones", etiqueta: "Según condiciones" },
          ],
        },
        { nombre: "restricciones", etiqueta: "Restricciones que debamos conocer", tipo: "textarea" },
      ],
    },
  ],
  consentimientos: [
    { tipo: "privacy", etiqueta: "Autorizo el tratamiento de mis datos personales para gestionar esta postulación.", obligatorio: true },
    { tipo: "truth_declaration", etiqueta: "Declaro que la información entregada es veraz.", obligatorio: true },
    { tipo: "image_use", etiqueta: "Autorizo el uso de mi imagen en materiales institucionales (opcional).", obligatorio: false },
    { tipo: "communications", etiqueta: "Deseo recibir comunicaciones sobre convocatorias futuras (opcional).", obligatorio: false },
  ],
};

/** Alianzas — un formulario, seis tipos (secciones 6.3 y 10). */
export const FORMULARIO_ALIANZA: DefinicionFormulario = {
  requestType: "alliance_proposal",
  titulo: "Propuesta de alianza",
  descripcion:
    "La aceptación estará sujeta a evaluación técnica, legal, financiera y reputacional. RaícesCare no garantiza financiamiento ni selección en convocatorias.",
  campoCategoria: "tipoAlianza",
  avisoPrivacidad: AVISO_BASE,
  pasos: [
    {
      titulo: "Tipo de alianza",
      campos: [
        {
          nombre: "tipoAlianza",
          etiqueta: "Tipo de alianza",
          tipo: "select",
          requerido: true,
          desdeParametro: "type",
          opciones: [
            { valor: "technical", etiqueta: "Alianza técnica" },
            { valor: "institutional", etiqueta: "Alianza institucional" },
            { valor: "financial_cooperation", etiqueta: "Alianza financiera o de cooperación" },
            { valor: "academic", etiqueta: "Alianza académica" },
            { valor: "territorial", etiqueta: "Alianza territorial" },
            { valor: "corporate_volunteering", etiqueta: "Voluntariado corporativo" },
          ],
        },
        {
          nombre: "programa",
          etiqueta: "Línea de acción relacionada",
          tipo: "select",
          desdeParametro: "program",
          opciones: [
            { valor: "salud-y-cuidado", etiqueta: "Raíces de Salud y Cuidado" },
            { valor: "semillas-de-educacion", etiqueta: "Semillas de Educación" },
            { valor: "bio-amazonia", etiqueta: "Bio-Amazonía y Ecosistemas" },
            { valor: "cooperacion-y-alianzas", etiqueta: "Redes de Cooperación y Alianzas" },
            { valor: "transversal", etiqueta: "Transversal" },
          ],
        },
      ],
    },
    {
      titulo: "Organización y contacto",
      campos: [
        { nombre: "razonSocial", etiqueta: "Razón social de la organización", tipo: "texto", requerido: true },
        {
          nombre: "tipoOrganizacion",
          etiqueta: "Tipo de organización",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "company", etiqueta: "Empresa" },
            { valor: "international_cooperation", etiqueta: "Cooperante internacional" },
            { valor: "public_institution", etiqueta: "Entidad pública" },
            { valor: "academic_institution", etiqueta: "Universidad o centro de investigación" },
            { valor: "ngo", etiqueta: "ONG o fundación" },
            { valor: "cooperative", etiqueta: "Cooperativa o asociación" },
            { valor: "community_organization", etiqueta: "Organización comunitaria" },
            { valor: "consulting_firm", etiqueta: "Consultora" },
            { valor: "other", etiqueta: "Otra organización" },
          ],
        },
        { nombre: "registro", etiqueta: "RUC o número de registro", tipo: "texto" },
        { nombre: "pais", etiqueta: "País", tipo: "texto" },
        { nombre: "sitioWeb", etiqueta: "Sitio web", tipo: "texto" },
        { nombre: "nombreCompleto", etiqueta: "Persona de contacto", tipo: "texto", requerido: true },
        { nombre: "cargo", etiqueta: "Cargo", tipo: "texto" },
        { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", requerido: true },
        { nombre: "telefono", etiqueta: "Teléfono", tipo: "telefono" },
      ],
    },
    {
      titulo: "La propuesta",
      campos: [
        { nombre: "objetivo", etiqueta: "Objetivo de la colaboración", tipo: "textarea", requerido: true },
        { nombre: "territorio", etiqueta: "Territorio o ámbito", tipo: "texto" },
        { nombre: "aportes", etiqueta: "Qué aporta cada parte", tipo: "textarea" },
        { nombre: "plazos", etiqueta: "Plazos estimados", tipo: "texto" },
        {
          nombre: "especialidad",
          etiqueta: "Especialidad técnica y entregables previstos",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["technical"] },
        },
        {
          nombre: "modalidadAporte",
          etiqueta: "Modalidad del aporte y requisitos de reporte",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["financial_cooperation"] },
        },
        {
          nombre: "lineaInvestigacion",
          etiqueta: "Línea de investigación e investigador responsable",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["academic"] },
        },
        {
          nombre: "organizacionLocal",
          etiqueta: "Organización local, representación y autorizaciones",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["territorial"] },
        },
        {
          nombre: "participantes",
          etiqueta: "Participantes estimados, fechas y cobertura de seguros",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["corporate_volunteering"] },
        },
        {
          nombre: "tipoConvenio",
          etiqueta: "Tipo de convenio y vigencia propuesta",
          tipo: "textarea",
          dependeDe: { campo: "tipoAlianza", valores: ["institutional"] },
        },
      ],
    },
  ],
  consentimientos: [
    { tipo: "privacy", etiqueta: "Autorizo el tratamiento de los datos de contacto para evaluar esta propuesta.", obligatorio: true },
    { tipo: "truth_declaration", etiqueta: "Declaro que la información entregada es veraz.", obligatorio: true },
    { tipo: "due_diligence", etiqueta: "Acepto que la propuesta será sometida a evaluación técnica, legal, financiera y reputacional.", obligatorio: true },
    { tipo: "communications", etiqueta: "Deseo recibir comunicaciones institucionales (opcional).", obligatorio: false },
  ],
};

/** Reunión institucional B2B (secciones 6 a 8 del capítulo de empresas). */
export const FORMULARIO_REUNION: DefinicionFormulario = {
  requestType: "institutional_meeting",
  titulo: "Solicitud de reunión institucional",
  descripcion:
    "Coordinamos una reunión para explorar una colaboración. Te responderemos con un código de seguimiento.",
  campoCategoria: "propositoPrincipal",
  avisoPrivacidad: AVISO_BASE,
  pasos: [
    {
      titulo: "Organización",
      campos: [
        { nombre: "razonSocial", etiqueta: "Razón social", tipo: "texto", requerido: true },
        {
          nombre: "tipoOrganizacion",
          etiqueta: "Tipo de organización",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "company", etiqueta: "Empresa" },
            { valor: "international_cooperation", etiqueta: "Cooperante internacional" },
            { valor: "public_institution", etiqueta: "Entidad pública" },
            { valor: "academic_institution", etiqueta: "Universidad o centro de investigación" },
            { valor: "ngo", etiqueta: "ONG o fundación" },
            { valor: "cooperative", etiqueta: "Cooperativa o asociación" },
            { valor: "community_organization", etiqueta: "Organización comunitaria" },
            { valor: "consulting_firm", etiqueta: "Consultora" },
            { valor: "other", etiqueta: "Otra organización" },
          ],
        },
        { nombre: "registro", etiqueta: "RUC o número de registro", tipo: "texto" },
        { nombre: "pais", etiqueta: "País", tipo: "texto" },
        { nombre: "sitioWeb", etiqueta: "Sitio web", tipo: "texto" },
      ],
    },
    {
      titulo: "Contacto",
      campos: [
        { nombre: "nombreCompleto", etiqueta: "Nombre completo", tipo: "texto", requerido: true },
        { nombre: "cargo", etiqueta: "Cargo", tipo: "texto", requerido: true },
        { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", requerido: true },
        { nombre: "telefono", etiqueta: "Teléfono", tipo: "telefono" },
        {
          nombre: "canalPreferido",
          etiqueta: "Canal preferido de contacto",
          tipo: "select",
          opciones: [
            { valor: "email", etiqueta: "Correo" },
            { valor: "phone", etiqueta: "Teléfono" },
            { valor: "whatsapp", etiqueta: "WhatsApp" },
          ],
        },
      ],
    },
    {
      titulo: "La reunión",
      campos: [
        {
          nombre: "propositoPrincipal",
          etiqueta: "Motivo principal",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "project_design", etiqueta: "Diseño de una iniciativa conjunta" },
            { valor: "corporate_volunteering", etiqueta: "Voluntariado corporativo" },
            { valor: "territorial_articulation", etiqueta: "Articulación territorial" },
            { valor: "technical_alliance", etiqueta: "Alianza técnica" },
            { valor: "financial_cooperation", etiqueta: "Cooperación financiera" },
            { valor: "academic_cooperation", etiqueta: "Cooperación académica" },
            { valor: "monitoring_and_reporting", etiqueta: "Seguimiento y reportes" },
            { valor: "donation_or_contribution", etiqueta: "Aporte o donación" },
            { valor: "institutional_agreement", etiqueta: "Convenio institucional" },
            { valor: "other", etiqueta: "Otro" },
          ],
        },
        { nombre: "resumen", etiqueta: "Resumen de lo que quieren conversar", tipo: "textarea", requerido: true },
        { nombre: "resultadoEsperado", etiqueta: "Resultado esperado de la reunión", tipo: "textarea" },
        {
          nombre: "alcance",
          etiqueta: "Alcance estimado",
          tipo: "select",
          opciones: [
            { valor: "exploratory", etiqueta: "Exploratorio" },
            { valor: "specific_project", etiqueta: "Proyecto específico" },
            { valor: "institutional_agreement", etiqueta: "Convenio institucional" },
            { valor: "long_term_partnership", etiqueta: "Alianza de largo plazo" },
          ],
        },
        {
          nombre: "modalidad",
          etiqueta: "Modalidad preferida",
          tipo: "select",
          opciones: [
            { valor: "virtual", etiqueta: "Virtual" },
            { valor: "in_person", etiqueta: "Presencial" },
            { valor: "either", etiqueta: "Cualquiera" },
          ],
        },
        { nombre: "disponibilidad", etiqueta: "Disponibilidad de fechas", tipo: "texto" },
      ],
    },
  ],
  consentimientos: [
    { tipo: "privacy", etiqueta: "Autorizo el tratamiento de los datos de contacto para gestionar esta solicitud.", obligatorio: true },
    { tipo: "truth_declaration", etiqueta: "Declaro que la información entregada es veraz.", obligatorio: true },
    { tipo: "communications", etiqueta: "Deseo recibir comunicaciones institucionales (opcional).", obligatorio: false },
  ],
};

/** Evaluación de elegibilidad de iniciativas (secciones 6.4 y 15). */
export const FORMULARIO_INICIATIVA: DefinicionFormulario = {
  requestType: "initiative_assessment",
  titulo: "Evaluación de elegibilidad",
  descripcion:
    "Evaluamos la iniciativa con criterios técnicos, legales, financieros y reputacionales. El resultado se comunica siempre, sea o no elegible.",
  campoCategoria: "tipoIniciativa",
  avisoPrivacidad: AVISO_BASE,
  pasos: [
    {
      titulo: "Solicitante",
      campos: [
        {
          nombre: "tipoSolicitante",
          etiqueta: "Tipo de solicitante",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "individual", etiqueta: "Persona natural" },
            { valor: "association", etiqueta: "Asociación" },
            { valor: "community_organization", etiqueta: "Organización comunitaria" },
            { valor: "company", etiqueta: "Empresa" },
            { valor: "public_entity", etiqueta: "Entidad pública" },
            { valor: "academic_entity", etiqueta: "Entidad académica" },
            { valor: "other", etiqueta: "Otro" },
          ],
        },
        { nombre: "razonSocial", etiqueta: "Nombre de la organización (si aplica)", tipo: "texto" },
        { nombre: "nombreCompleto", etiqueta: "Persona de contacto", tipo: "texto", requerido: true },
        { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", requerido: true },
        { nombre: "telefono", etiqueta: "Teléfono", tipo: "telefono" },
      ],
    },
    {
      titulo: "La iniciativa",
      campos: [
        { nombre: "nombreIniciativa", etiqueta: "Nombre de la iniciativa", tipo: "texto", requerido: true },
        {
          nombre: "tipoIniciativa",
          etiqueta: "Tipo de iniciativa",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "social", etiqueta: "Social" },
            { valor: "educational", etiqueta: "Educativa" },
            { valor: "environmental", etiqueta: "Ambiental" },
            { valor: "productive", etiqueta: "Productiva" },
            { valor: "research", etiqueta: "Investigación" },
            { valor: "cooperation", etiqueta: "Cooperación" },
            { valor: "other", etiqueta: "Otra" },
          ],
        },
        {
          nombre: "etapa",
          etiqueta: "Estado de desarrollo",
          tipo: "select",
          requerido: true,
          desdeParametro: "stage",
          opciones: [
            { valor: "idea", etiqueta: "Idea" },
            { valor: "concept", etiqueta: "Concepto" },
            { valor: "formulated", etiqueta: "Formulada" },
            { valor: "pilot", etiqueta: "Piloto" },
            { valor: "implementation", etiqueta: "En implementación" },
            { valor: "scaling", etiqueta: "En escalamiento" },
          ],
        },
        { nombre: "problema", etiqueta: "Problema que aborda", tipo: "textarea", requerido: true },
        { nombre: "objetivo", etiqueta: "Objetivo principal", tipo: "textarea", requerido: true },
        { nombre: "territorio", etiqueta: "Territorio", tipo: "texto", requerido: true },
        { nombre: "poblacion", etiqueta: "Población o ecosistema al que se dirige", tipo: "texto" },
      ],
    },
    {
      titulo: "Gobernanza y recursos",
      campos: [
        { nombre: "situacionLegal", etiqueta: "Situación legal de la organización", tipo: "texto" },
        { nombre: "equipo", etiqueta: "Equipo responsable", tipo: "textarea" },
        { nombre: "aliados", etiqueta: "Aliados actuales", tipo: "texto" },
        { nombre: "presupuesto", etiqueta: "Presupuesto estimado", tipo: "numero" },
        {
          nombre: "moneda",
          etiqueta: "Moneda",
          tipo: "select",
          opciones: [
            { valor: "PEN", etiqueta: "Soles (PEN)" },
            { valor: "USD", etiqueta: "Dólares (USD)" },
            { valor: "EUR", etiqueta: "Euros (EUR)" },
          ],
        },
        { nombre: "financiamientoAsegurado", etiqueta: "Financiamiento ya asegurado", tipo: "numero" },
      ],
    },
    {
      titulo: "Evidencia y necesidades",
      campos: [
        {
          nombre: "indicadores",
          etiqueta: "¿Tienen indicadores definidos?",
          tipo: "select",
          opciones: [
            { valor: "si", etiqueta: "Sí" },
            { valor: "no", etiqueta: "No" },
            { valor: "en_proceso", etiqueta: "En proceso" },
          ],
        },
        { nombre: "resultadosPrevios", etiqueta: "Resultados previos, si los hay", tipo: "textarea" },
        {
          nombre: "acompanamiento",
          etiqueta: "Necesidad principal de fortalecimiento",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "formulation", etiqueta: "Formulación del proyecto" },
            { valor: "governance", etiqueta: "Gobernanza" },
            { valor: "documentation", etiqueta: "Gestión documental" },
            { valor: "articulation", etiqueta: "Articulación institucional" },
            { valor: "monitoring", etiqueta: "Herramientas de seguimiento" },
          ],
        },
        { nombre: "riesgos", etiqueta: "Riesgos identificados", tipo: "textarea" },
      ],
    },
  ],
  consentimientos: [
    { tipo: "privacy", etiqueta: "Autorizo el tratamiento de mis datos para evaluar esta iniciativa.", obligatorio: true },
    { tipo: "truth_declaration", etiqueta: "Declaro que la información entregada es veraz.", obligatorio: true },
    { tipo: "due_diligence", etiqueta: "Entiendo que RaícesCare no garantiza financiamiento ni selección en convocatorias, y que la iniciativa pasará por revisión reputacional.", obligatorio: true },
  ],
};

/**
 * Aporte — el único formulario que continúa hacia una pasarela. El expediente
 * se abre antes de cobrar: si el pago se abandona, queda el rastro y el
 * aportante puede retomarlo con su código.
 */
export const FORMULARIO_APORTE: DefinicionFormulario = {
  requestType: "contribution",
  titulo: "Realizar un aporte",
  descripcion:
    "Elige la modalidad, el monto y la finalidad de tu contribución. El pago se procesa en el entorno seguro de MercadoPago.",
  campoCategoria: "modalidad",
  etiquetaEnvio: "Continuar al pago",
  pago: {
    campoMonto: "monto",
    campoModalidad: "modalidad",
    valorRecurrente: "recurring",
    moneda: "PEN",
    campoMoneda: "moneda",
  },
  pasos: [
    {
      titulo: "Tu aporte",
      descripcion:
        "El aporte recurrente se cobra cada mes y puedes cancelarlo cuando quieras desde tu cuenta de MercadoPago o escribiéndonos.",
      campos: [
        {
          nombre: "modalidad",
          etiqueta: "Modalidad",
          tipo: "select",
          requerido: true,
          desdeParametro: "type",
          opciones: [
            { valor: "single", etiqueta: "Aporte único" },
            { valor: "recurring", etiqueta: "Aporte mensual" },
          ],
        },
        {
          nombre: "moneda",
          etiqueta: "Moneda",
          tipo: "select",
          requerido: true,
          ayuda: "Los aportes desde el exterior pueden hacerse en dólares.",
          opciones: [
            { valor: "PEN", etiqueta: "Soles (S/)" },
            { valor: "USD", etiqueta: "Dólares (US$)" },
          ],
        },
        {
          nombre: "monto",
          etiqueta: "Monto del aporte",
          tipo: "monto",
          requerido: true,
          minimo: 5,
          maximo: 50000,
          ayuda: "Elige un monto sugerido o escribe el tuyo.",
          opciones: [
            { valor: "20", etiqueta: "S/ 20" },
            { valor: "50", etiqueta: "S/ 50" },
            { valor: "100", etiqueta: "S/ 100" },
            { valor: "200", etiqueta: "S/ 200" },
          ],
        },
      ],
    },
    {
      titulo: "Finalidad",
      descripcion:
        "Cuando no se indica una finalidad específica, el aporte se asigna según las prioridades institucionales informadas.",
      campos: [
        {
          nombre: "destino",
          etiqueta: "¿A qué deseas destinarlo?",
          tipo: "select",
          requerido: true,
          opciones: [
            { valor: "general", etiqueta: "Donde más se necesite" },
            { valor: "salud", etiqueta: "Raíces de Salud y Cuidado" },
            { valor: "educacion", etiqueta: "Semillas de Educación" },
            { valor: "bioamazonia", etiqueta: "Bio-Amazonía y Ecosistemas" },
            { valor: "cooperacion", etiqueta: "Redes de Cooperación y Alianzas" },
          ],
        },
        {
          nombre: "dedicatoria",
          etiqueta: "Dedicatoria o mensaje (opcional)",
          tipo: "textarea",
          ayuda: "Si tu aporte honra a alguien, cuéntanos.",
        },
      ],
    },
    {
      titulo: "Tus datos",
      descripcion:
        "Necesitamos el correo para enviarte la confirmación y, si corresponde, la constancia del aporte.",
      campos: [
        {
          nombre: "nombreCompleto",
          etiqueta: "Nombre completo",
          tipo: "texto",
          requerido: true,
        },
        {
          nombre: "email",
          etiqueta: "Correo electrónico",
          tipo: "email",
          requerido: true,
        },
        { nombre: "telefono", etiqueta: "Teléfono (opcional)", tipo: "telefono" },
        {
          nombre: "pais",
          etiqueta: "País",
          tipo: "texto",
          marcador: "Perú",
        },
      ],
    },
  ],
  consentimientos: [
    {
      tipo: "privacy",
      etiqueta:
        "Autorizo el tratamiento de mis datos personales conforme a la política de privacidad de RaícesCare.",
      obligatorio: true,
    },
    {
      tipo: "contribution_terms",
      etiqueta:
        "Entiendo que la emisión de constancias y cualquier efecto tributario dependen de la normativa aplicable y de la condición registral vigente de RaícesCare, y que este aporte no garantiza por sí mismo un beneficio fiscal.",
      obligatorio: true,
    },
    {
      tipo: "communications",
      etiqueta:
        "Quiero recibir información sobre el uso de los aportes y las actividades de RaícesCare.",
      obligatorio: false,
    },
  ],
  avisoPrivacidad:
    "Los datos que nos entregues se usan para registrar y dar seguimiento a tu aporte, emitir la constancia que corresponda y comunicarte su resultado. El pago se procesa íntegramente en el entorno de MercadoPago: RaícesCare no recibe ni almacena los datos de tu tarjeta.",
};
