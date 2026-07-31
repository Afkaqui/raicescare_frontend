"use client";

import Image from "next/image";
import { useState } from "react";
import { contactHref, site } from "../site-config";
import { BoltIcon, LockIcon, RefreshIcon } from "./icons";

type PlanProps = {
  imagen: string;
  alt: string;
  Icon: typeof BoltIcon;
  iconColor: string;
  titulo: string;
  lema: string;
  lemaColor: string;
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
    imagen: "/donaciones/plan-mensual.png",
    alt: "Manos sosteniendo un brote de árbol en tierra fértil",
    Icon: RefreshIcon,
    iconColor: "text-verde-hoja",
    titulo: "SOCIO RECURRENTE",
    lema: "«Sembrador de Futuro»",
    lemaColor: "text-verde-bosque",
    descripcion: "Aporte mensual automatizado de alto impacto.",
    montos: [30, 50, 100],
    bordeSuperior: "border-verde-hoja",
    montoActivo: "bg-verde-hoja text-white",
    montoHover: "hover:bg-verde-hoja hover:text-white",
    botonEstilo: "bg-verde-hoja hover:bg-verde-bosque",
    botonLabel: "Suscribirme Ahora",
    asunto: (monto) => `Quiero ser Socio Recurrente: S/ ${monto} mensuales`,
  },
  {
    imagen: "/donaciones/aporte-unico.png",
    alt: "Manos sosteniendo un brote de árbol sobre la selva amazónica",
    Icon: BoltIcon,
    iconColor: "text-tierra-amazonica",
    titulo: "DONACIÓN ÚNICA",
    lema: "«Aporte Inmediato de Impacto»",
    lemaColor: "text-tierra-amazonica",
    descripcion: "Tú eliges el monto a aportar para emergencias.",
    montos: [50, 200, 500],
    bordeSuperior: "border-azul-confianza",
    montoActivo: "bg-azul-confianza text-white",
    montoHover: "hover:bg-azul-confianza hover:text-white",
    botonEstilo: "bg-azul-confianza hover:bg-azul-confianza/90",
    botonLabel: "Donar con Tarjeta o Yape",
    asunto: (monto) => `Donación única de S/ ${monto}`,
  },
];

function PlanDonacion(plan: PlanProps) {
  const [monto, setMonto] = useState(plan.montos[1]);

  return (
    <div
      className={`overflow-hidden rounded-2xl border-t-8 bg-white text-center text-gray-800 shadow-2xl md:-translate-y-2 ${plan.bordeSuperior}`}
    >
      <div className="relative h-56 w-full">
        <Image
          src={plan.imagen}
          alt={plan.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="p-8">
        <div className="mb-2 flex items-center justify-center gap-2 text-azul-confianza">
          <plan.Icon className={`h-6 w-6 ${plan.iconColor}`} />
          <h3 className="font-montserrat text-2xl font-bold">{plan.titulo}</h3>
        </div>
        <p className={`mb-2 text-xl font-semibold ${plan.lemaColor}`}>
          {plan.lema}
        </p>
        <p className="mb-8 text-sm text-gray-500">{plan.descripcion}</p>

        <fieldset className="mb-8">
          <legend className="sr-only">
            Elige tu monto para {plan.titulo.toLowerCase()}
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
          className={`block w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition ${plan.botonEstilo}`}
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
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <h2 className="mb-4 font-montserrat text-4xl font-bold drop-shadow-md md:text-5xl">
          Tu aporte regenera la Amazonía y transforma vidas hoy
        </h2>
        <p className="text-xl font-light text-gray-300">
          Haz una donación segura. Recibe automáticamente tu comprobante de
          donación y el reporte de trazabilidad digital.
        </p>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {planes.map((plan) => (
          <PlanDonacion key={plan.titulo} {...plan} />
        ))}
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-6 text-sm text-gray-200 md:flex-row">
        <span className="shrink-0 rounded-lg bg-white/20 p-3">
          <LockIcon className="h-8 w-8 text-yellow-400" />
        </span>
        <div>
          <p className="mb-2">
            <strong className="text-white">
              Cuentas Institucionales Directas (BCP / BBVA / Interbank):
            </strong>{" "}
            Solicitar números de cuenta y CCI al{" "}
            <a
              href={contactHref("Solicito cuentas institucionales y CCI")}
              className="font-semibold text-white underline underline-offset-2"
            >
              correo oficial
            </a>
            .
          </p>
          <p className="text-justify leading-relaxed text-gray-300 md:text-left">
            <strong className="text-white">Garantía RaícesCare:</strong>{" "}
            {site.legalName} es una ONGD sin fines de lucro debidamente inscrita
            en SUNARP (Sede Pucallpa/Lima) bajo la Partida Registral N°{" "}
            {site.partidaRegistral} y RUC {site.ruc}. Todas las donaciones
            cuentan con la protección de nuestro Sistema de Prevención de Lavado
            de Activos y Trazabilidad Digital (Art. 59°-61° de Estatutos). Tus
            datos están encriptados y protegidos.
          </p>
        </div>
      </div>
    </section>
  );
}
