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

## Propuesta de mejora

1. **Separar motor y contenido**
   - `motor/motor.css` y `motor/motor.js`: navegación, transiciones, progreso,
     y piezas reutilizables (decisión, pregunta, puntos, arrastrar, final).
   - Cada aventura queda solo con su HTML de escenas y sus imágenes.
   - Resultado: una aventura nueva se arma con bloques, sin copiar código.
2. **Hacerlo legible en celular**: tamaño de letra con mínimo, y paneles que en
   vertical pasan a la parte inferior de la pantalla.
3. **Accesibilidad**: arrastrar también con teclado (flechas + Enter) o con un toque.
4. **Rendimiento**: animaciones que solo corren en su escena.
5. **Plantilla**: carpeta `plantilla/` con una aventura mínima lista para duplicar.

## Cómo probarlo

- Se aplica todo en `laboratorio/castillo-v2/` y se compara con el original
  (en computador, celular y dentro de Genially).
- Si funciona igual o mejor, se lleva al proyecto principal.
