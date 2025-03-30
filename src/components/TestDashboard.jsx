import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSave, FiTrash2, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { materials } from '../data/materials';

const TestDashboard = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load existing test if course has one
  useEffect(() => {
    if (selectedCourse) {
      const course = materials.find((m) => m.id === parseInt(selectedCourse));
      if (course && course.test) {
        setQuestions(course.test);
      } else {
        setQuestions([createNewQuestion()]);
      }
    }
  }, [selectedCourse]);

  const createNewQuestion = () => ({
    id: Date.now(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  const addQuestion = () => {
    setQuestions([...questions, createNewQuestion()]);
    setEditingQuestion(questions.length);
    showNotification('New question added', 'success');
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    showNotification('Question removed', 'warning');
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'options') {
      newQuestions[index].options = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = () => {
    // Validate form
    if (!selectedCourse) {
      showNotification('Please select a course', 'error');
      return;
    }

    const emptyQuestions = questions.some(
      q => !q.question || q.options.some(opt => !opt) || !q.correctAnswer
    );

    if (emptyQuestions) {
      showNotification('Please fill all question fields', 'error');
      return;
    }

    const course = materials.find((m) => m.id === parseInt(selectedCourse));
    if (course) {
      course.test = questions;
      course.lastUpdated = new Date().toISOString();
      showNotification('Test saved successfully!', 'success');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  const filteredCourses = materials.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-700' : 
            notification.type === 'error' ? 'bg-red-700' : 'bg-yellow-700'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <FiCheck className="mr-2" />
              ) : (
                <FiX className="mr-2" />
              )}
              {notification.message}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Test Creator Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </button>
        </div>

        <div className="space-y-8">
          {/* Course Selection */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">1. Select Course</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <select
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {filteredCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.category})
                </option>
              ))}
            </select>
          </div>

          {/* Questions Section */}
          {selectedCourse && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">2. Create Test Questions</h2>
                <div className="text-gray-400">
                  {questions.length} {questions.length === 1 ? 'question' : 'questions'}
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-gray-700 p-5 rounded-lg relative">
                    <button
                      onClick={() => removeQuestion(idx)}
                      className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-400 transition"
                      title="Delete question"
                    >
                      <FiTrash2 />
                    </button>

                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Question {idx + 1}</label>
                      <textarea
                        placeholder="Enter the question"
                        value={q.question}
                        onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                        className="w-full p-3 h-20 bg-gray-600 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Options</label>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center">
                            <input
                              type="radio"
                              name={`correctAnswer-${idx}`}
                              checked={q.correctAnswer === opt}
                              onChange={() => updateQuestion(idx, 'correctAnswer', opt)}
                              className="mr-3"
                              disabled={!opt}
                            />
                            <input
                              type="text"
                              placeholder={`Option ${optIdx + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[optIdx] = e.target.value;
                                updateQuestion(idx, 'options', newOptions);
                              }}
                              className="flex-1 p-2 bg-gray-600 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                            {q.options.length > 2 && (
                              <button
                                onClick={() => removeOption(idx, optIdx)}
                                className="ml-2 p-1 text-gray-400 hover:text-red-400 transition"
                                title="Remove option"
                              >
                                <FiX />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {q.options.length < 6 && (
                        <button
                          onClick={() => addOption(idx)}
                          className="mt-2 flex items-center text-sm text-blue-400 hover:text-blue-300"
                        >
                          <FiPlus className="mr-1" /> Add Option
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Explanation (optional)</label>
                      <input
                        type="text"
                        placeholder="Add explanation or hint"
                        value={q.explanation || ''}
                        onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)}
                        className="w-full p-2 bg-gray-600 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                ))}

                <div className="flex space-x-4">
                  <button
                    onClick={addQuestion}
                    className="flex-1 flex items-center justify-center py-3 bg-green-700 rounded-lg hover:bg-green-600 transition"
                  >
                    <FiPlus className="mr-2" />
                    Add New Question
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedCourse || questions.length === 0}
                    className={`flex-1 flex items-center justify-center py-3 rounded-lg transition ${
                      !selectedCourse || questions.length === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <FiSave className="mr-2" />
                    Save Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;