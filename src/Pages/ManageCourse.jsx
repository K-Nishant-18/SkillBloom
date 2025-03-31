import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaUsers, FaClock, FaPlayCircle, FaFileAlt, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { Button } from "../components/ui/Button";

const CourseManagement = () => {
  // State definitions (unchanged from original)
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [courseForm, setCourseForm] = useState({
    title: '', category: '', description: '', tags: [], level: 'Beginner', duration: '', thumbnail: '',
    instructor: { name: '', bio: '', avatar: '' }
  });

  const categories = ['Mathematics', 'Science', 'History', 'Literature', 'Business', 'Computer Science'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const allTags = ['fundamentals', 'advanced', 'lab', 'theory', 'practical'];

  // Sample data (unchanged)
  const sampleCourses = [
    {
      id: 6,
      title: "Introduction to Psychology",
      category: "Psychology",
      description: "Explore the scientific study of behavior and mental processes.",
      tags: ["psychology", "mind", "behavior", "science"],
      instructor: {
        name: "Dr. Emily Watson",
        bio: "Clinical psychologist and researcher",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      duration: "6 weeks",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      students: 1432,
      lastUpdated: "2023-05-10",
      lessons: [
        { 
          id: 1,
          title: "History of Psychology", 
          duration: "45 min", 
          videoUrl: "https://example.com/video17",
          description: "Major schools of thought",
          preview: true
        },
        { 
          id: 2,
          title: "Cognitive Processes", 
          duration: "50 min", 
          videoUrl: "https://example.com/video18",
          description: "Memory, attention and problem solving"
        },
        { 
          id: 3,
          title: "Social Psychology", 
          duration: "55 min", 
          videoUrl: "https://example.com/video19",
          description: "How people influence each other"
        }
      ],
      resources: [
        { 
          id: 1,
          title: "Key Theories Summary", 
          type: "PDF", 
          url: "#",
          size: "2.9 MB"
        },
        { 
          id: 2,
          title: "Experiment Examples", 
          type: "PDF", 
          url: "#",
          size: "3.5 MB"
        }
      ],
      relatedCourses: [
        {
          id: 8,
          title: "Abnormal Psychology",
          instructor: "Dr. Carl Rogers",
          duration: "7 weeks",
          thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      ]
    },
    {
      id: 1,
      title: "Introduction to Calculus",
      category: "Mathematics",
      description: "Master fundamental calculus concepts with practical examples and real-world applications.",
      tags: ["calculus", "math", "derivatives", "integration"],
      instructor: {
        name: "Dr. Sarah Johnson",
        bio: "Professor of Mathematics with 15 years teaching experience",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      duration: "6 weeks",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      students: 1245,
      lastUpdated: "2023-05-15",
      lessons: [
        { id: 1, title: "Limits and Continuity", duration: "45 min", videoUrl: "https://example.com/video1", description: "Understanding the fundamental concept of limits in calculus", preview: true },
        { id: 2, title: "Derivatives", duration: "1 hour", videoUrl: "https://example.com/video2", description: "Learn how to calculate derivatives and their rules" }
      ],
      resources: [
        { id: 1, title: "Calculus Cheat Sheet", type: "PDF", url: "#", size: "2.4 MB" }
      ],
      relatedCourses: [
        { id: 2, title: "Advanced Calculus", instructor: "Dr. Michael Chen", duration: "8 weeks", thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }
      ]
    },
    {
      id: 8,
      title: "Creative Writing Workshop",
      category: "Literature",
      description: "Develop your writing skills across fiction, poetry and creative non-fiction.",
      tags: ["writing", "creative", "literature", "arts"],
      instructor: {
        name: "Prof. Angela Carter",
        bio: "Published author and writing coach",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg"
      },
      duration: "6 weeks",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.9,
      students: 567,
      lastUpdated: "2023-03-22",
      lessons: [
        { 
          id: 1,
          title: "Character Development", 
          duration: "45 min", 
          videoUrl: "https://example.com/video23",
          description: "Creating believable characters",
          preview: true
        },
        { 
          id: 2,
          title: "Plot Structure", 
          duration: "50 min", 
          videoUrl: "https://example.com/video24",
          description: "Building narrative arcs"
        },
        { 
          id: 3,
          title: "Show vs Tell", 
          duration: "40 min", 
          videoUrl: "https://example.com/video25",
          description: "Effective descriptive techniques"
        }
      ],
      resources: [
        { 
          id: 1,
          title: "Writing Prompts", 
          type: "PDF", 
          url: "#",
          size: "1.2 MB"
        },
        { 
          id: 2,
          title: "Editing Checklist", 
          type: "PDF", 
          url: "#",
          size: "0.8 MB"
        }
      ],
      relatedCourses: [
        {
          id: 10,
          title: "Journalism Fundamentals",
          instructor: "Prof. Walter Cronkite",
          duration: "5 weeks",
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      ]
    },
  ];

  // Load courses (unchanged)
  useEffect(() => {
    setTimeout(() => {
      setCourses(sampleCourses);
      setFilteredCourses(sampleCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter courses (unchanged)
  useEffect(() => {
    let result = courses;
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (categoryFilter !== 'All') result = result.filter(course => course.category === categoryFilter);
    if (levelFilter !== 'All') result = result.filter(course => course.level === levelFilter);
    setFilteredCourses(result);
  }, [searchTerm, categoryFilter, levelFilter, courses]);

  // Event handlers (unchanged logic, styled differently)
  const handleInputChange = (e) => setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  const handleInstructorChange = (e) => setCourseForm({ ...courseForm, instructor: { ...courseForm.instructor, [e.target.name]: e.target.value } });
  const handleTagChange = (tag) => setCourseForm({
    ...courseForm,
    tags: courseForm.tags.includes(tag) ? courseForm.tags.filter(t => t !== tag) : [...courseForm.tags, tag]
  });
  const handleNewCourse = () => { setCourseForm({ title: '', category: '', description: '', tags: [], level: 'Beginner', duration: '', thumbnail: '', instructor: { name: '', bio: '', avatar: '' } }); setEditMode(false); setOpenDialog(true); };
  const handleEditCourse = (course) => { setCourseForm(course); setEditMode(true); setOpenDialog(true); };
  const handleViewCourse = (course) => { setSelectedCourse(course); setViewMode('detail'); };
  const handleBackToList = () => { setViewMode('grid'); setSelectedCourse(null); };
  const handleSubmit = () => {
    if (editMode) {
      setSnackbar({ open: true, message: 'Course updated successfully!', severity: 'success' });
    } else {
      const newCourse = { id: Math.max(...courses.map(c => c.id)) + 1, ...courseForm, rating: 0, students: 0, lastUpdated: new Date().toISOString().split('T')[0], lessons: [], resources: [], relatedCourses: [] };
      setCourses([...courses, newCourse]);
      setSnackbar({ open: true, message: 'Course created successfully!', severity: 'success' });
    }
    setOpenDialog(false);
  };
  const handleDeleteCourse = (id) => { setCourses(courses.filter(course => course.id !== id)); setSnackbar({ open: true, message: 'Course deleted successfully!', severity: 'success' }); };
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }, hover: { y: -10, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header */}
      <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {viewMode === 'detail' && (
            <button onClick={handleBackToList} className="text-gray-300 hover:text-cyan-400 flex items-center">
              <FaArrowLeft className="mr-2" /> Back
            </button>
          )}
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {viewMode === 'detail' ? selectedCourse?.title : 'Manage Courses'}
          </h1>
          {viewMode === 'grid' && (
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all"
              onClick={handleNewCourse}
            >
              <FaPlus className="mr-2" /> New Course
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {viewMode === 'grid' ? (
          <>
            {/* Filters */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-full bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-full bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-full bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="All">All Levels</option>
                  {levels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
            </div>

            {/* Courses List */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-10 w-10 text-cyan-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
                </svg>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 text-center">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">No courses found</h2>
                <p className="text-sm sm:text-base text-gray-300 mb-4">{courses.length === 0 ? 'You have not created any courses yet.' : 'Try adjusting your search or filters'}</p>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all"
                  onClick={handleNewCourse}
                >
                  <FaPlus className="mr-2" /> Create Your First Course
                </Button>
              </div>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" variants={containerVariants} initial="hidden" animate="visible">
                {filteredCourses.map(course => (
                  <motion.div
                    key={course.id}
                    variants={cardVariants}
                    className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
                    whileHover="hover"
                    onClick={() => handleViewCourse(course)}
                  >
                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2 py-1 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-full">{course.category}</span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">{course.rating || 'New'}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {course.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs sm:text-sm bg-purple-500/20 text-purple-300 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs sm:text-sm rounded-full ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-300' : 'bg-pink-500/20 text-pink-300'}`}>{course.level}</span>
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleEditCourse(course); }} className="text-gray-300 hover:text-cyan-400"><FaEdit /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-gray-300 hover:text-red-400"><FaTrash /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : selectedCourse && (
          <div>
            {/* Course Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="md:col-span-1">
                <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{selectedCourse.title}</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="px-2 py-1 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-full">{selectedCourse.category}</span>
                  <span className={`px-2 py-1 text-xs sm:text-sm rounded-full ${selectedCourse.level === 'Beginner' ? 'bg-green-500/20 text-green-300' : 'bg-pink-500/20 text-pink-300'}`}>{selectedCourse.level}</span>
                  <div className="flex items-center ml-auto">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm sm:text-base text-gray-300">{selectedCourse.rating} ({selectedCourse.students} learners)</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{selectedCourse.description}</p>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} className="w-12 sm:w-14 h-12 sm:h-14 rounded-full" />
                  <div>
                    <p className="text-sm text-gray-400">Instructor</p>
                    <p className="text-base sm:text-lg font-bold text-white">{selectedCourse.instructor.name}</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all" onClick={() => handleEditCourse(selectedCourse)}><FaEdit className="mr-2" /> Edit Course</Button>
                  <Button className="bg-transparent border-2 border-red-600 text-red-400 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-red-600/20 hover:border-red-400 transition-all" onClick={() => handleDeleteCourse(selectedCourse.id)}><FaTrash className="mr-2" /> Delete</Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-gray-700">
              {['Lessons', 'Resources', 'Details', 'Related Courses'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setTabValue(index)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-t-lg text-sm sm:text-base ${tabValue === index ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-cyan-500 transition-all`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {tabValue === 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Course Lessons ({selectedCourse.lessons.length})</h3>
                {selectedCourse.lessons.map(lesson => (
                  <details key={lesson.id} className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 mb-3 sm:mb-4">
                    <summary className="flex items-center cursor-pointer">
                      <FaPlayCircle className="text-cyan-400 mr-2 sm:mr-3" />
                      <span className="flex-1 text-sm sm:text-base text-white">{lesson.title}</span>
                      <span className="text-xs sm:text-sm text-gray-300">{lesson.duration}</span>
                      <FaChevronDown className="ml-2 sm:ml-3 text-gray-400" />
                    </summary>
                    <p className="text-sm sm:text-base text-gray-300 mt-2 sm:mt-3">{lesson.description}</p>
                    <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 sm:mt-3 text-sm sm:text-base text-cyan-400 hover:text-cyan-300">View Video</a>
                  </details>
                ))}
                {selectedCourse.lessons.length === 0 && <p className="text-sm sm:text-base text-gray-300">No lessons added yet.</p>}
              </div>
            )}
            {tabValue === 1 && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Course Resources ({selectedCourse.resources.length})</h3>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                  <table className="w-full text-sm sm:text-base">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="p-3 sm:p-4 text-left">Resource</th>
                        <th className="p-3 sm:p-4 text-left">Type</th>
                        <th className="p-3 sm:p-4 text-left">Size</th>
                        <th className="p-3 sm:p-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourse.resources.map(resource => (
                        <tr key={resource.id} className="border-t border-gray-700">
                          <td className="p-3 sm:p-4 flex items-center"><FaFileAlt className="mr-2" /> {resource.title}</td>
                          <td className="p-3 sm:p-4">{resource.type}</td>
                          <td className="p-3 sm:p-4">{resource.size}</td>
                          <td className="p-3 sm:p-4"><a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Download</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedCourse.resources.length === 0 && <p className="text-sm sm:text-base text-gray-300 mt-3 sm:mt-4">No resources added yet.</p>}
              </div>
            )}
            {tabValue === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Basic Information</h3>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                    <p><strong>Category:</strong> {selectedCourse.category}</p>
                    <p><strong>Level:</strong> {selectedCourse.level}</p>
                    <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                    <p><strong>Last Updated:</strong> {selectedCourse.lastUpdated}</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Instructor Information</h3>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} className="w-12 sm:w-14 h-12 sm:h-14 rounded-full" />
                    <div>
                      <p className="text-base sm:text-lg font-bold text-white">{selectedCourse.instructor.name}</p>
                      <p className="text-sm sm:text-base text-gray-300">{selectedCourse.instructor.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedCourse.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs sm:text-sm bg-purple-500/20 text-purple-300 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {tabValue === 3 && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Related Courses ({selectedCourse.relatedCourses.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {selectedCourse.relatedCourses.map(course => (
                    <div key={course.id} className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4" />
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2">{course.title}</h4>
                      <p className="text-sm sm:text-base text-gray-300">Instructor: {course.instructor}</p>
                      <p className="text-sm sm:text-base text-gray-300">Duration: {course.duration}</p>
                    </div>
                  ))}
                </div>
                {selectedCourse.relatedCourses.length === 0 && <p className="text-sm sm:text-base text-gray-300 mt-3 sm:mt-4">No related courses added yet.</p>}
              </div>
            )}
          </div>
        )}

        {/* Course Form Modal */}
        <AnimatePresence>
          {openDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 pb-28 pt-20"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{editMode ? 'Edit Course' : 'Create New Course'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="md:col-span-2 space-y-4 sm:space-y-6">
                    <input name="title" value={courseForm.title} onChange={handleInputChange} placeholder="Course Title" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    <textarea name="description" value={courseForm.description} onChange={handleInputChange} placeholder="Description" rows="4" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select name="category" value={courseForm.category} onChange={handleInputChange} className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>
                        <option value="" disabled>Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <select name="level" value={courseForm.level} onChange={handleInputChange} className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>
                        {levels.map(level => <option key={level} value={level}>{level}</option>)}
                      </select>
                    </div>
                    <input name="duration" value={courseForm.duration} onChange={handleInputChange} placeholder="Duration (e.g., 6 weeks)" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    <input name="thumbnail" value={courseForm.thumbnail} onChange={handleInputChange} placeholder="Thumbnail URL" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {allTags.map(tag => (
                          <label key={tag} className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-300">
                            <input type="checkbox" checked={courseForm.tags.includes(tag)} onChange={() => handleTagChange(tag)} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 focus:ring-cyan-500" />
                            {tag}
                          </label>
                        ))}
                      </div>
                    </div>
                    {courseForm.thumbnail && (
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white mb-2">Thumbnail Preview</h3>
                        <img src={courseForm.thumbnail} alt="Preview" className="w-full h-32 sm:h-40 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-4 sm:mt-6 mb-2 sm:mb-3">Instructor Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input name="name" value={courseForm.instructor.name} onChange={handleInstructorChange} placeholder="Instructor Name" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                  <input name="bio" value={courseForm.instructor.bio} onChange={handleInstructorChange} placeholder="Instructor Bio" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>
                <input name="avatar" value={courseForm.instructor.avatar} onChange={handleInstructorChange} placeholder="Instructor Avatar URL" className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 mt-4 sm:mt-6" />
                {courseForm.instructor.avatar && (
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2">Avatar Preview</h3>
                    <img src={courseForm.instructor.avatar} alt="Preview" className="w-16 sm:w-20 h-16 sm:h-20 rounded-full" />
                  </div>
                )}
                <div className="flex justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <Button className="bg-gray-700 text-gray-300 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gray-600 transition-all" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all" onClick={handleSubmit}>
                    {editMode ? 'Update Course' : 'Create Course'}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Snackbar */}
        <AnimatePresence>
          {snackbar.open && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${snackbar.severity === 'success' ? 'bg-green-600' : 'bg-red-600'} z-50`}
            >
              <p className="text-sm sm:text-base">{snackbar.message}</p>
              <button onClick={handleCloseSnackbar} className="absolute top-1 right-1 text-white hover:text-gray-200">✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseManagement;