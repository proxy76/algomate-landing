import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';
import FaqList from '../components/FaqList';
import {
  breadcrumbSchema,
  courseInformaticaBacLanding,
  faqPageSchema,
} from '../seo/structuredData';
import { GROUP_MAX_STUDENTS, priceGroupLabel, priceIndividualLabel } from '../config/pricing';

/**
 * Landing page for `meditații informatică BAC` and its long tail.
 *
 * The one page on the site written for a single query family rather than for
 * the whole offer. /servicii describes three programmes at once and cannot rank
 * for any of them; this page describes one, in the words someone actually
 * searches with.
 *
 * Two constraints on anything added here:
 *
 *   - The copy must not repeat /servicii or /curriculum. Overlap between two
 *     pages of the same site is a reason for Google to pick one and drop the
 *     other, which defeats the point of splitting them.
 *   - Every claim about the exam has to survive being wrong. The syllabus and
 *     the paper's structure are set annually by order of the ministry, so the
 *     copy states what has been stable for years and sends the reader to
 *     edu.ro for the rest, rather than inventing a point breakdown.
 */

/** Chapters, in the order they are taught, with why each one earns marks. */
const CHAPTERS = [
  {
    n: '01',
    title: 'Algoritmi elementari',
    body:
      'Prelucrări pe cifre, divizibilitate, numere prime, cmmdc. Apar an de an și, fiind primele cerințe, sunt punctele pe care nimeni nu își permite să le piardă.',
  },
  {
    n: '02',
    title: 'Tablouri unidimensionale și bidimensionale',
    body:
      'Sortări, căutare binară, interclasare, parcurgeri pe matrice. Capitolul cu cea mai mare densitate de puncte din toată programa.',
  },
  {
    n: '03',
    title: 'Șiruri de caractere',
    body:
      'Cuvinte, palindroame, conversii, funcțiile din string.h. Cerințele sunt scurte, dar greșelile de terminator și de indice costă tot punctajul cerinței.',
  },
  {
    n: '04',
    title: 'Subprograme',
    body:
      'Transmitere prin valoare și prin referință, funcții care întorc valori, tablouri ca parametri. Un subiect întreg cere, de regulă, scrierea unui subprogram.',
  },
  {
    n: '05',
    title: 'Recursivitate și backtracking',
    body:
      'Bază, pas, arbore de apeluri, generări. Capitolul care separă notele de 8 de notele de 10, pentru că nu se poate învăța pe de rost.',
  },
  {
    n: '06',
    title: 'Structuri, fișiere, alocare dinamică',
    body:
      'Înregistrări, sortare după mai multe criterii, citire până la sfârșitul fișierului, liste înlănțuite. Aici intră datele „reale”, nu doar numere.',
  },
  {
    n: '07',
    title: 'Structuri de date și grafuri',
    body:
      'Stive, cozi, arbori, grafuri neorientate și orientate, parcurgeri. Materia specifică programei de intensiv, și partea care se leagă direct de admiterea la facultățile tehnice.',
  },
];

/** How the preparation runs, start to exam. */
const STAGES = [
  {
    label: 'Ședința 1',
    title: 'Unde este elevul, de fapt',
    body:
      'Prima ședință este o evaluare, nu o lecție. Elevul primește cerințe din subiecte oficiale, de la elementar la recursivitate, și scrie cod. Rezultatul arată ce se știe, ce se crede că se știe și ce lipsește — trei lucruri diferite.',
  },
  {
    label: 'Etapa 1',
    title: 'Recuperarea bazei, cu cod scris',
    body:
      'Capitolele în ordinea de mai sus, fiecare cu teorie scurtă și mult exercițiu. Nimic nu se predă la tablă fără să fie și compilat: un algoritm care „pare corect” și unul care trece testele sunt lucruri diferite, iar la examen contează al doilea.',
  },
  {
    label: 'Etapa 2',
    title: 'Subiecte oficiale, pe capitol',
    body:
      'Se lucrează variantele din anii anteriori, grupate pe tipul cerinței, nu în ordinea în care au fost date. Elevul ajunge să recunoască tiparul unei cerințe înainte să o citească până la capăt.',
  },
  {
    label: 'Etapa 3',
    title: 'Simulări în condiții de examen',
    body:
      'Subiect complet, trei ore, fără întreruperi și fără compilator acolo unde examenul nu îl permite. Cele mai multe puncte pierdute la BAC nu se pierd din necunoaștere, ci din gestionarea timpului și din cerințe citite pe jumătate.',
  },
];

/**
 * Questions specific to this page. Rendered below and passed to
 * `faqPageSchema`, so the markup and the visible text are the same strings.
 * Deliberately different from the homepage and /servicii FAQs.
 */
const FAQS = [
  {
    q: 'În ce limbaj se dă Bacalaureatul la informatică?',
    a: 'Pregătirea se face în C/C++, limbajul în care se dă examenul în majoritatea liceelor. Programa permite și Pascal, dar el a devenit rar; dacă elevul studiază Pascal la clasă, spune-ne înainte de prima ședință, ca pregătirea să fie făcută în limbajul în care va scrie efectiv la examen.',
  },
  {
    q: 'Care este diferența dintre programa de intensiv și cea de neintensiv?',
    a: 'Programa de neintensiv se oprește, în linii mari, la subprograme, recursivitate, structuri și fișiere. Intensivul adaugă structurile de date — liste, stive, cozi, arbori — și grafurile, adică exact partea cea mai grea și cea mai bine punctată. Elevul dă proba corespunzătoare specializării lui; nu poate alege el varianta mai ușoară.',
  },
  {
    q: 'Elevul este la mate-info, dar a rămas mult în urmă la programare. Se mai poate recupera?',
    a: 'Da, dacă mai este timp până la examen și dacă se pornește de la nivelul real, nu de la programa clasei. Ordinea capitolelor de mai sus este construită tocmai pentru asta: primele acoperite sunt cele care aduc cele mai multe puncte, așa că fiecare ședință adaugă la notă chiar dacă materia nu ajunge să fie parcursă integral. Ce nu se poate face este să construiești de la zero în ultimele două săptămâni.',
  },
  {
    q: 'Cum decurge efectiv o ședință de informatică?',
    a: 'Se scrie cod, în timp real, pe un ecran partajat. Noțiunea nouă pornește de la problema pe care o rezolvă, se implementează împreună, se rulează pe cazuri limită și abia apoi elevul primește cerințe de rezolvat singur. Codul scris la ședință și notițele rămân la elev, iar tema se corectează individual înainte de întâlnirea următoare.',
  },
  {
    q: 'Nota de la informatică contează la admiterea la facultate?',
    a: 'La multe facultăți cu profil tehnic sau de informatică, media de la Bacalaureat sau nota de la o anumită probă intră în calculul admiterii — dar formula diferă de la facultate la facultate și se schimbă de la un an la altul. Verifică metodologia de admitere publicată de facultatea vizată pentru anul în care candidezi; nu te baza pe cum a fost anul trecut.',
  },
  {
    q: 'Se lucrează și pentru olimpiadă, nu doar pentru BAC?',
    a: 'Da, dar ca pregătire separată, de regulă în format individual. Materia se suprapune doar parțial: BAC-ul cere corectitudine și viteză pe tipare cunoscute, olimpiada cere algoritmi și complexitate. Amestecate în aceeași ședință, se face rău la amândouă.',
  },
];

const InformaticaBac: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Meditații Informatică BAC — C++ | Pregătire online | AlgoMate"
        description={`Meditații de informatică pentru BAC în C/C++: algoritmi, recursivitate, structuri de date, grafuri, subiecte oficiale rezolvate. Online, ${priceGroupLabel}/ședință în grupă de max ${GROUP_MAX_STUDENTS} elevi.`}
        path="/meditatii-informatica-bac"
        jsonLd={[
          courseInformaticaBacLanding,
          faqPageSchema(FAQS),
          breadcrumbSchema([
            { name: 'Meditații informatică BAC', path: '/meditatii-informatica-bac' },
          ]),
        ]}
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* ── Header ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Informatică BAC
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                C / C++
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[2.5rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight max-w-3xl">
                Meditații <em className="italic text-[#e8734a] font-normal">informatică</em> BAC.
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <Terminal size={20} strokeWidth={1.5} className="text-[#e8734a]" />
                <p className="font-mono text-[11px] md:text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                  → Pregătire online, în C++
                </p>
              </div>
            </div>

            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Pregătire pentru <strong className="text-[#e4e4e4] font-medium">proba de
                informatică de la Bacalaureat</strong>, în C/C++, pentru elevii de la profilul
                matematică-informatică — atât programa de intensiv, cât și cea de neintensiv.
                Ședințele sunt online și sunt susținute de Răzvan Rădulescu, student la
                Politehnica din București, programator și premiant la olimpiade și concursuri
                naționale de informatică.
              </p>
              <p>
                Informatica este materia la care diferența dintre a ști teoria și a lua notă
                mare este cea mai mare din tot Bacalaureatul. Un elev poate explica perfect ce
                face backtracking-ul și să nu scoată un program care compilează. De aceea la
                fiecare ședință se scrie cod care se rulează, nu pseudocod pe caiet.
              </p>
              <p>
                Mai jos: ce se cere efectiv la examen, capitolele în ordinea în care aduc
                puncte, cum decurge pregătirea de la prima ședință până la simulări, și
                răspunsuri la întrebările care apar înainte de înscriere.
              </p>
            </div>
          </motion.div>

          {/* ── What the exam asks ─────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Ce se cere la examen</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              O probă de scris cod, nu de povestit despre cod.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Informatica este o probă la alegere a profilului și a specializării — o dai
                dacă ești la matematică-informatică, iar varianta de programă, intensiv sau
                neintensiv, o decide specializarea, nu preferința elevului. Proba este scrisă,
                durează trei ore și are trei subiecte, cu zece puncte acordate din oficiu, ca
                la toate probele de Bacalaureat.
              </p>
              <p>
                Cerințele nu sunt teoretice. Ți se dă o secvență de cod și ți se cere ce
                afișează; ți se dă o problemă și ți se cere subprogramul care o rezolvă; ți se
                dă un tablou sau un fișier și ți se cere prelucrarea. Punctajul se acordă pe cod
                care funcționează, cu tot cu cazurile de la margine — tabloul gol, un singur
                element, valori egale.
              </p>
              <p>
                Programa exactă și structura variantelor se stabilesc anual prin ordin de
                ministru. Înainte de a-ți construi planul de pregătire, verifică programa în
                vigoare pentru anul tău pe{' '}
                <a
                  href="https://www.edu.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  edu.ro
                </a>
                . Restul paginii descrie materia care a rămas stabilă de ani buni.
              </p>
            </div>
          </motion.section>

          {/* ── Chapters ───────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Capitolele, în ordinea punctajului</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Ce se învață, și în ce ordine.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Ordinea de mai jos nu este cea din manual. Se începe cu ce apare în fiecare
              variantă și se termină cu ce apare doar la intensiv, astfel încât un elev care
              intră în pregătire târziu să câștige puncte de la prima lună.
            </p>

            <div className="border-t border-[#222] max-w-4xl">
              {CHAPTERS.map((c) => (
                <div
                  key={c.n}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-[#222]"
                >
                  <div className="md:col-span-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#666] tabular-nums">
                      {c.n}
                    </span>
                  </div>
                  <div className="md:col-span-11 max-w-2xl">
                    <h3 className="font-sans font-semibold text-lg text-[#e4e4e4] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-[0.95rem] text-[#999] leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[0.95rem] text-[#888] leading-relaxed max-w-2xl mt-8">
              Programa completă, capitol cu capitol și cu duratele estimate, este pe pagina de{' '}
              <Link
                to="/curriculum"
                className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
              >
                curriculum
              </Link>
              .
            </p>
          </motion.section>

          {/* ── How the preparation runs ───────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Cum decurge pregătirea</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              De la prima ședință până la simulare.
            </h2>

            <div className="border-t border-[#222] max-w-4xl mt-12">
              {STAGES.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-[#222]"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8734a] tabular-nums">
                      {s.label}
                    </span>
                  </div>
                  <div className="md:col-span-9 max-w-2xl">
                    <h3 className="font-sans font-semibold text-lg text-[#e4e4e4] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-[0.95rem] text-[#999] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Why with a programmer ──────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>De ce contează cine predă</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Informatică predată de cineva care scrie cod.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Informatica de liceu se predă frecvent ca o listă de rețete: iată cum arată
                sortarea prin selecție, învaț-o. Funcționează până la prima cerință formulată
                altfel decât în manual — și la examen cerințele sunt formulate altfel.
              </p>
              <p>
                Ședințele sunt susținute de cineva care scrie cod în afara meditațiilor, cu
                rezultate la olimpiade și concursuri naționale de informatică, la Politehnica
                din București. Practic, asta înseamnă că explicația pornește de la ce face
                algoritmul și de ce, nu de la cum se memorează, și că erorile de compilare ale
                elevului sunt citite și înțelese pe loc, nu ocolite.
              </p>
              <p>
                Ședințele se țin în grupe de maximum {GROUP_MAX_STUDENTS} elevi
                ({priceGroupLabel}/ședință) sau individual ({priceIndividualLabel}/ședință),
                două ore, online. Diferența dintre cele două formate și ce include prețul sunt
                explicate pe pagina de{' '}
                <Link
                  to="/servicii"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  servicii
                </Link>
                .
              </p>
            </div>
          </motion.section>

          {/* ── FAQ ────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Întrebări frecvente</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-10 max-w-2xl">
              Ce se întreabă înainte de prima ședință.
            </h2>
            <FaqList items={FAQS} />
          </motion.section>

          {/* ── CTA ────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mt-24 md:mt-32 pt-10 border-t border-[#222]"
          >
            <p className="text-[#b8b8b8] leading-relaxed mb-7">
              Prima ședință este o evaluare a nivelului real, iar după ea primești un plan
              concret: ce capitole, în ce ordine, până la examen. Scrie în formular ce
              specializare are elevul și cât timp mai este până la probă — se răspunde în 24 de
              ore. Merită citit și{' '}
              <Link
                to="/blog"
                className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
              >
                blogul
              </Link>
              , unde subiectele de examen sunt rezolvate integral, cerință cu cerință.
            </p>
            <Link to="/inscriere">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 inline-flex items-center gap-3"
              >
                Rezervă prima ședință
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </Link>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default InformaticaBac;
