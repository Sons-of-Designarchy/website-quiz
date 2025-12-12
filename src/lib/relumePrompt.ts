import { QuizData } from "../components/OnboardingQuiz";

interface RelumePrompts {
  relumePromptEn: string;
  relumePromptEs: string;
}

export function buildRelumePrompts(data: QuizData): RelumePrompts {
  // English prompt
  const relumePromptEn = `You are an expert UX strategist. Generate a sitemap and website wireframe structure.

PROJECT TYPE:
${data.tipoSitio || "Not specified"}

PROJECT NAME:
${data.nombreProyecto || "Not specified"}

INDUSTRY:
${data.industria || "Not specified"}

LOCATION:
${data.ubicacion || "Not specified"}

EXISTING WEBSITE:
${data.sitioActual || "None"}

MAIN GOAL OF THE SITE:
${data.objetivoProyecto || "Not specified"}${data.objetivoOtro ? ` - ${data.objetivoOtro}` : ""}

MAIN AUDIENCE:
${data.usuarioPrincipal || "Not specified"}${data.usuarioOtro ? ` - ${data.usuarioOtro}` : ""}

PRIMARY CALL TO ACTION:
${data.accionDeseada || "Not specified"}

ESTIMATED SITE SIZE:
${data.tamanoSitio || "Not specified"}

REQUIRED SECTIONS:
${data.seccionesDeseadas.length > 0 ? data.seccionesDeseadas.join(", ") : "Not specified"}${data.seccionesOtra ? `\nAdditional section: ${data.seccionesOtra}` : ""}

CONTENT AVAILABILITY:
${data.contenidoDisponible.length > 0 ? data.contenidoDisponible.join(", ") : "Not specified"}

VISUAL STYLE:
${data.estiloVisual.length > 0 ? data.estiloVisual.join(", ") : "Not specified"}

REFERENCE WEBSITES:
${data.referenciasVisuales || "None provided"}

TIMELINE:
${data.timeline || "Not specified"}

BUDGET RANGE:
${data.presupuestoRango || "Not specified"}

NOTES:
${data.notasAdicionales || "None"}

Please generate:
1) A clear sitemap
2) A detailed wireframe outline per page with section order
3) Suggested hero messaging and primary CTAs
4) Any extra sections needed based on best practices`;

  // Spanish prompt
  const relumePromptEs = `Eres un estratega UX experto. Genera un sitemap y una estructura de wireframe para un sitio web.

TIPO DE SITIO:
${data.tipoSitio || "No especificado"}

NOMBRE DEL PROYECTO:
${data.nombreProyecto || "No especificado"}

INDUSTRIA:
${data.industria || "No especificado"}

UBICACIÓN:
${data.ubicacion || "No especificado"}

SITIO ACTUAL:
${data.sitioActual || "Ninguno"}

OBJETIVO PRINCIPAL DEL SITIO:
${data.objetivoProyecto || "No especificado"}${data.objetivoOtro ? ` - ${data.objetivoOtro}` : ""}

AUDIENCIA PRINCIPAL:
${data.usuarioPrincipal || "No especificado"}${data.usuarioOtro ? ` - ${data.usuarioOtro}` : ""}

ACCIÓN PRINCIPAL:
${data.accionDeseada || "No especificado"}

TAMAÑO DEL SITIO:
${data.tamanoSitio || "No especificado"}

SECCIONES NECESARIAS:
${data.seccionesDeseadas.length > 0 ? data.seccionesDeseadas.join(", ") : "No especificado"}${data.seccionesOtra ? `\nOtra sección: ${data.seccionesOtra}` : ""}

CONTENIDO DISPONIBLE:
${data.contenidoDisponible.length > 0 ? data.contenidoDisponible.join(", ") : "No especificado"}

ESTILO VISUAL:
${data.estiloVisual.length > 0 ? data.estiloVisual.join(", ") : "No especificado"}

REFERENCIAS:
${data.referenciasVisuales || "Ninguna proporcionada"}

TIMELINE:
${data.timeline || "No especificado"}

RANGO DE PRESUPUESTO:
${data.presupuestoRango || "No especificado"}

NOTAS:
${data.notasAdicionales || "Ninguna"}

Genera:
1) Un sitemap claro
2) Un outline de wireframe por página con orden de secciones
3) Un mensaje sugerido para el hero y CTA principal
4) Secciones extra recomendadas según mejores prácticas`;

  return {
    relumePromptEn,
    relumePromptEs,
  };
}
