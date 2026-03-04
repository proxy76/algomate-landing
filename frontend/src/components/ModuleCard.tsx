import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface ModuleProps {
    title: string;
    description: string;
    isActive: boolean;
    comingSoonLabel?: string;
    icon?: string; // Icon name as string
    link?: string;
}

const ModuleCard: React.FC<ModuleProps> = ({ title, description, isActive, comingSoonLabel, icon, link }) => {
    // Dynamic Icon Loading
    const IconComponent = (Icons as any)[icon || 'BookOpen'] || Icons.BookOpen;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={isActive ? { y: -10, boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.2)" } : {}}
            className={`relative p-8 rounded-2xl border border-white/10 overflow-hidden transition-colors duration-300 ${isActive
                ? 'bg-slate-800/50 backdrop-blur-sm hover:border-blue-500/50'
                : 'bg-slate-800/30 opacity-70 cursor-not-allowed grayscale'
                }`}
        >
            {!isActive && comingSoonLabel && (
                <div className="absolute top-4 right-4 bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-600">
                    {comingSoonLabel}
                </div>
            )}

            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl ${isActive ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-700/30 text-gray-500'
                }`}>
                <IconComponent size={28} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">{description}</p>

            {isActive && (
                link ? (
                    <Link to={link || '#'} className="inline-flex items-center text-blue-400 font-semibold group hover:text-blue-300 transition-colors">
                        Vezi Detalii
                        <Icons.ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <a href="#" className="inline-flex items-center text-blue-400 font-semibold group hover:text-blue-300 transition-colors">
                        Vezi Detalii
                        <Icons.ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                )
            )}
        </motion.div>
    );
};

export default React.memo(ModuleCard);
