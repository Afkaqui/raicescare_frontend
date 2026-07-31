"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export type Diapositiva = {
  src: string;
  alt: string;
};

type CarruselProps = {
  diapositivas: Diapositiva[];
  etiqueta: string;
  /** Milisegundos entre cambios automáticos. */
  intervalo?: number;
};

export function Carrusel({
  diapositivas,
  etiqueta,
  intervalo = 6000,
}: CarruselProps) {
  const total = diapositivas.length;
  const [actual, setActual] = useState(0);
  const [enPausa, setEnPausa] = useState(false);

  const ir = useCallback(
    (indice: number) => setActual((indice + total) % total),
    [total],
  );

  useEffect(() => {
    if (enPausa || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActual((indice) => (indice + 1) % total),
      intervalo,
    );
    return () => window.clearInterval(id);
  }, [enPausa, intervalo, total]);

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
      className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg sm:aspect-16/9 lg:aspect-21/9"
      onMouseEnter={() => setEnPausa(true)}
      onMouseLeave={() => setEnPausa(false)}
      onFocusCapture={() => setEnPausa(true)}
      onBlurCapture={() => setEnPausa(false)}
      onKeyDown={(evento) => {
        if (evento.key === "ArrowLeft") ir(actual - 1);
        if (evento.key === "ArrowRight") ir(actual + 1);
      }}
    >
      {diapositivas.map((diapositiva, indice) => (
        <div
          key={diapositiva.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            indice === actual ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={indice !== actual}
        >
          <Image
            src={diapositiva.src}
            alt={diapositiva.alt}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover object-[center_40%]"
            priority={indice === 0}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => ir(actual - 1)}
        aria-label="Imagen anterior"
        className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-verde-bosque shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-hoja md:left-5"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => ir(actual + 1)}
        aria-label="Imagen siguiente"
        className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-verde-bosque shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-hoja md:right-5"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2.5">
        {diapositivas.map((diapositiva, indice) => (
          <button
            key={diapositiva.src}
            type="button"
            onClick={() => ir(indice)}
            aria-label={`Ver imagen ${indice + 1} de ${total}`}
            aria-current={indice === actual}
            className={`h-2.5 rounded-full shadow transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              indice === actual
                ? "w-7 bg-verde-hoja"
                : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
