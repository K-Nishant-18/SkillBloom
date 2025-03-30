import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "./ui/Button";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <nav className="bg-[#000000] text-white w-full fixed top-0 left-0 z-50 h-15">
      {/* Scroll Indicator */}
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
          backgroundColor: '#6bbbf7',
          zIndex: 50,
        }}
      />
      
      <div className="w-full py-3">
        <div className="px-4 md:px-6 flex justify-between items-center space-x-4">
          <h1 className="font-body">SkillBoom+</h1>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-[#6bbbf7] px-2 py-2 rounded">
              Home
            </Link>
            <Link to="/profile" className="hover:text-[#6bbbf7] px-3 py-2 rounded">
              Profile
            </Link>
            <Link to="/courses" className="hover:text-[#6bbbf7] px-3 py-2 rounded">
              Course
            </Link>
            <Link to="/test-dashboard" className="hover:text-[#6bbbf7] px-3 py-2 rounded">
              Make Test
            </Link>
            <Link to="/manage-course" className="hover:text-[#6bbbf7] px-3 py-2 rounded">
              Manage Course
            </Link>
            {/* Add other links as needed */}
          </div>
          
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link to="/login">
              <Button
                className="bg-gradient-to-tr from-[#011515] to-[#b7b7b7] text-black font-medium shadow-lg border-3 border-[#b9b9b9]"
                radius="full"
              >
                Log In
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;