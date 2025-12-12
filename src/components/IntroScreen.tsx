import { motion } from "motion/react";
import { ArrowRight, Clock, Sparkles, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Language, translations } from "../lib/translations";
import { LanguageToggle } from "./LanguageToggle";

interface IntroScreenProps {
  onStart: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export function IntroScreen({ onStart, language, onToggleLanguage }: IntroScreenProps) {
  const t = translations[language];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white">CASA SODA</span>
            <span className="text-white/40">*</span>
          </div>
          <LanguageToggle language={language} onToggle={onToggleLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className="w-full max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="size-4 text-white/60" />
            <span className="text-white/60 text-sm">{t.intro.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-white text-4xl md:text-5xl mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t.intro.title1}
            <br />
            <span className="text-white/60">{t.intro.title2}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.intro.description}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Clock className="size-6 text-white/60" />
              </div>
              <h3 className="text-white mb-1">{t.intro.feature1Title}</h3>
              <p className="text-white/40 text-sm">
                {t.intro.feature1Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Target className="size-6 text-white/60" />
              </div>
              <h3 className="text-white mb-1">{t.intro.feature2Title}</h3>
              <p className="text-white/40 text-sm">
                {t.intro.feature2Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Sparkles className="size-6 text-white/60" />
              </div>
              <h3 className="text-white mb-1">{t.intro.feature3Title}</h3>
              <p className="text-white/40 text-sm">
                {t.intro.feature3Desc}
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 h-auto group"
            >
              {t.intro.cta}
              <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="text-white/30 text-sm mt-4">
              {t.intro.ctaSubtext}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        className="pb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-white/20 text-sm">
          {t.intro.footer}
        </p>
      </motion.div>
    </div>
  );
}