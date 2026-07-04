import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DEFAULT_STATS,
  INITIAL_SKILL_NODES,
  EXPERIENCES,
  PORTFOLIO_QUESTS,
  WARP_POINTS,
  EQUIPMENT_ITEMS,
} from './data';
import { Stat, SkillNode, EquipmentItem } from './types';
import { HeroArea } from './components/HeroArea';
import { StatusPanel } from './components/StatusPanel';
import { SkillTree } from './components/SkillTree';
import { ExperiencePath } from './components/ExperiencePath';
import { QuestLog } from './components/QuestLog';
import { WorldMap } from './components/WorldMap';
import { EquipmentGrid } from './components/EquipmentGrid';
import { CommandLine } from './components/CommandLine';
import {
  Volume2,
  VolumeX,
  ShieldAlert,
  Cpu,
  Sparkles,
  Code,
  Terminal,
  Trophy,
  Target,
  Globe,
  Battery,
  Zap,
  Map,
  Compass,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import sfx from './utils/audio';
import pageBackground from '../assets/background.jpg';
import raysaberLogo from '../assets/raysaber.png';

const TABS = [
  { id: 'status' as const, label: 'Stats', icon: Cpu },
  { id: 'skills' as const, label: 'Skills', icon: Code },
  { id: 'experience' as const, label: 'Experience', icon: Map },
  { id: 'quests' as const, label: 'Quests', icon: Trophy },
  { id: 'map' as const, label: 'Map', icon: Compass },
  { id: 'gear' as const, label: 'Gear', icon: ShieldAlert },
  { id: 'shell' as const, label: 'Shell', icon: Terminal },
];

export default function App() {
  const [level, setLevel] = useState(8);
  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS);
  const [skills, setSkills] = useState<SkillNode[]>(INITIAL_SKILL_NODES);
  const [statPoints, setStatPoints] = useState(5);
  const [skillPoints, setSkillPoints] = useState(3);

  const [equippedItems, setEquippedItems] = useState<EquipmentItem[]>(
    EQUIPMENT_ITEMS.filter((item) =>
      ['gear-laravel', 'gear-vue', 'gear-postgresql', 'gear-gcp'].includes(item.id)
    )
  );
  const [inventoryItems, setInventoryItems] = useState<EquipmentItem[]>(
    EQUIPMENT_ITEMS.filter((item) =>
      !['gear-laravel', 'gear-vue', 'gear-postgresql', 'gear-gcp'].includes(item.id)
    )
  );

  const [isMuted, setIsMuted] = useState(false);
  const [isWindowed, setIsWindowed] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('portfolio-windowed');
    if (saved !== null) return saved === 'true';
    return window.innerWidth >= 1024;
  });
  const [forceFullscreen, setForceFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'skills' | 'experience' | 'quests' | 'map' | 'gear' | 'shell'>('status');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setForceFullscreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const showWindowed = isWindowed && !forceFullscreen;

  const handleToggleWindowed = () => {
    if (forceFullscreen) return;
    sfx.playSfx('click');
    setIsWindowed((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-windowed', String(next));
      return next;
    });
  };

  const handleToggleMute = () => {
    const nextState = sfx.toggleMute();
    setIsMuted(nextState);
  };

  const handleEquipItem = (newItem: EquipmentItem) => {
    const currentEquipped = equippedItems.find((item) => item.category === newItem.category);

    if (currentEquipped) {
      setEquippedItems((prev) => prev.map((item) => (item.id === currentEquipped.id ? newItem : item)));
      setInventoryItems((prev) => prev.map((item) => (item.id === newItem.id ? currentEquipped : item)));
    } else {
      setEquippedItems((prev) => [...prev, newItem]);
      setInventoryItems((prev) => prev.filter((item) => item.id !== newItem.id));
    }
  };

  const handleSkillUpgrade = (skillId: string) => {
    if (skillPoints <= 0) return;

    setSkills((prevSkills) => {
      const updated = prevSkills.map((s) => {
        if (s.id === skillId) {
          return { ...s, level: Math.min(s.maxLevel, s.level + 1) };
        }
        return s;
      });

      return updated.map((skill) => {
        if (skill.requires) {
          const meetsRequirements = skill.requires.every((reqId) => {
            const reqSkill = updated.find((s) => s.id === reqId);
            return reqSkill && reqSkill.level === reqSkill.maxLevel;
          });
          return { ...skill, unlocked: meetsRequirements };
        }
        return skill;
      });
    });

    setSkillPoints((prev) => prev - 1);
  };

  const handleUnlockCheat = () => {
    setLevel(99);
    setStatPoints(99);
    setSkillPoints(99);

    setSkills((prev) =>
      prev.map((s) => ({
        ...s,
        unlocked: true,
        level: s.maxLevel,
      }))
    );

    setStats((prev) =>
      prev.map((s) => ({
        ...s,
        value: s.maxVal,
        baseValue: s.maxVal - 10,
        bonusValue: 10,
      }))
    );
  };

  const derivedStats = useMemo(() => {
    return stats.map((stat) => {
      let gearBonus = 0;

      equippedItems.forEach((item) => {
        const bonus = item.rarity === 'legendary' ? 8 : item.rarity === 'epic' ? 5 : 3;
        if (stat.name === 'ATK' && item.category === 'backend') gearBonus += bonus;
        if (stat.name === 'SPD' && item.category === 'frontend') gearBonus += bonus;
        if (stat.name === 'DEF' && item.category === 'cloud') gearBonus += bonus;
        if (stat.name === 'INT' && (item.category === 'database' || item.category === 'ai')) gearBonus += bonus;
        if (stat.name === 'LUK' && item.category === 'ai') gearBonus += Math.floor(bonus / 2);
      });

      return {
        ...stat,
        value: Math.min(stat.maxVal, stat.value + gearBonus),
        bonusValue: stat.bonusValue + gearBonus,
      };
    });
  }, [stats, equippedItems]);

  /** Class identity follows base attributes; gear affects combat power only. */
  const classTitle = useMemo(() => {
    if (level === 99) return 'Ultra Archmage Deity';

    const maxStat = stats.reduce((max, s) => (s.value > max.value ? s : max), stats[0]);
    const minStat = stats.reduce((min, s) => (s.value < min.value ? s : min), stats[0]);

    if (maxStat.value - minStat.value < 15) {
      return 'Full-Stack Spellblade';
    }

    switch (maxStat.name) {
      case 'ATK':
        return 'Backend Necromancer';
      case 'DEF':
        return 'DevOps Fortress Guardian';
      case 'SPD':
        return 'Omni-Stance Ranger';
      case 'INT':
        return 'Architect Projector';
      case 'LUK':
        return 'Harvest Conservationist';
      default:
        return 'Full-Stack Spellblade';
    }
  }, [stats, level]);

  const combatPower = useMemo(() => {
    const atk = derivedStats.find((s) => s.name === 'ATK')?.value || 0;
    const def = derivedStats.find((s) => s.name === 'DEF')?.value || 0;
    const spd = derivedStats.find((s) => s.name === 'SPD')?.value || 0;
    const int = derivedStats.find((s) => s.name === 'INT')?.value || 0;
    const luk = derivedStats.find((s) => s.name === 'LUK')?.value || 0;

    return level * 500 + atk * 12 + def * 10 + spd * 15 + int * 14 + luk * 8;
  }, [derivedStats, level]);

  return (
    <div className={`${showWindowed ? 'game-shell' : 'game-shell-fullscreen'} text-tactical-ink font-sans selection:bg-tactical-accent selection:text-white`}>
      {/* Decorative art — only in fullscreen desktop */}
      {!showWindowed && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <img
              src={pageBackground}
              alt=""
              className="h-full w-[200%] max-w-none object-cover object-left select-none opacity-20"
            />
          </div>
        </div>
      )}

      {/* Game viewport */}
      <div className={`game-viewport relative z-10 ${showWindowed ? 'game-viewport-windowed' : ''}`}>
        {/* Window chrome */}
        {showWindowed && (
          <div className="h-7 bg-tactical-hud border-b border-black flex items-center justify-between px-3 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tactical-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-tactical-gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-tactical-hp" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Portfolio OS
            </span>
            <span className="text-[9px] text-gray-500 tabular-nums w-16 text-right">1280×860</span>
          </div>
        )}

        <div className={`relative flex flex-col flex-1 min-h-0 ${showWindowed ? 'game-viewport-scroll' : 'min-h-dvh'}`}>
          {/* Page art inside windowed frame */}
          {showWindowed && (
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <img
                  src={pageBackground}
                  alt=""
                  className="h-full w-[200%] max-w-none object-cover object-left select-none opacity-15"
                />
              </div>
            </div>
          )}

          {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-tactical-bg z-50 flex flex-col items-center justify-center p-6 text-center select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div
                className="absolute inset-0 blur-2xl opacity-40 scale-125 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #2080c0 0%, transparent 70%)' }}
                aria-hidden
              />
              <img
                src={raysaberLogo}
                alt="Raysaber"
                className="relative w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_8px_24px_rgba(32,128,192,0.35)]"
              />
            </motion.div>

            <div className="tactical-label mb-4">
              <div className="tactical-label-ticks">
                <span /><span /><span /><span />
              </div>
              Personnel
            </div>
            <h1 className="tactical-title text-3xl mb-2">Portfolio OS</h1>
            <p className="text-tactical-muted text-[10px] tracking-[0.2em] uppercase">Loading status console</p>

            <div className="w-56 tactical-bar mt-8">
              <motion.div
                className="tactical-bar-fill bg-tactical-accent"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top HUD bar */}
      <header
        id="jrpg-header-bar"
        className="h-10 bg-tactical-hud text-white flex items-center justify-between px-4 z-20 shrink-0 select-none"
      >
        <div className="flex items-center gap-5 text-xs font-bold tracking-widest">
          <div className="flex items-center bg-white text-black px-2 py-0.5 relative -left-4 pl-5 pr-3">
            <Globe size={14} className="mr-1.5" />
            <span className="text-[10px] font-black">S</span>
            <span className="absolute -right-2 -top-1.5 bg-tactical-accent text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center border-2 border-tactical-hud">
              8
            </span>
          </div>
          <div className="hidden sm:flex items-center text-tactical-gold">
            <Sparkles size={12} className="mr-1.5" />
            <span className="tabular-nums">4,295</span>
          </div>
          <div className="hidden sm:flex items-center text-orange-400">
            <Battery size={12} className="mr-1.5" />
            <span className="tabular-nums">45/50</span>
          </div>
          <div className="flex items-center text-tactical-hp">
            <Zap size={12} className="mr-1.5" />
            <span className="tabular-nums">49/120</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[11px] font-bold tracking-[0.2em] text-[#888]">
          <span className="text-white hidden sm:inline">INFO</span>
          {!forceFullscreen && (
            <button
              onClick={handleToggleWindowed}
              className="hover:text-white transition-colors cursor-pointer"
              title={showWindowed ? 'Switch to fullscreen' : 'Switch to windowed mode'}
            >
              {showWindowed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={handleToggleMute}
            className="hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main board */}
      <div className="relative z-10 w-full p-4 md:p-6 flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow">
          {/* Left hero column */}
          <div className="lg:col-span-4 space-y-4">
            <HeroArea
              level={level}
              className={classTitle}
              combatPower={combatPower}
              stats={derivedStats}
            />

            {/* Thin status strip */}
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-tactical-muted border-t border-tactical-line pt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-tactical-hp" />
                Online
              </span>
              <span className="text-tactical-dim">Port 3000</span>
              <span className="ml-auto tabular-nums text-tactical-ink">{combatPower.toLocaleString()} CP</span>
            </div>
          </div>

          {/* Right tabbed panels */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <nav id="jrpg-tabs-bar" className="flex flex-wrap gap-1">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      sfx.playSfx('click');
                      setActiveTab(id);
                    }}
                    className={`tactical-tab flex items-center gap-1.5 cursor-pointer ${
                      isActive ? 'tactical-tab-active' : ''
                    }`}
                  >
                    {isActive && <Target size={10} />}
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex-grow min-h-[460px]">
              <AnimatePresence mode="wait">
                {activeTab === 'status' && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <StatusPanel classTitle={classTitle} />
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <SkillTree
                      skills={skills}
                      onSkillUpgrade={handleSkillUpgrade}
                      skillPoints={skillPoints}
                    />
                  </motion.div>
                )}

                {activeTab === 'experience' && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <ExperiencePath experiences={EXPERIENCES} />
                  </motion.div>
                )}

                {activeTab === 'quests' && (
                  <motion.div
                    key="quests"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <QuestLog quests={PORTFOLIO_QUESTS} />
                  </motion.div>
                )}

                {activeTab === 'map' && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <WorldMap points={WARP_POINTS} />
                  </motion.div>
                )}

                {activeTab === 'gear' && (
                  <motion.div
                    key="gear"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <EquipmentGrid
                      equippedItems={equippedItems}
                      inventoryItems={inventoryItems}
                      onEquipItem={handleEquipItem}
                    />
                  </motion.div>
                )}

                {activeTab === 'shell' && (
                  <motion.div
                    key="shell"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <CommandLine
                      onUnlockCheat={handleUnlockCheat}
                      classTitle={classTitle}
                      level={level}
                      skills={skills}
                      stats={derivedStats}
                      combatPower={combatPower}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <footer className="text-center text-[9px] text-tactical-muted py-4 border-t border-tactical-line mt-6 select-none tracking-[0.15em] uppercase">
          Portfolio status console · 2026
        </footer>
      </div>
        </div>
      </div>
    </div>
  );
}
