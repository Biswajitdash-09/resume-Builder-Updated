
import React, { forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    };

    const formatDateRange = (startDate: string, endDate: string, current: boolean = false) => {
      const start = formatDate(startDate);
      const end = current ? 'Present' : formatDate(endDate);
      return `${start} - ${end}`;
    };

    return (
      <Card className="p-6 max-w-4xl mx-auto bg-white text-black resume-preview" ref={ref}>
        <div className="space-y-4 text-sm">
          {/* Header */}
          <header className="flex items-start gap-4 border-b border-gray-300 pb-3">
            {data.personalInfo.profilePicture && (
              <img
                src={data.personalInfo.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border flex-shrink-0"
              />
            )}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.address && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{data.personalInfo.address}</span>
                  </div>
                )}
              </div>
              {(data.personalInfo.linkedin || data.personalInfo.github) && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-1">
                  {data.personalInfo.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-3 w-3 flex-shrink-0" />
                      <a 
                        href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline whitespace-nowrap"
                      >
                        {data.personalInfo.linkedin}
                      </a>
                    </div>
                  )}
                  {data.personalInfo.github && (
                    <div className="flex items-center gap-1">
                      <Github className="h-3 w-3 flex-shrink-0" />
                      <a 
                        href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline whitespace-nowrap"
                      >
                        {data.personalInfo.github}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-sm font-semibold text-gray-900 mb-1 border-b border-gray-200">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed">{data.summary}</p>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Experience */}
              {data.experience.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    WORK EXPERIENCE
                  </h2>
                  <div className="space-y-3">
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs">{exp.position}</h3>
                            <p className="text-gray-700 text-xs">{exp.company}</p>
                            {exp.location && <p className="text-gray-600 text-xs">{exp.location}</p>}
                          </div>
                          <p className="text-xs text-gray-600">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                        </div>
                        {exp.description && (
                          <div className="text-gray-700 text-xs whitespace-pre-line leading-tight">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {data.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    EDUCATION
                  </h2>
                  <div className="space-y-2">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                            <p className="text-gray-700 text-xs">{edu.institution}</p>
                            <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
                            {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                          </div>
                          <p className="text-xs text-gray-600">{formatDateRange(edu.startDate, edu.endDate)}</p>
                        </div>
                        {edu.description && (
                          <p className="text-gray-700 text-xs mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {data.projects.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    PROJECTS
                  </h2>
                  <div className="space-y-3">
                    {data.projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs">{project.name}</h3>
                            {project.technologies.length > 0 && (
                              <p className="text-xs text-gray-600 italic">
                                {project.technologies.join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">{formatDateRange(project.startDate, project.endDate)}</p>
                            <div className="flex gap-1 mt-1">
                              {project.link && (
                                <a 
                                  href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              {project.github && (
                                <a 
                                  href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Github className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-xs">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Skills */}
              {data.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    SKILLS
                  </h2>
                  <div className="space-y-1">
                    {['Technical', 'Soft', 'Other'].map((category) => {
                      const categorySkills = data.skills.filter(skill => skill.category === category);
                      if (categorySkills.length === 0) return null;
                      
                      return (
                        <div key={category}>
                          <span className="font-medium text-gray-900 text-xs">{category}: </span>
                          <span className="text-gray-700 text-xs">
                            {categorySkills.map(skill => skill.name).join(', ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Programming Languages */}
              {data.programmingLanguages.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    PROGRAMMING LANGUAGES
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.programmingLanguages.map((lang) => (
                      <div key={lang.id} className="text-gray-700 text-xs">
                        <span className="font-medium">{lang.name}</span> ({lang.level})
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    CERTIFICATIONS
                  </h2>
                  <div className="space-y-2">
                    {data.certifications.map((cert) => (
                      <div key={cert.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs">{cert.name}</h3>
                            <p className="text-gray-700 text-xs">{cert.issuer}</p>
                            {cert.credentialId && (
                              <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
                            )}
                          </div>
                          <div className="text-right text-xs text-gray-600">
                            <p>{formatDate(cert.date)}</p>
                            {cert.expiryDate && (
                              <p>Exp: {formatDate(cert.expiryDate)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Spoken Languages */}
              {data.languages.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    SPOKEN LANGUAGES
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="text-gray-700 text-xs">
                        <span className="font-medium">{lang.name}</span> ({lang.proficiency})
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interests */}
              {data.interests.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200">
                    INTERESTS
                  </h2>
                  <p className="text-gray-700 text-xs">
                    {data.interests.map(interest => interest.name).join(', ')}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
