import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';
import Header from './Header';
import Footer from './Footer';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        student_id: '',
        password: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Updated URL to match the one we created in backend
            const response = await axios.post(`${API_BASE_URL}/api/students/auth/login/`, formData);

            // Store auth token
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            // Store student data (in a real app, use Context or Redux)
            if (response.data.student) {
                localStorage.setItem('student', JSON.stringify(response.data.student));
            }

            if (response.data.is_admin) {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (error: any) {
            console.error("Login error:", error);
            setStatus('error');
            if (error.response && error.response.data && error.response.data.non_field_errors) {
                setErrorMessage(error.response.data.non_field_errors[0]);
            } else {
                setErrorMessage("ID sau parolă incorectă.");
            }
        } finally {
            if (status === 'loading') {
                setStatus('idle');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-12 flex items-center justify-center relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-6 max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Autentificare Elev</h1>
                            <p className="text-gray-400">Introdu ID-ul tău unic și parola.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">ID Elev</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="student_id"
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                        placeholder="Ex: M12345"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Parolă</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="text-red-400 text-sm flex items-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                            >
                                {status === 'loading' ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Intră în Cont <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;
