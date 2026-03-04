import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, FileText } from 'lucide-react';
import StudentList from '../components/admin/StudentList';
import AddStudentModal from '../components/admin/AddStudentModal';
import StudentDetailModal from '../components/admin/StudentDetailModal';

import type { Student } from '../types';
import API_BASE_URL from '../api';

// Define types locally or import (ideally move to types.ts)
// Interfaces moved to ../types.ts

const AdminDashboard = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming JWT or rely on cookie
            // Note: If you use Session Auth, credentials: 'include' is needed.
            // If you use Token Auth, headers are needed.
            // For now, let's assume standard fetch setup we use in the app.

            // Adjust this fetch based on your auth implementation!
            const response = await fetch(`${API_BASE_URL}/api/students/admin/students/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleStudentCreated = () => {
        setShowAddModal(false);
        fetchStudents();
    };

    const handleStudentDeleted = async (id: number) => {
        if (!confirm('Sigur dorești să ștergi acest elev? Acțiunea este ireversibilă.')) return;

        try {
            await fetch(`${API_BASE_URL}/api/students/admin/students/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            });
            fetchStudents();
            setSelectedStudent(null);
        } catch (e) {
            alert("Eroare la ștergere");
        }
    };

    const filteredStudents = students.filter(s =>
        s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.student_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus size={20} />
                        Adaugă Elev
                    </button>
                </div>

                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Caută elev (nume, ID)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-10">Se încarcă...</div>
                    ) : (
                        <StudentList
                            students={filteredStudents}
                            onSelect={setSelectedStudent}
                            onDelete={handleStudentDeleted}
                        />
                    )}
                </div>
            </div>

            {showAddModal && (
                <AddStudentModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleStudentCreated}
                />
            )}

            {selectedStudent && (
                <StudentDetailModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onRefresh={fetchStudents}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
