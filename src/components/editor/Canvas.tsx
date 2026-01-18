import React, { useRef, useState, useEffect } from 'react';
import { Slide, SlideElement, CanvasSize } from '@/types/editor';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface CanvasProps {
  slide: Slide;
  selectedElementId: string | null;
  canvasSize: CanvasSize;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
  onUpdateElementWithHistory: (id: string, updates: Partial<SlideElement>) => void;
  scale?: number;
}

interface IDragging { id: string; startX: number; startY: number; elemX: number; elemY: number }

interface IResizing { id: string; startX: number; startY: number; startWidth: number; startHeight: number }

export const Canvas: React.FC<CanvasProps> = ({
  slide,
  selectedElementId,
  canvasSize,
  onSelectElement,
  onUpdateElement,
  onUpdateElementWithHistory,
  scale = 0.5,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<IDragging | null>(null);
  const [resizing, setResizing] = useState<IResizing | null>(null);

  const CANVAS_WIDTH = canvasSize.width;
  const CANVAS_HEIGHT = canvasSize.height;

  const getBackgroundStyle = () => {
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

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    // The rect is already scaled, so we need to convert to unscaled coordinates
    const x = (clientX - rect.left) / scale;
    const y = (clientY - rect.top) / scale;

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent, element: SlideElement) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectElement(element.id);

    const { x, y } = getCanvasCoordinates(e.clientX, e.clientY);

    setDragging({
      id: element.id,
      startX: x,
      startY: y,
      elemX: element.x,
      elemY: element.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, element: SlideElement) => {
    e.preventDefault();
    e.stopPropagation();

    setResizing({
      id: element.id,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: element.width,
      startHeight: element.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const { x, y } = getCanvasCoordinates(e.clientX, e.clientY);

        const deltaX = x - dragging.startX;
        const deltaY = y - dragging.startY;

        onUpdateElement(dragging.id, {
          x: Math.max(0, Math.min(CANVAS_WIDTH, dragging.elemX + deltaX)),
          y: Math.max(0, Math.min(CANVAS_HEIGHT, dragging.elemY + deltaY)),
        });
      }

      if (resizing) {
        const deltaX = (e.clientX - resizing.startX) / scale;
        const deltaY = (e.clientY - resizing.startY) / scale;

        onUpdateElement(resizing.id, {
          width: Math.max(50, resizing.startWidth + deltaX),
          height: Math.max(30, resizing.startHeight + deltaY),
        });
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        const element = slide.elements.find(el => el.id === dragging.id);
        if (element) {
          onUpdateElementWithHistory(dragging.id, { x: element.x, y: element.y });
        }
      }
      if (resizing) {
        const element = slide.elements.find(el => el.id === resizing.id);
        if (element) {
          onUpdateElementWithHistory(resizing.id, { width: element.width, height: element.height });
        }
      }
      setDragging(null);
      setResizing(null);
    };

    if (dragging || resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing, scale, onUpdateElement, onUpdateElementWithHistory, slide.elements, CANVAS_WIDTH, CANVAS_HEIGHT]);

  const getIconComponent = (iconName: string): LucideIcon | null => {
    const pascalCaseName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    return (LucideIcons as unknown as Record<string, LucideIcon>)[pascalCaseName] || null;
  };

  const renderElement = (element: SlideElement) => {
    const isSelected = element.id === selectedElementId;

    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.x - element.width / 2,
      top: element.y - element.height / 2,
      width: element.width,
      height: element.height,
      cursor: 'move',
      userSelect: 'none',
    };

    if (element.type === 'text') {
      return (
        <div
          key={element.id}
          style={{
            ...commonStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: element.style?.textAlign === 'center' ? 'center' :
              element.style?.textAlign === 'right' ? 'flex-end' : 'flex-start',
          }}
          className={`group ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' : 'hover:ring-1 hover:ring-primary/50'}`}
          onMouseDown={(e) => handleMouseDown(e, element)}
        >
          <span
            style={{
              fontSize: element.style?.fontSize || 16,
              fontWeight: element.style?.fontWeight || 400,
              fontFamily: element.style?.fontFamily || 'Inter',
              color: element.style?.color || '#ffffff',
              textAlign: element.style?.textAlign || 'left',
              lineHeight: element.style?.lineHeight || 1.4,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pointerEvents: 'none',
            }}
          >
            {element.content}
          </span>
          {isSelected && (
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full cursor-se-resize transform translate-x-1/2 translate-y-1/2 z-10 hover:scale-110 transition-transform"
              onMouseDown={(e) => handleResizeMouseDown(e, element)}
            />
          )}
        </div>
      );
    }

    if (element.type === 'image') {
      return (
        <div
          key={element.id}
          style={commonStyle}
          className={`group overflow-visible rounded-lg ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' : 'hover:ring-1 hover:ring-primary/50'}`}
          onMouseDown={(e) => handleMouseDown(e, element)}
        >
          {element.imageUrl ? (
            <img
              src={element.imageUrl}
              alt=""
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg pointer-events-none">
              <span className="text-muted-foreground text-sm">Drop image here</span>
            </div>
          )}
          {isSelected && (
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full cursor-se-resize transform translate-x-1/2 translate-y-1/2 z-10 hover:scale-110 transition-transform"
              onMouseDown={(e) => handleResizeMouseDown(e, element)}
            />
          )}
        </div>
      );
    }
    if (element.type === 'icon' && element.iconName) {
      const IconComponent = getIconComponent(element.iconName);
      if (!IconComponent) return null;

      return (
        <div
          key={element.id}
          style={commonStyle}
          className={`group flex items-center justify-center ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' : 'hover:ring-1 hover:ring-primary/50'}`}
          onMouseDown={(e) => handleMouseDown(e, element)}
        >
          <IconComponent
            style={{
              width: '100%',
              height: '100%',
              color: element.iconColor || '#ffffff',
            }}
            strokeWidth={1.5}
          />
          {isSelected && (
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full cursor-se-resize transform translate-x-1/2 translate-y-1/2 z-10 hover:scale-110 transition-transform"
              onMouseDown={(e) => handleResizeMouseDown(e, element)}
            />
          )}
        </div>
      );
    }

    return null;
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onSelectElement(null);
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="canvas-container overflow-visible"
        style={{
          width: CANVAS_WIDTH * scale,
          height: CANVAS_HEIGHT * scale,
        }}
      >
        <div
          ref={canvasRef}
          className="relative"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            ...getBackgroundStyle(),
          }}
          onClick={handleCanvasClick}
        >
          {slide.elements.map(renderElement)}
        </div>
      </motion.div>
    </div>
  );
};
