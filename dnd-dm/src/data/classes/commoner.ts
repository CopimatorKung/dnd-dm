export const commoner = {
  id: "commoner",
  name: "Commoner",
  nameTH: "คนธรรมดา",
  icon: "🧑",
  desc: "ไม่มีพลังพิเศษ ไม่มีเวทมนตร์ — แค่คนธรรมดาที่ถูกโชคชะตาพัดพามาในการผจญภัย",
  hitDie: "d6",
  primaryStat: "CON",
  subclasses: [
    {
      id: "farmer",
      name: "Farmer",
      nameTH: "ชาวนา",
      desc: "เติบโตในไร่นา แข็งแกร่งจากการทำงานหนัก",
    },
    {
      id: "merchant",
      name: "Merchant",
      nameTH: "พ่อค้า",
      desc: "เชี่ยวชาญการต่อรองและรู้จักคนในหลายเมือง",
    },
    {
      id: "innkeeper",
      name: "Innkeeper",
      nameTH: "เจ้าของโรงเตี๊ยม",
      desc: "ได้ยินเรื่องราวทุกอย่าง รู้จักทุกคนในเมือง",
    },
    {
      id: "laborer",
      name: "Laborer",
      nameTH: "กรรมกร",
      desc: "แข็งแกร่งจากการใช้แรงงาน ทนทานเหนือคนทั่วไป",
    },
    {
      id: "street_rat",
      name: "Street Rat",
      nameTH: "เด็กข้างถนน",
      desc: "เอาตัวรอดในเมืองด้วยไหวพริบและความเร็ว",
    },
    {
      id: "scholar_dropout",
      name: "Scholar Dropout",
      nameTH: "นักเรียนหลุดออก",
      desc: "เรียนรู้ครึ่งๆ กลางๆ แต่รู้หลายเรื่องพอใช้ได้",
    },
  ],
};
