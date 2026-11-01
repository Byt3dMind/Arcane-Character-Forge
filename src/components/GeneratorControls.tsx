import React from 'react';
import { CharacterClass, GeneratorLocks } from '../types/character';
import { CORE_CLASSES, CLASS_METAS } from '../data/fantasyData';
import {
  Sparkles,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Scroll,
  Loader2
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface GeneratorControlsProps {
  onGenerate: () => void;
  onGenerateBackstory: () => void;
  isGeneratingBackstory: boolean;
  onSaveToDeck?: () => void;
  selectedClassFilter: CharacterClass | 'ANY';
  onSelectClassFilter: (cls: CharacterClass | 'ANY') => void;
  locks: GeneratorLocks;
  onToggleLock: (key: keyof GeneratorLocks) => void;
  isGenerating: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hasCharacter: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  onGenerateBackstory,
  isGeneratingBackstory,
  onSaveToDeck,
  selectedClassFilter,
  onSelectClassFilter,
  locks,
  onToggleLock,
  isGenerating,
  soundEnabled,
  onToggleSound,
  hasCharacter
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Primary Action Zone: "Generate Character", "Generate Backstory", "Save to Deck" */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        {/* Main "Generate Character" Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          id="generate-character-button"
          className="w-full sm:w-auto relative group flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold font-fantasy text-stone-900 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:via-amber-200 hover:to-amber-400 active:scale-[0.98] rounded-xl shadow-lg shadow-amber-500/25 border border-amber-300 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <Sparkles className={`w-5 h-5 text-stone-900 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
          <span className="tracking-wider uppercase whitespace-nowrap">
            Generate Character
          </span>
          <span className="hidden md:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono-nums font-semibold bg-stone-900/20 text-stone-900 rounded">
            Space
          </span>
        </button>

        {/* Clearly visible "Generate Backstory" button */}
        <button
          onClick={onGenerateBackstory}
          disabled={isGeneratingBackstory}
          id="generate-backstory-button"
          title={hasCharacter ? 'Generate a new 1-2 sentence origin backstory' : 'Please generate a character first'}
          className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-bold font-fantasy text-amber-200 bg-stone-900/90 hover:bg-stone-800/90 active:scale-[0.98] rounded-xl shadow-md border border-amber-500/50 hover:border-amber-400 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isGeneratingBackstory ? (
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
          ) : (
            <Scroll className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
          )}
          <span className="tracking-wider uppercase whitespace-nowrap">
            Generate Backstory
          </span>
        </button>

        {/* Save to Deck button */}
        {onSaveToDeck && (
          <button
            onClick={onSaveToDeck}
            id="controls-save-to-deck-button"
            title={hasCharacter ? 'Save active character card to My Deck' : 'Please generate a character first'}
            className="w-full sm:w-auto relative group flex items-center justify-center gap-2 px-5 py-4 text-sm sm:text-base font-bold font-fantasy text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] rounded-xl shadow-md border border-amber-300 transition-all duration-200 cursor-pointer"
          >
            <span className="tracking-wider uppercase whitespace-nowrap">
              Save to Deck
            </span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className="p-3.5 text-stone-400 hover:text-amber-400 bg-stone-900/80 border border-stone-800 rounded-xl hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-stone-500" />}
        </button>
      </div>

      {/* Class Filtering Segmented Controls */}
      <div className="bg-stone-900/70 border border-stone-800/80 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Class Filter
          </span>
          <span className="text-[11px] text-stone-500">
            {selectedClassFilter === 'ANY' ? 'Rolling from all classes' : `Locked to ${selectedClassFilter}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              playClickSound();
              onSelectClassFilter('ANY');
            }}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 whitespace-nowrap ${
              selectedClassFilter === 'ANY'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 bg-stone-950/60 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            All Classes (Random)
          </button>

          {CORE_CLASSES.map((cls) => {
            const isSelected = selectedClassFilter === cls;
            const meta = CLASS_METAS[cls];

            return (
              <button
                key={cls}
                onClick={() => {
                  playClickSound();
                  onSelectClassFilter(cls);
                }}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  isSelected
                    ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} font-bold shadow-sm ring-1 ring-amber-500/30`
                    : 'text-stone-300 bg-stone-950/60 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Attribute Locks (Lock Name, Class, Race, Stats) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
        <span className="text-stone-500 font-medium mr-1 text-[11px] uppercase tracking-wider">
          Pin Fields:
        </span>

        <button
          onClick={() => {
            playClickSound();
            onToggleLock('name');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
            locks.name
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-300 font-semibold'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {locks.name ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>Lock Name</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onToggleLock('characterClass');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
            locks.characterClass
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-300 font-semibold'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {locks.characterClass ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>Lock Class</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onToggleLock('race');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
            locks.race
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-300 font-semibold'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {locks.race ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>Lock Race</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onToggleLock('stats');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
            locks.stats
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-300 font-semibold'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {locks.stats ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>Lock Stats</span>
        </button>
      </div>
    </div>
  );
};
