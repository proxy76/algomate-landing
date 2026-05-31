import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Politica de Confidențialitate | AlgoMate — Meditații BAC"
        description="Politica de confidențialitate AlgoMate. Cum colectăm, folosim și protejăm datele personale în conformitate cu GDPR."
        path="/politica-de-confidentialitate"
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Legal
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
            </div>

            <h1 className="font-display font-semibold text-[2.5rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.02] tracking-tight">
              Politica de Confidențialitate<span className="text-[#e8734a]">.</span>
            </h1>
            <p className="font-mono text-[11px] text-[#888] uppercase tracking-wider mt-4">
              Ultima actualizare: 16 Aprilie 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-10"
          >
            <Section title="1. Introducere">
              <p>
                Protecția datelor dumneavoastră personale este importantă pentru noi. Această
                Politică de Confidențialitate explică ce date colectăm, cum le folosim și ce
                drepturi aveți în legătură cu acestea, în conformitate cu Regulamentul General
                privind Protecția Datelor (GDPR) și legislația românească aplicabilă.
              </p>
              <p>
                Operatorul de date este Rădulescu Razvan, cu sediul în București, România.
                Contact:{' '}
                <a href="mailto:algomate.razvan@gmail.com" className="text-[#e8734a] hover:underline">
                  algomate.razvan@gmail.com
                </a>.
              </p>
            </Section>

            <Section title="2. Datele pe Care le Colectăm">
              <p>
                Prin intermediul formularului de contact de pe Site, colectăm următoarele date
                personale:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li><strong className="text-[#ddd]">Numele complet</strong> — pentru a vă identifica și personaliza comunicarea</li>
                <li><strong className="text-[#ddd]">Adresa de email</strong> — pentru a vă răspunde la solicitare</li>
                <li><strong className="text-[#ddd]">Numărul de telefon</strong> — pentru a vă contacta în vederea programării</li>
                <li><strong className="text-[#ddd]">Mesajul transmis</strong> — pentru a înțelege nevoile dumneavoastră educaționale</li>
                <li><strong className="text-[#ddd]">Preferințele de meditație</strong> — tipul de curs solicitat (Matematică / Informatică)</li>
              </ul>
              <p>
                Nu colectăm date sensibile, nu folosim cookie-uri de tracking și nu monitorizăm
                comportamentul dumneavoastră pe Site prin instrumente de analiză terțe.
              </p>
            </Section>

            <Section title="3. Scopul Prelucrării Datelor">
              <p>Datele dumneavoastră personale sunt prelucrate exclusiv în următoarele scopuri:</p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li>Răspunsul la solicitările transmise prin formularul de contact</li>
                <li>Organizarea și programarea sesiunilor de meditații</li>
                <li>Comunicarea informațiilor relevante despre serviciile solicitate</li>
              </ul>
            </Section>

            <Section title="4. Temeiul Legal al Prelucrării">
              <p>
                Prelucrarea datelor se bazează pe consimțământul dumneavoastră, acordat prin
                completarea și trimiterea formularului de contact. Aveți dreptul de a vă retrage
                consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate
                anterior retragerii.
              </p>
            </Section>

            <Section title="5. Perioada de Stocare">
              <p>
                Datele transmise prin formularul de contact sunt primite exclusiv prin email și
                sunt păstrate atât timp cât este necesar pentru scopul în care au fost colectate.
                Datele vor fi șterse la solicitarea dumneavoastră sau atunci când nu mai sunt
                necesare pentru scopul inițial.
              </p>
            </Section>

            <Section title="6. Partajarea Datelor">
              <p>
                Nu vindem, nu închiriem și nu partajăm datele dumneavoastră personale cu terțe
                părți, cu excepția cazurilor în care acest lucru este impus de legislația în
                vigoare sau de o autoritate competentă.
              </p>
              <p>
                Emailurile sunt transmise prin serviciul Gmail (Google), care acționează ca
                procesator de date. Google respectă standardele GDPR și asigură protecția
                corespunzătoare a datelor.
              </p>
            </Section>

            <Section title="7. Securitatea Datelor">
              <p>
                Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor
                dumneavoastră personale, inclusiv:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li>Comunicare criptată prin HTTPS pe întregul Site</li>
                <li>Transmiterea emailurilor prin conexiune TLS securizată</li>
                <li>Protecție împotriva spam-ului și a submisiilor automate</li>
                <li>Limitarea ratei de trimitere a formularelor</li>
              </ul>
            </Section>

            <Section title="8. Drepturile Dumneavoastră">
              <p>
                În conformitate cu GDPR, aveți următoarele drepturi privind datele personale:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li><strong className="text-[#ddd]">Dreptul de acces</strong> — puteți solicita confirmarea prelucrării și o copie a datelor</li>
                <li><strong className="text-[#ddd]">Dreptul la rectificare</strong> — puteți solicita corectarea datelor inexacte</li>
                <li><strong className="text-[#ddd]">Dreptul la ștergere</strong> — puteți solicita ștergerea datelor dumneavoastră</li>
                <li><strong className="text-[#ddd]">Dreptul la restricționarea prelucrării</strong> — puteți solicita limitarea prelucrării</li>
                <li><strong className="text-[#ddd]">Dreptul la portabilitatea datelor</strong> — puteți solicita transferul datelor</li>
                <li><strong className="text-[#ddd]">Dreptul la opoziție</strong> — puteți vă opune prelucrării datelor</li>
              </ul>
              <p>
                Pentru exercitarea oricăruia dintre aceste drepturi, ne puteți contacta la{' '}
                <a href="mailto:algomate.razvan@gmail.com" className="text-[#e8734a] hover:underline">
                  algomate.razvan@gmail.com
                </a>.
              </p>
            </Section>

            <Section title="9. Plângeri">
              <p>
                Dacă considerați că prelucrarea datelor dumneavoastră personale încalcă legislația
                aplicabilă, aveți dreptul de a depune o plângere la Autoritatea Națională de
                Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) —{' '}
                <span className="text-[#e8734a]">www.dataprotection.ro</span>.
              </p>
            </Section>

            <Section title="10. Modificări ale Politicii">
              <p>
                Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate.
                Orice modificare va fi publicată pe această pagină cu data ultimei actualizări.
                Vă recomandăm să consultați periodic această pagină pentru a fi la curent cu
                practicile noastre de protecție a datelor.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Pentru orice întrebări privind această Politică de Confidențialitate sau modul
                în care sunt prelucrate datele dumneavoastră, ne puteți contacta la:
              </p>
              <div className="bg-[#111] border border-[#222] p-6 mt-4 space-y-2">
                <p className="text-[#ddd] font-medium">Rădulescu Razvan — AlgoMate</p>
                <p>
                  Email:{' '}
                  <a href="mailto:algomate.razvan@gmail.com" className="text-[#e8734a] hover:underline">
                    algomate.razvan@gmail.com
                  </a>
                </p>
                <p>Locație: București, România</p>
              </div>
            </Section>
          </motion.div>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4 font-mono text-[9px] tracking-[0.4em] text-[#444] uppercase"
          >
            <span className="h-px w-16 bg-[#222]" />
            <span>◆ Fin · AlgoMate MMXXVI ◆</span>
            <span className="h-px w-16 bg-[#222]" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="border-t border-[#222] pt-8">
    <h2 className="font-sans font-semibold text-xl md:text-2xl text-[#f0f0f0] mb-5 tracking-tight">
      {title}
    </h2>
    <div className="space-y-4 text-[#bbb] leading-relaxed text-[15px]">
      {children}
    </div>
  </section>
);

export default PrivacyPolicy;
