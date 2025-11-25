import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export type TemplateType = 'professional' | 'modern' | 'minimal';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const templates = [
    {
      id: 'professional' as TemplateType,
      name: 'Professional',
      description: 'ATS-friendly, traditional layout',
      preview: 'Classic single-column design',
    },
    {
      id: 'modern' as TemplateType,
      name: 'Modern',
      description: 'Contemporary two-column layout',
      preview: 'Stylish with accent colors',
    },
    {
      id: 'minimal' as TemplateType,
      name: 'Minimal',
      description: 'Clean and simple design',
      preview: 'Less is more approach',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Resume Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary shadow-lg'
                : 'hover:ring-1 hover:ring-border'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
              {selectedTemplate === template.id && (
                <div className="bg-primary rounded-full p-1 animate-scale-in">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="mt-3 p-3 bg-muted/50 rounded text-xs text-muted-foreground">
              {template.preview}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
