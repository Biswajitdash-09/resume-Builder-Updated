import React from 'react';
import { ResumeData, ColorTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

interface MinimalTemplateProps {
  data: ResumeData;
  theme: ColorTheme;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, theme }) => {
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
    <div className="resume-preview bg-white p-8 max-w-3xl mx-auto" style={{ color: theme.textPrimary, width: '8.5in', minHeight: '11in', ...getBorderStyle() }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light mb-2 tracking-tight" style={{ color: theme.primary }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap gap-3 text-sm mt-3" style={{ color: theme.textSecondary }}>
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {data.personalInfo.address}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
              <Linkedin className="h-3 w-3" />
              LinkedIn
            </a>
          )}
          {data.personalInfo.github && (
            <a href={data.personalInfo.github} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed italic" style={{ color: theme.textSecondary }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-base" style={{ color: theme.textPrimary }}>
                    {exp.position}
                  </h3>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: theme.accent }}>
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: theme.textPrimary }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: theme.textPrimary }}>
                      {edu.degree}
                    </h3>
                    <p className="text-sm" style={{ color: theme.accent }}>
                      {edu.institution} • {edu.fieldOfStudy}
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
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
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Skills
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
            {data.skills.map((skill) => skill.name).join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold text-base" style={{ color: theme.textPrimary }}>
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1"
                      style={{ color: theme.accent }}
                    >
                      Link <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="text-sm mb-2" style={{ color: theme.textPrimary }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    {project.technologies.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Languages
          </h2>
          <p className="text-sm" style={{ color: theme.textPrimary }}>
            {data.languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(' • ')}
          </p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <span className="font-semibold text-sm" style={{ color: theme.textPrimary }}>
                  {cert.name}
                </span>
                <span className="text-sm" style={{ color: theme.textSecondary }}>
                  {' '}— {cert.issuer}, {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
            Interests
          </h2>
          <p className="text-sm" style={{ color: theme.textPrimary }}>
            {data.interests.map((interest) => interest.name).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
