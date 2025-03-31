import { useState } from 'react';
import { 
  FaCode, FaRocket, FaUsers, FaTrophy, FaGithub, FaSearch, FaFilter, FaStar 
} from 'react-icons/fa';
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

const ProjectPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Quiz Generator",
      description: "Build an AI tool to create dynamic quizzes for learners.",
      category: "AI",
      difficulty: "Intermediate",
      skillPoints: 150,
      status: "Open",
      github: "https://github.com/skillbloom/ai-quiz-generator",
      contributors: 12,
    },
    {
      id: 2,
      title: "Community Leaderboard UI",
      description: "Design a responsive leaderboard for SkillBloom+ competitions.",
      category: "Frontend",
      difficulty: "Beginner",
      skillPoints: 100,
      status: "In Progress",
      github: "https://github.com/skillbloom/leaderboard-ui",
      contributors: 8,
    },
    {
      id: 3,
      title: "SkillPoints Rewards System",
      description: "Develop a backend system to manage SkillPoints redemption.",
      category: "Backend",
      difficulty: "Advanced",
      skillPoints: 200,
      status: "Open",
      github: "https://github.com/skillbloom/rewards-system",
      contributors: 5,
    },
  ];

  const openSourceProjects = [
    {
      title: "SkillBloom+ Core",
      description: "The main platform codebase—help us improve the learning experience!",
      github: "https://github.com/skillbloom/core",
      stars: 342,
      forks: 89,
    },
    {
      title: "SkillBloom+ API",
      description: "Contribute to our public API for integrating SkillBloom+ features.",
      github: "https://github.com/skillbloom/api",
      stars: 156,
      forks: 45,
    },
  ];

  const stats = [
    { value: 3400, label: 'Projects Completed', icon: <FaTrophy />, color: 'text-yellow-400' },
    { value: 12500, label: 'Contributors', icon: <FaUsers />, color: 'text-blue-400' },
    { value: 50000, label: 'SkillPoints Awarded', icon: <FaStar />, color: 'text-purple-400' },
  ];

  const filteredProjects = projects.filter(project => 
    (filter === 'all' || project.category === filter) &&
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    hover: { y: -10, transition: { duration: 0.3 } }
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
            Projects on SkillBloom+
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Collaborate on real-world projects, earn <span className="text-cyan-400 font-medium">SkillPoints</span>, and build your <span className="text-purple-400 font-medium">portfolio</span>.
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
              <span className="relative z-10">Start a Project</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-3 sm:py-5 md:py-6 px-4 sm:px-6 bg-gradient-to-b from-gray-900/50 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50 shadow-lg text-center"
              >
                <div className={`text-3xl sm:text-4xl mb-3 sm:mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <CountUp end={stat.value} duration={3} separator="," />
                </h3>
                <p className="text-sm sm:text-base text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Projects</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Join challenges, earn rewards, and showcase your skills.
            </p>
          </motion.div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
            <div className="relative w-full sm:w-1/2">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex gap-2 sm:gap-4">
              {['All', 'AI', 'Frontend', 'Backend'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat === 'All' ? 'all' : cat)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm ${filter === (cat === 'All' ? 'all' : cat) ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-cyan-500 transition-all`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                whileHover="hover"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                  <span className="px-2 py-1 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-full">{project.category}</span>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-purple-500/20 text-purple-300 rounded-full">{project.difficulty}</span>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-green-500/20 text-green-300 rounded-full">{project.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm sm:text-base text-gray-300">
                    <span className="text-yellow-400 font-bold">{project.skillPoints}</span> SkillPoints
                  </p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <FaGithub className="mr-1 sm:mr-2" /> Contribute
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Source Projects Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-900/80">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Contributions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Help shape SkillBloom+ by contributing to our open-source projects on GitHub.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {openSourceProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                whileHover="hover"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-4 mb-4">
                  <span className="flex items-center text-sm sm:text-base text-yellow-400">
                    <FaStar className="mr-1" /> {project.stars}
                  </span>
                  <span className="flex items-center text-sm sm:text-base text-gray-300">
                    <FaCode className="mr-1" /> {project.forks} Forks
                  </span>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all"
                >
                  <FaGithub className="mr-2" /> View on GitHub
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 w-full sm:w-auto"
              radius="full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contribute Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </Button>
          </div>
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
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Build</span> Something Amazing?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Start a project or contribute to open source—earn SkillPoints and grow your career.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 w-full sm:w-auto"
                radius="full"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;