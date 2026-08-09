/**
 * Documentos legales del sitio.
 *
 * BORRADOR. Redactados a partir de la normativa peruana vigente —Ley N.° 29733
 * y su Reglamento aprobado por D.S. N.° 016-2024-JUS, en vigor desde el 30 de
 * marzo de 2025— y de estándares internacionales. Describen con exactitud lo
 * que la plataforma hace hoy, pero requieren revisión de asesoría legal antes
 * de considerarse definitivos.
 *
 * Los puntos marcados con «POR DEFINIR» son decisiones de la organización que
 * no pueden inventarse: plazos de conservación, designación del Oficial de
 * Datos Personales e inscripción de bancos de datos.
 */

export const VERSION_DOCUMENTOS = "v1-borrador-2026-08";
export const FECHA_ACTUALIZACION = "9 de agosto de 2026";

export interface Seccion {
  titulo: string;
  parrafos?: string[];
  lista?: string[];
  tabla?: { encabezados: string[]; filas: string[][] };
  aviso?: string;
}

export interface Documento {
  slug: string;
  titulo: string;
  resumen: string;
  descripcionMeta: string;
  secciones: Seccion[];
}

const IDENTIFICACION: Seccion = {
  titulo: "Quién trata tus datos",
  parrafos: [
    "La Asociación RaícesCare, asociación civil sin fines de lucro con RUC N.° 20616229371 y Partida Registral N.° 11241934, con domicilio legal en Calle Puerto de Palos 160, San Isidro, Lima, Perú, y sede operativa en Calle San Martín 1037, Callería, Pucallpa, Ucayali, es responsable del tratamiento de los datos personales que se recogen a través de este sitio.",
    "Para cualquier asunto relacionado con tus datos personales puedes escribir a raicescare.de@gmail.com indicando en el asunto el derecho que deseas ejercer.",
  ],
  aviso:
    "POR DEFINIR: si la organización queda obligada a designar un Oficial de Datos Personales conforme al D.S. 016-2024-JUS, sus datos de contacto deben publicarse en esta sección.",
};

export const DOCUMENTOS: Documento[] = [
  // ------------------------------------------------------------ privacidad
  {
    slug: "privacidad",
    titulo: "Política de privacidad",
    resumen:
      "Qué datos recogemos, para qué, con quién los compartimos y cómo ejercer tus derechos.",
    descripcionMeta:
      "Política de privacidad de RaícesCare conforme a la Ley N.° 29733 y su Reglamento (D.S. 016-2024-JUS).",
    secciones: [
      IDENTIFICACION,
      {
        titulo: "Marco legal aplicable",
        parrafos: [
          "Este tratamiento se rige por la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por Decreto Supremo N.° 016-2024-JUS, vigente desde el 30 de marzo de 2025. La autoridad de control es la Autoridad Nacional de Protección de Datos Personales (ANPD), adscrita al Ministerio de Justicia y Derechos Humanos.",
          "Cuando quien nos entrega sus datos reside en el Espacio Económico Europeo o en el Reino Unido, aplicamos además los principios del Reglamento General de Protección de Datos (RGPD): minimización, limitación de la finalidad, exactitud, limitación del plazo de conservación y responsabilidad proactiva. En caso de conflicto entre ambos marcos, se aplica el estándar más protector para el titular.",
        ],
      },
      {
        titulo: "Qué datos recogemos y por qué",
        parrafos: [
          "Solo pedimos lo que hace falta para atender cada solicitud. No recogemos datos sensibles —salud, origen étnico, convicciones, datos biométricos— en ningún formulario del sitio. Si alguna vez fueran necesarios para un programa concreto, se pedirán aparte, con consentimiento específico y por escrito.",
        ],
        tabla: {
          encabezados: ["Qué recogemos", "Para qué", "Base que lo habilita"],
          filas: [
            [
              "Nombre, correo, teléfono y país",
              "Identificarte, responder tu solicitud y comunicarte el resultado",
              "Tu consentimiento, otorgado al enviar el formulario",
            ],
            [
              "Razón social, tipo de organización, número de registro y sitio web",
              "Evaluar propuestas de alianza y solicitudes institucionales",
              "Tu consentimiento y el interés legítimo en verificar contrapartes",
            ],
            [
              "Respuestas del formulario: modalidad, monto, finalidad, disponibilidad, experiencia",
              "Evaluar la solicitud según sus propios criterios",
              "Tu consentimiento",
            ],
            [
              "Código de seguimiento y estados por los que pasa tu solicitud",
              "Que puedas consultar el avance sin identificarte",
              "Ejecución de la relación que se inicia con tu solicitud",
            ],
            [
              "Hash de tu dirección IP y de tu navegador al aceptar los consentimientos",
              "Poder demostrar cuándo y en qué términos aceptaste, como exige el Reglamento",
              "Cumplimiento de una obligación legal",
            ],
            [
              "Identificadores de sesión y de navegación",
              "Entender qué secciones del sitio resultan útiles",
              "Tu consentimiento, revocable en cualquier momento",
            ],
          ],
        },
      },
      {
        titulo: "Lo que nunca recibimos",
        parrafos: [
          "Los pagos se procesan íntegramente en el entorno de MercadoPago. RaícesCare no recibe, no ve y no almacena el número de tu tarjeta, su fecha de vencimiento ni su código de seguridad. De un aporte solo conocemos el monto, el estado que MercadoPago reporta, el medio de pago empleado y el correo con el que pagaste.",
          "Tampoco pedimos tu número de documento de identidad en los formularios del sitio. Si MercadoPago te lo solicita durante el pago, ese dato queda en su plataforma y no llega a la nuestra.",
        ],
      },
      {
        titulo: "Con quién compartimos tus datos",
        parrafos: [
          "No vendemos datos personales, no los cedemos con fines publicitarios y no los compartimos con terceros ajenos a la prestación del servicio. Los siguientes proveedores los tratan por encargo nuestro y solo para lo que se indica:",
        ],
        tabla: {
          encabezados: ["Proveedor", "Para qué", "Dónde se alojan"],
          filas: [
            ["Vercel Inc.", "Alojamiento del sitio web", "Estados Unidos"],
            [
              "MercadoPago Perú S.A.C.",
              "Procesamiento de aportes",
              "Perú y región",
            ],
            [
              "Resend (Plus Five Five, Inc.)",
              "Envío de correos transaccionales",
              "Estados Unidos",
            ],
            [
              "Servidor propio en Lima, Perú",
              "Base de datos de solicitudes",
              "Perú",
            ],
          ],
        },
      },
      {
        titulo: "Transferencias internacionales",
        parrafos: [
          "Algunos de esos proveedores están fuera del Perú, de modo que tus datos cruzan fronteras. Estas transferencias se amparan en tu consentimiento informado y en que resultan necesarias para la ejecución del servicio que solicitas. Con cada proveedor existe un acuerdo de tratamiento de datos que le obliga a aplicar medidas de seguridad equivalentes y a no usar la información para fines propios.",
          "La base de datos donde viven las solicitudes está alojada en el Perú.",
        ],
      },
      {
        titulo: "Cuánto tiempo conservamos tus datos",
        parrafos: [
          "Conservamos los datos mientras dure la finalidad que los justificó y, después, durante el plazo en que puedan derivarse responsabilidades legales o contables. Los registros de consentimiento se conservan mientras el consentimiento siga vigente y por el periodo en que debamos poder acreditarlo.",
        ],
        aviso:
          "POR DEFINIR: los plazos concretos de conservación por tipo de solicitud. La organización debe fijarlos considerando sus obligaciones contables y tributarias, y este documento debe expresarlos en años.",
      },
      {
        titulo: "Tus derechos",
        parrafos: [
          "Puedes ejercer en cualquier momento los derechos de acceso, rectificación, cancelación y oposición —conocidos como derechos ARCO—, así como los derechos a la información, a la portabilidad de tus datos y a revocar el consentimiento que nos diste. Revocar el consentimiento no afecta la licitud del tratamiento anterior.",
          "Escríbenos a raicescare.de@gmail.com indicando qué derecho ejerces y adjuntando algo que permita verificar tu identidad. Si tienes un código de seguimiento, inclúyelo: acelera la búsqueda.",
          "Los plazos legales para responderte son de veinte días hábiles para el derecho de acceso y de diez días hábiles para rectificación, cancelación y oposición, contados desde el día siguiente a tu solicitud. Pueden ampliarse una sola vez por un plazo igual cuando las circunstancias lo justifiquen, avisándote antes.",
          "Si no te respondemos en plazo o no estás conforme con la respuesta, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
        ],
      },
      {
        titulo: "Seguridad y qué pasa si algo falla",
        parrafos: [
          "El sitio y la API funcionan sobre conexiones cifradas. Las contraseñas del personal se guardan derivadas con un algoritmo de coste alto, nunca en claro. Las direcciones IP y los navegadores asociados a los consentimientos se guardan solo como huella criptográfica, de modo que sirven para acreditar el consentimiento pero no permiten reconstruir el dato original. El acceso interno a las solicitudes exige cuenta nominal y queda registrado.",
          "Si ocurriera una brecha de seguridad que afecte tus datos personales, la notificaremos a la Autoridad Nacional de Protección de Datos Personales dentro de las cuarenta y ocho horas siguientes a su detección, conforme al Reglamento, y te informaremos directamente cuando la brecha suponga un riesgo alto para tus derechos.",
        ],
      },
      {
        titulo: "Menores de edad",
        parrafos: [
          "Los formularios de este sitio están dirigidos a personas mayores de edad. No recogemos deliberadamente datos de menores de catorce años. Cuando una actividad de nuestros programas involucre a menores, el tratamiento de sus datos se gestiona fuera de este sitio, con el consentimiento de quienes ejercen la patria potestad o tutela y con las salvaguardas adicionales que la normativa exige.",
        ],
      },
      {
        titulo: "Cambios en esta política",
        parrafos: [
          "Si cambiamos esta política, publicaremos la versión nueva en esta misma dirección con su fecha. Cuando el cambio afecte de forma sustancial cómo tratamos datos ya recogidos, pediremos nuevamente tu consentimiento en lugar de darlo por supuesto.",
        ],
      },
    ],
  },

  // ----------------------------------------------------- datos personales
  {
    slug: "datos-personales",
    titulo: "Tratamiento de datos personales",
    resumen:
      "Cómo pedimos tu consentimiento, cómo lo registramos y cómo puedes retirarlo.",
    descripcionMeta:
      "Detalle del consentimiento y del tratamiento de datos personales en RaícesCare.",
    secciones: [
      {
        titulo: "Qué exige el consentimiento",
        parrafos: [
          "El Reglamento vigente exige que el consentimiento sea libre, previo, expreso, informado, inequívoco y demostrable. Eso descarta las casillas premarcadas, el consentimiento deducido del silencio y las fórmulas que agrupan varias finalidades en una sola aceptación.",
          "En la práctica, en nuestros formularios eso significa que las casillas llegan siempre desmarcadas, que el consentimiento de tratamiento de datos se pide por separado del de comunicaciones, y que puedes enviar tu solicitud sin aceptar el envío de información institucional.",
        ],
      },
      {
        titulo: "Cómo registramos que aceptaste",
        parrafos: [
          "Cada consentimiento se guarda como un registro propio con el tipo de consentimiento, la versión exacta del texto que leíste, si lo aceptaste o no, la fecha y hora, y la huella criptográfica de tu dirección IP y de tu navegador.",
          "Guardamos la huella y no el dato original a propósito: permite acreditar ante la autoridad que el consentimiento se prestó desde una conexión determinada, sin conservar un registro de navegación que nadie necesita.",
        ],
      },
      {
        titulo: "Consentimientos que pedimos",
        tabla: {
          encabezados: ["Consentimiento", "¿Obligatorio?", "Qué habilita"],
          filas: [
            [
              "Tratamiento de datos personales",
              "Sí",
              "Registrar y atender tu solicitud, y comunicarte el resultado",
            ],
            [
              "Condiciones del aporte",
              "Sí, solo en aportes",
              "Dejar constancia de que conoces el alcance de la constancia y sus efectos tributarios",
            ],
            [
              "Comunicaciones institucionales",
              "No",
              "Enviarte información sobre el uso de los aportes y las actividades",
            ],
          ],
        },
      },
      {
        titulo: "Cómo retirar el consentimiento",
        parrafos: [
          "Escríbenos a raicescare.de@gmail.com. El retiro surte efecto hacia adelante: dejamos de tratar tus datos para la finalidad que revocaste, sin que ello afecte lo hecho legítimamente antes.",
          "Ten en cuenta que retirar el consentimiento de tratamiento puede impedirnos continuar con una solicitud en curso, porque sin esos datos no hay forma de atenderla. Si eso ocurre, te lo diremos antes de proceder.",
        ],
      },
      {
        titulo: "Decisiones automatizadas",
        parrafos: [
          "No tomamos decisiones que te afecten basándonos únicamente en un tratamiento automatizado. La validación automática que aparece en el seguimiento de un aporte se limita a confirmar con la pasarela que el pago se acreditó; no evalúa a las personas. Toda evaluación de una solicitud de participación, alianza o iniciativa la realiza una persona.",
        ],
      },
      {
        titulo: "Banco de datos",
        parrafos: [
          "La Ley N.° 29733 y su Reglamento obligan a inscribir los bancos de datos personales en el Registro Nacional de Protección de Datos Personales.",
        ],
        aviso:
          "POR DEFINIR: inscribir los bancos de datos de solicitudes, aportantes y personal en el Registro Nacional, y publicar aquí su código de inscripción.",
      },
    ],
  },

  // --------------------------------------------------------------- cookies
  {
    slug: "cookies",
    titulo: "Política de cookies y tecnologías de seguimiento",
    resumen:
      "Qué guardamos en tu navegador, para qué, y cómo desactivarlo.",
    descripcionMeta:
      "Cookies e identificadores en línea que utiliza el sitio de RaícesCare y cómo controlarlos.",
    secciones: [
      {
        titulo: "Por qué esto es materia de datos personales",
        parrafos: [
          "El Reglamento aprobado por D.S. N.° 016-2024-JUS incorporó expresamente los identificadores en línea —cookies, identificadores publicitarios y huellas de navegador— dentro del concepto de dato personal. Por eso, todo lo que no sea estrictamente necesario para que el sitio funcione requiere tu consentimiento previo, y ese consentimiento debe poder retirarse con la misma facilidad con que se dio.",
        ],
      },
      {
        titulo: "Qué guardamos hoy en tu navegador",
        parrafos: [
          "Este sitio no usa cookies publicitarias, ni redes de rastreo, ni herramientas de terceros como Google Analytics o píxeles de redes sociales. Lo que sí guardamos es lo siguiente:",
        ],
        tabla: {
          encabezados: ["Identificador", "Dónde vive", "Para qué", "Duración"],
          filas: [
            [
              "raicescare_session_id",
              "sessionStorage",
              "Agrupar las acciones de una misma visita",
              "Se borra al cerrar la pestaña",
            ],
            [
              "raicescare_anonymous_id",
              "localStorage",
              "Reconocer visitas repetidas sin saber quién eres",
              "Persiste hasta que borres los datos del navegador",
            ],
            [
              "raicescare_last_interaction",
              "sessionStorage",
              "Enlazar el botón que pulsaste con la solicitud que envíes",
              "Se borra al enviar la solicitud o al cerrar la pestaña",
            ],
            [
              "rc_sesion",
              "Cookie",
              "Mantener la sesión del personal autorizado en la plataforma interna",
              "12 horas",
            ],
          ],
        },
      },
      {
        titulo: "Cuáles son necesarias y cuáles no",
        parrafos: [
          "La cookie de sesión de la plataforma interna es estrictamente necesaria: sin ella, quien trabaja en RaícesCare no podría mantenerse identificado. No requiere consentimiento y no afecta a los visitantes del sitio público.",
          "Los tres identificadores de medición no son necesarios para que el sitio funcione. Nos sirven para entender qué secciones resultan útiles y qué recorrido siguen las personas antes de escribirnos, pero puedes navegar y usar todos los formularios sin ellos.",
        ],
        aviso:
          "PENDIENTE DE IMPLEMENTACIÓN: los identificadores de medición se activan hoy sin pedir consentimiento previo. Para ajustarse al Reglamento hace falta un banner que los mantenga desactivados hasta que la persona acepte, con opciones granulares y posibilidad de retirar el consentimiento.",
      },
      {
        titulo: "Cómo desactivarlos",
        parrafos: [
          "Puedes borrarlos en cualquier momento desde la configuración de tu navegador, en la sección de datos de sitios web. Si navegas en modo incógnito o privado, se descartan al cerrar la ventana.",
          "Borrar el identificador anónimo no afecta a las solicitudes que ya enviaste: esas viven en nuestra base con su código de seguimiento y son independientes de lo que guarde tu navegador.",
        ],
      },
    ],
  },

  // -------------------------------------------------------------- términos
  {
    slug: "terminos",
    titulo: "Términos de uso",
    resumen: "Condiciones para usar este sitio y enviar solicitudes.",
    descripcionMeta:
      "Términos de uso del sitio web institucional de RaícesCare.",
    secciones: [
      {
        titulo: "Alcance",
        parrafos: [
          "Este sitio es el canal institucional de la Asociación RaícesCare. Su contenido tiene carácter informativo y no constituye asesoría legal, tributaria, médica ni ambiental.",
          "Al usar el sitio y enviar cualquier formulario aceptas estos términos. Si no estás de acuerdo con ellos, no los envíes.",
        ],
      },
      {
        titulo: "Sobre las solicitudes que envías",
        parrafos: [
          "Enviar una solicitud —de participación, alianza, evaluación de iniciativa o reunión institucional— no genera por sí mismo ningún vínculo, obligación ni derecho a ser aceptado. Cada solicitud se evalúa según criterios propios, y el resultado se comunica siempre, sea favorable o no.",
          "Te comprometes a que la información que nos entregues sea veraz y a tener autorización para entregarnos datos de terceros cuando los incluyas.",
        ],
      },
      {
        titulo: "Propiedad intelectual",
        parrafos: [
          "Los textos, imágenes, materiales gráficos y documentos de este sitio pertenecen a la Asociación RaícesCare o se usan con autorización. Puedes citarlos y compartirlos indicando la fuente. No puedes usarlos con fines comerciales ni presentarlos como propios sin permiso escrito.",
          "Las imágenes de personas y comunidades se publican con las autorizaciones correspondientes y no pueden reutilizarse fuera de este sitio.",
        ],
      },
      {
        titulo: "Disponibilidad y enlaces",
        parrafos: [
          "Procuramos que el sitio esté siempre disponible y que su información sea correcta y esté actualizada, pero no podemos garantizar la ausencia total de interrupciones o de errores. El sitio puede enlazar a páginas de terceros, sobre cuyo contenido y prácticas de privacidad no tenemos control.",
        ],
      },
      {
        titulo: "Ley aplicable",
        parrafos: [
          "Estos términos se rigen por la legislación peruana. Cualquier controversia se somete a los jueces y tribunales del distrito judicial de Lima, salvo que una norma imperativa disponga otro fuero en favor del consumidor o del titular de los datos.",
        ],
      },
    ],
  },

  // ------------------------------------------------ aportes y devoluciones
  {
    slug: "aportes-y-devoluciones",
    titulo: "Política de aportes y devoluciones",
    resumen:
      "Cómo se procesan los aportes, qué constancia se emite y cómo pedir una devolución.",
    descripcionMeta:
      "Condiciones de los aportes a RaícesCare, constancias y devoluciones.",
    secciones: [
      {
        titulo: "Cómo se procesa un aporte",
        parrafos: [
          "Los aportes se procesan a través de MercadoPago. Al confirmar tu aporte se abre un expediente con un código de seguimiento con el que puedes consultar su estado en cualquier momento, sin necesidad de identificarte.",
          "Los aportes recurrentes se cobran con la periodicidad que elijas y puedes cancelarlos cuando quieras desde tu cuenta de MercadoPago o escribiéndonos con tu código.",
        ],
      },
      {
        titulo: "Destino de los aportes",
        parrafos: [
          "Cuando eliges una línea de acción, el aporte se asigna a ella. Cuando no indicas una finalidad específica, se asigna según las prioridades institucionales informadas.",
          "Si una campaña concreta se cierra, se suspende o alcanza su meta, los aportes destinados a ella se reasignan a la línea de acción más próxima, informando de ello a quienes aportaron.",
        ],
      },
      {
        titulo: "Constancias y efectos tributarios",
        parrafos: [
          "La emisión de constancias y cualquier tratamiento tributario dependen de la naturaleza de la contribución, de la normativa aplicable y de la condición registral vigente de RaícesCare. Un aporte no garantiza por sí mismo un beneficio fiscal.",
        ],
        aviso:
          "POR DEFINIR: si la asociación cuenta con calificación vigente como entidad perceptora de donaciones ante SUNAT, qué documento se emite exactamente, quién lo firma y en qué plazo. Sin esta definición, la web no puede prometer ningún efecto tributario.",
      },
      {
        titulo: "Devoluciones",
        parrafos: [
          "Un aporte es una liberalidad y, en principio, no es reembolsable. Aun así, atendemos pedidos de devolución cuando hubo un cobro duplicado, un error de monto atribuible a un fallo técnico, un cobro no autorizado, o un aporte recurrente cobrado después de haber solicitado su cancelación.",
          "Escríbenos con tu código de seguimiento explicando qué ocurrió. Evaluamos el caso y, si procede, la devolución se tramita por el mismo medio de pago; los plazos de acreditación dependen de MercadoPago y de tu banco.",
        ],
        aviso:
          "POR DEFINIR: el plazo máximo para solicitar una devolución y quién la autoriza dentro de la organización.",
      },
      {
        titulo: "Comisiones",
        parrafos: [
          "La pasarela de pago cobra una comisión por cada transacción.",
        ],
        aviso:
          "POR DEFINIR: si la comisión la absorbe la asociación o se muestra al aportante. La decisión debe reflejarse aquí y en el formulario de aporte.",
      },
    ],
  },

  // ------------------------------------------------------------ integridad
  {
    slug: "integridad",
    titulo: "Canal de consultas e integridad",
    resumen:
      "Cómo plantear una consulta, una queja o una denuncia, y cómo la tratamos.",
    descripcionMeta:
      "Canal de consultas, quejas y denuncias de la Asociación RaícesCare.",
    secciones: [
      {
        titulo: "Para qué sirve este canal",
        parrafos: [
          "Puedes usarlo para plantear consultas sobre nuestro trabajo, quejas sobre la atención recibida, o denuncias sobre conductas contrarias a la ley o a nuestros principios: uso indebido de recursos, conflictos de interés, maltrato a participantes o comunidades, y cualquier práctica que comprometa la integridad de la organización.",
        ],
      },
      {
        titulo: "Cómo lo tratamos",
        parrafos: [
          "Escríbenos a raicescare.de@gmail.com. Toda comunicación recibe acuse y se registra con un código de seguimiento.",
          "Puedes plantear una denuncia de forma anónima. Si lo haces, ten en cuenta que sin un medio de contacto no podremos pedirte precisiones ni comunicarte el resultado.",
          "Cuando te identifiques, tu identidad se trata de forma reservada y solo se comparte con quienes deban intervenir para investigar los hechos.",
        ],
      },
      {
        titulo: "No represalias",
        parrafos: [
          "Nadie que plantee de buena fe una consulta, queja o denuncia sufrirá represalia alguna por hacerlo, con independencia de que la investigación confirme o no los hechos.",
        ],
      },
    ],
  },
];

export function documentoPorSlug(slug: string): Documento | undefined {
  return DOCUMENTOS.find((documento) => documento.slug === slug);
}
