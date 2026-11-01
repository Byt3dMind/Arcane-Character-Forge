import { CharacterClass } from '../types/character';

// Class-specific sentence 1 templates (must mention character name and establish their origin)
const ORIGIN_TEMPLATES: Record<string, ((name: string, cls: string) => string)[]> = {
  Mage: [
    (name, cls) => `When a celestial rift shattered the skies above the High Spire, ${name} absorbed raw leyline starlight that marked them as a prodigal ${cls}.`,
    (name, cls) => `Exiled from the Astral Academy for deciphering the Chronomancer's forbidden codex, ${name} embraced the ancient calling of a ${cls}.`,
    (name, cls) => `Born beneath a rare eclipse of twin moons, ${name} awakened reality-bending spellcraft that only the truest ${cls} could ever wield.`,
    (name, cls) => `Deep within the crystalline caverns of Mount Vael, ${name} struck a covenant with an ethereal spirit to become a supreme ${cls}.`,
    (name, cls) => `After unearthing a forgotten prismatic talisman in the sunken ruins of Aethelgard, ${name} transcended mortal limits as an arcane ${cls}.`,
    (name, cls) => `Trained by the hermit sorcerers of the Frostspire Peaks, ${name} mastered the primal elements to rise as a revered ${cls}.`,
    (name, cls) => `Surviving an arcane detonation that leveled their ancestral sanctuary, ${name} channeled the residual vortex to emerge as an unmatched ${cls}.`,
    (name, cls) => `Having spent decades translating the whispering glyphs of the Nether Vaults, ${name} unlocked secrets known only to an elder ${cls}.`
  ],
  Warrior: [
    (name, cls) => `Orphaned during the bloodied Siege of Sunken Spire, ${name} forged a heavy broadsword from dragonbone and swore the iron oath of a frontline ${cls}.`,
    (name, cls) => `Trained in the brutal gladiator pits of the Iron Vanguard, ${name} cleaved their way to legendary renown as an undefeated ${cls}.`,
    (name, cls) => `Sole survivor of the doomed Blackwood vanguard, ${name} carried the broken banner of their regiment to become a battle-hardened ${cls}.`,
    (name, cls) => `Raised among the nomadic mountain warbands of Frostpeak, ${name} mastered the crushing discipline of an unstoppable ${cls}.`,
    (name, cls) => `When marauding warlords burned their ancestral village to cinders, ${name} took up ancestral steel and walked the relentless path of a ${cls}.`,
    (name, cls) => `Knighted on the eve of the Great Cataclysm for holding the citadel gates alone, ${name} remains the kingdom's most resilient ${cls}.`,
    (name, cls) => `Tested against colossal subterranean wyrms in the Molten Caverns, ${name} earned the unbreakable honor of an adamantine ${cls}.`,
    (name, cls) => `Driven by a blood vow to restore their fallen house, ${name} marches across the contested borderlands as a fearsome ${cls}.`
  ],
  Rogue: [
    (name, cls) => `Raised in the shadowy catacombs beneath the Imperial City, ${name} mastered the whisper-quiet arts of the lethal ${cls}.`,
    (name, cls) => `Betrayed by the very assassins' guild that trained them in poison and stealth, ${name} now strikes from the shadows as an independent ${cls}.`,
    (name, cls) => `Having infiltrated the high vaults of the Sunken Treasury before their sixteenth winter, ${name} earned mythic infamy as a phantom ${cls}.`,
    (name, cls) => `Sliding like smoke through the guarded borders of hostile kingdoms, ${name} built a deadly reputation as a shadowbound ${cls}.`,
    (name, cls) => `Escaped from the impenetrable dungeons of Blackspire with nothing but a rusty lockpick, ${name} lives as a cunning ${cls}.`,
    (name, cls) => `Trained by an exiled master of the Obsidian Mask, ${name} wields twin venomous stilettos as an elusive ${cls}.`,
    (name, cls) => `Framed for the theft of the Emperor's celestial jewel, ${name} adopted a ghostlike existence as a rogue vigilante ${cls}.`,
    (name, cls) => `A ghost among high-born masquerades and dark alleys alike, ${name} executes impossible heists as the realm's swiftest ${cls}.`
  ],
  Archer: [
    (name, cls) => `Blessed by the Great White Stag in the heart of the Sylvan Canopy, ${name} can split an iron coin from five hundred paces as a peerless ${cls}.`,
    (name, cls) => `Raised by the windrunner rangers of the Western Crags, ${name} learned to loose enchanted arrows before they could speak, becoming an elite ${cls}.`,
    (name, cls) => `When dark abominations crept into the ancient border forest, ${name} picked up a recurve yew bow to defend their kin as a vigilant ${cls}.`,
    (name, cls) => `Sole scout to return from the cursed Mistwood Marches, ${name} now guards the outer frontier with the uncanny precision of a veteran ${cls}.`,
    (name, cls) => `Trained to loose supersonic arrows even in pitch darkness, ${name} stalks prey across untamed frontiers as a master ${cls}.`,
    (name, cls) => `Inheriting an ancestral hornbow carved from ancient spiritwood, ${name} patrols the alpine ridgelines as a silent ${cls}.`,
    (name, cls) => `Having felled a rampaging chimera with a single arrow through the eye, ${name} won the eternal respect of the wilderness as a legendary ${cls}.`,
    (name, cls) => `Guiding caravans through monster-infested canyons, ${name} maintains absolute watch as an eagle-eyed ${cls}.`
  ],
  Paladin: [
    (name, cls) => `Anointed in solar dawnfire during the Siege of the Radiant Cathedral, ${name} swore an unbreakable oath as a holy ${cls}.`,
    (name, cls) => `Visited in dreams by the Archon of the Morning Sun, ${name} laid down earthly nobility to become a consecrated ${cls}.`,
    (name, cls) => `When abyssal demons threatened to engulf their sanctuary, ${name} stood alone as a beacon of radiant hope, rising as a true ${cls}.`,
    (name, cls) => `Blessed with divine healing touch and holy smiting fervor, ${name} champions the downtrodden as a sworn ${cls}.`,
    (name, cls) => `Forged in the sacred fires of the Seraphim Order, ${name} bears a gilded tower shield as the realm's most steadfast ${cls}.`,
    (name, cls) => `Having cleansed the crypts of the Bleeding Abbey with holy fervor, ${name} leads righteous crusades as an honored ${cls}.`,
    (name, cls) => `Sworn to defend the innocent at the cost of their own blood, ${name} radiates divine solar wrath as a sacred ${cls}.`,
    (name, cls) => `Chosen by the Silver Chalice to purge corruption from royal courts, ${name} enforces divine justice as an incorruptible ${cls}.`
  ],
  Necromancer: [
    (name, cls) => `Exiled from the Imperial Colleges for communing with the spirits of forgotten monarchs, ${name} unlocked the dark mysteries of a ${cls}.`,
    (name, cls) => `Born in the misty hollows of the Harrowed Mire, ${name} commands soul shards and skeletal thralls as a feared ${cls}.`,
    (name, cls) => `Having survived the Great Plague by binding necrotic wards into their own flesh, ${name} emerged as an undying ${cls}.`,
    (name, cls) => `Possessing a cursed tomb relic that whispers secrets of the grave, ${name} walks between life and death as a sovereign ${cls}.`,
    (name, cls) => `Trained in forbidden mausoleum crypts beneath the Forgotten Waste, ${name} manipulates spectral netherflame as a chilling ${cls}.`,
    (name, cls) => `Driven to discover the remedy for mortality itself, ${name} flays open soul essences as an uncompromising ${cls}.`,
    (name, cls) => `After raising an entire defeated legion from their battlefield slumber, ${name} cemented their legacy as a dreaded ${cls}.`,
    (name, cls) => `Branded with the rune of the Black Sun, ${name} channels catastrophic grave chill as an enigmatic ${cls}.`
  ],
  Druid: [
    (name, cls) => `Attuned to the ancient roots of the Primordial World Tree, ${name} commands nature's wrath as a wild ${cls}.`,
    (name, cls) => `Raised by a pack of spectral dire wolves in the deep mossvales, ${name} shapeshifts with ferocity as a sacred ${cls}.`,
    (name, cls) => `When loggers desecrated the Grove of the Elders, ${name} summoned root tendrils and gale tempests as a vengeful ${cls}.`,
    (name, cls) => `Drinking from the font of living springwater at Mount Belen, ${name} became the living voice of the wild as a primal ${cls}.`
  ],
  Berserker: [
    (name, cls) => `Cursed by the blood moon of the Frost Wastes, ${name} channels uncontrollable battle frenzy as a ferocious ${cls}.`,
    (name, cls) => `Having severed the head of an ice wyrm with their bare hands, ${name} was crowned with bear pelts as an unstoppable ${cls}.`,
    (name, cls) => `Surviving a hundred lethal duels through sheer unyielding rage, ${name} laughs at mortal danger as a devastating ${cls}.`,
    (name, cls) => `Branded with incandescent runes of fury, ${name} smashes enemy formations with catastrophic force as a legendary ${cls}.`
  ],
  Bard: [
    (name, cls) => `Gifted a silver-stringed lute by a whimsical faerie queen, ${name} weaves magic into enchanting ballads as a virtuoso ${cls}.`,
    (name, cls) => `Having talked their way out of the dragon's lair with a witty rhyme, ${name} wanders tavern halls as an infamous ${cls}.`,
    (name, cls) => `Trained in the courtly intrigues of the Rosewood Palace, ${name} balances subtle spellcraft and discord as a charming ${cls}.`,
    (name, cls) => `Seeking the lost verses of the First Hymn across ruined citadels, ${name} inspires armies and kings alike as a noble ${cls}.`
  ],
  Cleric: [
    (name, cls) => `Ordained in the high sanctuary of the Archangels, ${name} heals fatal wounds and banishes fiends as a devout ${cls}.`,
    (name, cls) => `Heeding a celestial chime that echoed across the plains, ${name} abandoned a merchant empire to serve as a humble ${cls}.`,
    (name, cls) => `Bearing an ironwood crosier blessed by the patron saints, ${name} stands firm against corrupt plagues as an anointed ${cls}.`,
    (name, cls) => `Through sleepless nights tending to wounded soldiers on the frontline, ${name} proved their divine calling as a stalwart ${cls}.`
  ]
};

// Class-specific sentence 2 templates (resolves their quest, goal, or legendary relic)
const QUEST_TEMPLATES: Record<string, string[]> = {
  Mage: [
    'Now they travel across forgotten ruins to restore the shattered seals before the Nether Void swallows the realm.',
    'Armed with an astral conduit scepter, they seek the celestial compass that can prevent an impending planar cataclysm.',
    'They now decipher the lost theorems of the Ancients, seeking to unravel time itself to save a fallen sanctuary.',
    'Guarded by shimmering crystalline runes, they hunt down rogue arcanists who endanger the fabric of reality.',
    'Their research into forgotten dimensional rifts has made them the sole scholar capable of halting the void storm.',
    'With leyline flame coursing through their veins, they journey toward the frozen crater where the first star fell.'
  ],
  Warrior: [
    'Today they roam the contested frontier with heavy steel in hand, hunting the dread titan that shattered their ancestral citadel.',
    'Bound by an iron vow of brotherhood, they refuse to lay down their blades until every captive vassal is set free.',
    'They now command the vanguard of the border forts, standing as an unyielding wall against oncoming barbarian hordes.',
    'Carrying a chipped shield that bore a thousand strikes, they seek worthy adversaries in kingdoms across the sea.',
    'Their relentless discipline has turned them into a living fortress, feared by tyrants and revered by common folk.',
    'With scars etched like battle maps upon their armor, they march toward the desolate caldera for a final reckoning.'
  ],
  Rogue: [
    'Now stalking the rain-slicked rooftops of the capital, they hunt the corrupt oligarchs who framed their brotherhood.',
    'Armed with venom-laced stilettos and cloaked in mist, they search for the elusive artifact known as the Crown of Thieves.',
    'They now navigate the criminal underworld with lethal finesse, trading secrets that could topple great empires.',
    'No fortress vault has ever kept them at bay, and their next mark is the heavily guarded Treasury of the High Sovereign.',
    'Slipping past royal sentinels with ease, they seek to uncover the dark conspiracy threatening the crown.',
    'A whisper in the shadows and a flash of steel, they remain forever one step ahead of the Emperor’s elite inquisitors.'
  ],
  Archer: [
    'Now patrolling the canopy borders with windrunner instincts, they hunt the shadow beasts encroaching upon sacred groves.',
    'With a quiver of gale-enchanted arrows at their hip, they track the elusive wyvern that terrorizes frontier outposts.',
    'They now seek the fabled Bow of the Celestial Hunt, rumored to never miss its target across an entire horizon.',
    'Perched high atop wind-carved crags, they protect migrating pilgrims from ambush with unerring marksman precision.',
    'No footprint escapes their hawkeye gaze, making them the most sought-after tracker in the entire northern realm.',
    'Guided by the whispering wind, they prepare for the long winter when ancient predators awake from the permafrost.'
  ],
  Paladin: [
    'Bearing a gilded warhammer imbued with dawnfire, they lead a righteous crusade against deep subterranean fiends.',
    'They now travel the lawless highways, offering sanctuary to the helpless and divine retribution to the wicked.',
    'Sworn to the ancient Seraphim Codex, they seek the missing fragments of the True Sun Relic to banish the dark tide.',
    'Their blinding aura repels abyssal curses, making them the vanguard champion against dark necromantic sorcery.',
    'Unshakable in faith and armored in consecrated silver plate, they prepare to confront the ancient dragon of the abyss.',
    'With prayers of redemption on their lips, they fight not for personal glory, but to kindle hope across a darkened continent.'
  ],
  Necromancer: [
    'Now delving into the deepest crypts of the Harrowed Mire, they gather soul shards to complete the Grimoire of the Undying.',
    'Surrounded by obedient skeletal thralls and bone dust, they seek vengeance against the inquisitors who burned their sanctum.',
    'They now search for the mythical Tomb of the First Lich, hoping to harvest the primordial secrets of resurrection.',
    'Wielding a scythe that siphons the life force of fallen foes, they walk untouched through plague-ridden graveyards.',
    'Their spectral netherflame burns cold and eternal as they weave rites that challenge the cosmic boundaries of mortality.',
    'Feared by kings and shunned by the living, they march toward the desolate necropolis to claim their rightful throne.'
  ],
  Druid: [
    'Now guarding the elder sacred groves, they awaken colossal root sentinels to crush despoilers of the earth.',
    'Guided by the spirits of ancient wolves, they wander the deep virgin woodlands to preserve the balance of life.',
    'They seek the mythical Seed of Spring to restore fertility to lands cursed by war and dark sorcery.',
    'With storms dancing at their fingertips, they stand as the fierce protector of beasts against civilization’s greed.'
  ],
  Berserker: [
    'Now storming across snow-capped peaks, they challenge every mythical beast to prove the supremacy of their raw fury.',
    'Driven by an untamed bloodlust, they seek the legendary war hammer that can split mountain ridges in half.',
    'They fight with reckless abandon, knowing their ancestors await them in the golden mead halls of the victorious.',
    'With warpaint smeared across their face, they lead fierce clan raids that shatter enemy supply lines with devastating speed.'
  ],
  Bard: [
    'Now touring royal ballrooms and bustling docks alike, they uncover dirty political secrets hidden between sweet verses.',
    'They seek the mythical Siren Harp of Aethelgard to compose a masterpiece that can pacify raging leviathans.',
    'With silver tongue and quick blade, they outwit warlords and rescue imprisoned troubadours from dungeon keeps.',
    'Their songs keep alive the memories of forgotten heroes, inspiring commoners to rise against tyrannical lords.'
  ],
  Cleric: [
    'Now traveling among humble frontier settlements, they heal the sick and erect holy wards against nocturnal horrors.',
    'Armed with sanctified holy relics and divine blessings, they root out demonic cults that infiltrate royal courts.',
    'They seek the lost chalice of the First Martyr to end an ancient pestilence plaguing the border kingdoms.',
    'Their quiet prayers bring miraculous light to the gloomiest battlefield, turning desperate retreats into glorious victories.'
  ]
};

// Generate an exact 1 or 2 sentence backstory based on character name and class
export function generateCharacterBackstory(name: string, characterClass: CharacterClass, previousStory?: string): string {
  const clsKey = ORIGIN_TEMPLATES[characterClass] ? characterClass : 'Warrior';
  const origins = ORIGIN_TEMPLATES[clsKey] || ORIGIN_TEMPLATES.Warrior;
  const quests = QUEST_TEMPLATES[clsKey] || QUEST_TEMPLATES.Warrior;

  // 25% chance of a punchy 1-sentence backstory, 75% chance of a rich 2-sentence backstory
  const wantSingleSentence = Math.random() < 0.25;

  // Generate combinations until we get one different from previousStory
  for (let attempt = 0; attempt < 30; attempt++) {
    const originFn = origins[Math.floor(Math.random() * origins.length)];
    const sentence1 = originFn(name, characterClass);
    
    let candidate: string;
    if (wantSingleSentence) {
      candidate = sentence1;
    } else {
      const sentence2 = quests[Math.floor(Math.random() * quests.length)];
      candidate = `${sentence1} ${sentence2}`.trim();
    }

    if (candidate !== previousStory) {
      return candidate;
    }
  }

  // Fallback guaranteeing 2 sentences with name and class
  const fallbackSentence1 = `${name} rose from humble beginnings to become a renowned ${characterClass} through relentless valor and devotion.`;
  const fallbackSentence2 = `Today, they roam the far borders of the realm, sworn to defend the realm against the looming shadows of antiquity.`;
  return `${fallbackSentence1} ${fallbackSentence2}`;
}

// Helper to count sentences to guarantee exactly 1 or 2 sentences
export function countSentences(text: string): number {
  if (!text) return 0;
  const matches = text.match(/[^.!?]+[.!?]+/g);
  return matches ? matches.length : 1;
}
