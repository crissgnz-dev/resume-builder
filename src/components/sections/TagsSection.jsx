import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Reorder } from "framer-motion";

const TagsSection = ({ items, onChange }) => {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !items.includes(newTag.trim())) {
      onChange([...items, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(items.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={onChange}
        className="flex flex-wrap gap-2">
        {items.map((tag) => (
          <Reorder.Item
            key={tag}
            value={tag}
            drag
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileDrag={{ scale: 1.05, zIndex: 10 }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1 border border-blue-200 cursor-grab active:cursor-grabbing relative">
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-blue-900 pointer-events-auto">
              <X size={14} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className="flex gap-3 mt-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Añadir habilidad..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all duration-300 hover:bg-white"
        />
        <button
          onClick={addTag}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-500/20 font-medium flex items-center gap-1 hover:-translate-y-0.5"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default TagsSection;
