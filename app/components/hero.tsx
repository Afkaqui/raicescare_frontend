import Image from "next/image";
import { BoltIcon, BriefcaseIcon, ShieldCheckIcon, UsersIcon } from "./icons";

/**
 * Auditoría de textos (Ventana 3): mientras no exista evidencia pública con
 * periodo, fuente y estado de verificación, los indicadores describen el
 * estado institucional en lugar de cifras de impacto.
 */
const estados = [
  {
    Icon: UsersIcon,
    titulo: "Programas en estructuración",
    detalle: "Asistencia, educación, sostenibilidad y cooperación",
  },
  {
    Icon: ShieldCheckIcon,
    titulo: "Trazabilidad en implementación",
    detalle: "Registro progresivo de fondos, actividades y evidencias",
  },
  {
    Icon: BoltIcon,
    titulo: "Alianzas en desarrollo",
    detalle: "Vinculación con organizaciones, empresas y especialistas",
  },
  {
    Icon: BriefcaseIcon,
    titulo: "Red de colaboración",
    detalle: "Voluntariado y apoyo profesional según convocatoria",
  },
];

export function Hero() {
  return (
    <>
      <section
        id="inicio"
        className="relative flex flex-col items-center justify-center px-6 py-32 text-center text-white md:px-12"
      >
        <Image
          src="/hero-amazonia.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-verde-bosque/45 via-verde-bosque/50 to-verde-bosque/65"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center">
          <h1 className="mb-6 max-w-5xl font-montserrat text-4xl leading-tight font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
            Ciencia, cuidado y cooperación para la Amazonía y el Perú
          </h1>
          <p className="mb-10 max-w-3xl text-lg font-medium text-gray-100 drop-shadow-md md:text-xl">
            En RaícesCare articulamos asistencia social, educación,
            investigación aplicada y cooperación institucional para desarrollar
            iniciativas orientadas al bienestar de las comunidades y al cuidado
            de los ecosistemas amazónicos.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#programas"
              className="rounded-lg border-2 border-white bg-black/20 px-8 py-3 text-center font-semibold backdrop-blur-sm transition-colors hover:bg-white hover:text-verde-bosque"
            >
              Conoce nuestros programas
            </a>
            <a
              href="#donar"
              className="rounded-lg bg-verde-hoja px-8 py-3 text-center font-semibold text-white shadow-lg transition-colors hover:bg-verde-bosque"
            >
              Donar ahora
            </a>
          </div>
        </div>
      </section>

      <section
        className="relative z-10 border-b-4 border-verde-hoja bg-azul-confianza px-6 py-10 text-white shadow-xl md:px-12"
        aria-label="Estado actual de la organización"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 divide-y divide-white/20 text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {estados.map(({ Icon, titulo, detalle }) => (
            <div key={titulo} className="flex flex-col items-center px-4 py-2">
              <Icon className="mb-3 h-9 w-9 text-verde-hoja opacity-80" />
              <p className="mb-1 font-montserrat text-lg font-bold text-verde-hoja">
                {titulo}
              </p>
              <p className="text-sm text-gray-300">{detalle}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
