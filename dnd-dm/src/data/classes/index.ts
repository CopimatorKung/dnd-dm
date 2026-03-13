import { artificer } from "./artificer";
import { barbarian } from "./barbarian";
import { bard } from "./bard";
import { bloodhunter } from "./bloodhunter";
import { cleric } from "./cleric";
import { commoner } from "./commoner";
import { druid } from "./druid";
import { fighter } from "./fighter";
import { monk } from "./monk";
import { paladin } from "./paladin";
import { ranger } from "./ranger";
import { rogue } from "./rogue";
import { sorcerer } from "./sorcerer";
import { warlock } from "./warlock";
import { wizard } from "./wizard";

export const CLASSES = [
  artificer,
  barbarian,
  bard,
  bloodhunter,
  cleric,
  commoner,
  druid,
  fighter,
  monk,
  paladin,
  ranger,
  rogue,
  sorcerer,
  warlock,
  wizard,
];

export type ClassDef = (typeof CLASSES)[number];
export type SubclassDef = ClassDef["subclasses"][number];

// Re-export warlock extras so consumers can import from one place
export {
  WARLOCK_SUBCLASS_SPELLS,
  WARLOCK_SUBCLASS_FEATURES,
  ELDRITCH_INVOCATIONS,
  WARLOCK_INVOCATION_COUNT,
  WARLOCK_SLOT_LEVEL,
} from "./warlock";
