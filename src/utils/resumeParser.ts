import { ResumeData, PersonalInfo } from '../types/resume';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parsePdfResume = async (file: File): Promise<Partial<ResumeData>> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return parseTextResume(fullText);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};

export const parseDocxResume = async (file: File): Promise<Partial<ResumeData>> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    
    return parseTextResume(text);
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

const getDefaultPersonalInfo = (): PersonalInfo => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  address: '',
  title: '',
  website: '',
  portfolio: '',
  twitter: '',
  photo: '',
  showPhoto: false,
  photoShape: 'circle',
  photoSize: 'medium',
});

export const parseTextResume = (text: string): Partial<ResumeData> => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const result: Partial<ResumeData> = {
    personalInfo: getDefaultPersonalInfo(),
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    awards: [],
    publications: [],
    volunteer: [],
    references: [],
    customSections: [],
  };

  let currentSection = '';
  let buffer: string[] = [];

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const linkedinRegex = /(linkedin\.com\/in\/[\w-]+)/i;
  const githubRegex = /(github\.com\/[\w-]+)/i;

  // Extract personal info from first few lines
  const firstLines = lines.slice(0, 10).join(' ');
  const emailMatch = firstLines.match(emailRegex);
  const phoneMatch = firstLines.match(phoneRegex);
  const linkedinMatch = firstLines.match(linkedinRegex);
  const githubMatch = firstLines.match(githubRegex);

  if (emailMatch) result.personalInfo!.email = emailMatch[0];
  if (phoneMatch) result.personalInfo!.phone = phoneMatch[0];
  if (linkedinMatch) result.personalInfo!.linkedin = linkedinMatch[0];
  if (githubMatch) result.personalInfo!.github = githubMatch[0];

  // Try to extract name from first line
  const firstLine = lines[0];
  if (firstLine && !emailRegex.test(firstLine) && !phoneRegex.test(firstLine)) {
    const nameParts = firstLine.split(/\s+/);
    if (nameParts.length >= 2) {
      result.personalInfo!.firstName = nameParts[0];
      result.personalInfo!.lastName = nameParts.slice(1).join(' ');
    } else if (nameParts.length === 1) {
      result.personalInfo!.firstName = nameParts[0];
    }
  }

  // Parse sections
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Detect section headers
    if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile') || lowerLine.includes('about')) {
      currentSection = 'summary';
      buffer = [];
      continue;
    } else if (lowerLine.includes('experience') || lowerLine.includes('employment') || lowerLine.includes('work history') || lowerLine.includes('work experience')) {
      currentSection = 'experience';
      buffer = [];
      continue;
    } else if (lowerLine.includes('education') || lowerLine.includes('academic') || lowerLine.includes('qualification')) {
      currentSection = 'education';
      buffer = [];
      continue;
    } else if (lowerLine.includes('skill') || lowerLine.includes('technical') || lowerLine.includes('competenc')) {
      currentSection = 'skills';
      buffer = [];
      continue;
    } else if (lowerLine.includes('project')) {
      currentSection = 'projects';
      buffer = [];
      continue;
    } else if (lowerLine.includes('certification') || lowerLine.includes('license') || lowerLine.includes('credential')) {
      currentSection = 'certifications';
      buffer = [];
      continue;
    } else if (lowerLine.includes('language')) {
      currentSection = 'languages';
      buffer = [];
      continue;
    } else if (lowerLine.includes('interest') || lowerLine.includes('hobbi')) {
      currentSection = 'interests';
      buffer = [];
      continue;
    } else if (lowerLine.includes('award') || lowerLine.includes('honor') || lowerLine.includes('achievement')) {
      currentSection = 'awards';
      buffer = [];
      continue;
    } else if (lowerLine.includes('publication') || lowerLine.includes('research')) {
      currentSection = 'publications';
      buffer = [];
      continue;
    } else if (lowerLine.includes('volunteer') || lowerLine.includes('community')) {
      currentSection = 'volunteer';
      buffer = [];
      continue;
    } else if (lowerLine.includes('reference')) {
      currentSection = 'references';
      buffer = [];
      continue;
    }

    // Accumulate content for current section
    if (currentSection === 'summary') {
      buffer.push(line);
      result.summary = buffer.join(' ');
    } else if (currentSection === 'skills') {
      // Parse skills (comma or bullet separated)
      const skillMatch = line.match(/[-•*]?\s*(.+)/);
      if (skillMatch) {
        const skillText = skillMatch[1];
        skillText.split(/[,;|]/).forEach(skill => {
          const trimmed = skill.trim();
          if (trimmed && result.skills && trimmed.length > 1 && trimmed.length < 50) {
            result.skills.push({
              id: Date.now().toString() + Math.random(),
              name: trimmed,
              level: 'Intermediate',
              category: 'Technical'
            });
          }
        });
      }
    } else if (currentSection === 'interests') {
      const interestMatch = line.match(/[-•*]?\s*(.+)/);
      if (interestMatch) {
        const interestText = interestMatch[1];
        interestText.split(/[,;|]/).forEach(interest => {
          const trimmed = interest.trim();
          if (trimmed && result.interests && trimmed.length > 1 && trimmed.length < 50) {
            result.interests.push({
              id: Date.now().toString() + Math.random(),
              name: trimmed
            });
          }
        });
      }
    }
  }

  return result;
};

export const validateResumeData = (data: any): boolean => {
  return (
    data &&
    typeof data === 'object' &&
    data.personalInfo &&
    typeof data.personalInfo === 'object' &&
    Array.isArray(data.education) &&
    Array.isArray(data.experience) &&
    Array.isArray(data.skills)
  );
};
