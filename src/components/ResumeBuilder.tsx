import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Download, Save, Eye, EyeOff, Upload, FileJson, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const { toast } = useToast();

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
      setIsExporting(true);
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
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "JSON Exported",
        description: "Your resume data has been downloaded as JSON!"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export JSON file.",
        variant: "destructive"
      });
    }
  };

  const handleImportResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast({
        title: "Invalid File",
        description: "Please upload a JSON file.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate the structure
        if (!importedData.personalInfo || !Array.isArray(importedData.education)) {
          throw new Error('Invalid resume data structure');
        }

        setResumeData(importedData);
        localStorage.setItem('resumeData', JSON.stringify(importedData));
        
        toast({
          title: "Resume Imported",
          description: "Your resume has been imported successfully!"
        });
      } catch (error) {
        console.error('Import failed:', error);
        toast({
          title: "Import Failed",
          description: "Invalid JSON file or data structure.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearAll = () => {
    const emptyData: ResumeData = {
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
    
    setResumeData(emptyData);
    localStorage.removeItem('resumeData');
    setShowClearDialog(false);
    
    toast({
      title: "Resume Cleared",
      description: "All data has been cleared successfully!"
    });
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  return <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Resume Builder - By Biswajit Dash
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Mobile Preview Toggle */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPreview(!showPreview)} 
                className="md:hidden transition-all duration-200 hover:scale-105"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              
              {/* Import Resume */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportResume}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                variant="outline" 
                size="sm"
                className="hidden sm:inline-flex transition-all duration-200 hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              
              {/* Export JSON */}
              <Button 
                onClick={handleExportJSON} 
                variant="outline" 
                size="sm"
                className="hidden sm:inline-flex transition-all duration-200 hover:scale-105"
              >
                <FileJson className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              
              {/* Clear All */}
              <Button 
                onClick={() => setShowClearDialog(true)} 
                variant="outline" 
                size="sm"
                className="hidden sm:inline-flex transition-all duration-200 hover:scale-105 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              
              {/* Save Draft */}
              <Button 
                onClick={handleSave} 
                variant="outline" 
                size="sm"
                className="transition-all duration-200 hover:scale-105"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              {/* Download PDF */}
              <Button 
                onClick={handleExportPDF} 
                size="sm"
                disabled={isExporting}
                className="transition-all duration-200 hover:scale-105 relative overflow-hidden"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'PDF'}
              </Button>
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Moon className="h-4 w-4 text-muted-foreground" />
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
            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
              <PersonalInfoForm data={resumeData.personalInfo} onChange={data => updateResumeData('personalInfo', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.1s' }}>
              <SummaryForm data={resumeData.summary} onChange={data => updateResumeData('summary', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.2s' }}>
              <EducationForm data={resumeData.education} onChange={data => updateResumeData('education', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.3s' }}>
              <ExperienceForm data={resumeData.experience} onChange={data => updateResumeData('experience', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.4s' }}>
              <SkillsForm data={resumeData.skills} onChange={data => updateResumeData('skills', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.5s' }}>
              <ProjectsForm data={resumeData.projects} onChange={data => updateResumeData('projects', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.6s' }}>
              <CertificationsForm data={resumeData.certifications} onChange={data => updateResumeData('certifications', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.7s' }}>
              <LanguagesForm data={resumeData.languages} onChange={data => updateResumeData('languages', data)} />
            </Card>

            <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50" style={{ animationDelay: '0.8s' }}>
              <InterestsForm data={resumeData.interests} onChange={data => updateResumeData('interests', data)} />
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`sticky top-24 ${!showPreview ? 'block' : 'hidden'} lg:block animate-slide-in-right`}>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your resume data
              from local storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Clear All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};