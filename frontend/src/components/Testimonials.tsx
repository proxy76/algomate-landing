import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

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

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ce spun elevii noștri</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Succesul lor este cartea noastră de vizită.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            transition={{ delay: index * 0.2, type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-slate-800/40 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-300 relative group"
                        >
                            <Quote className="absolute top-6 right-6 text-slate-700 group-hover:text-blue-500/30 transition-colors duration-300" size={40} />

                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed relative z-10">"{testimonial.content}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
