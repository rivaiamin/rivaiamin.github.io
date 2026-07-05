import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import sfx from '../utils/audio';
import { PROFILE_LANDING, FICTIONAL_TITLES, PASSIVE_SKILLS, PASSIVE_SKILL_GROUPS, OPERATOR_SPECTRUM } from '../data';
import { PassiveSkill } from '../types';
import { StatRadarChart } from './StatRadarChart';

interface StatusPanelProps {
  classTitle: string;
}

const ELEMENT_ACCENT: Record<string, string> = {
  Void: '#4298b4',
  Mind: '#e4ae3a',
  Light: '#ffcc00',
  Lightning: '#2080c0',
  Earth: '#33a474',
  Shadow: '#88619a',
  Nature: '#00a300',
};

export const StatusPanel: React.FC<StatusPanelProps> = ({ classTitle }) => {
  const [selectedTraitId, setSelectedTraitId] = useState(OPERATOR_SPECTRUM[0]?.id ?? 'solitude');
  const [selectedPassiveId, setSelectedPassiveId] = useState<string | null>(null);
  const selectedTrait = OPERATOR_SPECTRUM.find((t) => t.id === selectedTraitId) ?? OPERATOR_SPECTRUM[0];
  const selectedPassive = PASSIVE_SKILLS.find((s) => s.id === selectedPassiveId);

  const alternateTitles = FICTIONAL_TITLES.filter((t) => t !== classTitle);

  const pairOpposite = selectedTrait
    ? OPERATOR_SPECTRUM.find((t) => t.pairId === selectedTrait.pairId && t.id !== selectedTrait.id)
    : undefined;

  return (
    <div className="relative flex flex-col h-full min-h-0">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <div className="absolute top-16 left-8 text-gray-400 font-mono text-xs">+</div>
        <div className="absolute bottom-24 right-12 text-gray-400 font-mono text-xs">+</div>
      </div>

      <div className="flex justify-between items-end mb-4 relative z-10 shrink-0">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Brief
          </div>
          <h2 className="tactical-title text-3xl">Operator Dossier</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar relative z-10 space-y-6 pb-2">
        <section>
          <div className="tactical-section">What I Offer</div>
          <p className="text-sm font-bold text-tactical-ink leading-snug mb-2">{PROFILE_LANDING.headline}</p>
          <p className="text-xs text-tactical-dim leading-relaxed mb-3">{PROFILE_LANDING.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {PROFILE_LANDING.niches.map((niche) => (
              <span
                key={niche}
                className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 bg-white/60 border border-tactical-line text-tactical-dim"
              >
                {niche}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="tactical-section">Honorifics (Unverified)</div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-tactical-gold shrink-0" />
            <span className="font-black italic text-base tracking-tight text-tactical-accent">{classTitle}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-tactical-muted">— active</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {alternateTitles.map((title) => (
              <span
                key={title}
                className="text-[10px] font-medium px-2 py-0.5 bg-tactical-panel/10 border border-tactical-line text-tactical-muted italic"
              >
                {title}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 items-stretch">
          <section className="w-full sm:w-1/2 min-w-0">
            <div className="tactical-section !mb-3">Operative Spectrum</div>

            <div className="py-3 px-2 bg-white/30 border border-tactical-line">
              <StatRadarChart
                traits={OPERATOR_SPECTRUM}
                selectedTraitId={selectedTraitId}
                onSelectTrait={(id) => {
                  sfx.playSfx('click');
                  setSelectedTraitId(id);
                }}
              />

              {selectedTrait && (
                <div className="mt-3 pt-3 border-t border-tactical-line">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <p
                      className="text-[11px] font-black tracking-wide"
                      style={{ color: selectedTrait.color }}
                    >
                      {selectedTrait.spectrum}: {selectedTrait.name}
                    </p>
                    <span className="text-lg font-black tabular-nums text-tactical-ink shrink-0">
                      {selectedTrait.value}%
                    </span>
                  </div>
                  {pairOpposite && (
                    <p className="text-[9px] text-tactical-muted mb-2">
                      Counter-pole{' '}
                      <span className="font-bold">{pairOpposite.name}</span> at {pairOpposite.value}%
                    </p>
                  )}
                  <p className="text-[10px] text-tactical-dim leading-relaxed">{selectedTrait.description}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {OPERATOR_SPECTRUM.map((trait) => (
                  <button
                    key={trait.id}
                    onClick={() => {
                      sfx.playSfx('click');
                      setSelectedTraitId(trait.id);
                    }}
                    className={`text-[8px] font-bold px-1.5 py-0.5 border transition-colors cursor-pointer tabular-nums ${
                      trait.id === selectedTraitId
                        ? 'text-white border-transparent'
                        : 'bg-white/50 text-tactical-dim border-tactical-line hover:border-tactical-accent'
                    }`}
                    style={
                      trait.id === selectedTraitId
                        ? { backgroundColor: trait.color, borderColor: trait.color }
                        : undefined
                    }
                  >
                    {trait.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full sm:w-1/2 min-w-0">
            <div className="tactical-section !mb-2">Passive Skills</div>

            <div className="bg-white/30 border border-tactical-line py-2 px-2">
              {PASSIVE_SKILL_GROUPS.map((group) => {
                const groupSkills = PASSIVE_SKILLS.filter((s) => s.category === group.id);
                return (
                  <div key={group.id} className="mb-3 last:mb-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-tactical-muted mb-1 px-1">
                      {group.label}
                      <span className="normal-case tracking-normal font-medium text-tactical-dim">
                        {' '}
                        · {group.subtitle}
                      </span>
                    </p>
                    <ul className="space-y-0.5">
                      {groupSkills.map((skill) => {
                        const isActive = selectedPassiveId === skill.id;
                        const accent = ELEMENT_ACCENT[skill.element] ?? '#2080c0';
                        return (
                          <li key={skill.id}>
                            <button
                              type="button"
                              onClick={() => {
                                sfx.playSfx('click');
                                setSelectedPassiveId(isActive ? null : skill.id);
                              }}
                              title={skill.effect}
                              className={`w-full text-left px-2 py-1.5 border-l-2 transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-tactical-panel/10 border-tactical-accent'
                                  : 'bg-white/40 border-transparent hover:border-tactical-accent/50 hover:bg-white/60'
                              }`}
                              style={{ borderLeftColor: isActive ? accent : undefined }}
                            >
                              <p
                                className="text-[10px] font-black tracking-tight truncate"
                                style={{ color: isActive ? accent : undefined }}
                              >
                                {skill.name}
                              </p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {selectedPassive && (
                <PassiveDetail skill={selectedPassive} />
              )}

              {!selectedPassive && (
                <p className="text-[9px] text-tactical-muted px-1 pt-2 border-t border-tactical-line mt-2">
                  Click a passive to inspect effect &amp; lore. Hover for effect summary.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

function PassiveDetail({ skill }: { skill: PassiveSkill }) {
  const accent = ELEMENT_ACCENT[skill.element] ?? '#2080c0';

  return (
    <div className="mt-2 pt-2 border-t border-tactical-line px-1 space-y-2">
      <div>
        <p className="text-[11px] font-black tracking-tight" style={{ color: accent }}>
          {skill.name}
        </p>
        <p className="text-[9px] text-tactical-muted font-bold uppercase tracking-wider mt-0.5">
          {skill.passiveType} · {skill.element}
        </p>
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-tactical-muted mb-0.5">Effect</p>
        <p className="text-[10px] text-tactical-ink leading-relaxed">{skill.effect}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-tactical-muted mb-0.5">Lore</p>
        <p className="text-[10px] text-tactical-dim leading-relaxed italic">{skill.lore}</p>
      </div>
    </div>
  );
}
