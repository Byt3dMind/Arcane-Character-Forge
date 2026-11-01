import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_METAS, getStatModifier } from '../data/fantasyData';
import { CharacterPortrait } from './CharacterPortrait';
import { countSentences } from '../utils/backstoryGenerator';
import {
  Heart,
  Copy,
  Check,
  Shield,
  HeartPulse,
  Zap,
  Wind,
  Swords,
  Scroll,
  Sparkles,
  Download,
  Loader2,
  BookmarkPlus,
  Flame,
  Award
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface CharacterCardProps {
  character: FantasyCharacter;
  onSaveToDeck: () => void;
  isSavedInDeck: boolean;
  onRerollStats: () => void;
  onGenerateBackstory: () => void;
  isGeneratingBackstory: boolean;
  onRegeneratePortrait: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSaveToDeck,
  isSavedInDeck,
  onRerollStats,
  onGenerateBackstory,
  isGeneratingBackstory,
  onRegeneratePortrait
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'overview' | 'abilities' | 'lore'>('stats');

  const meta = CLASS_METAS[character.characterClass] || CLASS_METAS.Warrior;

  const copyCharacterSheet = async () => {
    playClickSound();
    const sheetText = `⚔️ ${character.name} ⚔️
Title: ${character.title}
Class: ${character.characterClass} (${meta.role})
Race: ${character.race} · Gender: ${character.gender} · Alignment: ${character.alignment}
Tier: ${character.tier} (Level ${character.level})

📊 Core Statistics:
Health: ${character.health}/150
Mana: ${character.mana}/100
Strength: ${character.strength}/100

📜 Backstory:
${character.lore.backstory}

🛡️ RPG Attributes & Vitals:
HP: ${character.vitals.hp} | AC: ${character.vitals.ac} | Speed: ${character.vitals.speed} | Initiative: ${character.vitals.initiative}
STR: ${character.stats.strength} | DEX: ${character.stats.dexterity} | CON: ${character.stats.constitution}
INT: ${character.stats.intelligence} | WIS: ${character.stats.wisdom} | CHA: ${character.stats.charisma}

🗡️ Equipment:
Weapon: ${character.equipment.weapon} (${character.equipment.weaponType})
Armor: ${character.equipment.armor}
Trinket: ${character.equipment.trinket}

Trait: "${character.lore.trait}"
Flaw: "${character.lore.flaw}"
Generated with Fantasy Character Generator`;

    try {
      await navigator.clipboard.writeText(sheetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const downloadJson = () => {
    playClickSound();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(character, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${character.name.toLowerCase().replace(/\s+/g, '_')}_player_card.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const statEntries: Array<{ label: string; key: keyof typeof character.stats }> = [
    { label: 'STR', key: 'strength' },
    { label: 'DEX', key: 'dexterity' },
    { label: 'CON', key: 'constitution' },
    { label: 'INT', key: 'intelligence' },
    { label: 'WIS', key: 'wisdom' },
    { label: 'CHA', key: 'charisma' }
  ];

  const sentenceCount = countSentences(character.lore.backstory);

  // Visual progress bar percentages for the 3 core stats (Health: 50-150, Mana: 20-100, Strength: 10-100)
  const healthPercent = Math.min(100, Math.max(0, Math.round(((character.health - 50) / (150 - 50)) * 100)));
  const manaPercent = Math.min(100, Math.max(0, Math.round(((character.mana - 20) / (100 - 20)) * 100)));
  const strengthPercent = Math.min(100, Math.max(0, Math.round(((character.strength - 10) / (100 - 10)) * 100)));

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl bg-stone-900/95 border-2 border-amber-600/70 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ring-2 ring-amber-500/25 ring-offset-2 ring-offset-stone-950">
      {/* Decorative Antique Brass Corner Plaques */}
      <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-amber-500/80 pointer-events-none select-none z-20 font-serif">
        <span>❖</span>
        <span className="w-6 h-[1px] bg-amber-500/40" />
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-amber-500/80 pointer-events-none select-none z-20 font-serif">
        <span className="w-6 h-[1px] bg-amber-500/40" />
        <span>❖</span>
      </div>
      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-amber-500/80 pointer-events-none select-none z-20 font-serif">
        <span>❖</span>
        <span className="w-6 h-[1px] bg-amber-500/40" />
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-amber-500/80 pointer-events-none select-none z-20 font-serif">
        <span className="w-6 h-[1px] bg-amber-500/40" />
        <span>❖</span>
      </div>

      {/* Dynamic Class Aura Gradient at top */}
      <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${meta.gradient} pointer-events-none opacity-40`} />

      {/* Player Card Top Banner */}
      <div className="relative pt-4 px-6 sm:px-8 flex items-center justify-between border-b border-stone-800/80 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold font-fantasy text-amber-400 tracking-widest uppercase">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Fantasy Player Card</span>
        </div>

        {/* Action Controls: Save to Deck, Copy, Export */}
        <div className="flex items-center gap-2">
          {/* Button with exact label "Save to Deck" */}
          <button
            onClick={() => {
              playClickSound();
              onSaveToDeck();
            }}
            id="save-to-deck-button"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold font-fantasy tracking-wider uppercase rounded-xl border transition-all cursor-pointer shadow-md ${
              isSavedInDeck
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                : 'bg-amber-500 text-stone-950 border-amber-400 hover:bg-amber-400 hover:shadow-amber-500/20 active:scale-95'
            }`}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span className="whitespace-nowrap">Save to Deck</span>
          </button>

          <button
            onClick={copyCharacterSheet}
            title="Copy character summary to clipboard"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-stone-800/80 border border-stone-700/60 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 whitespace-nowrap">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={downloadJson}
            title="Download JSON sheet"
            className="p-2 text-stone-400 hover:text-stone-100 bg-stone-800/80 border border-stone-700/60 rounded-xl hover:bg-stone-700/60 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Player Card Header: Portrait + Name & Class Lockup */}
      <div className="relative p-6 sm:p-8 border-b border-stone-800/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Character Portrait with Generate & Regenerate Portrait controls */}
          <div className="shrink-0 flex flex-col items-center">
            <CharacterPortrait
              characterClass={character.characterClass}
              characterName={character.name}
              variant={character.portraitVariant || 1}
              onRegeneratePortrait={onRegeneratePortrait}
              size={72}
            />
          </div>

          {/* Name & Class Presentation */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold font-fantasy">
                {character.title}
              </span>
              <span className="text-stone-600 text-xs" aria-hidden="true">·</span>
              <span className="text-xs text-stone-400 font-medium">
                Level {character.level} {character.tier}
              </span>
            </div>

            {/* Character Name clearly displayed */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-fantasy text-stone-100 tracking-tight leading-tight truncate">
              {character.name}
            </h2>

            {/* Character Class clearly displayed */}
            <div className="flex items-center gap-2 text-sm text-stone-400 flex-wrap pt-0.5">
              <span className={`font-bold font-fantasy tracking-wider ${meta.badgeText}`}>
                {character.characterClass}
              </span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span>{character.race}</span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span>{character.gender}</span>
              <span className="text-stone-600" aria-hidden="true">·</span>
              <span className="text-stone-300">{character.alignment}</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 italic pt-1 max-w-2xl">
              "{meta.tagline} — {meta.description}"
            </p>
          </div>
        </div>

        {/* Feature 2: The Three Statistics (Health, Mana, Strength) clearly displayed inside player card */}
        <div className="rounded-2xl bg-stone-950/90 border border-amber-600/40 p-4 sm:p-5 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider font-fantasy text-amber-300">
                Player Card Statistics
              </h3>
            </div>
            <span className="text-[11px] text-stone-500 font-mono">
              Attribute Ratings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Health Stat: Random integer between 50 and 150 */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-red-950 ring-1 ring-red-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 font-fantasy">
                  <HeartPulse className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Health</span>
                </div>
                <div className="text-xl font-black font-mono tabular-nums text-stone-100">
                  {character.health}
                  <span className="text-xs text-stone-500 font-normal ml-1">/ 150</span>
                </div>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-red-950">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-red-500 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${healthPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-stone-400 flex justify-between">
                <span>Min: 50</span>
                <span className="text-red-300 font-semibold">{healthPercent}% Vitality</span>
                <span>Max: 150</span>
              </div>
            </div>

            {/* Mana Stat: Random integer between 20 and 100 */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-cyan-950 ring-1 ring-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 font-fantasy">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Mana</span>
                </div>
                <div className="text-xl font-black font-mono tabular-nums text-stone-100">
                  {character.mana}
                  <span className="text-xs text-stone-500 font-normal ml-1">/ 100</span>
                </div>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-cyan-950">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${manaPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-stone-400 flex justify-between">
                <span>Min: 20</span>
                <span className="text-cyan-300 font-semibold">{manaPercent}% Aether</span>
                <span>Max: 100</span>
              </div>
            </div>

            {/* Strength Stat: Random integer between 10 and 100 */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-950 ring-1 ring-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 font-fantasy">
                  <Swords className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Strength</span>
                </div>
                <div className="text-xl font-black font-mono tabular-nums text-stone-100">
                  {character.strength}
                  <span className="text-xs text-stone-500 font-normal ml-1">/ 100</span>
                </div>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-amber-950">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-stone-400 flex justify-between">
                <span>Min: 10</span>
                <span className="text-amber-300 font-semibold">{strengthPercent}% Power</span>
                <span>Max: 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Character Backstory Showcase: Displayed clearly inside player card below name, class, portrait */}
        <div className="rounded-2xl bg-stone-950/90 border border-amber-600/40 p-4 sm:p-5 shadow-inner ring-1 ring-amber-500/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider font-fantasy text-amber-300">
                Character Backstory
              </span>
              <span className="text-[10px] text-stone-500 font-mono font-medium">
                ({sentenceCount} {sentenceCount === 1 ? 'sentence' : 'sentences'})
              </span>
            </div>

            {/* Button with exact label "Generate Backstory" */}
            <button
              onClick={() => {
                playClickSound();
                onGenerateBackstory();
              }}
              disabled={isGeneratingBackstory}
              id="generate-backstory-card-button"
              className="flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-bold font-fantasy tracking-wider uppercase text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 active:scale-98 border border-amber-500/60 hover:border-amber-400 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {isGeneratingBackstory ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Weaving Backstory...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Backstory</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-3 min-h-[3.25rem] flex items-center">
            {isGeneratingBackstory ? (
              <div className="flex items-center gap-3 py-1 text-amber-300 text-xs sm:text-sm animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                <span>
                  Consulting ancient scrolls to forge a new origin chronicle for <strong className="text-amber-200">{character.name}</strong> ({character.characterClass})...
                </span>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic font-serif">
                "{character.lore.backstory}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Stats & Vitals / Attributes & Gear / Abilities / Lore) */}
      <div className="flex items-center gap-2 px-6 sm:px-8 pt-4 pb-2 border-b border-stone-800 bg-stone-950/40">
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('stats');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-stone-800 text-stone-100 shadow-sm border border-stone-700/80'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Combat Vitals & Attributes
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('overview');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-stone-800 text-stone-100 shadow-sm border border-stone-700/80'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Equipment & Relics
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('abilities');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'abilities'
              ? 'bg-stone-800 text-stone-100 shadow-sm border border-stone-700/80'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Spells & Abilities ({character.abilities.length})
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('lore');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'lore'
              ? 'bg-stone-800 text-stone-100 shadow-sm border border-stone-700/80'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Lore & Personality
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Combat Vitals Quick Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-400">Armor Class</div>
                  <div className="text-sm font-bold font-mono text-stone-100">{character.vitals.ac}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <Zap className={`w-4 h-4 ${meta.badgeText} shrink-0`} />
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-400">{character.vitals.resourceName}</div>
                  <div className="text-sm font-bold font-mono text-stone-100">{character.vitals.resourceValue}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <Swords className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-400">Initiative</div>
                  <div className="text-sm font-bold font-mono text-stone-100">{character.vitals.initiative}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <Wind className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-400">Speed</div>
                  <div className="text-sm font-bold font-mono text-stone-100">{character.vitals.speed}</div>
                </div>
              </div>
            </div>

            {/* D&D 6-stat array */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-fantasy">
                  D&D Six-Attribute Array
                </h4>
                <button
                  onClick={onRerollStats}
                  className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reroll RPG stat array"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reroll Stat Array</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {statEntries.map(({ label, key }) => {
                  const val = character.stats[key];
                  const mod = getStatModifier(val);
                  const isPrimary = meta.primaryStat === key;
                  const isSecondary = meta.secondaryStat === key;

                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-xl bg-stone-950/70 border transition-all ${
                        isPrimary
                          ? `${meta.badgeBorder} ring-1 ring-amber-500/20`
                          : isSecondary
                          ? 'border-stone-700/80'
                          : 'border-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-400 tracking-wider">
                          {label}
                        </span>
                        {isPrimary && (
                          <span className="text-[9px] font-semibold uppercase text-amber-400 bg-amber-950/80 px-1 py-0.5 rounded">
                            Core
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1.5 my-1">
                        <span className="text-xl font-bold font-mono text-stone-100">
                          {val}
                        </span>
                        <span className={`text-xs font-semibold font-mono ${Number(mod) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {mod}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-fantasy">
              Equipment & Relics
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Primary Weapon ({character.equipment.weaponType})
                </div>
                <div className="text-sm font-semibold text-stone-200">
                  {character.equipment.weapon}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Attire & Armor
                </div>
                <div className="text-sm font-semibold text-stone-200">
                  {character.equipment.armor}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Relic / Trinket
                </div>
                <div className="text-sm font-semibold text-amber-300">
                  {character.equipment.trinket}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'abilities' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-fantasy">
              Signature Disciplines
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {character.abilities.map((ability, idx) => {
                const isUltimate = ability.type === 'Ultimate';
                const isPassive = ability.type === 'Passive';

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border bg-stone-950/70 space-y-1.5 transition-all ${
                      isUltimate
                        ? 'border-amber-500/40 bg-amber-950/10'
                        : isPassive
                        ? 'border-stone-800'
                        : `${meta.badgeBorder}`
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-100 font-fantasy">
                          {ability.name}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-md ${
                            isUltimate
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : isPassive
                              ? 'bg-stone-800 text-stone-300'
                              : 'bg-stone-800 text-indigo-300'
                          }`}
                        >
                          {ability.type}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-semibold text-stone-400">
                        {ability.cost}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {ability.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'lore' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-300 text-sm leading-relaxed space-y-2">
              <p>
                <strong className="text-stone-200">Origin:</strong> {character.lore.origin}
              </p>
              <p>
                <strong className="text-amber-400">Chronicle Backstory:</strong> {character.lore.backstory}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">
                  Personality Trait
                </span>
                <p className="text-xs text-stone-300">
                  "{character.lore.trait}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500">
                  Ideal / Motivation
                </span>
                <p className="text-xs text-stone-300">
                  {character.lore.ideal}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-red-400">
                  Fatal Flaw / Secret
                </span>
                <p className="text-xs text-stone-300">
                  "{character.lore.flaw}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
