import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { InterestsForm } from './forms/InterestsForm';
import { ResumePreview } from './ResumePreview';
import { ResumeData } from '../types/resume';
import { exportToPDF } from '../utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
export const ResumeBuilder = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData>({
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
  });
  const {
    toast
  } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, 10000);
    return () => clearInterval(interval);
  }, [resumeData]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!"
    });
  };
  const handleExportPDF = async () => {
    try {
      console.log('Export PDF clicked');
      await exportToPDF(resumeData);
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded successfully!"
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  };
  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  return <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Resume Builder - By Biswajit Dash</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="md:hidden">
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSave} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleExportPDF} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className={`space-y-6 ${showPreview ? 'block' : 'hidden'} lg:block`}>
            <Card className="p-6">
              <PersonalInfoForm data={resumeData.personalInfo} onChange={data => updateResumeData('personalInfo', data)} />
            </Card>

            <Card className="p-6">
              <SummaryForm data={resumeData.summary} onChange={data => updateResumeData('summary', data)} />
            </Card>

            <Card className="p-6">
              <EducationForm data={resumeData.education} onChange={data => updateResumeData('education', data)} />
            </Card>

            <Card className="p-6">
              <ExperienceForm data={resumeData.experience} onChange={data => updateResumeData('experience', data)} />
            </Card>

            <Card className="p-6">
              <SkillsForm data={resumeData.skills} onChange={data => updateResumeData('skills', data)} />
            </Card>

            <Card className="p-6">
              <ProjectsForm data={resumeData.projects} onChange={data => updateResumeData('projects', data)} />
            </Card>

            <Card className="p-6">
              <CertificationsForm data={resumeData.certifications} onChange={data => updateResumeData('certifications', data)} />
            </Card>

            <Card className="p-6">
              <LanguagesForm data={resumeData.languages} onChange={data => updateResumeData('languages', data)} />
            </Card>

            <Card className="p-6">
              <InterestsForm data={resumeData.interests} onChange={data => updateResumeData('interests', data)} />
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`sticky top-6 ${!showPreview ? 'block' : 'hidden'} lg:block`}>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>;
};