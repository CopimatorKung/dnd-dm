export const artificer = {
  id: "artificer",
  name: "Artificer",
  nameTH: "นักประดิษฐ์เวทย์",
  icon: "⚙️",
  desc: "Crafts magic-infused objects, golems, and wondrous inventions.",
  hitDie: "d8",
  primaryStat: "INT",
  subclasses: [
    {
      id: "alchemist",
      name: "Alchemist",
      nameTH: "นักเล่นแร่แปรธาตุ",
      desc: "Brews potions and throws alchemical vials.",
    },
    {
      id: "armorer",
      name: "Armorer",
      nameTH: "ช่างเกราะ",
      desc: "Wears a powered arcane armor suit.",
    },
    {
      id: "artillerist",
      name: "Artillerist",
      nameTH: "นักปืนใหญ่เวทย์",
      desc: "Conjures arcane cannons and explosives.",
    },
    {
      id: "battlesmith",
      name: "Battle Smith",
      nameTH: "ช่างรบ",
      desc: "Fights alongside a steel defender construct.",
    },
  ],
};
