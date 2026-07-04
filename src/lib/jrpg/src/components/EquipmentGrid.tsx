import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EquipmentItem, GearCategory } from '../types';
import * as Icons from 'lucide-react';
import sfx from '../utils/audio';

interface EquipmentGridProps {
  equippedItems: EquipmentItem[];
  inventoryItems: EquipmentItem[];
  onEquipItem: (item: EquipmentItem) => void;
}

const CATEGORY_LABELS: Record<GearCategory, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  database: 'Database',
  cloud: 'Cloud & DevOps',
  ai: 'AI / ML',
};

export const EquipmentGrid: React.FC<EquipmentGridProps> = ({
  equippedItems,
  inventoryItems,
  onEquipItem,
}) => {
  const allItems = [...equippedItems, ...inventoryItems];
  const [activeCategory, setActiveCategory] = useState<GearCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(equippedItems[0] || allItems[0] || null);

  const renderItemIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) return <IconComponent className={className} />;
    return <Icons.HelpCircle className={className} />;
  };

  const rarityRank = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return { label: 'SS', gold: true };
      case 'epic':
        return { label: 'S', gold: false };
      case 'rare':
        return { label: 'A', gold: false };
      default:
        return { label: 'B', gold: false };
    }
  };

  const filteredItems = allItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleSelect = (item: EquipmentItem) => {
    sfx.playSfx('click');
    setSelectedItem(item);
  };

  const handleEquip = (item: EquipmentItem) => {
    sfx.playSfx('equip');
    onEquipItem(item);
    setSelectedItem(item);
  };

  const isEquipped = (item: EquipmentItem) => equippedItems.some((e) => e.id === item.id);

  return (
    <div className="relative flex flex-col h-full min-h-[500px]">
      <div className="flex justify-between items-end mb-5">
        <div>
          <div className="tactical-label mb-1">
            <div className="tactical-label-ticks">
              <span /><span /><span /><span />
            </div>
            Tech stack
          </div>
          <h2 className="tactical-title text-3xl">Gear</h2>
          <p className="text-xs text-tactical-muted mt-1 font-medium">
            Languages, frameworks, and tools from your loadout
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-tactical-muted font-bold tracking-widest uppercase">Tools</p>
          <p className="font-black tabular-nums text-tactical-ink">{allItems.length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {(['all', 'backend', 'frontend', 'database', 'cloud', 'ai'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sfx.playSfx('click');
              setActiveCategory(cat);
            }}
            className={`tactical-tab cursor-pointer flex items-center gap-1 ${
              activeCategory === cat ? 'tactical-tab-active' : ''
            }`}
          >
            {activeCategory === cat && <Icons.Target size={10} />}
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="space-y-3">
            <div className="tactical-section">Active loadout (1 per category)</div>
            <div className="flex flex-wrap gap-3">
              {equippedItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const rank = rarityRank(item.rarity);
                const stars = item.rarity === 'legendary' ? 3 : item.rarity === 'epic' ? 2 : 1;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`tactical-equip-card w-[100px] pt-4 pb-1.5 px-1 relative cursor-pointer transition-opacity ${
                      isSelected ? 'opacity-100 ring-1 ring-tactical-accent' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute top-1.5 right-1.5 flex gap-0.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`w-1 h-1 ${i < stars ? 'bg-white' : 'bg-gray-600'}`} />
                      ))}
                    </div>
                    <div className="text-white mx-auto mb-2 flex justify-center opacity-80">
                      {renderItemIcon(item.icon, 'w-8 h-8')}
                    </div>
                    <div className="text-[8px] text-white font-black text-center uppercase truncate px-0.5">
                      {item.name}
                    </div>
                    <div className={`absolute -top-1 left-0 -translate-x-1/2 tactical-rank text-[9px] min-w-[1.25rem] h-5 ${rank.gold ? 'tactical-rank-ss' : ''}`}>
                      {rank.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-tactical-line">
            <div className="tactical-section">
              {activeCategory === 'all' ? 'All tools' : CATEGORY_LABELS[activeCategory]}
            </div>
            <div className="space-y-1 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const equipped = isEquipped(item);
                const rank = rarityRank(item.rarity);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`tactical-row h-10 cursor-pointer ${isSelected ? 'tactical-row-active' : ''}`}
                  >
                    <div
                      className={`w-8 h-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-tactical-accent text-white' : 'text-tactical-muted'
                      }`}
                    >
                      {renderItemIcon(item.icon, 'w-3.5 h-3.5')}
                    </div>
                    <div className="flex-1 text-left px-3 truncate flex items-center gap-2">
                      <span className={isSelected ? 'text-white' : 'text-tactical-ink'}>{item.name}</span>
                      {equipped && (
                        <span className="text-[8px] bg-tactical-gold text-black px-1 font-black uppercase">Active</span>
                      )}
                    </div>
                    <div className={`w-20 text-left text-[10px] ${isSelected ? 'text-gray-300' : 'text-tactical-accent font-medium'}`}>
                      {CATEGORY_LABELS[item.category]}
                    </div>
                    <div className={`tactical-rank mr-2 ${rank.gold ? 'tactical-rank-ss' : ''}`}>
                      {rank.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between min-h-[300px] border-l border-tactical-line pl-0 lg:pl-6">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b border-tactical-line pb-3">
                    <div className="tactical-equip-card w-16 pt-3 pb-1 px-1">
                      <div className="text-white flex justify-center opacity-80">
                        {renderItemIcon(selectedItem.icon, 'w-7 h-7')}
                      </div>
                    </div>
                    <div>
                      <div className="tactical-label mb-0.5">
                        <div className="tactical-label-ticks">
                          <span /><span /><span />
                        </div>
                        {CATEGORY_LABELS[selectedItem.category]}
                      </div>
                      <h3 className="tactical-title text-xl">{selectedItem.name}</h3>
                      <span className="text-[10px] text-tactical-muted font-bold tracking-widest uppercase">
                        {selectedItem.rarity}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-tactical-dim leading-relaxed italic border-l-2 border-tactical-accent pl-3">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2">
                    <div className="tactical-section">Proficiency</div>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(selectedItem.stats).map(([statName, val]) => (
                        <div key={statName} className="flex justify-between items-baseline text-sm font-bold">
                          <span className="text-tactical-muted text-xs uppercase">{statName}</span>
                          <span className="tabular-nums text-tactical-ink">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {!isEquipped(selectedItem) && (
                  <button
                    onClick={() => handleEquip(selectedItem)}
                    className="w-full bg-tactical-accent hover:bg-tactical-accent-dark text-white font-bold text-xs tracking-wider py-2.5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <Icons.Settings className="w-3.5 h-3.5" />
                    <span>Equip to loadout</span>
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-tactical-muted text-xs">
                Select a tool to inspect details
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
