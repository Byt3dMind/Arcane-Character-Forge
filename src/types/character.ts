export type StandardClass = 'Mage' | 'Warrior' | 'Rogue' | 'Archer' | 'Paladin' | 'Necromancer';

export type CharacterClass = StandardClass | 'Druid' | 'Berserker' | 'Bard' | 'Cleric';

export type CharacterTier = 'Novice Adventurer' | 'Hardened Veteran' | 'Master Hero' | 'Mythic Legend';

export type Gender = 'Male' | 'Female' | 'Non-binary';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterVitals {
  hp: number;
  maxHp: number;
  ac: number;
  resourceName: string;
  resourceValue: number;
  speed: string;
  initiative: string;
}

export interface CharacterEquipment {
  weapon: string;
  weaponType: string;
  armor: string;
  trinket: string;
}

export interface CharacterAbility {
  name: string;
  type: 'Passive' | 'Action' | 'Ultimate';
  cost: string;
  description: string;
}

export interface CharacterLore {
  origin: string;
  backstory: string;
  trait: string;
  ideal: string;
  flaw: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: string;
  gender: Gender;
  alignment: string;
  tier: CharacterTier;
  level: number;
  health: number;
  mana: number;
  strength: number;
  stats: CharacterStats;
  vitals: CharacterVitals;
  equipment: CharacterEquipment;
  abilities: CharacterAbility[];
  lore: CharacterLore;
  portraitVariant?: number;
  createdAt: number;
  isFavorite?: boolean;
}

export interface GeneratorLocks {
  name: boolean;
  characterClass: boolean;
  race: boolean;
  stats: boolean;
}
