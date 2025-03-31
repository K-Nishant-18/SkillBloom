import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord, FaYoutube, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovering, setIsHovering] = useState(null);

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Courses", href: "/courses" },
        { name: "Projects", href: "/projects" },
        { name: "Competitions", href: "/competitions" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Grow",
      links: [
        { name: "Portfolio", href: "/portfolio" },
        { name: "Rewards", href: "/rewards" },
        { name: "Mentor Hub", href: "/mentor-hub" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
        { name: "Status", href: "/status" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Contribute",
      links: [
        { name: "Open Source", href: "/projects#open-source" },
        { name: "Documentation", href: "/docs" },
        { name: "API", href: "/api" },
        { name: "Webinars", href: "/webinars" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter className="text-xl" />, href: "https://twitter.com/skillbloom", label: "Twitter", color: "hover:text-blue-400" },
    { icon: <FaLinkedin className="text-xl" />, href: "https://linkedin.com/company/skillbloom", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: <FaGithub className="text-xl" />, href: "https://github.com/skillbloom", label: "GitHub", color: "hover:text-purple-400" },
    { icon: <FaDiscord className="text-xl" />, href: "https://discord.gg/skillbloom", label: "Discord", color: "hover:text-indigo-400" },
    { icon: <FaYoutube className="text-xl" />, href: "https://youtube.com/skillbloom", label: "YouTube", color: "hover:text-red-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5 
      } 
    },
  };

  const hoverVariants = {
    hover: { 
      y: -5,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 text-gray-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 w-full max-w-4xl h-48 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Branding and Newsletter */}
          <motion.div 
            className="col-span-2 sm:col-span-1 flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="flex items-center mb-5 sm:mb-6">
              <motion.span 
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
                whileHover={{
                  backgroundPosition: '100%',
                  transition: { duration: 1.5 }
                }}
                style={{
                  backgroundSize: '200%'
                }}
              >
                SkillBloom+
              </motion.span>
            </div>
            <motion.p 
              className="text-sm sm:text-base text-gray-400 mb-5 sm:mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Master skills, earn rewards, and connect with a global community of innovators.
            </motion.p>
            
            {/* Newsletter Signup */}
            <motion.div 
              className="flex flex-col gap-3"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-300 font-medium">Stay updated with SkillBloom+</p>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full p-3 pr-12 rounded-full bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSubscribed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <FaArrowRight className="text-xs" />
                  )}
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p 
                  className="text-xs text-cyan-400 mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </motion.div>
            
            {/* Social Icons */}
            <motion.div 
              className="flex space-x-4 mt-5 sm:mt-6"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                  variants={itemVariants}
                >
                  <span className="sr-only">{social.label}</span>
                  <motion.div
                    animate={{
                      rotate: isHovering === index ? [0, 20, -20, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <motion.div 
              className="flex flex-col items-center text-center"
              key={index}
              variants={itemVariants}
            >
              <motion.h3 
                className="text-sm font-semibold text-white uppercase tracking-wider mb-4 sm:mb-5r"
                whileHover={{ x: 3 }}
              >
                {column.title}
              </motion.h3>
              <ul className="space-y-3 sm:space-y-3.5 flex flex-col items-center text-center pl-4">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    variants={itemVariants}
                  >
                    <motion.a
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <span className="group-hover:text-cyan-400 transition-colors">
                        {link.name}
                      </span>
                      <motion.span 
                        className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        initial={{ opacity: 0, x: -5 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-xs sm:text-sm text-gray-400 mb-4 md:mb-0 pb-8 md:pb-0">
            © {new Date().getFullYear()} SkillBloom+. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
              <motion.a 
                key={index}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;