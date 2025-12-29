"use client";

import type { FC } from 'react';
import { Users, History, Grid3x3, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ActiveTab } from '@/lib/types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const navItems: { tab: ActiveTab; icon: React.ElementType; label: string }[] = [
  { tab: 'contacts', icon: Users, label: 'Contacts' },
  { tab: 'history', icon: History, label: 'Recents' },
  { tab: 'dialer', icon: Grid3x3, label: 'Dialer' },
  { tab: 'blocked', icon: Ban, label: 'Blocked' },
];

const BottomNav: FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around items-center p-2 border-t bg-card/80 backdrop-blur-sm">
      {navItems.map(({ tab, icon: Icon, label }) => (
        <Button
          key={tab}
          variant="ghost"
          className={`flex flex-col items-center h-auto p-2 transition-colors ${
            activeTab === tab ? 'text-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab(tab)}
          aria-label={label}
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default BottomNav;
