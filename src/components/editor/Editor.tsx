import React, { useState, useCallback, useRef } from 'react';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { SlidesPanel } from './SlidesPanel';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { ExportDialog } from './ExportDialog';
import { TemplatesGallery } from './TemplatesGallery';
import { useEditor } from '@/hooks/useEditor';
import { SlideElement, Slide } from '@/types/editor';
import { motion } from 'framer-motion';
import { LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Editor: React.FC = () => {
  const {
    state,
    activeSlide,
    selectedElement,
    canUndo,
    canRedo,
    setActiveSlide,
    setCanvasSize,
    addSlide,
    addSlideFromTemplate,
    duplicateSlide,
    deleteSlide,
    updateSlideBackground,
    addElement,
    updateElement,
    updateElementWithHistory,
    deleteElement,
    selectElement,
    setTheme,
    undo,
    redo,
    saveToHistory,
  } = useEditor();

  const [scale, setScale] = useState(0.5);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddText = useCallback(() => {
    saveToHistory();
    const centerX = state.canvasSize.width / 2;
    const centerY = state.canvasSize.height / 2;
    addElement({
      type: 'text',
      x: centerX,
      y: centerY,
      width: 600,
      height: 60,
      content: 'New Text',
      style: {
        fontSize: 32,
        fontWeight: 500,
        fontFamily: 'Inter',
        color: state.theme.mode === 'dark' ? '#ffffff' : '#0f172a',
        textAlign: 'center',
      },
    });
  }, [addElement, saveToHistory, state.canvasSize, state.theme.mode]);

  const handleAddBulletList = useCallback(() => {
    saveToHistory();
    const centerX = state.canvasSize.width / 2;
    const centerY = state.canvasSize.height / 2;
    addElement({
      type: 'text',
      x: centerX,
      y: centerY,
      width: 800,
      height: 200,
      content: '• First point\n• Second point\n• Third point',
      style: {
        fontSize: 26,
        fontWeight: 400,
        fontFamily: 'Inter',
        color: state.theme.mode === 'dark' ? '#e5e7eb' : '#0f172a',
        textAlign: 'left',
        lineHeight: 1.5,
      },
    });
  }, [addElement, saveToHistory, state.canvasSize, state.theme.mode]);

  const handleAddImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        saveToHistory();
        const centerX = state.canvasSize.width / 2;
        const centerY = state.canvasSize.height / 2;
        addElement({
          type: 'image',
          x: centerX,
          y: centerY,
          width: 400,
          height: 300,
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  }, [addElement, saveToHistory, state.canvasSize]);

  const handleUpdateElement = useCallback((id: string, updates: Partial<SlideElement>) => {
    updateElement(id, updates);
  }, [updateElement]);

  const handleSelectTemplate = useCallback((slide: Slide) => {
    addSlideFromTemplate(slide);
  }, [addSlideFromTemplate]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <Toolbar
        onAddText={handleAddText}
        onAddBulletList={handleAddBulletList}
        onAddImage={handleAddImage}
        onOpenTemplates={() => setTemplatesOpen(true)}
        onUndo={undo}
        onRedo={redo}
        onExport={() => setExportDialogOpen(true)}
        canUndo={canUndo}
        canRedo={canRedo}
        scale={scale}
        onScaleChange={setScale}
        selectedElement={selectedElement || null}
        onUpdateElement={handleUpdateElement}
      />

      <div className="flex-1 flex overflow-hidden">
        <SlidesPanel
          slides={state.slides}
          activeSlideIndex={state.activeSlideIndex}
          onSelectSlide={setActiveSlide}
          onAddSlide={addSlide}
          onDuplicateSlide={duplicateSlide}
          onDeleteSlide={deleteSlide}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto bg-background/50"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted)) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        >
          {activeSlide && (
            <Canvas
              slide={activeSlide}
              selectedElementId={state.selectedElementId}
              canvasSize={state.canvasSize}
              onSelectElement={selectElement}
              onUpdateElement={updateElement}
              onUpdateElementWithHistory={updateElementWithHistory}
              scale={scale}
            />
          )}
        </motion.main>

        <PropertiesPanel
          selectedElement={selectedElement || null}
          theme={state.theme}
          canvasSize={state.canvasSize}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={deleteElement}
          onUpdateBackground={updateSlideBackground}
          onSetTheme={setTheme}
          onSetCanvasSize={setCanvasSize}
        />
      </div>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        slides={state.slides}
      />

      <TemplatesGallery
        open={templatesOpen}
        onOpenChange={setTemplatesOpen}
        canvasSize={state.canvasSize}
        theme={state.theme}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};
