import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { techIcons, arrowIcons, symbolIcons } from '@/types/editor';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IconPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIcon: (iconName: string) => void;
}

const getIconComponent = (iconName: string): LucideIcon | null => {
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  return (LucideIcons as unknown as Record<string, LucideIcon>)[pascalCaseName] || null;
};

export const IconPicker: React.FC<IconPickerProps> = ({
  open,
  onOpenChange,
  onSelectIcon,
}) => {
  const [activeTab, setActiveTab] = useState('tech');

  const handleSelectIcon = (iconName: string) => {
    onSelectIcon(iconName);
    onOpenChange(false);
  };

  const renderIconGrid = (icons: { name: string; icon: string }[]) => (
    <div className="grid grid-cols-4 gap-3">
      {icons.map((item) => {
        const IconComponent = getIconComponent(item.icon);
        if (!IconComponent) return null;
        
        return (
          <button
            key={item.icon}
            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 gap-2"
            onClick={() => handleSelectIcon(item.icon)}
          >
            <IconComponent className="h-8 w-8 text-primary" />
            <span className="text-xs text-muted-foreground text-center truncate w-full">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Icon or Symbol</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tech">Tech Logos</TabsTrigger>
            <TabsTrigger value="arrows">Arrows</TabsTrigger>
            <TabsTrigger value="symbols">Symbols</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[50vh] mt-4 pr-4">
            <TabsContent value="tech" className="mt-0">
              {renderIconGrid(techIcons)}
            </TabsContent>
            
            <TabsContent value="arrows" className="mt-0">
              {renderIconGrid(arrowIcons)}
            </TabsContent>
            
            <TabsContent value="symbols" className="mt-0">
              {renderIconGrid(symbolIcons)}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
