---
title: "Model subiect BAC 2027 Matematică M_mate-info, rezolvat integral"
description: "Modelul oficial de subiect pentru proba de matematică M_mate-info de la Bacalaureat 2027, publicat pe 1 noiembrie, rezolvat cerință cu cerință: raționamentul, punctajul din barem și greșelile care costă puncte."
publishDate: 2026-11-04
slug: "model-subiect-bac-2027-matematica-m-mate-info-rezolvat"
category: "Examene"
math: true
coverImage: /blog/model-bac-2027-matematica-mate-info.jpg
tags:
  - Bacalaureat 2027
  - Model BAC 2027
  - Matematică M1
  - Matematică M_mate-info
  - Subiecte rezolvate
  - Meditații matematică
---

**Pe 1 noiembrie 2026, Centrul Național pentru Curriculum și Evaluare a publicat modelele de subiecte pentru Bacalaureatul 2027.** Mai jos este modelul pentru proba E. c), **Matematică M_mate-info** — proba dată de specializarea matematică-informatică (filiera teoretică) și de profilul militar, numită de obicei „M1”.

Modelul nu este o variantă de examen, ci un reper: arată structura, tipurile de cerințe și nivelul la care se va lucra în iunie. Nu are surprize de format față de anii trecuți — trei subiecte a câte 30 de puncte, plus 10 din oficiu, trei ore. Ce merită observat este *alegerea* cerințelor: aproape fiecare verifică un automatism care, lipsă, costă exact cele 5 puncte ale itemului.

Subiectul și baremul oficial sunt pe [subiecte.edu.ro](https://subiecte.edu.ro/2027/bacalaureat/modeledesubiecte/probescrise/). Recomandarea mea: printează-l, rezolvă-l cronometrat în trei ore și abia apoi citește mai departe.

:::atentie Rezolvările sunt ale mele, punctajele sunt din barem
Am rezolvat fiecare cerință și am verificat rezultatul cu baremul oficial. Unde metoda mea diferă de cea din barem, o spun. Baremul acordă punctaj pentru orice rezolvare corectă, chiar dacă diferă de cea oficială.
:::

## Subiectul I (30 de puncte)

### 1. Numere complexe

**Cerință.** Se consideră $z_1 = 1 + i$, $z_2 = 3 - 2i$ și numărul real $a$ astfel încât $z_3 = az_1 + iz_2$ este real. Determinați $z_3$.

:::solutie
$$z_3 = a(1+i) + i(3-2i) = a + ai + 3i - 2i^2 = (a+2) + (a+3)i$$

Am folosit $i^2 = -1$, deci $-2i^2 = +2$. Un număr complex este real exact când partea imaginară este zero: $a + 3 = 0$, deci $a = -3$, iar $z_3 = -3 + 2 = -1$.
:::

:::raspuns
$z_3 = -1$
:::

Cerința nu îți cere $a$, ci $z_3$. Cine scrie la final „$a = -3$” și se oprește a lucrat corect și a pierdut 2 puncte.

### 2. Funcția inversă

**Cerință.** $f : \mathbb{R} \to (3, +\infty)$, $f(x) = 2^x + 3$. Determinați $t \in (3, +\infty)$ astfel încât $f^{-1}(t) = 0$.

:::solutie
Nu este nevoie să calculezi inversa. Prin definiție, $f^{-1}(t) = 0$ înseamnă $f(0) = t$:

$$t = f(0) = 2^0 + 3 = 4$$
:::

:::raspuns
$t = 4$
:::

:::alternativa Dacă vrei totuși inversa
$y = 2^x + 3 \implies x = \log_2(y - 3)$, deci $f^{-1}(t) = \log_2(t-3) = 0 \implies t - 3 = 1$. Ajungi la fel, în de trei ori mai mulți pași — la examen, timpul acesta se plătește la Subiectul al III-lea.
:::

### 3. Ecuație irațională

**Cerință.** Rezolvați în $\mathbb{R}$ ecuația $x\sqrt{2} - \sqrt{2} = \sqrt{x^2 + 2}$.

:::solutie
Membrul drept este un radical, deci este $\geq 0$. Așadar și membrul stâng trebuie să fie $\geq 0$: $\sqrt{2}(x - 1) \geq 0$, adică $x \geq 1$. Abia acum ridicăm la pătrat:

$$2(x-1)^2 = x^2 + 2 \implies 2x^2 - 4x + 2 = x^2 + 2 \implies x^2 - 4x = 0$$

Soluțiile sunt $x = 0$ și $x = 4$. Doar $x = 4$ respectă condiția $x \geq 1$. Verificare: $4\sqrt{2} - \sqrt{2} = 3\sqrt{2} = \sqrt{18} = \sqrt{16 + 2}$.
:::

:::raspuns
$S = \{4\}$
:::

:::atentie $x = 0$ nu este soluție
Ridicarea la pătrat introduce soluții false: pentru $x = 0$ membrul stâng este $-\sqrt{2}$, negativ, iar un radical nu poate fi negativ. Baremul dă 3 din cele 5 puncte pentru eliminarea lui. Cine scrie $S = \{0, 4\}$ pierde mai mult de jumătate din item pe o greșeală de un rând.
:::

### 4. Combinatorică

**Cerință.** Câte submulțimi nevide, cu cel mult două elemente, are mulțimea $A = \{1, 3, 5, 7\}$?

:::solutie
„Nevide, cu cel mult două elemente” înseamnă submulțimi cu exact unul sau exact două elemente:

$$C_4^1 + C_4^2 = 4 + 6 = 10$$
:::

:::raspuns
10 submulțimi
:::

„Nevide” scoate mulțimea vidă; fără acest cuvânt răspunsul ar fi fost 11. Citește cerința de două ori la itemii de numărare — aici se pierd puncte nu pe calcul, ci pe un cuvânt.

### 5. Vectori și centrul de greutate

**Cerință.** În triunghiul $ABC$, cu centrul de greutate $G$, punctul $D$ este dat de $\overrightarrow{AD} = \frac{2}{3}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$. Demonstrați că $CGBD$ este paralelogram.

Ideea: un patrulater este paralelogram dacă diagonalele lui se înjumătățesc. Diagonalele lui $CGBD$ sunt $BC$ și $GD$. Mijlocul lui $BC$ îl notăm $M$; trebuie arătat că $M$ este și mijlocul lui $GD$.

:::solutie
Cu $M$ mijlocul lui $BC$: $\overrightarrow{AM} = \frac{1}{2}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$, iar $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AM} = \frac{1}{3}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$.

$$\overrightarrow{GM} = \overrightarrow{AM} - \overrightarrow{AG} = \left(\tfrac{1}{2} - \tfrac{1}{3}\right)\left(\overrightarrow{AB} + \overrightarrow{AC}\right) = \tfrac{1}{6}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$$

$$\overrightarrow{MD} = \overrightarrow{AD} - \overrightarrow{AM} = \left(\tfrac{2}{3} - \tfrac{1}{2}\right)\left(\overrightarrow{AB} + \overrightarrow{AC}\right) = \tfrac{1}{6}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$$

Deci $\overrightarrow{GM} = \overrightarrow{MD}$: $M$ este mijlocul lui $GD$. Cum $M$ este și mijlocul lui $BC$, diagonalele patrulaterului $CGBD$ se înjumătățesc, deci $CGBD$ este paralelogram.
:::

Observă că totul se exprimă în funcție de același vector, $\overrightarrow{AB} + \overrightarrow{AC}$. Este semnalul că alegerea punctului $M$ a fost bună.

### 6. Trigonometrie în triunghi

**Cerință.** Triunghiul $ABC$ are $AB = AC$, $A = \frac{2\pi}{3}$ și raza cercului circumscris $R = 2$. Determinați distanța de la $B$ la dreapta $AC$.

:::solutie
Triunghiul este isoscel, deci $B = C = \frac{1}{2}\left(\pi - \frac{2\pi}{3}\right) = \frac{\pi}{6}$. Din teorema sinusurilor:

$$BC = 2R\sin A = 4 \cdot \frac{\sqrt{3}}{2} = 2\sqrt{3}$$

Fie $D$ proiecția lui $B$ pe $AC$. În triunghiul dreptunghic $BDC$, cateta $BD$ se opune unghiului $C = \frac{\pi}{6}$:

$$BD = BC \sin C = 2\sqrt{3} \cdot \frac{1}{2} = \sqrt{3}$$
:::

:::raspuns
$d(B, AC) = \sqrt{3}$
:::

:::alternativa Prin latura AB
$AB = 2R \sin C = 4 \cdot \frac{1}{2} = 2$. Unghiul $A$ este obtuz, deci piciorul perpendicularei din $B$ cade pe prelungirea lui $CA$, iar unghiul dintre $AB$ și dreapta $AC$ este $\pi - \frac{2\pi}{3} = \frac{\pi}{3}$. Distanța este $AB \sin\frac{\pi}{3} = 2 \cdot \frac{\sqrt{3}}{2} = \sqrt{3}$. Aceeași valoare — dar desenul trebuie făcut corect, cu proiecția *în afara* triunghiului.
:::

## Subiectul al II-lea (30 de puncte)

### 1. Matrice

Se consideră $I_3$ și

$$A(x) = \begin{pmatrix} -2 & x & 0 \\ 0 & 1 & 0 \\ 0 & 3x+2 & -2 \end{pmatrix}, \quad x \in \mathbb{R}.$$

**a) Arătați că $\det(A(3)) = 4$.**

:::solutie
$$A(3) = \begin{pmatrix} -2 & 3 & 0 \\ 0 & 1 & 0 \\ 0 & 11 & -2 \end{pmatrix}$$

Dezvoltăm după prima coloană, care are un singur element nenul:

$$\det(A(3)) = -2 \cdot \begin{vmatrix} 1 & 0 \\ 11 & -2 \end{vmatrix} = -2 \cdot (-2 - 0) = 4$$
:::

Regula lui Sarrus duce la același rezultat, dar cu șase produse în loc de unul. Când o coloană sau o linie are două zerouri, dezvoltarea după ea este aproape întotdeauna mai rapidă.

**b) Arătați că $A(x) \cdot A(y) - A(x) + 2A(y) = 2I_3$, pentru orice $x, y$ reale.**

:::solutie
Produsul, element cu element:

$$A(x) \cdot A(y) = \begin{pmatrix} 4 & x - 2y & 0 \\ 0 & 1 & 0 \\ 0 & 3x - 6y - 2 & 4 \end{pmatrix}$$

De exemplu, elementul de pe linia 3, coloana 2 este $0 \cdot y + (3x+2) \cdot 1 + (-2)(3y+2) = 3x - 6y - 2$. Apoi:

$$A(x)A(y) - A(x) + 2A(y) = \begin{pmatrix} 4 + 2 - 4 & x - 2y - x + 2y & 0 \\ 0 & 1 - 1 + 2 & 0 \\ 0 & (3x - 6y - 2) - (3x+2) + (6y + 4) & 4 + 2 - 4 \end{pmatrix} = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{pmatrix} = 2I_3$$
:::

**c) Determinați $a, b$ reale pentru care $A(x) \cdot A(x) \cdot A(x) = aA(x) + bI_3$, pentru orice $x$.**

Cheia este punctul b), luat cu $y = x$. Un punct c) care pare să ceară calcularea lui $A(x)^3$ aproape niciodată nu vrea asta.

:::solutie
Din b) cu $y = x$: $A(x)^2 - A(x) + 2A(x) = 2I_3$, deci

$$A(x)^2 = 2I_3 - A(x)$$

Înmulțim cu $A(x)$ și folosim din nou relația:

$$A(x)^3 = 2A(x) - A(x)^2 = 2A(x) - \left(2I_3 - A(x)\right) = 3A(x) - 2I_3$$

Egalitatea cerută devine $(3 - a)A(x) = (b + 2)I_3$. Dacă $3 - a \neq 0$, $A(x)$ ar fi un multiplu al lui $I_3$, ceea ce este imposibil: pe diagonala lui $A(x)$ apar și $-2$, și $1$. Deci $a = 3$ și atunci $b = -2$.
:::

:::raspuns
$a = 3$, $b = -2$
:::

### 2. Lege de compoziție

Pe $\mathbb{R}$: $x * y = 2(x-1)(y-2) + 2$.

**a) Arătați că $3 * 4 = 10$.** — $2 \cdot 2 \cdot 2 + 2 = 10$.

**b) Determinați $a$ real pentru care $a * x = x$, pentru orice $x$ real.**

:::solutie
$$2(a-1)(x-2) + 2 = x \iff x(2a - 3) - 4a + 6 = 0, \quad \forall x \in \mathbb{R}$$

Un polinom de gradul I în $x$ este zero pentru orice $x$ doar dacă ambii coeficienți sunt zero: $2a - 3 = 0$ și $-4a + 6 = 0$. Amândouă dau $a = \frac{3}{2}$.
:::

:::atentie Nu este element neutru
Cerința spune doar $a * x = x$, nu și $x * a = x$. Legea nu este comutativă ($x - 1$ și $y - 2$ nu sunt simetrice), iar $x * \frac{3}{2} = -(x-1) + 2 = 3 - x$, care nu este $x$. Cine scrie „$a = \frac{3}{2}$ este elementul neutru” afirmă ceva fals — nu se depunctează explicit, dar e o greșeală de raționament care, la alt item, te va costa.
:::

**c) Determinați tripletele $(m, n, p)$ de numere naturale nenule, cu $m \leq n \leq p$, pentru care $m * (n * p) = 26$.**

:::solutie
$n * p = 2(n-1)(p-2) + 2$, deci $n * p - 2 = 2(n-1)(p-2)$ și

$$m * (n * p) = 2(m-1)\left(n * p - 2\right) + 2 = 4(m-1)(n-1)(p-2) + 2$$

Din $4(m-1)(n-1)(p-2) + 2 = 26$ obținem $(m-1)(n-1)(p-2) = 6$.

Produsul este pozitiv, deci $m \geq 2$, $n \geq 2$, $p \geq 3$. Notăm $u = m-1$, $v = n-1$, $w = p-2$, numere naturale nenule cu $uvw = 6$. Condiția $m \leq n$ înseamnă $u \leq v$, iar $n \leq p$ înseamnă $v + 1 \leq w + 2$, adică $w \geq v - 1$.

| $u$ | $v$ | $w$ | $(m, n, p)$ | $n \leq p$? |
|---|---|---|---|---|
| 1 | 1 | 6 | $(2, 2, 8)$ | da |
| 1 | 2 | 3 | $(2, 3, 5)$ | da |
| 1 | 3 | 2 | $(2, 4, 4)$ | da |
| 1 | 6 | 1 | $(2, 7, 3)$ | nu |
| 2 | 3 | 1 | $(3, 4, 3)$ | nu |

Alte descompuneri cu $u \leq v$ nu există: pentru $u = 2$ rămâne $vw = 3$ cu $v \geq 2$, adică doar $v = 3$; pentru $u \geq 3$ ar trebui $v \geq 3$ și $uv \geq 9 > 6$.
:::

:::raspuns
$(2, 2, 8)$, $(2, 3, 5)$ și $(2, 4, 4)$
:::

Tabelul nu este decorativ. La cerințele de tipul „determinați toate tripletele”, punctajul se pierde de obicei pe o soluție uitată sau pe una care nu respectă ordinea cerută. O enumerare sistematică, cu condiția verificată pe fiecare rând, le prinde pe amândouă.

## Subiectul al III-lea (30 de puncte)

### 1. Derivate și monotonie

$f : (0, +\infty) \to \mathbb{R}$, $f(x) = \dfrac{x^2 + 4x - 1}{x\sqrt{x}}$.

**a) Arătați că $f'(x) = \dfrac{\sqrt{x}(x-1)(x-3)}{2x^3}$.**

:::solutie
Scriem funcția ca sumă de puteri, ceea ce evită derivata unui cât:

$$f(x) = x^{\frac{1}{2}} + 4x^{-\frac{1}{2}} - x^{-\frac{3}{2}}$$

$$f'(x) = \tfrac{1}{2}x^{-\frac{1}{2}} - 2x^{-\frac{3}{2}} + \tfrac{3}{2}x^{-\frac{5}{2}} = \frac{x^2 - 4x + 3}{2x^{\frac{5}{2}}} = \frac{(x-1)(x-3)}{2x^2\sqrt{x}}$$

Amplificând cu $\sqrt{x}$: $\dfrac{(x-1)(x-3)}{2x^2\sqrt{x}} = \dfrac{\sqrt{x}(x-1)(x-3)}{2x^3}$, adică forma cerută.
:::

:::alternativa Metoda din barem, cu derivata câtului
$$f'(x) = \frac{(2x+4)x\sqrt{x} - (x^2+4x-1)\cdot\frac{3\sqrt{x}}{2}}{x^3} = \frac{\sqrt{x}\left(x^2 - 4x + 3\right)}{2x^3}$$

unde $(x\sqrt{x})' = \frac{3\sqrt{x}}{2}$. Corectă și ea, dar cu mai multe ocazii de a greși un semn la numărător.
:::

**b) Determinați $a \in (0, +\infty)$ pentru care tangenta la grafic în $A(a, f(a))$ este paralelă cu $Ox$.**

:::solutie
Tangenta este paralelă cu $Ox$ exact când panta ei, $f'(a)$, este zero. Cum $\sqrt{a} > 0$ și $2a^3 > 0$, $f'(a) = 0 \iff (a-1)(a-3) = 0$.
:::

:::raspuns
$a = 1$ sau $a = 3$
:::

**c) Demonstrați că $f(x) - 4f\left(\dfrac{1}{4x}\right) \leq 2$, pentru orice $x \in (0, 1]$.**

Aceasta este cerința grea a modelului. Strategia: o mărginim pe fiecare bucată separat — $f(x)$ de sus, $f\left(\frac{1}{4x}\right)$ de jos — folosind monotonia din a).

:::solutie
Din semnul lui $f'$: $f$ este crescătoare pe $(0, 1]$, descrescătoare pe $[1, 3]$ și crescătoare pe $[3, +\infty)$.

**Prima bucată.** Pentru $x \in (0, 1]$, $f$ fiind crescătoare, $f(x) \leq f(1) = \dfrac{1 + 4 - 1}{1} = 4$.

**A doua bucată.** Dacă $x \in (0, 1]$, atunci $t = \frac{1}{4x} \in \left[\frac{1}{4}, +\infty\right)$. Pe acest interval, minimul lui $f$ se atinge fie în capătul stâng, fie în punctul de minim local $t = 3$:

$$f\left(\tfrac{1}{4}\right) = \frac{\frac{1}{16} + 1 - 1}{\frac{1}{4} \cdot \frac{1}{2}} = \frac{1}{2}, \qquad f(3) = \frac{20}{3\sqrt{3}} > \frac{1}{2}$$

Deci $f(t) \geq \frac{1}{2}$ pentru orice $t \geq \frac{1}{4}$, adică $4f\left(\frac{1}{4x}\right) \geq 2$.

**Combinând:** $f(x) - 4f\left(\frac{1}{4x}\right) \leq 4 - 2 = 2$.
:::

:::atentie Nu uita minimul local
Mulți elevi văd că $f$ crește de la $\frac{1}{4}$ și concluzionează că $f\left(\frac{1}{4}\right)$ este minimul pe tot intervalul. Nu este automat: după $x = 1$ funcția *scade* până la $x = 3$. Trebuie comparat $f(3)$ cu $f\left(\frac{1}{4}\right)$ — aici $\frac{20}{3\sqrt{3}} \approx 3{,}85$, mult peste $\frac{1}{2}$, dar fără comparație argumentul are o gaură, iar baremul punctează explicit valoarea $f(3)$.
:::

### 2. Integrale

$f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^3 + x + 1$.

**a) Arătați că $\displaystyle\int_0^2 \left(f(x) - x\right)dx = 6$.**

:::solutie
$$\int_0^2 \left(x^3 + 1\right)dx = \left(\frac{x^4}{4} + x\right)\Bigg|_0^2 = 4 + 2 = 6$$
:::

**b) Arătați că $\displaystyle\int_0^1 \left(f(x) - x^3\right)e^{-x}\,dx = 2 - \frac{3}{e}$.**

:::solutie
Integrandul este $(x+1)e^{-x}$. Integrăm prin părți cu $u = x + 1$, $v' = e^{-x}$, deci $v = -e^{-x}$:

$$\int_0^1 (x+1)e^{-x}dx = -(x+1)e^{-x}\Big|_0^1 + \int_0^1 e^{-x}dx = \left(-\frac{2}{e} + 1\right) + \left(-e^{-x}\right)\Big|_0^1$$

$$= 1 - \frac{2}{e} + 1 - \frac{1}{e} = 2 - \frac{3}{e}$$
:::

:::atentie Semnul primitivei lui $e^{-x}$
O primitivă a lui $e^{-x}$ este $-e^{-x}$, nu $e^{-x}$. Greșeala aceasta schimbă tot rezultatul și este, după experiența mea, cea mai frecventă eroare la integrarea prin părți cu exponențiale.
:::

**c) Pentru $n$ natural nenul, $I_n = \displaystyle\int_0^1 \frac{x^n}{f(x) + x^2}dx$. Demonstrați că $I_n - I_{n+4} = \dfrac{1}{(n+1)(n+2)}$.**

:::solutie
Numitorul se descompune prin grupare: $f(x) + x^2 = x^3 + x^2 + x + 1 = x^2(x+1) + (x+1) = (x+1)(x^2+1)$. Apoi:

$$I_n - I_{n+4} = \int_0^1 \frac{x^n\left(1 - x^4\right)}{(x+1)(x^2+1)}dx$$

Dar $1 - x^4 = (1-x)(1+x)(1+x^2)$, deci fracția se simplifică complet:

$$I_n - I_{n+4} = \int_0^1 x^n(1-x)\,dx = \frac{1}{n+1} - \frac{1}{n+2} = \frac{1}{(n+1)(n+2)}$$
:::

Diferența $I_n - I_{n+4}$ nu este aleasă întâmplător: „$+4$” este exact exponentul care face să apară $1 - x^4$, iar $1 - x^4$ conține ambii factori ai numitorului. La cerințele cu șiruri de integrale, prima întrebare este întotdeauna *ce se simplifică dacă scad cele două integrale*.

## Ce ne spune modelul despre iunie 2027

- **Formatul rămâne cel cunoscut.** Șase itemi scurți la Subiectul I, matrice și lege de compoziție la al II-lea, derivate și integrale la al III-lea. Nicio structură nouă de învățat.
- **Punctele c) se leagă de punctele anterioare.** La matrice, c) se rezolvă din b); la funcție, c) se rezolvă din monotonia dedusă din a). Dacă ai rezolvat a) și b), primul lucru de încercat la c) este să le folosești.
- **Punctele mici se pierd pe condiții, nu pe calcul.** Condiția de existență la ecuația irațională, „nevide” la combinatorică, ordinea $m \leq n \leq p$, minimul local la III.1.c — fiecare valorează 2–3 puncte și niciuna nu cere matematică grea.

Calendarul complet al examenului — simularea din 22–25 martie și proba de matematică din 15 iunie 2027 — este în articolul despre [calendarul BAC și Evaluare Națională 2027](/blog/calendar-examene-2027). Ghidurile gratuite pe fiecare subiect de BAC M1 sunt la [resurse](/resurse).

Dacă vrei să lucrezi subiecte ca acesta cu cineva care te corectează pe parcurs, asta facem la [meditațiile de matematică online](/meditatii-matematica-online) — iar pagina de [meditații pentru liceu](/meditatii-liceu) arată ce merită consolidat în fiecare an, până la a XII-a.
