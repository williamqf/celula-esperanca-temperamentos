const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'style.css'), 'utf8');
const dataJs = fs.readFileSync(path.join(baseDir, 'data.js'), 'utf8');
const appJs = fs.readFileSync(path.join(baseDir, 'app.js'), 'utf8');

// Base64 logo
const logoWhiteB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(baseDir, 'assets', 'logo_white.png')).toString('base64');
const logoGreenB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(baseDir, 'assets', 'logo_green.png')).toString('base64');

// Replace relative assets and scripts in HTML
let bundledHtml = html;

// Replace logos with base64
bundledHtml = bundledHtml.split('assets/logo_white.png').join(logoWhiteB64);
bundledHtml = bundledHtml.split('assets/logo_green.png').join(logoGreenB64);

// Inline CSS
bundledHtml = bundledHtml.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>');

// Inline data.js and app.js
bundledHtml = bundledHtml.replace('<script src="data.js"></script>', '<script>\n' + dataJs + '\n</script>');
bundledHtml = bundledHtml.replace('<script src="app.js"></script>', '<script>\n' + appJs + '\n</script>');

const gasDir = path.join(baseDir, 'google-apps-script');
if (!fs.existsSync(gasDir)) fs.mkdirSync(gasDir, { recursive: true });

fs.writeFileSync(path.join(gasDir, 'Index.html'), bundledHtml, 'utf8');

// Create Codigo.gs
const codigoGs = `/**
 * Célula Esperança — Teste de Temperamentos
 * Google Apps Script Web App
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Célula Esperança — Teste de Temperamentos")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=5.0")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
`;

fs.writeFileSync(path.join(gasDir, 'Codigo.gs'), codigoGs, 'utf8');

// Também copia para .next caso o Netlify esteja configurado para publicar da pasta .next
const nextDir = path.join(baseDir, '.next');
if (!fs.existsSync(nextDir)) fs.mkdirSync(nextDir, { recursive: true });
fs.copyFileSync(path.join(baseDir, 'index.html'), path.join(nextDir, 'index.html'));
fs.copyFileSync(path.join(baseDir, 'style.css'), path.join(nextDir, 'style.css'));
fs.copyFileSync(path.join(baseDir, 'app.js'), path.join(nextDir, 'app.js'));
fs.copyFileSync(path.join(baseDir, 'data.js'), path.join(nextDir, 'data.js'));
const nextAssets = path.join(nextDir, 'assets');
if (!fs.existsSync(nextAssets)) fs.mkdirSync(nextAssets, { recursive: true });
for (const f of fs.readdirSync(path.join(baseDir, 'assets'))) {
  fs.copyFileSync(path.join(baseDir, 'assets', f), path.join(nextAssets, f));
}

console.log('Successfully generated google-apps-script/Index.html and .next folder!');
