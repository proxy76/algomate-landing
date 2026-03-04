import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';


const InteractiveBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

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
        </div>
    );
};

export default InteractiveBackground;
