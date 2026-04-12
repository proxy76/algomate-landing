import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Send,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const courses = [
  { value: '', label: 'Selectează cursul dorit' },
  { value: 'informatica-bac', label: 'Informatică BAC (C/C++)' },
  { value: 'intro-informatica', label: 'Introducere în Informatică (Python/C++)' },
  { value: 'matematica-bac', label: 'Matematică BAC (M1/M2/M3)' },
];

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Replace with actual API call / email-sending logic
      // Example:
      // await axios.post(`${API_BASE_URL}/api/signup/`, formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-[#f0f0f0] pt-24 pb-20">
        <div className="max-w-lg mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Înscrie-te
            </h1>
            <p className="text-[#888] text-lg">
              Completează formularul și te vom contacta în cel mai scurt timp.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#141414] border border-[#222] rounded-xl p-8"
          >
            {status === 'success' ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">
                  Înscrierea a fost trimisă!
                </h3>
                <p className="text-sm text-[#888] mb-6">
                  Te vom contacta pe email-ul furnizat cu toate detaliile.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-[#e8734a] hover:text-[#f08c5a] transition-colors"
                >
                  Trimite altă înscriere
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#888] uppercase tracking-wider">
                    Nume Complet
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Popescu Andrei"
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#f0f0f0] placeholder:text-[#444] focus:outline-none focus:border-[#e8734a]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#888] uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@exemplu.com"
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#f0f0f0] placeholder:text-[#444] focus:outline-none focus:border-[#e8734a]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#888] uppercase tracking-wider">
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="07xx xxx xxx"
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#f0f0f0] placeholder:text-[#444] focus:outline-none focus:border-[#e8734a]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Course Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#888] uppercase tracking-wider">
                    Cursul Dorit
                  </label>
                  <div className="relative">
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg py-3 pl-4 pr-10 text-sm text-[#f0f0f0] focus:outline-none focus:border-[#e8734a]/50 transition-colors appearance-none"
                    >
                      {courses.map((c) => (
                        <option key={c.value} value={c.value} disabled={!c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    A apărut o eroare. Te rugăm să încerci din nou.
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-[#e8734a] hover:bg-[#d4622e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Trimite Înscrierea
                      <Send size={14} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
