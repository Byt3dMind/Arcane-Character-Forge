/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { FantasyCharacter, CharacterClass, GeneratorLocks } from './types/character';
import { generateCharacter } from './data/fantasyData';
import { generateCharacterBackstory } from './utils/backstoryGenerator';
import { CharacterCard } from './components/CharacterCard';
import { DeckCard } from './components/DeckCard';
import { GeneratorControls } from './components/GeneratorControls';
import { SavedRosterDrawer } from './components/SavedRosterDrawer';
import { ClassCodexModal } from './components/ClassCodexModal';
import {
  playGenerateSound,
  playClickSound,
  playSaveSound,
  isSoundEnabled,
  setSoundEnabled as saveSoundEnabled
} from './utils/audio';
import {
  Sparkles,
  BookOpen,
  Users,
  History,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Scroll,
  X,
  Download,
  BookmarkPlus
} from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter | null>(() => generateCharacter());
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClass | 'ANY'>('ANY');
  const [locks, setLocks] = useState<GeneratorLocks>({
    name: false,
    characterClass: false,
    race: false,
    stats: false
  });
  const [savedRoster, setSavedRoster] = useState<FantasyCharacter[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('fcg_saved_roster');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [recentHistory, setRecentHistory] = useState<FantasyCharacter[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [backstoryAlert, setBackstoryAlert] = useState<string | null>(null);
  const [saveStatusMessage, setSaveStatusMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(() => isSoundEnabled());

  // Save roster to localStorage whenever changed (preserving all saved characters)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fcg_saved_roster', JSON.stringify(savedRoster));
      } catch {
        // quota exceeded or private mode
      }
    }
  }, [savedRoster]);

  // Main generation handler: creates a new random character with random Health, Mana, Strength
  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setBackstoryAlert(null);
    setSaveStatusMessage(null);
    playGenerateSound();

    setTimeout(() => {
      // Keep previous character in history if exists
      if (character) {
        setRecentHistory((prev) => {
          const filtered = prev.filter((c) => c.id !== character.id);
          return [character, ...filtered].slice(0, 6);
        });
      }

      // Target class: filter selection takes precedence if chosen, or lock
      const targetCls = (character && locks.characterClass)
        ? character.characterClass
        : selectedClassFilter !== 'ANY'
        ? selectedClassFilter
        : undefined;

      const locksConfig = character ? {
        name: locks.name ? character.name : undefined,
        title: locks.name ? character.title : undefined,
        characterClass: locks.characterClass ? character.characterClass : undefined,
        race: locks.race ? character.race : undefined,
        stats: locks.stats ? character.stats : undefined,
        gender: locks.name ? character.gender : undefined,
        health: locks.stats ? character.health : undefined,
        mana: locks.stats ? character.mana : undefined,
        strength: locks.stats ? character.strength : undefined
      } : undefined;

      const newChar = generateCharacter(targetCls, locksConfig);
      setCharacter(newChar);
      setIsGenerating(false);

      // Celebrate Mythic Legend rolls with golden embers
      if (newChar.tier === 'Mythic Legend') {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#fbbf24', '#eab308', '#ffffff']
          });
        } catch {
          // ignore if canvas not supported
        }
      }
    }, 120);
  }, [character, locks, selectedClassFilter]);

  // Generate Backstory handler: does NOT change Health, Mana, or Strength stats
  const handleGenerateBackstory = useCallback(() => {
    if (!character) {
      setBackstoryAlert('Please generate a character first to forge their backstory.');
      setTimeout(() => setBackstoryAlert(null), 5000);
      return;
    }

    setBackstoryAlert(null);
    setIsGeneratingBackstory(true);
    playGenerateSound();

    setTimeout(() => {
      // Generate unique 1-2 sentence fantasy backstory based on currently displayed character's name and class
      const newBackstory = generateCharacterBackstory(
        character.name,
        character.characterClass,
        character.lore.backstory
      );

      setCharacter((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          // Stats remain strictly unchanged
          lore: {
            ...prev.lore,
            backstory: newBackstory
          }
        };
      });

      setIsGeneratingBackstory(false);
    }, 400);
  }, [character]);

  // Generate / Regenerate Portrait variant: does NOT change Health, Mana, or Strength stats
  const handleRegeneratePortrait = useCallback(() => {
    if (!character) return;
    playClickSound();
    setCharacter((prev) => {
      if (!prev) return null;
      const current = prev.portraitVariant || 1;
      let next = Math.floor(Math.random() * 6) + 1;
      if (next === current) {
        next = (current % 6) + 1;
      }
      return {
        ...prev,
        // Stats remain strictly unchanged
        portraitVariant: next
      };
    });
  }, [character]);

  // Feature 3: Save to Deck
  const handleSaveToDeck = useCallback(() => {
    if (!character) {
      setBackstoryAlert('Please generate a character first before saving to deck.');
      setTimeout(() => setBackstoryAlert(null), 4000);
      return;
    }

    // Prevent duplicate copies of the same character
    const isDuplicate = savedRoster.some(
      (c) => c.id === character.id || (
        c.name === character.name &&
        c.characterClass === character.characterClass &&
        c.health === character.health &&
        c.mana === character.mana &&
        c.strength === character.strength &&
        c.lore.backstory === character.lore.backstory
      )
    );

    if (isDuplicate) {
      playClickSound();
      setSaveStatusMessage({
        text: `"${character.name}" is already saved in My Deck!`,
        type: 'info'
      });
      setTimeout(() => setSaveStatusMessage(null), 4000);
      return;
    }

    // Save complete character without overwriting previously saved characters
    playSaveSound();
    const characterToSave = { ...character, isFavorite: true };
    setSavedRoster((prev) => [characterToSave, ...prev]);

    // Display a clear success message after saving
    setSaveStatusMessage({
      text: `✨ "${character.name}" the ${character.characterClass} has been saved to My Deck!`,
      type: 'success'
    });
    setTimeout(() => setSaveStatusMessage(null), 4500);
  }, [character, savedRoster]);

  // Reroll only the stats of the current character
  const handleRerollStats = useCallback(() => {
    if (!character) return;
    playGenerateSound();
    const updated = generateCharacter(character.characterClass, {
      name: character.name,
      title: character.title,
      characterClass: character.characterClass,
      race: character.race,
      gender: character.gender
    });
    setCharacter(updated);
  }, [character]);

  // Toggle lock on fields
  const handleToggleLock = useCallback((field: keyof GeneratorLocks) => {
    setLocks((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);

  // Delete from saved deck
  const handleDeleteFromRoster = useCallback((id: string) => {
    setSavedRoster((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Clear entire deck
  const handleClearRoster = useCallback(() => {
    setSavedRoster([]);
  }, []);

  // Export deck to JSON
  const exportPartyJson = useCallback(() => {
    playClickSound();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedRoster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fantasy_deck_${savedRoster.length}_cards.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [savedRoster]);

  // Toggle sound
  const handleToggleSound = useCallback(() => {
    const nextVal = !soundEnabled;
    setSoundEnabledState(nextVal);
    saveSoundEnabled(nextVal);
    if (nextVal) {
      playClickSound();
    }
  }, [soundEnabled]);

  // Keyboard shortcut listener: Spacebar to trigger generation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'BUTTON'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const isCurrentSaved = character ? savedRoster.some((c) => c.id === character.id) : false;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Background Decorative Ambient Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950/80 to-stone-950 -z-10" />

      {/* Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full bg-stone-950/90 border-b border-stone-800/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Wordmark in Display Font */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-fantasy tracking-wide text-stone-100 whitespace-nowrap shrink-0">
              Fantasy Character Generator
            </h1>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            <a
              href="#my-deck-section"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span>My Deck</span>
              {savedRoster.length > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  {savedRoster.length}
                </span>
              )}
            </a>

            <button
              onClick={() => {
                playClickSound();
                setIsCodexOpen(true);
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>Class Codex</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setSelectedClassFilter('ANY');
                handleGenerate();
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>Quick Random</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action "Generate Character" */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleSaveToDeck}
              title="Save current character to My Deck"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-fantasy text-amber-300 hover:text-amber-200 bg-stone-900 border border-amber-500/40 rounded-lg cursor-pointer"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save to Deck</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 text-xs font-bold font-fantasy uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Generate Character
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Page Hero Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-stone-400 uppercase tracking-widest font-semibold font-fantasy">
            <span>Fantasy Player Cards</span>
            <span aria-hidden="true">·</span>
            <span>Health · Mana · Strength</span>
            <span aria-hidden="true">·</span>
            <span>My Deck</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-fantasy text-stone-100 tracking-tight text-balance">
            Fantasy Character Generator
          </h2>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed text-balance">
            Forge heroes into ornate fantasy player cards with randomized Health (50–150), Mana (20–100), and Strength (10–100). Save your favorite champions into your persistent deck.
          </p>
        </div>

        {/* Success or Alert Notification Banner */}
        {saveStatusMessage && (
          <div
            className={`w-full max-w-4xl mx-auto p-4 rounded-xl text-sm font-medium flex items-center justify-between gap-3 shadow-xl ring-1 animate-in fade-in slide-in-from-top-2 duration-200 ${
              saveStatusMessage.type === 'success'
                ? 'bg-amber-950/90 border border-amber-400 text-amber-200 ring-amber-500/40'
                : 'bg-stone-900/90 border border-stone-700 text-stone-200 ring-stone-600/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{saveStatusMessage.text}</span>
            </div>
            <button
              onClick={() => setSaveStatusMessage(null)}
              className="text-amber-400 hover:text-amber-200 p-1 transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Backstory Alert Banner */}
        {backstoryAlert && (
          <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-amber-950/80 border border-amber-500/70 text-amber-200 text-sm font-medium flex items-center justify-between gap-3 shadow-xl ring-1 ring-amber-500/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{backstoryAlert}</span>
            </div>
            <button
              onClick={() => setBackstoryAlert(null)}
              className="text-amber-400 hover:text-amber-200 p-1 transition-colors cursor-pointer"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Generator Controls & Class Filters */}
        <GeneratorControls
          onGenerate={handleGenerate}
          onGenerateBackstory={handleGenerateBackstory}
          isGeneratingBackstory={isGeneratingBackstory}
          onSaveToDeck={handleSaveToDeck}
          selectedClassFilter={selectedClassFilter}
          onSelectClassFilter={setSelectedClassFilter}
          locks={locks}
          onToggleLock={handleToggleLock}
          isGenerating={isGenerating}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          hasCharacter={character !== null}
        />

        {/* Feature 1 & Feature 2: Fantasy Player Card Display */}
        <div className="pt-2">
          {character ? (
            <CharacterCard
              character={character}
              onSaveToDeck={handleSaveToDeck}
              isSavedInDeck={isCurrentSaved}
              onRerollStats={handleRerollStats}
              onGenerateBackstory={handleGenerateBackstory}
              isGeneratingBackstory={isGeneratingBackstory}
              onRegeneratePortrait={handleRegeneratePortrait}
            />
          ) : (
            <div className="w-full max-w-4xl mx-auto rounded-3xl bg-stone-900/95 border-2 border-amber-600/60 p-8 sm:p-12 text-center space-y-4 shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
                <Scroll className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-fantasy text-stone-100">
                No Character Currently Generated
              </h3>
              <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                Please generate a character first to view their player card, portrait, stats (Health, Mana, Strength), and backstory.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 text-xs sm:text-sm font-bold font-fantasy uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                >
                  Generate Character
                </button>
                <button
                  onClick={handleGenerateBackstory}
                  className="px-6 py-3 text-xs sm:text-sm font-bold font-fantasy text-amber-200 bg-stone-900 hover:bg-stone-800 active:scale-95 border border-amber-500/50 hover:border-amber-400 rounded-xl transition-all cursor-pointer"
                >
                  Generate Backstory
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature 4: "My Deck" Section displayed directly on the screen */}
        <section id="my-deck-section" aria-labelledby="my-deck-heading" className="w-full max-w-6xl mx-auto pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-amber-600/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                {/* Exact heading "My Deck" */}
                <h2 id="my-deck-heading" className="text-2xl sm:text-3xl font-black font-fantasy text-amber-200 tracking-wide">
                  My Deck
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  {savedRoster.length} {savedRoster.length === 1 ? 'saved character card' : 'saved character cards'} in your deck
                </p>
              </div>
            </div>

            {savedRoster.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={exportPartyJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Deck</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Clear all saved characters from My Deck?')) {
                      handleClearRoster();
                    }
                  }}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Clear Deck
                </button>
              </div>
            )}
          </div>

          {savedRoster.length === 0 ? (
            <div className="rounded-2xl bg-stone-900/60 border border-amber-600/20 p-8 sm:p-12 text-center space-y-3">
              <Users className="w-12 h-12 text-stone-600 mx-auto stroke-[1.5]" />
              <h3 className="text-base font-bold font-fantasy text-stone-200">
                Your Deck is Empty
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Click the <strong className="text-amber-400">"Save to Deck"</strong> button on any generated character above to store them here. Previously saved cards will remain visible when generating new characters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedRoster.map((savedChar) => (
                <DeckCard
                  key={savedChar.id}
                  character={savedChar}
                  onSelect={(char) => {
                    setCharacter(char);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  onDelete={handleDeleteFromRoster}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recent Roll Rollback Tray */}
        {recentHistory.length > 0 && (
          <div className="pt-4 border-t border-stone-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
              <History className="w-3.5 h-3.5" />
              <span>Recent Rolls</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {recentHistory.map((prevChar) => (
                <button
                  key={prevChar.id}
                  onClick={() => {
                    playClickSound();
                    setCharacter(prevChar);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 hover:text-amber-400 transition-colors shrink-0 cursor-pointer"
                >
                  <span className="font-fantasy font-semibold">{prevChar.name}</span>
                  <span className="text-[11px] text-stone-500 font-mono">({prevChar.characterClass})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-800/80 bg-stone-950/80 py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <span className="font-fantasy font-bold text-stone-400">Fantasy Character Generator</span>
            <span aria-hidden="true">·</span>
            <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 font-mono text-[10px]">Space</kbd> to roll anytime</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playClickSound();
                setIsCodexOpen(true);
              }}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Class Lore Codex
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="#my-deck-section"
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              My Deck ({savedRoster.length})
            </a>
          </div>
        </div>
      </footer>

      {/* Slide-out My Deck Drawer */}
      <SavedRosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        savedCharacters={savedRoster}
        onSelectCharacter={(char) => setCharacter(char)}
        onDeleteCharacter={handleDeleteFromRoster}
        onClearAll={handleClearRoster}
      />

      {/* Class Codex Modal */}
      <ClassCodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        onSelectClassToRoll={(cls) => {
          setSelectedClassFilter(cls);
          const updated = generateCharacter(cls, {
            name: (character && locks.name) ? character.name : undefined,
            title: (character && locks.name) ? character.title : undefined,
            race: (character && locks.race) ? character.race : undefined,
            stats: (character && locks.stats) ? character.stats : undefined,
            health: (character && locks.stats) ? character.health : undefined,
            mana: (character && locks.stats) ? character.mana : undefined,
            strength: (character && locks.stats) ? character.strength : undefined
          });
          setCharacter(updated);
        }}
      />
    </div>
  );
}
