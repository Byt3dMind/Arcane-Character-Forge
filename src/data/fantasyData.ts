import {
  CharacterClass,
  CharacterStats,
  CharacterVitals,
  CharacterEquipment,
  CharacterAbility,
  CharacterLore,
  FantasyCharacter,
  Gender,
  CharacterTier
} from '../types/character';
import { generateCharacterBackstory } from '../utils/backstoryGenerator';

export interface ClassMeta {
  name: CharacterClass;
  tagline: string;
  role: string;
  description: string;
  primaryStat: keyof CharacterStats;
  secondaryStat: keyof CharacterStats;
  hitDie: number;
  armorBaseline: number;
  resourceName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  gradient: string;
  weapons: string[];
  weaponTypes: string[];
  armors: string[];
  trinkets: string[];
  abilities: CharacterAbility[];
}

export const CLASS_METAS: Record<CharacterClass, ClassMeta> = {
  Mage: {
    name: 'Mage',
    tagline: 'Weaver of Arcane Paradoxes',
    role: 'Spellcaster & Elemental Sage',
    description: 'Masters of reality-bending sorcery, channeling cosmic leylines to incinerate foes, erect barrier shields, and manipulate time.',
    primaryStat: 'intelligence',
    secondaryStat: 'wisdom',
    hitDie: 6,
    armorBaseline: 11,
    resourceName: 'Mana',
    badgeBg: 'bg-indigo-950/60',
    badgeBorder: 'border-indigo-500/40',
    badgeText: 'text-indigo-400',
    glowColor: 'shadow-indigo-500/20',
    gradient: 'from-indigo-900/40 via-purple-950/20 to-transparent',
    weapons: [
      'Stave of the Astral Eclipse',
      'Ornate Spirewood Wand of Glacial Shards',
      'Crystal Conduit Scepter of Leyline Resonance',
      'Twisted Chronomancer Focus'
    ],
    weaponTypes: ['Arcane Focus', 'Enchanted Staff', 'Channeling Wand'],
    armors: [
      'Silken Robes of the Starlit Spire',
      'Runed Linen Vestments of Spellweaving',
      'Astral Mantle of Prismatic Wards'
    ],
    trinkets: [
      'Amulet of Frozen Chrono-Essence',
      'Tome of Forbidden Theorems',
      'Pendant of the Singing Leyline'
    ],
    abilities: [
      {
        name: 'Arcane Nova',
        type: 'Action',
        cost: '25 Mana',
        description: 'Discharges an expansive ring of prismatic force, devastating nearby enemies and destabilizing magical defenses.'
      },
      {
        name: 'Aetheric Ward',
        type: 'Passive',
        cost: 'Passive',
        description: 'Surrounds the caster with crystalline barrier runes that absorb incoming kinetic and elemental shock.'
      },
      {
        name: 'Temporal Rupture',
        type: 'Ultimate',
        cost: '60 Mana',
        description: 'Tears a localized fissure in time, freezing targets in stasis while cascading meteor fire onto the epicenter.'
      }
    ]
  },
  Warrior: {
    name: 'Warrior',
    tagline: 'Unyielding Bulwark of Steel',
    role: 'Frontline Juggernaut',
    description: 'Battlefield vanguards hardened by blood and grit, wielding crushing steel weaponry and impervious physical armor.',
    primaryStat: 'strength',
    secondaryStat: 'constitution',
    hitDie: 10,
    armorBaseline: 17,
    resourceName: 'Rage',
    badgeBg: 'bg-red-950/60',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-400',
    glowColor: 'shadow-red-500/20',
    gradient: 'from-red-900/40 via-amber-950/20 to-transparent',
    weapons: [
      'Blackiron Executioner Greatsword',
      'Serrated Spikemace of the Warband',
      'Double-Edged Mithril Claymore',
      'Runed Heavy Waraxe of the Vanguard'
    ],
    weaponTypes: ['Two-Handed Heavy', 'Sword & Kite Shield', 'Polearm'],
    armors: [
      'Fluted Adamantine Fullplate',
      'Gilded Juggernaut Plate of the Garrison',
      'Reinforced Dragonscale Carapace'
    ],
    trinkets: [
      'War-Horn of the Iron Vanguard',
      'Scarred Sigil of Valor',
      'Pendant of the Unbroken Oath'
    ],
    abilities: [
      {
        name: 'Cleaving Whirlwind',
        type: 'Action',
        cost: '20 Rage',
        description: 'Executes a devastating rotational strike, cleaving all enemies in reach with raw kinetic momentum.'
      },
      {
        name: 'Titan Bastion',
        type: 'Passive',
        cost: 'Passive',
        description: 'Reduces heavy physical damage taken by 30% and renders the warrior immune to knockbacks while braced.'
      },
      {
        name: 'Earthshattering Charge',
        type: 'Ultimate',
        cost: '50 Rage',
        description: 'Slams into the enemy ranks with seismic fury, leaving fractured craters and trampling standard shields.'
      }
    ]
  },
  Rogue: {
    name: 'Rogue',
    tagline: 'Silent Blade of the Umbra',
    role: 'Infiltrator & Critical Striker',
    description: 'Masters of stealth, venomous precision, and subterfuge who strike from blind spots before slipping like smoke into shadows.',
    primaryStat: 'dexterity',
    secondaryStat: 'intelligence',
    hitDie: 8,
    armorBaseline: 14,
    resourceName: 'Energy',
    badgeBg: 'bg-emerald-950/60',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/20',
    gradient: 'from-emerald-900/40 via-stone-950/20 to-transparent',
    weapons: [
      'Twin Serrated Shadowfang Daggers',
      'Curved Obsidian Stiletto of the Guild',
      'Poison-Laced Silent Scimitar',
      'Concealed Springblade of Dusk'
    ],
    weaponTypes: ['Dual Daggers', 'Concealed Blades', 'Light Rapiers'],
    armors: [
      'Muffled Shadowcloth Cuirass',
      'Midnight Supple Leather Jerkin',
      'Raven-Feathered Stalker Cowl'
    ],
    trinkets: [
      'Skeleton Key of the Silent Vault',
      'Vial of Concentrated Basilisk Venom',
      'Ring of Muffled Steps'
    ],
    abilities: [
      {
        name: 'Shadowstep Evade',
        type: 'Action',
        cost: '30 Energy',
        description: 'Instantly teleports through the nearest patch of shadow directly behind the target for an unblockable kidney strike.'
      },
      {
        name: 'Venomous Precision',
        type: 'Passive',
        cost: 'Passive',
        description: 'Every critical strike applies stacked neurotoxin, debilitating enemy reaction speed and inflicting bleed.'
      },
      {
        name: 'Deathmark Flurry',
        type: 'Ultimate',
        cost: '70 Energy',
        description: 'Unleashes five blinding cuts across lethal pressure points before vanishing into thin mist.'
      }
    ]
  },
  Archer: {
    name: 'Archer',
    tagline: 'Hawkeye Sentinel of the Wilds',
    role: 'Ranged Sniper & Tracker',
    description: 'Keen-eyed scouts and legendary marksmen who fell enemies from afar with enchanted arrows and unmatched terrain dominance.',
    primaryStat: 'dexterity',
    secondaryStat: 'wisdom',
    hitDie: 8,
    armorBaseline: 15,
    resourceName: 'Focus',
    badgeBg: 'bg-teal-950/60',
    badgeBorder: 'border-teal-500/40',
    badgeText: 'text-teal-400',
    glowColor: 'shadow-teal-500/20',
    gradient: 'from-teal-900/40 via-emerald-950/20 to-transparent',
    weapons: [
      'Recurve Longbow of the Sylvan Canopy',
      'Reinforced Composite Hornbow of Boreas',
      'Heavy Heavy Crossbow with Mechanical Crank',
      'Windrunner Greatbow of Starlight'
    ],
    weaponTypes: ['Recurve Longbow', 'Compound Greatbow', 'Scout Crossbow'],
    armors: [
      'Camouflaged Forest Ranger Vest',
      'Supple Boarhide Archer Brigandine',
      'Winged Falconer Bracers'
    ],
    trinkets: [
      'Quiver of Endless Zephyrs',
      'Falcon Eye Scope Gem',
      'Lucky Arrowhead of the Stag Lord'
    ],
    abilities: [
      {
        name: 'Piercing Gale Shot',
        type: 'Action',
        cost: '25 Focus',
        description: 'Releases a supersonic fletched arrow imbued with pressurized wind that pierces through line armor.'
      },
      {
        name: 'Hawkeye Truesight',
        type: 'Passive',
        cost: 'Passive',
        description: 'Ignores physical cover penalties and detects hidden traps, stealth units, and vital weaknesses from 300 paces.'
      },
      {
        name: 'Rain of Briars',
        type: 'Ultimate',
        cost: '60 Focus',
        description: 'Launches a high-angle volley that showers a chosen zone with barbed enchanted arrows, immobilizing all targets.'
      }
    ]
  },
  Paladin: {
    name: 'Paladin',
    tagline: 'Radiant Shield of the Sacred Dawn',
    role: 'Holy Defender & Inquisitor',
    description: 'Devout champions crowned by holy solar radiance, smiting foul aberrations and shielding allies with divine fervor.',
    primaryStat: 'charisma',
    secondaryStat: 'strength',
    hitDie: 10,
    armorBaseline: 18,
    resourceName: 'Faith',
    badgeBg: 'bg-amber-950/60',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-400',
    glowColor: 'shadow-amber-500/20',
    gradient: 'from-amber-900/40 via-yellow-950/20 to-transparent',
    weapons: [
      'Gilded Warhammer of the Sun Sovereign',
      'Sunburst Flail of Retribution',
      'Blessed Radiant Broadsword of Truth',
      'Silver Cross Mace of the Inquisition'
    ],
    weaponTypes: ['Holy Hammer & Tower Shield', 'Bastard Sword', 'Consecrated Flail'],
    armors: [
      'Sacred Gilded Plate of the Seraphim',
      'Silvered Tabard of the Dawn Crusade',
      'Blessed Greathelm of the Radiant Vow'
    ],
    trinkets: [
      'Reliquary of the First Martyr',
      'Golden Solar Medallion of Dawn',
      'Phial of Sacred Cathedral Water'
    ],
    abilities: [
      {
        name: 'Divine Smite',
        type: 'Action',
        cost: '30 Faith',
        description: 'Imbues weapon with blinding solar fire, incinerating corrupt beasts and purging malicious status curses.'
      },
      {
        name: 'Aura of Sanctity',
        type: 'Passive',
        cost: 'Passive',
        description: 'Surrounds all adjacent allies with a golden halo that grants magic resistance and health regeneration.'
      },
      {
        name: 'Shield of the Heavens',
        type: 'Ultimate',
        cost: '70 Faith',
        description: 'Calls down a beam of divine dawnlight that completely invulnerabilizes the paladin and heals the faithful.'
      }
    ]
  },
  Necromancer: {
    name: 'Necromancer',
    tagline: 'Sovereign of the Tomb & Netherflame',
    role: 'Dark Summoner & Life Harvester',
    description: 'Scholars of forbidden death rites who command skeletal legions, siphon souls, and unleash decaying curses from the grave.',
    primaryStat: 'intelligence',
    secondaryStat: 'constitution',
    hitDie: 6,
    armorBaseline: 12,
    resourceName: 'Soul Shards',
    badgeBg: 'bg-purple-950/60',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-400',
    glowColor: 'shadow-purple-500/20',
    gradient: 'from-purple-900/40 via-violet-950/20 to-transparent',
    weapons: [
      'Carved Bone Stave of Malice',
      'Scythe of the Mourning Harvest',
      'Obsidian Wand of Spectral Torment',
      'Ritual Athame of Soul Flensing'
    ],
    weaponTypes: ['Death Scythe', 'Bone Carved Staff', 'Soul Athame'],
    armors: [
      'Vestments of the Crypt Whisperer',
      'Grim Shroud of the Harrowed Mire',
      'Tomb-Raider Ashen Robes'
    ],
    trinkets: [
      'Caged Wisp of an Ancient King',
      'Hourglass Filled with Bone Dust',
      'Grimoire of Rotten Curses'
    ],
    abilities: [
      {
        name: 'Soul Siphon',
        type: 'Action',
        cost: '2 Shards',
        description: 'Drains vitality from the victim’s life force, transferring health directly back to the necromancer.'
      },
      {
        name: 'Unholy Resurgence',
        type: 'Passive',
        cost: 'Passive',
        description: 'Slain adversaries automatically reanimate as brittle skeleton thralls that fight for 30 seconds.'
      },
      {
        name: 'Cataclysm of the Crypt',
        type: 'Ultimate',
        cost: '5 Shards',
        description: 'Detonates fallen remains in the vicinity, showering the battlefield in necrotic pestilence and skeletal shrapnel.'
      }
    ]
  },
  Druid: {
    name: 'Druid',
    tagline: 'Keeper of the Primal Cycles',
    role: 'Shapeshifter & Nature Warden',
    description: 'Attuned to the raw heartbeat of ancient woods, commanding storm winds, wild beasts, and ferocious shapeshift forms.',
    primaryStat: 'wisdom',
    secondaryStat: 'constitution',
    hitDie: 8,
    armorBaseline: 14,
    resourceName: 'Primal Essence',
    badgeBg: 'bg-lime-950/60',
    badgeBorder: 'border-lime-500/40',
    badgeText: 'text-lime-400',
    glowColor: 'shadow-lime-500/20',
    gradient: 'from-lime-900/40 via-emerald-950/20 to-transparent',
    weapons: [
      'Ironwood Quarterstaff of Thornbloom',
      'Carved Yew Antler Scythe',
      'Flintstone Sickle of the Verdant Circle'
    ],
    weaponTypes: ['Natural Staff', 'Carved Sickle', 'Antler Polearm'],
    armors: [
      'Barkskin Hide Cuirass',
      'Mantle of Living Vines',
      'Antler Crown of the Forest King'
    ],
    trinkets: ['Fossilized Amber Seed', 'Raven Skull Totem', 'Phial of Spring Dew'],
    abilities: [
      {
        name: 'Primal Metamorphosis',
        type: 'Action',
        cost: '20 Essence',
        description: 'Shapeshifts into an armored dire bear or swift shadow lynx, gaining massive offensive power.'
      },
      {
        name: 'Verdant Mend',
        type: 'Passive',
        cost: 'Passive',
        description: 'Continuous natural regeneration of stamina and health when in contact with natural soil or stone.'
      },
      {
        name: 'Wrath of the Old Woods',
        type: 'Ultimate',
        cost: '50 Essence',
        description: 'Awakens root tendrils from the earth that crush and impale adversaries across a 40-foot radius.'
      }
    ]
  },
  Berserker: {
    name: 'Berserker',
    tagline: 'Furybound Tempest of Slaughter',
    role: 'Brutal Melee Striker',
    description: 'Wild warriors who enter trance-like blood frenzies, shrugging off fatal wounds while cleaving lines of battle.',
    primaryStat: 'strength',
    secondaryStat: 'constitution',
    hitDie: 12,
    armorBaseline: 14,
    resourceName: 'Fury',
    badgeBg: 'bg-orange-950/60',
    badgeBorder: 'border-orange-500/40',
    badgeText: 'text-orange-400',
    glowColor: 'shadow-orange-500/20',
    gradient: 'from-orange-900/40 via-red-950/20 to-transparent',
    weapons: [
      'Dual Jagged Bearded Axes of Frostpeak',
      'Colossal Spiked War Maul',
      'Blood-Drinker Greataxe'
    ],
    weaponTypes: ['Dual Bearded Axes', 'Heavy Great Maul', 'Executioner Axe'],
    armors: ['Warpaint & Bearskin Pelt', 'Spiked Iron Pauldron Harness', 'Mammoth Bone Bracers'],
    trinkets: ['Bear Fang Choker', 'Totem of the Red Moon', 'Severed Troll Finger'],
    abilities: [
      {
        name: 'Bloodrage Rampage',
        type: 'Action',
        cost: '25 Fury',
        description: 'Temporarily doubles attack speed and causes melee blows to splash kinetic shockwaves.'
      },
      {
        name: 'Defy Death',
        type: 'Passive',
        cost: 'Passive',
        description: 'When health drops below 25%, damage dealt surges by 50% and incoming fatal hits are delayed.'
      },
      {
        name: 'Titanic Cleave',
        type: 'Ultimate',
        cost: '60 Fury',
        description: 'Leaps high and smashes the earth with catastrophic weight, fracturing stone and sundering armor.'
      }
    ]
  },
  Bard: {
    name: 'Bard',
    tagline: 'Maestro of Ballads & Discord',
    role: 'Inspirational Virtuoso & Trickster',
    description: 'Artisans of song and silver tongues who weave spells into melodies, bolster allies, and charm deadly monarchs.',
    primaryStat: 'charisma',
    secondaryStat: 'dexterity',
    hitDie: 8,
    armorBaseline: 13,
    resourceName: 'Inspiration',
    badgeBg: 'bg-pink-950/60',
    badgeBorder: 'border-pink-500/40',
    badgeText: 'text-pink-400',
    glowColor: 'shadow-pink-500/20',
    gradient: 'from-pink-900/40 via-purple-950/20 to-transparent',
    weapons: ['Silverstring Lute with Hidden Rapier', 'Engraved Ivory Dagger', 'Gilded Rosewood Flute of Charming'],
    weaponTypes: ['Musical Weapon', 'Fencing Rapier', 'Noble Stiletto'],
    armors: ['Velvet Troubadour Doublet', 'Feathered Cavalier Hat', 'Embroidered Silk Breeches'],
    trinkets: ['Golden Pitch Pipe of Harmony', 'Deck of Illusory Cards', 'Signet Ring of the Court Balladeer'],
    abilities: [
      {
        name: 'Crescendo of Discord',
        type: 'Action',
        cost: '20 Inspiration',
        description: 'Strikes an acoustic psychic chord that disorients targets and breaks spell concentration.'
      },
      {
        name: 'Song of Restoration',
        type: 'Passive',
        cost: 'Passive',
        description: 'Allies within hearing distance gain morale surges, boosting critical strike rate and resilience.'
      },
      {
        name: 'Ballad of Legends',
        type: 'Ultimate',
        cost: '50 Inspiration',
        description: 'Weaves an epic overture that temporarily turns the entire party into legendary heroes with boosted stats.'
      }
    ]
  },
  Cleric: {
    name: 'Cleric',
    tagline: 'Vessel of the Divine Will',
    role: 'Holy Healer & Undead Ward',
    description: 'Ordained ministers of celestial powers who mend mortal wounds, purge plagues, and banish restless spirits back to the ether.',
    primaryStat: 'wisdom',
    secondaryStat: 'constitution',
    hitDie: 8,
    armorBaseline: 16,
    resourceName: 'Divine Favor',
    badgeBg: 'bg-sky-950/60',
    badgeBorder: 'border-sky-500/40',
    badgeText: 'text-sky-400',
    glowColor: 'shadow-sky-500/20',
    gradient: 'from-sky-900/40 via-blue-950/20 to-transparent',
    weapons: ['Censer Flail of Cleansing', 'Hallowed Silver Mace', 'Inscribed Ironwood Relic Crosier'],
    weaponTypes: ['Cleric Mace', 'Incense Flail', 'Sanctified Staff'],
    armors: ['Blessed Chainmail Hauberk', 'Vestments of the Celestial Temple', 'Silver Anointed Bracers'],
    trinkets: ['Prayer Beads of the Archon', 'Phial of Healing Oil', 'Icon of the Heavenly Sun'],
    abilities: [
      {
        name: 'Curative Prayer',
        type: 'Action',
        cost: '25 Favor',
        description: 'Channels gentle radiance to instantaneously mend severe lacerations and remove poison.'
      },
      {
        name: 'Turn Undead',
        type: 'Passive',
        cost: 'Passive',
        description: 'Nearby undead and demonic creatures cower before the cleric’s holy symbol, suffering burn on contact.'
      },
      {
        name: 'Heavenly Bastion',
        type: 'Ultimate',
        cost: '60 Favor',
        description: 'Summons an angelic guardian that erects a shimmering dome of sanctuary across the battlefield.'
      }
    ]
  }
};

export const CORE_CLASSES: CharacterClass[] = [
  'Mage',
  'Warrior',
  'Rogue',
  'Archer',
  'Paladin',
  'Necromancer'
];

export const ALL_CLASSES: CharacterClass[] = [
  'Mage',
  'Warrior',
  'Rogue',
  'Archer',
  'Paladin',
  'Necromancer',
  'Druid',
  'Berserker',
  'Bard',
  'Cleric'
];

export const RACES = [
  'High Elf',
  'Mountain Dwarf',
  'Imperial Human',
  'Duskborn Tiefling',
  'Dragonborn',
  'Wildborn Sylph',
  'Moon Elf',
  'Ironforge Dwarf',
  'Storm Giantblood',
  'Revenant',
  'Shadowkin',
  'Orc Bloodline'
];

export const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil'
];

export const TIERS: CharacterTier[] = [
  'Novice Adventurer',
  'Hardened Veteran',
  'Master Hero',
  'Mythic Legend'
];

export const FIRST_NAMES: Record<Gender, string[]> = {
  Male: [
    'Aelion', 'Thalor', 'Valerius', 'Morvath', 'Eldrin', 'Kaelen', 'Sylas', 'Gideon',
    'Balthazar', 'Darian', 'Corvus', 'Torin', 'Kragthor', 'Draven', 'Caelum', 'Vaelen',
    'Solas', 'Alastair', 'Theron', 'Malakor', 'Cassian', 'Sariel', 'Garrick', 'Leopold',
    'Finnian', 'Darius', 'Zarek', 'Ronan', 'Kallum', 'Oryx', 'Branoc', 'Lucian'
  ],
  Female: [
    'Lyra', 'Zephyra', 'Vespera', 'Aurelia', 'Seraphina', 'Isolde', 'Mirela', 'Morgana',
    'Yvaine', 'Astrid', 'Nyx', 'Lilith', 'Rhiannon', 'Vaeloria', 'Elysia', 'Kaelia',
    'Maeve', 'Selene', 'Morwenna', 'Thalia', 'Rowena', 'Freya', 'Valeria', 'Elowen',
    'Sigrid', 'Celeste', 'Briar', 'Kira', 'Lunafreya', 'Althea', 'Ravenna', 'Zafira'
  ],
  'Non-binary': [
    'Rowan', 'Onyx', 'Solstice', 'Ash', 'Zephyr', 'Rune', 'Echo', 'Vale',
    'Cinder', 'Kestrel', 'Sage', 'Wren', 'Lark', 'Sable', 'Peregrine', 'Frost'
  ]
};

export const SURNAMES = [
  'Emberforge', 'Sunstrider', 'Shadowveil', 'Stormpeak', 'Dawnbringer', 'Moonwhisper',
  'Dreadmoor', 'Ironbreaker', 'Silverthorn', 'Frostspire', 'Nightfall', 'Bloodgilded',
  'Starweaver', 'Gravebound', 'Wildsong', 'Blackwood', 'Runeshield', 'Voidwalker',
  'Brightsteel', 'Ashfeather', 'Wintercrest', 'Oakhaven', 'Flamebound', 'Stonefist',
  'Ravenloft', 'Deepdelver', 'Grimshaw', 'Holloway', 'Gildedcrown', 'Stormborn'
];

export const TITLES = [
  'the Silver Flame',
  'Bane of Wyrms',
  'Whisper in the Mist',
  'Keeper of Forgotten Tomes',
  'Shield of Dawn',
  'the Hollow',
  'the Unbroken',
  'Blade of the Eclipse',
  'the Ash Warden',
  'Harbinger of Crows',
  'Wanderer of the Astral Sea',
  'the Stormborn',
  'the Silent Vow',
  'the Undying Light',
  'Hound of the Iron Throne',
  'Seeker of Ruined Crowns',
  'Weaver of Starlight',
  'the Frost-Crowned',
  'Breaker of Chains',
  'the Spectral King'
];

export const LORE_ORIGINS = [
  'Born during a blood moon beneath the monolithic spires of the High Citadel.',
  'Orphaned in the wild timberlands of the North and raised by sacred order sentinels.',
  'Former court archivist exiled for deciphering a forbidden celestial manuscript.',
  'A hardened veteran of the Siege of Sunken Spire who pledged an oath of solitary wanderlust.',
  'The sole survivor of an expedition into the deep Abyssal Chasm.',
  'Descendant of an ancient royal bloodline thought lost to the cataclysm.',
  'Trained in secrecy within the cloistered monasteries of the Shrouded Mist.',
  'Forged in the subterranean magma caverns of the Molten Foundry.'
];

export const BACKSTORIES = [
  'Carries a sealed scroll etched with prophecies that name them as either the realm’s savior or its ruination.',
  'Stalks the frontier hunting the traitorous commander who betrayed their company into an enemy ambush.',
  'Commands an ancient artifact that whispers forgotten truths whenever danger draws near.',
  'Swore never to wield mercy against dark fiends after witnessing the burning of their ancestral village.',
  'Seeks redemption for a devastating pact made in youth with an eldritch being of the outer void.',
  'Travels incognito with a price on their head, pursued by the Sovereign’s elite inquisitors.',
  'Has dedicated their existence to restoring the shattered fragments of a legendary celestial crown.',
  'Possesses a cursed eye that perceives the spirit realm and the immediate deaths of mortals.'
];

export const PERSONALITY_TRAITS = [
  'Speaks in measured whispers, measuring every word as if it carried the weight of steel.',
  'Fiercely loyal to comrades; would walk into the mouth of a dragon to protect them.',
  'Maintains a grim sense of humor even when staring down certain doom.',
  'Keeps a meticulous journal of every adversary defeated and oath fulfilled.',
  'Never draws a weapon without bowing in solemn respect to the opponent.',
  'Quick to laugh in tavern halls, but becomes cold stone the moment battle begins.',
  'Has an insatiable curiosity for ancient ruins and untranslated hieroglyphs.',
  'Distrusts nobles and authority, preferring the honest word of humble commoners.'
];

export const IDEALS = [
  'Greater Good: The protection of the innocent outweighs any personal glory.',
  'Freedom: Chains are made to be shattered; no tyrant shall claim dominion over the spirit.',
  'Honor: A warrior’s word is an unbreakable iron binding.',
  'Knowledge: True mastery over the cosmos comes from unearthing the mysteries of old.',
  'Retribution: Every drop of shed blood demands an equal reckoning.',
  'Harmony: The natural cycle of life, growth, and decay must remain undisturbed.'
];

export const FLAWS = [
  'Struggles to trust others and refuses to accept aid even when mortally wounded.',
  'Blinded by vengeful pride when challenged to single combat.',
  'Addicted to the thrilling rush of lethal danger and reckless wagers.',
  'Haunted by nightmares of fallen comrades, causing periodic insomnia and brooding.',
  'Secretly covets forbidden artifacts regardless of their corrupting peril.',
  'Incapable of walking away from a riddle, mystery, or locked ancient chest.'
];

// Helper function to roll a random RPG stat between 5 and 18 inclusive
export function rollStatBetween5And18(): number {
  return Math.floor(Math.random() * (18 - 5 + 1)) + 5;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateCharacter(
  targetClass?: CharacterClass,
  existingLocks?: {
    name?: string;
    title?: string;
    characterClass?: CharacterClass;
    race?: string;
    gender?: Gender;
    stats?: CharacterStats;
    health?: number;
    mana?: number;
    strength?: number;
  }
): FantasyCharacter {
  const gender: Gender = existingLocks?.gender || getRandomElement(['Male', 'Female', 'Non-binary'] as Gender[]);
  
  const firstName = existingLocks?.name 
    ? existingLocks.name.split(' ')[0] 
    : getRandomElement(FIRST_NAMES[gender]);
  
  const surname = existingLocks?.name && existingLocks.name.includes(' ')
    ? existingLocks.name.substring(existingLocks.name.indexOf(' ') + 1)
    : getRandomElement(SURNAMES);

  const characterName = existingLocks?.name || `${firstName} ${surname}`;
  const title = existingLocks?.title || getRandomElement(TITLES);
  
  // Class selection (Core 6 prioritized, or explicit parameter)
  const chosenClass: CharacterClass = existingLocks?.characterClass 
    ? existingLocks.characterClass 
    : (targetClass || getRandomElement(CORE_CLASSES));

  const race = existingLocks?.race || getRandomElement(RACES);
  const alignment = getRandomElement(ALIGNMENTS);
  const tier = getRandomElement(TIERS);
  
  // Class Metadata
  const classMeta = CLASS_METAS[chosenClass] || CLASS_METAS.Warrior;

  // Basic Fantasy RPG Stats (Strength, Dexterity, Intelligence, Constitution between 5 and 18)
  let stats: CharacterStats;
  if (existingLocks?.stats) {
    stats = existingLocks.stats;
  } else {
    stats = {
      strength: rollStatBetween5And18(),
      dexterity: rollStatBetween5And18(),
      intelligence: rollStatBetween5And18(),
      constitution: rollStatBetween5And18(),
      wisdom: rollStatBetween5And18(),
      charisma: rollStatBetween5And18()
    };
  }

  // Calculate combat vitals from stats
  const conMod = Math.floor((stats.constitution - 10) / 2);
  const dexMod = Math.floor((stats.dexterity - 10) / 2);
  const intMod = Math.floor((stats.intelligence - 10) / 2);
  const chaMod = Math.floor((stats.charisma - 10) / 2);

  const level = tier === 'Novice Adventurer' ? 1 
    : tier === 'Hardened Veteran' ? 5 
    : tier === 'Master Hero' ? 10 
    : 15;

  const baseHp = classMeta.hitDie + conMod + (level - 1) * (Math.floor(classMeta.hitDie / 2) + 1 + conMod);
  const calculatedHp = Math.max(12, baseHp);

  const armorClass = classMeta.armorBaseline + (chosenClass === 'Rogue' || chosenClass === 'Archer' ? dexMod : 0);

  const vitals: CharacterVitals = {
    hp: calculatedHp,
    maxHp: calculatedHp,
    ac: armorClass,
    resourceName: classMeta.resourceName,
    resourceValue: 100 + (chosenClass === 'Mage' ? intMod * 10 : chosenClass === 'Paladin' ? chaMod * 10 : 0),
    speed: race.includes('Dwarf') ? '25 ft.' : '30 ft.',
    initiative: dexMod >= 0 ? `+${dexMod}` : `${dexMod}`
  };

  const equipment: CharacterEquipment = {
    weapon: getRandomElement(classMeta.weapons),
    weaponType: getRandomElement(classMeta.weaponTypes),
    armor: getRandomElement(classMeta.armors),
    trinket: getRandomElement(classMeta.trinkets)
  };

  const lore: CharacterLore = {
    origin: getRandomElement(LORE_ORIGINS),
    backstory: generateCharacterBackstory(characterName, chosenClass),
    trait: getRandomElement(PERSONALITY_TRAITS),
    ideal: getRandomElement(IDEALS),
    flaw: getRandomElement(FLAWS)
  };

  const health = (existingLocks && 'health' in existingLocks && typeof (existingLocks as unknown as { health?: number }).health === 'number')
    ? (existingLocks as unknown as { health: number }).health
    : Math.floor(Math.random() * (150 - 50 + 1)) + 50;

  const mana = (existingLocks && 'mana' in existingLocks && typeof (existingLocks as unknown as { mana?: number }).mana === 'number')
    ? (existingLocks as unknown as { mana: number }).mana
    : Math.floor(Math.random() * (100 - 20 + 1)) + 20;

  const strength = (existingLocks && 'strength' in existingLocks && typeof (existingLocks as unknown as { strength?: number }).strength === 'number')
    ? (existingLocks as unknown as { strength: number }).strength
    : Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: characterName,
    title,
    characterClass: chosenClass,
    race,
    gender,
    alignment,
    tier,
    level,
    health,
    mana,
    strength,
    stats,
    vitals,
    equipment,
    abilities: classMeta.abilities,
    lore,
    portraitVariant: Math.floor(Math.random() * 6) + 1,
    createdAt: Date.now()
  };
}

export function getStatModifier(statValue: number): string {
  const mod = Math.floor((statValue - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
