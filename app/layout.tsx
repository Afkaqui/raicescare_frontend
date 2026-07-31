import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { site } from "./site-config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} | Ciencia, Cuidado y Comunidad`,
  description:
    "En RaícesCare ONGD unimos la investigación ambiental, la trazabilidad digital y la asistencia humanitaria para regenerar ecosistemas vulnerables y transformar vidas desde la selva peruana.",
  keywords: [
    "ONGD Perú",
    "Amazonía",
    "Ucayali",
    "trazabilidad digital",
    "responsabilidad social corporativa",
    "donaciones",
  ],
  openGraph: {
    title: `${site.name} | Ciencia, Cuidado y Comunidad`,
    description:
      "Bio-Inteligencia, ciencia y comunidad para la Amazonía y el Perú. Impacto verificable y trazabilidad digital de cada donación.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
