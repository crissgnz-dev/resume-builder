import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialData } from './data/initialData';
import { useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DownloadModal from './components/DownloadModal';
import { Download, LayoutPanelLeft } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useLocalStorage('resume-data', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdatePersonalInfo = (info) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
  };

  const handleUpdateSections = (sections) => {
    setResumeData(prev => ({ ...prev, sections }));
  };

  const getInitialFilename = () => {
    return `${resumeData.personalInfo.name.trim().replace(/\s+/g, '_')}_CV`;
  };

  const handleDownloadConfirm = async (customFilename) => {
    setIsModalOpen(false);
    const element = document.getElementById('cv-preview');
    if (!element) return;

    try {
      const { toPng } = await import('html-to-image');
      const { default: jsPDF } = await import('jspdf');

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Ensure .pdf extension
      let finalFilename = customFilename.trim();
      if (!finalFilename.toLowerCase().endsWith('.pdf')) {
        finalFilename += '.pdf';
      }
        
      pdf.save(finalFilename);
      console.log('PDF guardado como:', finalFilename);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Hubo un error al generar el PDF.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 no-print">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <LayoutPanelLeft size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">CV Generator by <span className="text-blue-600">crissgnz-dev</span></h1>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-blue-100 font-medium"
        >
          <Download size={18} />
          Descargar PDF
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor (Left Column) */}
        <aside className="w-1/2 overflow-y-auto border-r border-slate-200 bg-white no-print">
          <Editor 
            data={resumeData} 
            onUpdatePersonalInfo={handleUpdatePersonalInfo}
            onUpdateSections={handleUpdateSections}
          />
        </aside>

        {/* Preview (Right Column) */}
        <section className="w-1/2 overflow-y-auto bg-slate-100 p-8 flex justify-center">
          <Preview data={resumeData} />
        </section>
      </main>

      <DownloadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDownloadConfirm}
        defaultFilename={getInitialFilename()}
      />
    </div>
  );
}

export default App;
