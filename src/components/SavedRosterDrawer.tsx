import React from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_METAS } from '../data/fantasyData';
import { ClassSigil } from './ClassSigil';
import { X, Trash2, ArrowUpRight, Download, Users } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SavedRosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCharacters: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  onClearAll: () => void;
}

export const SavedRosterDrawer: React.FC<SavedRosterDrawerProps> = ({
  isOpen,
  onClose,
  savedCharacters,
  onSelectCharacter,
  onDeleteCharacter,
  onClearAll
}) => {
  if (!isOpen) return null;

  const exportPartyJson = () => {
    playClickSound();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedCharacters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fantasy_roster_${savedCharacters.length}_characters.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold font-fantasy text-stone-100">
                My Deck
              </h2>
              <span className="text-xs text-stone-400">
                {savedCharacters.length} {savedCharacters.length === 1 ? 'character' : 'characters'} in deck
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedCharacters.length > 0 && (
              <button
                onClick={exportPartyJson}
                title="Export deck to JSON"
                className="p-2 text-stone-400 hover:text-amber-400 bg-stone-800/80 border border-stone-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 text-stone-400 hover:text-stone-100 bg-stone-800/80 border border-stone-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedCharacters.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <Users className="w-12 h-12 text-stone-600 mb-3 stroke-[1.5]" />
              <p className="text-sm font-semibold text-stone-300">Your deck is empty</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Click the "Save to Deck" heart button on any generated hero to store them here.
              </p>
            </div>
          ) : (
            savedCharacters.map((char) => {
              const meta = CLASS_METAS[char.characterClass] || CLASS_METAS.Warrior;

              return (
                <div
                  key={char.id}
                  className="group relative p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 shrink-0">
                      <ClassSigil characterClass={char.characterClass} size={32} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold font-fantasy text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                        {char.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-400 truncate">
                        <span className={`font-semibold ${meta.badgeText}`}>{char.characterClass}</span>
                        <span className="text-stone-600" aria-hidden="true">·</span>
                        <span className="truncate">{char.race}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5 font-mono">
                        HP: {char.health} · MP: {char.mana} · STR: {char.strength}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        playClickSound();
                        onSelectCharacter(char);
                        onClose();
                      }}
                      title="Load character onto main sheet"
                      className="p-2 rounded-lg bg-stone-800/90 text-stone-300 hover:text-amber-400 hover:bg-stone-700/80 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        onDeleteCharacter(char.id);
                      }}
                      title="Delete from deck"
                      className="p-2 rounded-lg bg-stone-800/90 text-stone-400 hover:text-red-400 hover:bg-stone-700/80 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {savedCharacters.length > 0 && (
          <div className="p-4 border-t border-stone-800 bg-stone-950/70 flex items-center justify-between">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your entire deck?')) {
                  playClickSound();
                  onClearAll();
                }
              }}
              className="text-xs text-red-400/80 hover:text-red-300 transition-colors"
            >
              Clear Entire Deck
            </button>

            <span className="text-[11px] text-stone-500">
              Stored locally
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
