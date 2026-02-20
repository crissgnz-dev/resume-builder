import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SectionManager from './SectionManager';

const Editor = ({ data, onUpdatePersonalInfo, onUpdateSections }) => {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Información Personal
        </h2>
        <PersonalInfoForm 
          info={data.personalInfo} 
          onChange={onUpdatePersonalInfo} 
        />
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
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
