import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Heart, Crosshair, Sword } from 'lucide-react';
import { Stat } from '../types';
import { CharacterViewer } from './CharacterViewer';
import { LoreLinks } from './LoreLinks';
import avatarImg from '../../assets/me_pixel.png';

interface HeroAreaProps {
  level: number;
  className: string;
  combatPower: number;
  stats: Stat[];
}

const HP = 2450;
const MAX_HP = 2500;
const MP = 920;
const MAX_MP = 1000;

export const HeroArea: React.FC<HeroAreaProps> = ({
  level,
  className,
  combatPower,
  stats,
}) => {
  const atk = stats.find((s) => s.name === 'ATK')?.value ?? 0;
  const def = stats.find((s) => s.name === 'DEF')?.value ?? 0;

  return (
    <div id="hero-area-panel" className="relative flex flex-col">
      {/* Profile header */}
      <div className="flex mb-5 items-start gap-3">
        <div className="relative shrink-0 border border-white shadow-sm bg-gray-200">
          <div
            className="absolute -left-4 top-0 bottom-0 w-4 bg-tactical-gold flex items-center justify-center font-black text-[10px]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            S
          </div>
          <img
            src={avatarImg}
            alt="Profile"
            className="w-16 h-16 object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-end text-[10px] text-tactical-muted mb-0.5 tabular-nums">
            CP: {combatPower.toLocaleString()}
          </div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span />
            </div>
            Soldier Lv.{level}
          </div>
          <h2 className="tactical-title text-2xl md:text-3xl mb-2 truncate">
            Riva&apos;i Amin
          </h2>
          <p className="text-xs text-tactical-dim font-medium truncate mb-2">{className}</p>

          <div className="flex items-center gap-3 text-xs font-bold">
            <div className="bg-tactical-panel text-white px-2.5 py-1 flex items-center">
              Level: <span className="text-tactical-gold ml-1 tabular-nums">{level}</span>
            </div>
            <div className="text-tactical-dim flex flex-col text-[10px] leading-tight">
              <span className="flex items-center"><Sword size={10} className="mr-1" /> Atk: {atk}</span>
              <span className="flex items-center"><Shield size={10} className="mr-1" /> Def: {def}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar with crosshair backdrop */}
      <div className="relative w-full h-72 flex items-end justify-center mb-5">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
          <div className="w-px h-full bg-gray-400 absolute left-1/2" />
          <div className="h-px w-full bg-gray-400 absolute top-1/2" />
          <Crosshair size={280} strokeWidth={0.5} className="text-gray-400" />
        </div>

        <CharacterViewer animationState="idle" />
      </div>

      {/* HP / SP bars */}
      <div className="flex gap-5 mb-5">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-tactical-hp" /> HP
            </span>
            <span className="tabular-nums">{HP}/{MAX_HP}</span>
          </div>
          <div className="tactical-bar">
            <motion.div
              className="tactical-bar-fill bg-tactical-hp"
              animate={{ width: `${(HP / MAX_HP) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-tactical-sp" /> SP
            </span>
            <span className="tabular-nums">{MP}/{MAX_MP}</span>
          </div>
          <div className="tactical-bar">
            <motion.div
              className="tactical-bar-fill bg-tactical-sp"
              animate={{ width: `${(MP / MAX_MP) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <LoreLinks />
    </div>
  );
};
