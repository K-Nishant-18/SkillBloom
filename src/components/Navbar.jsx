import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { FiMenu, FiX, FiUser, FiHome, FiBook, FiEdit, FiSettings, FiUsers } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/profile", name: "Profile", icon: <FiUser /> },
    { path: "/courses", name: "Courses", icon: <FiBook /> },
    { path: "/projects", name: "Projects", icon: <FiBook /> },
    { path: "/community", name: "Community", icon: <FiUsers /> },
    { path: "/test-dashboard", name: "Make Test", icon: <FiEdit /> },
    { path: "/manage-course", name: "Manage", icon: <FiSettings /> },
  ];

  return (
    <nav className="bg-gray-900 text-white w-full fixed top-0 left-0 z-50 border-b border-gray-800">
      {/* Scroll Indicator */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-400 to-purple-500"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          originX: 0,
          zIndex: 50,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SkillBoom+
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all ${
                  pathname === link.path
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login Button - Desktop */}
          <div className="hidden md:block ml-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  radius="full"
                >
                  Log In
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-gray-900 z-40 pt-16 overflow-y-auto"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-4 rounded-md text-base font-medium ${
                      pathname === link.path
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 pb-3 border-t border-gray-800">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5"
                >
                  <Link to="/login">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg"
                      radius="full"
                    >
                      Log In
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;