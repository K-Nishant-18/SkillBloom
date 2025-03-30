import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiAward, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { materials } from '../data/materials';

const TakeTest = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = materials.find((m) => m.id === parseInt(courseId));
  
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [timeLeft, setTimeLeft] = useState(course?.test?.timeLimit || 1800); // 30 minutes default
  const [timerActive, setTimerActive] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    if (timerActive && timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleAutoSubmit();
    }
  }, [timeLeft, timerActive, submitted]);

  if (!course || !course.test) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Test Not Available</h1>
        <p className="text-gray-300 mb-6">This course doesn't have a test or the course was not found.</p>
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Return to Course
        </button>
      </div>
    );
  }

  const handleAnswerChange = (questionIndex, option) => {
    if (!timerActive) setTimerActive(true);
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleAutoSubmit = () => {
    const score = calculateScore();
    saveResults(score);
    setSubmitted(true);
    setTimeout(() => navigate(`/course/${courseId}/leaderboard`), 1500);
  };

  const handleSubmit = () => {
    setConfirmationOpen(true);
  };

  const confirmSubmit = () => {
    const score = calculateScore();
    saveResults(score);
    setSubmitted(true);
    setConfirmationOpen(false);
    setTimeout(() => navigate(`/course/${courseId}/leaderboard`), 1500);
  };

  const calculateScore = () => {
    return course.test.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
  };

  const saveResults = (score) => {
    const total = course.test.length;
    const percentage = Math.round((score / total) * 100);
    
    // Save to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem(`leaderboard_${courseId}`)) || [];
    leaderboard.push({ 
      username, 
      score, 
      total,
      percentage,
      date: new Date().toISOString(),
      timeTaken: (course.test.timeLimit || 1800) - timeLeft 
    });
    
    leaderboard.sort((a, b) => 
      b.percentage - a.percentage || 
      a.timeTaken - b.timeTaken ||
      new Date(b.date) - new Date(a.date)
    );
    
    localStorage.setItem(`leaderboard_${courseId}`, JSON.stringify(leaderboard));
    
    // Save user's test result
    localStorage.setItem(`test_score_${courseId}_${username}`, JSON.stringify({ 
      username,
      score, 
      total,
      percentage,
      date: new Date().toISOString(),
      answers,
      timeTaken: (course.test.timeLimit || 1800) - timeLeft
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = course.test.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{course.title} - Final Assessment</h1>
            <p className="text-gray-400 mt-1">Test your knowledge from the course</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 bg-gray-800 px-4 py-2 rounded-lg">
            <FiClock className="mr-2 text-yellow-400" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Test Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Questions</p>
                  <p className="text-lg font-medium">{totalQuestions}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Time Limit</p>
                  <p className="text-lg font-medium">{formatTime(course.test.timeLimit || 1800)}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Passing Score</p>
                  <p className="text-lg font-medium">{course.test.passingScore || 70}%</p>
                </div>
              </div>
            </div>

            <div className="mb-6 bg-gray-800 p-4 rounded-lg">
              <label className="block text-lg mb-2 font-medium">Your Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name for the certificate"
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-6">
              {course.test.map((q, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">
                      Question {idx + 1} of {totalQuestions}
                    </h3>
                    {answers[idx] && (
                      <span className="flex items-center text-green-400 text-sm">
                        <FiCheck className="mr-1" /> Answered
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-gray-100">{q.question}</p>
                  
                  {q.explanation && (
                    <p className="text-sm text-gray-400 mb-4 italic">Hint: {q.explanation}</p>
                  )}
                  
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => (
                      <label 
                        key={optIdx} 
                        className={`flex items-start p-3 rounded-lg cursor-pointer transition ${
                          answers[idx] === option 
                            ? 'bg-blue-900 border border-blue-500' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question_${idx}`}
                          value={option}
                          checked={answers[idx] === option}
                          onChange={() => handleAnswerChange(idx, option)}
                          className="mt-1 mr-3"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-gray-900 py-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-3 md:mb-0">
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">
                      {answeredCount}/{totalQuestions} answered
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={!username || answeredCount === 0}
                  className={`px-6 py-3 rounded-lg font-medium transition flex items-center ${
                    !username || answeredCount === 0
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <FiAward className="mr-2" />
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="animate-bounce mb-6">
              <FiCheck className="text-green-400 text-6xl mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Test Submitted Successfully!</h2>
            <p className="text-gray-300">You'll be redirected to the leaderboard shortly...</p>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
              <p className="text-gray-300 mb-6">
                You've answered {answeredCount} out of {totalQuestions} questions. 
                Are you sure you want to submit your test?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmationOpen(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <FiAward className="mr-2" />
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTest;