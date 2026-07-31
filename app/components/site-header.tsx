"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks } from "../site-config";
import { CloseIcon, HeartIcon, MenuIcon } from "./icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:px-12">
        <a
          href="#inicio"
          className="flex items-center gap-3"
          aria-label="RaícesCare ONGD, ir al inicio"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-emblema.png"
            alt=""
            width={512}
            height={512}
            priority
            className="h-11 w-11 object-contain md:h-14 md:w-14"
          />
          <span className="leading-none">
            <span className="font-montserrat text-xl font-bold md:text-2xl">
              <span className="text-verde-bosque">Raíces</span>
              <span className="text-azul-confianza">Care</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold tracking-[0.14em] text-azul-confianza/70 md:block">
              CIENCIA, CUIDADO Y COMUNIDAD
            </span>
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-6 text-sm font-semibold text-azul-confianza">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-verde-hoja"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#donar"
                className="inline-flex items-center gap-2 rounded-lg bg-verde-hoja px-5 py-2.5 text-white shadow-md transition-colors hover:bg-verde-bosque"
              >
                <HeartIcon /> DONA AQUÍ
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="text-verde-bosque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-hoja lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
        >
          {open ? <CloseIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-movil"
          className="border-t border-gris-niebla bg-white shadow-lg lg:hidden"
          aria-label="Navegación principal (móvil)"
        >
          <ul className="flex flex-col py-4 text-center font-semibold text-azul-confianza">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 hover:bg-gris-niebla"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#donar"
                className="flex items-center justify-center gap-2 py-3 text-verde-hoja"
                onClick={() => setOpen(false)}
              >
                <HeartIcon /> DONA AQUÍ
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
