import { ResumeData } from '../types/resume';

export const parseTextResume = (text: string): Partial<ResumeData> => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const result: Partial<ResumeData> = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      address: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: []
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
    }
  }

  // Parse sections
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Detect section headers
    if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile')) {
      currentSection = 'summary';
      buffer = [];
      continue;
    } else if (lowerLine.includes('experience') || lowerLine.includes('employment') || lowerLine.includes('work history')) {
      currentSection = 'experience';
      buffer = [];
      continue;
    } else if (lowerLine.includes('education') || lowerLine.includes('academic')) {
      currentSection = 'education';
      buffer = [];
      continue;
    } else if (lowerLine.includes('skill') || lowerLine.includes('technical')) {
      currentSection = 'skills';
      buffer = [];
      continue;
    } else if (lowerLine.includes('project')) {
      currentSection = 'projects';
      buffer = [];
      continue;
    } else if (lowerLine.includes('certification') || lowerLine.includes('license')) {
      currentSection = 'certifications';
      buffer = [];
      continue;
    } else if (lowerLine.includes('language')) {
      currentSection = 'languages';
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
        skillText.split(/[,;]/).forEach(skill => {
          const trimmed = skill.trim();
          if (trimmed && result.skills) {
            result.skills.push({
              id: Date.now().toString() + Math.random(),
              name: trimmed,
              level: 'Intermediate',
              category: 'Technical'
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
