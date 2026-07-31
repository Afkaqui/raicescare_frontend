# RaícesCare ONGD — Web institucional

Landing institucional de la Asociación RaícesCare (ONGD), construida con Next.js 16
(App Router) y Tailwind CSS 4. Implementa la propuesta `ra_cescare_oficial v4.html`
con los textos aprobados (`Textos de la Web RaícesCare`) y el multimedia de
`DIRECCIONV3`.

## Desarrollo

```bash
npm run dev
```

Otros comandos: `npm run build`, `npm start`, `npm run lint`.

> **Antes de desplegar:** copia `.env.example` a `.env` y ajusta
> `NEXT_PUBLIC_SITE_URL` al dominio real. De esa variable dependen la URL
> canónica, `sitemap.xml`, `robots.txt` y las imágenes de Open Graph.

## SEO, iconos y compartición

- `app/layout.tsx` — `metadata` (título con plantilla, descripción, keywords,
  canónica, Open Graph, Twitter Card, `robots`/`googlebot`, `appleWebApp`) y
  `viewport` (`themeColor`, `colorScheme`).
- `app/sitemap.ts` → `/sitemap.xml`, con la portada (más sus imágenes) y los PDFs
  institucionales.
- `app/robots.ts` → `/robots.txt`, con `Sitemap:` y `Host:`.
- `app/manifest.ts` → `/manifest.webmanifest` (PWA instalable).
- `app/components/datos-estructurados.tsx` — JSON-LD schema.org (`NGO` +
  `WebSite`) con RUC, partida registral, ambas sedes y LinkedIn.
- Iconos: `app/favicon.ico` (16/32/48), `app/icon.png` (512), `app/apple-icon.png`
  (180) y `public/icons/` (192, 512 y 512 *maskable* para Android).
- Compartición: `app/opengraph-image.png` y `app/twitter-image.png` (1200×630).

Los códigos de verificación de Google Search Console o Meta van en el campo
`verification` de `app/layout.tsx` (está comentado con un ejemplo).

## Estructura

- `app/layout.tsx` — fuentes oficiales (Montserrat + Source Sans 3), metadatos y `lang="es"`.
- `app/globals.css` — paleta de marca como tokens de Tailwind (`verde-bosque`,
  `verde-hoja`, `azul-confianza`, `tierra-amazonica`, `gris-niebla`, `gris-pizarra`).
- `app/site-config.ts` — datos institucionales (correo, RUC, partida registral, menú)
  y `contactHref()` para los enlaces de contacto con asunto.
- `app/components/` — una sección por archivo: `hero`, `nosotros`, `programas`,
  `alianzas`, `transparencia`, `donar`, `sumate`, más `site-header` y `site-footer`.
  Solo `site-header` (menú móvil) y `donar` (selección de monto) son componentes cliente.

## Multimedia

Las piezas de `DIRECCIONV3` son banners con texto incrustado; en `public/` se guardan
únicamente las fotografías recortadas de cada banner, para no duplicar los textos que
ya están en HTML:

- `public/programas/`, `public/alianzas/`, `public/donaciones/`, `public/sumate/`,
  `public/legal/`, `public/equipo/`.
- `public/documentos/` — PDFs públicos enlazados desde Transparencia (certificado
  literal SUNARP, ficha RUC, escritura pública).

## Pendientes de integración

Los CTA de donación, el histórico de fondos y la memoria anual apuntan hoy al correo
institucional: falta conectar la pasarela de pagos (Yape/Plin, tarjeta, PayPal) y el
módulo de trazabilidad con el backend.
