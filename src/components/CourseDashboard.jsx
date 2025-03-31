import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiPlay, FiBook, FiDownload, FiAward } from 'react-icons/fi';
import { materials } from '../data/materials';

const CourseDashboard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = materials.find(m => m.id === parseInt(courseId));

  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Simulate loading course data
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-300 mb-6 max-w-md">The course you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/courses')}
          className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center text-sm md:text-base"
        >
          <FiArrowLeft className="mr-2" />
          Browse Available Courses
        </button>
      </div>
    );
  }

  const markComplete = (lessonIndex) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
    }
  };

  const saveNote = () => {
    if (note.trim()) {
      setNotes({
        ...notes,
        [course.lessons[currentLesson].id]: note
      });
      setNote("");
    }
  };

  const allCompleted = completedLessons.length === course.lessons.length;
  const completionPercentage = Math.round((completedLessons.length / course.lessons.length) * 100);

  return (
    <div className={`min-h-screen bg-gray-900 text-white flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 md:p-6 shadow-lg pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="bg-blue-600 text-xs px-2 py-1 rounded mr-2">{course.level}</span>
                <span className="text-sm text-gray-300">{course.category}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
              <p className="text-gray-300 mt-2 text-sm md:text-base max-w-3xl">{course.description}</p>
            </div>
            <button 
              onClick={() => navigate('/courses')} 
              className="px-3 py-1 md:px-4 md:py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex items-center self-start md:self-auto text-sm md:text-base"
            >
              <FiArrowLeft className="mr-2" />
              Back to Courses
            </button>
          </div>
          
          <div className="flex flex-wrap items-center mt-4 text-xs md:text-sm gap-2 md:gap-6">
            <div className="flex items-center">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2"
              />
              <span className="text-gray-300">Instructor: {course.instructor.name}</span>
            </div>
            <div className="flex items-center">
              <FiPlay className="mr-1 text-gray-400" />
              <span className="text-gray-300">{course.lessons.length} lessons</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-300">{course.rating} ({course.students}+ students)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-2 md:p-4 lg:p-6 gap-4 md:gap-6 ${isFullscreen ? 'p-0' : ''}`}>
        {/* Video and Content Section */}
        <div className={`lg:w-2/3 w-full ${isFullscreen ? 'lg:w-full' : ''}`}>
          {/* Video Player */}
          <div className={`bg-black rounded-xl overflow-hidden aspect-video shadow-2xl relative ${isFullscreen ? 'rounded-none h-full' : ''}`}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-sm md:text-base">Loading video content...</p>
                </div>
              </div>
            ) : (
              <>
                <iframe 
                  src={`${course.lessons[currentLesson].videoUrl}?autoplay=1`}
                  title={course.lessons[currentLesson].title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    // Handle error state
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setPlaybackRate(prev => Math.max(0.5, prev - 0.25))}
                      className="bg-gray-800 bg-opacity-70 text-white p-1 md:p-2 rounded-full hover:bg-opacity-100 text-xs md:text-sm"
                    >
                      {playbackRate}x
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-gray-800 bg-opacity-70 text-white p-1 md:p-2 rounded-full hover:bg-opacity-100 text-xs md:text-sm"
                  >
                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Lesson Navigation */}
          <div className="mt-3 md:mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <button 
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
              className="w-full sm:w-auto px-3 py-1 md:px-4 md:py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 transition flex items-center justify-center text-sm md:text-base"
            >
              Previous Lesson
            </button>
            <span className="text-gray-300 text-sm md:text-base">
              Lesson {currentLesson + 1} of {course.lessons.length}
            </span>
            <button 
              onClick={() => setCurrentLesson(Math.min(course.lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === course.lessons.length - 1}
              className="w-full sm:w-auto px-3 py-1 md:px-4 md:py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 transition flex items-center justify-center text-sm md:text-base"
            >
              Next Lesson
            </button>
          </div>

          {/* Lesson Details */}
          <div className="mt-4 md:mt-6 bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{course.lessons[currentLesson].title}</h2>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">{course.lessons[currentLesson].description}</p>
            
            <div className="flex items-center text-xs md:text-sm text-gray-400">
              <span className="mr-2 md:mr-4">{course.lessons[currentLesson].duration}</span>
              {course.lessons[currentLesson].preview && (
                <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">FREE PREVIEW</span>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-4 md:mt-6 bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold">My Notes</h2>
              <button 
                onClick={() => setShowNotes(!showNotes)}
                className="text-blue-400 hover:text-blue-300 text-xs md:text-sm"
              >
                {showNotes ? 'Hide' : 'Show'} Notes
              </button>
            </div>
            
            {showNotes && (
              <>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add your notes for this lesson..."
                  className="w-full bg-gray-700 text-white rounded-lg p-2 md:p-3 mb-2 md:mb-3 min-h-[80px] md:min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                />
                <div className="flex justify-between">
                  <button 
                    onClick={saveNote}
                    className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
                  >
                    Save Note
                  </button>
                  {notes[course.lessons[currentLesson].id] && (
                    <span className="text-green-400 flex items-center text-sm md:text-base">
                      <FiCheck className="mr-1" /> Note saved
                    </span>
                  )}
                </div>
                
                {Object.keys(notes).length > 0 && (
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700">
                    <h3 className="font-medium mb-2 text-sm md:text-base">Saved Notes</h3>
                    {Object.entries(notes).map(([lessonId, noteText]) => (
                      <div key={lessonId} className="bg-gray-700 p-2 md:p-3 rounded-lg mb-2">
                        <p className="text-gray-300 text-sm md:text-base">{noteText}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {!isFullscreen && (
          <div className="lg:w-1/3 w-full space-y-4 md:space-y-6">
            {/* Progress Card */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
                <FiAward className="mr-2 text-blue-400" />
                Your Progress
              </h2>
              
              <div className="mb-3 md:mb-4">
                <div className="flex justify-between text-xs md:text-sm mb-1">
                  <span className="text-gray-300">Completed: {completionPercentage}%</span>
                  <span className="text-gray-300">{completedLessons.length}/{course.lessons.length} lessons</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 md:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              
              {allCompleted ? (
                <>
                  <button 
                    onClick={() => navigate(`/course/${courseId}/certificate`)}
                    className="w-full py-2 md:py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition flex items-center justify-center text-sm md:text-base"
                  >
                    <FiAward className="mr-2" />
                    Get Certificate
                  </button>
                  <button 
                    onClick={() => navigate(`/course/${courseId}/test`)}
                    className="w-full py-2 md:py-3 mt-2 md:mt-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition flex items-center justify-center text-sm md:text-base"
                  >
                    <FiAward className="mr-2" />
                    Take Test
                  </button>
                  {/* Show test score if available */}
                  {localStorage.getItem(`test_score_${courseId}`) && (
                    <div className="mt-2 md:mt-3 p-2 md:p-3 bg-gray-700 rounded-lg">
                      <p className="text-center text-gray-300 text-sm md:text-base">
                        {(() => {
                          const { score, total } = JSON.parse(localStorage.getItem(`test_score_${courseId}`));
                          return `Test Score: ${score}/${total}`;
                        })()}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => markComplete(currentLesson)}
                  disabled={completedLessons.includes(currentLesson)}
                  className={`w-full py-2 md:py-3 rounded-lg font-semibold transition flex items-center justify-center text-sm md:text-base ${
                    completedLessons.includes(currentLesson) 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {completedLessons.includes(currentLesson) ? (
                    <>
                      <FiCheck className="mr-2" />
                      Lesson Completed
                    </>
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
              )}
            </div>

            {/* Lessons Accordion */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
                <FiPlay className="mr-2 text-blue-400" />
                Course Content
              </h2>
              
              <div className="space-y-2 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
                {course.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`p-2 md:p-3 rounded-lg flex justify-between items-center cursor-pointer transition ${
                      currentLesson === index 
                        ? 'bg-blue-900 border-l-4 border-blue-400' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedLessons.includes(index) ? (
                        <span className="text-green-400 mr-2 md:mr-3">
                          <FiCheck />
                        </span>
                      ) : (
                        <span className="text-gray-400 mr-2 md:mr-3 w-4 text-center">{index + 1}</span>
                      )}
                      <div>
                        <p className="font-medium text-sm md:text-base">{lesson.title}</p>
                        <p className="text-xs text-gray-400">{lesson.duration}</p>
                      </div>
                    </div>
                    {lesson.preview && !completedLessons.includes(index) && (
                      <span className="text-xs bg-blue-900 text-blue-200 px-1 py-0.5 md:px-2 md:py-1 rounded">Preview</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-bold flex items-center">
                  <FiDownload className="mr-2 text-blue-400" />
                  Resources
                </h2>
                <button 
                  onClick={() => setShowResources(!showResources)}
                  className="text-blue-400 hover:text-blue-300 text-xs md:text-sm"
                >
                  {showResources ? 'Hide' : 'Show'} Resources
                </button>
              </div>
              
              {showResources && (
                <div className="space-y-2 md:space-y-3">
                  {course.resources.map(resource => (
                    <div key={resource.id} className="flex justify-between items-center bg-gray-700 p-2 md:p-3 rounded-lg">
                      <div className="flex items-center">
                        <FiBook className="mr-2 md:mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm md:text-base">{resource.title}</p>
                          <p className="text-xs text-gray-400">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-xs md:text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Instructor Section */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">About the Instructor</h2>
              <div className="flex items-start">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4"
                />
                <div>
                  <h3 className="font-bold text-sm md:text-base">{course.instructor.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {course.relatedCourses && course.relatedCourses.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">You Might Also Like</h2>
                <div className="space-y-3 md:space-y-4">
                  {course.relatedCourses.map(related => (
                    <div 
                      key={related.id}
                      onClick={() => navigate(`/course/${related.id}`)}
                      className="flex items-center cursor-pointer group"
                    >
                      <img 
                        src={related.thumbnail} 
                        alt={related.title} 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover mr-3 md:mr-4 group-hover:opacity-80 transition"
                      />
                      <div>
                        <h3 className="font-medium text-sm md:text-base group-hover:text-blue-400 transition">{related.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm">{related.instructor}</p>
                        <p className="text-gray-500 text-xs">{related.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;