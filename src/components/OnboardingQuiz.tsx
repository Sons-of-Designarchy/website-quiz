import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { QuizStep } from "./QuizStep";
import { QuizResults } from "./QuizResults";
import { IntroScreen } from "./IntroScreen";
import { Language, translations } from "../lib/translations";
import { sendToGoogleSheets } from "../lib/googleSheets";
import { LanguageToggle } from "./LanguageToggle";
import { buildRelumePrompts } from "../lib/relumePrompt";

export interface QuizData {
  // New website-specific fields
  tipoSitio: string;
  tipoSitioOtro: string;
  objetivoPrincipal: string;
  objetivoOtro: string;
  usuarioIdeal: string;
  usuarioOtro: string;
  usuarioDetalles: string; // New field for optional audience description
  ctaPrincipal: string;
  ctaOtra: string;
  tamanoSitio: string;
  estiloVisual: string[];
  serviciosAdicionales: string[];
  serviciosAdicionalesOtro: string;
  contenidoDisponible: string[];
  timeline: string;

  // Internal-only fields (computed, not shown in UI)
  relumePromptEn: string;
  relumePromptEs: string;

  // Legacy fields kept for backward compatibility
  nombreProyecto: string;
  industria: string;
  ubicacion: string;
  sitioActual: string;
  objetivoProyecto: string;
  usuarioPrincipal: string;
  accionDeseada: string;
  seccionesDeseadas: string[];
  seccionesOtra: string;
  referenciasVisuales: string;
  presupuestoRango: string;
  notasAdicionales: string;
  tipoProyecto: string[];
  planSeleccionado: string;
  presupuesto: string;
  nombre: string;
  email: string;
  empresa: string;
}

const initialData: QuizData = {
  // New fields
  tipoSitio: "",
  tipoSitioOtro: "",
  objetivoPrincipal: "",
  objetivoOtro: "",
  usuarioIdeal: "",
  usuarioOtro: "",
  usuarioDetalles: "",
  ctaPrincipal: "",
  ctaOtra: "",
  tamanoSitio: "",
  estiloVisual: [],
  serviciosAdicionales: [],
  serviciosAdicionalesOtro: "",
  contenidoDisponible: [],
  timeline: "",
  relumePromptEn: "",
  relumePromptEs: "",
  
  // Legacy fields (empty)
  nombreProyecto: "",
  industria: "",
  ubicacion: "",
  sitioActual: "",
  objetivoProyecto: "",
  usuarioPrincipal: "",
  accionDeseada: "",
  seccionesDeseadas: [],
  seccionesOtra: "",
  referenciasVisuales: "",
  presupuestoRango: "",
  notasAdicionales: "",
  tipoProyecto: [],
  planSeleccionado: "",
  presupuesto: "",
  nombre: "",
  email: "",
  empresa: "",
};

type StepType = 
  | "step0"   // Type of website
  | "step1"   // Main goal
  | "step2"   // Ideal user
  | "step3"   // Primary action (CTA)
  | "step4"   // Site size
  | "step5"   // Visual style
  | "step7"   // Content readiness
  | "step6"   // Additional services
  | "step8";  // Timeline

export function OnboardingQuiz() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>(initialData);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState(0);
  const [language, setLanguage] = useState<Language>("es");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fixed step mapping - 12 steps total (0-11)
  const stepMapping: StepType[] = [
    "step0",
    "step1",
    "step2",
    "step3",
    "step4",
    "step5",
    "step7", // Content readiness (moved before additional services)
    "step6", // Additional services (simplified)
    "step8",
  ];
  
  const totalSteps = stepMapping.length;
  const currentStepType = stepMapping[currentStep];
  
  const t = translations[language];

  const updateData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-select "Tienda / Ecommerce" when E-commerce is selected as website type
  useEffect(() => {
    if (quizData.tipoSitio === "E-commerce") {
      const ecommerceOption = language === "es" ? "Tienda / Ecommerce" : "Store / Ecommerce";
      if (!quizData.serviciosAdicionales.includes(ecommerceOption)) {
        setQuizData(prev => ({
          ...prev,
          serviciosAdicionales: [...prev.serviciosAdicionales, ecommerceOption]
        }));
      }
    }
  }, [quizData.tipoSitio, language]);

  const handleNext = () => {
    if (!isStepValid()) return;
    
    if (currentStep === totalSteps - 1) {
      handleSubmit();
      return;
    }
    
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate Relume prompts before sending
    const { relumePromptEn, relumePromptEs } = buildRelumePrompts(quizData);
    
    const finalData: QuizData = {
      ...quizData,
      relumePromptEn,
      relumePromptEs,
    };
    
    // Send to Google Sheets
    const success = await sendToGoogleSheets(finalData);
    
    if (success) {
      console.log("Data sent to Google Sheets successfully");
    } else {
      console.error("Failed to send data to Google Sheets");
    }
    
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isStepValid = () => {
    switch (currentStepType) {
      case 'step0':
        if (quizData.tipoSitio === "Otro" || quizData.tipoSitio === "Other") {
          return quizData.tipoSitio !== "" && quizData.tipoSitioOtro !== "";
        }
        return quizData.tipoSitio !== "";
      case 'step1':
        if (quizData.objetivoPrincipal === "Otro" || quizData.objetivoPrincipal === "Other") {
          return quizData.objetivoPrincipal !== "" && quizData.objetivoOtro !== "";
        }
        return quizData.objetivoPrincipal !== "";
      case 'step2':
        if (quizData.usuarioIdeal === "Otro" || quizData.usuarioIdeal === "Other") {
          return quizData.usuarioIdeal !== "" && quizData.usuarioOtro !== "";
        }
        return quizData.usuarioIdeal !== "";
      case 'step3':
        if (quizData.ctaPrincipal === "Otra" || quizData.ctaPrincipal === "Other") {
          return quizData.ctaPrincipal !== "" && quizData.ctaOtra !== "";
        }
        return quizData.ctaPrincipal !== "";
      case 'step4':
        return quizData.tamanoSitio !== "";
      case 'step5':
        return quizData.estiloVisual.length > 0; // Multiple selections
      case 'step7':
        return quizData.contenidoDisponible.length > 0;
      case 'step6':
        const hasOtro = quizData.serviciosAdicionales.includes("Otro") || quizData.serviciosAdicionales.includes("Other");
        if (hasOtro) {
          return quizData.serviciosAdicionales.length > 0 && quizData.serviciosAdicionalesOtro !== "";
        }
        return quizData.serviciosAdicionales.length > 0;
      case 'step8':
        return quizData.timeline !== ""; // Required
      default:
        return true;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} language={language} onToggleLanguage={toggleLanguage} />;
  }

  if (isComplete) {
    return <QuizResults language={language} quizData={quizData} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white">CASA SODA</span>
            <span className="text-white/40">*</span>
          </div>
          <LanguageToggle language={language} onToggle={toggleLanguage} />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-white/5">
        <motion.div
          className="h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 pb-24">
        <div className="w-full max-w-2xl mx-auto">
          {/* Step Counter */}
          <div className="text-center mb-6">
            <span className="text-white/40 text-sm">
              {t.nav.stepCounter.replace("{{current}}", String(currentStep + 1)).replace("{{total}}", String(totalSteps))}
            </span>
          </div>

          {/* Quiz Steps */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
            >
              <QuizStep
                step={currentStep}
                stepType={currentStepType}
                data={quizData}
                updateData={updateData}
                language={language}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 px-6 py-4">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="ghost"
            className="text-white/60 hover:text-white disabled:opacity-30 text-base"
          >
            <ChevronLeft className="size-5 mr-2" />
            {t.nav.previous}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isSubmitting}
            className="bg-white text-black hover:bg-white/90 disabled:opacity-30 text-base"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                {isSubmitting ? "Enviando..." : t.nav.complete}
                <Check className="size-5 ml-2" />
              </>
            ) : (
              <>
                {t.nav.next}
                <ChevronRight className="size-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}