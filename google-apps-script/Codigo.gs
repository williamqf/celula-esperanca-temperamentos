/**
 * Célula Esperança — Teste de Temperamentos
 * Google Apps Script Web App
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Célula Esperança — Teste de Temperamentos")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=5.0")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
