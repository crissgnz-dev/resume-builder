import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ListSection = ({ items, onChange }) => {
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange([...items, newItem]);
  };

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50 space-y-3 shadow-sm">
          <button 
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <input
                placeholder="Empresa / Institución"
                value={item.company}
                onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div className="col-span-2">
              <input
                placeholder="Cargo / Título"
                value={item.position}
                onChange={(e) => updateItem(item.id, 'position', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800"
              />
            </div>
            <div>
              <input
                placeholder="Fecha Inicio"
                value={item.startDate}
                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <input
                placeholder="Fecha Fin / Actual"
                value={item.endDate}
                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div className="col-span-2">
              <textarea
                placeholder="Descripción / Logros"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px] text-slate-800"
              />
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={addItem}
        className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Añadir Elemento
      </button>
    </div>
  );
};

export default ListSection;
