import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialData } from "./data/initialData";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import DownloadModal from "./components/DownloadModal";
import CVDocument from "./components/CVDocument";
import { pdf } from "@react-pdf/renderer";
import {
  Download,
  LayoutPanelLeft,
  FileEdit,
  Eye,
  AlertCircle,
  Upload,
  Save,
} from "lucide-react";

function App() {
  const [resumeData, setResumeData] = useLocalStorage(
    "resume-data",
    initialData,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [hasOverflow, setHasOverflow] = useState(false);

  const handleUpdatePersonalInfo = (info) => {
    setResumeData((prev) => ({ ...prev, personalInfo: info }));
  };

  const handleUpdateSections = (sections) => {
    setResumeData((prev) => ({ ...prev, sections }));
  };

  const getInitialFilename = () => {
    return `${resumeData.personalInfo.name.trim().replace(/\s+/g, "_")}_CV`;
  };

  const handleDownloadConfirm = async (customFilename) => {
    setIsModalOpen(false);

    try {
      // Generate Selectable PDF using react-pdf
      const doc = <CVDocument data={resumeData} />;
      const blob = await pdf(doc).toBlob();

      // Ensure .pdf extension
      let finalFilename = customFilename.trim();
      if (!finalFilename.toLowerCase().endsWith(".pdf")) {
        finalFilename += ".pdf";
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("PDF (Selectable) descargado como:", finalFilename);
    } catch (error) {
      console.error("Error al generar PDF seleccionable:", error);
      alert("Hubo un error al generar el PDF.");
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.personalInfo && json.sections) {
          setResumeData(json);
          alert("Datos importados correctamente.");
        } else {
          alert("Formato de archivo no válido.");
        }
      } catch (err) {
        console.error("Error al importar JSON:", err);
        alert("Error al leer el archivo JSON.");
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = "";
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col h-screen relative">
      {hasOverflow && (
        <div className="fixed top-36 lg:top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-2xl z-[99] animate-pulse no-print whitespace-nowrap border border-red-400">
          <AlertCircle size={20} className="shrink-0 hidden sm:block" />
          <AlertCircle size={16} className="shrink-0 sm:hidden" />
          <span>¡OJO! El contenido supera una página.</span>
        </div>
      )}
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 sticky top-0 z-20 no-print">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <LayoutPanelLeft size={20} />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800">
            CV Generator by <span className="text-blue-600">crissgnz-dev</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <input
            type="file"
            id="import-json"
            className="hidden"
            accept=".json"
            onChange={handleImportData}
          />
          <button
            onClick={() => document.getElementById("import-json").click()}
            className="flex-1 sm:flex-none border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm">
            <Upload size={16} />
            Importar JSON
          </button>
          <button
            onClick={handleExportData}
            className="flex-1 sm:flex-none border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm">
            <Save size={16} />
            Exportar JSON
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-100 font-medium text-sm">
            <Download size={18} />
            Descargar PDF
          </button>
        </div>
      </header>

      {/* Tab Navigation for Mobile */}
      <div className="flex lg:hidden bg-white border-b border-slate-200 p-3 shadow-sm z-10 sticky top-0">
        <div className="flex w-full bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
              activeTab === "editor"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-700"
            }`}>
            <FileEdit size={16} />
            Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
              activeTab === "preview"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-700"
            }`}>
            <Eye size={16} />
            Vista Previa
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Editor (Left Column) */}
        <aside
          className={`absolute inset-0 lg:static lg:w-1/2 overflow-y-auto border-r border-slate-200 bg-white no-print transition-transform duration-300 z-10 w-full ${activeTab === "editor" ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <Editor
            data={resumeData}
            onUpdatePersonalInfo={handleUpdatePersonalInfo}
            onUpdateSections={handleUpdateSections}
          />
        </aside>

        {/* Preview (Right Column) */}
        <section
          className={`absolute inset-0 lg:static lg:w-1/2 overflow-y-auto overflow-x-hidden bg-slate-100 p-4 lg:p-8 flex justify-center transition-transform duration-300 z-0 w-full ${activeTab === "preview" ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
          <div className="w-full flex justify-center h-max">
            <Preview data={resumeData} onOverflowChange={setHasOverflow} />
          </div>
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
