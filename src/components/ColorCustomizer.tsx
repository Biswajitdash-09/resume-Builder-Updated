import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Palette, Type, Minus } from 'lucide-react';
import { ColorTheme } from '../types/resume';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
      fontFamily: 'Inter',
      fontSize: 'medium',
      headingSize: 'medium',
      lineHeight: 'normal',
      sectionDivider: 'none',
      headerUnderline: true,
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
      fontFamily: 'Playfair Display',
      fontSize: 'medium',
      headingSize: 'large',
      lineHeight: 'relaxed',
      sectionDivider: 'line',
      headerUnderline: true,
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
      fontFamily: 'Poppins',
      fontSize: 'medium',
      headingSize: 'medium',
      lineHeight: 'normal',
      sectionDivider: 'dotted',
      headerUnderline: false,
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
      fontFamily: 'Lato',
      fontSize: 'medium',
      headingSize: 'large',
      lineHeight: 'relaxed',
      sectionDivider: 'dashed',
      headerUnderline: true,
    },
  },
  {
    name: 'Classic Serif',
    theme: {
      primary: '#1f2937',
      accent: '#4b5563',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      borderStyle: 'thin',
      borderColor: '#d1d5db',
      borderRadius: 0,
      fontFamily: 'Merriweather',
      fontSize: 'medium',
      headingSize: 'medium',
      lineHeight: 'relaxed',
      sectionDivider: 'line',
      headerUnderline: true,
    },
  },
  {
    name: 'Minimal Clean',
    theme: {
      primary: '#0f172a',
      accent: '#334155',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      borderStyle: 'none',
      borderColor: '#e2e8f0',
      borderRadius: 4,
      fontFamily: 'Open Sans',
      fontSize: 'small',
      headingSize: 'medium',
      lineHeight: 'compact',
      sectionDivider: 'none',
      headerUnderline: false,
    },
  },
];

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  theme,
  onThemeChange,
}) => {
  const handleChange = (key: keyof ColorTheme, value: string | number | boolean) => {
    onThemeChange({ ...theme, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Theme & Styling</h3>
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

      {/* Font Customization */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Typography</Label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Font Family</Label>
            <Select
              value={theme.fontFamily}
              onValueChange={(v) => handleChange('fontFamily', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                <SelectItem value="Merriweather">Merriweather</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Font Size</Label>
            <Select
              value={theme.fontSize}
              onValueChange={(v) => handleChange('fontSize', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Heading Size</Label>
            <Select
              value={theme.headingSize}
              onValueChange={(v) => handleChange('headingSize', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Line Height</Label>
            <Select
              value={theme.lineHeight}
              onValueChange={(v) => handleChange('lineHeight', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-sm font-medium">Colors</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color" className="text-xs text-muted-foreground">
              Primary Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                value={theme.primary}
                onChange={(e) => handleChange('primary', e.target.value)}
                className="w-10 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={theme.primary}
                onChange={(e) => handleChange('primary', e.target.value)}
                className="flex-1 text-xs h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent-color" className="text-xs text-muted-foreground">
              Accent Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="accent-color"
                type="color"
                value={theme.accent}
                onChange={(e) => handleChange('accent', e.target.value)}
                className="w-10 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={theme.accent}
                onChange={(e) => handleChange('accent', e.target.value)}
                className="flex-1 text-xs h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-primary" className="text-xs text-muted-foreground">
              Text Primary
            </Label>
            <div className="flex gap-2">
              <Input
                id="text-primary"
                type="color"
                value={theme.textPrimary}
                onChange={(e) => handleChange('textPrimary', e.target.value)}
                className="w-10 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={theme.textPrimary}
                onChange={(e) => handleChange('textPrimary', e.target.value)}
                className="flex-1 text-xs h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-secondary" className="text-xs text-muted-foreground">
              Text Secondary
            </Label>
            <div className="flex gap-2">
              <Input
                id="text-secondary"
                type="color"
                value={theme.textSecondary}
                onChange={(e) => handleChange('textSecondary', e.target.value)}
                className="w-10 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={theme.textSecondary}
                onChange={(e) => handleChange('textSecondary', e.target.value)}
                className="flex-1 text-xs h-9"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Border Customization */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Minus className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Borders & Dividers</Label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Border Style</Label>
            <Select
              value={theme.borderStyle}
              onValueChange={(v) => handleChange('borderStyle', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="thin">Thin (1px)</SelectItem>
                <SelectItem value="medium">Medium (2px)</SelectItem>
                <SelectItem value="thick">Thick (4px)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Section Divider</Label>
            <Select
              value={theme.sectionDivider}
              onValueChange={(v) => handleChange('sectionDivider', v)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="line">Solid Line</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="border-color" className="text-xs text-muted-foreground">
            Border Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="border-color"
              type="color"
              value={theme.borderColor}
              onChange={(e) => handleChange('borderColor', e.target.value)}
              className="w-10 h-9 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.borderColor}
              onChange={(e) => handleChange('borderColor', e.target.value)}
              className="flex-1 text-xs h-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="border-radius" className="text-xs text-muted-foreground">
            Border Radius: {theme.borderRadius}px
          </Label>
          <input
            id="border-radius"
            type="range"
            min="0"
            max="32"
            step="2"
            value={theme.borderRadius}
            onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="header-underline" className="text-xs text-muted-foreground">
            Header Underline
          </Label>
          <Switch
            id="header-underline"
            checked={theme.headerUnderline}
            onCheckedChange={(checked) => handleChange('headerUnderline', checked)}
          />
        </div>
      </div>
    </div>
  );
};
