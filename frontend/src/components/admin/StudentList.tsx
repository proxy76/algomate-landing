import React from 'react';
import type { Student } from '../../types';
import { Trash2, Edit, Eye } from 'lucide-react';

interface Props {
    students: Student[];
    onSelect: (student: Student) => void;
    onDelete: (id: number) => void;
}

const StudentList: React.FC<Props> = ({ students, onSelect, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-400 border-b border-zinc-800">
                        <th className="p-4">ID</th>
                        <th className="p-4">Nume</th>
                        <th className="p-4">Grupă</th>
                        <th className="p-4">Program</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-right">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                            <td className="p-4 font-mono text-blue-400">{student.student_id}</td>
                            <td className="p-4 font-medium">{student.full_name}</td>
                            <td className="p-4">{student.group_id}</td>
                            <td className="p-4">
                                {['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du'][student.day - 1]} - {student.time}
                            </td>
                            <td className="p-4 text-gray-400">{student.email}</td>
                            <td className="p-4 flex justify-end gap-2">
                                <button
                                    onClick={() => onSelect(student)}
                                    className="p-2 hover:bg-zinc-700 rounded-lg text-blue-400"
                                    title="Vezi detalii și note"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(student.id); }}
                                    className="p-2 hover:bg-red-900/30 rounded-lg text-red-500"
                                    title="Șterge elev"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {students.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500">
                                Nu au fost găsiți elevi.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
