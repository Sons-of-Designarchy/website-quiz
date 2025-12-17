import { QuizData } from "../components/OnboardingQuiz";

interface RelumePrompts {
  relumePromptEn: string;
  relumePromptEs: string;
}

export function buildRelumePrompts(data: QuizData): RelumePrompts {
  // English prompt
  const relumePromptEn = `You are an expert UX strategist. Generate a sitemap and website wireframe structure.

WEBSITE TYPE:
${data.tipoSitio || "Not specified"}${data.tipoSitioOtro ? ` - ${data.tipoSitioOtro}` : ""}

MAIN OBJECTIVE:
${data.objetivoPrincipal || "Not specified"}${data.objetivoOtro ? ` - ${data.objetivoOtro}` : ""}

TARGET AUDIENCE:
${data.usuarioIdeal || "Not specified"}${data.usuarioOtro ? ` - ${data.usuarioOtro}` : ""}
${data.usuarioDetalles ? `Additional details: ${data.usuarioDetalles}` : ""}

PRIMARY CALL TO ACTION:
${data.ctaPrincipal || "Not specified"}${data.ctaOtra ? ` - ${data.ctaOtra}` : ""}

ESTIMATED SITE SIZE:
${data.tamanoSitio || "Not specified"}

VISUAL STYLE PREFERENCES:
${data.estiloVisual && data.estiloVisual.length > 0 ? data.estiloVisual.join(", ") : "Not specified"}

CONTENT AVAILABILITY:
${data.contenidoDisponible && data.contenidoDisponible.length > 0 ? data.contenidoDisponible.join(", ") : "Not specified"}

ADDITIONAL SERVICES NEEDED:
${data.serviciosAdicionales && data.serviciosAdicionales.length > 0 ? data.serviciosAdicionales.join(", ") : "None"}${data.serviciosAdicionalesOtro ? ` - ${data.serviciosAdicionalesOtro}` : ""}

TIMELINE:
${data.timeline || "Not specified"}

Please generate:
1) A clear sitemap optimized for the stated objectives
2) A detailed wireframe outline per page with section order
3) Suggested hero messaging aligned with the primary CTA
4) Any extra sections needed based on UX best practices for this type of website`;

  // Spanish prompt
  const relumePromptEs = `Eres un estratega UX experto. Genera un sitemap y una estructura de wireframe para un sitio web.

TIPO DE SITIO:
${data.tipoSitio || "No especificado"}${data.tipoSitioOtro ? ` - ${data.tipoSitioOtro}` : ""}

OBJETIVO PRINCIPAL:
${data.objetivoPrincipal || "No especificado"}${data.objetivoOtro ? ` - ${data.objetivoOtro}` : ""}

AUDIENCIA OBJETIVO:
${data.usuarioIdeal || "No especificado"}${data.usuarioOtro ? ` - ${data.usuarioOtro}` : ""}
${data.usuarioDetalles ? `Detalles adicionales: ${data.usuarioDetalles}` : ""}

ACCIÓN PRINCIPAL (CTA):
${data.ctaPrincipal || "No especificado"}${data.ctaOtra ? ` - ${data.ctaOtra}` : ""}

TAMAÑO DEL SITIO:
${data.tamanoSitio || "No especificado"}

PREFERENCIAS DE ESTILO VISUAL:
${data.estiloVisual && data.estiloVisual.length > 0 ? data.estiloVisual.join(", ") : "No especificado"}

CONTENIDO DISPONIBLE:
${data.contenidoDisponible && data.contenidoDisponible.length > 0 ? data.contenidoDisponible.join(", ") : "No especificado"}

SERVICIOS ADICIONALES NECESARIOS:
${data.serviciosAdicionales && data.serviciosAdicionales.length > 0 ? data.serviciosAdicionales.join(", ") : "Ninguno"}${data.serviciosAdicionalesOtro ? ` - ${data.serviciosAdicionalesOtro}` : ""}

TIMELINE:
${data.timeline || "No especificado"}

Genera:
1) Un sitemap claro optimizado para los objetivos establecidos
2) Un outline de wireframe por página con orden de secciones
3) Un mensaje sugerido para el hero alineado con el CTA principal
4) Secciones extra recomendadas según mejores prácticas UX para este tipo de sitio`;

  return {
    relumePromptEn,
    relumePromptEs,
  };
}