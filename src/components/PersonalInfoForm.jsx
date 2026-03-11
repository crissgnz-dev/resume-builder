import React from 'react';

const PersonalInfoForm = ({ info, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...info, [name]: value });
  };

  const fields = [
    { name: 'name', label: 'Nombre Completo', type: 'text' },
    { name: 'title', label: 'Título Profesional', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Teléfono', type: 'tel' },
    { name: 'location', label: 'Ubicación', type: 'text' },
    { name: 'website', label: 'Sitio Web / LinkedIn', type: 'text' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {fields.map((field) => (
        <div key={field.name} className={field.name === 'name' || field.name === 'title' ? 'col-span-1 sm:col-span-2' : ''}>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={info[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 hover:bg-white"
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoForm;
