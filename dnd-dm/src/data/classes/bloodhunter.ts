export const bloodhunter = {
  id: "bloodhunter",
  name: "Blood Hunter",
  nameTH: "นักล่าเลือด",
  icon: "🩸",
  desc: "Sacrifices own vitality for forbidden blood magic to hunt monsters.",
  hitDie: "d10",
  primaryStat: "STR or DEX",
  subclasses: [
    {
      id: "ghostslayer",
      name: "Order of the Ghostslayer",
      nameTH: "อัศวินปราบวิญญาณ",
      desc: "Specialized in hunting undead and ghosts.",
    },
    {
      id: "lycan",
      name: "Order of the Lycan",
      nameTH: "อัศวินมนุษย์หมาป่า",
      desc: "Control a werewolf curse for power.",
    },
    {
      id: "mutant",
      name: "Order of the Mutant",
      nameTH: "อัศวินกลายพันธุ์",
      desc: "Drink mutagens to transform and gain power.",
    },
    {
      id: "profanesoul",
      name: "Order of the Profane Soul",
      nameTH: "อัศวินวิญญาณต้องห้าม",
      desc: "Wield warlock-like power through blood rites.",
    },
  ],
};
