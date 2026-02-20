import React from 'react';

const TextSection = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escribe aquí el contenido de la sección..."
      className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 resize-y"
    />
  );
};

export default TextSection;
