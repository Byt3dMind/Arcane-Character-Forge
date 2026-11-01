import React from 'react';
import { CharacterClass } from '../types/character';

interface ClassSigilProps {
  characterClass: CharacterClass;
  className?: string;
  size?: number;
}

export const ClassSigil: React.FC<ClassSigilProps> = ({
  characterClass,
  className = '',
  size = 64
}) => {
  switch (characterClass) {
    case 'Mage':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Outer Mystic Circle */}
          <circle cx="50" cy="50" r="44" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="38" stroke="#a5b4fc" strokeWidth="1.5" />
          {/* Arcane Star Polygons */}
          <polygon
            points="50,14 62,38 88,38 68,54 75,78 50,64 25,78 32,54 12,38 38,38"
            stroke="#c7d2fe"
            strokeWidth="1.5"
            fill="rgba(99, 102, 241, 0.15)"
          />
          {/* Central Eye / Orb of Knowledge */}
          <circle cx="50" cy="50" r="14" fill="#4338ca" stroke="#e0e7ff" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#a5b4fc" />
          <circle cx="52" cy="48" r="2" fill="#ffffff" />
          {/* Mystic Rays */}
          <line x1="50" y1="6" x2="50" y2="16" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="84" x2="50" y2="94" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="50" x2="16" y2="50" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="84" y1="50" x2="94" y2="50" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'Warrior':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Shield Outline */}
          <path
            d="M50 10 L84 22 C84 60 50 88 50 88 C50 88 16 60 16 22 Z"
            fill="rgba(185, 28, 28, 0.2)"
            stroke="#f87171"
            strokeWidth="2.5"
          />
          {/* Inner Crest Lines */}
          <path
            d="M50 18 L76 28 C76 56 50 78 50 78 C50 78 24 56 24 28 Z"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Crossed Broadswords */}
          {/* Sword 1: Top-Left to Bottom-Right */}
          <line x1="30" y1="30" x2="70" y2="70" stroke="#fecaca" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="26" y1="36" x2="36" y2="26" stroke="#f87171" strokeWidth="3" />
          <line x1="22" y1="22" x2="28" y2="28" stroke="#dc2626" strokeWidth="4" />
          {/* Sword 2: Top-Right to Bottom-Left */}
          <line x1="70" y1="30" x2="30" y2="70" stroke="#fecaca" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="74" y1="36" x2="64" y2="26" stroke="#f87171" strokeWidth="3" />
          <line x1="78" y1="22" x2="72" y2="28" stroke="#dc2626" strokeWidth="4" />
          {/* Shield Boss Center */}
          <circle cx="50" cy="50" r="8" fill="#991b1b" stroke="#fca5a5" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="#ffffff" />
        </svg>
      );

    case 'Rogue':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Shadow Diamond */}
          <polygon
            points="50,8 88,50 50,92 12,50"
            fill="rgba(5, 150, 105, 0.15)"
            stroke="#34d399"
            strokeWidth="2"
          />
          <polygon
            points="50,18 78,50 50,82 22,50"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          {/* Twin Curved Daggers */}
          <path
            d="M36 28 C42 40 54 48 64 62"
            stroke="#a7f3d0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M64 28 C58 40 46 48 36 62"
            stroke="#a7f3d0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Dagger Guards & Pommels */}
          <line x1="30" y1="26" x2="40" y2="34" stroke="#059669" strokeWidth="2.5" />
          <line x1="70" y1="26" x2="60" y2="34" stroke="#059669" strokeWidth="2.5" />
          {/* Lethal Venom Drop */}
          <path
            d="M50 44 C46 52 46 60 50 64 C54 60 54 52 50 44 Z"
            fill="#34d399"
          />
          <circle cx="50" cy="72" r="3" fill="#10b981" />
        </svg>
      );

    case 'Archer':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Recurve Bow Curve */}
          <path
            d="M32 18 Q68 50 32 82"
            stroke="#2dd4bf"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bowstring */}
          <line x1="32" y1="18" x2="32" y2="82" stroke="#99f6e4" strokeWidth="1.5" strokeDasharray="3 1" />
          {/* Loaded Arrow */}
          <line x1="20" y1="50" x2="80" y2="50" stroke="#f0fdfa" strokeWidth="3" strokeLinecap="round" />
          {/* Arrowhead */}
          <polygon points="80,44 94,50 80,56" fill="#2dd4bf" stroke="#ccfbf1" strokeWidth="1.5" />
          {/* Fletching */}
          <line x1="24" y1="44" x2="20" y2="50" stroke="#14b8a6" strokeWidth="2.5" />
          <line x1="24" y1="56" x2="20" y2="50" stroke="#14b8a6" strokeWidth="2.5" />
          <line x1="28" y1="44" x2="24" y2="50" stroke="#14b8a6" strokeWidth="2.5" />
          <line x1="28" y1="56" x2="24" y2="50" stroke="#14b8a6" strokeWidth="2.5" />
          {/* Sylvan Circular Border */}
          <circle cx="50" cy="50" r="42" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="6 3" />
        </svg>
      );

    case 'Paladin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Solar Radiance Rays */}
          <circle cx="50" cy="50" r="44" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 4" />
          <polygon
            points="50,8 54,22 66,14 62,28 78,26 68,38 84,44 72,52 84,62 68,66 76,80 62,76 64,90 50,82 36,90 38,76 24,80 32,66 16,62 28,52 16,44 32,38 22,26 38,28 34,14 46,22"
            fill="rgba(245, 158, 11, 0.15)"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          {/* Sacred Cross */}
          <path
            d="M44 26 H56 V44 H74 V56 H56 V84 H44 V56 H26 V44 H44 Z"
            fill="#d97706"
            stroke="#fef3c7"
            strokeWidth="2"
          />
          {/* Center Gem */}
          <circle cx="50" cy="50" r="5" fill="#fef08a" stroke="#b45309" strokeWidth="1.5" />
        </svg>
      );

    case 'Necromancer':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Nether Flame Aura */}
          <circle cx="50" cy="50" r="44" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Skull Outline */}
          <path
            d="M28 44 C28 26 72 26 72 44 C72 56 66 60 66 70 H34 C34 60 28 56 28 44 Z"
            fill="rgba(147, 51, 234, 0.25)"
            stroke="#e9d5ff"
            strokeWidth="2.5"
          />
          {/* Hollow Eye Sockets */}
          <circle cx="41" cy="45" r="6" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="59" cy="45" r="6" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="41" cy="45" r="2" fill="#3b0764" />
          <circle cx="59" cy="45" r="2" fill="#3b0764" />
          {/* Nasal Cavity */}
          <polygon points="50,53 47,60 53,60" fill="#581c87" />
          {/* Teeth */}
          <path d="M40 70 V78 M46 70 V78 M54 70 V78 M60 70 V78" stroke="#e9d5ff" strokeWidth="2" />
          {/* Horned / Crown Spikes */}
          <path d="M26 30 L34 38 M74 30 L66 38 M50 16 L50 28" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      // Generic Crown / Heraldic Crest
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          <circle cx="50" cy="50" r="42" stroke="#d97706" strokeWidth="2" />
          <path
            d="M24 64 L20 36 L36 50 L50 30 L64 50 L80 36 L76 64 Z"
            fill="rgba(217, 119, 6, 0.2)"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <circle cx="50" cy="54" r="5" fill="#f59e0b" />
        </svg>
      );
  }
};
