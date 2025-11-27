import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export const exportToDocx = async (data: ResumeData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with name
        new Paragraph({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        
        // Contact Info
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({ text: data.personalInfo.email }),
            new TextRun({ text: ' | ' }),
            new TextRun({ text: data.personalInfo.phone }),
            ...(data.personalInfo.linkedin ? [
              new TextRun({ text: ' | ' }),
              new TextRun({ text: data.personalInfo.linkedin })
            ] : [])
          ]
        }),

        // Summary
        ...(data.summary ? [
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          new Paragraph({
            text: data.summary,
            spacing: { after: 300 }
          })
        ] : []),

        // Experience
        ...(data.experience.length > 0 ? [
          new Paragraph({
            text: 'PROFESSIONAL EXPERIENCE',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.experience.flatMap(exp => [
            new Paragraph({
              spacing: { before: 100, after: 50 },
              children: [
                new TextRun({ text: exp.position, bold: true, size: 24 }),
                new TextRun({ text: ' | ' }),
                new TextRun({ text: exp.company, italics: true })
              ]
            }),
            new Paragraph({
              text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
              spacing: { after: 50 }
            }),
            new Paragraph({
              text: exp.description,
              spacing: { after: 200 }
            })
          ])
        ] : []),

        // Education
        ...(data.education.length > 0 ? [
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.education.flatMap(edu => [
            new Paragraph({
              spacing: { before: 100, after: 50 },
              children: [
                new TextRun({ text: `${edu.degree} in ${edu.fieldOfStudy}`, bold: true }),
                new TextRun({ text: ' | ' }),
                new TextRun({ text: edu.institution, italics: true })
              ]
            }),
            new Paragraph({
              text: `${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
              spacing: { after: 200 }
            })
          ])
        ] : []),

        // Skills
        ...(data.skills.length > 0 ? [
          new Paragraph({
            text: 'SKILLS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          new Paragraph({
            text: data.skills.map(s => s.name).join(' • '),
            spacing: { after: 200 }
          })
        ] : []),

        // Projects
        ...(data.projects.length > 0 ? [
          new Paragraph({
            text: 'PROJECTS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.projects.flatMap(project => [
            new Paragraph({
              spacing: { before: 100, after: 50 },
              children: [
                new TextRun({ text: project.name, bold: true, size: 24 }),
              ]
            }),
            new Paragraph({
              text: project.description,
              spacing: { after: 50 }
            }),
            new Paragraph({
              text: `Technologies: ${project.technologies.join(', ')}`,
              spacing: { after: 200 }
            })
          ])
        ] : []),

        // Certifications
        ...(data.certifications.length > 0 ? [
          new Paragraph({
            text: 'CERTIFICATIONS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.certifications.flatMap(cert => [
            new Paragraph({
              spacing: { before: 100, after: 50 },
              children: [
                new TextRun({ text: cert.name, bold: true }),
                new TextRun({ text: ` - ${cert.issuer}` }),
                new TextRun({ text: ` | ${cert.date}` })
              ]
            })
          ])
        ] : []),

        // Languages
        ...(data.languages.length > 0 ? [
          new Paragraph({
            text: 'LANGUAGES',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          new Paragraph({
            text: data.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(' | '),
            spacing: { after: 200 }
          })
        ] : [])
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.docx`);
};

export const exportToTxt = (data: ResumeData): void => {
  let text = '';
  
  // Header
  text += `${data.personalInfo.firstName} ${data.personalInfo.lastName}\n`;
  text += `${data.personalInfo.email} | ${data.personalInfo.phone}\n`;
  if (data.personalInfo.linkedin) text += `LinkedIn: ${data.personalInfo.linkedin}\n`;
  if (data.personalInfo.github) text += `GitHub: ${data.personalInfo.github}\n`;
  if (data.personalInfo.address) text += `${data.personalInfo.address}\n`;
  text += '\n';

  // Summary
  if (data.summary) {
    text += '='.repeat(50) + '\n';
    text += 'PROFESSIONAL SUMMARY\n';
    text += '='.repeat(50) + '\n';
    text += data.summary + '\n\n';
  }

  // Experience
  if (data.experience.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'PROFESSIONAL EXPERIENCE\n';
    text += '='.repeat(50) + '\n';
    data.experience.forEach(exp => {
      text += `\n${exp.position} | ${exp.company}\n`;
      text += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
      if (exp.location) text += `Location: ${exp.location}\n`;
      text += `\n${exp.description}\n`;
    });
    text += '\n';
  }

  // Education
  if (data.education.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'EDUCATION\n';
    text += '='.repeat(50) + '\n';
    data.education.forEach(edu => {
      text += `\n${edu.degree} in ${edu.fieldOfStudy}\n`;
      text += `${edu.institution}\n`;
      text += `${edu.startDate} - ${edu.endDate}\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      if (edu.description) text += `${edu.description}\n`;
    });
    text += '\n';
  }

  // Skills
  if (data.skills.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'SKILLS\n';
    text += '='.repeat(50) + '\n';
    const skillsByCategory = data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);
    
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      text += `\n${category}: ${skills.join(', ')}\n`;
    });
    text += '\n';
  }

  // Projects
  if (data.projects.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'PROJECTS\n';
    text += '='.repeat(50) + '\n';
    data.projects.forEach(project => {
      text += `\n${project.name}\n`;
      text += `${project.description}\n`;
      text += `Technologies: ${project.technologies.join(', ')}\n`;
      if (project.link) text += `Link: ${project.link}\n`;
      if (project.github) text += `GitHub: ${project.github}\n`;
    });
    text += '\n';
  }

  // Certifications
  if (data.certifications.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'CERTIFICATIONS\n';
    text += '='.repeat(50) + '\n';
    data.certifications.forEach(cert => {
      text += `\n${cert.name} - ${cert.issuer}\n`;
      text += `Issued: ${cert.date}\n`;
      if (cert.credentialId) text += `Credential ID: ${cert.credentialId}\n`;
    });
    text += '\n';
  }

  // Languages
  if (data.languages.length > 0) {
    text += '='.repeat(50) + '\n';
    text += 'LANGUAGES\n';
    text += '='.repeat(50) + '\n';
    text += data.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(' | ') + '\n';
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.txt`);
};

export const exportToHtml = (data: ResumeData): void => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.firstName} ${data.personalInfo.lastName} - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      margin: 0;
      color: #1e293b;
      font-size: 2.5em;
    }
    .contact-info {
      margin-top: 10px;
      color: #64748b;
    }
    h2 {
      color: #2563eb;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 5px;
      margin-top: 30px;
    }
    .section {
      margin-bottom: 25px;
    }
    .item {
      margin-bottom: 20px;
    }
    .item-header {
      font-weight: bold;
      color: #1e293b;
    }
    .item-subheader {
      color: #64748b;
      font-style: italic;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      background-color: #e0e7ff;
      color: #3730a3;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9em;
    }
    @media print {
      body { max-width: 100%; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${data.personalInfo.firstName} ${data.personalInfo.lastName}</h1>
    <div class="contact-info">
      ${data.personalInfo.email} | ${data.personalInfo.phone}
      ${data.personalInfo.linkedin ? ` | <a href="https://${data.personalInfo.linkedin}">LinkedIn</a>` : ''}
      ${data.personalInfo.github ? ` | <a href="https://${data.personalInfo.github}">GitHub</a>` : ''}
      ${data.personalInfo.address ? `<br>${data.personalInfo.address}` : ''}
    </div>
  </header>

  ${data.summary ? `
  <section class="section">
    <h2>Professional Summary</h2>
    <p>${data.summary}</p>
  </section>
  ` : ''}

  ${data.experience.length > 0 ? `
  <section class="section">
    <h2>Professional Experience</h2>
    ${data.experience.map(exp => `
      <div class="item">
        <div class="item-header">${exp.position} | ${exp.company}</div>
        <div class="item-subheader">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}${exp.location ? ` | ${exp.location}` : ''}</div>
        <p>${exp.description}</p>
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${data.education.length > 0 ? `
  <section class="section">
    <h2>Education</h2>
    ${data.education.map(edu => `
      <div class="item">
        <div class="item-header">${edu.degree} in ${edu.fieldOfStudy}</div>
        <div class="item-subheader">${edu.institution} | ${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        ${edu.description ? `<p>${edu.description}</p>` : ''}
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${data.skills.length > 0 ? `
  <section class="section">
    <h2>Skills</h2>
    <div class="skills">
      ${data.skills.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
    </div>
  </section>
  ` : ''}

  ${data.projects.length > 0 ? `
  <section class="section">
    <h2>Projects</h2>
    ${data.projects.map(project => `
      <div class="item">
        <div class="item-header">${project.name}</div>
        <p>${project.description}</p>
        <div class="item-subheader">Technologies: ${project.technologies.join(', ')}</div>
        ${project.link ? `<div><a href="${project.link}" target="_blank">View Project</a></div>` : ''}
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${data.certifications.length > 0 ? `
  <section class="section">
    <h2>Certifications</h2>
    ${data.certifications.map(cert => `
      <div class="item">
        <div class="item-header">${cert.name}</div>
        <div class="item-subheader">${cert.issuer} | ${cert.date}${cert.credentialId ? ` | ID: ${cert.credentialId}` : ''}</div>
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${data.languages.length > 0 ? `
  <section class="section">
    <h2>Languages</h2>
    <p>${data.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(' | ')}</p>
  </section>
  ` : ''}
</body>
</html>
  `.trim();

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  saveAs(blob, `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.html`);
};
