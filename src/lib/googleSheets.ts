import { QuizData } from "../components/OnboardingQuiz";

// Replace this with your Google Apps Script Web App URL
// Get it from: Extensions > Apps Script > Deploy > New deployment > Web app
// Example: https://script.google.com/macros/s/AKfycby.../exec
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

export async function sendToGoogleSheets(data: QuizData): Promise<boolean> {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      
      // New website blueprint fields
      tipoSitio: data.tipoSitio || "",
      nombreProyecto: data.nombreProyecto || "",
      industria: data.industria || "",
      ubicacion: data.ubicacion || "",
      sitioActual: data.sitioActual || "",
      
      objetivoProyecto: data.objetivoProyecto || "",
      objetivoOtro: data.objetivoOtro || "",
      
      usuarioPrincipal: data.usuarioPrincipal || "",
      usuarioOtro: data.usuarioOtro || "",
      
      accionDeseada: data.accionDeseada || "",
      
      tamanoSitio: data.tamanoSitio || "",
      
      seccionesDeseadas: data.seccionesDeseadas?.join(", ") || "",
      seccionesOtra: data.seccionesOtra || "",
      
      contenidoDisponible: data.contenidoDisponible?.join(", ") || "",
      
      estiloVisual: data.estiloVisual?.join(", ") || "",
      referenciasVisuales: data.referenciasVisuales || "",
      
      timeline: data.timeline || "",
      presupuestoRango: data.presupuestoRango || "",
      notasAdicionales: data.notasAdicionales || "",
      
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
