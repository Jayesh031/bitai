'use client'
import { useState, useEffect } from 'react';
import { Download, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=>{
        if(isMenuOpen){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = 'auto';
        }

        //immediate return
        return ()=>{
            document.body.style.overflow = 'auto';
        };
    },[isMenuOpen]) // dependency Array

    // Handle scroll and intersection observer
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Get all sections
            const sections = ['home', 'about', 'services', 'portfolio', 'projects', 'testimonials', 'contact'];

            // Find the current section based on scroll position
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', id: 'home', icon: <Home size={16} /> },
        { name: 'About', id: 'about' },
        { name: 'Services', id: 'services' },
        { name: 'Portfolio', id: 'portfolio' },
        { name: 'Projects', id: 'projects' },
        { name: 'Testimonials', id: 'testimonials' },
        { name: 'Contact', id: 'contact' }
    ];

    const scrollToSection = (id) => {
        // First close the menu
        setIsMenuOpen(false);
        
        // Use setTimeout to ensure the menu closing animation completes
        // before scrolling, preventing potential conflicts
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 10);
    };

    return (
        <>
            <div className="w-full flex justify-center fixed z-50">
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className={`w-4/5 max-w-7xl mx-8 mt-4 rounded-xl transition-all duration-300 p-4 relative ${
                        scrolled ? 'shadow-lg' : ''
                    }`}
                >
                    {/* Glass morphism background */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg"></div>
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl"></div>

                    {/* Reflection effect at the top */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-white/50"></div>
                    
                    {/* Content container */}
                    <div className="relative z-10 px-6">
                        <div className="flex items-center justify-between">
                            {/* Logo with animation */}
                            <motion.div
                                className="flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <button onClick={() => scrollToSection('home')} className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-transparent bg-clip-text hover:scale-3d pl-2">
                                    Bit Ai
                                </button >
                            </motion.div>

                            {/* Desktop navigation */}
                            <div className="hidden md:flex md:items-center md:space-x-1">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group hover:text-black ${activeSection === item.id
                                                ? 'text-gray-600 '
                                                : 'text-black hover:bg-indigo-700/60'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="flex items-center gap-1">
                                            {item.icon && item.icon}
                                            {item.name}
                                        </span>
                                        {activeSection === item.id && (
                                            <motion.span
                                                className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
                                                layoutId="activeSection"
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            ></motion.span>
                                        )}
                                    </motion.button>
                                ))}

                                {/* Resume button */}
                                {/* <motion.a
                                    href="/Jayesh_Resume.pdf"
                                    download
                                    className="ml-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-lg flex items-center gap-1 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Resume
                                    <motion.div
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <Download size={16} />
                                    </motion.div>
                                </motion.a> */}
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <motion.button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-black p-2 rounded-lg hover:bg-indigo-800/50 focus:outline-none"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {isMenuOpen ? (
                                        <X size={28} />
                                    ) : (
                                        <Menu size={28} />
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu with glass morphism effect */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className="md:hidden relative overflow-hidden"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glass morphism overlay for mobile menu */}
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border-t border-white/20 rounded-b-xl"></div>
                                
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-b-xl"></div>

                                <div className="flex flex-col space-y-2 px-4 py-4 relative z-10">
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`px-4 py-3 text-left rounded-lg flex items-center gap-2 transition-all ${activeSection === item.id
                                                    ? 'bg-indigo-600/40 text-white font-semibold border border-indigo-500/30'
                                                    : 'text-black hover:bg-blue-800/30 hover:border hover:border-blue-500/30'
                                                }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {item.icon && item.icon}
                                            {item.name}
                                            {activeSection === item.id && (
                                                <motion.span
                                                    className="ml-2 h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                                                ></motion.span>
                                            )}
                                        </motion.button>
                                    ))}

                                    {/* Mobile Resume button */}
                                    <motion.a
                                        href="/Jayesh_Resume.pdf"
                                        download
                                        className="px-4 py-3 bg-gradient-to-r from-blue-500/90 via-indigo-600/90 to-purple-600/90 border border-indigo-400/30 text-white rounded-lg flex items-center justify-between hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navItems.length * 0.05 }}
                                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Resume</span>
                                        <motion.div
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <Download size={16} />
                                        </motion.div>
                                    </motion.a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            </div>
        </>
    );
}