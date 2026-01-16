import React, { useState, useRef } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlideElement, Theme, Background, CanvasSize, presetThemes, canvasSizePresets } from '@/types/editor';

interface PropertiesPanelProps {
  selectedElement: SlideElement | null;
  theme: Theme;
  canvasSize: CanvasSize;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
  onDeleteElement: (id: string) => void;
  onUpdateBackground: (background: Background) => void;
  onSetTheme: (theme: Theme) => void;
  onSetCanvasSize: (size: CanvasSize) => void;
}

const fontFamilies = [
  // Sans-serif fonts
  { name: 'Inter', category: 'Sans-serif' },
  { name: 'Poppins', category: 'Sans-serif' },
  { name: 'Montserrat', category: 'Sans-serif' },
  { name: 'Open Sans', category: 'Sans-serif' },
  { name: 'Lato', category: 'Sans-serif' },
  { name: 'Raleway', category: 'Sans-serif' },
  { name: 'DM Sans', category: 'Sans-serif' },
  { name: 'Nunito', category: 'Sans-serif' },
  { name: 'Space Grotesk', category: 'Sans-serif' },
  { name: 'Roboto', category: 'Sans-serif' },
  // Serif fonts
  { name: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' },
  // Display fonts
  { name: 'Oswald', category: 'Display' },
  // Monospace fonts
  { name: 'JetBrains Mono', category: 'Monospace' },
  { name: 'Fira Code', category: 'Monospace' },
  { name: 'Source Code Pro', category: 'Monospace' },
];

const presetColors = [
  '#ffffff',
  '#38bdf8',
  '#22c55e',
  '#a78bfa',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#2563eb',
  '#e5e7eb',
  '#94a3b8',
];

const gradientPresets = [
  { from: '#0f172a', to: '#020617', name: 'ConceptsToCode Dark' },
  { from: '#0b1120', to: '#0f172a', name: 'Slate Dark' },
  { from: '#0f0c29', to: '#302b63', name: 'Purple Night' },
  { from: '#0c1220', to: '#1e3a5f', name: 'Ocean' },
  { from: '#0a120a', to: '#1a2f1a', name: 'Forest' },
  { from: '#1a0a0a', to: '#2f1a1a', name: 'Crimson' },
];

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedElement,
  theme,
  canvasSize,
  onUpdateElement,
  onDeleteElement,
  onUpdateBackground,
  onSetTheme,
  onSetCanvasSize,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('element');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedElement) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateElement(selectedElement.id, {
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderElementProperties = () => {
    if (!selectedElement) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      );
    }

    if (selectedElement.type === 'text') {
      return (
        <div className="space-y-4">
          <div className="panel-section">
            <Label className="panel-title">Content</Label>
            <textarea
              className="w-full h-24 p-3 bg-secondary border-0 rounded-lg text-foreground text-sm resize-none input-field"
              value={selectedElement.content || ''}
              onChange={(e) =>
                onUpdateElement(selectedElement.id, { content: e.target.value })
              }
              placeholder="Enter text..."
            />
          </div>

          <div className="panel-section">
            <Label className="panel-title">Font</Label>
            <select
              className="w-full p-2 bg-secondary border-0 rounded-lg text-foreground text-sm input-field"
              value={selectedElement.style?.fontFamily || 'Inter'}
              onChange={(e) =>
                onUpdateElement(selectedElement.id, {
                  style: { ...selectedElement.style!, fontFamily: e.target.value },
                })
              }
            >
              <optgroup label="Sans-serif">
                {fontFamilies.filter(f => f.category === 'Sans-serif').map((font) => (
                  <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                    {font.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Serif">
                {fontFamilies.filter(f => f.category === 'Serif').map((font) => (
                  <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                    {font.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Display">
                {fontFamilies.filter(f => f.category === 'Display').map((font) => (
                  <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                    {font.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Monospace">
                {fontFamilies.filter(f => f.category === 'Monospace').map((font) => (
                  <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                    {font.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="panel-section">
            <Label className="panel-title">Font Size: {selectedElement.style?.fontSize}px</Label>
            <Slider
              value={[selectedElement.style?.fontSize || 16]}
              onValueChange={([value]) =>
                onUpdateElement(selectedElement.id, {
                  style: { ...selectedElement.style!, fontSize: value },
                })
              }
              min={12}
              max={120}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="panel-section">
            <Label className="panel-title">Font Weight</Label>
            <Slider
              value={[selectedElement.style?.fontWeight || 400]}
              onValueChange={([value]) =>
                onUpdateElement(selectedElement.id, {
                  style: { ...selectedElement.style!, fontWeight: value },
                })
              }
              min={300}
              max={900}
              step={100}
              className="mt-2"
            />
          </div>

          <div className="panel-section">
            <Label className="panel-title">Text Color</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    onUpdateElement(selectedElement.id, {
                      style: { ...selectedElement.style!, color },
                    })
                  }
                />
              ))}
            </div>
            <Input
              type="color"
              value={selectedElement.style?.color || '#ffffff'}
              onChange={(e) =>
                onUpdateElement(selectedElement.id, {
                  style: { ...selectedElement.style!, color: e.target.value },
                })
              }
              className="mt-2 h-10 input-field"
            />
          </div>

          <div className="panel-section border-b-0">
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => onDeleteElement(selectedElement.id)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Element
            </Button>
          </div>
        </div>
      );
    }

    if (selectedElement.type === 'image') {
      return (
        <div className="space-y-4">
          <div className="panel-section">
            <Label className="panel-title">Image</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
            {selectedElement.imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src={selectedElement.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>

          <div className="panel-section border-b-0">
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => onDeleteElement(selectedElement.id)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Element
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderThemeProperties = () => (
    <div className="space-y-4">
      <div className="panel-section">
        <Label className="panel-title">Canvas Size</Label>
        <div className="grid grid-cols-1 gap-2">
          {canvasSizePresets.map((preset) => (
            <button
              key={preset.name}
              className={`canvas-size-button text-left ${
                canvasSize.width === preset.width && canvasSize.height === preset.height
                  ? 'canvas-size-button-active'
                  : ''
              }`}
              onClick={() => onSetCanvasSize(preset)}
            >
              <span className="block font-medium">{preset.name}</span>
              <span className="text-xs text-muted-foreground">{preset.width}×{preset.height}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <Label className="panel-title">Theme Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {presetThemes.map((preset) => (
            <button
              key={preset.id}
              className={`p-3 rounded-lg text-left transition-all ${
                theme.id === preset.id
                  ? 'ring-2 ring-primary'
                  : 'hover:bg-secondary'
              }`}
              style={{
                background: preset.background.gradient
                  ? `linear-gradient(${preset.background.gradient.direction}deg, ${preset.background.gradient.from}, ${preset.background.gradient.to})`
                  : preset.background.color,
              }}
              onClick={() => onSetTheme(preset)}
            >
              <span className="text-xs font-medium text-white">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <Label className="panel-title">Background Gradients</Label>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.map((gradient, index) => (
            <button
              key={index}
              className="h-12 rounded-lg transition-all hover:scale-105"
              style={{
                background: `linear-gradient(180deg, ${gradient.from}, ${gradient.to})`,
              }}
              onClick={() =>
                onUpdateBackground({
                  type: 'gradient',
                  gradient: { ...gradient, direction: 180 },
                })
              }
            />
          ))}
        </div>
      </div>

      <div className="panel-section">
        <Label className="panel-title">Solid Colors</Label>
        <div className="flex flex-wrap gap-2">
          {['#0a0a0f', '#1a1a2e', '#0f0c29', '#0c1220', '#1a0a0a', '#ffffff'].map(
            (color) => (
              <button
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() =>
                  onUpdateBackground({ type: 'solid', color })
                }
              />
            )
          )}
        </div>
        <Input
          type="color"
          value={
            theme.background.type === 'solid'
              ? theme.background.color
              : theme.background.gradient?.from || '#0a0a0f'
          }
          onChange={(e) =>
            onUpdateBackground({ type: 'solid', color: e.target.value })
          }
          className="mt-2 h-10 input-field"
        />
      </div>
    </div>
  );

  return (
    <div className="w-72 bg-card border-l border-border flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="element"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Element
          </TabsTrigger>
          <TabsTrigger
            value="theme"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="element" className="flex-1 overflow-y-auto scrollbar-thin m-0">
          {renderElementProperties()}
        </TabsContent>

        <TabsContent value="theme" className="flex-1 overflow-y-auto scrollbar-thin m-0">
          {renderThemeProperties()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
