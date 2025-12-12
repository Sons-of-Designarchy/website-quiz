import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionCard({ icon: Icon, title, selected, onClick, disabled }: OptionCardProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative p-4 rounded-xl border transition-all text-left
        ${selected 
          ? 'bg-white/10 border-white/40' 
          : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-lg transition-colors flex-shrink-0
          ${selected ? 'bg-white/20' : 'bg-white/10'}
        `}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm">{title}</p>
        </div>
        {selected && (
          <div className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );
}
