import React from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical } from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';
import ListSection from './sections/ListSection';
import TextSection from './sections/TextSection';
import TagsSection from './sections/TagsSection';

const SectionItem = ({ section, index, onUpdate, onDelete, onMove, isFirst, isLast }) => {
  const dragControls = useDragControls();

  const handleUpdate = (data) => {
    onUpdate(section.id, data);
  };

  return (
    <Reorder.Item 
      value={section}
      dragListener={false}
      dragControls={dragControls}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-200 rounded"
          >
            <GripVertical className="text-slate-400" size={18} />
          </div>
          <input 
            value={section.title}
            onChange={(e) => handleUpdate({ title: e.target.value })}
            className="bg-transparent font-semibold text-slate-700 outline-none border-b border-transparent hover:border-slate-300 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onMove(index, -1)}
            disabled={isFirst}
            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30"
          >
            <ChevronUp size={18} />
          </button>
          <button 
            onClick={() => onMove(index, 1)}
            disabled={isLast}
            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30"
          >
            <ChevronDown size={18} />
          </button>
          <button 
            onClick={() => onDelete(section.id)}
            className="p-1 hover:bg-red-100 rounded text-red-500 ml-2"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {section.type === 'text' && (
          <TextSection 
            content={section.content} 
            onChange={(content) => handleUpdate({ content })} 
          />
        )}
        {section.type === 'list' && (
          <ListSection 
            items={section.items} 
            onChange={(items) => handleUpdate({ items })} 
          />
        )}
        {section.type === 'tags' && (
          <TagsSection 
            items={section.items} 
            onChange={(items) => handleUpdate({ items })} 
          />
        )}
      </div>
    </Reorder.Item>
  );
};

const SectionManager = ({ sections, onUpdate }) => {
  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      onUpdate(newSections);
    }
  };

  const deleteSection = (id) => {
    onUpdate(sections.filter(s => s.id !== id));
  };

  const addSection = (type) => {
    const id = `${type}-${Date.now()}`;
    const newSection = {
      id,
      type,
      title: type === 'text' ? 'Nueva Sección' : (type === 'list' ? 'Nueva Experiencia/Educación' : 'Nuevas Habilidades'),
      ...(type === 'text' ? { content: '' } : { items: [] })
    };
    onUpdate([...sections, newSection]);
  };

  const updateSection = (id, data) => {
    onUpdate(sections.map(s => s.id === id ? { ...s, ...data } : s));
  };

  return (
    <div className="space-y-6">
      <Reorder.Group axis="y" values={sections} onReorder={onUpdate} className="space-y-6">
        {sections.map((section, index) => (
          <SectionItem 
            key={section.id} 
            section={section} 
            index={index}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onMove={moveSection}
            isFirst={index === 0}
            isLast={index === sections.length - 1}
          />
        ))}
      </Reorder.Group>

      <div className="flex flex-wrap gap-3 pt-4">
        {/* Buttons remain same */}
        <button 
          onClick={() => addSection('text')}
          className="flex-1 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} />
          Texto Libre
        </button>
        <button 
          onClick={() => addSection('list')}
          className="flex-1 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} />
          Lista (Exp/Edu)
        </button>
        <button 
          onClick={() => addSection('tags')}
          className="flex-1 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} />
          Habilidades
        </button>
      </div>
    </div>
  );
};

export default SectionManager;
