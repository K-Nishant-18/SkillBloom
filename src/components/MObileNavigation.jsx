import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  Calendar,
  BookOpen,
  FileText,
  Shield,
  User,
  Cpu,
  Sparkles,
  Layers,
  Home,
} from "lucide-react";

const navItems = [
  {
    name: "All",
    icon: Layers,
    submenu: [
      { name: "Social", icon: Users, href: "/StudentSocial" },
      { name: "Jobs", icon: Briefcase, href: "/CampusJobBoard" },
      { name: "Events", icon: Calendar, href: "/EventManagement" },
      { name: "Research", icon: BookOpen, href: "/ResearchCollaboration" },
      { name: "Study Materials", icon: FileText, href: "/StudyMaterials" },
      { name: "Placement Board", icon: FileText, href: "/CollegePlacementBoard" },
  
      { name: "Tools", icon: Briefcase, href: "/Tools" },
    ],
  },
  { name: "Safety", icon: Shield, href: "/SafetyAwareness" },
  {
    name: "Home",
    icon: Home,
    href: "/home",
  },
  {
    name: "AI Tools",
    icon: Cpu,
    submenu: [
      { name: "AI Summary", icon: Sparkles, href: "/AIVideoSummarizer" },
      { name: "Flashcards", icon: Shield, href: "/FlashcardGenerator" },
      { name: "StudyPlanner", icon: Layers, href: "/StudyPlanner" },
      // { name: "Others", icon: Layers, href: "/AIPage" },
    ],
  },
  {
    name: "Profile",
    icon: User,
    submenu: [
      { name: "Profile", icon: User, href: "/UserProfilePage" },
      { name: "Admin Dashboard", icon: User, href: "/admin" },
    ],
  },
];

export default function MobileNavigation({ showPopup }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (name) => {
    if (activeMenu === name) {
      setIsClosing(true);
      setTimeout(() => {
        setActiveMenu(null);
        setIsClosing(false);
      }, 200);
    } else {
      setActiveMenu(name);
    }
  };

  const handleClick = (name, href) => {
    if (href === "/admin" && localStorage.getItem('role') !== 'Admin') {
      showPopup("You don't have access to the Admin Dashboard!");
    } else {
      navigate(href);
      if (activeMenu) {
        setIsClosing(true);
        setTimeout(() => {
          setActiveMenu(null);
          setIsClosing(false);
        }, 200);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setIsClosing(true);
        setTimeout(() => {
          setActiveMenu(null);
          setIsClosing(false);
        }, 200);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const styles = {
    nav: {
      position: "fixed",
      bottom: -1,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: "rgba(6, 6, 6, 0.71)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px 20px 0 0",
      padding: "12px 0",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 -4px 20px rgba(86, 86, 86, 0.3)",
      zIndex: 1000,
    },
    navItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textDecoration: "none",
      color: "#9ca3af",
      fontSize: "12px",
      fontWeight: 500,
      transition: "all 0.3s ease-in-out",
      padding: "8px 12px",
      borderRadius: "12px",
      cursor: "pointer",
    },
    navIcon: {
      width: "24px",
      height: "24px",
      transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
    },
    active: {
      color: "#a78bfa",
      fontWeight: 600,
      transform: "translateY(-8px)",
      filter: "drop-shadow(0 0 8px rgba(167, 139, 250, 0.6))",
    },
    submenu: {
      position: "absolute",
      bottom: "60px",
      left: "0%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "12px",
      background: "rgba(0, 0, 0, 0.9)",
      padding: "8px 12px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      zIndex: 2000,
      whiteSpace: "nowrap",
      transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
    },
    submenuMobile: {
      flexDirection: "column",
      width: "auto",
      minWidth: "150px",
    },
    submenuItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px",
      cursor: "pointer",
      color: "#fff",
      borderRadius: "6px",
      transition: "background 0.2s",
      textDecoration: "none",
    },
    submenuIcon: {
      width: "20px",
      height: "20px",
      color: "#a78bfa",
    },
    fadeInUp: {
      opacity: 1,
      transform: "translateY(0)",
    },
    fadeOutDown: {
      opacity: 0,
      transform: "translateY(10px)",
    },
  };

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => (
        <div key={item.name} style={{ position: "relative" }} className="menu-container">
          {item.submenu ? (
            <div
              style={styles.navItem}
              onClick={() => toggleMenu(item.name)}
            >
              <item.icon style={styles.navIcon} />
              <span>{item.name}</span>
            </div>
          ) : (
            <NavLink
              to={item.href}
              style={({ isActive }) =>
                isActive ? { ...styles.navItem, ...styles.active } : styles.navItem
              }
              onClick={() => handleClick(item.name, item.href)}
            >
              <item.icon style={styles.navIcon} />
              <span>{item.name}</span>
            </NavLink>
          )}

          {activeMenu === item.name && item.submenu && (
            <div
              style={{
                ...styles.submenu,
                ...(window.innerWidth < 500 ? styles.submenuMobile : {}),
                ...(isClosing ? styles.fadeOutDown : styles.fadeInUp),
              }}
            >
              {item.submenu.map((subItem) => (
                <div
                  key={subItem.name}
                  style={styles.submenuItem}
                  onClick={() => handleClick(subItem.name, subItem.href)}
                >
                  <subItem.icon style={styles.submenuIcon} />
                  {subItem.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}