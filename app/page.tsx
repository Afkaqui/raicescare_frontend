import { Alianzas } from "./components/alianzas";
import { DatosEstructurados } from "./components/datos-estructurados";
import { Donar } from "./components/donar";
import { Hero } from "./components/hero";
import { Nosotros } from "./components/nosotros";
import { Programas } from "./components/programas";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { Sumate } from "./components/sumate";
import { Transparencia } from "./components/transparencia";

export default function Home() {
  return (
    <>
      <DatosEstructurados />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Nosotros />
        <Programas />
        <Alianzas />
        <Transparencia />
        <Donar />
        <Sumate />
      </main>
      <SiteFooter />
    </>
  );
}
