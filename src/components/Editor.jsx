import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SectionManager from './SectionManager';

const Editor = ({ data, onUpdatePersonalInfo, onUpdateSections }) => {
  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto space-y-8 sm:space-y-10">
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Información Personal
        </h2>
        <PersonalInfoForm 
          info={data.personalInfo} 
          onChange={onUpdatePersonalInfo} 
        />
      </section>

      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Secciones del CV
        </h2>
        <SectionManager 
          sections={data.sections} 
          onUpdate={onUpdateSections} 
        />
      </section>
    </div>
  );
};

export default Editor;
