# Aventuras interactivas

Aventuras educativas en HTML para incrustar en Genially (escenario 16:9) y abrir en celular.
Autor: profesor; todo el contenido y el código se escriben en español.

## Estructura
- `index.html` — portada con la lista de aventuras.
- `castillo-de-cristal/` — aventura original (no tocar hasta que el Mac suba sus cambios pendientes).
- `laboratorio/` — copias para mejorar el sistema; plan en `laboratorio/EVALUACION.md`.
- `prueba/` — mini aventura de prueba.
- `pruebas/recorrido.cjs` — juega una aventura completa en Chromium (16:9 e iPhone) y reporta fallas.

## Convenciones
- Un archivo `index.html` por aventura, con imágenes `.webp` en `img/`.
- Escenas: `<section class="esc" id="eN">`; navegación con `data-ir="eN"`.
- Paleta: oro `#E8A33D`, oro claro `#FFD27A`, tinta `#140F2B`, papel `#FFF6E8`, hielo `#BFEFFF`.
- Fuentes: Cormorant Garamond (títulos) y Source Sans 3 (texto). Animaciones con GSAP 3.12.5 (CDN).
- Respetar `prefers-reduced-motion`.

## Verificar antes de subir
`node pruebas/recorrido.cjs [carpeta]` — debe terminar en "TODO BIEN".
Sin internet en la prueba: GSAP se sirve desde `pruebas/vendor/`, las fuentes se omiten.
Capturas en `pruebas/capturas/` (no se suben).

## Trabajo
- Cuidar el consumo: sin agentes en paralelo, leer solo lo necesario, mirar capturas solo en puntos de control.
- Un commit por paso; respuestas cortas al usuario.
