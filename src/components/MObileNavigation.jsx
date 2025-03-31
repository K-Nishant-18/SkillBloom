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
    Book,
} from "lucide-react";

const navItems = [
    {
        name: "Space",
        icon: Users,
        href: "/community",
    },
    {
        name: "Courses",
        icon: Cpu,
        href: "/courses",
    },
    {
        name: "Home",
        icon: Home,
        href: "/",
    },
    {
        name: "Projects",
        icon: Book,
        href: "/projects",
    },
    {
        name: "Profile",
        icon: User,
        href: "/profile",
    },
];

export default function MobileNavigation({ showPopup }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = (name) => {
        if (activeMenu === name) {
            closeMenu();
        } else {
            setActiveMenu(name);
        }
    };

    const closeMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setActiveMenu(null);
            setIsClosing(false);
        }, 200);
    };

    const handleClick = (name, href) => {
        if (href === "/admin" && localStorage.getItem('role') !== 'Admin') {
            showPopup("You don't have access to the Admin Dashboard!");
        } else if (href && href !== "#") {
            navigate(href);
            closeMenu();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".menu-container")) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-gray-900/70 backdrop-blur-md rounded-t-xl p-3 border-t border-gray-700 shadow-lg z-50">
            {navItems.map((item) => (
                <div key={item.name} className="relative menu-container">
                    {item.submenu ? (
                        <button
                            className={`flex flex-col items-center text-xs font-medium p-2 rounded-lg transition-all ${
                                activeMenu === item.name 
                                    ? "text-purple-400 -translate-y-2 [text-shadow:_0_0_8px_rgba(167,139,250,0.8)]" 
                                    : "text-gray-400"
                            }`}
                            onClick={() => toggleMenu(item.name)}
                        >
                            <item.icon 
                                className={`w-6 h-6 transition-all ${
                                    activeMenu === item.name 
                                        ? "text-purple-400 [filter:_drop-shadow(0_0_8px_rgba(167,139,250,0.8))]" 
                                        : "text-gray-400"
                                }`} 
                            />
                            <span>{item.name}</span>
                        </button>
                    ) : (
                        <NavLink
                            to={item.href}
                            className={({ isActive }) => 
                                `flex flex-col items-center text-xs font-medium p-2 rounded-lg transition-all ${
                                    isActive 
                                        ? "text-purple-400 -translate-y-2 [text-shadow:_0_0_8px_rgba(167,139,250,0.8)]" 
                                        : "text-gray-400"
                                }`
                            }
                            onClick={() => handleClick(item.name, item.href)}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon 
                                        className={`w-6 h-6 transition-all ${
                                            isActive 
                                                ? "text-purple-400 [filter:_drop-shadow(0_0_8px_rgba(167,139,250,0.8))]" 
                                                : "text-gray-400"
                                        }`} 
                                    />
                                    <span>{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    )}

                    {activeMenu === item.name && item.submenu && (
                        <div 
                            className={`absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-gray-800 p-3 rounded-lg shadow-xl z-50 transition-all duration-200 ${
                                isClosing 
                                    ? "opacity-0 translate-y-2" 
                                    : "opacity-100 translate-y-0"
                            }`}
                            style={{ minWidth: "160px" }}
                        >
                            {item.submenu.map((subItem) => (
                                <button
                                    key={subItem.name}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-white rounded hover:bg-gray-700 transition-colors"
                                    onClick={() => handleClick(subItem.name, subItem.href)}
                                >
                                    <subItem.icon className="w-5 h-5 text-purple-400 [filter:_drop-shadow(0_0_4px_rgba(167,139,250,0.6))]" />
                                    <span className="[text-shadow:_0_0_4px_rgba(167,139,250,0.6)]">{subItem.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}