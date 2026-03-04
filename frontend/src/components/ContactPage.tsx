import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api';
import Header from './Header'; // Re-use header
import Footer from './Footer'; // Re-use footer

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        tutoring_types: [] as string[],
        is_robot_verified: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [robotError, setRobotError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTutoringCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        let updatedTypes = [...formData.tutoring_types];
        if (checked) {
            updatedTypes.push(value);
        } else {
            updatedTypes = updatedTypes.filter(type => type !== value);
        }
        setFormData({ ...formData, tutoring_types: updatedTypes });
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, is_robot_verified: e.target.checked });
        if (e.target.checked) setRobotError(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.is_robot_verified) {
            setRobotError(true);
            return;
        }

        setStatus('loading');
        try {
            await axios.post(`${API_BASE_URL}/api/contact/`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '', tutoring_types: [], is_robot_verified: false });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactează-ne</h1>
                        <p className="text-gray-400 text-lg">Ești gata să excelezi? Trimite-ne un mesaj și te vom contacta în cel mai scurt timp.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
                    >
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle size={40} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Mesaj Trimis!</h3>
                                <p className="text-gray-300">Mulțumim! Te vom contacta pe email-ul furnizat.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-blue-400 hover:text-blue-300 underline underline-offset-4"
                                >
                                    Trimite alt mesaj
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Nume Complet</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                                placeholder="Popescu Andrei"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                                placeholder="email@exemplu.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Telefon</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                            placeholder="07xx xxx xxx"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Tipul de Meditații</label>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <label className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800/50 transition-colors">
                                            <input
                                                type="checkbox"
                                                value="Matematică BAC"
                                                checked={formData.tutoring_types.includes("Matematică BAC")}
                                                onChange={handleTutoringCheckbox}
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                                            />
                                            <span className="text-gray-300">Matematică BAC</span>
                                        </label>
                                        <label className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800/50 transition-colors">
                                            <input
                                                type="checkbox"
                                                value="Informatică BAC"
                                                checked={formData.tutoring_types.includes("Informatică BAC")}
                                                onChange={handleTutoringCheckbox}
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                                            />
                                            <span className="text-gray-300">Informatică BAC</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Mesajul Tău</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600 resize-none"
                                            placeholder="Salut, aș dori să aflu mai multe despre..."
                                        />
                                    </div>
                                </div>

                                {/* Robot Verification */}
                                <div className="flex items-center space-x-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                    <input
                                        type="checkbox"
                                        id="robot"
                                        checked={formData.is_robot_verified}
                                        onChange={handleCheckbox}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                                    />
                                    <label htmlFor="robot" className="text-gray-300 text-sm select-none cursor-pointer">
                                        Confirm că nu sunt un robot
                                    </label>
                                </div>
                                {robotError && (
                                    <p className="text-red-400 text-sm ml-1">
                                        Te rugăm să confirmi că nu ești robot pentru a continua.
                                    </p>
                                )}

                                {status === 'error' && (
                                    <div className="text-red-400 text-sm flex items-center">
                                        <AlertCircle size={16} className="mr-2" />
                                        A apărut o eroare. Te rugăm să încerci din nou.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Trimite Mesajul <Send size={20} className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
