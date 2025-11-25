import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { ColorTheme } from '../ColorCustomizer';

interface ProfessionalTemplateProps {
  data: ResumeData;
  theme: ColorTheme;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, theme }) => {
  return (
    <div className="bg-white text-gray-900 p-8 shadow-lg rounded-lg max-w-4xl mx-auto" style={{ color: theme.textPrimary }}>
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2" style={{ borderColor: theme.primary }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: theme.textSecondary }}>
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>

        {(data.personalInfo.linkedin || data.personalInfo.github) && (
          <div className="flex justify-center gap-4 mt-3 text-sm">
            {data.personalInfo.linkedin && (
              <a href={data.personalInfo.linkedin} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {data.personalInfo.github && (
              <a href={data.personalInfo.github} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase" style={{ color: theme.primary }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase" style={{ color: theme.primary }}>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>
                      {exp.position}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: theme.accent }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-right" style={{ color: theme.textSecondary }}>
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.location && <p className="text-xs">{exp.location}</p>}
                  </div>
                </div>
                <p className="text-sm mt-2 whitespace-pre-line" style={{ color: theme.textPrimary }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase" style={{ color: theme.primary }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-sm" style={{ color: theme.accent }}>
                      {edu.institution}
                    </p>
                  </div>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.gpa && (
                  <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase" style={{ color: theme.primary }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ 
                  backgroundColor: `${theme.accent}20`,
                  color: theme.textPrimary
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase" style={{ color: theme.primary }}>
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1"
                        style={{ color: theme.accent }}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm mb-2" style={{ color: theme.textPrimary }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${theme.primary}10`,
                          color: theme.textSecondary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
