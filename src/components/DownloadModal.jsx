import React, { useState, useEffect } from 'react';
import { X, FileText, Download, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadModal = ({ isOpen, onClose, onConfirm, defaultFilename }) => {
  const [filename, setFilename] = useState(defaultFilename);

  useEffect(() => {
    setFilename(defaultFilename);
  }, [defaultFilename]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Exportar PDF</h2>
                  <p className="text-sm text-slate-500">Configura tu descarga</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del archivo</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="ej: Juan_Perez_CV"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12 text-slate-800 font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">.pdf</span>
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-3">
                  <div className="text-blue-600 mt-0.5">
                    <CheckCircle size={18} />
                  </div>
                  <div className="text-sm text-blue-800 leading-relaxed">
                    Tu CV se generará en formato **A4 profesional** y se descargará directamente en tu navegador.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => onConfirm(filename)}
                className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Confirmar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DownloadModal;
