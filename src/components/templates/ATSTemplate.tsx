import React from 'react';
import { ResumeData } from '../../types/resume';
import { ColorTheme } from '../../types/resume';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

interface ATSTemplateProps {
  data: ResumeData;
  theme: ColorTheme;
}

export const ATSTemplate: React.FC<ATSTemplateProps> = ({ data, theme }) => {
  const getBorderStyle = () => {
    const widths = { none: '0', thin: '1px', medium: '2px', thick: '4px' };
    return {
      borderWidth: widths[theme.borderStyle],
      borderColor: theme.borderColor,
      borderRadius: `${theme.borderRadius}px`,
      borderStyle: 'solid'
    };
  };

  return (
    <div 
      className="resume-preview bg-white p-8 shadow-lg mx-auto" 
      style={{ 
        width: '8.5in', 
        minHeight: '11in',
        fontFamily: 'Arial, sans-serif',
        color: '#000000',
        ...getBorderStyle()
      }}
    >
      {/* Header - ATS Friendly */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        
        {/* Contact Info - Plain Text for ATS */}
        <div className="text-sm" style={{ color: '#333333' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span> | {data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span> | {data.personalInfo.address}</span>}
        </div>
        <div className="text-sm" style={{ color: '#333333' }}>
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && data.personalInfo.linkedin && <span> | </span>}
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#333333' }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base" style={{ color: '#000000' }}>
                  {exp.position}
                </h3>
                <span className="text-sm" style={{ color: '#333333' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-sm mb-2" style={{ color: '#333333' }}>
                <span className="font-semibold">{exp.company}</span>
                {exp.location && <span> | {exp.location}</span>}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#333333' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base" style={{ color: '#000000' }}>
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <span className="text-sm" style={{ color: '#333333' }}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="text-sm" style={{ color: '#333333' }}>
                <span className="font-semibold">{edu.institution}</span>
                {edu.gpa && <span> | GPA: {edu.gpa}</span>}
              </div>
              {edu.description && (
                <p className="text-sm mt-1" style={{ color: '#333333' }}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills - ATS Keyword Optimized */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Skills
          </h2>
          <div className="text-sm" style={{ color: '#333333' }}>
            {Object.entries(
              data.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {} as Record<string, string[]>)
            ).map(([category, skills]) => (
              <div key={category} className="mb-2">
                <span className="font-semibold">{category}: </span>
                <span>{skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-base" style={{ color: '#000000' }}>
                {project.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: '#333333' }}>
                {project.description}
              </p>
              <div className="text-sm" style={{ color: '#333333' }}>
                <span className="font-semibold">Technologies: </span>
                <span>{project.technologies.join(', ')}</span>
              </div>
              {(project.link || project.github) && (
                <div className="text-sm" style={{ color: '#333333' }}>
                  {project.link && <span>Link: {project.link}</span>}
                  {project.github && project.link && <span> | </span>}
                  {project.github && <span>GitHub: {project.github}</span>}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-sm" style={{ color: '#000000' }}>
                {cert.name}
              </h3>
              <div className="text-sm" style={{ color: '#333333' }}>
                <span>{cert.issuer}</span>
                <span> | {cert.date}</span>
                {cert.credentialId && <span> | ID: {cert.credentialId}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: '#000000', borderBottom: '2px solid #000000' }}>
            Languages
          </h2>
          <div className="text-sm" style={{ color: '#333333' }}>
            {data.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(' | ')}
          </div>
        </section>
      )}
    </div>
  );
};
