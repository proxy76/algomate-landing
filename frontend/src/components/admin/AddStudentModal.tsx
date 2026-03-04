import React, { useState } from 'react';
import { X } from 'lucide-react';
import API_BASE_URL from '../../api';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddStudentModal: React.FC<Props> = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        student_id: '',
        password: '',
        program: 'Matematica',
        day: 1,
        time: '16:00'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/students/admin/students/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                let errMsg = "Eroare necunoscută.";
                if (data.student_id) errMsg = data.student_id[0];
                else if (typeof data === 'object') errMsg = JSON.stringify(data);
                throw new Error(errMsg);
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Eroare la crearea elevului.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
                    <h2 className="text-xl font-bold">Adaugă Elev Nou</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <div className="bg-red-900/30 text-red-500 p-3 rounded-lg text-sm">{error}</div>}

                    {/* Account Info */}
                    <div className="space-y-4 border-b border-zinc-800 pb-4 mb-4">
                        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Cont Utilizator</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Cod Elev (Username)</label>
                            <input
                                required
                                type="text"
                                placeholder="ex: M12345"
                                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none uppercase font-mono"
                                value={formData.student_id}
                                onChange={e => setFormData({ ...formData, student_id: e.target.value.toUpperCase() })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Parolă</label>
                            <input
                                required
                                type="text"
                                placeholder="Parolă cont"
                                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Prenume</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                value={formData.first_name}
                                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nume</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                value={formData.last_name}
                                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Telefon (Opțional)</label>
                        <input
                            type="tel"
                            className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    {/* Program Info */}
                    <div className="space-y-4 border-t border-zinc-800 pt-4 mt-4">
                        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Detaliu Program</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Program Pregătire</label>
                            <select
                                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                value={formData.program}
                                onChange={e => setFormData({ ...formData, program: e.target.value })}
                            >
                                <option value="Matematica">Matematică BAC</option>
                                <option value="Informatica">Informatică BAC</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Ziua</label>
                                <select
                                    className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                    value={formData.day}
                                    onChange={e => setFormData({ ...formData, day: parseInt(e.target.value) })}
                                >
                                    <option value={1}>Luni</option>
                                    <option value={2}>Marți</option>
                                    <option value={3}>Miercuri</option>
                                    <option value={4}>Joi</option>
                                    <option value={5}>Vineri</option>
                                    <option value={6}>Sâmbătă</option>
                                    <option value={7}>Duminică</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Ora</label>
                                <input
                                    required
                                    type="time"
                                    className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-blue-500 outline-none"
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 hover:bg-zinc-800 rounded-lg">Anulează</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                        >
                            {loading ? 'Se creează...' : 'Creează Elev'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
