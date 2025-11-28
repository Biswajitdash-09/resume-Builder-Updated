import React from 'react';
import { ResumeData, ColorTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Globe, Twitter } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeData;
  theme: ColorTheme;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, theme }) => {
  const getBorderStyle = () => {
    const widths = { none: '0', thin: '1px', medium: '2px', thick: '4px' };
    return {
      borderWidth: widths[theme.borderStyle],
      borderColor: theme.borderColor,
      borderRadius: `${theme.borderRadius}px`,
      borderStyle: 'solid'
    };
  };

  const getFontSize = () => {
    const sizes = { small: '12px', medium: '14px', large: '16px' };
    return sizes[theme.fontSize];
  };

  const getHeadingSize = () => {
    const sizes = { small: '18px', medium: '20px', large: '24px' };
    return sizes[theme.headingSize];
  };

  const getLineHeight = () => {
    const heights = { compact: '1.3', normal: '1.5', relaxed: '1.7' };
    return heights[theme.lineHeight];
  };

  const getSectionDividerStyle = () => {
    if (theme.sectionDivider === 'none') return {};
    const styles: Record<string, string> = { line: 'solid', dotted: 'dotted', dashed: 'dashed' };
    return {
      borderBottomWidth: '1px',
      borderBottomStyle: styles[theme.sectionDivider],
      borderBottomColor: theme.borderColor,
      paddingBottom: '16px',
      marginBottom: '16px',
    };
  };

  const getPhotoSize = () => {
    const sizes = { small: '60px', medium: '80px', large: '100px' };
    return sizes[data.personalInfo.photoSize];
  };

  const getPhotoShape = () => {
    const shapes = { circle: '50%', rounded: '8px', square: '0' };
    return shapes[data.personalInfo.photoShape];
  };

  return (
    <div 
      className="resume-preview bg-white text-gray-900 p-8 shadow-lg max-w-4xl mx-auto" 
      style={{ 
        color: theme.textPrimary, 
        width: '8.5in', 
        minHeight: '11in', 
        fontFamily: theme.fontFamily,
        fontSize: getFontSize(),
        lineHeight: getLineHeight(),
        ...getBorderStyle() 
      }}
    >
      {/* Header */}
      <div 
        className="text-center mb-6 pb-6" 
        style={{ 
          borderBottomWidth: theme.headerUnderline ? '2px' : '0',
          borderBottomStyle: 'solid',
          borderBottomColor: theme.primary 
        }}
      >
        <div className="flex items-center justify-center gap-4">
          {data.personalInfo.showPhoto && data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              style={{
                width: getPhotoSize(),
                height: getPhotoSize(),
                borderRadius: getPhotoShape(),
                objectFit: 'cover',
              }}
            />
          )}
          <div>
            <h1 className="font-bold mb-1" style={{ color: theme.primary, fontSize: `calc(${getHeadingSize()} * 1.5)` }}>
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            {data.personalInfo.title && (
              <p className="text-lg font-medium" style={{ color: theme.textSecondary }}>
                {data.personalInfo.title}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-3" style={{ color: theme.textSecondary }}>
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

        <div className="flex justify-center gap-4 mt-3 text-sm flex-wrap">
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
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </a>
          )}
          {data.personalInfo.twitter && (
            <a href={`https://twitter.com/${data.personalInfo.twitter.replace('@', '')}`} className="flex items-center gap-1 hover:underline" style={{ color: theme.accent }}>
              <Twitter className="h-4 w-4" />
              <span>{data.personalInfo.twitter}</span>
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && data.sectionVisibility?.summary !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.sectionVisibility?.experience !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>{exp.position}</h3>
                    <p className="text-sm font-semibold" style={{ color: theme.accent }}>{exp.company}</p>
                  </div>
                  <div className="text-sm text-right" style={{ color: theme.textSecondary }}>
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.location && <p className="text-xs">{exp.location}</p>}
                  </div>
                </div>
                <p className="text-sm mt-2 whitespace-pre-line" style={{ color: theme.textPrimary }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.sectionVisibility?.education !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-sm" style={{ color: theme.accent }}>{edu.institution}</p>
                  </div>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>{edu.startDate} - {edu.endDate}</p>
                </div>
                {edu.gpa && <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && data.sectionVisibility?.skills !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: `${theme.accent}20`, color: theme.textPrimary }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && data.sectionVisibility?.projects !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>{project.name}</h3>
                  {project.link && (
                    <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1" style={{ color: theme.accent }}>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="text-sm mb-2" style={{ color: theme.textPrimary }}>{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${theme.primary}10`, color: theme.textSecondary }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {data.awards?.length > 0 && data.sectionVisibility?.awards !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Awards & Honors</h2>
          <div className="space-y-2">
            {data.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>{award.title}</h3>
                <p className="text-sm" style={{ color: theme.accent }}>{award.issuer} • {award.date}</p>
                {award.description && <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && data.sectionVisibility?.certifications !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>{cert.name}</h3>
                <p className="text-sm" style={{ color: theme.accent }}>{cert.issuer} • {cert.date}</p>
                {cert.credentialId && <p className="text-xs" style={{ color: theme.textSecondary }}>Credential ID: {cert.credentialId}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && data.sectionVisibility?.languages !== false && (
        <div className="mb-6" style={getSectionDividerStyle()}>
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Languages</h2>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((lang) => (
              <span key={lang.id} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: `${theme.accent}20`, color: theme.textPrimary }}>
                {lang.name} ({lang.proficiency})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests.length > 0 && data.sectionVisibility?.interests !== false && (
        <div className="mb-6">
          <h2 className="font-bold mb-3 uppercase" style={{ color: theme.primary, fontSize: getHeadingSize() }}>Interests</h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <span key={interest.id} className="px-3 py-1 text-sm rounded" style={{ backgroundColor: `${theme.primary}10`, color: theme.textSecondary }}>
                {interest.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
