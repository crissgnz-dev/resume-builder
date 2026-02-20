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
    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
      {fields.map((field) => (
        <div key={field.name} className={field.name === 'name' || field.name === 'title' ? 'col-span-2' : ''}>
          <label className="block text-sm font-medium text-slate-600 mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={info[field.name]}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800"
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoForm;
