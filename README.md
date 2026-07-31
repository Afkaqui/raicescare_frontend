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
