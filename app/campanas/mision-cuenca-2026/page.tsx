import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  destinoDeCampana,
  obtenerAvance,
  obtenerContenido,
  urlAbsoluta,
  urlDeImagen,
} from "../../lib/contenido";
import { site } from "../../site-config";
import { Copiable, CuentaRegresiva, SelectorDeMonto } from "./interactivo";

/**
 * Campaña express Misión Cuenca 2026.
 *
 * Página propia, no la ficha genérica de contenidos: lleva ruta, presupuesto y
 * evidencia que no caben en párrafos. Aun así depende de su ficha en el panel:
 * si la campaña no está publicada allí, esta ruta responde 404. Publicar y
 * despublicar sigue siendo decisión del panel, no de un despliegue.
 *
 * El avance no se escribe a mano: sale de los aportes acreditados con destino
 * a esta campaña, más lo que se registre en el panel como recaudado fuera de
 * la web.
 */

const SLUG = "mision-cuenca-2026";

// Se genera en cada visita. Prerenderizada, la ruta quedaba fijada como 404
// mientras la ficha fuera borrador, y publicarla en el panel no la habría
// destapado a tiempo. De paso, quien acaba de aportar ve su aporte reflejado
// al recargar.
export const dynamic = "force-dynamic";

/**
 * Datos que aún debe entregar el equipo. Mientras valgan `null`, el bloque
 * correspondiente no se muestra: la página puede publicarse sin ellos y nunca
 * enseña un «[completar]» a un aportante.
 */
const PENDIENTES: {
  viajeros: [string, string] | null;
  transferencia: { banco: string; cuenta: string; cci: string; yape?: string } | null;
  contacto: { nombre: string; whatsapp: string } | null;
  cartaInvitacionUrl: string | null;
} = {
  viajeros: null,
  transferencia: null,
  contacto: null,
  cartaInvitacionUrl: null,
};

// Los montos de la página están en soles: el formulario llega con esa moneda.
const ENLACE_APORTE = `/aportes?type=single&moneda=PEN&destino=${encodeURIComponent(destinoDeCampana(SLUG))}`;
const RANKING = "https://500-mejores.premiosverdes.org/es";

const OCRE = "text-[#c98a12]";

export async function generateMetadata(): Promise<Metadata> {
  const contenido = await obtenerContenido("campaign", SLUG);
  if (!contenido) return { title: "No encontrado" };

  const ruta = `/campanas/${SLUG}`;
  return {
    title: contenido.title,
    description: contenido.summary,
    alternates: { canonical: ruta },
    openGraph: {
      title: contenido.title,
      description: contenido.summary,
      url: urlAbsoluta(ruta),
      type: "article",
      images: contenido.portada ? [urlDeImagen(contenido.portada.url)] : undefined,
    },
  };
}

export default async function MisionCuenca() {
  const [contenido, avance] = await Promise.all([
    obtenerContenido("campaign", SLUG),
    obtenerAvance(SLUG),
  ]);
  if (!contenido) notFound();

  const meta = avance?.meta ?? Number(contenido.goalAmount ?? 8730);
  const recaudado = avance?.recaudado ?? 0;
  const aportantes = avance?.aportantes ?? 0;
  const porcentaje = Math.min(100, Math.round((recaudado / meta) * 100));
  // El cierre es a las 23:59 de Lima del día que marca la ficha.
  const cierre = `${(contenido.endsOn ?? "2026-10-15").slice(0, 10)}T23:59:00-05:00`;

  return (
    <div className="bg-[#f7f5ee] text-[#16231b]">
      {/* ------------------------------------------------------------ Héroe */}
      <header className="relative overflow-hidden bg-verde-bosque pt-10 pb-14 text-[#eef3ea]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -bottom-[40%] size-[520px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(201,138,18,.22),transparent_62%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          <div>
            <Link
              href="/programas/bio-amazonia/proyectos"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b8cdbd] transition hover:text-white"
            >
              <span aria-hidden="true">‹</span> Bio-Amazonía · Proyectos
            </Link>
            <p className={`font-montserrat text-xs font-bold tracking-[.12em] uppercase ${OCRE}`}>
              Campaña express · Programa Bio-Amazonía
            </p>
            <h1 className="mt-3 font-montserrat text-5xl leading-none font-black tracking-tight uppercase md:text-7xl">
              Amazonía <span className={OCRE}>en Cuenca</span>
            </h1>
            <p className="mt-4 max-w-[30ch] font-montserrat text-xl font-semibold md:text-2xl">
              Llevemos a CIBS Pucallpa a Premios Verdes 2026
            </p>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-[#b8cdbd]">
              Un proyecto de Ucayali fue seleccionado entre los 500 mejores
              proyectos socioambientales de América Latina y el Caribe. Del 19 al
              22 de octubre se presenta en Cuenca, Ecuador, ante fondos, banca y
              compradores. Necesitamos tu ayuda para que dos personas lleguen.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categorías y notas finales">
              {[
                "Economía Circular · 89.115",
                "Green Tech · 88.070",
                "Agricultura y Producción de Alimentos · 87.968",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[#eef3ea]/35 px-3 py-1.5 font-montserrat text-xs font-bold tracking-wide"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Avance de la campaña"
            className="rounded-2xl bg-white p-6 text-[#16231b] shadow-[0_18px_50px_rgba(0,0,0,.28)]"
          >
            <p className="font-montserrat text-xs font-bold tracking-[.12em] text-gray-500 uppercase">
              Recaudado
            </p>
            <p className="font-montserrat text-5xl leading-none font-black tabular-nums">
              S/ {recaudado.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-gray-500 tabular-nums">
              de una meta de <strong>S/ {meta.toLocaleString("en-US")}</strong> (USD
              2,425) para 2 personas
            </p>
            <div
              role="progressbar"
              aria-label="Porcentaje de la meta"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={porcentaje}
              className="mt-4 h-3 overflow-hidden rounded-full bg-[#f3e3bf]"
            >
              <div
                className="h-full rounded-full bg-[#c98a12]"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-200 pt-3.5 tabular-nums">
              <div className="min-w-0">
                <strong className="block font-montserrat text-2xl font-extrabold text-verde-bosque">
                  {porcentaje}%
                </strong>
                <span className="block text-xs leading-snug text-gray-500">de la meta</span>
              </div>
              <div className="min-w-0">
                <strong className="block font-montserrat text-2xl font-extrabold text-verde-bosque">
                  {aportantes}
                </strong>
                <span className="block text-xs leading-snug text-gray-500">
                  {aportantes === 1 ? "aporte" : "aportes"}
                </span>
              </div>
              <CuentaRegresiva cierre={cierre} />
            </div>
            <div className="mt-5 grid gap-2.5">
              <Link
                href={`${ENLACE_APORTE}#formulario`}
                className="block rounded-lg bg-[#c98a12] px-5 py-3.5 text-center font-montserrat text-base font-extrabold text-[#1b1304] transition hover:brightness-105"
              >
                Aporta ahora
              </Link>
              <a
                href="#en-especie"
                className="block rounded-lg border-2 border-verde-bosque px-5 py-3 text-center font-montserrat text-base font-bold text-verde-bosque transition hover:bg-[#f3e3bf]"
              >
                Prefiero cubrir un pasaje o alojamiento
              </a>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">
              Pagos seguros por MercadoPago, en soles o dólares. La campaña ya
              queda elegida en el formulario.
            </p>
          </aside>
        </div>
      </header>

      {/* ------------------------------------------------------- Credencial */}
      <div className="border-b border-[#d9dccf] py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-7 gap-y-2 px-5">
          <p className="font-montserrat text-lg font-semibold">
            Seleccionado entre los <strong className="text-verde-bosque">500 mejores</strong>{" "}
            de más de <strong className="text-verde-bosque">3,000 postulaciones</strong>, en
            tres categorías a la vez.
          </p>
          <a
            href={RANKING}
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat text-sm font-bold underline"
          >
            Ver el ranking oficial ↗
          </a>
        </div>
      </div>

      {/* ---------------------------------------------------------- Historia */}
      <Bloque id="historia" antetitulo="La historia" titulo="En la Amazonía, el bosque vale más talado que en pie. Queremos cambiar esa cuenta.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid max-w-[65ch] gap-4 leading-relaxed">
            <p>
              En Ucayali, una familia que cultiva cacao produce entre 300 y 500
              kilos por hectárea. Con ese rendimiento, ampliar la chacra a costa
              del bosque parece la única salida. Y de cada fruto cosechado, la
              mayor parte (cáscara y mucílago) se bota o se quema.
            </p>
            <p>
              A eso se suma un nuevo muro: el Reglamento europeo de productos
              libres de deforestación (UE 2023/1115). Para vender en Europa, cada
              lote debe demostrar de qué parcela viene y que no generó
              deforestación. Sin evidencia digital, el cacao amazónico corre el
              riesgo de quedarse fuera.
            </p>
            <p>
              <strong>
                CIBS Pucallpa nació para que cada parcela, lote, residuo y dato
                demuestre el valor de conservar.
              </strong>{" "}
              Es un hub de innovación en Pucallpa, impulsado por ARS Lab, que
              trabaja en tres frentes.
            </p>
          </div>
          <div className="grid gap-7">
            <DatoGrande valor="300 a 500" texto="kilos de cacao por hectárea: el rendimiento típico que empuja a talar más bosque." />
            <DatoGrande valor="70 a 90%" texto="de la biomasa del fruto de cacao (cáscara y mucílago) se descarta hoy." />
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Economía circular", "Del residuo al producto", "Convertir la cáscara y el mucílago de cacao en productos de mayor valor, como extractos para cosmética y biochar para mejorar los suelos."],
            ["Agricultura y alimentos", "Más por hectárea, sin talar", "Sistemas agroforestales que producen más sin abrir nuevas chacras, con sensores que ayudan a controlar la fermentación del cacao."],
            ["Green Tech", "Un pasaporte para cada lote", "EYWA, una plataforma que funciona sin señal en la selva y genera un pasaporte digital con QR: de qué parcela viene, quién lo produjo y cómo se procesó."],
          ].map(([antetitulo, titulo, texto]) => (
            <article key={titulo} className="min-w-0 border-t-4 border-verde-bosque pt-4">
              <p className="font-montserrat text-xs font-bold tracking-[.12em] text-gray-500 uppercase">
                {antetitulo}
              </p>
              <h3 className="mt-1.5 mb-2 font-montserrat text-xl font-bold">{titulo}</h3>
              <p className="text-[15px] text-gray-600">{texto}</p>
            </article>
          ))}
        </div>
      </Bloque>

      {/* ----------------------------------------------------------- Misión */}
      <Bloque
        id="mision"
        antetitulo="La misión, del 17 al 26 de octubre"
        titulo="El reconocimiento ya llegó. Ahora falta estar ahí."
        bajada="La inscripción a Premios Verdes es gratuita, pero el viaje no. La ruta suma, además, dos presentaciones ante incubadoras universitarias en el camino de regreso."
      >
        <div className="overflow-x-auto pb-2" tabIndex={0} aria-label="Ruta de la misión">
          <ol className="relative grid min-w-[910px] grid-cols-7 before:absolute before:top-[9px] before:right-2 before:left-2 before:h-0.5 before:bg-[repeating-linear-gradient(90deg,#4b5a50_0_6px,transparent_6px_12px)] before:opacity-50">
            {[
              ["16 y 17 oct", "Pucallpa → Lima", "Bus. Llegada a Lima el 17.", false],
              ["18 oct", "Lima → Quito → Cuenca", "Vuelo hacia la sede del evento.", false],
              ["19 al 22 oct", "Cuenca", "Premios Verdes 2026. Taller «500 Mejores» el 21.", true],
              ["23 oct", "Loja", "Presentación en Prendho, incubadora de la UTPL.", true],
              ["24 oct", "Sullana", "Presentación en INCUBA UNF, Universidad Nacional de Frontera.", true],
              ["26 oct", "Piura → Lima", "Vuelo de retorno.", false],
              ["26 oct", "Lima → Pucallpa", "Bus de regreso a casa.", false],
            ].map(([fecha, lugar, que, clave]) => (
              <li key={`${fecha}-${lugar}`} className="relative pt-7 pr-3">
                <span
                  aria-hidden="true"
                  className={`absolute top-0.5 left-0.5 size-4 rounded-full border-[3px] ${
                    clave ? "border-[#c98a12] bg-[#c98a12]" : "border-verde-bosque bg-[#f7f5ee]"
                  }`}
                />
                <p className={`font-montserrat text-xs font-extrabold tracking-wider uppercase ${OCRE}`}>
                  {fecha}
                </p>
                <p className="mt-1 font-montserrat text-lg leading-tight font-extrabold">{lugar}</p>
                <p className="mt-1.5 text-sm leading-snug text-gray-600">{que}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-[#d9dccf] bg-white p-5">
            <p className={`font-montserrat text-xs font-bold tracking-[.12em] uppercase ${OCRE}`}>
              ¿Por qué dos personas?
            </p>
            <h3 className="mt-1 font-montserrat text-xl font-bold">La agenda tiene sesiones en paralelo</h3>
            <p className="mt-2 text-[15px] text-gray-600">
              Una persona cubre el frente técnico (biochar, trazabilidad,
              alianzas científicas) y la otra el comercial y financiero
              (compradores, fondos, banca). Con una sola, se pierde la mitad de
              las conversaciones.
            </p>
          </div>
          <div className="min-w-0 rounded-xl border border-[#d9dccf] bg-white p-5">
            <p className={`font-montserrat text-xs font-bold tracking-[.12em] uppercase ${OCRE}`}>
              Quiénes viajan
            </p>
            <h3 className="mt-1 font-montserrat text-xl font-bold">
              {PENDIENTES.viajeros
                ? `${PENDIENTES.viajeros[0]} y ${PENDIENTES.viajeros[1]}`
                : "Dos representantes del equipo"}
            </h3>
            <p className="mt-2 text-[15px] text-gray-600">
              Responsables del frente técnico y del frente comercial, en
              representación del equipo de CIBS Pucallpa invitado por Premios
              Verdes.
            </p>
          </div>
        </div>
      </Bloque>

      {/* ------------------------------------------------------ Presupuesto */}
      <Bloque
        id="presupuesto"
        antetitulo="En qué se usa tu aporte"
        titulo="S/ 8,730 cubren solo la logística de la misión."
        bajada="No incluye honorarios ni inscripción. Si la meta no se completa, los fondos cubren los rubros en orden de prioridad, empezando por el transporte."
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="border-b border-[#d9dccf] text-left font-montserrat text-xs tracking-wider text-gray-500 uppercase">
                  <th className="px-2.5 py-3">Rubro (2 personas)</th>
                  <th className="px-2.5 py-3 text-right">USD</th>
                  <th className="px-2.5 py-3 text-right">S/</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[
                  ["Transporte: buses y vuelos de toda la ruta", "930", "3,348"],
                  ["Alojamiento, 8 noches", "450", "1,620"],
                  ["Alimentación, 10 días", "444", "1,598"],
                  ["Movilidad local", "200", "720"],
                  ["Seguro de viaje", "80", "288"],
                  ["Materiales de networking", "100", "360"],
                  ["Contingencia (10%)", "221", "796"],
                ].map(([rubro, usd, soles]) => (
                  <tr key={rubro} className="border-b border-[#d9dccf] align-top">
                    <td className="px-2.5 py-3">{rubro}</td>
                    <td className="px-2.5 py-3 text-right whitespace-nowrap">{usd}</td>
                    <td className="px-2.5 py-3 text-right whitespace-nowrap">{soles}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#16231b] font-montserrat text-base font-extrabold">
                  <td className="px-2.5 py-3">Total</td>
                  <td className="px-2.5 py-3 text-right">2,425</td>
                  <td className="px-2.5 py-3 text-right">8,730</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              Montos estimados al 10 de octubre de 2026, con USD 1 = S/ 3.60.
            </p>
          </div>
          <div className="grid content-start gap-3">
            <h3 className="font-montserrat text-xl font-bold">¿Qué logra tu aporte?</h3>
            <SelectorDeMonto
              enlaceBase={ENLACE_APORTE}
              inicial={110}
              opciones={[
                { monto: 35, texto: "Un día de movilidad local de un representante en Cuenca, entre la ciudad y la sede del evento." },
                { monto: 90, texto: "Un día de alimentación en Ecuador de un representante." },
                { monto: 110, texto: "Una noche de alojamiento en Cuenca de un representante." },
                { monto: 145, texto: "El seguro de viaje de un representante durante los 10 días." },
                { monto: 360, texto: "Todos los materiales de networking: dossier bilingüe y tarjetas." },
                { monto: 1010, texto: "El vuelo Lima, Quito, Cuenca de un representante." },
                { monto: 4365, texto: "La misión completa de un representante, del 17 al 26 de octubre." },
              ]}
            />
          </div>
        </div>
      </Bloque>

      {/* ---------------------------------------------------- Cómo aportar */}
      <Bloque id="aportar" antetitulo="Cómo aportar" titulo="Dos caminos, el mismo destino.">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="grid min-w-0 content-start gap-3.5 rounded-2xl border border-[#d9dccf] bg-white p-6">
            <h3 className="font-montserrat text-xl font-bold">1. Aporte en dinero</h3>
            <ol className="grid list-decimal gap-2 pl-5 text-[15px]">
              <li>
                Entra al{" "}
                <Link href={`${ENLACE_APORTE}#formulario`} className="font-semibold underline">
                  formulario de aportes
                </Link>
                : la campaña <strong>Misión Cuenca 2026</strong> ya aparece elegida.
              </li>
              <li>Elige el monto en soles o dólares y paga con MercadoPago.</li>
              {PENDIENTES.transferencia && (
                <li>
                  Si prefieres transferencia o Yape: {PENDIENTES.transferencia.banco} · cuenta{" "}
                  {PENDIENTES.transferencia.cuenta} · CCI {PENDIENTES.transferencia.cci}
                  {PENDIENTES.transferencia.yape ? ` · Yape ${PENDIENTES.transferencia.yape}` : ""}, a
                  nombre de {site.legalName}. Envía tu constancia con el asunto
                  «Misión Cuenca».
                </li>
              )}
            </ol>
          </article>
          <article id="en-especie" className="grid min-w-0 scroll-mt-24 content-start gap-3.5 rounded-2xl border border-[#d9dccf] bg-white p-6">
            <h3 className="font-montserrat text-xl font-bold">2. Cubre un gasto directamente</h3>
            <ul className="grid list-disc gap-2 pl-5 text-[15px]">
              <li><strong>Vuelo de ida</strong> Lima, Quito, Cuenca (18 de octubre).</li>
              <li><strong>Vuelo de retorno</strong> Piura a Lima (26 de octubre, por la mañana).</li>
              <li><strong>Alojamiento</strong> en Cuenca (18 al 22), Piura (24 y 25) o Lima (17).</li>
              <li><strong>Reembolso</strong> de los buses Pucallpa, Lima, Pucallpa, que los jóvenes ya compraron.</li>
            </ul>
            <p className="text-[15px]">Escríbenos antes de comprar para coordinar fechas y datos de los viajeros:</p>
            <Copiable texto={site.email} />
            {PENDIENTES.contacto && (
              <Copiable texto={`${PENDIENTES.contacto.nombre} · WhatsApp ${PENDIENTES.contacto.whatsapp}`} />
            )}
            <p className="text-xs text-gray-500">
              Lo que cubras se descuenta de la meta y se suma a la barra de avance.
            </p>
          </article>
        </div>
      </Bloque>

      {/* ------------------------------------------------------------ Metas */}
      <Bloque id="metas" antetitulo="No es un viaje de representación" titulo="Es una misión con metas, y te contaremos los resultados.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DatoGrande valor="12" texto="contactos calificados con fondos, compradores y aliados" />
          <DatoGrande valor="6" texto="reuniones efectivas durante la misión" />
          <DatoGrande valor="3" texto="oportunidades con un siguiente paso concreto" />
          <DatoGrande valor="2" texto="procesos de piloto o colaboración en evaluación a 30 días" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Hasta el 15 de octubre", "Avance del monto recaudado, al día en esta página."],
            ["Del 17 al 26 de octubre", "Fotos y avances desde Cuenca, Loja y Sullana."],
            ["5 días hábiles después", "Informe de la misión y rendición de gastos con comprobantes."],
            ["A 30 días", "Qué pilotos, alianzas o propuestas siguieron en marcha."],
          ].map(([cuando, que]) => (
            <div key={cuando} className="min-w-0 border-l-2 border-[#c98a12] pl-3.5">
              <b className="block font-montserrat text-[15px]">{cuando}</b>
              <p className="mt-1 text-[15px] text-gray-600">{que}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[70ch] text-xs leading-relaxed text-gray-500">
          Son metas de gestión: no garantizan ventas ni financiamiento, pero sí
          un reporte honesto de lo que se logre. Si sobra dinero, el saldo va al
          programa Bio-Amazonía y se informa en el reporte.
        </p>
      </Bloque>

      {/* -------------------------------------------------------- Evidencia */}
      <Bloque id="evidencia" antetitulo="Verifícalo tú mismo" titulo="La selección es pública.">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="min-w-0 rounded-xl border border-[#d9dccf] bg-white p-5">
            <h3 className="font-montserrat text-xl font-bold">Ranking oficial 2026</h3>
            <p className="mt-2 text-[15px] text-gray-600">
              CIBS Pucallpa aparece en Economía Circular, Green Tech y
              Agricultura y Producción de Alimentos.
            </p>
            <a href={RANKING} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-block font-montserrat text-[15px] font-bold underline">
              500-mejores.premiosverdes.org ↗
            </a>
          </div>
          <div className="min-w-0 rounded-xl border border-[#d9dccf] bg-white p-5">
            <h3 className="font-montserrat text-xl font-bold">Carta de invitación</h3>
            <p className="mt-2 text-[15px] text-gray-600">
              Firmada el 16 de septiembre de 2026 por el presidente de Premios
              Verdes, con invitación nominal al equipo.
            </p>
            {PENDIENTES.cartaInvitacionUrl && (
              <a href={PENDIENTES.cartaInvitacionUrl} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-block font-montserrat text-[15px] font-bold underline">
                Ver la carta ↗
              </a>
            )}
          </div>
          <div className="min-w-0 rounded-xl border border-[#d9dccf] bg-white p-5">
            <h3 className="font-montserrat text-xl font-bold">Notas finales de 88 a 89 sobre 100</h3>
            <p className="mt-2 text-[15px] text-gray-600">
              Evaluado en aplicabilidad, impacto ambiental, social, financiero e
              innovación, con metodología avalada por PwC. Un evaluador lo
              describió como «un enfoque innovador y viable para la economía
              circular en la Amazonía peruana, con un fuerte impacto ambiental y
              social».
            </p>
          </div>
        </div>
      </Bloque>

      {/* ------------------------------------------------------- Preguntas */}
      <Bloque id="preguntas" antetitulo="Preguntas frecuentes" titulo="Lo que nos suelen preguntar">
        <div className="max-w-3xl">
          {[
            ["¿CIBS Pucallpa ganó un premio?", "Fue seleccionado entre los 500 mejores proyectos socioambientales de Premios Verdes 2026. Los finalistas y ganadores se anuncian en el evento."],
            ["¿Qué relación hay entre RaícesCare y CIBS Pucallpa?", "RaícesCare es una asociación sin fines de lucro con sede en Pucallpa que impulsa proyectos de bioeconomía amazónica en su programa Bio-Amazonía. CIBS Pucallpa es un hub de innovación impulsado por ARS Lab. RaícesCare recibe y administra los aportes de esta campaña y rinde cuentas de su uso."],
            ["¿Por qué no participan de forma virtual?", "El taller exclusivo para los 500 seleccionados, las reuniones bilaterales y las conversaciones con compradores y fondos solo ocurren en persona."],
            ["¿Qué pasa si no se llega a la meta?", "Lo recaudado cubre los rubros en orden de prioridad, empezando por el transporte. Si el viaje no llegara a realizarse, el aporte se devuelve a quien lo pida o se destina al programa Bio-Amazonía, según elija cada aportante."],
            ["¿Mi aporte es deducible de impuestos?", "Por ahora RaícesCare no emite certificados de donación deducibles. Si necesitas un comprobante, escríbenos y te indicamos qué podemos emitir."],
            ["¿Puedo aportar desde fuera del Perú?", "Sí. El formulario de aportes acepta dólares por MercadoPago, y también puedes cubrir directamente un vuelo o alojamiento."],
          ].map(([pregunta, respuesta]) => (
            <details key={pregunta} className="group border-b border-[#d9dccf] py-4">
              <summary className="flex cursor-pointer list-none justify-between gap-4 font-montserrat text-lg font-bold [&::-webkit-details-marker]:hidden">
                {pregunta}
                <span aria-hidden="true" className={`font-extrabold ${OCRE} group-open:hidden`}>+</span>
                <span aria-hidden="true" className={`hidden font-extrabold ${OCRE} group-open:inline`}>−</span>
              </summary>
              <p className="mt-2.5 max-w-[65ch] text-gray-600">{respuesta}</p>
            </details>
          ))}
        </div>
      </Bloque>

      {/* ----------------------------------------------------------- Cierre */}
      <section className="bg-verde-bosque py-14 text-[#eef3ea]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 lg:grid-cols-[1.4fr_1fr]">
          <blockquote className="text-2xl leading-snug md:text-3xl">
            «Del campo al dato. Del dato a la confianza. De la confianza al mercado.»
          </blockquote>
          <div className="grid gap-2.5">
            <Link
              href={`${ENLACE_APORTE}#formulario`}
              className="block rounded-lg bg-[#c98a12] px-5 py-3.5 text-center font-montserrat text-base font-extrabold text-[#1b1304] transition hover:brightness-105"
            >
              Aporta ahora
            </Link>
            <a
              href="#en-especie"
              className="block rounded-lg border-2 border-[#b8cdbd] px-5 py-3 text-center font-montserrat text-base font-bold transition hover:bg-[#0b4d27]"
            >
              Cubrir un pasaje o alojamiento
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl px-5 text-sm text-[#b8cdbd]">
          Campaña abierta hasta el jueves 15 de octubre de 2026, 23:59 (hora de Lima).
        </p>
      </section>
    </div>
  );
}

function Bloque({
  id,
  antetitulo,
  titulo,
  bajada,
  children,
}: {
  id: string;
  antetitulo: string;
  titulo: string;
  bajada?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-[#d9dccf] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 grid max-w-3xl gap-2.5">
          <p className={`font-montserrat text-xs font-bold tracking-[.12em] uppercase ${OCRE}`}>
            {antetitulo}
          </p>
          <h2 className="font-montserrat text-3xl leading-tight font-extrabold text-balance md:text-4xl">
            {titulo}
          </h2>
          {bajada && <p className="max-w-[65ch] text-gray-600">{bajada}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function DatoGrande({ valor, texto }: { valor: string; texto: string }) {
  return (
    <div className="min-w-0">
      <p className="font-montserrat text-5xl leading-none font-black text-verde-bosque tabular-nums md:text-6xl">
        {valor}
      </p>
      <p className="mt-1.5 max-w-[38ch] text-[15px] text-gray-600">{texto}</p>
    </div>
  );
}
