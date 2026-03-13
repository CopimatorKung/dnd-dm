// ============================================================
// WARLOCK CLASS DEFINITION
// ============================================================
export const warlock = {
  id: "warlock",
  name: "Warlock",
  nameTH: "ผู้ทำสัญญามืด",
  icon: "🌑",
  desc: "Made a pact with a mysterious entity in exchange for eldritch power.",
  hitDie: "d8",
  primaryStat: "CHA",
  subclasses: [
    {
      id: "fiend",
      name: "The Fiend",
      nameTH: "ปีศาจ",
      desc: "Pact with a devil — gain HP on kills.",
    },
    {
      id: "greatoldone",
      name: "Great Old One",
      nameTH: "สิ่งโบราณ",
      desc: "Pact with an unknowable entity — telepathy.",
    },
    {
      id: "archfey",
      name: "Archfey",
      nameTH: "ราชาเฟย์",
      desc: "Pact with a fey lord — charm and beguile.",
    },
    {
      id: "celestial",
      name: "Celestial",
      nameTH: "สวรรค์",
      desc: "Pact with a celestial — heal and radiance.",
    },
    {
      id: "hexblade",
      name: "Hexblade",
      nameTH: "ดาบสาป",
      desc: "Pact with a sentient weapon — use CHA to attack.",
    },
    {
      id: "undead",
      name: "Undead",
      nameTH: "ผีดิบ",
      desc: "Pact with an undead lord — become deathly.",
    },
    {
      id: "fathomless",
      name: "Fathomless",
      nameTH: "ห้วงลึก",
      desc: "Pact with a deep-sea entity — tentacles.",
    },
    {
      id: "genie",
      name: "The Genie",
      nameTH: "จินนี่",
      desc: "Pact with a genie of any elemental type.",
    },
  ],
};

// ============================================================
// WARLOCK SUBCLASS EXPANDED SPELLS
// ============================================================
export const WARLOCK_SUBCLASS_SPELLS: Record<
  string,
  Record<number, string[]>
> = {
  archfey: {
    1: ["Faerie Fire", "Sleep"],
    2: ["Calm Emotions", "Phantasmal Force"],
    3: ["Blink", "Plant Growth"],
    4: ["Dominate Beast", "Greater Invisibility"],
    5: ["Dominate Person", "Seeming"],
  },
  celestial: {
    1: ["Cure Wounds", "Guiding Bolt"],
    2: ["Flaming Sphere", "Lesser Restoration"],
    3: ["Daylight", "Revivify"],
    4: ["Guardian of Faith", "Wall of Fire"],
    5: ["Flame Strike", "Greater Restoration"],
  },
  fathomless: {
    1: ["Create or Destroy Water", "Thunderwave"],
    2: ["Gust of Wind", "Silence"],
    3: ["Lightning Bolt", "Sleet Storm"],
    4: ["Control Water", "Summon Elemental"],
    5: ["Bigby's Hand", "Cone of Cold"],
  },
  fiend: {
    1: ["Burning Hands", "Command"],
    2: ["Blindness/Deafness", "Scorching Ray"],
    3: ["Fireball", "Stinking Cloud"],
    4: ["Fire Shield", "Wall of Fire"],
    5: ["Flame Strike", "Hallow"],
  },
  genie: {
    1: ["Detect Evil and Good", "Sanctuary"],
    2: ["Phantasmal Force", "Spike Growth"],
    3: ["Create Food and Water", "Wind Wall"],
    4: ["Phantasmal Killer", "Stone Shape"],
    5: ["Creation", "Wall of Stone"],
  },
  greatoldone: {
    1: ["Dissonant Whispers", "Tasha's Hideous Laughter"],
    2: ["Detect Thoughts", "Phantasmal Force"],
    3: ["Clairvoyance", "Sending"],
    4: ["Dominate Beast", "Evard's Black Tentacles"],
    5: ["Dominate Person", "Telekinesis"],
  },
  hexblade: {
    1: ["Shield", "Wrathful Smite"],
    2: ["Blur", "Branding Smite"],
    3: ["Blink", "Elemental Weapon"],
    4: ["Phantasmal Killer", "Staggering Smite"],
    5: ["Banishing Smite", "Cone of Cold"],
  },
  undead: {
    1: ["Bane", "False Life"],
    2: ["Blindness/Deafness", "Phantasmal Force"],
    3: ["Phantom Steed", "Speak with Dead"],
    4: ["Death Ward", "Greater Invisibility"],
    5: ["Antilife Shell", "Cloudkill"],
  },
  undying: {
    1: ["False Life", "Ray of Sickness"],
    2: ["Blindness/Deafness", "Silence"],
    3: ["Feign Death", "Speak with Dead"],
    4: ["Aura of Life", "Death Ward"],
    5: ["Contagion", "Legend Lore"],
  },
};

// ============================================================
// WARLOCK SUBCLASS FEATURES
// ============================================================
function profBonus(lvl: number) {
  return Math.floor((lvl - 1) / 4) + 2;
}

export const WARLOCK_SUBCLASS_FEATURES: Record<string, (lvl: number) => any[]> =
  {
    archfey: (lvl) => [
      { name: "Fey Presence", nameTH: "ออร่าเฟย์", max: 1, restOn: "short" },
      ...(lvl >= 6
        ? [
            {
              name: "Misty Escape",
              nameTH: "หายตัวเป็นหมอก",
              max: 1,
              restOn: "short",
            },
          ]
        : []),
      ...(lvl >= 14
        ? [
            {
              name: "Dark Delirium",
              nameTH: "มายาความมืด",
              max: 1,
              restOn: "short",
            },
          ]
        : []),
    ],
    celestial: (lvl) => [
      {
        name: "Healing Light",
        nameTH: "แสงรักษา",
        max: 1 + lvl,
        restOn: "long",
        isPool: true,
      },
    ],
    fathomless: (lvl) => [
      {
        name: "Tentacle of the Deep",
        nameTH: "หนวดแห่งความลึก",
        max: profBonus(lvl),
        restOn: "long",
      },
    ],
    fiend: (lvl) => [
      ...(lvl >= 6
        ? [
            {
              name: "Dark One's Own Luck",
              nameTH: "โชคปีศาจ",
              max: 1,
              restOn: "short",
            },
          ]
        : []),
    ],
    genie: (lvl) => [
      { name: "Bottled Respite", nameTH: "หลบในขวด", max: 1, restOn: "long" },
      ...(lvl >= 6
        ? [
            {
              name: "Elemental Gift (Fly)",
              nameTH: "ของขวัญธาตุ(บิน)",
              max: profBonus(lvl),
              restOn: "long",
            },
          ]
        : []),
    ],
    greatoldone: (lvl) => [
      ...(lvl >= 6
        ? [
            {
              name: "Entropic Ward",
              nameTH: "เกราะเอนโทรปี",
              max: 1,
              restOn: "short",
            },
          ]
        : []),
    ],
    hexblade: (lvl) => [
      {
        name: "Hexblade's Curse",
        nameTH: "คำสาปดาบสาป",
        max: 1,
        restOn: "short",
      },
      ...(lvl >= 6
        ? [
            {
              name: "Accursed Specter",
              nameTH: "亡วิญญาณสาป",
              max: 1,
              restOn: "long",
            },
          ]
        : []),
    ],
    undead: (lvl) => [
      {
        name: "Form of Dread",
        nameTH: "รูปแบบสยองขวัญ",
        max: profBonus(lvl),
        restOn: "long",
      },
      ...(lvl >= 10
        ? [
            {
              name: "Necrotic Husk",
              nameTH: "เปลือกเน่าเปื่อย",
              max: 1,
              restOn: "long",
            },
          ]
        : []),
    ],
    undying: (lvl) => [
      ...(lvl >= 6
        ? [
            {
              name: "Defy Death",
              nameTH: "ท้าทายความตาย",
              max: 1,
              restOn: "long",
            },
          ]
        : []),
      ...(lvl >= 14
        ? [
            {
              name: "Indestructible Life",
              nameTH: "ชีวิตอมตะ",
              max: 1,
              restOn: "short",
            },
          ]
        : []),
    ],
  };

// ============================================================
// ELDRITCH INVOCATIONS (2024 PHB)
// ============================================================
export const ELDRITCH_INVOCATIONS: {
  id: string;
  name: string;
  desc: string;
  minLevel: number;
  prereq: string | null;
  repeatable?: boolean;
}[] = [
  // No level requirement
  {
    id: "armor_of_shadows",
    name: "Armor of Shadows",
    desc: "cast Mage Armor บนตัวเองโดยไม่เสีย spell slot",
    minLevel: 1,
    prereq: null,
  },
  {
    id: "eldritch_mind",
    name: "Eldritch Mind",
    desc: "ได้ Advantage บน CON saving throw เพื่อ maintain Concentration",
    minLevel: 1,
    prereq: null,
  },
  {
    id: "pact_of_the_blade",
    name: "Pact of the Blade",
    desc: "Bonus Action: เรียก Simple/Martial Melee weapon มาในมือ หรือ bond กับ magic weapon ที่แตะ ใช้ CHA แทน STR/DEX สำหรับ attack/damage และ deal Necrotic/Psychic/Radiant ได้",
    minLevel: 1,
    prereq: null,
  },
  {
    id: "pact_of_the_chain",
    name: "Pact of the Chain",
    desc: "เรียน Find Familiar cast ได้โดยไม่เสีย slot เลือก familiar พิเศษได้: Imp, Pseudodragon, Quasit, Skeleton, Slaad Tadpole, Sphinx of Wonder, Sprite, Venomous Snake",
    minLevel: 1,
    prereq: null,
  },
  {
    id: "pact_of_the_tome",
    name: "Pact of the Tome",
    desc: "ตอน Short/Long Rest เรียก Book of Shadows พร้อม 3 cantrip และ 2 level 1 ritual spell จาก class ใดก็ได้ ใช้หนังสือเป็น Spellcasting Focus ได้",
    minLevel: 1,
    prereq: null,
  },
  // Level 2+
  {
    id: "agonizing_blast",
    name: "Agonizing Blast",
    desc: "เลือก 1 Warlock cantrip ที่ deal damage — บวก CHA modifier กับ damage rolls ของ cantrip นั้น",
    minLevel: 2,
    prereq: "Warlock cantrip ที่ deal damage",
    repeatable: true,
  },
  {
    id: "devils_sight",
    name: "Devil's Sight",
    desc: "มองเห็นปกติใน Dim Light และ Darkness ทั้ง magical และ nonmagical ระยะ 120 ft",
    minLevel: 2,
    prereq: null,
  },
  {
    id: "eldritch_spear",
    name: "Eldritch Spear",
    desc: "เลือก 1 Warlock cantrip ที่ deal damage ระยะ 10+ ft — ระยะเพิ่ม 30 × Warlock level",
    minLevel: 2,
    prereq: "Warlock cantrip ที่ deal damage ระยะ 10+ ft",
    repeatable: true,
  },
  {
    id: "fiendish_vigor",
    name: "Fiendish Vigor",
    desc: "cast False Life บนตัวเองโดยไม่เสีย slot ได้ temp HP สูงสุดของลูกเต๋าอัตโนมัติ (ไม่ต้องโรล)",
    minLevel: 2,
    prereq: null,
  },
  {
    id: "lessons_first_ones",
    name: "Lessons of the First Ones",
    desc: "ได้ Origin feat ที่เลือก 1 อัน",
    minLevel: 2,
    prereq: null,
    repeatable: true,
  },
  {
    id: "mask_many_faces",
    name: "Mask of Many Faces",
    desc: "cast Disguise Self โดยไม่เสีย spell slot",
    minLevel: 2,
    prereq: null,
  },
  {
    id: "misty_visions",
    name: "Misty Visions",
    desc: "cast Silent Image โดยไม่เสีย spell slot",
    minLevel: 2,
    prereq: null,
  },
  {
    id: "otherworldly_leap",
    name: "Otherworldly Leap",
    desc: "cast Jump บนตัวเองโดยไม่เสีย spell slot",
    minLevel: 2,
    prereq: null,
  },
  {
    id: "repelling_blast",
    name: "Repelling Blast",
    desc: "เลือก 1 Warlock cantrip ที่ใช้ attack roll — เมื่อโดน Large หรือเล็กกว่า ผลักออก 10 ft",
    minLevel: 2,
    prereq: "Warlock cantrip ที่ deal damage ด้วย attack roll",
    repeatable: true,
  },
  // Level 5+
  {
    id: "ascendant_step",
    name: "Ascendant Step",
    desc: "cast Levitate บนตัวเองโดยไม่เสีย spell slot",
    minLevel: 5,
    prereq: null,
  },
  {
    id: "eldritch_smite",
    name: "Eldritch Smite",
    desc: "ครั้งหนึ่งต่อเทิร์นเมื่อโดนด้วย pact weapon ใช้ spell slot เพิ่ม 1d8 Force damage ต่อ slot level และ knock Prone (Huge หรือเล็กกว่า)",
    minLevel: 5,
    prereq: "Pact of the Blade",
  },
  {
    id: "gaze_two_minds",
    name: "Gaze of Two Minds",
    desc: "Bonus Action: รับรู้ผ่านประสาทสัมผัสของสิ่งมีชีวิตที่สมัครใจ maintain ได้ทุกเทิร์น cast spell จาก space ของตัวเองหรือสิ่งมีชีวิตนั้นได้ (ในระยะ 60 ft)",
    minLevel: 5,
    prereq: null,
  },
  {
    id: "gift_of_depths",
    name: "Gift of the Depths",
    desc: "หายใจใต้น้ำได้ Swim Speed = Speed cast Water Breathing 1 ครั้งต่อ Long Rest โดยไม่เสีย slot",
    minLevel: 5,
    prereq: null,
  },
  {
    id: "investment_chain_master",
    name: "Investment of the Chain Master",
    desc: "Familiar ได้ Fly/Swim Speed 40 ft Bonus Action สั่งโจมตี damage เป็น Necrotic/Radiant ได้ ใช้ spell save DC Reaction ให้ resistance",
    minLevel: 5,
    prereq: "Pact of the Chain",
  },
  {
    id: "master_myriad_forms",
    name: "Master of Myriad Forms",
    desc: "cast Alter Self โดยไม่เสีย spell slot",
    minLevel: 5,
    prereq: null,
  },
  {
    id: "one_with_shadows",
    name: "One with Shadows",
    desc: "ในบริเวณ Dim Light หรือ Darkness cast Invisibility บนตัวเองโดยไม่เสีย slot",
    minLevel: 5,
    prereq: null,
  },
  {
    id: "thirsting_blade",
    name: "Thirsting Blade",
    desc: "ได้ Extra Attack สำหรับ pact weapon — โจมตี 2 ครั้งต่อ Attack action",
    minLevel: 5,
    prereq: "Pact of the Blade",
  },
  // Level 7+
  {
    id: "whispers_of_grave",
    name: "Whispers of the Grave",
    desc: "cast Speak with Dead โดยไม่เสีย spell slot",
    minLevel: 7,
    prereq: null,
  },
  // Level 9+
  {
    id: "gift_of_protectors",
    name: "Gift of the Protectors",
    desc: "สิ่งมีชีวิตที่เขียนชื่อใน Book (เท่า CHA mod) เมื่อ HP ถึง 0 แต่ไม่ตาย เหลือ 1 HP แทน (1 ครั้งต่อ Long Rest)",
    minLevel: 9,
    prereq: "Pact of the Tome",
  },
  {
    id: "lifedrinker",
    name: "Lifedrinker",
    desc: "ครั้งหนึ่งต่อเทิร์นเมื่อโดนด้วย pact weapon เพิ่ม 1d6 Necrotic/Psychic/Radiant damage และใช้ Hit Dice ฟื้น HP ได้",
    minLevel: 9,
    prereq: "Pact of the Blade",
  },
  {
    id: "visions_distant",
    name: "Visions of Distant Realms",
    desc: "cast Arcane Eye โดยไม่เสีย spell slot",
    minLevel: 9,
    prereq: null,
  },
  // Level 12+
  {
    id: "devouring_blade",
    name: "Devouring Blade",
    desc: "Extra Attack ของ Thirsting Blade ให้โจมตีเพิ่ม 2 ครั้ง แทน 1 ครั้ง (รวม 3 ครั้งต่อ Attack action)",
    minLevel: 12,
    prereq: "Thirsting Blade",
  },
  // Level 15+
  {
    id: "witch_sight",
    name: "Witch Sight",
    desc: "ได้ Truesight ระยะ 30 ft",
    minLevel: 15,
    prereq: null,
  },
];

// ============================================================
// WARLOCK INVOCATION COUNT PER LEVEL (2024 PHB)
// ============================================================
// จำนวน invocations สะสมตาม level (index = level-1)
export const WARLOCK_INVOCATION_COUNT = [
  1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10,
];

// ============================================================
// WARLOCK PACT SLOT LEVEL PER CHARACTER LEVEL
// ============================================================
export const WARLOCK_SLOT_LEVEL = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
];
