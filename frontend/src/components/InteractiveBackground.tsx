import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const MATH_SYMBOLS = [
    '∫', '∂', 'f(x)', '∑', '∞', 'π', 'Δ', '√', 'dx', 'lim',
    '∇', 'α', 'β', 'θ', 'λ', '≈', '≠', '∈', '⊂', 'ε',
    'd/dx', '∮', 'log', 'sin', 'cos', 'tan',
];

interface MathParticle {
    id: number;
    x: number;
    y: number;
    symbol: string;
}

let particleId = 0;

const InteractiveBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [particles, setParticles] = useState<MathParticle[]>([]);

    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleClick = useCallback((e: MouseEvent) => {
        const symbol = MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
        const id = particleId++;
        const newParticle: MathParticle = {
            id,
            x: e.clientX,
            y: e.clientY,
            symbol,
        };

        setParticles(prev => [...prev, newParticle]);

        // Auto-remove after animation completes
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== id));
        }, 1200);
    }, []);

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [handleClick]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dark gradient base */}
            <div className="absolute inset-0 bg-slate-950" />

            {/* Mouse Spotlight */}
            <motion.div
                className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* Static Ambient Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[120px]" />

            {/* Grid Overlay (Subtle) */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Math symbol click particles */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.span
                        key={particle.id}
                        initial={{
                            opacity: 1,
                            scale: 0.5,
                            x: particle.x,
                            y: particle.y,
                        }}
                        animate={{
                            opacity: 0,
                            scale: 1.5,
                            y: particle.y - 80,
                            x: particle.x + (Math.random() - 0.5) * 60,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="fixed text-blue-400/70 font-mono text-xl font-bold pointer-events-none select-none z-50"
                        style={{ left: 0, top: 0, translateX: '-50%', translateY: '-50%' }}
                    >
                        {particle.symbol}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBackground;
