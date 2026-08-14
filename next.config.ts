import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad.
 *
 * El sitio solo emitía HSTS. Estas cuatro cubren ataques que no dependen de un
 * fallo nuestro sino de cómo interpreta el navegador lo que servimos.
 *
 * Falta una Content-Security-Policy, que es la más valiosa y también la que
 * puede romper la página si se pone a ciegas: Next inyecta scripts en línea
 * para hidratar, así que exige nonces por middleware. Queda pendiente aparte
 * para poder probarla con calma.
 */
const cabecerasDeSeguridad = [
  {
    // Impide que el sitio se cargue dentro de un iframe ajeno, que es como se
    // engaña a alguien para que pulse algo que no ve.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // El navegador respeta el tipo que declaramos en vez de adivinarlo. Importa
    // sobre todo en las imágenes subidas desde el panel.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Al salir hacia otro dominio se envía el origen, nunca la ruta completa:
    // una URL de seguimiento no debe filtrarse en el referer de un enlace.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // No usamos cámara, micrófono ni ubicación; se declara para que ningún
    // script incrustado pueda pedirlos.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: cabecerasDeSeguridad }];
  },
};

export default nextConfig;
