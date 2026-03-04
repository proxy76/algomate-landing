import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [isClicked, setIsClicked] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring animation for cursor movement
    // Increased stiffness and damping for a "tighter" feel, less floaty
    const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center the cursor (32px width / 2)
            mouseY.set(e.clientY - 16);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        // Add event listeners for hover effects on interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.tagName.toLowerCase() === 'input' ||
                target.tagName.toLowerCase() === 'textarea'
            ) {
                setCursorVariant("hover");
            } else {
                setCursorVariant("default");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "white",
            mixBlendMode: "difference" as any,
        },
        hover: {
            height: 10,
            width: 10,
            backgroundColor: "white",
            mixBlendMode: "difference" as any,
        },
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                }}
            >
                {/* Explosion Effect on Click */}
                <AnimatePresence>
                    {isClicked && (
                        <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 0, scale: 2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 rounded-full bg-white opacity-50"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default CustomCursor;
