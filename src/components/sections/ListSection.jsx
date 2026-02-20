import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const ListSection = ({ items, onChange }) => {
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...items, newItem]);
  };

  const removeItem = (id) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const moveItem = (index, direction) => {
    const newItems = [...items];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < items.length) {
      [newItems[index], newItems[newIndex]] = [
        newItems[newIndex],
        newItems[index],
      ];
      onChange(newItems);
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative px-4 pb-4 pt-10 border border-slate-100 rounded-lg bg-slate-50 space-y-3 shadow-sm">
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <button
              onClick={() => moveItem(index, -1)}
              disabled={index === 0}
              className="p-1 text-slate-400 hover:bg-slate-200 rounded transition-colors disabled:opacity-30 hover:text-slate-600"
              title="Subir">
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => moveItem(index, 1)}
              disabled={index === items.length - 1}
              className="p-1 text-slate-400 hover:bg-slate-200 rounded transition-colors disabled:opacity-30 hover:text-slate-600"
              title="Bajar">
              <ChevronDown size={16} />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-slate-400 hover:bg-red-100 hover:text-red-500 rounded transition-colors"
              title="Eliminar">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <input
                placeholder="Empresa / Institución"
                value={item.company}
                onChange={(e) => updateItem(item.id, "company", e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div className="col-span-2">
              <input
                placeholder="Cargo / Título"
                value={item.position}
                onChange={(e) =>
                  updateItem(item.id, "position", e.target.value)
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800"
              />
            </div>
            <div className="col-span-2">
              <input
                placeholder="Ciudad / Ubicación"
                value={item.location}
                onChange={(e) =>
                  updateItem(item.id, "location", e.target.value)
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <input
                placeholder="Fecha Inicio"
                value={item.startDate}
                onChange={(e) =>
                  updateItem(item.id, "startDate", e.target.value)
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <input
                placeholder="Fecha Fin / Actual"
                value={item.endDate}
                onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div className="col-span-2">
              <textarea
                placeholder="Descripción / Logros"
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, "description", e.target.value)
                }
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px] text-slate-800"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 text-sm font-medium transition-colors">
        <Plus size={16} />
        Añadir Elemento
      </button>
    </div>
  );
};

export default ListSection;
