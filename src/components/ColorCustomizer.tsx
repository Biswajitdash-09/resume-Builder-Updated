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
    },
  },
  {
    name: 'Elegant Purple',
    theme: {
      primary: '#7c3aed',
      accent: '#a78bfa',
      textPrimary: '#1e1b4b',
      textSecondary: '#6366f1',
    },
  },
  {
    name: 'Modern Green',
    theme: {
      primary: '#059669',
      accent: '#10b981',
      textPrimary: '#064e3b',
      textSecondary: '#047857',
    },
  },
  {
    name: 'Creative Orange',
    theme: {
      primary: '#ea580c',
      accent: '#fb923c',
      textPrimary: '#7c2d12',
      textSecondary: '#c2410c',
    },
  },
];

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  theme,
  onThemeChange,
}) => {
  const handleColorChange = (key: keyof ColorTheme, value: string) => {
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
    </div>
  );
};
