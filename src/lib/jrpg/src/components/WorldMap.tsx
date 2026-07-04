import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WarpPoint } from '../types';
import * as Icons from 'lucide-react';
import sfx from '../utils/audio';
import mapBackground from '../../assets/map.jpeg';

interface WorldMapProps {
  points: WarpPoint[];
}

export const WorldMap: React.FC<WorldMapProps> = ({ points }) => {
  const [hovered, setHovered] = useState<WarpPoint | null>(null);
  const [selected, setSelected] = useState<WarpPoint | null>(points[0] ?? null);

  const renderIcon = (iconName: string, className = 'w-4 h-4') => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) return <IconComponent className={className} />;
    return <Icons.MapPin className={className} />;
  };

  const handleWarp = (point: WarpPoint) => {
    sfx.playSfx('equip');
    setSelected(point);
    window.open(point.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative flex flex-col h-full min-h-[500px]">
      <div className="flex justify-between items-end mb-5">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Overworld
          </div>
          <h2 className="tactical-title text-3xl">World map</h2>
          <p className="text-xs text-tactical-muted mt-1 font-medium">
            Select a portal to quick-travel to an external realm
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-tactical-muted font-bold tracking-widest uppercase">Portals</p>
          <p className="font-black tabular-nums text-tactical-ink">{points.length}</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[420px]">
        {/* Map canvas */}
        <div className="lg:col-span-4 relative border border-tactical-line overflow-hidden bg-[#dce8ef] min-h-[380px]">
          <img
            src={mapBackground}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />

          {/* Region labels */}
          <span className="absolute top-3 left-3 text-[9px] font-black tracking-[0.25em] text-tactical-ink/70 uppercase pointer-events-none bg-white/70 px-1.5 py-0.5">
            Identity isles
          </span>
          <span className="absolute bottom-10 right-3 text-[9px] font-black tracking-[0.25em] text-tactical-ink/70 uppercase pointer-events-none bg-white/70 px-1.5 py-0.5">
            Project wilds
          </span>

          {/* Compass rose */}
          <div className="absolute bottom-3 left-3 w-10 h-10 flex items-center justify-center pointer-events-none opacity-40">
            <Icons.Compass className="w-8 h-8 text-tactical-ink" strokeWidth={1.25} />
          </div>

          {/* Warp portals */}
          {points.map((point) => {
            const isActive = selected?.id === point.id;
            const isHover = hovered?.id === point.id;

            return (
              <button
                key={point.id}
                type="button"
                onClick={() => handleWarp(point)}
                onMouseEnter={() => setHovered(point)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(point)}
                onBlur={() => setHovered(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-tactical-accent z-10"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                title={`Travel to ${point.label}`}
                aria-label={`Quick travel to ${point.label}`}
              >
                {/* Pulse ring */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                    point.region === 'identity' ? 'bg-tactical-accent' : 'bg-tactical-sp'
                  }`}
                  style={{ animationDuration: '2.5s' }}
                />

                <span
                  className={`relative flex items-center justify-center w-10 h-10 border-2 transition-all duration-200 ${
                    isActive || isHover
                      ? 'bg-tactical-accent border-tactical-accent text-white scale-110 shadow-md'
                      : point.region === 'identity'
                      ? 'bg-tactical-panel border-tactical-panel text-white group-hover:scale-105'
                      : 'bg-white border-tactical-ink text-tactical-ink group-hover:scale-105'
                  }`}
                >
                  {renderIcon(point.icon, 'w-4 h-4')}
                </span>

                <span
                  className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wide px-1.5 py-0.5 transition-opacity ${
                    isActive || isHover
                      ? 'opacity-100 bg-tactical-panel text-white'
                      : 'opacity-80 bg-white/90 text-tactical-ink border border-tactical-line'
                  }`}
                >
                  {point.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Warp manifest */}
        <div className="lg:col-span-1 flex flex-col border border-tactical-line bg-white/50 p-4">
          <div className="tactical-section">Warp manifest</div>
          <ul className="flex-1 space-y-1 overflow-y-auto custom-scrollbar max-h-[340px] pr-1">
            {points.map((point) => {
              const isActive = selected?.id === point.id;
              return (
                <li key={point.id}>
                  <button
                    type="button"
                    onClick={() => handleWarp(point)}
                    onMouseEnter={() => setHovered(point)}
                    onMouseLeave={() => setHovered(null)}
                    className={`tactical-row w-full h-9 cursor-pointer text-left ${
                      isActive ? 'tactical-row-active' : ''
                    }`}
                  >
                    <span
                      className={`w-7 h-full flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-tactical-accent text-white' : 'text-tactical-muted'
                      }`}
                    >
                      {renderIcon(point.icon, 'w-3.5 h-3.5')}
                    </span>
                    <span className={`flex-1 px-2 text-[11px] truncate ${isActive ? 'text-white' : 'text-tactical-ink'}`}>
                      {point.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            {(hovered || selected) && (
              <motion.div
                key={(hovered ?? selected)!.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 pt-3 border-t border-tactical-line"
              >
                <p className="text-[9px] text-tactical-muted font-bold tracking-widest uppercase mb-0.5">
                  Destination
                </p>
                <p className="text-sm font-black italic text-tactical-ink leading-tight">
                  {(hovered ?? selected)!.name}
                </p>
                <p className="text-[10px] text-tactical-dim mt-1 break-all leading-snug">
                  {(hovered ?? selected)!.url.replace(/^https?:\/\//, '')}
                </p>
                <p className="text-[10px] text-tactical-accent font-bold mt-2 tracking-wide uppercase">
                  Click to travel →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
