import React from 'react';
import { ResumeData, ColorTheme } from '../types/resume';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ATSTemplate } from './templates/ATSTemplate';

export type TemplateType = 'professional' | 'modern' | 'minimal' | 'ats';

interface ResumePreviewProps {
  data: ResumeData;
  template?: TemplateType;
  theme?: ColorTheme;
}

export const ResumePreview = ({ data, template = 'professional', theme }: ResumePreviewProps) => {
  const defaultTheme: ColorTheme = {
    primary: '#2563eb',
    accent: '#3b82f6',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    borderStyle: 'thin',
    borderColor: '#e2e8f0',
    borderRadius: 8,
  };

  const currentTheme = theme || defaultTheme;

  const renderTemplate = () => {
    switch (template) {
      case 'ats':
        return <ATSTemplate data={data} theme={currentTheme} />;
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
    <div className="animate-fade-in">
      {renderTemplate()}
    </div>
  );
};
