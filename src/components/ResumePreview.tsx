import React, { forwardRef } from 'react';
import { ResumeData } from '../types/resume';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ColorTheme } from './ColorCustomizer';

export type TemplateType = 'professional' | 'modern' | 'minimal';

interface ResumePreviewProps {
  data: ResumeData;
  template?: TemplateType;
  theme?: ColorTheme;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template = 'professional', theme }, ref) => {
    const defaultTheme: ColorTheme = {
      primary: '#2563eb',
      accent: '#3b82f6',
      textPrimary: '#1e293b',
      textSecondary: '#64748b',
    };

    const currentTheme = theme || defaultTheme;

    const renderTemplate = () => {
      switch (template) {
        case 'modern':
          return <ModernTemplate data={data} theme={currentTheme} />;
        case 'minimal':
          return <MinimalTemplate data={data} theme={currentTheme} />;
        case 'professional':
        default:
          return <ProfessionalTemplate data={data} theme={currentTheme} />;
      }
    };

    return (
      <div ref={ref} className="animate-fade-in">
        {renderTemplate()}
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
