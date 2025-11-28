
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  address: string;
  title?: string;
  website?: string;
  portfolio?: string;
  twitter?: string;
  photo?: string;
  showPhoto: boolean;
  photoShape: 'circle' | 'rounded' | 'square';
  photoSize: 'small' | 'medium' | 'large';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Other';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Interest {
  id: string;
  name: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  authors?: string;
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ColorTheme {
  primary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  borderStyle: 'none' | 'thin' | 'medium' | 'thick';
  borderColor: string;
  borderRadius: number;
  fontFamily: 'Inter' | 'Roboto' | 'Open Sans' | 'Lato' | 'Poppins' | 'Playfair Display' | 'Merriweather';
  fontSize: 'small' | 'medium' | 'large';
  headingSize: 'small' | 'medium' | 'large';
  lineHeight: 'compact' | 'normal' | 'relaxed';
  sectionDivider: 'none' | 'line' | 'dotted' | 'dashed';
  headerUnderline: boolean;
}

export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  languages: boolean;
  interests: boolean;
  awards: boolean;
  publications: boolean;
  volunteer: boolean;
  references: boolean;
  customSections: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  interests: Interest[];
  awards: Award[];
  publications: Publication[];
  volunteer: VolunteerExperience[];
  references: Reference[];
  customSections: CustomSection[];
  sectionVisibility: SectionVisibility;
  sectionOrder: string[];
}
