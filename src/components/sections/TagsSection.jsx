import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const TagsSection = ({ items, onChange }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !items.includes(newTag.trim())) {
      onChange([...items, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(items.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {items.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1 border border-blue-200"
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-blue-900">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          placeholder="Añadir habilidad..."
          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button 
          onClick={addTag}
          className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default TagsSection;
