import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Experience } from '../types';
import { MapPin, Calendar, Briefcase, CircleDot } from 'lucide-react';
import sfx from '../utils/audio';

interface ExperiencePathProps {
  experiences: Experience[];
}

export const ExperiencePath: React.FC<ExperiencePathProps> = ({ experiences }) => {
  const stages = [...experiences].sort((a, b) => a.stage - b.stage);
  const [selected, setSelected] = useState<Experience>(stages[stages.length - 1] ?? stages[0]);

  const handleSelect = (exp: Experience) => {
    sfx.playSfx('click');
    setSelected(exp);
  };

  const stageLabel = String(selected.stage).padStart(2, '0');

  return (
    <div className="relative flex flex-col h-full min-h-[500px]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Career path
          </div>
          <h2 className="tactical-title text-3xl">Experience</h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-tactical-muted font-bold tracking-widest uppercase">Stages</p>
          <p className="font-black tabular-nums text-tactical-ink">{stages.length}</p>
        </div>
      </div>

      <div className="relative mb-8 px-2">
        <div className="absolute top-1/2 left-6 right-6 h-px bg-tactical-line -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-6 h-px bg-tactical-accent -translate-y-1/2 transition-all duration-300"
          style={{
            width: stages.length > 1
              ? `${((selected.stage - 1) / (stages.length - 1)) * 100}%`
              : '0%',
          }}
        />

        <div className="relative flex justify-between items-center">
          {stages.map((exp) => {
            const isActive = selected.id === exp.id;
            const isPast = exp.stage <= selected.stage;

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => handleSelect(exp)}
                className="group relative flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-tactical-accent"
                aria-pressed={isActive}
                aria-label={`Stage ${exp.stage}: ${exp.place}`}
              >
                <span
                  className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 font-black text-sm tabular-nums transition-all duration-200 ${
                    isActive
                      ? 'bg-tactical-accent border-tactical-accent text-white scale-110 shadow-[0_0_0_4px_rgba(32,128,192,0.2)]'
                      : isPast
                      ? 'bg-tactical-panel border-tactical-panel text-white'
                      : 'bg-white border-tactical-line text-tactical-muted group-hover:border-tactical-accent group-hover:text-tactical-accent'
                  }`}
                >
                  {String(exp.stage).padStart(2, '0')}
                </span>

                {isActive && (
                  <span className="absolute -top-1 -right-1 z-20 bg-tactical-gold text-black text-[8px] font-black px-1 py-0.5 tracking-wider">
                    NOW
                  </span>
                )}

                <span
                  className={`max-w-[5.5rem] text-center text-[10px] font-bold leading-tight truncate transition-colors ${
                    isActive ? 'text-tactical-accent' : 'text-tactical-muted group-hover:text-tactical-ink'
                  }`}
                >
                  {exp.place}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col border border-tactical-line bg-white/50 p-5 md:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-tactical-line pb-4 mb-4">
            <div>
              <p className="font-black text-2xl md:text-3xl tracking-tight text-tactical-ink tabular-nums">
                STAGE {stageLabel}
              </p>
              <p className="text-[11px] text-tactical-muted font-bold tracking-[0.2em] mt-0.5">
                {selected.id.toUpperCase().replace('EXP-', 'NODE ')}
              </p>
            </div>
            <div className="bg-tactical-panel text-white px-3 py-1.5 text-[10px] font-black tracking-widest">
              LV.{selected.stage}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-tactical-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-tactical-muted font-bold tracking-widest uppercase">Place</p>
                <p className="text-sm font-bold text-tactical-ink">{selected.place}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-tactical-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-tactical-muted font-bold tracking-widest uppercase">Years</p>
                <p className="text-sm font-bold text-tactical-ink">{selected.years}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Briefcase className="w-3.5 h-3.5 text-tactical-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-tactical-muted font-bold tracking-widest uppercase">Position</p>
                <p className="text-sm font-bold text-tactical-ink">{selected.position}</p>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="tactical-section">Description</div>
            <p className="text-sm text-tactical-dim leading-relaxed">{selected.description}</p>
          </div>

          {selected.highlights.length > 0 && (
            <div className="mb-5">
              <div className="tactical-section">Objectives cleared</div>
              <ul className="space-y-2">
                {selected.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-tactical-ink">
                    <CircleDot className="w-3.5 h-3.5 text-tactical-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selected.stack && selected.stack.length > 0 && (
            <div className="mt-auto pt-4 border-t border-tactical-line">
              <div className="tactical-section">Loadout</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-bold tracking-wide bg-tactical-panel text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
