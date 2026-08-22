import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';
import FaqList from '../components/FaqList';
import {
  breadcrumbSchema,
  courseMatematicaOnline,
  faqPageSchema,
} from '../seo/structuredData';
import { GROUP_MAX_STUDENTS, priceGroupLabel, priceIndividualLabel } from '../config/pricing';

/**
 * Landing page for `meditații matematică online`.
 *
 * This page argues the *format*: what actually happens in a two-hour online
 * maths session, what the student needs, what is genuinely better and what is
 * genuinely worse than sitting in the same room.
 *
 * It must not overlap /meditatii-matematica-bucuresti, which argues the place.
 * The rule of thumb: nothing here should depend on where the reader lives, and
 * nothing there should depend on how the session runs.
 *
 * The "ce nu funcționează online" section stays. A page that claims a format
 * has no downsides reads as marketing and converts worse than one that names
 * them.
 */

const FAQS = [
  {
    q: 'De ce am nevoie ca să pot participa la o ședință online?',
    a: 'Un laptop sau un calculator cu o conexiune stabilă la internet, căști cu microfon și, ideal, un caiet lângă tine. Nu este nevoie de tabletă grafică, de imprimantă sau de vreun program plătit. Elevii care au o tabletă grafică o folosesc, dar diferența este de confort, nu de rezultat.',
  },
  {
    q: 'Cum se scrie matematica pe ecran — nu e mai greu decât pe hârtie?',
    a: 'Se folosește o tablă digitală partajată, pe care scriu și profesorul, și elevul, în timp real. Avantajul față de tabla obișnuită este că nimic nu se șterge: la finalul ședinței, tot ce s-a scris rămâne ca document și ajunge la elev. Un caiet de clasă, în schimb, conține doar ce a apucat elevul să copieze.',
  },
  {
    q: 'De unde știu că elevul chiar lucrează, și nu doar se uită?',
    a: 'Pentru că i se cere să scrie. Structura ședinței alternează explicație și rezolvare, iar în partea a doua elevul lucrează singur pe tablă, cu profesorul privind. Un elev care nu lucrează se vede în două minute — la fel ca într-o sală, doar că aici nu se poate ascunde în spatele altcuiva, fiind maximum ' + GROUP_MAX_STUDENTS + ' într-o grupă.',
  },
  {
    q: 'Ce se întâmplă dacă pică internetul în timpul ședinței?',
    a: 'Se reia legătura și se continuă; dacă întreruperea este lungă, timpul pierdut se recuperează la finalul ședinței sau la următoarea. Nu se plătește timp în care nu s-a lucrat. Fiind ședințe de două ore, câteva minute de reconectare nu compromit lecția.',
  },
  {
    q: 'Rămâne ceva scris după ședință, sau totul dispare la închiderea apelului?',
    a: 'Rămâne. Elevul primește notițele ședinței — adică exact ce s-a scris pe tablă — plus tema pentru acasă. Tema se corectează individual înainte de întâlnirea următoare, iar ședința următoare începe de la greșelile din ea.',
  },
  {
    q: 'Pentru ce fel de elev NU merge formatul online?',
    a: 'Pentru un elev foarte mic sau foarte ușor de distras, care are nevoie de cineva fizic lângă el ca să rămână la masă. Și pentru cel care nu vrea deloc să facă meditații și vine pentru că insistă părintele — online îi este mai ușor să se deconecteze mental. Formatul nu creează motivație; o presupune.',
  },
];

/** What the two hours actually contain. Distinct from the /servicii timeline. */
const MECHANICS = [
  {
    title: 'Tablă digitală partajată, nu slide-uri',
    body:
      'Se scrie de mână, cu mouse-ul sau cu tableta grafică, exact cum s-ar scrie pe hârtie. Elevul scrie pe aceeași tablă, nu doar privește. Nimic nu este pregătit dinainte ca prezentare — o demonstrație construită în fața elevului se înțelege altfel decât una derulată.',
  },
  {
    title: 'Totul rămâne ca document',
    body:
      'La final, tabla ședinței devine notițele elevului. Asta rezolvă o problemă reală a meditațiilor clasice: elevul care copiază în timp ce profesorul explică nu ascultă, iar cel care ascultă nu are ce reciti acasă.',
  },
  {
    title: 'Tema se corectează în scris, între ședințe',
    body:
      'Elevul trimite tema fotografiată sau scrisă digital, iar ea revine adnotată, cu ce e greșit și de ce, înainte de întâlnirea următoare. Într-o ședință față în față, corectarea temei consumă din cele două ore; aici nu.',
  },
  {
    title: 'Întrebări între ședințe, pe mesaje',
    body:
      'Un blocaj la o problemă nu așteaptă o săptămână. Întrebările scurte primesc răspuns pe mesaje, ceea ce este mai simplu de făcut online decât într-un aranjament în care contactul se limitează la vizita săptămânală.',
  },
];

const MatematicaOnline: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Meditații Matematică Online — BAC și Evaluare Națională | AlgoMate"
        description={`Meditații de matematică online, în ședințe de 2 ore cu tablă digitală partajată și notițe după fiecare întâlnire. Grupe de max ${GROUP_MAX_STUDENTS} elevi, ${priceGroupLabel}/ședință.`}
        path="/meditatii-matematica-online"
        jsonLd={[
          courseMatematicaOnline,
          faqPageSchema(FAQS),
          breadcrumbSchema([
            { name: 'Meditații matematică online', path: '/meditatii-matematica-online' },
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
                § AlgoMate / Online
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                2h / ședință
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[2.5rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight max-w-3xl">
                Meditații <em className="italic text-[#e8734a] font-normal">matematică</em> online.
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <Video size={20} strokeWidth={1.5} className="text-[#e8734a]" />
                <p className="font-mono text-[11px] md:text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                  → Tablă digitală partajată
                </p>
              </div>
            </div>

            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                <strong className="text-[#e4e4e4] font-medium">Meditații de matematică online</strong>,
                pentru Bacalaureat și Evaluarea Națională, în ședințe de două ore. Ședințele sunt
                susținute de Răzvan Rădulescu, student la Politehnica din București și premiant la
                olimpiade și concursuri naționale.
              </p>
              <p>
                Întrebarea reală nu este dacă online-ul „funcționează”, ci ce se schimbă concret
                față de o oră petrecută în aceeași cameră. Pagina aceasta răspunde la asta: cum se
                scrie matematică pe ecran, ce rămâne elevului după ședință, cum se corectează tema
                — și pentru cine formatul chiar nu este potrivit.
              </p>
              <p>
                Dacă ești din București și te interesa în primul rând partea locală, ea este pe
                pagina de{' '}
                <Link
                  to="/meditatii-matematica-bucuresti"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  meditații matematică București
                </Link>
                .
              </p>
            </div>
          </motion.div>

          {/* ── How it works ───────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Cum arată o ședință</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Ce se întâmplă în cele două ore.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Nu o prelegere filmată și nu un curs înregistrat. O ședință în care se scrie, se
              greșește și se corectează în timp real, cu unu până la {GROUP_MAX_STUDENTS} elevi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222] max-w-4xl">
              {MECHANICS.map((m) => (
                <div key={m.title} className="bg-[#0a0a0a] p-7 md:p-9">
                  <h3 className="font-sans font-semibold text-lg text-[#f0f0f0] mb-3">
                    {m.title}
                  </h3>
                  <p className="text-[0.95rem] text-[#999] leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>

            <p className="text-[0.95rem] text-[#888] leading-relaxed max-w-2xl mt-8">
              Structura pe minute a ședinței — tema, noțiunea nouă, problemele, recapitularea —
              este descrisă pe pagina de{' '}
              <Link
                to="/servicii"
                className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
              >
                servicii
              </Link>
              , împreună cu prețurile: {priceGroupLabel}/ședință în grupă, {priceIndividualLabel}{' '}
              individual.
            </p>
          </motion.section>

          {/* ── Honest limits ──────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Ce se pierde, totuși</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Partea pe care nimeni nu o scrie.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Se pierde privirea peste umăr. Într-o sală, profesorul vede din mers că un elev a
                scris greșit un semn și intervine înainte ca greșeala să se propage. Online, asta
                se recuperează cerându-i elevului să scrie pe tabla partajată în loc pe caietul
                lui — dar este o corecție deliberată, nu ceva ce se întâmplă de la sine.
              </p>
              <p>
                Se pierde și presiunea blândă a prezenței fizice. Un elev de clasa a VIII-a care
                are nevoie de cineva lângă el ca să nu se ridice de la masă va profita mai mult de
                o oră față în față. Pentru un elev de liceu care își asumă pregătirea, diferența
                aceasta dispare aproape complet.
              </p>
              <p>
                În rest, ce contează la matematică — cât de bine este explicată noțiunea, câte
                probleme se rezolvă și cât de repede sunt corectate greșelile — nu depinde de
                distanța dintre cele două scaune.
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
              Despre format, nu despre materie.
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
              Cel mai simplu mod de a afla dacă formatul i se potrivește elevului este prima
              ședință, care este oricum o evaluare a nivelului. Scrie în formular clasa și
              examenul vizat — se răspunde în 24 de ore.
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

export default MatematicaOnline;
