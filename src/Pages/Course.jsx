import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { materials } from '../data/materials';

const StudyHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...new Set(materials.map(m => m.category))];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || material.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleMaterialClick = (materialId) => {
    navigate(`/course/${materialId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 text-center pt-30">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
          SkillHub Academy
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mt-2">
          Master new skills with our comprehensive courses
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredMaterials.map(material => (
          <div 
            key={material.id}
            className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer hover:scale-[1.02]"
            onClick={() => handleMaterialClick(material.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">{material.title}</h3>
              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                {material.category}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{material.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {material.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>By {material.instructor}</span>
              <span>{material.duration}</span>
            </div>
            <div className="mt-3 text-xs text-blue-300">
              Level: {material.level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyHub;