import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quest } from '../types';
import { BookOpen, Trophy, ShieldCheck, CornerDownRight, ExternalLink, Target } from 'lucide-react';
import sfx from '../utils/audio';

interface QuestLogProps {
  quests: Quest[];
}

export const QuestLog: React.FC<QuestLogProps> = ({ quests }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'side' | 'defeated'>('main');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const filteredQuests = quests.filter((q) => q.type === activeTab);

  React.useEffect(() => {
    if (filteredQuests.length > 0) {
      setSelectedQuest(filteredQuests[0]);
    } else {
      setSelectedQuest(null);
    }
  }, [activeTab]);

  const handleQuestSelect = (quest: Quest) => {
    sfx.playSfx('click');
    setSelectedQuest(quest);
  };

  const tabs = [
    { id: 'main' as const, label: 'Main', icon: BookOpen },
    { id: 'side' as const, label: 'Side', icon: Trophy },
    { id: 'defeated' as const, label: 'Archive', icon: ShieldCheck },
  ];

  return (
    <div className="relative flex flex-col h-full min-h-[500px]">
      <div className="flex justify-between items-end mb-5">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Adventure
          </div>
          <h2 className="tactical-title text-3xl">Quest log</h2>
        </div>
      </div>

      <div className="flex gap-1 mb-5">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              sfx.playSfx('click');
              setActiveTab(id);
            }}
            className={`tactical-tab flex items-center gap-1.5 cursor-pointer ${
              activeTab === id ? 'tactical-tab-active' : ''
            }`}
          >
            {activeTab === id && <Target size={10} />}
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-1 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredQuests.map((quest) => {
            const isSelected = selectedQuest?.id === quest.id;
            const isSS = quest.difficulty === 'S';

            return (
              <button
                key={quest.id}
                onClick={() => handleQuestSelect(quest)}
                className={`tactical-row h-auto py-2.5 cursor-pointer ${
                  isSelected ? 'tactical-row-active' : ''
                }`}
              >
                <div
                  className={`w-8 self-stretch flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-tactical-accent text-white' : 'text-tactical-muted'
                  }`}
                >
                  <Target size={14} />
                </div>
                <div className="flex-1 text-left px-3 min-w-0">
                  <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-tactical-ink'}`}>
                    {quest.title}
                  </h3>
                  <div className={`flex gap-2 items-center text-[10px] font-medium ${isSelected ? 'text-gray-400' : 'text-tactical-muted'}`}>
                    {quest.company && <span className="truncate">{quest.company}</span>}
                    {quest.period && <span className="shrink-0">| {quest.period}</span>}
                  </div>
                </div>
                <div className={`tactical-rank mr-2 ${isSS ? 'tactical-rank-ss' : ''}`}>
                  {quest.difficulty}
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3 flex flex-col min-h-[300px] border-l border-tactical-line pl-0 md:pl-6">
          <AnimatePresence mode="wait">
            {selectedQuest ? (
              <motion.div
                key={selectedQuest.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="border-b border-tactical-line pb-3 flex justify-between items-start gap-3">
                    <div>
                      {selectedQuest.role && (
                        <div className="tactical-label mb-1">
                          <div className="tactical-label-ticks">
                            <span /><span /><span />
                          </div>
                          {selectedQuest.role}
                        </div>
                      )}
                      <h3 className="tactical-title text-xl">{selectedQuest.title}</h3>
                    </div>
                    {selectedQuest.link && (
                      <a
                        href={selectedQuest.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-white/60 border border-tactical-line text-tactical-dim hover:text-tactical-accent hover:border-tactical-accent transition-colors"
                        title="View project"
                        onClick={() => sfx.playSfx('click')}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-tactical-dim leading-relaxed italic border-l-2 border-tactical-accent pl-3">
                    {selectedQuest.description}
                  </p>

                  <div className="space-y-2">
                    <div className="tactical-section">Objectives</div>
                    <ul className="space-y-1.5 text-[11px] text-tactical-ink font-medium">
                      {selectedQuest.objectives.map((obj, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-tactical-accent font-bold shrink-0">✓</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-tactical-line pt-4">
                  <div className="tactical-section">Loot</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-tactical-dim font-medium">
                    {selectedQuest.loot.map((loot, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CornerDownRight className="w-3 h-3 text-tactical-accent shrink-0" />
                        <span>{loot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-tactical-muted text-xs">
                Select a quest to inspect objectives and loot
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
