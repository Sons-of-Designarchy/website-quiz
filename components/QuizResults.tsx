import { Check } from "lucide-react";
import { Language, translations } from "../lib/translations";
import { QuizData } from "./OnboardingQuiz";

interface QuizResultsProps {
  language: Language;
  quizData: QuizData;
}

export function QuizResults({ language, quizData }: QuizResultsProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <Check className="size-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl">
          {t.results.title}
        </h1>

        {/* Description */}
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          {t.results.description}
        </p>

        {/* Summary of Answers */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-4">
          <h2 className="text-white text-lg mb-4 text-center">
            {t.results.summaryTitle}
          </h2>
          
          {/* Type of website */}
          {quizData.tipoSitio && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.tipoSitio}
              </p>
              <p className="text-white">
                {quizData.tipoSitio}
                {quizData.tipoSitioOtro && ` - ${quizData.tipoSitioOtro}`}
              </p>
            </div>
          )}

          {/* Main goal */}
          {quizData.objetivoPrincipal && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.objetivoPrincipal}
              </p>
              <p className="text-white">
                {quizData.objetivoPrincipal}
                {quizData.objetivoOtro && ` - ${quizData.objetivoOtro}`}
              </p>
            </div>
          )}

          {/* Ideal user */}
          {quizData.usuarioIdeal && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.usuarioIdeal}
              </p>
              <p className="text-white">
                {quizData.usuarioIdeal}
                {quizData.usuarioOtro && ` - ${quizData.usuarioOtro}`}
              </p>
            </div>
          )}

          {/* Audience details (optional) */}
          {quizData.usuarioDetalles && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.usuarioDetalles}
              </p>
              <p className="text-white">{quizData.usuarioDetalles}</p>
            </div>
          )}

          {/* Primary action */}
          {quizData.ctaPrincipal && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.ctaPrincipal}
              </p>
              <p className="text-white">
                {quizData.ctaPrincipal}
                {quizData.ctaOtra && ` - ${quizData.ctaOtra}`}
              </p>
            </div>
          )}

          {/* Site size */}
          {quizData.tamanoSitio && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.tamanoSitio}
              </p>
              <p className="text-white">{quizData.tamanoSitio}</p>
            </div>
          )}

          {/* Visual style */}
          {quizData.estiloVisual.length > 0 && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.estiloVisual}
              </p>
              <p className="text-white">{quizData.estiloVisual.join(", ")}</p>
            </div>
          )}

          {/* Content availability */}
          {quizData.contenidoDisponible.length > 0 && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.contenidoDisponible}
              </p>
              <p className="text-white">{quizData.contenidoDisponible.join(", ")}</p>
            </div>
          )}

          {/* Additional services */}
          {quizData.serviciosAdicionales.length > 0 && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.serviciosAdicionales}
              </p>
              <p className="text-white">
                {quizData.serviciosAdicionales.join(", ")}
                {quizData.serviciosAdicionalesOtro && ` - ${quizData.serviciosAdicionalesOtro}`}
              </p>
            </div>
          )}

          {/* Timeline */}
          {quizData.timeline && (
            <div>
              <p className="text-white/40 text-sm mb-1">
                {t.results.timeline}
              </p>
              <p className="text-white">{quizData.timeline}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-white/40 pt-8">
          {t.results.duration}
        </p>
      </div>
    </div>
  );
}