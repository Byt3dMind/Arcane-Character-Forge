import React from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_METAS } from '../data/fantasyData';
import { CharacterPortrait } from './CharacterPortrait';
import { HeartPulse, Zap, Swords, Trash2, ArrowUpRight, Scroll } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface DeckCardProps {
  character: FantasyCharacter;
  onSelect: (char: FantasyCharacter) => void;
  onDelete: (id: string) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  character,
  onSelect,
  onDelete
}) => {
  const meta = CLASS_METAS[character.characterClass] || CLASS_METAS.Warrior;

  // Percentage calculations for visual progress bars
  const healthPercent = Math.min(100, Math.max(0, Math.round(((character.health - 50) / (150 - 50)) * 100)));
  const manaPercent = Math.min(100, Math.max(0, Math.round(((character.mana - 20) / (100 - 20)) * 100)));
  const strengthPercent = Math.min(100, Math.max(0, Math.round(((character.strength - 10) / (100 - 10)) * 100)));

  return (
    <div className="relative rounded-xl bg-stone-900/95 border-2 border-amber-600/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-amber-400 hover:shadow-amber-500/10 hover:-translate-y-0.5 ring-1 ring-amber-500/20">
      {/* Antique Gold Corner Ornaments */}
      <span className="absolute top-1 left-1.5 text-[8px] text-amber-500/70 select-none pointer-events-none">✦</span>
      <span className="absolute top-1 right-1.5 text-[8px] text-amber-500/70 select-none pointer-events-none">✦</span>
      <span className="absolute bottom-1 left-1.5 text-[8px] text-amber-500/70 select-none pointer-events-none">✦</span>
      <span className="absolute bottom-1 right-1.5 text-[8px] text-amber-500/70 select-none pointer-events-none">✦</span>

      {/* Top Banner with Class Aura */}
      <div className={`p-4 pb-3 border-b border-stone-800 bg-gradient-to-b ${meta.gradient}`}>
        <div className="flex items-start gap-3">
          {/* Portrait */}
          <div className="shrink-0">
            <CharacterPortrait
              characterClass={character.characterClass}
              characterName={character.name}
              variant={character.portraitVariant || 1}
              size={48}
            />
          </div>

          {/* Name & Class */}
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-fantasy truncate">
              {character.title}
            </div>
            <h3 className="text-lg font-bold font-fantasy text-stone-100 truncate leading-snug">
              {character.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-0.5">
              <span className={`font-semibold ${meta.badgeText}`}>{character.characterClass}</span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span className="truncate">{character.race}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body: Backstory & Stats */}
      <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
        {/* Backstory */}
        <div className="rounded-lg bg-stone-950/70 border border-stone-800 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400/90 font-fantasy mb-1">
            <Scroll className="w-3 h-3 text-amber-400" />
            <span>Origin Backstory</span>
          </div>
          <p className="text-xs text-stone-300 italic font-serif leading-relaxed line-clamp-3">
            "{character.lore.backstory}"
          </p>
        </div>

        {/* The Three Statistics: Health, Mana, Strength */}
        <div className="space-y-2 pt-1 border-t border-stone-800/70">
          <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-fantasy">
            Statistics
          </div>

          {/* Health */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-red-400 font-semibold">
                <HeartPulse className="w-3 h-3" />
                <span>Health</span>
              </span>
              <span className="font-mono font-bold text-stone-200 tabular-nums">
                {character.health} <span className="text-[10px] text-stone-500 font-normal">/ 150</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* Mana */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <Zap className="w-3 h-3" />
                <span>Mana</span>
              </span>
              <span className="font-mono font-bold text-stone-200 tabular-nums">
                {character.mana} <span className="text-[10px] text-stone-500 font-normal">/ 100</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                style={{ width: `${manaPercent}%` }}
              />
            </div>
          </div>

          {/* Strength */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Swords className="w-3 h-3" />
                <span>Strength</span>
              </span>
              <span className="font-mono font-bold text-stone-200 tabular-nums">
                {character.strength} <span className="text-[10px] text-stone-500 font-normal">/ 100</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                style={{ width: `${strengthPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-800/80">
          <button
            onClick={() => {
              playClickSound();
              onSelect(character);
            }}
            title="Load this character as active player card"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 text-xs font-semibold text-stone-200 hover:text-amber-300 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Load Card</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onDelete(character.id);
            }}
            title="Remove from My Deck"
            className="p-1.5 text-stone-400 hover:text-red-400 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
