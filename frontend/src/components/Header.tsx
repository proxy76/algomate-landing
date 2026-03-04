import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Acasă', href: '/' },
        { name: 'Module', href: '/#modules' },
        { name: 'Despre Noi', href: '/#features' },
    ];

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('/#')) {
            // Logic to scroll to id if on home page
            if (location.pathname === '/') {
                const element = document.querySelector(href.substring(1));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Already handled by Link if we used standard hash but we are using click handler
                // Actually standard Link to '/#id' works natively in many cases but let's be explicit if needed
                // For now, simple anchor tag with /#id works for redirection, but smooth scroll on same page needs care.
                // We'll stick to simple hrefs for now.
            }
        }
    }

    return (
        <motion.header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center relative">
                <Link to="/" className="text-2xl font-bold text-white tracking-widest cursor-pointer">
                    ALGO<span className="text-blue-500">MATE</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors relative group font-medium"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    {/* "Sunt deja elev" Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors"
                        onClick={() => navigate('/login')}
                    >
                        Sunt deja elev
                    </motion.button>

                    {/* "Inscrie-te Acum" Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                        className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-blue-500/50 transition-colors transition-shadow duration-300"
                    >
                        Înscrie-te Acum
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 absolute w-full border-t border-slate-800"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white font-medium text-lg"
                                    onClick={() => handleNavClick(link.href)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                className="text-gray-300 hover:text-white font-medium text-lg text-left"
                                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                            >
                                Sunt deja elev
                            </button>
                            <button
                                onClick={() => { setMobileMenuOpen(false); navigate('/contact'); }}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full mt-4"
                            >
                                Înscrie-te Acum
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default React.memo(Header);
