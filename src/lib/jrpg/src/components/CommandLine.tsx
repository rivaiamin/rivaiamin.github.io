import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import sfx from '../utils/audio';
import { Stat, SkillNode } from '../types';
import {
  PROFILE_LANDING,
  OPERATOR_SPECTRUM,
  PASSIVE_SKILLS,
  PASSIVE_SKILL_GROUPS,
  LORE_LINKS,
  EXPERIENCES,
  PORTFOLIO_QUESTS,
  WARP_POINTS,
} from '../data';

interface CommandLineProps {
  onUnlockCheat: () => void;
  classTitle: string;
  level: number;
  skills: SkillNode[];
  stats: Stat[];
  combatPower: number;
}

interface LogEntry {
  text: string;
  type: 'input' | 'output' | 'success' | 'error';
}

function formatSpectrum(): string {
  const pairs = ['presence', 'lens', 'core', 'pace'] as const;
  return pairs
    .map((pairId) => {
      const traits = OPERATOR_SPECTRUM.filter((t) => t.pairId === pairId);
      const [a, b] = traits;
      if (!a || !b) return '';
      return `  ${a.spectrum}: ${a.name} ${a.value}% / ${b.name} ${b.value}%`;
    })
    .join('\n');
}

function formatSkills(skills: SkillNode[]): string {
  const maxed = skills.filter((s) => s.level === s.maxLevel).length;
  const locked = skills.filter((s) => !s.unlocked).length;
  const header = `SKILL TREE (${skills.length} nodes · ${maxed} maxed · ${locked} locked):\n`;
  const lines = skills
    .slice()
    .sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return b.level - a.level;
    })
    .map((s) => {
      const tag =
        s.level === s.maxLevel ? '[MAX]' : !s.unlocked ? '[LOCKED]' : `[Lv.${s.level}/${s.maxLevel}]`;
      return `  ${s.name} ${tag}`;
    });
  return header + lines.join('\n');
}

export const CommandLine: React.FC<CommandLineProps> = ({
  onUnlockCheat,
  classTitle,
  level,
  skills,
  stats,
  combatPower,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { text: 'Portfolio OS v5.0.0 initialized.', type: 'output' },
    { text: 'Type "help" to display list of executable modules.', type: 'output' },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace' && e.key.length === 1) {
      sfx.playSfx('click');
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    sfx.playSfx('equip');

    const newHistory: LogEntry[] = [...history, { text: `guest@portfolio-os:~$ ${input}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text:
            'Available subroutines:\n' +
            '  about      - Operator identity, class, and dossier summary.\n' +
            '  dossier    - Operative spectrum traits (8-axis radar profile).\n' +
            '  passives   - Lists passive abilities on record.\n' +
            '  skills     - Full skill tree node status.\n' +
            '  experience - Career path stages.\n' +
            '  quests     - Quest log summary.\n' +
            '  lore       - External archive links (CV, GitHub, etc.).\n' +
            '  map        - World map warp portals.\n' +
            '  status     - Combat vitals, attributes, and CP rating.\n' +
            '  cheatcode  - Execute hidden power spell over internal variables.\n' +
            '  clear      - Flushes the system logs console view.',
          type: 'output',
        });
        break;

      case 'about':
        newHistory.push({
          text:
            `DEVELOPER CODENAME: Riva'i Amin\n` +
            `ACTIVE CLASS: ${classTitle.toUpperCase()}\n` +
            `LEVEL: Lv.${level} · CP ${combatPower.toLocaleString()}\n\n` +
            `${PROFILE_LANDING.headline}\n\n` +
            `${PROFILE_LANDING.summary}\n\n` +
            `NICHES: ${PROFILE_LANDING.niches.join(' · ')}`,
          type: 'output',
        });
        break;

      case 'dossier':
      case 'spectrum':
        newHistory.push({
          text: 'OPERATIVE SPECTRUM SCAN:\n' + formatSpectrum(),
          type: 'output',
        });
        break;

      case 'passives':
        newHistory.push({
          text:
            'PASSIVE ABILITIES (click dossier tab for full lore):\n' +
            PASSIVE_SKILL_GROUPS.map((group) => {
              const skills = PASSIVE_SKILLS.filter((s) => s.category === group.id);
              return (
                `  ${group.label.toUpperCase()} (${group.subtitle}):\n` +
                skills.map((p) => `    · ${p.name} [${p.element}]`).join('\n')
              );
            }).join('\n'),
          type: 'output',
        });
        break;

      case 'skills':
        newHistory.push({
          text: formatSkills(skills),
          type: 'output',
        });
        break;

      case 'experience':
        newHistory.push({
          text:
            'CAREER PATH STAGES:\n' +
            EXPERIENCES.map(
              (exp) =>
                `  [STAGE ${String(exp.stage).padStart(2, '0')}] ${exp.place} (${exp.years}) — ${exp.position}`
            ).join('\n'),
          type: 'output',
        });
        break;

      case 'quests':
        newHistory.push({
          text:
            'QUEST LOG SUMMARY:\n' +
            PORTFOLIO_QUESTS.map((q) => {
              const tag = q.type === 'main' ? 'MAIN' : q.type === 'side' ? 'SIDE' : 'ARCHIVE';
              const role = q.role ?? q.company ?? '';
              return `  [${tag}] ${q.title}${role ? ` — ${role}` : ''} [${q.difficulty}]`;
            }).join('\n'),
          type: 'output',
        });
        break;

      case 'lore':
        newHistory.push({
          text:
            'EXTERNAL ARCHIVES:\n' +
            LORE_LINKS.map((link) => `  ${link.blurb.padEnd(18)} -> ${link.url}`).join('\n'),
          type: 'output',
        });
        break;

      case 'map':
        newHistory.push({
          text:
            'WORLD MAP WARP PORTALS:\n' +
            WARP_POINTS.map(
              (p) => `  ${p.name.padEnd(22)} -> ${p.url.replace(/^https?:\/\//, '')}`
            ).join('\n'),
          type: 'output',
        });
        break;

      case 'status':
        newHistory.push({
          text:
            'COMBAT VITALS:\n' +
            stats
              .map((s) => `  ${s.name} (${s.label}): ${s.value}/${s.maxVal}`)
              .join('\n') +
            `\n  CP (Combat Power): ${combatPower.toLocaleString()}\n` +
            `  HP: 2450/2500 · SP: 920/1000\n\n` +
            'DOMINANT SPECTRUM:\n' +
            OPERATOR_SPECTRUM.filter((t) => t.value >= 50)
              .sort((a, b) => b.value - a.value)
              .slice(0, 4)
              .map((t) => `  ${t.spectrum} → ${t.name} (${t.value}%)`)
              .join('\n'),
          type: 'output',
        });
        break;

      case 'cheatcode':
        sfx.playSfx('cheat');
        onUnlockCheat();
        newHistory.push({
          text:
            '===================================================\n' +
            'ALERT: STAT BUFFER OVERFLOW TRIPPED\n' +
            'Executing local cheat wizard override:\n' +
            '  - LEVEL BOOSTED TO 99\n' +
            '  - ALL SKILL TREE NODES MAXED\n' +
            '  - STAT POINTS & SKILL TOKENS OVERFLOW\n' +
            '  - UNLOCKED SECRET CLASS: ULTRA ARCHMAGE DEITY\n' +
            '===================================================',
          type: 'success',
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        sfx.playSfx('error');
        newHistory.push({
          text: `Command "${cmd}" not recognized by core shell. Type "help" for guidelines.`,
          type: 'error',
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="bg-tactical-hud p-5 font-mono text-xs flex flex-col h-[320px] relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-tactical-accent" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Decoder shell</span>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-tactical-accent" />
          <span className="w-2 h-2 bg-tactical-gold" />
          <span className="w-2 h-2 bg-tactical-hp" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2 select-text custom-scrollbar">
        {history.map((entry, index) => {
          let textClass = 'text-gray-300';
          if (entry.type === 'input') textClass = 'text-tactical-accent font-bold';
          if (entry.type === 'success') textClass = 'text-tactical-hp font-bold';
          if (entry.type === 'error') textClass = 'text-red-400';

          return (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              <span className={textClass}>{entry.text}</span>
            </div>
          );
        })}
        <div ref={consoleBottomRef} />
      </div>

      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-white/10 pt-3 shrink-0">
        <span className="text-tactical-accent font-bold">guest@portfolio-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or 'dossier'..."
          className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-gray-600 caret-tactical-accent select-all"
          maxLength={60}
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
