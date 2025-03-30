import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from "./Pages/Home.jsx";
import Profile from './Pages/Profile.jsx';
import StudyHub from './components/StudyHub.jsx';
import CourseDashboard from './components/CourseDashboard.jsx';
import TakeTest from './components/TakeTest.jsx';
import TestDashboard from './components/TestDashboard.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Login from './Pages/Login.jsx';
import Footer from './components/Footer.jsx';
import ManageCourse from './Pages/ManageCourse.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<StudyHub />} />
        <Route path="/course/:courseId" element={<CourseDashboard />} />
        <Route path="/course/:courseId/test" element={<TakeTest />} />
        <Route path="/test-dashboard" element={<TestDashboard />} />
        <Route path="/course/:courseId/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-course" element={<ManageCourse />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;