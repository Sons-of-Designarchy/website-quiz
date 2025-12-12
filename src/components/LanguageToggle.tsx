import { Language } from "../lib/translations";

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center bg-white/5 border border-white/10 rounded-lg p-1 hover:bg-white/10 transition-colors"
      aria-label="Toggle language"
    >
      {/* Spanish */}
      <span
        className={`relative z-10 px-3 py-1.5 text-sm transition-colors ${
          language === "es" ? "text-black" : "text-white/60"
        }`}
      >
        Español
      </span>
      
      {/* English */}
      <span
        className={`relative z-10 px-3 py-1.5 text-sm transition-colors ${
          language === "en" ? "text-black" : "text-white/60"
        }`}
      >
        English
      </span>
      
      {/* Sliding background */}
      <span
        className={`absolute top-1 bottom-1 bg-white rounded-md transition-all duration-200 ease-in-out ${
          language === "es" ? "left-1 right-[50%]" : "left-[50%] right-1"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
