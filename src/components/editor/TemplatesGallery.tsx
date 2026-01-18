import React from 'react';
import { templates, Template } from '@/types/templates';
import { Slide, CanvasSize, Theme } from '@/types/editor';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, List, Quote, Code, Megaphone, Layout, Square, GitCompare, BarChart3, ListOrdered } from 'lucide-react';

interface TemplatesGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canvasSize: CanvasSize;
  theme: Theme;
  onSelectTemplate: (slide: Slide) => void;
}

const categoryIcons: Record<Template['category'], React.ReactNode> = {
  blank: <Square className="h-5 w-5" />,
  intro: <FileText className="h-5 w-5" />,
  content: <Layout className="h-5 w-5" />,
  tips: <List className="h-5 w-5" />,
  quote: <Quote className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  cta: <Megaphone className="h-5 w-5" />,
  comparison: <GitCompare className="h-5 w-5" />,
  stats: <BarChart3 className="h-5 w-5" />,
  steps: <ListOrdered className="h-5 w-5" />,
};

const categoryLabels: Record<Template['category'], string> = {
  blank: 'Blank',
  intro: 'Intro',
  content: 'Content',
  tips: 'Tips',
  quote: 'Quote',
  code: 'Code',
  cta: 'CTA',
  comparison: 'Compare',
  stats: 'Stats',
  steps: 'Steps',
};

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({
  open,
  onOpenChange,
  canvasSize,
  theme,
  onSelectTemplate,
}) => {
  const handleSelectTemplate = (template: Template) => {
    const slide = template.createSlide(
      canvasSize.width, 
      canvasSize.height, 
      theme.mode === 'dark'
    );
    onSelectTemplate(slide);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose a Template</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                className="group relative aspect-square rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-200 overflow-hidden bg-secondary/30 hover:bg-secondary/50"
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Template Preview */}
                <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                    {categoryIcons[template.category]}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {template.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center line-clamp-2">
                    {template.description}
                  </p>
                  <span className="mt-2 text-[10px] uppercase tracking-wider text-primary/70 font-medium">
                    {categoryLabels[template.category]}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
