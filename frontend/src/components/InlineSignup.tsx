import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

/**
 * Inline enrollment card — sits directly after the AlgoMate guarantee bar.
 *
 * Deliberately shorter than the /inscriere form: four fields instead of five,
 * no free-text message. It exists to capture the lead while the guarantee is
 * still on screen; anyone who needs to explain more is sent to the full form.
 *
 * `message` and `is_robot_verified` are required by ContactSerializer, so the
 * message is synthesised to tell Răzvan which surface the lead came from.
 * Spam protection here is the `website` honeypot, same as the full form.
 */

const programs = [
  { value: '', label: 'Alege programul' },
  { value: 'Matematică BAC', label: 'Matematică BAC' },
  { value: 'Informatică BAC', label: 'Informatică BAC' },
  { value: 'Introducere în Informatică', label: 'Introducere în Informatică' },
];

/* ─── Ruled field ────────────────────────────────────────────
   The underline is the whole interface: it carries the state.
   #242424 idle · #e8734a focused · dimmed accent once filled.
   Text colour is set per call site — putting it here would win
   the Tailwind conflict against the select's dim placeholder.  */

const ruleFor = (filled: boolean) =>
  `w-full bg-transparent border-0 border-b-2 pb-3 text-[0.95rem]
   placeholder:text-[#444] transition-colors duration-200
   focus:outline-none focus:border-[#e8734a]
   ${filled ? 'border-[#e8734a]/45' : 'border-[#242424] hover:border-[#3a3a3a]'}`;

const Field: React.FC<{
  id: string;
  label: string;
  children: React.ReactNode;
}> = ({ id, label, children }) => (
  <div className="group">
    <label
      htmlFor={id}
      className="block font-mono text-[10px] tracking-[0.28em] uppercase text-[#666] mb-3 group-focus-within:text-[#e8734a] transition-colors duration-200"
    >
      {label}
    </label>
    {children}
  </div>
);

const InlineSignup: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    website: '', // honeypot — must stay empty
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await axios.post(`${API_BASE_URL}/api/contact/`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: 'Înscriere rapidă din pagina principală.',
        tutoring_types: form.program ? [form.program] : [],
        is_robot_verified: true,
        website: form.website,
      });
      navigate('/multumim');
    } catch (err) {
      setStatus('error');
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        setError('Ai atins limita de trei cereri. Încearcă din nou peste 24 de ore.');
      } else {
        setError('Nu am putut trimite cererea. Verifică conexiunea și încearcă din nou.');
      }
    }
  };

  return (
    <section className="pb-20 md:pb-28 relative z-10" id="inscriere-rapida">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-[#1e1e1e] bg-[#0d0d0d] pl-8 sm:pl-14 md:pl-20 pr-5 sm:pr-8 md:pr-12 py-10 md:py-14"
        >
          {/* Margin rule — the vertical line down a school exercise book,
              the same ruled-paper logic the fields below use. */}
          <span
            className="absolute left-4 sm:left-8 md:left-12 top-0 bottom-0 w-px bg-[#e8734a]/30"
            aria-hidden
          />

          {/* Eyebrow row */}
          <div className="flex items-baseline justify-between gap-4 mb-10 md:mb-12">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a]">
              Fișă de înscriere
            </span>
            {/* Hidden on mobile — the paragraph below already says this,
                and two eyebrows collide at 390px. */}
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.25em] uppercase text-[#666]">
              Răspund în aceeași zi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
            {/* Left — the ask */}
            <div className="md:col-span-5">
              <h2 className="font-display font-semibold text-[2rem] sm:text-4xl md:text-[2.75rem] text-[#f0f0f0] leading-[1.08] tracking-tight mb-6">
                Rezervă prima{' '}
                <em className="italic text-[#e8734a] font-normal">ședință.</em>
              </h2>
              <p className="text-[0.95rem] text-[#999] leading-relaxed max-w-sm">
                Patru câmpuri și gata. Îți scriu sau te sun în aceeași zi și stabilim
                împreună ora — fără nicio plată până atunci.
              </p>

              <Link
                to="/inscriere"
                className="group/link inline-flex items-center gap-3 mt-8 font-mono text-[10px] tracking-[0.25em] uppercase text-[#777] hover:text-[#e8734a] pb-2 border-b border-[#222] hover:border-[#e8734a]/60 transition-colors duration-300"
              >
                <span>
                  <span className="hidden sm:inline">Ai mai multe de spus? </span>
                  Formularul complet
                </span>
                <ArrowRight
                  size={12}
                  strokeWidth={2.5}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Right — the card */}
            <div className="md:col-span-7">
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mb-10">
                  <Field id="rapid-name" label="Nume">
                    <input
                      id="rapid-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Popescu Andrei"
                      className={`${ruleFor(!!form.name)} text-[#f0f0f0]`}
                    />
                  </Field>

                  <Field id="rapid-phone" label="Telefon">
                    <input
                      id="rapid-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder="07xx xxx xxx"
                      className={`${ruleFor(!!form.phone)} text-[#f0f0f0]`}
                    />
                  </Field>

                  <Field id="rapid-email" label="Email">
                    <input
                      id="rapid-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="nume@exemplu.com"
                      className={ruleFor(!!form.email)}
                    />
                  </Field>

                  <Field id="rapid-program" label="Program">
                    <div className="relative">
                      <select
                        id="rapid-program"
                        name="program"
                        value={form.program}
                        onChange={handleChange}
                        required
                        className={`${ruleFor(!!form.program)} appearance-none cursor-pointer pr-8 ${
                          form.program ? 'text-[#f0f0f0]' : 'text-[#444]'
                        }`}
                      >
                        {programs.map((p) => (
                          <option
                            key={p.value}
                            value={p.value}
                            disabled={!p.value}
                            className="bg-[#0d0d0d] text-[#f0f0f0]"
                          >
                            {p.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.75}
                        className="absolute right-0 bottom-4 text-[#666] pointer-events-none"
                        aria-hidden
                      />
                    </div>
                  </Field>
                </div>

                {/* Honeypot — off-screen rather than hidden, so bots still fill it */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                />

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-start gap-3 text-[0.9rem] text-[#f0a58a] border border-[#e8734a]/30 bg-[#e8734a]/[0.06] px-4 py-3 mb-6"
                  >
                    <AlertCircle size={16} strokeWidth={2} className="shrink-0 mt-0.5" />
                    {error}
                  </motion.p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group bg-[#e8734a] hover:bg-[#f08c5a] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 inline-flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8734a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-[1.5px] border-[#0a0a0a]/40 border-t-[#0a0a0a] rounded-full animate-spin" />
                        Se trimite
                      </>
                    ) : (
                      <>
                        Rezervă ședința
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] leading-relaxed tracking-[0.15em] uppercase text-[#555]">
                    Datele ajung direct la Răzvan.
                    <br className="hidden sm:block" /> Nu le folosim pentru altceva.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(InlineSignup);
