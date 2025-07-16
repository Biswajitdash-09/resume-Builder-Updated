
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
        month: 'long' 
      });
    };

    const formatDateRange = (startDate: string, endDate: string, current: boolean = false) => {
      const start = formatDate(startDate);
      const end = current ? 'Present' : formatDate(endDate);
      return `${start} - ${end}`;
    };

    return (
      <Card className="p-8 max-w-4xl mx-auto bg-white text-black" ref={ref}>
        <div className="space-y-6">
          {/* Header */}
          <header className="text-center border-b border-gray-300 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.personalInfo.address}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  {data.personalInfo.github}
                </div>
              )}
            </div>
          </header>

          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Work Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 text-sm whitespace-pre-line">
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
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDateRange(edu.startDate, edu.endDate)}</p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Skills
              </h2>
              <div className="space-y-2">
                {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
                  const categorySkills = data.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <span className="font-medium text-gray-900">{category}: </span>
                      <span className="text-gray-700">
                        {categorySkills.map(skill => skill.name).join(', ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        {project.technologies.length > 0 && (
                          <p className="text-sm text-gray-600 italic">
                            {project.technologies.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDateRange(project.startDate, project.endDate)}</p>
                        <div className="flex gap-2 mt-1">
                          {project.link && (
                            <ExternalLink className="h-4 w-4" />
                          )}
                          {project.github && (
                            <Github className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(cert.date)}</p>
                      {cert.expiryDate && (
                        <p>Expires: {formatDate(cert.expiryDate)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Languages
              </h2>
              <div className="flex flex-wrap gap-4">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-gray-700">
                    <span className="font-medium">{lang.name}</span> - {lang.proficiency}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
                Interests
              </h2>
              <p className="text-gray-700">
                {data.interests.map(interest => interest.name).join(', ')}
              </p>
            </section>
          )}
        </div>
      </Card>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
