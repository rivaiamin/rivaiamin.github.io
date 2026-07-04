import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SkillCategory, SkillNode } from '../types';
import * as Icons from 'lucide-react';
import sfx from '../utils/audio';

interface SkillTreeProps {
  skills: SkillNode[];
  onSkillUpgrade: (skillId: string) => void;
  skillPoints: number;
}

type SkillView = 'map' | 'roster';

const MAP_WIDTH = 720;
const MAP_HEIGHT = 700;
const MAP_SCALE = 0.82;

const CATEGORY_STYLE: Record<
  SkillCategory,
  { fill: string; stroke: string; label: string; text: string }
> = {
  core: { fill: '#1a1a1a', stroke: '#ffffff', label: 'Core', text: '#ffffff' },
  frontend: { fill: '#2080c0', stroke: '#ffffff', label: 'Frontend', text: '#ffffff' },
  backend: { fill: '#2b5797', stroke: '#ffffff', label: 'Backend', text: '#ffffff' },
  devops: { fill: '#00a300', stroke: '#ffffff', label: 'DevOps', text: '#ffffff' },
  ai: { fill: '#e3a21a', stroke: '#ffffff', label: 'AI / ML', text: '#ffffff' },
  master: { fill: '#603cba', stroke: '#ffcc00', label: 'Master', text: '#ffffff' },
};

const categories = ['all', 'core', 'frontend', 'backend', 'devops', 'ai', 'master'] as const;

function categoryLabel(cat: string) {
  if (cat === 'all') return 'All';
  return CATEGORY_STYLE[cat as SkillCategory]?.label ?? cat;
}

function renderSkillIcon(iconName: string, className: string = 'w-5 h-5') {
  const IconComponent = (Icons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <Icons.HelpCircle className={className} />;
}

function nodeStyle(skill: SkillNode, isSelected: boolean) {
  const palette = CATEGORY_STYLE[skill.category];
  if (!skill.unlocked) {
    return {
      backgroundColor: '#f4f5f7',
      borderColor: '#ccc',
      color: '#999',
    };
  }
  if (isSelected) {
    return {
      backgroundColor: palette.fill,
      borderColor: palette.stroke,
      color: palette.text,
      boxShadow: `0 0 0 2px ${palette.stroke}`,
    };
  }
  return {
    backgroundColor: palette.fill,
    borderColor: palette.stroke,
    color: palette.text,
    opacity: skill.level === skill.maxLevel ? 1 : 0.85,
  };
}

interface SkillDetailPanelProps {
  selectedSkill: SkillNode;
  skills: SkillNode[];
  skillPoints: number;
  onUpgrade: (skill: SkillNode) => void;
}

const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({
  selectedSkill,
  skills,
  skillPoints,
  onUpgrade,
}) => (
  <div className="w-full lg:w-72 shrink-0 flex flex-col justify-between z-10 border-t lg:border-t-0 lg:border-l border-tactical-line pt-4 lg:pt-0 pl-0 lg:pl-6">
    <div className="space-y-4">
      <div className="flex gap-3 items-start">
        <div
          className="p-2.5 shrink-0 border-2"
          style={
            selectedSkill.unlocked
              ? {
                  backgroundColor: CATEGORY_STYLE[selectedSkill.category].fill,
                  borderColor: CATEGORY_STYLE[selectedSkill.category].stroke,
                  color: CATEGORY_STYLE[selectedSkill.category].text,
                }
              : { backgroundColor: '#e5e5e5', borderColor: '#ccc', color: '#999' }
          }
        >
          {renderSkillIcon(selectedSkill.icon, 'w-6 h-6')}
        </div>
        <div>
          <div className="tactical-label mb-0.5">
            <div className="tactical-label-ticks">
              <span /><span /><span />
            </div>
            {categoryLabel(selectedSkill.category)}
          </div>
          <h3 className="tactical-title text-xl">{selectedSkill.name}</h3>
        </div>
      </div>

      <div className="space-y-3 text-[11px]">
        <div>
          <div className="flex justify-between text-tactical-muted mb-1 font-bold tracking-widest uppercase text-[10px]">
            <span>Mastery</span>
            <span className="tabular-nums text-tactical-ink">
              {selectedSkill.level === selectedSkill.maxLevel
                ? 'Max'
                : `${selectedSkill.level} / ${selectedSkill.maxLevel}`}
            </span>
          </div>
          <div className="tactical-bar">
            <div
              className="tactical-bar-fill"
              style={{
                width: `${(selectedSkill.level / selectedSkill.maxLevel) * 100}%`,
                backgroundColor: CATEGORY_STYLE[selectedSkill.category].fill,
              }}
            />
          </div>
        </div>

        <p className="text-tactical-dim leading-relaxed text-xs">{selectedSkill.description}</p>

        {selectedSkill.requires && (
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="text-tactical-muted font-bold tracking-widest uppercase">Requires</span>
            {selectedSkill.requires.map((reqId) => {
              const reqNode = skills.find((s) => s.id === reqId);
              const reqMaxed = reqNode?.level === reqNode?.maxLevel;
              return (
                <span
                  key={reqId}
                  className="px-1.5 py-0.5 font-bold border"
                  style={{
                    backgroundColor: reqMaxed ? `${CATEGORY_STYLE[reqNode!.category].fill}22` : '#f4f5f7',
                    borderColor: reqNode ? CATEGORY_STYLE[reqNode.category].fill : '#ccc',
                    color: reqNode ? CATEGORY_STYLE[reqNode.category].fill : '#666',
                  }}
                >
                  {reqNode ? reqNode.name : reqId}
                  {reqNode && !reqMaxed ? ' (incomplete)' : ''}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>

    <div className="pt-4 border-t border-tactical-line mt-4">
      <button
        onClick={() => onUpgrade(selectedSkill)}
        disabled={
          selectedSkill.level >= selectedSkill.maxLevel ||
          skillPoints <= 0 ||
          !selectedSkill.unlocked
        }
        className={`w-full font-bold text-[11px] py-2.5 px-3 tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
          selectedSkill.level >= selectedSkill.maxLevel
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : skillPoints <= 0 || !selectedSkill.unlocked
            ? 'bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed'
            : 'bg-tactical-accent text-white hover:bg-tactical-accent-dark'
        }`}
      >
        {selectedSkill.level >= selectedSkill.maxLevel
          ? 'Node maxed'
          : !selectedSkill.unlocked
          ? 'Prerequisites incomplete'
          : 'Upgrade (1 token)'}
      </button>
    </div>
  </div>
);

export const SkillTree: React.FC<SkillTreeProps> = ({
  skills,
  onSkillUpgrade,
  skillPoints,
}) => {
  const defaultSkill = skills.find((s) => s.id === 'fe') ?? skills[0];
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(defaultSkill);
  const [activeCategory, setActiveCategory] = useState<'all' | SkillCategory>('all');
  const [activeView, setActiveView] = useState<SkillView>('map');

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const handleNodeClick = (skill: SkillNode) => {
    sfx.playSfx('click');
    setSelectedSkill(skill);
  };

  const handleUpgrade = (skill: SkillNode) => {
    if (skill.level >= skill.maxLevel || skillPoints <= 0 || !skill.unlocked) {
      sfx.playSfx('error');
      return;
    }

    if (skill.level + 1 === skill.maxLevel) {
      sfx.playSfx('levelup');
    } else {
      sfx.playSfx('stat');
    }

    onSkillUpgrade(skill.id);

    setSelectedSkill((prev) =>
      prev && prev.id === skill.id ? { ...prev, level: prev.level + 1 } : prev
    );
  };

  const dependencyLines = React.useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; active: boolean; id: string }[] = [];
    skills.forEach((skill) => {
      if (skill.requires) {
        skill.requires.forEach((reqId) => {
          const requiredSkill = skills.find((s) => s.id === reqId);
          if (requiredSkill) {
            lines.push({
              x1: requiredSkill.x,
              y1: requiredSkill.y,
              x2: skill.x,
              y2: skill.y,
              active: requiredSkill.level === requiredSkill.maxLevel && skill.unlocked,
              id: `${requiredSkill.id}-${skill.id}`,
            });
          }
        });
      }
    });
    return lines;
  }, [skills]);

  const subTabs: { id: SkillView; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Tree Map', icon: <Icons.GitBranch size={12} /> },
    { id: 'roster', label: 'Skill Roster', icon: <Icons.List size={12} /> },
  ];

  return (
    <div className="relative flex flex-col h-full min-h-[520px]">
      <div className="flex justify-between items-end mb-3">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Organization
          </div>
          <h2 className="tactical-title text-3xl">Skill Tree</h2>
          <p className="text-xs text-tactical-muted mt-1 font-medium hidden sm:block">
            {activeView === 'map'
              ? 'Click nodes to inspect branches and upgrade paths'
              : 'Browse and filter all learned skills'}
          </p>
        </div>

        <div className="bg-tactical-panel text-white px-3 py-1.5 text-center">
          <p className="text-[9px] tracking-widest text-gray-400 font-bold">TOKENS</p>
          <p className="font-black text-tactical-gold text-lg tabular-nums leading-none">{skillPoints}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sfx.playSfx('click');
              setActiveView(tab.id);
            }}
            className={`tactical-tab cursor-pointer flex items-center gap-1.5 ${
              activeView === tab.id ? 'tactical-tab-active' : ''
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {activeView === 'map' ? (
          <div className="flex-1 flex flex-col min-h-0 min-w-0">
            <div className="relative flex-1 border border-tactical-line bg-white/40 overflow-auto min-h-[420px] lg:min-h-[480px]">
              <div
                className="relative mx-auto p-4"
                style={{
                  width: MAP_WIDTH * MAP_SCALE + 32,
                  minHeight: MAP_HEIGHT * MAP_SCALE + 32,
                }}
              >
                <svg
                  className="absolute top-4 left-4 pointer-events-none z-0"
                  width={MAP_WIDTH * MAP_SCALE}
                  height={MAP_HEIGHT * MAP_SCALE}
                  viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                >
                  {dependencyLines.map((line) => (
                    <line
                      key={line.id}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={line.active ? '#2080c0' : '#d0d0d0'}
                      strokeWidth={line.active ? 2 : 1.5}
                      strokeDasharray={line.active ? undefined : '4 4'}
                    />
                  ))}
                </svg>

                <div
                  className="absolute top-4 left-4 origin-top-left"
                  style={{
                    width: MAP_WIDTH,
                    height: MAP_HEIGHT,
                    transform: `scale(${MAP_SCALE})`,
                  }}
                >
                  {skills.map((skill) => {
                    const isSelected = selectedSkill?.id === skill.id;
                    const style = nodeStyle(skill, isSelected);
                    const isMaster = skill.category === 'master';
                    const size = isMaster ? 40 : 32;

                    return (
                      <motion.button
                        key={skill.id}
                        onClick={() => handleNodeClick(skill)}
                        className={`absolute flex items-center justify-center cursor-pointer select-none border-2 ${
                          !skill.unlocked ? 'cursor-not-allowed' : ''
                        }`}
                        style={{
                          width: size,
                          height: size,
                          left: `${skill.x - size / 2}px`,
                          top: `${skill.y - size / 2}px`,
                          ...style,
                          borderWidth: isMaster ? 3 : 2,
                        }}
                        title={skill.name}
                        whileHover={skill.unlocked ? { scale: 1.12 } : undefined}
                      >
                        {renderSkillIcon(skill.icon, isMaster ? 'w-5 h-5' : 'w-4 h-4')}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="sticky bottom-0 left-0 right-0 flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider pointer-events-none pt-2 mt-auto bg-gradient-to-t from-white/90 to-transparent">
                  {(Object.keys(CATEGORY_STYLE) as SkillCategory[]).map((cat) => (
                    <span key={cat} className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 border border-tactical-line">
                      <span
                        className="w-2.5 h-2.5 border shrink-0"
                        style={{
                          backgroundColor: CATEGORY_STYLE[cat].fill,
                          borderColor: CATEGORY_STYLE[cat].stroke,
                        }}
                      />
                      {CATEGORY_STYLE[cat].label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 min-w-0">
            <div className="flex gap-1 mb-3 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sfx.playSfx('click');
                    setActiveCategory(cat);
                  }}
                  className={`tactical-tab cursor-pointer flex items-center gap-1 text-[10px] ${
                    activeCategory === cat ? 'tactical-tab-active' : ''
                  }`}
                >
                  {activeCategory === cat && <Icons.Target size={10} />}
                  {categoryLabel(cat)}
                </button>
              ))}
            </div>

            <div className="flex text-[10px] text-tactical-muted font-bold tracking-widest uppercase mb-2 px-2">
              <div className="w-8" />
              <div className="flex-1">Name</div>
              <div className="w-24">Branch</div>
              <div className="w-14">Lvl</div>
              <div className="w-10 text-center">Rank</div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar min-h-[420px] lg:min-h-[480px]">
              {filteredSkills.map((skill) => {
                const isActive = selectedSkill?.id === skill.id;
                const isMaxed = skill.level === skill.maxLevel;
                const rank = isMaxed ? 'SS' : skill.level >= 3 ? 'S' : skill.level >= 2 ? 'A' : 'B';
                const palette = CATEGORY_STYLE[skill.category];

                return (
                  <button
                    key={skill.id}
                    onClick={() => handleNodeClick(skill)}
                    className={`tactical-row h-10 cursor-pointer ${isActive ? 'tactical-row-active' : ''} ${
                      !skill.unlocked ? 'opacity-50' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-full flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-tactical-accent text-white' : 'text-tactical-muted'
                      }`}
                    >
                      <Icons.Target size={14} />
                    </div>
                    <div className="flex-1 text-left px-3 truncate flex items-center gap-2">
                      <div
                        className="w-6 h-6 flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: skill.unlocked ? palette.fill : '#e5e5e5',
                          borderColor: skill.unlocked ? palette.stroke : '#ccc',
                          color: skill.unlocked ? palette.text : '#999',
                        }}
                      >
                        {renderSkillIcon(skill.icon, 'w-3.5 h-3.5')}
                      </div>
                      <span className={isActive ? 'text-white' : 'text-tactical-ink'}>{skill.name}</span>
                    </div>
                    <div
                      className={`w-24 text-left text-[11px] font-medium ${isActive ? 'text-gray-300' : ''}`}
                      style={{ color: isActive ? undefined : palette.fill }}
                    >
                      {categoryLabel(skill.category)}
                    </div>
                    <div className="w-14 text-left flex items-center gap-1 tabular-nums">
                      <span className="text-[10px] text-gray-500">Lv</span>
                      <span>
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className={`tactical-rank mr-2 ${rank === 'SS' ? 'tactical-rank-ss' : ''}`}>
                      {rank}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedSkill && (
          <SkillDetailPanel
            selectedSkill={selectedSkill}
            skills={skills}
            skillPoints={skillPoints}
            onUpgrade={handleUpgrade}
          />
        )}
      </div>
    </div>
  );
};
