import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "./site-config";

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

const titulo = `${site.name} | Ciencia, Cuidado y Comunidad para la Amazonía`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titulo,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  category: "nonprofit",
  keywords: [
    "RaícesCare",
    "ONGD Perú",
    "ONG Amazonía",
    "Ucayali",
    "Pucallpa",
    "donaciones Perú",
    "trazabilidad digital de donaciones",
    "responsabilidad social corporativa",
    "ESG Perú",
    "voluntariado Amazonía",
    "cooperación técnica internacional",
    "reforestación",
  ],
  authors: [{ name: site.legalName, url: siteUrl }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: titulo,
    description: site.description,
    locale: "es_PE",
    countryName: "Perú",
    emails: [site.email],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "RaícesCare",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  // Descomenta y coloca los códigos al verificar el dominio.
  // verification: { google: "...", other: { "facebook-domain-verification": "..." } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#03391a" },
    { media: "(prefers-color-scheme: dark)", color: "#03391a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-PE"
      className={`${montserrat.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
