import React, { useState, useRef } from "react";
import {
  Trash2,
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import {
  SlideElement,
  Theme,
  Background,
  CanvasSize,
  presetThemes,
  canvasSizePresets,
  ElementRole,
  getThemeColorForRole,
} from "@/types/editor";

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
  { name: "Inter", category: "Sans-serif" },
  { name: "Poppins", category: "Sans-serif" },
  { name: "Montserrat", category: "Sans-serif" },
  { name: "Open Sans", category: "Sans-serif" },
  { name: "Lato", category: "Sans-serif" },
  { name: "Raleway", category: "Sans-serif" },
  { name: "DM Sans", category: "Sans-serif" },
  { name: "Nunito", category: "Sans-serif" },
  { name: "Space Grotesk", category: "Sans-serif" },
  { name: "Roboto", category: "Sans-serif" },
  // Serif fonts
  { name: "Playfair Display", category: "Serif" },
  { name: "Merriweather", category: "Serif" },
  // Display fonts
  { name: "Oswald", category: "Display" },
  // Monospace fonts
  { name: "JetBrains Mono", category: "Monospace" },
  { name: "Fira Code", category: "Monospace" },
  { name: "Source Code Pro", category: "Monospace" },
];

const presetColors = [
  "#ffffff",
  "#38bdf8",
  "#22c55e",
  "#a78bfa",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#2563eb",
  "#e5e7eb",
  "#94a3b8",
];

const gradientPresets = [
  { from: "#0f172a", to: "#020617", name: "Favourite" },
  { from: "#0b1120", to: "#0f172a", name: "Slate Dark" },
  { from: "#0f0c29", to: "#302b63", name: "Purple Night" },
  { from: "#0c1220", to: "#1e3a5f", name: "Ocean" },
  { from: "#0a120a", to: "#1a2f1a", name: "Forest" },
  { from: "#1a0a0a", to: "#2f1a1a", name: "Crimson" },
];

const elementRoles: { value: ElementRole; label: string }[] = [
  { value: "title", label: "Title" },
  { value: "subtitle", label: "Subtitle" },
  { value: "body", label: "Body Text" },
  { value: "username", label: "Username" },
  { value: "footer", label: "Footer" },
  { value: "code", label: "Code" },
  { value: "custom", label: "Custom" },
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
  const [activeTab, setActiveTab] = useState("theme");

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

    if (selectedElement.type === "text") {
      const isCustomColor = selectedElement.colorMode === "custom";

      const handleRoleChange = (newRole: ElementRole) => {
        const newColor = getThemeColorForRole(theme, newRole);
        onUpdateElement(selectedElement.id, {
          role: newRole,
          colorMode: "theme",
          style: { ...selectedElement.style!, color: newColor },
        });
      };

      const handleColorModeToggle = (useCustom: boolean) => {
        if (useCustom) {
          onUpdateElement(selectedElement.id, { colorMode: "custom" });
        } else {
          const newColor = getThemeColorForRole(theme, selectedElement.role);
          onUpdateElement(selectedElement.id, {
            colorMode: "theme",
            style: { ...selectedElement.style!, color: newColor },
          });
        }
      };

      return (
        <div className="space-y-4">
          <div className="panel-section">
            <Label className="panel-title">Content</Label>
            <textarea
              className="w-full h-24 p-3 bg-secondary border-0 rounded-lg text-foreground text-sm resize-none input-field"
              value={selectedElement.content || ""}
              onChange={(e) =>
                onUpdateElement(selectedElement.id, { content: e.target.value })
              }
              placeholder="Enter text..."
            />
          </div>

          <div className="panel-section">
            <Label className="panel-title">Element Role</Label>
            <select
              className="w-full p-2 bg-secondary border-0 rounded-lg text-foreground text-sm input-field"
              value={selectedElement.role || "body"}
              onChange={(e) => handleRoleChange(e.target.value as ElementRole)}
            >
              {elementRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Role determines color on theme change
            </p>
          </div>

          <div className="panel-section">
            <Label className="panel-title">Font</Label>
            <select
              className="w-full p-2 bg-secondary border-0 rounded-lg text-foreground text-sm input-field"
              value={selectedElement.style?.fontFamily || "Inter"}
              onChange={(e) =>
                onUpdateElement(selectedElement.id, {
                  style: {
                    ...selectedElement.style!,
                    fontFamily: e.target.value,
                  },
                })
              }
            >
              <optgroup label="Sans-serif">
                {fontFamilies
                  .filter((f) => f.category === "Sans-serif")
                  .map((font) => (
                    <option
                      key={font.name}
                      value={font.name}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Serif">
                {fontFamilies
                  .filter((f) => f.category === "Serif")
                  .map((font) => (
                    <option
                      key={font.name}
                      value={font.name}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Display">
                {fontFamilies
                  .filter((f) => f.category === "Display")
                  .map((font) => (
                    <option
                      key={font.name}
                      value={font.name}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Monospace">
                {fontFamilies
                  .filter((f) => f.category === "Monospace")
                  .map((font) => (
                    <option
                      key={font.name}
                      value={font.name}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          <div className="panel-section">
            <Label className="panel-title">Text Style</Label>
            <div className="flex gap-1 mt-2">
              <Toggle
                pressed={selectedElement.style?.fontWeight === 700}
                onPressedChange={(pressed) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      fontWeight: pressed ? 700 : 400,
                    },
                  })
                }
                size="sm"
                aria-label="Bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={selectedElement.style?.fontStyle === "italic"}
                onPressedChange={(pressed) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      fontStyle: pressed ? "italic" : "normal",
                    },
                  })
                }
                size="sm"
                aria-label="Italic"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={selectedElement.style?.textDecoration === "underline"}
                onPressedChange={(pressed) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      textDecoration: pressed ? "underline" : "none",
                    },
                  })
                }
                size="sm"
                aria-label="Underline"
              >
                <Underline className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={
                  selectedElement.style?.textDecoration === "line-through"
                }
                onPressedChange={(pressed) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      textDecoration: pressed ? "line-through" : "none",
                    },
                  })
                }
                size="sm"
                aria-label="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="panel-section">
            <Label className="panel-title">Text Alignment</Label>
            <div className="flex gap-1 mt-2">
              <Toggle
                pressed={selectedElement.style?.textAlign === "left"}
                onPressedChange={() =>
                  onUpdateElement(selectedElement.id, {
                    style: { ...selectedElement.style!, textAlign: "left" },
                  })
                }
                size="sm"
                aria-label="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={selectedElement.style?.textAlign === "center"}
                onPressedChange={() =>
                  onUpdateElement(selectedElement.id, {
                    style: { ...selectedElement.style!, textAlign: "center" },
                  })
                }
                size="sm"
                aria-label="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={selectedElement.style?.textAlign === "right"}
                onPressedChange={() =>
                  onUpdateElement(selectedElement.id, {
                    style: { ...selectedElement.style!, textAlign: "right" },
                  })
                }
                size="sm"
                aria-label="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="panel-section">
            <div className="flex items-center justify-between mb-2">
              <Label className="panel-title mb-0">Text Shadow</Label>
              <Switch
                checked={selectedElement.style?.textShadow?.enabled || false}
                onCheckedChange={(checked) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      textShadow: {
                        enabled: checked,
                        offsetX:
                          selectedElement.style?.textShadow?.offsetX ?? 2,
                        offsetY:
                          selectedElement.style?.textShadow?.offsetY ?? 2,
                        blur: selectedElement.style?.textShadow?.blur ?? 4,
                        color:
                          selectedElement.style?.textShadow?.color ?? "#000000",
                      },
                    },
                  })
                }
              />
            </div>
            {selectedElement.style?.textShadow?.enabled && (
              <div className="space-y-3 mt-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Offset X: {selectedElement.style.textShadow.offsetX}px
                  </Label>
                  <Slider
                    value={[selectedElement.style.textShadow.offsetX]}
                    onValueChange={([value]) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textShadow: {
                            ...selectedElement.style!.textShadow!,
                            offsetX: value,
                          },
                        },
                      })
                    }
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Offset Y: {selectedElement.style.textShadow.offsetY}px
                  </Label>
                  <Slider
                    value={[selectedElement.style.textShadow.offsetY]}
                    onValueChange={([value]) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textShadow: {
                            ...selectedElement.style!.textShadow!,
                            offsetY: value,
                          },
                        },
                      })
                    }
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Blur: {selectedElement.style.textShadow.blur}px
                  </Label>
                  <Slider
                    value={[selectedElement.style.textShadow.blur]}
                    onValueChange={([value]) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textShadow: {
                            ...selectedElement.style!.textShadow!,
                            blur: value,
                          },
                        },
                      })
                    }
                    min={0}
                    max={30}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Shadow Color
                  </Label>
                  <Input
                    type="color"
                    value={selectedElement.style.textShadow.color}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textShadow: {
                            ...selectedElement.style!.textShadow!,
                            color: e.target.value,
                          },
                        },
                      })
                    }
                    className="mt-1 h-8 input-field"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="panel-section">
            <div className="flex items-center justify-between mb-2">
              <Label className="panel-title mb-0">Text Outline</Label>
              <Switch
                checked={selectedElement.style?.textOutline?.enabled || false}
                onCheckedChange={(checked) =>
                  onUpdateElement(selectedElement.id, {
                    style: {
                      ...selectedElement.style!,
                      textOutline: {
                        enabled: checked,
                        width: selectedElement.style?.textOutline?.width ?? 2,
                        color:
                          selectedElement.style?.textOutline?.color ??
                          "#000000",
                      },
                    },
                  })
                }
              />
            </div>
            {selectedElement.style?.textOutline?.enabled && (
              <div className="space-y-3 mt-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Width: {selectedElement.style.textOutline.width}px
                  </Label>
                  <Slider
                    value={[selectedElement.style.textOutline.width]}
                    onValueChange={([value]) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textOutline: {
                            ...selectedElement.style!.textOutline!,
                            width: value,
                          },
                        },
                      })
                    }
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Outline Color
                  </Label>
                  <Input
                    type="color"
                    value={selectedElement.style.textOutline.color}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        style: {
                          ...selectedElement.style!,
                          textOutline: {
                            ...selectedElement.style!.textOutline!,
                            color: e.target.value,
                          },
                        },
                      })
                    }
                    className="mt-1 h-8 input-field"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="panel-section">
            <Label className="panel-title">
              Font Size: {selectedElement.style?.fontSize}px
            </Label>
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
            <div className="flex items-center justify-between mb-2">
              <Label className="panel-title mb-0">Text Color</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {isCustomColor ? "Custom" : "Theme"}
                </span>
                <Switch
                  checked={isCustomColor}
                  onCheckedChange={handleColorModeToggle}
                />
              </div>
            </div>
            {isCustomColor && (
              <>
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
                  value={selectedElement.style?.color || "#ffffff"}
                  onChange={(e) =>
                    onUpdateElement(selectedElement.id, {
                      style: {
                        ...selectedElement.style!,
                        color: e.target.value,
                      },
                    })
                  }
                  className="mt-2 h-10 input-field"
                />
              </>
            )}
            {!isCustomColor && (
              <p className="text-xs text-muted-foreground mt-2">
                Color follows theme ({selectedElement.role || "body"} role)
              </p>
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

    if (selectedElement.type === "image") {
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

    if (selectedElement.type === "icon") {
      return (
        <div className="space-y-4">
          <div className="panel-section">
            <Label className="panel-title">Icon</Label>
            {selectedElement.iconUrl ? (
              <div className="mt-2 rounded-lg overflow-hidden bg-secondary p-4 flex items-center justify-center">
                <img
                  src={selectedElement.iconUrl}
                  alt={selectedElement.iconName || "icon"}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ) : selectedElement.iconName ? (
              <p className="text-sm text-muted-foreground mt-1">
                Lucide icon: {selectedElement.iconName}
              </p>
            ) : null}
          </div>

          {!selectedElement.iconUrl && selectedElement.iconName && (
            <div className="panel-section">
              <Label className="panel-title">Icon Color</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      onUpdateElement(selectedElement.id, { iconColor: color })
                    }
                  />
                ))}
              </div>
              <Input
                type="color"
                value={selectedElement.iconColor || "#ffffff"}
                onChange={(e) =>
                  onUpdateElement(selectedElement.id, {
                    iconColor: e.target.value,
                  })
                }
                className="mt-2 h-10 input-field"
              />
            </div>
          )}

          <div className="panel-section border-b-0">
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => onDeleteElement(selectedElement.id)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Icon
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
                canvasSize.width === preset.width &&
                canvasSize.height === preset.height
                  ? "canvas-size-button-active"
                  : ""
              }`}
              onClick={() => onSetCanvasSize(preset)}
            >
              <span className="block font-medium">{preset.name}</span>
              <span className="text-xs text-muted-foreground">
                {preset.width}×{preset.height}
              </span>
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
                  ? "ring-2 ring-primary"
                  : "hover:bg-secondary"
              }`}
              style={{
                background: preset.background.gradient
                  ? `linear-gradient(${preset.background.gradient.direction}deg, ${preset.background.gradient.from}, ${preset.background.gradient.to})`
                  : preset.background.color,
              }}
              onClick={() => onSetTheme(preset)}
            >
              <span
                className={`text-xs font-medium ${preset.mode === "dark" ? "text-white" : "text-black"}`}
              >
                {preset.name}
              </span>
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
                  type: "gradient",
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
          {[
            "#0a0a0f",
            "#1a1a2e",
            "#0f0c29",
            "#0c1220",
            "#1a0a0a",
            "#ffffff",
          ].map((color) => (
            <button
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => onUpdateBackground({ type: "solid", color })}
            />
          ))}
        </div>
        <Input
          type="color"
          value={
            theme.background.type === "solid"
              ? theme.background.color
              : theme.background.gradient?.from || "#0a0a0f"
          }
          onChange={(e) =>
            onUpdateBackground({ type: "solid", color: e.target.value })
          }
          className="mt-2 h-10 input-field"
        />
      </div>
    </div>
  );

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col h-full overflow-y-scroll">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
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

        <TabsContent
          value="element"
          className="flex-1 overflow-y-auto scrollbar-thin m-0"
        >
          {renderElementProperties()}
        </TabsContent>

        <TabsContent
          value="theme"
          className="flex-1 overflow-y-auto scrollbar-thin m-0"
        >
          {renderThemeProperties()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
