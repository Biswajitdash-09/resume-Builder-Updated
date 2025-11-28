import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GripVertical, Eye, EyeOff, LayoutList } from 'lucide-react';
import { SectionVisibility } from '../types/resume';

interface SectionManagerProps {
  visibility: SectionVisibility;
  sectionOrder: string[];
  onVisibilityChange: (visibility: SectionVisibility) => void;
  onOrderChange: (order: string[]) => void;
}

const sectionLabels: Record<keyof SectionVisibility, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  interests: 'Interests',
  awards: 'Awards & Honors',
  publications: 'Publications',
  volunteer: 'Volunteer Experience',
  references: 'References',
  customSections: 'Custom Sections',
};

export const SectionManager: React.FC<SectionManagerProps> = ({
  visibility,
  sectionOrder,
  onVisibilityChange,
  onOrderChange,
}) => {
  const toggleVisibility = (section: keyof SectionVisibility) => {
    onVisibilityChange({
      ...visibility,
      [section]: !visibility[section],
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    [newOrder[index], newOrder[targetIndex]] = [
      newOrder[targetIndex],
      newOrder[index],
    ];
    onOrderChange(newOrder);
  };

  const showAll = () => {
    const allVisible = Object.keys(visibility).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as SectionVisibility
    );
    onVisibilityChange(allVisible);
  };

  const hideAll = () => {
    const allHidden = Object.keys(visibility).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as SectionVisibility
    );
    onVisibilityChange(allHidden);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutList className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Section Manager</h3>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={showAll}>
            <Eye className="h-4 w-4 mr-1" />
            Show All
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={hideAll}>
            <EyeOff className="h-4 w-4 mr-1" />
            Hide All
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Toggle sections on/off and reorder them to customize your resume layout.
      </p>

      <div className="space-y-2">
        {sectionOrder.map((sectionKey, index) => {
          const key = sectionKey as keyof SectionVisibility;
          const isVisible = visibility[key];

          return (
            <div
              key={sectionKey}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                isVisible
                  ? 'bg-muted/30 border-border'
                  : 'bg-muted/10 border-border/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0"
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0"
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sectionOrder.length - 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium cursor-pointer">
                  {sectionLabels[key]}
                </Label>
              </div>

              <Switch
                checked={isVisible}
                onCheckedChange={() => toggleVisibility(key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
