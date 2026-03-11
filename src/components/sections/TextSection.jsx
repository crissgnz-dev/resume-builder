import React from 'react';

const TextSection = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escribe aquí el contenido de la sección..."
      className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 resize-y hover:bg-white"
    />
  );
};

export default TextSection;
