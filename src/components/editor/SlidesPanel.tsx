import React from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slide } from '@/types/editor';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SlidesPanelProps {
  slides: Slide[];
  activeSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
}

export const SlidesPanel: React.FC<SlidesPanelProps> = ({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
}) => {
  const getBackgroundStyle = (slide: Slide) => {
    if (slide.background.type === 'solid') {
      return { backgroundColor: slide.background.color };
    }
    if (slide.background.gradient) {
      const { from, to, direction } = slide.background.gradient;
      return {
        background: `linear-gradient(${direction}deg, ${from}, ${to})`,
      };
    }
    return {};
  };

  return (
    <div className="w-56 bg-card border-r border-border flex flex-col h-full ">
      <div className="p-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Slides</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {slides.length} slide{slides.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-3">
        <AnimatePresence>
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative"
            >
              <div
                className={`slide-thumbnail aspect-square ${
                  index === activeSlideIndex ? 'slide-thumbnail-active' : ''
                }`}
                style={getBackgroundStyle(slide)}
                onClick={() => onSelectSlide(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-xs font-medium">
                    {index + 1}
                  </span>
                </div>
              </div>

              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateSlide(index);
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Duplicate</TooltipContent>
                </Tooltip>

                {slides.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSlide(index);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-border">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={onAddSlide}
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>
    </div>
  );
};
