import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileJson, FileCode, Loader2 } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { exportToPDF } from '../utils/pdfExport';
import { exportToDocx, exportToTxt, exportToHtml } from '../utils/exportFormats';
import { useToast } from '@/hooks/use-toast';

interface ExportDropdownProps {
  data: ResumeData;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({ data }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'docx' | 'txt' | 'html' | 'json') => {
    setIsExporting(true);
    try {
      switch (format) {
        case 'pdf':
          await exportToPDF(data);
          toast({ title: "PDF Downloaded", description: "Your resume has been exported as PDF!" });
          break;
        case 'docx':
          await exportToDocx(data);
          toast({ title: "DOCX Downloaded", description: "Your resume has been exported as Word document!" });
          break;
        case 'txt':
          exportToTxt(data);
          toast({ title: "TXT Downloaded", description: "Your resume has been exported as plain text!" });
          break;
        case 'html':
          exportToHtml(data);
          toast({ title: "HTML Downloaded", description: "Your resume has been exported as HTML!" });
          break;
        case 'json':
          const dataStr = JSON.stringify(data, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `resume-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast({ title: "JSON Downloaded", description: "Your resume data has been exported!" });
          break;
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" disabled={isExporting} className="transition-all duration-200 hover:scale-105">
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span>PDF Document</span>
            <span className="text-xs text-muted-foreground">Best for printing & sharing</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleExport('docx')} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2 text-blue-600" />
          <div className="flex flex-col">
            <span>Word Document (.docx)</span>
            <span className="text-xs text-muted-foreground">Editable in Microsoft Word</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleExport('html')} className="cursor-pointer">
          <FileCode className="h-4 w-4 mr-2 text-orange-600" />
          <div className="flex flex-col">
            <span>HTML File</span>
            <span className="text-xs text-muted-foreground">Standalone web page</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleExport('txt')} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2 text-gray-600" />
          <div className="flex flex-col">
            <span>Plain Text (.txt)</span>
            <span className="text-xs text-muted-foreground">ATS-friendly format</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleExport('json')} className="cursor-pointer">
          <FileJson className="h-4 w-4 mr-2 text-green-600" />
          <div className="flex flex-col">
            <span>JSON Data</span>
            <span className="text-xs text-muted-foreground">Backup & transfer</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
