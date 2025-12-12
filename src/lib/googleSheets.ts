import { QuizData } from "../components/OnboardingQuiz";

// Replace this with your Google Apps Script Web App URL
// Get it from: Extensions > Apps Script > Deploy > New deployment > Web app
// Example: https://script.google.com/macros/s/AKfycby.../exec
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

export async function sendToGoogleSheets(data: QuizData): Promise<boolean> {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      
      // Website blueprint fields - matching the new quiz structure
      tipoSitio: data.tipoSitio || "",
      tipoSitioOtro: data.tipoSitioOtro || "",
      objetivoPrincipal: data.objetivoPrincipal || "",
      objetivoOtro: data.objetivoOtro || "",
      usuarioIdeal: data.usuarioIdeal || "",
      usuarioOtro: data.usuarioOtro || "",
      usuarioDetalles: data.usuarioDetalles || "",
      ctaPrincipal: data.ctaPrincipal || "",
      ctaOtra: data.ctaOtra || "",
      tamanoSitio: data.tamanoSitio || "",
      estiloVisual: data.estiloVisual?.join(", ") || "",
      contenidoDisponible: data.contenidoDisponible?.join(", ") || "",
      serviciosAdicionales: data.serviciosAdicionales?.join(", ") || "",
      serviciosAdicionalesOtro: data.serviciosAdicionalesOtro || "",
      timeline: data.timeline || "",
      
      // Relume prompts (internal use only, not shown in UI)
      relumePromptEn: data.relumePromptEn || "",
      relumePromptEs: data.relumePromptEs || "",
    };

    console.log("Sending to Google Sheets:", payload);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Note: With no-cors mode, we can't read the response
    // We assume success if no error is thrown
    console.log("Successfully sent to Google Sheets");
    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false;
  }
}