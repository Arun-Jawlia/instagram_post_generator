import React from 'react';
import { 
  Type, 
  Image, 
  List, 
  Undo2, 
  Redo2, 
  Download,
  Plus,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutTemplate,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SlideElement } from '@/types/editor';

interface ToolbarProps {
  onAddText: () => void;
  onAddBulletList: () => void;
  onAddImage: () => void;
  onOpenTemplates: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
  scale: number;
  onScaleChange: (scale: number) => void;
  selectedElement: SlideElement | null;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddBulletList,
  onAddImage,
  onOpenTemplates,
  onUndo,
  onRedo,
  onExport,
  canUndo,
  canRedo,
  scale,
  onScaleChange,
  selectedElement,
  onUpdateElement,
}) => {
  const handleAlignChange = (align: 'left' | 'center' | 'right') => {
    if (selectedElement && selectedElement.type === 'text') {
      onUpdateElement(selectedElement.id, {
        style: { ...selectedElement.style!, textAlign: align },
      });
    }
  };

  return (
    <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-2">
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onAddText}
            >
              <Type className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onAddBulletList}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Bullet List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onAddImage}
            >
            <Image className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add Image</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onOpenTemplates}
            >
              <LayoutTemplate className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Templates</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {selectedElement && selectedElement.type === 'text' && (
        <>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`toolbar-button ${selectedElement.style?.textAlign === 'left' ? 'toolbar-button-active' : ''}`}
                  onClick={() => handleAlignChange('left')}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`toolbar-button ${selectedElement.style?.textAlign === 'center' ? 'toolbar-button-active' : ''}`}
                  onClick={() => handleAlignChange('center')}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`toolbar-button ${selectedElement.style?.textAlign === 'right' ? 'toolbar-button-active' : ''}`}
                  onClick={() => handleAlignChange('right')}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />
        </>
      )}

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onUndo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="toolbar-button"
              onClick={onRedo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="toolbar-button h-7 w-7"
          onClick={() => onScaleChange(Math.max(0.25, scale - 0.1))}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-xs text-muted-foreground w-12 text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="toolbar-button h-7 w-7"
          onClick={() => onScaleChange(Math.min(1, scale + 0.1))}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex-1" />

      <Button
        className="action-button action-button-primary"
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
