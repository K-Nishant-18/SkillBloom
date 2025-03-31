import { useState } from 'react';
import { FaComments, FaUserTie, FaCalendarAlt, FaStar, FaPaperPlane, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from 'framer-motion';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [chatMessage, setChatMessage] = useState('');

  // Sample data
const forums = [
    { id: 1, title: "Best Resources for Learning React in India", category: "Coding", upvotes: 45, downvotes: 3, replies: 12 },
    { id: 2, title: "How to Crack GATE and Other Tech Interviews", category: "Career", upvotes: 32, downvotes: 1, replies: 8 },
    { id: 3, title: "AI Project Ideas for Final Year BTech Students", category: "AI", upvotes: 28, downvotes: 5, replies: 15 },
  ];
  
  const mentors = [
    { id: 1, name: "Rahul Sharma", expertise: "Frontend Development", availability: "Weekdays", avatar: "/images/avatars/rahul.jpg" },
    { id: 2, name: "Priya Mehta", expertise: "Data Science", availability: "Evenings", avatar: "/images/avatars/priya.jpg" },
    { id: 3, name: "Amit Verma", expertise: "UI/UX Design", availability: "Weekends", avatar: "/images/avatars/amit.jpg" },
  ];
  
  const events = [
    { id: 1, title: "React India Hackathon", date: "April 10, 2025", type: "Hackathon", registerLink: "#" },
    { id: 2, title: "AI in Indian Startups Webinar", date: "April 15, 2025", type: "Webinar", registerLink: "#" },
    { id: 3, title: "Mentor Q&A Session on Career in Tech", date: "April 20, 2025", type: "Q&A", registerLink: "#" },
  ];
  
  const spotlight = [
    { id: 1, name: "Ravi Kumar", contribution: "Top Contributor in AI Quiz Project", avatar: "/images/avatars/ravi.jpg" },
    { id: 2, name: "Ananya Singh", contribution: "Designed Community Leaderboard UI", avatar: "/images/avatars/ananya.jpg" },
  ];
  
  const chatMessages = [
    { id: 1, user: "ArjunM", message: "Anyone working on the leaderboard project?", timestamp: "10:32 AM" },
    { id: 2, user: "SnehaR", message: "Yes! I’m on the UI team—need help?", timestamp: "10:34 AM" },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Placeholder for sending message (e.g., to a backend or state update)
      console.log("Message sent:", chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SkillBloom+ Community
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Connect with <span className="text-cyan-400 font-medium">learners</span>, collaborate with <span className="text-purple-400 font-medium">mentors</span>, and grow together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button
              className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 w-full sm:w-auto"
              radius="full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Join the Conversation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-6 sm:mb-16">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {['Forums', 'Mentors', 'Events', 'Spotlight', 'Chat'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${activeTab === tab.toLowerCase() ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-cyan-500 transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'forums' && (
              <motion.div
                key="forums"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <FaComments className="mr-2 sm:mr-3 text-cyan-400" /> Discussion Forums
                </h2>
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {forums.map((forum) => (
                    <motion.div
                      key={forum.id}
                      variants={cardVariants}
                      className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all"
                      whileHover="hover"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{forum.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300 mb-4">{forum.category}</p>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        <span className="flex items-center text-sm text-gray-300">
                          <FaThumbsUp className="mr-1 text-green-400" /> {forum.upvotes}
                        </span>
                        <span className="flex items-center text-sm text-gray-300">
                          <FaThumbsDown className="mr-1 text-red-400" /> {forum.downvotes}
                        </span>
                        <span className="text-sm text-gray-300">{forum.replies} Replies</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'mentors' && (
              <motion.div
                key="mentors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <FaUserTie className="mr-2 sm:mr-3 text-cyan-400" /> Mentor Directory
                </h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {mentors.map((mentor) => (
                    <motion.div
                      key={mentor.id}
                      variants={cardVariants}
                      className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all"
                      whileHover="hover"
                    >
                      <div className="flex items-center mb-3 sm:mb-4">
                        <img src={mentor.avatar} alt={mentor.name} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4" />
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">{mentor.name}</h3>
                          <p className="text-sm text-gray-300">{mentor.expertise}</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 mb-4">Available: {mentor.availability}</p>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-cyan-600 transition-all"
                        radius="full"
                      >
                        Contact Mentor
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <FaCalendarAlt className="mr-2 sm:mr-3 text-cyan-400" /> Events Calendar
                </h2>
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={cardVariants}
                      className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all"
                      whileHover="hover"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300 mb-2">{event.date}</p>
                      <p className="text-sm sm:text-base text-cyan-400 mb-4">{event.type}</p>
                      <a
                        href={event.registerLink}
                        className="inline-flex items-center text-sm sm:text-base text-white bg-cyan-600 px-4 py-2 rounded-full hover:bg-cyan-500 transition-all"
                      >
                        Register Now
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'spotlight' && (
              <motion.div
                key="spotlight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <FaStar className="mr-2 sm:mr-3 text-cyan-400" /> Community Spotlight
                </h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {spotlight.map((member) => (
                    <motion.div
                      key={member.id}
                      variants={cardVariants}
                      className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all"
                      whileHover="hover"
                    >
                      <div className="flex items-center mb-3 sm:mb-4">
                        <img src={member.avatar} alt={member.name} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">{member.name}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300">{member.contribution}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <FaPaperPlane className="mr-2 sm:mr-3 text-cyan-400" /> Community Chat
                </h2>
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg">
                  <div className="h-64 sm:h-80 overflow-y-auto mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="mb-3 sm:mb-4">
                        <p className="text-sm sm:text-base text-gray-300">
                          <span className="text-cyan-400 font-bold">{msg.user}</span> <span className="text-gray-500 text-xs sm:text-sm">({msg.timestamp})</span>: {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-2 sm:p-3 rounded-full bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <Button
                      type="submit"
                      className="bg-cyan-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-cyan-500 transition-all"
                      radius="full"
                    >
                      <FaPaperPlane />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-full max-w-4xl h-48 sm:h-64 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
              Be Part of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Community</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Share knowledge, find mentors, and collaborate with peers to level up your skills.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 w-full sm:w-auto"
                radius="full"
              >
                <span className="relative z-10">Get Involved Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;