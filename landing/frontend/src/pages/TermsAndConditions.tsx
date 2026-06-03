import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const TermsAndConditions: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Termeni și Condiții | AlgoMate — Meditații BAC"
        description="Termenii și condițiile de utilizare a serviciilor de meditații AlgoMate. Informații despre înscriere, plăți, anulare și proprietate intelectuală."
        path="/termeni-si-conditii"
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
              Termeni și Condiții<span className="text-[#e8734a]">.</span>
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
            <Section title="1. Informații Generale">
              <p>
                Prezentele Termeni și Condiții reglementează utilizarea site-ului web AlgoMate
                (denumit în continuare „Site-ul") și serviciile de meditații oferite prin
                intermediul acestuia. Prin accesarea și utilizarea Site-ului, confirmați că ați
                citit, înțeles și sunteți de acord cu acești termeni.
              </p>
              <p>
                Site-ul este operat de Rădulescu Razvan (denumit în continuare „Prestatorul"),
                cu sediul în București, România. Contact:{' '}
                <a href="mailto:algomate.razvan@gmail.com" className="text-[#e8734a] hover:underline">
                  algomate.razvan@gmail.com
                </a>.
              </p>
            </Section>

            <Section title="2. Serviciile Oferite">
              <p>
                AlgoMate oferă servicii de meditații online și/sau fizice în domeniul
                Matematicii și Informaticii, cu focalizare pe pregătirea pentru examenul de
                Bacalaureat. Serviciile includ, dar nu se limitează la:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li>Sesiuni individuale sau în grupe mici de meditații</li>
                <li>Materiale educaționale furnizate în cadrul cursurilor</li>
                <li>Simulări de examen și exerciții practice</li>
                <li>Feedback personalizat pe rezolvări</li>
              </ul>
            </Section>

            <Section title="3. Înscrierea și Programarea">
              <p>
                Înscrierea la cursuri se realizează prin completarea formularului de contact
                disponibil pe Site. Înscrierea devine efectivă după confirmarea din partea
                Prestatorului, trimisă prin email sau telefon.
              </p>
              <p>
                Programul sesiunilor va fi stabilit de comun acord între Prestator și elev/părinte.
                Modificările de program trebuie comunicate cu cel puțin 24 de ore înainte de
                sesiunea programată.
              </p>
            </Section>

            <Section title="4. Prețuri și Plata">
              <p>
                Prețurile serviciilor sunt afișate pe pagina de Servicii a Site-ului și sunt
                exprimate în lei românești (RON). Prestatorul își rezervă dreptul de a modifica
                prețurile, cu notificarea prealabilă a elevilor înscriși.
              </p>
              <p>
                Plata se efectuează conform modalităților convenite la momentul înscrierii.
                Ofertele promoționale au valabilitate limitată și sunt supuse condițiilor
                specifice menționate în descrierea acestora.
              </p>
            </Section>

            <Section title="5. Anulare și Reprogramare">
              <p>
                Anularea unei sesiuni trebuie comunicată cu cel puțin 24 de ore înainte. În caz
                contrar, sesiunea va fi considerată efectuată. Reprogramarea este posibilă în
                limita disponibilității, cu notificare în timp util.
              </p>
              <p>
                Prestatorul își rezervă dreptul de a anula sau reprograma o sesiune din motive
                obiective, cu notificarea elevului în cel mai scurt timp posibil.
              </p>
            </Section>

            <Section title="6. Proprietate Intelectuală">
              <p>
                Toate materialele educaționale, conținutul Site-ului, designul, textele,
                elementele grafice și orice alt conținut sunt proprietatea exclusivă a
                Prestatorului și sunt protejate de legislația privind drepturile de autor.
              </p>
              <p>
                Este interzisă reproducerea, distribuirea sau utilizarea în scopuri comerciale
                a oricărui material furnizat în cadrul cursurilor fără acordul scris prealabil
                al Prestatorului.
              </p>
            </Section>

            <Section title="7. Răspundere">
              <p>
                Prestatorul depune toate eforturile pentru a oferi servicii de calitate superioară,
                însă nu garantează rezultate specifice la examene. Performanța academică depinde
                de implicarea și efortul individual al fiecărui elev.
              </p>
              <p>
                Prestatorul nu este responsabil pentru întreruperile temporare ale Site-ului
                cauzate de probleme tehnice, mentenanță sau circumstanțe de forță majoră.
              </p>
            </Section>

            <Section title="8. Utilizarea Site-ului">
              <p>
                Utilizatorii se angajează să folosească Site-ul în conformitate cu legislația
                în vigoare și cu prezentele condiții. Este interzisă orice utilizare abuzivă,
                inclusiv:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#bbb] ml-4">
                <li>Trimiterea de mesaje spam sau conținut ofensator prin formularul de contact</li>
                <li>Încercarea de a accesa zone restricționate ale Site-ului</li>
                <li>Orice activitate care ar putea afecta funcționarea Site-ului</li>
              </ul>
            </Section>

            <Section title="9. Modificarea Termenilor">
              <p>
                Prestatorul își rezervă dreptul de a modifica prezentele Termeni și Condiții
                în orice moment. Modificările intră în vigoare la data publicării pe Site.
                Continuarea utilizării Site-ului după publicarea modificărilor constituie
                acceptarea noilor termeni.
              </p>
            </Section>

            <Section title="10. Legislație Aplicabilă">
              <p>
                Prezentele Termeni și Condiții sunt guvernate de legislația din România. Orice
                litigiu va fi soluționat pe cale amiabilă sau, în caz contrar, de instanțele
                competente din București, România.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Pentru orice întrebări sau nelămuriri privind acești Termeni și Condiții, ne
                puteți contacta la adresa de email:{' '}
                <a href="mailto:algomate.razvan@gmail.com" className="text-[#e8734a] hover:underline">
                  algomate.razvan@gmail.com
                </a>.
              </p>
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

export default TermsAndConditions;
