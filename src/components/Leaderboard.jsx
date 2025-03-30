import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { materials } from '../data/materials';

const Leaderboard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = materials.find(m => m.id === parseInt(courseId));
  const [currentUser] = useState(JSON.parse(localStorage.getItem(`test_score_${courseId}`)) || { score: 0, total: 0 });
  const leaderboard = JSON.parse(localStorage.getItem(`leaderboard_${courseId}`)) || [];

  if (!course) return <div className="min-h-screen bg-gray-900 text-white p-8 text-center">Course not found</div>;

  const handleInterviewSchedule = (username) => {
    const interviewSchedule = {
      username,
      courseId,
      courseTitle: course.title,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };
    localStorage.setItem(`interview_${username}_${courseId}`, JSON.stringify(interviewSchedule));
    alert(`Interview scheduled for ${username} on ${new Date(interviewSchedule.scheduledAt).toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-25">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{course.title} - Leaderboard</h1>
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Score</h2>
          <p className="text-lg">Score: {currentUser.score} / {currentUser.total}</p>
          <p className="text-gray-300">Percentage: {((currentUser.score / currentUser.total) * 100).toFixed(2)}%</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
          {leaderboard.length === 0 ? (
            <p className="text-gray-300">No scores yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    idx < 3 ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <div>
                    <span className="font-bold">{idx + 1}. {entry.username}</span>
                    <p className="text-sm text-gray-300">
                      Score: {entry.score}/{entry.total} ({((entry.score / entry.total) * 100).toFixed(2)}%)
                    </p>
                  </div>
                  {idx < 3 && (
                    <button
                      onClick={() => handleInterviewSchedule(entry.username)}
                      className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                      Apply
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="mt-6 w-full py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Course
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;