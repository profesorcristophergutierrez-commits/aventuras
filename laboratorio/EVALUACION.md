# Evaluación del sistema de aventuras

Copia de trabajo: `laboratorio/castillo-v2/` (duplicado de `castillo-de-cristal/`).
El original no se toca; las mejoras se prueban aquí.

## Cómo está hecho hoy

Todo vive en un solo `index.html` de 361 líneas: estilos, motor (navegación,
transiciones, progreso) y contenido (textos, escenas, posiciones) mezclados.
Para hacer una aventura nueva hay que copiar el archivo entero y reescribirlo.

## Problemas encontrados

| # | Problema | Impacto |
|---|----------|---------|
| 1 | Motor y contenido en el mismo archivo | Cada aventura nueva repite ~250 líneas de código; un arreglo hay que hacerlo en todas |
| 2 | Texto escalado para 16:9 (`font-size: min(1vw, 1.78vh)`) | En un iPhone vertical el texto base mide ~4 px: ilegible fuera de Genially |
| 3 | Paneles con posición fija en % (`left:58%; top:18%`) | En pantallas verticales se encimen o se salen |
| 4 | Posiciones y estilos escritos dentro del HTML (`style="..."`) | Difícil de mantener y de reutilizar |
| 5 | El fuego (escena 6) solo se puede arrastrar con el dedo o el mouse | Sin alternativa de teclado: no accesible |
| 6 | El efecto de profundidad (escena 1) solo reacciona al mouse | En celular/tablet no se ve |
| 7 | Tres animaciones (`requestAnimationFrame`) corren siempre, aunque su escena no esté activa | Gasto de batería innecesario |
| 8 | `img/dorian.webp` no se usa | 52 KB de más |

## Plan (versión económica, 3 pasos)

Paso 0 hecho: `CLAUDE.md` + `pruebas/recorrido.cjs`.

1. **Celular** (problemas 2, 3, 6): letra con mínimo legible, paneles abajo en
   vertical, fuego y blanco más grandes. Meta: la prueba pasa en iPhone.
2. **Motor** (problemas 1, 4, 5, 7, 8) en una sola pasada: `laboratorio/motor/motor.css`
   y `motor.js` con piezas por atributos (`data-ir`, decisión, pregunta, puntos,
   arrastrar con teclado), un solo ciclo de animación por escena activa, sin estilos
   en línea. `castillo-v2` pasa a usar el motor. Meta: la prueba sigue pasando.
3. **Plantilla** `laboratorio/plantilla/` + revisión final + pull request.

Reglas: un commit por paso, prueba automática antes de cada push, sin agentes en
paralelo, capturas solo al final.
