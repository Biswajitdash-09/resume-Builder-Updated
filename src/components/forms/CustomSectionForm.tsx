import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Layers } from 'lucide-react';
import { CustomSection } from '../../types/resume';

interface CustomSectionFormProps {
  data: CustomSection[];
  onChange: (data: CustomSection[]) => void;
}

export const CustomSectionForm: React.FC<CustomSectionFormProps> = ({ data, onChange }) => {
  const addSection = () => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: '',
      content: '',
    };
    onChange([...data, newSection]);
  };

  const updateSection = (id: string, field: keyof CustomSection, value: string) => {
    onChange(
      data.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const removeSection = (id: string) => {
    onChange(data.filter((section) => section.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Custom Sections</h3>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addSection}>
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No custom sections added yet. Click "Add Section" to create your own section.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((section, index) => (
            <div
              key={section.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Custom Section #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(section.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label htmlFor={`title-${section.id}`}>Section Title *</Label>
                <Input
                  id={`title-${section.id}`}
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, 'title', e.target.value)
                  }
                  placeholder="e.g., Hobbies, Achievements, Professional Memberships"
                />
              </div>

              <div>
                <Label htmlFor={`content-${section.id}`}>Content *</Label>
                <Textarea
                  id={`content-${section.id}`}
                  value={section.content}
                  onChange={(e) =>
                    updateSection(section.id, 'content', e.target.value)
                  }
                  placeholder="Enter the content for this section..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use bullet points by starting lines with "•" or "-"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
