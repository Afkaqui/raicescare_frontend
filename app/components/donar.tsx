"use client";

import Image from "next/image";
import { useState } from "react";
import { contactHref, site } from "../site-config";
import { LockIcon, RefreshIcon, BoltIcon } from "./icons";

type PlanProps = {
  imagen: string;
  alt: string;
  Icon: typeof BoltIcon;
  iconColor: string;
  titulo: string;
  campania: string;
  descripcion: string;
  montos: number[];
  bordeSuperior: string;
  montoActivo: string;
  montoHover: string;
  botonEstilo: string;
  botonLabel: string;
  asunto: (monto: number) => string;
};

const planes: PlanProps[] = [
  {
    imagen: "/donaciones/pieza-mensual.png",
    alt: "Aporte mensual, programa Sembrador de Futuro: manos sosteniendo un brote de árbol en tierra fértil",
    Icon: RefreshIcon,
    iconColor: "text-verde-hoja",
    titulo: "Aporte mensual",
    campania: "Programa Sembrador de Futuro",
    descripcion:
      "Contribuye periódicamente al sostenimiento de programas y actividades institucionales. Podrás consultar las condiciones del aporte, modificarlo o solicitar su cancelación según el medio de pago habilitado.",
    montos: [30, 50, 100],
    bordeSuperior: "border-verde-hoja",
    montoActivo: "bg-verde-hoja text-white",
    montoHover: "hover:bg-verde-hoja hover:text-white",
    botonEstilo: "bg-verde-hoja hover:bg-verde-bosque",
    botonLabel: "Realizar un aporte mensual",
    asunto: (monto) => `Aporte mensual de S/ ${monto}`,
  },
  {
    imagen: "/donaciones/pieza-unica.png",
    alt: "Aporte único para campañas y proyectos: manos sosteniendo un brote de árbol sobre la selva amazónica",
    Icon: BoltIcon,
    iconColor: "text-tierra-amazonica",
    titulo: "Aporte único",
    campania: "Apoyo para campañas y proyectos",
    descripcion:
      "Elige un monto y selecciona la campaña o línea de acción que deseas apoyar. Cuando no se indique una finalidad específica, el aporte se asignará según las prioridades institucionales informadas.",
    montos: [50, 200, 500],
    bordeSuperior: "border-azul-confianza",
    montoActivo: "bg-azul-confianza text-white",
    montoHover: "hover:bg-azul-confianza hover:text-white",
    botonEstilo: "bg-azul-confianza hover:bg-azul-confianza/90",
    botonLabel: "Realizar un aporte",
    asunto: (monto) => `Aporte único de S/ ${monto}`,
  },
];

function PlanAporte(plan: PlanProps) {
  const [monto, setMonto] = useState(plan.montos[1]);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border-t-8 bg-white text-center text-gray-800 shadow-2xl md:-translate-y-2 ${plan.bordeSuperior}`}
    >
      <Image
        src={plan.imagen}
        alt={plan.alt}
        width={1448}
        height={1086}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="h-auto w-full"
      />

      <div className="flex flex-1 flex-col p-8">
      <div className="mb-2 flex items-center justify-center gap-2 text-azul-confianza">
        <plan.Icon className={`h-6 w-6 ${plan.iconColor}`} />
        <h3 className="font-montserrat text-2xl font-bold">{plan.titulo}</h3>
      </div>
      <p className="mb-4 text-sm font-semibold tracking-wide text-verde-bosque uppercase">
        {plan.campania}
      </p>
      <p className="mb-8 text-sm leading-relaxed text-gray-600">
        {plan.descripcion}
      </p>

      <fieldset className="mb-8">
        <legend className="sr-only">
          Elige tu monto para el {plan.titulo.toLowerCase()}
        </legend>
        <div className="flex justify-center gap-3">
          {plan.montos.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setMonto(valor)}
              aria-pressed={monto === valor}
              className={`w-24 rounded-lg px-6 py-3 font-bold shadow-sm transition ${
                monto === valor
                  ? plan.montoActivo
                  : `bg-gris-niebla text-azul-confianza ${plan.montoHover}`
              }`}
            >
              S/ {valor}
            </button>
          ))}
        </div>
      </fieldset>

      <a
        href={contactHref(plan.asunto(monto))}
        className={`mt-auto block w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition ${plan.botonEstilo}`}
      >
        {plan.botonLabel}
      </a>
      </div>
    </div>
  );
}

export function Donar() {
  return (
    <section
      id="donar"
      className="relative border-t-8 border-azul-confianza bg-verde-bosque px-6 py-20 text-white md:px-12"
    >
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <h2 className="mb-4 font-montserrat text-4xl font-bold drop-shadow-md md:text-5xl">
          Apoya nuestras iniciativas
        </h2>
        <p className="text-xl font-light text-gray-200">
          Tu contribución puede ayudarnos a desarrollar actividades sociales,
          educativas y ambientales conforme a los proyectos y campañas vigentes.
        </p>
        <p className="mt-4 text-gray-300">
          Antes de realizar un aporte podrás conocer su finalidad, modalidad de
          uso y condiciones de seguimiento. La constancia correspondiente será
          emitida de acuerdo con el medio de pago y la normativa aplicable.
        </p>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {planes.map((plan) => (
          <PlanAporte key={plan.titulo} {...plan} />
        ))}
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-6 text-sm text-gray-200 md:flex-row">
        <span className="shrink-0 rounded-lg bg-white/20 p-3">
          <LockIcon className="h-8 w-8 text-yellow-400" />
        </span>
        <div>
          <h3 className="mb-2 font-montserrat text-lg font-bold text-white">
            Información sobre los aportes y privacidad
          </h3>
          <p className="mb-3 leading-relaxed">
            {site.legalName} registra las contribuciones recibidas y aplica
            controles documentales conforme a sus procedimientos internos y a
            las obligaciones legales aplicables. Partida Registral N.°{" "}
            {site.partidaRegistral} · RUC N.° {site.ruc}.
          </p>
          <p className="leading-relaxed text-gray-300">
            Los datos personales serán tratados únicamente para gestionar el
            aporte, cumplir obligaciones administrativas y enviar comunicaciones
            autorizadas, conforme a la Ley peruana de Protección de Datos
            Personales. Puedes solicitar nuestra{" "}
            <a
              href={contactHref("Solicito la Política de Privacidad")}
              className="font-semibold text-white underline underline-offset-2"
            >
              Política de Privacidad
            </a>
            . Para coordinar cuentas institucionales, escríbenos al{" "}
            <a
              href={contactHref("Consulta sobre medios de aporte")}
              className="font-semibold text-white underline underline-offset-2"
            >
              correo oficial
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
