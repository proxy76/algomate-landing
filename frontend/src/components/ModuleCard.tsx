import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';

interface ModuleProps {
    title: string;
    description: string;
    isActive: boolean;
    comingSoonLabel?: string;
    icon?: string;
    link?: string;
    index?: number;
}

const ModuleCard: React.FC<ModuleProps> = ({ title, description, isActive, comingSoonLabel, icon, link, index = 0 }) => {
    const IconComponent = (Icons as any)[icon || 'BookOpen'] || Icons.BookOpen;
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D tilt on hover
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    // Each card flies in from a different direction
    const directions = [
        { x: -80, y: 20 },   // left
        { x: 0, y: 60 },     // bottom
        { x: 80, y: 20 },    // right
    ];
    const dir = directions[index % 3];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: dir.x, y: dir.y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            style={isActive ? { rotateX, rotateY, transformPerspective: 800 } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative p-8 rounded-2xl border overflow-hidden transition-all duration-300 group ${isActive
                ? 'bg-slate-800/50 backdrop-blur-sm border-white/10 hover:border-blue-500/50'
                : 'bg-slate-800/30 border-white/5 opacity-70 cursor-not-allowed grayscale'
                }`}
        >
            {/* Animated gradient border glow on hover */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(20,184,166,0.15), rgba(59,130,246,0.15))',
                        backgroundSize: '200% 200%',
                    }}
                />
            )}

            {/* Shimmer sweep on hover */}
            {isActive && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div
                        className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-full transition-all duration-700 ease-in-out"
                    />
                </div>
            )}

            {!isActive && comingSoonLabel && (
                <div className="absolute top-4 right-4 bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-600">
                    {comingSoonLabel}
                </div>
            )}

            <motion.div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl ${isActive ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-700/30 text-gray-500'
                    }`}
                whileHover={isActive ? { scale: 1.1, rotate: 5 } : {}}
            >
                <IconComponent size={28} />
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">{description}</p>

            {isActive && (
                link ? (
                    <Link to={link || '#'} className="inline-flex items-center text-blue-400 font-semibold group/link hover:text-blue-300 transition-colors">
                        Vezi Detalii
                        <Icons.ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <a href="#" className="inline-flex items-center text-blue-400 font-semibold group/link hover:text-blue-300 transition-colors">
                        Vezi Detalii
                        <Icons.ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                )
            )}
        </motion.div>
    );
};

export default React.memo(ModuleCard);
