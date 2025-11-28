import React, { useState, useEffect } from 'react';
import { Moon, Sun, Save, Eye, EyeOff, Trash2, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { AwardsForm } from './forms/AwardsForm';
import { PublicationsForm } from './forms/PublicationsForm';
import { VolunteerForm } from './forms/VolunteerForm';
import { ReferencesForm } from './forms/ReferencesForm';
import { CustomSectionForm } from './forms/CustomSectionForm';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from './TemplateSelector';
import { ColorCustomizer } from './ColorCustomizer';
import { SectionManager } from './SectionManager';
import { ColorTheme, ResumeData, SectionVisibility } from '../types/resume';
import { useToast } from '@/hooks/use-toast';
import { ImportResumeDialog } from './ImportResumeDialog';
import { ExportDropdown } from './ExportDropdown';
import { sampleResumeData, getEmptyResumeData } from '../utils/sampleData';

export const ResumeBuilder = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'professional' | 'modern' | 'minimal' | 'ats'>('professional');
  const [colorTheme, setColorTheme] = useState<ColorTheme>({
    primary: '#2563eb',
    accent: '#3b82f6',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    borderStyle: 'thin',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    fontFamily: 'Inter',
    fontSize: 'medium',
    headingSize: 'medium',
    lineHeight: 'normal',
    sectionDivider: 'none',
    headerUnderline: true,
  });

  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData());
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with empty data to ensure all new fields exist
        setResumeData({
          ...getEmptyResumeData(),
          ...parsed,
          personalInfo: {
            ...getEmptyResumeData().personalInfo,
            ...parsed.personalInfo,
          },
          sectionVisibility: {
            ...getEmptyResumeData().sectionVisibility,
            ...parsed.sectionVisibility,
          },
          sectionOrder: parsed.sectionOrder || getEmptyResumeData().sectionOrder,
        });
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

  const handleImportResume = (importedData: Partial<ResumeData>) => {
    const mergedData = {
      ...getEmptyResumeData(),
      ...resumeData,
      ...importedData,
      personalInfo: {
        ...getEmptyResumeData().personalInfo,
        ...resumeData.personalInfo,
        ...importedData.personalInfo,
      },
    };
    setResumeData(mergedData as ResumeData);
    localStorage.setItem('resumeData', JSON.stringify(mergedData));
  };

  const handleClearAll = () => {
    setResumeData(getEmptyResumeData());
    localStorage.removeItem('resumeData');
    setShowClearDialog(false);
    
    toast({
      title: "Resume Cleared",
      description: "All data has been cleared successfully!"
    });
  };

  const handleLoadSampleData = () => {
    setResumeData(sampleResumeData);
    localStorage.setItem('resumeData', JSON.stringify(sampleResumeData));
    toast({
      title: "Sample Data Loaded",
      description: "Sample resume data has been loaded. Feel free to edit!"
    });
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleVisibilityChange = (visibility: SectionVisibility) => {
    setResumeData(prev => ({
      ...prev,
      sectionVisibility: visibility
    }));
  };

  const handleOrderChange = (order: string[]) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: order
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
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

              {/* Sample Data Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadSampleData}
                className="hidden sm:inline-flex transition-all duration-200 hover:scale-105"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Sample
              </Button>
              
              {/* Template & Color Customizer */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hidden sm:inline-flex transition-all duration-200 hover:scale-105"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Customize Resume</SheetTitle>
                    <SheetDescription>
                      Choose a template, customize colors, fonts, and manage sections
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <Tabs defaultValue="template" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="template">Template</TabsTrigger>
                        <TabsTrigger value="style">Style</TabsTrigger>
                        <TabsTrigger value="sections">Sections</TabsTrigger>
                      </TabsList>
                      <TabsContent value="template" className="mt-4">
                        <TemplateSelector 
                          selectedTemplate={selectedTemplate}
                          onSelectTemplate={setSelectedTemplate}
                        />
                      </TabsContent>
                      <TabsContent value="style" className="mt-4">
                        <ColorCustomizer 
                          theme={colorTheme}
                          onThemeChange={setColorTheme}
                        />
                      </TabsContent>
                      <TabsContent value="sections" className="mt-4">
                        <SectionManager
                          visibility={resumeData.sectionVisibility}
                          sectionOrder={resumeData.sectionOrder}
                          onVisibilityChange={handleVisibilityChange}
                          onOrderChange={handleOrderChange}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Import Resume */}
              <ImportResumeDialog onImport={handleImportResume} />
              
              {/* Export Dropdown */}
              <ExportDropdown data={resumeData} />
              
              {/* Save Draft */}
              <Button onClick={handleSave} className="transition-all duration-200 hover:scale-105">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              {/* Clear All */}
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setShowClearDialog(true)}
                className="transition-all duration-200 hover:scale-105"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
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

            {resumeData.sectionVisibility.summary && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <SummaryForm data={resumeData.summary} onChange={data => updateResumeData('summary', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.experience && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <ExperienceForm data={resumeData.experience} onChange={data => updateResumeData('experience', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.education && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <EducationForm data={resumeData.education} onChange={data => updateResumeData('education', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.skills && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <SkillsForm data={resumeData.skills} onChange={data => updateResumeData('skills', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.projects && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <ProjectsForm data={resumeData.projects} onChange={data => updateResumeData('projects', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.certifications && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <CertificationsForm data={resumeData.certifications} onChange={data => updateResumeData('certifications', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.awards && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <AwardsForm data={resumeData.awards} onChange={data => updateResumeData('awards', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.publications && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <PublicationsForm data={resumeData.publications} onChange={data => updateResumeData('publications', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.volunteer && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <VolunteerForm data={resumeData.volunteer} onChange={data => updateResumeData('volunteer', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.languages && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <LanguagesForm data={resumeData.languages} onChange={data => updateResumeData('languages', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.interests && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <InterestsForm data={resumeData.interests} onChange={data => updateResumeData('interests', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.references && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <ReferencesForm data={resumeData.references} onChange={data => updateResumeData('references', data)} />
              </Card>
            )}

            {resumeData.sectionVisibility.customSections && (
              <Card className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
                <CustomSectionForm data={resumeData.customSections} onChange={data => updateResumeData('customSections', data)} />
              </Card>
            )}
          </div>

          {/* Preview Section */}
          <div className={`sticky top-24 ${!showPreview ? 'block' : 'hidden'} lg:block animate-slide-in-right`}>
            <ResumePreview data={resumeData} template={selectedTemplate} theme={colorTheme} />
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
    </div>
  );
};
