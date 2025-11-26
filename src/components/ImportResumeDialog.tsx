import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, FileJson } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { parseTextResume, validateResumeData } from '../utils/resumeParser';
import { useToast } from '@/hooks/use-toast';

interface ImportResumeDialogProps {
  onImport: (data: Partial<ResumeData>) => void;
}

export const ImportResumeDialog: React.FC<ImportResumeDialogProps> = ({ onImport }) => {
  const [open, setOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content);
          if (validateResumeData(data)) {
            onImport(data);
            toast({ title: "Success", description: "Resume imported from JSON!" });
            setOpen(false);
          } else {
            throw new Error('Invalid resume data structure');
          }
        } else if (file.name.endsWith('.txt')) {
          const parsed = parseTextResume(content);
          onImport(parsed);
          toast({ title: "Success", description: "Resume imported from text file!" });
          setOpen(false);
        }
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Could not parse the file. Please check the format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
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
            Import your resume from JSON, text file, or paste your resume content
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
                accept=".json,.txt"
                onChange={handleFileImport}
                className="hidden"
              />
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Supported formats: JSON, TXT
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• <strong>JSON</strong>: Full resume data structure (from previous exports)</p>
              <p>• <strong>TXT</strong>: Plain text resume (will attempt to parse sections)</p>
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
