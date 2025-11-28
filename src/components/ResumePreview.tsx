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
    fontFamily: 'Inter',
    fontSize: 'medium',
    headingSize: 'medium',
    lineHeight: 'normal',
    sectionDivider: 'none',
    headerUnderline: true,
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

  const isEmpty = !data.personalInfo.firstName && !data.personalInfo.lastName && !data.summary;

  return (
    <div className="animate-fade-in">
      {isEmpty ? (
        <div 
          className="bg-white p-8 shadow-lg mx-auto flex flex-col items-center justify-center text-center"
          style={{ 
            width: '8.5in', 
            minHeight: '11in',
            borderWidth: currentTheme.borderStyle === 'none' ? '0' : currentTheme.borderStyle === 'thin' ? '1px' : currentTheme.borderStyle === 'medium' ? '2px' : '4px',
            borderColor: currentTheme.borderColor,
            borderRadius: `${currentTheme.borderRadius}px`,
            borderStyle: 'solid'
          }}
        >
          <div className="text-muted-foreground space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Your Resume Preview</h3>
              <p className="text-sm mt-2">Start filling out the form on the left to see your resume come to life!</p>
            </div>
          </div>
        </div>
      ) : (
        renderTemplate()
      )}
    </div>
  );
};
