import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBookmark, FiClock, FiUser, FiBarChart2, FiStar, FiPlay } from 'react-icons/fi';
import { materials } from '../data/materials';

const StudyHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Popular');
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedCourses')) || [];
    setBookmarkedCourses(savedBookmarks);
    setIsLoading(false);
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarkedCourses));
    }
  }, [bookmarkedCourses, isLoading]);

  const categories = ['All', ...new Set(materials.map((m) => m.category))];
  const sortOptions = ['Popular', 'Newest', 'Highest Rated', 'Shortest'];

  const toggleBookmark = (courseId, e) => {
    e.stopPropagation();
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

  const filteredMaterials = materials
    .filter((material) => {
      const matchesSearch =
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        material.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || material.category === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'Newest':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'Highest Rated':
          return b.rating - a.rating;
        case 'Shortest':
          // Convert duration to weeks for comparison
          const getWeeks = (duration) => parseInt(duration.split(' ')[0]);
          return getWeeks(a.duration) - getWeeks(b.duration);
        default:
          return b.students - a.students; // Popular
      }
    });

  const handleMaterialClick = (materialId) => {
    navigate(`/course/${materialId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 pt-20 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8 pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center pt-20">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-4">
          StudyHub Academy
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Expand your knowledge with our expertly crafted courses
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics, or instructors..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="flex-1 p-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="flex-1 p-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  Sort: {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {activeFilter === 'All' ? 'All Courses' : activeFilter} 
            <span className="text-gray-400 text-lg ml-2">({filteredMaterials.length})</span>
          </h2>
          <div className="text-gray-400 flex items-center">
            <FiBookmark className="mr-1" />
            <span>{bookmarkedCourses.length} bookmarked</span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer relative"
              onClick={() => handleMaterialClick(material.id)}
            >
              {/* Bookmark Button */}
              <button
                onClick={(e) => toggleBookmark(material.id, e)}
                className={`absolute top-4 right-4 p-2 rounded-full transition ${
                  bookmarkedCourses.includes(material.id)
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                }`}
                aria-label="Bookmark course"
              >
                <FiBookmark className={`${bookmarkedCourses.includes(material.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Course Image */}
              <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden relative">
                <img 
                  src={material.thumbnail} 
                  alt={material.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <FiPlay className="text-white" />
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                    {material.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{material.title}</h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{material.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {material.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
                {material.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
                    +{material.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Metadata */}
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center">
                  <img 
                    src={material.instructor.avatar} 
                    alt={material.instructor.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{material.instructor.name}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  <span>{material.duration}</span>
                </div>
              </div>

              {/* Rating and Level */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center text-sm">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span>{material.rating}</span>
                  <span className="text-gray-500 mx-1">•</span>
                  <span>{material.students}+ students</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  material.level === 'Beginner' ? 'bg-green-900/50 text-green-300' :
                  material.level === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-red-900/50 text-red-300'
                }`}>
                  {material.level}
                </span>
              </div>

              {/* Lessons Count */}
              <div className="flex items-center text-sm text-gray-400 mt-3">
                <FiPlay className="mr-1" />
                <span>{material.lessons.length} lessons</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-12">
          <FiSearch className="mx-auto text-4xl text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
            className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyHub;