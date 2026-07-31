import Image from "next/image";
import { BoltIcon, BriefcaseIcon, ShieldCheckIcon, UsersIcon } from "./icons";

const metricas = [
  { Icon: UsersIcon, valor: "+1,200", etiqueta: "Familias atendidas" },
  { Icon: ShieldCheckIcon, valor: "100%", etiqueta: "Trazabilidad digital" },
  { Icon: BoltIcon, valor: "+15", etiqueta: "Alianzas corporativas" },
  { Icon: BriefcaseIcon, valor: "+80", etiqueta: "Voluntarios en campo" },
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
          className="absolute inset-0 bg-linear-to-b from-verde-bosque/85 to-verde-bosque/90"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center">
          <h1 className="mb-6 max-w-5xl font-montserrat text-4xl leading-tight font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
            Bio-Inteligencia, Ciencia y Comunidad para la Amazonía y el Perú
          </h1>
          <p className="mb-10 max-w-3xl text-lg font-medium text-gray-100 drop-shadow-md md:text-xl">
            En RaícesCare ONGD unimos la investigación ambiental, la
            trazabilidad digital y la asistencia humanitaria para regenerar
            ecosistemas vulnerables y transformar vidas desde la selva peruana.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#programas"
              className="rounded-lg border-2 border-white bg-black/20 px-8 py-3 text-center font-semibold backdrop-blur-sm transition-colors hover:bg-white hover:text-verde-bosque"
            >
              Conoce Nuestros Programas
            </a>
            <a
              href="#donar"
              className="rounded-lg bg-verde-hoja px-8 py-3 text-center font-semibold text-white shadow-lg transition-colors hover:bg-verde-bosque"
            >
              Dona Ahora / Impacto Directo
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b-4 border-verde-hoja bg-azul-confianza px-6 py-10 text-white shadow-xl md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 divide-y divide-white/20 text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {metricas.map(({ Icon, valor, etiqueta }) => (
            <div key={etiqueta} className="flex flex-col items-center py-2">
              <Icon className="mb-2 h-10 w-10 text-verde-hoja opacity-80" />
              <p className="mb-1 font-montserrat text-4xl font-bold text-verde-hoja">
                {valor}
              </p>
              <p className="text-sm font-semibold text-gray-300">{etiqueta}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
