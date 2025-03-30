import { useEffect, useRef, useState } from 'react';
import { 
  FaCode, FaBook, FaUser, FaRocket, FaGlobe, FaLightbulb, 
  FaChartLine, FaUsers, FaTrophy, FaGraduationCap, FaProjectDiagram 
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from "../components/ui/Button";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('monthly');
  const bgRef = useRef(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Data for charts
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Skills Mastered',
        data: [12, 19, 15, 27, 34, 42, 48],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2
      }
    ]
  };

  const engagementData = {
    labels: ['Coding', 'Design', 'Business', 'Science', 'Arts'],
    datasets: [
      {
        label: 'Community Engagement',
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(20, 184, 166, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };

  const stats = [
    { value: 12500, label: 'Active Learners', icon: <FaGraduationCap />, color: 'text-blue-400' },
    { value: 3400, label: 'Projects Completed', icon: <FaProjectDiagram />, color: 'text-purple-400' },
    { value: 89, label: 'Countries Represented', icon: <FaGlobe />, color: 'text-green-400' },
    { value: 97, label: 'Satisfaction Rate', icon: <FaTrophy />, color: 'text-yellow-400', suffix: '%' }
  ];

  const features = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: 'Gamified Learning',
      description: 'Build your digital city by mastering new skills. Each course or project you complete unlocks new buildings, upgrades, and achievements in an immersive AR experience.',
      color: "from-purple-500/20 to-purple-600/40"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: 'AI-Powered Growth',
      description: 'Leverage AI-driven mentorship, skill synergy matchmaking, and career insights to find the best learning paths, collaborators, and opportunities for your future.',
      color: "from-cyan-500/20 to-cyan-600/40"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: 'Global Impact',
      description: 'Collaborate on crowdsourced social impact projects, from AI for climate solutions to accessible education platforms, and make a real difference in the world.',
      color: "from-emerald-500/20 to-emerald-600/40"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Real-World Challenges',
      description: 'Tackle AI-generated challenges like coding for accessibility or designing for sustainability, applying your skills to solve meaningful problems.',
      color: "from-amber-500/20 to-amber-600/40"
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: 'Career Opportunities',
      description: 'Unlock micro-grants, startup incubators, freelancing gigs, and internships through your high-impact skills and achievements on SkillBoom',
      color: "from-pink-500/20 to-pink-600/40"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Community Synergy',
      description: 'Connect with a global community of learners and innovators whose skills complement yours, fostering collaboration and co-creation on groundbreaking projects.',
      color: "from-indigo-500/20 to-indigo-600/40"
    }
  ];

  const works = [
    {
      icon: <FaBook className="text-4xl" />,
      title: 'Learn & Teach',
      description: 'Access personalized learning paths and share your knowledge with others to earn rewards.',
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <FaCode className="text-4xl" />,
      title: 'Build & Grow',
      description: 'Watch your Knowledge City expand as you master new skills and complete learning milestones.',
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500"
    },
    {
      icon: <FaUser className="text-4xl" />,
      title: 'Connect & Collaborate',
      description: 'Get matched with mentors, funding opportunities, and social impact projects that align with your skills.',
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500"
    }
  ];

  const testimonials = [
    {
      quote: "SkillBoom transformed how I learn. The gamification makes acquiring new skills addictive!",
      name: "Alex Chen",
      role: "Software Developer",
      avatar: "/images/avatars/1.jpg"
    },
    {
      quote: "I landed my dream job after completing just two SkillBoom learning paths. The projects are exactly what employers want to see.",
      name: "Maria Rodriguez",
      role: "UX Designer",
      avatar: "/images/avatars/2.jpg"
    },
    {
      quote: "The community aspect is incredible. I've collaborated on projects with people from 5 different countries!",
      name: "James Wilson",
      role: "Data Scientist",
      avatar: "/images/avatars/3.jpg"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-900">
      {/* Animated Background */}
      <motion.div
        ref={bgRef}
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(./images/tech-background.jpg)',
          y,
          scale,
          opacity,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Particle Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Cursor Follower */}
      <AnimatePresence>
        {hoveredCard && (
          <motion.div
            className="fixed w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 blur-xl opacity-20 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{
              x: cursorPosition.x - 128,
              y: cursorPosition.y - 128,
              opacity: 0.2,
              scale: 1.5
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section 
          className="min-h-screen flex items-center justify-center text-center px-4"
          ref={sectionRef}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              SkillBloom+
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Build your <span className="text-cyan-400 font-medium">digital innovation hub</span>, learn cutting-edge skills, and collaborate on <span className="text-purple-400 font-medium">world-changing projects</span>
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button
                className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                radius="full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Building</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </Button>
              
              <Button
                className="bg-transparent border-2 border-gray-600 text-gray-200 font-medium px-8 py-4 rounded-full hover:bg-gray-800/50 hover:border-gray-400 transition-all duration-300"
                radius="full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
              </Button>
            </motion.div>

            {/* Floating animated elements */}
            <motion.div 
              className="absolute left-10 bottom-20 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-20"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute right-20 top-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 blur-xl opacity-20"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-full max-w-4xl h-64 bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statItemVariants}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg"
                >
                  <div className={`text-4xl mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    <CountUp 
                      end={stat.value} 
                      duration={3} 
                      separator=","
                      suffix={stat.suffix || ''}
                    />
                  </h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-full max-w-4xl h-64 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Learning Experience</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                SkillBloom+ combines gamification, AI mentorship, and real-world impact to create the ultimate learning platform
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`relative group bg-gradient-to-br ${feature.color} p-8 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden`}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                  <div className="relative z-10">
                    <motion.div 
                      className="text-cyan-400 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/50"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="py-32 px-4 bg-gradient-to-b from-gray-900/50 to-gray-900 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Learning Analytics</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Track your progress and see how you compare with the community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Skill Progression</h3>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      onClick={() => setActiveTab('monthly')}
                    >
                      Monthly
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      onClick={() => setActiveTab('yearly')}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
                <div className="h-64">
                  <Line 
                    data={progressData} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: 'rgba(17, 24, 39, 0.9)',
                          titleColor: '#fff',
                          bodyColor: '#d1d5db',
                          borderColor: '#4b5563',
                          borderWidth: 1,
                          padding: 12,
                          usePointStyle: true,
                          callbacks: {
                            label: (context) => {
                              return ` ${context.parsed.y} skills mastered`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                          },
                          ticks: {
                            color: '#9ca3af'
                          }
                        },
                        y: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                          },
                          ticks: {
                            color: '#9ca3af'
                          }
                        }
                      },
                      elements: {
                        line: {
                          tension: 0.4
                        }
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Community Engagement</h3>
                <div className="h-64">
                  <Bar 
                    data={engagementData} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: 'rgba(17, 24, 39, 0.9)',
                          titleColor: '#fff',
                          bodyColor: '#d1d5db',
                          borderColor: '#4b5563',
                          borderWidth: 1,
                          padding: 12,
                          usePointStyle: true
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                          },
                          ticks: {
                            color: '#9ca3af'
                          }
                        },
                        y: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                          },
                          ticks: {
                            color: '#9ca3af',
                            callback: (value) => {
                              return `${value}%`;
                            }
                          }
                        }
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 w-full max-w-4xl h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">SkillBoom+</span> Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Three simple steps to start your journey of growth and innovation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {works.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative group ${work.gradient} p-8 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-500 overflow-hidden`}
                  whileHover={{ 
                    y: -10,
                    scale: 1.03
                  }}
                >
                  <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 mx-auto">
                      <motion.div 
                        className="text-white"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {work.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      {work.title}
                    </h3>
                    <p className="text-gray-200 text-center">
                      {work.description}
                    </p>
                    <div className="mt-6 text-center">
                      <span className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors">
                        Learn more <FiArrowRight className="ml-1" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 px-4 bg-gradient-to-b from-gray-900/50 to-gray-900 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Community</span> Says
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of innovators who are transforming their careers with SkillBoom+
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-full max-w-4xl h-64 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Transform</span> Your Future?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Join thousands of innovators building the skills that will shape tomorrow's world
              </p>
              
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  radius="full"
                >
                  <span className="relative z-10">Start Your Journey Now</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Button>
              </motion.div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  7-day free trial
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Cancel anytime
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;