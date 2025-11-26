import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette } from 'lucide-react';

export interface ColorTheme {
  primary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  borderStyle: 'none' | 'thin' | 'medium' | 'thick';
  borderColor: string;
  borderRadius: number;
}

interface ColorCustomizerProps {
  theme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const presetThemes: { name: string; theme: ColorTheme }[] = [
  {
    name: 'Professional Blue',
    theme: {
      primary: '#2563eb',
      accent: '#3b82f6',
      textPrimary: '#1e293b',
      textSecondary: '#64748b',
      borderStyle: 'thin',
      borderColor: '#e2e8f0',
      borderRadius: 8,
    },
  },
  {
    name: 'Elegant Purple',
    theme: {
      primary: '#7c3aed',
      accent: '#a78bfa',
      textPrimary: '#1e1b4b',
      textSecondary: '#6366f1',
      borderStyle: 'medium',
      borderColor: '#ddd6fe',
      borderRadius: 12,
    },
  },
  {
    name: 'Modern Green',
    theme: {
      primary: '#059669',
      accent: '#10b981',
      textPrimary: '#064e3b',
      textSecondary: '#047857',
      borderStyle: 'thin',
      borderColor: '#d1fae5',
      borderRadius: 8,
    },
  },
  {
    name: 'Creative Orange',
    theme: {
      primary: '#ea580c',
      accent: '#fb923c',
      textPrimary: '#7c2d12',
      textSecondary: '#c2410c',
      borderStyle: 'thick',
      borderColor: '#fed7aa',
      borderRadius: 16,
    },
  },
];

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  theme,
  onThemeChange,
}) => {
  const handleColorChange = (key: keyof ColorTheme, value: string | number) => {
    onThemeChange({ ...theme, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Color Customization</h3>
      </div>

      {/* Preset Themes */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Preset Themes</Label>
        <div className="grid grid-cols-2 gap-2">
          {presetThemes.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => onThemeChange(preset.theme)}
              className="justify-start transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.theme.primary }}
                />
                <span className="text-xs truncate">{preset.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primary-color" className="text-sm">
            Primary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="primary-color"
              type="color"
              value={theme.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="flex-1 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accent-color" className="text-sm">
            Accent Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="accent-color"
              type="color"
              value={theme.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="flex-1 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text-primary" className="text-sm">
            Text Primary
          </Label>
          <div className="flex gap-2">
            <Input
              id="text-primary"
              type="color"
              value={theme.textPrimary}
              onChange={(e) => handleColorChange('textPrimary', e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.textPrimary}
              onChange={(e) => handleColorChange('textPrimary', e.target.value)}
              className="flex-1 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text-secondary" className="text-sm">
            Text Secondary
          </Label>
          <div className="flex gap-2">
            <Input
              id="text-secondary"
              type="color"
              value={theme.textSecondary}
              onChange={(e) =>
                handleColorChange('textSecondary', e.target.value)
              }
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.textSecondary}
              onChange={(e) =>
                handleColorChange('textSecondary', e.target.value)
              }
              className="flex-1 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Border Customization */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-sm font-medium">Border Options</Label>
        
        <div className="space-y-2">
          <Label htmlFor="border-style" className="text-sm">
            Border Style
          </Label>
          <select
            id="border-style"
            value={theme.borderStyle}
            onChange={(e) => handleColorChange('borderStyle', e.target.value as any)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="none">None</option>
            <option value="thin">Thin (1px)</option>
            <option value="medium">Medium (2px)</option>
            <option value="thick">Thick (4px)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="border-color" className="text-sm">
            Border Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="border-color"
              type="color"
              value={theme.borderColor}
              onChange={(e) => handleColorChange('borderColor', e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.borderColor}
              onChange={(e) => handleColorChange('borderColor', e.target.value)}
              className="flex-1 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="border-radius" className="text-sm">
            Border Radius: {theme.borderRadius}px
          </Label>
          <input
            id="border-radius"
            type="range"
            min="0"
            max="32"
            step="2"
            value={theme.borderRadius}
            onChange={(e) => handleColorChange('borderRadius', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
