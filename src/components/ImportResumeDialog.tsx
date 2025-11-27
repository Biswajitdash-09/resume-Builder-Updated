import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, FileJson, Loader2 } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { parseTextResume, parsePdfResume, parseDocxResume, validateResumeData } from '../utils/resumeParser';
import { useToast } from '@/hooks/use-toast';

interface ImportResumeDialogProps {
  onImport: (data: Partial<ResumeData>) => void;
}

export const ImportResumeDialog: React.FC<ImportResumeDialogProps> = ({ onImport }) => {
  const [open, setOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    try {
      const fileName = file.name.toLowerCase();
      
      if (fileName.endsWith('.json')) {
        const content = await file.text();
        const data = JSON.parse(content);
        if (validateResumeData(data)) {
          onImport(data);
          toast({ title: "Success", description: "Resume imported from JSON!" });
          setOpen(false);
        } else {
          throw new Error('Invalid resume data structure');
        }
      } else if (fileName.endsWith('.txt')) {
        const content = await file.text();
        const parsed = parseTextResume(content);
        onImport(parsed);
        toast({ title: "Success", description: "Resume imported from text file!" });
        setOpen(false);
      } else if (fileName.endsWith('.pdf')) {
        const parsed = await parsePdfResume(file);
        onImport(parsed);
        toast({ 
          title: "PDF Imported", 
          description: "Resume data extracted from PDF. Please review and complete any missing fields." 
        });
        setOpen(false);
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        const parsed = await parseDocxResume(file);
        onImport(parsed);
        toast({ 
          title: "DOCX Imported", 
          description: "Resume data extracted from Word document. Please review and complete any missing fields." 
        });
        setOpen(false);
      } else {
        toast({
          title: "Unsupported Format",
          description: "Please upload a PDF, DOCX, JSON, or TXT file.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Failed",
        description: "Could not parse the file. Please check the format and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePasteImport = () => {
    if (!textContent.trim()) {
      toast({
        title: "Empty Content",
        description: "Please paste your resume content first.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Try parsing as JSON first
      const data = JSON.parse(textContent);
      if (validateResumeData(data)) {
        onImport(data);
        toast({ title: "Success", description: "Resume imported from JSON!" });
        setOpen(false);
        setTextContent('');
        return;
      }
    } catch {
      // If not JSON, parse as text
      const parsed = parseTextResume(textContent);
      onImport(parsed);
      toast({ 
        title: "Partial Import", 
        description: "Resume data extracted. Please review and complete missing fields." 
      });
      setOpen(false);
      setTextContent('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
          <DialogDescription>
            Import your resume from PDF, Word, JSON, text file, or paste content directly
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">
              <FileJson className="h-4 w-4 mr-2" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="paste">
              <FileText className="h-4 w-4 mr-2" />
              Paste Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.json,.txt"
                onChange={handleFileImport}
                className="hidden"
                disabled={isLoading}
              />
              {isLoading ? (
                <>
                  <Loader2 className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Parsing your resume...
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: PDF, DOCX, JSON, TXT
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Choose File
                  </Button>
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• <strong>PDF</strong>: Extract text from PDF resumes</p>
              <p>• <strong>DOCX</strong>: Import from Microsoft Word documents</p>
              <p>• <strong>JSON</strong>: Full resume data structure (from previous exports)</p>
              <p>• <strong>TXT</strong>: Plain text resume (will parse sections automatically)</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">💡 Tips for better parsing:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear section headers (Experience, Education, Skills)</li>
                <li>Include contact information at the top</li>
                <li>Format dates consistently (e.g., Jan 2020 - Present)</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <Textarea
              placeholder="Paste your resume content here...&#10;&#10;Example:&#10;John Doe&#10;john@example.com | (555) 123-4567&#10;linkedin.com/in/johndoe&#10;&#10;Summary&#10;Experienced software developer...&#10;&#10;Experience&#10;Senior Developer - Tech Corp&#10;..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <Button onClick={handlePasteImport} className="w-full">
              Import from Pasted Content
            </Button>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Include clear section headers like "Experience", "Education", "Skills" for better parsing
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};