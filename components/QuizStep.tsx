import { QuizData } from "./OnboardingQuiz";
import { Language, translations } from "../lib/translations";
import { getIconForOption } from "../lib/optionIcons";
import { OptionCard } from "./OptionCard";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface QuizStepProps {
  step: number;
  stepType: string;
  data: QuizData;
  updateData: (field: keyof QuizData, value: any) => void;
  language: Language;
}

export function QuizStep({ step, stepType, data, updateData, language }: QuizStepProps) {
  const t = translations[language].quiz;
  
  const renderStep = () => {
    switch (stepType) {
      // STEP CONTACT: Contact info
      case 'stepContact':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.stepContact.title}</h2>
              <p className="text-white/60">{t.stepContact.subtitle}</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="personName" className="text-white/60 mb-2 block text-sm">
                  {t.stepContact.personNameLabel} *
                </Label>
                <Input
                  id="personName"
                  type="text"
                  value={data.personName}
                  onChange={(e) => updateData("personName", e.target.value)}
                  placeholder={t.stepContact.personNamePlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="projectName" className="text-white/60 mb-2 block text-sm">
                  {t.stepContact.projectNameLabel} *
                </Label>
                <Input
                  id="projectName"
                  type="text"
                  value={data.projectName}
                  onChange={(e) => updateData("projectName", e.target.value)}
                  placeholder={t.stepContact.projectNamePlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="contact" className="text-white/60 mb-2 block text-sm">
                  {t.stepContact.contactLabel} *
                </Label>
                <Input
                  id="contact"
                  type="text"
                  value={data.contact}
                  onChange={(e) => updateData("contact", e.target.value)}
                  placeholder={t.stepContact.contactPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </div>
        );
        
      // STEP 0: Type of website
      case 'step0':
        const showTipoSitioOtro = data.tipoSitio === "Otro" || data.tipoSitio === "Other";
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step0.title}</h2>
              <p className="text-white/60">{t.step0.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.step0.options.map((option) => {
                const isSelected = data.tipoSitio === option;
                return (
                  <OptionCard
                    key={option}
                    icon={getIconForOption(option, 0)}
                    title={option}
                    selected={isSelected}
                    onClick={() => updateData("tipoSitio", option)}
                  />
                );
              })}
            </div>
            {showTipoSitioOtro && (
              <div>
                <Label htmlFor="tipoSitioOtro" className="text-white/60 mb-2 block text-sm">
                  {t.step0.otroLabel} *
                </Label>
                <Input
                  id="tipoSitioOtro"
                  type="text"
                  value={data.tipoSitioOtro}
                  onChange={(e) => updateData("tipoSitioOtro", e.target.value)}
                  placeholder={t.step0.otroPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            )}
          </div>
        );

      // STEP 1: Main goal
      case 'step1':
        const showObjetivoOtro = data.objetivoPrincipal === "Otro" || data.objetivoPrincipal === "Other";
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step1.title}</h2>
              <p className="text-white/60">{t.step1.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step1.options.map((option) => {
                const isSelected = data.objetivoPrincipal === option;
                return (
                  <button
                    key={option}
                    onClick={() => updateData("objetivoPrincipal", option)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {showObjetivoOtro && (
              <div>
                <Label htmlFor="objetivoOtro" className="text-white/60 mb-2 block text-sm">
                  {t.step1.otroLabel} *
                </Label>
                <Input
                  id="objetivoOtro"
                  type="text"
                  value={data.objetivoOtro}
                  onChange={(e) => updateData("objetivoOtro", e.target.value)}
                  placeholder={t.step1.otroPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            )}
          </div>
        );

      // STEP 2: Ideal user
      case 'step2':
        const showUsuarioOtro = data.usuarioIdeal === "Otro" || data.usuarioIdeal === "Other";
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step2.title}</h2>
              <p className="text-white/60">{t.step2.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step2.options.map((option) => {
                const isSelected = data.usuarioIdeal === option;
                return (
                  <button
                    key={option}
                    onClick={() => updateData("usuarioIdeal", option)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {showUsuarioOtro && (
              <div>
                <Label htmlFor="usuarioOtro" className="text-white/60 mb-2 block text-sm">
                  {t.step2.otroLabel} *
                </Label>
                <Input
                  id="usuarioOtro"
                  type="text"
                  value={data.usuarioOtro}
                  onChange={(e) => updateData("usuarioOtro", e.target.value)}
                  placeholder={t.step2.otroPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            )}
            {/* Optional audience description field - always visible */}
            <div>
              <Label htmlFor="usuarioDetalles" className="text-white/60 mb-2 block text-sm">
                {t.step2.detallesLabel}
              </Label>
              <Input
                id="usuarioDetalles"
                type="text"
                value={data.usuarioDetalles}
                onChange={(e) => updateData("usuarioDetalles", e.target.value)}
                placeholder={t.step2.detallesPlaceholder}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
          </div>
        );

      // STEP 3: Primary action (CTA)
      case 'step3':
        const showCtaOtra = data.ctaPrincipal === "Otra" || data.ctaPrincipal === "Other";
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step3.title}</h2>
              <p className="text-white/60">{t.step3.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step3.options.map((option) => {
                const isSelected = data.ctaPrincipal === option;
                return (
                  <button
                    key={option}
                    onClick={() => updateData("ctaPrincipal", option)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {showCtaOtra && (
              <div>
                <Label htmlFor="ctaOtra" className="text-white/60 mb-2 block text-sm">
                  {t.step3.otraLabel} *
                </Label>
                <Input
                  id="ctaOtra"
                  type="text"
                  value={data.ctaOtra}
                  onChange={(e) => updateData("ctaOtra", e.target.value)}
                  placeholder={t.step3.otraPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            )}
          </div>
        );

      // STEP 4: Site size
      case 'step4':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step4.title}</h2>
              <p className="text-white/60">{t.step4.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step4.options.map((option) => {
                const isSelected = data.tamanoSitio === option;
                return (
                  <button
                    key={option}
                    onClick={() => updateData("tamanoSitio", option)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      // STEP 5: Visual style (multiselect, up to 3)
      case 'step5':
        const maxVisualStyles = 3;
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step5.title}</h2>
              <p className="text-white/60">{t.step5.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.step5.options.map((option) => {
                const isSelected = data.estiloVisual.includes(option);
                const isMaxReached = data.estiloVisual.length >= maxVisualStyles;
                const isDisabled = !isSelected && isMaxReached;
                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (isSelected) {
                        updateData("estiloVisual", data.estiloVisual.filter(s => s !== option));
                      } else if (!isMaxReached) {
                        updateData("estiloVisual", [...data.estiloVisual, option]);
                      }
                    }}
                    disabled={isDisabled}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : isDisabled
                        ? 'bg-white/5 border-white/10 opacity-40 cursor-not-allowed'
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {data.estiloVisual.length > 0 && (
              <p className="text-white/40 text-sm text-center">
                {data.estiloVisual.length} / {maxVisualStyles} {data.estiloVisual.length === 1 
                  ? (language === 'es' ? 'estilo seleccionado' : 'style selected')
                  : (language === 'es' ? 'estilos seleccionados' : 'styles selected')}
              </p>
            )}
          </div>
        );

      // STEP 6: Additional services (multiselect)
      case 'step6':
        const showServiciosOtro = data.serviciosAdicionales.includes("Otro") || data.serviciosAdicionales.includes("Other");
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step6.title}</h2>
              <p className="text-white/60">{t.step6.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.step6.options.map((option) => {
                const isSelected = data.serviciosAdicionales.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (isSelected) {
                        updateData("serviciosAdicionales", data.serviciosAdicionales.filter(s => s !== option));
                      } else {
                        updateData("serviciosAdicionales", [...data.serviciosAdicionales, option]);
                      }
                    }}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showServiciosOtro && (
              <div>
                <Label htmlFor="serviciosAdicionalesOtro" className="text-white/60 mb-2 block text-sm">
                  {t.step6.otroLabel} *
                </Label>
                <Input
                  id="serviciosAdicionalesOtro"
                  type="text"
                  value={data.serviciosAdicionalesOtro}
                  onChange={(e) => updateData("serviciosAdicionalesOtro", e.target.value)}
                  placeholder={t.step6.otroPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            )}

            {data.serviciosAdicionales.length > 0 && (
              <p className="text-white/40 text-sm text-center">
                {data.serviciosAdicionales.length} {data.serviciosAdicionales.length === 1 
                  ? (language === 'es' ? 'servicio seleccionado' : 'service selected')
                  : (language === 'es' ? 'servicios seleccionados' : 'services selected')}
              </p>
            )}
          </div>
        );

      // STEP 7: Content readiness (multiselect)
      case 'step7':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step7.title}</h2>
              <p className="text-white/60">{t.step7.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step7.options.map((option) => {
                const isSelected = data.contenidoDisponible.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (isSelected) {
                        updateData("contenidoDisponible", data.contenidoDisponible.filter(c => c !== option));
                      } else {
                        updateData("contenidoDisponible", [...data.contenidoDisponible, option]);
                      }
                    }}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {data.contenidoDisponible.length > 0 && (
              <p className="text-white/40 text-sm text-center">
                {data.contenidoDisponible.length} {data.contenidoDisponible.length === 1 
                  ? (language === 'es' ? 'elemento seleccionado' : 'item selected')
                  : (language === 'es' ? 'elementos seleccionados' : 'items selected')}
              </p>
            )}
          </div>
        );

      // STEP 8: Timeline
      case 'step8':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl mb-2">{t.step8.title}</h2>
              <p className="text-white/60">{t.step8.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.step8.options.map((option) => {
                const isSelected = data.timeline === option;
                return (
                  <button
                    key={option}
                    onClick={() => updateData("timeline", option)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${isSelected
                        ? 'bg-white/10 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-white/80 text-sm mb-3">
                {language === 'es' ? '🎉 ¡Casi listo!' : '🎉 Almost done!'}
              </p>
              <p className="text-white/60 text-sm">
                {language === 'es' 
                  ? 'Al completar, toda esta información se guardará y la tendremos lista para tu llamada.' 
                  : 'Upon completion, all this information will be saved and ready for your call.'}
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}