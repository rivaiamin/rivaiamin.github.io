export interface Stat {
  name: string;
  label: string;
  value: number;
  baseValue: number;
  bonusValue: number;
  description: string;
  maxVal: number;
}

export type SkillCategory =
  | 'core'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'ai'
  | 'master';

export interface SkillNode {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  level: number;
  maxLevel: number;
  description: string;
  requires?: string[];
  unlocked: boolean;
  x: number;
  y: number;
}

export interface Experience {
  id: string;
  stage: number;
  place: string;
  years: string;
  position: string;
  description: string;
  highlights: string[];
  stack?: string[];
}

/** @deprecated Use Experience — kept for any residual references */
export type QuestType = 'main' | 'side' | 'defeated';

export interface Quest {
  id: string;
  title: string;
  company?: string;
  role?: string;
  type: QuestType;
  period?: string;
  objectives: string[];
  loot: string[];
  difficulty: 'S' | 'A' | 'B' | 'C';
  description: string;
  link?: string;
}

export type WarpRegion = 'identity' | 'project';

export interface WarpPoint {
  id: string;
  name: string;
  label: string;
  url: string;
  icon: string;
  region: WarpRegion;
  /** Position on map as percentage (0–100) */
  x: number;
  y: number;
}

export type GearCategory = 'backend' | 'frontend' | 'database' | 'cloud' | 'ai';

export type Rarity = 'legendary' | 'epic' | 'rare' | 'common';

export interface EquipmentItem {
  id: string;
  name: string;
  category: GearCategory;
  rarity: Rarity;
  stats: { [key: string]: number | string };
  description: string;
  icon: string;
}

export type PassiveCategory = 'class' | 'combat' | 'exploration';

export interface PassiveSkill {
  id: string;
  name: string;
  category: PassiveCategory;
  passiveType: string;
  element: string;
  effect: string;
  lore: string;
}

export interface LoreLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  blurb: string;
}

/** Operative spectrum point — used for the 8-axis radar (4 opposing pairs) */
export interface SpectrumTrait {
  id: string;
  name: string;
  spectrum: string;
  pairId: string;
  value: number;
  maxVal: number;
  description: string;
  color: string;
}
