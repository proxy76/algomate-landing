# Product

## Register

brand

## Users

Two readers, arriving at the same page with different questions.

**The student** — Romanian, 14 or 18, sitting an exam that decides where they
go next (Evaluarea Națională at the end of clasa a VIII-a, Bacalaureat at the
end of a XII-a). Younger ones (clasa a V-a, a VII-a) arrive because a grade
slipped and nobody can say from what. They are usually on a phone, usually in
the evening, usually already behind on something. They want to know whether a
thing will help them and how much work it is.

**The parent** — paying, and deciding whether this person is serious. They read
the pricing and the curriculum before they read anything else, and they are
alert to being sold to, because the category is full of it.

The job to be done: *decide whether to make contact.* Every page is either
helping that decision or getting in the way of it. The free materials at
`/resurse` are the low-commitment version of the same decision — the student
who downloads a guide and finds it genuinely good is the one who books.

## Product Purpose

The site for AlgoMate, a one-person tutoring business: mathematics and computer
science (C++) for Romanian school exams. Owner and sole instructor, Răzvan
Rădulescu — Politehnică graduate, programmer, former national informatics
olympian. Sessions are **online only**, two hours, small groups.

It is a marketing site whose product is trust. There is no app, no account, no
login. Success is a filled-in form at `/inscriere` or a phone call — and,
nearly as important, the right people *not* making contact, because the site
told them plainly that the format would not suit them.

## Brand Personality

**Direct · unsold · technical.**

The voice states the uncomfortable thing before the flattering one. The Prahova
post opens by saying there are no in-person sessions anywhere, before it makes
any argument. The online-format page has a section titled *"Pentru cine nu
merge formatul acesta"*. `docs/DOWNLOADS-SECTION.md` puts it exactly right: *"a
text which claims a format has no disadvantages is advertising, not
information."*

That honesty is the entire differentiator in a category built on the opposite.
It should read as a competent person explaining something, not a business
addressing a lead. Romanian, with diacritics, always.

## Anti-references

- **The institutional / school-site register** (`.edu.ro`). Dense official
  notices, grey tables, ministry formality, information arranged for the
  institution rather than the reader. AlgoMate covers the same syllabus; it must
  not sound like the same bureaucracy.
- **The crypto-course / infomarketer playbook.** Countdown timers, scarcity
  copy, testimonial walls, "metoda mea secretă", manufactured urgency. This is
  the register the target parent is actively screening for, and any trace of it
  costs more trust than it buys attention.

Both were named by the owner. They share a failure: treating the reader as an
audience to be processed rather than a person deciding something.

## Design Principles

1. **State the limit before the benefit.** Every claim carries its own
   qualification. This is a brand rule and a copy rule, and it is why the site
   is credible.
2. **Content survives without JavaScript.** The site is fully prerendered. A
   design that depends on a mount, an animation frame, or a filter that
   unmounts is a design that ships blank — this has happened twice in
   production. Reveal enhances what is already visible.
3. **One source of truth per fact.** Prices come from `pricing.ts`, file sizes
   are read off disk, post HTML is generated. A number typed into a component is
   a number that will eventually be wrong.
4. **Free things are complete things.** The guides are ungated, unwatermarked by
   a signup wall, and whole. The material is the argument for the paid sessions;
   crippling it to drive contact would contradict principle 1.
5. **Quiet structure over decoration.** Borders, rules and mono labels carry
   information — which section this is, what this file physically is. Nothing
   is there to look designed.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Concretely, and already load-bearing on this site:

- Body text ≥4.5:1 on `#0a0a0a`. The muted `#888` used for secondary copy is
  near the floor; anything smaller or lighter needs checking, not assuming.
- **`prefers-reduced-motion: reduce` is not optional** — the prerenderer
  emulates it, so a component that animates must render its finished state
  under that setting. This is an indexing requirement as much as an
  accessibility one.
- Repeated link text must carry an `aria-label` naming its subject. Sixteen
  links reading "Descarcă PDF" are indistinguishable in a screen reader's link
  list (`docs/DOWNLOADS-SECTION.md` §4.4).
- Visible keyboard focus everywhere; the accent ring on `#0a0a0a` is the
  established pattern.
- Mobile-first reality: most students arrive on a phone. Tap targets ≥44px.
