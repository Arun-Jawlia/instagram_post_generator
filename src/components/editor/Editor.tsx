import React, { useState, useCallback, useRef } from 'react';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { SlidesPanel } from './SlidesPanel';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { ExportDialog } from './ExportDialog';
import { TemplatesGallery } from './TemplatesGallery';
import { IconPicker } from './IconPicker';
import { useEditor } from '@/hooks/useEditor';
import { SlideElement, Slide, getThemeColorForRole } from '@/types/editor';
import { motion } from 'framer-motion';

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
    applyTemplateToSlide,
    duplicateSlide,
    deleteSlide,
    reorderSlides,
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
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
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
      role: 'body',
      colorMode: 'theme',
      style: {
        fontSize: 32,
        fontWeight: 500,
        fontFamily: 'Inter',
        color: getThemeColorForRole(state.theme, 'body'),
        textAlign: 'center',
      },
    });
  }, [addElement, saveToHistory, state.canvasSize, state.theme]);

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
      role: 'body',
      colorMode: 'theme',
      style: {
        fontSize: 26,
        fontWeight: 400,
        fontFamily: 'Inter',
        color: getThemeColorForRole(state.theme, 'body'),
        textAlign: 'left',
        lineHeight: 1.5,
      },
    });
  }, [addElement, saveToHistory, state.canvasSize, state.theme]);

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
    applyTemplateToSlide(slide);
  }, [applyTemplateToSlide]);

  const handleAddIcon = useCallback((iconName: string, isColorful?: boolean, colorfulUrl?: string) => {
    saveToHistory();
    const centerX = state.canvasSize.width / 2;
    const centerY = state.canvasSize.height / 2;
    
    if (isColorful && colorfulUrl) {
      // Colorful icon from CDN
      addElement({
        type: 'icon',
        x: centerX,
        y: centerY,
        width: 80,
        height: 80,
        iconName,
        iconUrl: colorfulUrl,
        colorMode: 'custom',
      });
    } else {
      // Lucide icon
      addElement({
        type: 'icon',
        x: centerX,
        y: centerY,
        width: 80,
        height: 80,
        iconName,
        iconColor: state.theme.primaryColor,
        colorMode: 'theme',
      });
    }
  }, [addElement, saveToHistory, state.canvasSize, state.theme]);

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
        onAddIcon={() => setIconPickerOpen(true)}
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
          onReorderSlides={reorderSlides}
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
        canvasSize={state.canvasSize}
      />

      <TemplatesGallery
        open={templatesOpen}
        onOpenChange={setTemplatesOpen}
        canvasSize={state.canvasSize}
        theme={state.theme}
        onSelectTemplate={handleSelectTemplate}
      />

      <IconPicker
        open={iconPickerOpen}
        onOpenChange={setIconPickerOpen}
        onSelectIcon={handleAddIcon}
      />
    </div>
  );
};
