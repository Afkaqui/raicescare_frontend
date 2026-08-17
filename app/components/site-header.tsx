"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../site-config";
import { EnlaceCuenta } from "./cuenta/enlace-cuenta";
import { UniversalCta } from "./cta/universal-cta";
import { CloseIcon, MenuIcon } from "./icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="RaícesCare, ir al inicio"
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
        </Link>

        <nav className="hidden lg:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-6 text-sm font-semibold text-azul-confianza">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-verde-hoja"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <EnlaceCuenta />
            </li>
            {/* Separado del resto: el botón de donar es la acción principal y
                no debe leerse como un elemento más de la navegación. */}
            <li className="ml-2">
              <UniversalCta
                code="DONATE_ENTRY"
                location="header"
                campaign="general"
                className="px-5 py-2.5"
              />
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
          {open ? (
            <CloseIcon className="h-8 w-8" />
          ) : (
            <MenuIcon className="h-8 w-8" />
          )}
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
                <Link
                  href={link.href}
                  className="block py-3 hover:bg-gris-niebla"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <EnlaceCuenta compacto />
            </li>
            <li className="mt-2 border-t border-gris-niebla px-6 pt-4">
              <UniversalCta
                code="DONATE_ENTRY"
                location="header"
                campaign="general"
                fullWidth
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
