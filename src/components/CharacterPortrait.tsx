import React from 'react';
import { CharacterClass } from '../types/character';
import { ClassSigil } from './ClassSigil';
import { RefreshCw } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface CharacterPortraitProps {
  characterClass: CharacterClass;
  characterName: string;
  variant?: number;
  onRegeneratePortrait?: () => void;
  size?: number;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterClass,
  characterName,
  variant = 1,
  onRegeneratePortrait,
  size = 72
}) => {
  // 6 distinct antique gold & elemental frame styles
  const frameThemes = [
    {
      border: 'border-amber-500/60',
      ring: 'ring-amber-500/30',
      glow: 'shadow-amber-500/20',
      bg: 'bg-gradient-to-b from-amber-950/40 via-stone-950/90 to-stone-950',
      flourish: '✦'
    },
    {
      border: 'border-yellow-600/60',
      ring: 'ring-yellow-500/30',
      glow: 'shadow-yellow-600/20',
      bg: 'bg-gradient-to-b from-stone-900 via-stone-950/95 to-amber-950/40',
      flourish: '❖'
    },
    {
      border: 'border-amber-400/70',
      ring: 'ring-amber-400/40',
      glow: 'shadow-amber-400/25',
      bg: 'bg-gradient-to-b from-amber-900/30 via-stone-950 to-stone-900',
      flourish: '◈'
    },
    {
      border: 'border-orange-500/60',
      ring: 'ring-orange-500/30',
      glow: 'shadow-orange-500/20',
      bg: 'bg-gradient-to-b from-stone-950 via-amber-950/30 to-stone-950',
      flourish: '✵'
    },
    {
      border: 'border-amber-600/70',
      ring: 'ring-amber-500/30',
      glow: 'shadow-amber-600/20',
      bg: 'bg-gradient-to-b from-stone-900/90 via-stone-950 to-amber-950/50',
      flourish: '✤'
    },
    {
      border: 'border-yellow-500/60',
      ring: 'ring-yellow-400/30',
      glow: 'shadow-yellow-500/20',
      bg: 'bg-gradient-to-b from-amber-950/50 via-stone-950 to-stone-950',
      flourish: '✧'
    }
  ];

  const currentTheme = frameThemes[(variant - 1) % frameThemes.length];

  return (
    <div className="relative group shrink-0 flex flex-col items-center">
      {/* Antique Gold Framed Portrait Container */}
      <div
        className={`relative p-3.5 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} shadow-xl ${currentTheme.glow} ring-1 ${currentTheme.ring} transition-all duration-300 group-hover:scale-[1.02]`}
      >
        {/* Corner Antique Filigree Accents */}
        <span className="absolute top-1 left-1.5 text-[9px] text-amber-500/70 pointer-events-none select-none">
          {currentTheme.flourish}
        </span>
        <span className="absolute top-1 right-1.5 text-[9px] text-amber-500/70 pointer-events-none select-none">
          {currentTheme.flourish}
        </span>
        <span className="absolute bottom-1 left-1.5 text-[9px] text-amber-500/70 pointer-events-none select-none">
          {currentTheme.flourish}
        </span>
        <span className="absolute bottom-1 right-1.5 text-[9px] text-amber-500/70 pointer-events-none select-none">
          {currentTheme.flourish}
        </span>

        {/* Heraldic Class Sigil / Portrait Avatar */}
        <ClassSigil characterClass={characterClass} size={size} />
      </div>

      {/* Class Tag below portrait */}
      <span className="block text-center mt-1.5 text-[11px] font-bold tracking-widest uppercase font-fantasy text-amber-400">
        {characterClass}
      </span>

      {/* Generate & Regenerate Portrait Buttons */}
      {onRegeneratePortrait && (
        <div className="flex items-center gap-1 mt-1.5 flex-wrap justify-center">
          <button
            onClick={() => {
              playClickSound();
              onRegeneratePortrait();
            }}
            id="generate-portrait-button"
            title="Generate a new portrait style"
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-stone-300 hover:text-amber-300 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 rounded-md transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span className="whitespace-nowrap">Generate Portrait</span>
          </button>
          <button
            onClick={() => {
              playClickSound();
              onRegeneratePortrait();
            }}
            id="regenerate-portrait-button"
            title="Regenerate portrait frame & motif"
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-stone-400 hover:text-amber-300 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 rounded-md transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span className="whitespace-nowrap">Regenerate Portrait</span>
          </button>
        </div>
      )}
    </div>
  );
};
