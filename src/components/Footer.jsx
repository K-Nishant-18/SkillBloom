import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord, FaYoutube } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Updates", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "API", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaGithub />, href: "#" },
    { icon: <FaDiscord />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Logo and description */}
          <motion.div 
            className="col-span-2 lg:col-span-1"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                SkillBoom+
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Build your digital innovation hub, learn cutting-edge skills, and collaborate on world-changing projects.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -3 }}
                  variants={itemVariants}
                >
                  <span className="sr-only">{social.icon.type.name}</span>
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SkillBoom+. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;