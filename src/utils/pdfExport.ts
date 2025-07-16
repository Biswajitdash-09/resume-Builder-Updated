
import html2pdf from 'html2pdf.js';
import { ResumeData } from '../types/resume';

export const exportToPDF = async (data: ResumeData) => {
  const element = document.querySelector('.resume-preview') as HTMLElement;
  
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  const opt = {
    margin: 0.5,
    filename: `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' 
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
