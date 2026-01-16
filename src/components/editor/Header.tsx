import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold gradient-text">InstaPost Creator</h1>
        </div>
      </div>
      <div className="flex-1" />
      <div className="text-xs text-muted-foreground">
        <span className="hidden sm:inline">Create stunning Instagram posts & carousels</span>
      </div>
    </header>
  );
};
