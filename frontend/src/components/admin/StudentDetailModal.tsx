import React, { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import type { Student } from '../../types';
import API_BASE_URL from '../../api';

interface Props {
    student: Student;
    onClose: () => void;
    onRefresh: () => void;
}

const StudentDetailModal: React.FC<Props> = ({ student, onClose, onRefresh }) => {
    const [newGrade, setNewGrade] = useState({ subject: 'Matematica', grade: 10, description: '' });
    const [loading, setLoading] = useState(false);

    const handleAddGrade = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`${API_BASE_URL}/api/students/admin/students/${student.id}/grades/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(newGrade)
            });
            onRefresh();
            // We assume fetching refresh will close this modal or we trigger a local update? 
            // Better to trigger refresh, get new student data. 
            // Ideally we need to fetch this specific student details again or close.
            // Let's close input inputs but keep modal open.
            setNewGrade({ subject: 'Matematica', grade: 10, description: '' });
            alert("Notă adăugată!");
        } catch (e) {
            alert("Eroare la adăugarea notei");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteGrade = async (gradeId: number) => {
        if (!confirm('Ștergi nota?')) return;
        await fetch(`${API_BASE_URL}/api/students/admin/grades/${gradeId}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Token ${localStorage.getItem('authToken')}` }
        });
        onRefresh(); // This might cause a flicker if we don't handle local state, but fine for now.
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">

                {/* Left Side: Student Info */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-800 w-full md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">{student.full_name}</h2>
                    <div className="space-y-4 text-gray-300">
                        <div>
                            <span className="block text-gray-500 text-xs uppercase">ID Elev</span>
                            <span className="font-mono text-white">{student.student_id}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase">Email</span>
                            {student.email}
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase">Telefon</span>
                            {student.phone || '-'}
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase">Grupă</span>
                            {student.group_id}
                        </div>
                    </div>
                </div>

                {/* Right Side: Grades & Form */}
                <div className="p-6 w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Catalog Note</h3>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg"><X /></button>
                    </div>

                    {/* Add Grade Form */}
                    <form onSubmit={handleAddGrade} className="bg-zinc-800/50 p-4 rounded-lg mb-6 border border-zinc-700">
                        <h4 className="font-medium mb-3 text-sm text-gray-400">Adaugă notă nouă</h4>
                        <div className="grid grid-cols-4 gap-3">
                            <select
                                className="col-span-2 bg-black border border-zinc-700 rounded p-2 text-sm"
                                value={newGrade.subject}
                                onChange={e => setNewGrade({ ...newGrade, subject: e.target.value })}
                            >
                                <option value="Matematica">Matematică</option>
                                <option value="Informatica">Informatică</option>
                                <option value="Simulare">Simulare</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Notă"
                                step="0.1"
                                max="10"
                                className="bg-black border border-zinc-700 rounded p-2 text-sm"
                                value={newGrade.grade}
                                onChange={e => setNewGrade({ ...newGrade, grade: parseFloat(e.target.value) })}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 rounded font-medium text-sm"
                            >
                                <Plus className="mx-auto" size={18} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Descriere / Observații (ex: Test matrice)"
                            className="w-full mt-3 bg-black border border-zinc-700 rounded p-2 text-sm"
                            value={newGrade.description}
                            onChange={e => setNewGrade({ ...newGrade, description: e.target.value })}
                        />
                    </form>

                    {/* Grades List */}
                    <div className="space-y-2">
                        {student.grades && student.grades.length > 0 ? (
                            student.grades.map(grade => (
                                <div key={grade.id} className="flex justify-between items-center bg-zinc-800/30 p-3 rounded border border-zinc-800">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold text-lg ${grade.grade >= 5 ? 'text-green-400' : 'text-red-400'}`}>
                                                {grade.grade}
                                            </span>
                                            <span className="font-medium text-gray-200">{grade.subject}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {grade.date} • {grade.description || 'Fără descriere'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteGrade(grade.id)}
                                        className="text-red-500 hover:bg-red-900/20 p-2 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">Nu există note înregistrate.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailModal;
