import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, BookOpen, Calendar, Mail, Phone, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface StudentData {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    group_id: string;
    phone: string;
}

const StudentDashboard: React.FC = () => {
    const [student, setStudent] = useState<StudentData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        if (!storedStudent) {
            navigate('/login');
            return;
        }
        setStudent(JSON.parse(storedStudent));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('student');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    if (!student) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-12 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[140px] -z-10" />

                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Salut, <span className="text-blue-400">{student.first_name}</span>!</h1>
                            <p className="text-gray-400">Bine ai revenit în contul tău AlgoMate.</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-6 md:mt-0 flex items-center px-6 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 rounded-full transition-colors text-gray-300"
                        >
                            <LogOut size={18} className="mr-2" />
                            Deconectare
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="md:col-span-1 bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl h-fit"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg text-3xl font-bold">
                                    {student.first_name[0]}{student.last_name[0]}
                                </div>
                                <h2 className="text-xl font-bold mb-1">{student.first_name} {student.last_name}</h2>
                                <p className="text-blue-400 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{student.student_id}</p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center text-gray-300 p-3 bg-slate-900/50 rounded-xl">
                                    <Mail size={18} className="mr-3 text-gray-500" />
                                    <div className="overflow-hidden text-ellipsis">{student.email}</div>
                                </div>
                                <div className="flex items-center text-gray-300 p-3 bg-slate-900/50 rounded-xl">
                                    <Phone size={18} className="mr-3 text-gray-500" />
                                    <div>{student.phone || 'Nespecificat'}</div>
                                </div>
                                <div className="flex items-center text-gray-300 p-3 bg-slate-900/50 rounded-xl">
                                    <Users size={18} className="mr-3 text-gray-500" />
                                    <div>Grupa: <span className="text-white font-semibold">{student.group_id}</span></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Area (Placeholder for now) */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Stats or Notices */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center">
                                        <BookOpen className="mr-2 text-indigo-400" />
                                        Situație Școlară
                                    </h3>
                                    <p className="text-gray-400">
                                        Informațiile despre note, prezențe și teme vor fi disponibile aici în curând.
                                    </p>
                                </div>
                                <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            </motion.div>

                            {/* Schedule */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-800/50 border border-white/10 p-8 rounded-3xl"
                            >
                                <h3 className="text-xl font-bold mb-6 flex items-center">
                                    <Calendar className="mr-2 text-teal-400" />
                                    Orar Săptămânal
                                </h3>
                                <div className="bg-slate-900/50 rounded-xl p-6 text-center text-gray-400">
                                    Programul tău va fi afișat aici pe baza grupei <span className="text-white font-mono mx-1">{student.group_id}</span>.
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StudentDashboard;
