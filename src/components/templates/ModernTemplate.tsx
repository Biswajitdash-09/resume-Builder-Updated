import React from 'react';
import { ResumeData, ColorTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
  theme: ColorTheme;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, theme }) => {
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
    <div className="resume-preview bg-white text-gray-900 shadow-lg max-w-4xl mx-auto overflow-hidden" style={{ width: '8.5in', minHeight: '11in', ...getBorderStyle() }}>
      <div className="grid grid-cols-3 gap-0">
        {/* Left Sidebar */}
        <div className="col-span-1 p-6" style={{ backgroundColor: theme.primary, color: 'white' }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">
              {data.personalInfo.firstName}
            </h1>
            <h1 className="text-2xl font-bold mb-3">
              {data.personalInfo.lastName}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-6 space-y-2 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 flex-shrink-0" />
                <a href={data.personalInfo.linkedin} className="hover:underline break-all">
                  LinkedIn
                </a>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 flex-shrink-0" />
                <a href={data.personalInfo.github} className="hover:underline break-all">
                  GitHub
                </a>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">
                Skills
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <div className="w-full bg-white/20 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-white rounded-full h-1.5"
                        style={{
                          width:
                            skill.level === 'Expert'
                              ? '100%'
                              : skill.level === 'Advanced'
                              ? '75%'
                              : skill.level === 'Intermediate'
                              ? '50%'
                              : '25%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">
                Languages
              </h2>
              <div className="space-y-1 text-sm">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-white/70"> - {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-6" style={{ color: theme.textPrimary }}>
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: theme.accent }}>
                Profile
              </h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: theme.accent }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.accent }}>
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                    <div className="mb-1">
                      <h3 className="font-bold text-base">{exp.position}</h3>
                      <p className="text-sm font-semibold" style={{ color: theme.accent }}>
                        {exp.company}
                      </p>
                      <p className="text-xs" style={{ color: theme.textSecondary }}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <p className="text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: theme.accent }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-sm" style={{ color: theme.accent }}>
                      {edu.institution}
                    </p>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: theme.accent }}>
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-base">{project.name}</h3>
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
                    <p className="text-sm mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ 
                              backgroundColor: `${theme.primary}15`,
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

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3" style={{ color: theme.accent }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-sm">{cert.name}</h3>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interests in sidebar */}
      {data.interests.length > 0 && (
        <div className="px-6 pb-6" style={{ backgroundColor: theme.primary, color: 'white' }}>
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <span
                key={interest.id}
                className="text-xs px-2 py-1 rounded bg-white/20"
              >
                {interest.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
