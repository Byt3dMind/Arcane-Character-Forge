import React from 'react';
import { CORE_CLASSES, CLASS_METAS } from '../data/fantasyData';
import { CharacterClass } from '../types/character';
import { ClassSigil } from './ClassSigil';
import { X, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface ClassCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClassToRoll: (cls: CharacterClass) => void;
}

export const ClassCodexModal: React.FC<ClassCodexModalProps> = ({
  isOpen,
  onClose,
  onSelectClassToRoll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950/80">
          <div>
            <h2 className="text-xl font-bold font-fantasy text-stone-100">
              Codex of Classes
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Explore the archetypes of the realm and their combat masteries.
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2 text-stone-400 hover:text-stone-100 bg-stone-800/80 border border-stone-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_CLASSES.map((cls) => {
              const meta = CLASS_METAS[cls];

              return (
                <div
                  key={cls}
                  className={`p-4 rounded-xl border bg-stone-950/60 ${meta.badgeBorder} space-y-3 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 shrink-0">
                        <ClassSigil characterClass={cls} size={36} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-fantasy text-stone-100">
                          {cls}
                        </h3>
                        <div className={`text-xs font-semibold ${meta.badgeText}`}>
                          {meta.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                      {meta.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-stone-800/80 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-stone-500 font-semibold block text-[10px] uppercase">
                          Primary Stat
                        </span>
                        <span className="text-stone-200 capitalize font-medium">
                          {meta.primaryStat}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 font-semibold block text-[10px] uppercase">
                          Resource
                        </span>
                        <span className="text-stone-200 font-medium">
                          {meta.resourceName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectClassToRoll(cls);
                      onClose();
                    }}
                    className={`w-full mt-2 py-2 text-xs font-semibold rounded-lg border transition-all ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText} hover:brightness-125 text-center`}
                  >
                    Generate {cls}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
