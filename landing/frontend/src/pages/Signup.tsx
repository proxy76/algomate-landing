import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  ListChecks,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';

const courses = [
  { value: '', label: 'Selectează cursul dorit', backendValue: '' },
  { value: 'informatica-bac', label: 'Informatică BAC (C/C++)', backendValue: 'Informatică BAC' },
  { value: 'intro-informatica', label: 'Introducere în Informatică (Python/C++)', backendValue: 'Introducere în Informatică' },
  { value: 'matematica-bac', label: 'Matematică BAC (M1/M2/M3)', backendValue: 'Matematică BAC' },
];

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    isRobotVerified: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const selectedCourse = courses.find((c) => c.value === formData.course);
    const tutoringTypes = selectedCourse?.backendValue ? [selectedCourse.backendValue] : [];

    try {
      await axios.post(`${API_BASE_URL}/api/contact/`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        tutoring_types: tutoringTypes,
        is_robot_verified: formData.isRobotVerified,
        website: '',
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', message: '', isRobotVerified: false });
    } catch (err) {
      setStatus('error');
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        setErrorMessage('Prea multe încercări. Te rugăm să aștepți și să încerci din nou mai târziu.');
      } else {
        setErrorMessage('A apărut o eroare. Te rugăm să încerci din nou.');
      }
    }
  };

  const filledCount = [formData.name, formData.email, formData.phone, formData.course, formData.message].filter(Boolean).length;

  const inputBase =
    'w-full bg-[#0e0e0e] border-2 py-4 pl-12 pr-4 text-base text-[#f0f0f0] placeholder:text-[#555] focus:outline-none transition-all duration-200 rounded-sm';

  const borderIdle = 'border-[#2a2a2a] hover:border-[#444]';
  const borderFocus = 'focus:border-[#e8734a] focus:bg-[#120c09] focus:shadow-[0_0_0_4px_rgba(232,115,74,0.08)]';

  return (
    <PageTransition>
      <SEO
        title="Înscrie-te la Meditații BAC — Formular de Contact | AlgoMate"
        description="Completează formularul și începe pregătirea pentru BAC. Locuri limitate, grupe mici. Reducere 50% pe vară 2026. Răspundem în 24h."
        path="/inscriere"
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Înscriere
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Formular · 2026
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6 mb-8 md:mb-10">
              <h1 className="font-display font-semibold text-[2.75rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight">
                Înscrie-te la <em className="italic text-[#e8734a] font-normal">meditații.</em>
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
                → Completează formularul și te vom contacta în cel mai scurt timp.
              </p>
            </div>

            {/* Meta row */}
            {status !== 'success' && (
              <div className="pt-6 border-t border-[#222] space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3">
                <div className="flex items-center gap-5 md:gap-8">
                  <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                    <ListChecks size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                    5 câmpuri
                  </div>
                  <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                    <Clock size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                    ~ 2 minute
                  </div>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em] md:ml-auto">
                  <span>Progres</span>
                  <div className="flex gap-1 flex-1 md:flex-initial">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 md:flex-initial md:w-6 transition-colors duration-300 ${
                          i < filledCount ? 'bg-[#e8734a]' : 'bg-[#222]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#e8734a] tabular-nums">{filledCount}/5</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative border border-[#2a2a2a] bg-[#0c0c0c] px-5 sm:px-8 md:px-12 py-10 sm:py-12 md:py-14 rounded-sm"
          >
            {/* Corner ticks */}
            <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#e8734a]" aria-hidden />

            {status === 'success' ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                  className="w-20 h-20 border-2 border-emerald-500/60 bg-emerald-500/5 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle size={36} strokeWidth={1.75} />
                </motion.div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-4">
                  ◆ Confirmat
                </div>
                <h3 className="font-display font-semibold text-3xl md:text-4xl text-[#f0f0f0] mb-4 leading-tight tracking-tight">
                  Înscrierea a fost <em className="italic text-[#e8734a] font-normal">trimisă.</em>
                </h3>
                <p className="text-[#bbb] mb-10 max-w-md mx-auto leading-relaxed">
                  Te vom contacta pe email-ul furnizat cu toate detaliile.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] pb-1 transition-colors"
                >
                  ← Trimite altă înscriere
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Section marker */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#e8734a] uppercase">
                    /01 · Date personale
                  </span>
                  <span className="h-px flex-1 bg-[#222]" />
                </div>

                <div className="space-y-7 mb-14">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-[#e4e4e4] mb-2.5">
                      <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-wider">01</span>
                      Nume Complet
                      <span className="text-[#e8734a]">*</span>
                    </label>
                    <div className="relative group">
                      <User
                        size={17}
                        strokeWidth={1.75}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-[#e8734a] transition-colors pointer-events-none"
                      />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Popescu Andrei"
                        className={`${inputBase} ${borderIdle} ${borderFocus}`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-[#e4e4e4] mb-2.5">
                      <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-wider">02</span>
                      Email
                      <span className="text-[#e8734a]">*</span>
                    </label>
                    <div className="relative group">
                      <Mail
                        size={17}
                        strokeWidth={1.75}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-[#e8734a] transition-colors pointer-events-none"
                      />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@exemplu.com"
                        className={`${inputBase} ${borderIdle} ${borderFocus}`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-[#e4e4e4] mb-2.5">
                      <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-wider">03</span>
                      Telefon
                      <span className="text-[#e8734a]">*</span>
                    </label>
                    <div className="relative group">
                      <Phone
                        size={17}
                        strokeWidth={1.75}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-[#e8734a] transition-colors pointer-events-none"
                      />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="07xx xxx xxx"
                        className={`${inputBase} ${borderIdle} ${borderFocus}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Section marker — course */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#e8734a] uppercase">
                    /02 · Program
                  </span>
                  <span className="h-px flex-1 bg-[#222]" />
                </div>

                <div className="space-y-7 mb-14">
                  <div>
                    <label htmlFor="course" className="flex items-center gap-2 text-sm font-medium text-[#e4e4e4] mb-2.5">
                      <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-wider">04</span>
                      Cursul Dorit
                      <span className="text-[#e8734a]">*</span>
                    </label>
                    <div className="relative group">
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className={`${inputBase} ${borderIdle} ${borderFocus} !pl-4 pr-12 appearance-none cursor-pointer ${
                          !formData.course ? 'text-[#555]' : ''
                        }`}
                      >
                        {courses.map((c) => (
                          <option key={c.value} value={c.value} disabled={!c.value} className="bg-[#0a0a0a] text-[#f0f0f0]">
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.75}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none group-focus-within:text-[#e8734a] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-[#e4e4e4] mb-2.5">
                      <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-wider">05</span>
                      Mesaj
                      <span className="text-[#e8734a]">*</span>
                    </label>
                    <div className="relative group">
                      <MessageSquare
                        size={17}
                        strokeWidth={1.75}
                        className="absolute left-4 top-4 text-[#666] group-focus-within:text-[#e8734a] transition-colors pointer-events-none"
                      />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        maxLength={2000}
                        placeholder="Spune-ne mai multe despre nevoile tale..."
                        className={`${inputBase} ${borderIdle} ${borderFocus} resize-none`}
                      />
                    </div>
                  </div>
                </div>

                {/* Robot verification */}
                <div className="mb-10">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isRobotVerified}
                      onChange={(e) => setFormData({ ...formData, isRobotVerified: e.target.checked })}
                      required
                      className="w-5 h-5 bg-[#0e0e0e] border-2 border-[#2a2a2a] rounded-sm checked:bg-[#e8734a] checked:border-[#e8734a] focus:ring-2 focus:ring-[#e8734a]/30 cursor-pointer accent-[#e8734a]"
                    />
                    <span className="text-sm text-[#bbb] group-hover:text-[#ddd] transition-colors">
                      Confirm că nu sunt un robot
                    </span>
                  </label>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-red-400 text-sm mb-6 border border-red-500/40 bg-red-500/10 px-4 py-3 rounded-sm"
                  >
                    <AlertCircle size={16} strokeWidth={2} />
                    {errorMessage}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="group w-full bg-[#e8734a] hover:bg-[#f08c5a] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0a] font-mono text-sm tracking-[0.2em] uppercase font-bold px-8 py-5 transition-colors duration-200 flex items-center justify-center gap-3 rounded-sm shadow-[0_0_0_1px_rgba(232,115,74,0.2),0_20px_40px_-20px_rgba(232,115,74,0.6)]"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-[1.5px] border-[#0a0a0a]/40 border-t-[#0a0a0a] rounded-full animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite Înscrierea
                      <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <div className="mt-5 font-mono text-[10px] text-[#555] uppercase tracking-[0.25em] text-center leading-relaxed">
                  ◆ Prin trimitere, accepți contactarea pe datele furnizate.
                </div>
              </form>
            )}
          </motion.div>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4 font-mono text-[9px] tracking-[0.4em] text-[#444] uppercase"
          >
            <span className="h-px w-16 bg-[#222]" />
            <span>◆ AlgoMate · MMXXVI ◆</span>
            <span className="h-px w-16 bg-[#222]" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
