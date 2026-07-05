import React from 'react';
import * as Icons from 'lucide-react';
import sfx from '../utils/audio';
import { LORE_LINKS } from '../data';

function renderLoreIcon(iconName: string) {
  const Icon = (Icons as any)[iconName];
  return Icon ? <Icon className="w-3 h-3" /> : <Icons.Link className="w-3 h-3" />;
}

export const LoreLinks: React.FC = () => {
  const handleClick = () => sfx.playSfx('click');

  return (
    <div>
      <div className="tactical-section !mb-1">Lore / External Archives</div>
      <div className="grid grid-cols-2 gap-1">
        {LORE_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group flex items-center gap-1.5 px-2 py-1.5 bg-tactical-panel text-white hover:bg-black border border-transparent hover:border-tactical-accent transition-colors cursor-pointer min-w-0"
            title={`${link.blurb} — ${link.url}`}
          >
            <span className="text-tactical-accent group-hover:text-white transition-colors shrink-0">
              {renderLoreIcon(link.icon)}
            </span>
            <span className="text-[9px] font-black tracking-wide truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
