// Juega una aventura completa en Chromium y avisa si algo falla.
// Uso: node pruebas/recorrido.cjs [carpeta]   (por defecto laboratorio/castillo-v2)
const { chromium } = require('playwright');
const path = require('path');

const carpeta = process.argv[2] || 'laboratorio/castillo-v2';
const url = 'file://' + path.resolve(__dirname, '..', carpeta, 'index.html');
const PANTALLAS = { genially: { width: 1280, height: 720 }, iphone: { width: 390, height: 844 } };

async function recorrer(nombre, viewport) {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport });
  // Sin internet en la prueba: GSAP se sirve desde una copia local y las fuentes se omiten.
  await pagina.route('**/gsap*.js', r => r.fulfill({ path: path.join(__dirname, 'vendor/gsap.min.js') }));
  await pagina.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const errores = [];
  pagina.on('pageerror', e => errores.push(e.message));
  pagina.on('console', m => m.type() === 'error' && !/ERR_FAILED|ERR_TUNNEL/.test(m.text()) && errores.push(m.text()));
  const foto = n => pagina.screenshot({ path: `pruebas/capturas/${nombre}-${n}.png` });
  const activa = id => pagina.waitForSelector(`#${id}.activa`, { timeout: 5000 });
  const clic = async sel => { await pagina.locator(sel).first().click({ force: true }); };
  const pasos = [];
  const paso = async (n, fn) => { try { await fn(); await pagina.waitForTimeout(1500); await foto(n); pasos.push('✔ ' + n); } catch (e) { pasos.push('✘ ' + n + ': ' + e.message.split('\n')[0]); throw e; } };

  try {
    await pagina.goto(url);
    await paso('1-portada', () => activa('e1'));
    await paso('2-decision', async () => { await clic('#e1 [data-ir="e2"]'); await activa('e2'); await clic('[data-camino]'); });
    await paso('3-encuentro', async () => { await clic('#seguir2'); await activa('e3'); });
    await paso('4-pregunta', async () => { await clic('#e3 [data-ir="e4"]'); await activa('e4'); await clic('.opcion:not([data-ok])'); await clic('.opcion[data-ok]'); });
    await paso('5-puntos', async () => { await activa('e5'); await pagina.waitForTimeout(2500); for (const p of await pagina.locator('.punto').all()) await p.click({ force: true }); });
    await paso('6-arrastrar', async () => {
      await clic('#ir6'); await activa('e6'); await pagina.waitForTimeout(1000);
      const f = await pagina.locator('#fuego').boundingBox(), b = await pagina.locator('#blanco').boundingBox();
      await pagina.mouse.move(f.x + f.width / 2, f.y + f.height / 2); await pagina.mouse.down();
      await pagina.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 10 }); await pagina.mouse.up();
    });
    await paso('7-final', async () => { await activa('e7'); await pagina.waitForTimeout(3000); });
  } catch { /* el paso fallido ya quedó anotado */ }
  await navegador.close();
  console.log(`\n[${nombre}]\n` + pasos.join('\n') + (errores.length ? '\nErrores de la página:\n- ' + errores.join('\n- ') : '\nSin errores en la página.'));
  return pasos.every(p => p.startsWith('✔')) && !errores.length;
}

(async () => {
  require('fs').mkdirSync('pruebas/capturas', { recursive: true });
  let ok = true;
  for (const [n, v] of Object.entries(PANTALLAS)) ok = (await recorrer(n, v)) && ok;
  console.log(ok ? '\nTODO BIEN' : '\nHAY PROBLEMAS');
  process.exit(ok ? 0 : 1);
})();
