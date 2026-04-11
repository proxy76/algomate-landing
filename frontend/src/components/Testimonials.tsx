import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Quote, Star, GripHorizontal } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Andrei Popescu",
        role: "Elev, Clasa a XII-a",
        content: "Datorită AlgoMate am reușit să înțeleg conceptele de bază la informatică. Profesorii explică totul foarte clar și răbdător.",
        rating: 5
    },
    {
        id: 2,
        name: "Maria Ionescu",
        role: "Studentă, Politehnică",
        content: "Pregătirea pentru BAC la matematică a fost excelentă. Am luat nota 9.80 și am intrat la buget la facultate!",
        rating: 5
    },
    {
        id: 3,
        name: "Radu Vasile",
        role: "Elev, Clasa a XI-a",
        content: "Platforma este foarte intuitivă, iar materialele sunt structurate perfect. Recomand cu încredere!",
        rating: 4
    }
];

const CARD_WIDTH = 380;
const CARD_GAP = 24;

const Testimonials: React.FC = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 40 });

    const maxDrag = -(testimonials.length * (CARD_WIDTH + CARD_GAP) - CARD_WIDTH);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-900" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 px-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ce spun elevii noștri</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Succesul lor este cartea noastră de vizită.
                    </p>
                </motion.div>

                {/* Drag hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6"
                >
                    <GripHorizontal size={16} />
                    <span>Trage pentru a vedea mai mult</span>
                </motion.div>

                {/* Carousel wrapper */}
                <div className="relative" ref={constraintsRef}>
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

                    <motion.div
                        className="flex gap-6 pl-[max(1.5rem,calc((100vw-1200px)/2))] pr-24 cursor-grab active:cursor-grabbing"
                        drag="x"
                        style={{ x: springX }}
                        dragConstraints={{ left: maxDrag, right: 0 }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                        onDrag={(_, info) => x.set(info.point.x)}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="bg-slate-800/40 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 relative group flex-shrink-0"
                                style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
                            >
                                <Quote className="absolute top-6 right-6 text-slate-700 group-hover:text-blue-500/30 transition-colors duration-300" size={40} />

                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                                        <Star key={`empty-${i}`} size={18} className="text-slate-700" />
                                    ))}
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed relative z-10">"{testimonial.content}"</p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-600/20">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
