import { QuizData } from "../components/OnboardingQuiz";

interface RelumePrompts {
  relumePromptEn: string;
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

  return {
    relumePromptEn,
  };
}