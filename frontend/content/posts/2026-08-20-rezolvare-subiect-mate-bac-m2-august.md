---
title: "Rezolvare subiect Mate BAC M2 august 2026 — M_tehnologic, varianta 4"
description: "Subiectul de matematică M2 (M_tehnologic) dat la Bacalaureat în sesiunea august 2026, rezolvat integral: toate cele 15 cerințe, cu explicații pas cu pas, metode alternative și greșelile care costă puncte."
publishDate: 2026-08-20
slug: "rezolvare-subiect-mate-bac-m2-august-2026"
category: "Examene"
math: true
tags:
  - Bacalaureat 2026
  - Sesiunea august 2026
  - Matematică M2
  - Matematică M_tehnologic
  - Subiecte rezolvate
  - Meditații matematică
---

**Acesta este subiectul de matematică dat în sesiunea specială din august 2026** — a doua sesiune a Bacalaureatului 2026, cunoscută și ca sesiunea de toamnă. Proba: E. c) Matematică **M_tehnologic**, numită în vorbirea curentă și **M2**, varianta 4.

Este un subiect „de manual” în cel mai bun sens: nu are nicio capcană spectaculoasă, dar verifică exact acele opt–zece automatisme care decid dacă ieși cu 6 sau cu 9.

Mai jos ai toate cele 15 cerințe rezolvate, cu raționamentul explicat, nu doar cu rezultatul. Recomandarea mea: rezolvă întâi singur, cronometrat, apoi citește. O rezolvare citită înainte de a fi încercată nu te învață aproape nimic.

## Despre ce sesiune și ce programă este vorba

Ca să nu fie confuzie — la Bacalaureat sunt mai multe probe de matematică, iar în fiecare an sunt două sesiuni:

- **Sesiunea**: august 2026, a doua sesiune (de toamnă) a Bacalaureatului 2026. Prima sesiune are loc în iunie–iulie.
- **Proba**: E. c) Matematică **M_tehnologic** — programa pentru filiera tehnologică. Este programa căreia i se spune curent **M2**. Dacă ești la mate-info sau la științele naturii, ai altă programă și alt subiect.
- **Varianta**: 4.

Subiectele și baremele oficiale se publică pe [subiecte.edu.ro](https://subiecte.edu.ro) după fiecare probă.

## Cum arată proba

Structura este identică la toate variantele de M_tehnologic (filiera tehnologică — profilul servicii, resurse și tehnic):

- **Subiectul I** — 30 de puncte, șase exerciții scurte din toată materia de liceu;
- **Subiectul al II-lea** — 30 de puncte, matrice și polinoame, câte trei cerințe fiecare;
- **Subiectul al III-lea** — 30 de puncte, analiză matematică: derivate și integrale;
- **10 puncte din oficiu**, timp de lucru **3 ore**.

Cu 10 din oficiu, promovarea (nota 5) înseamnă 40 de puncte, adică opt cerințe rezolvate corect. Subiectul I complet plus două cerințe de tip a) îți dă exact atât. Merită să știi asta înainte de examen, ca să nu îți pierzi jumătate de oră blocat la un c).

---

## Subiectul I

### 1. Arătați că $\frac{1}{5}\left(3 + \frac{1}{3}\right) + \frac{4}{3} = 2$

Regula de aur: **întâi paranteza, cu numitor comun**.

:::solutie
$$3 + \frac{1}{3} = \frac{9}{3} + \frac{1}{3} = \frac{10}{3}$$

$$\frac{1}{5} \cdot \frac{10}{3} = \frac{10}{15} = \frac{2}{3}$$

$$\frac{2}{3} + \frac{4}{3} = \frac{6}{3} = 2$$
:::

### 2. $f(x) = 2x - 3$. Determinați $a$ real pentru care $f(a) - f(4) = 4$

:::solutie
$f(4) = 2 \cdot 4 - 3 = 5$, iar $f(a) = 2a - 3$. Înlocuim:

$$2a - 3 - 5 = 4 \implies 2a = 12 \implies a = 6$$
:::

:::raspuns
$a = 6$
:::

:::alternativa
Pentru orice funcție de gradul I, $f(a) - f(4) = 2(a - 4)$. Deci $2(a-4) = 4$, de unde $a = 6$ direct.
:::

### 3. Rezolvați ecuația $2^{\,1-x} = 2^{\,3+x}$

:::solutie
Bazele sunt egale și funcția exponențială este injectivă, deci exponenții sunt egali:

$$1 - x = 3 + x \implies -2x = 2 \implies x = -1$$
:::

:::raspuns
$x = -1$
:::

### 4. După o scumpire cu 20%, un obiect costă 48 de lei. Care era prețul inițial?

:::solutie
Fie $p$ prețul inițial. După scumpire, prețul este $p + 20\% \cdot p = 1{,}2 \cdot p$:

$$1{,}2 \cdot p = 48 \implies p = \frac{48}{1{,}2} = 40$$

Verificare rapidă: $20\%$ din $40$ este $8$, iar $40 + 8 = 48$. ✔
:::

:::raspuns
Prețul inițial era de **40 de lei**.
:::

:::atentie Procentul se aplică prețului vechi
$48 - 20\% \cdot 48 = 38{,}4$ **este greșit**, pentru că procentul se aplică prețului vechi, nu celui nou.
:::

### 5. $A(2, 5)$, $B(6, 8)$. Arătați că $OB = 2 \cdot AB$

:::solutie
$O$ este originea, $O(0, 0)$. Folosim formula distanței:

$$OB = \sqrt{(6-0)^2 + (8-0)^2} = \sqrt{36 + 64} = \sqrt{100} = 10$$

$$AB = \sqrt{(6-2)^2 + (8-5)^2} = \sqrt{16 + 9} = \sqrt{25} = 5$$

Cum $10 = 2 \cdot 5$, rezultă $OB = 2 \cdot AB$. ✔
:::

### 6. Triunghiul $ABC$, dreptunghic în $A$, cu $AB = 4$ și $BC = 6$. Arătați că aria este $4\sqrt{5}$

Dreptunghic în $A$ înseamnă că **$BC$ este ipotenuza**.

:::solutie
Din teorema lui Pitagora:

$$AC^2 = BC^2 - AB^2 = 36 - 16 = 20 \implies AC = \sqrt{20} = 2\sqrt{5}$$

Aria unui triunghi dreptunghic este semiprodusul catetelor:

$$\mathcal{A} = \frac{AB \cdot AC}{2} = \frac{4 \cdot 2\sqrt{5}}{2} = 4\sqrt{5}$$
:::

---

## Subiectul al II-lea

### 1. Matricea $A(a) = \begin{pmatrix} 1 & a-1 \\ 3a-3 & 3a-2 \end{pmatrix}$

**a) Arătați că $\det(A(2)) = 1$**

:::solutie
Înlocuim $a = 2$:

$$A(2) = \begin{pmatrix} 1 & 1 \\ 3 & 4 \end{pmatrix}$$

$$\det(A(2)) = 1 \cdot 4 - 1 \cdot 3 = 4 - 3 = 1$$

✔ Determinantul este 1.
:::

**b) Arătați că $2A(2) + A(5) = 3A(3)$**

:::solutie
Calculăm fiecare matrice separat, apoi comparăm membru cu membru:

$$2A(2) = \begin{pmatrix} 2 & 2 \\ 6 & 8 \end{pmatrix}, \qquad A(5) = \begin{pmatrix} 1 & 4 \\ 12 & 13 \end{pmatrix}$$

$$2A(2) + A(5) = \begin{pmatrix} 3 & 6 \\ 18 & 21 \end{pmatrix}$$

$$A(3) = \begin{pmatrix} 1 & 2 \\ 6 & 7 \end{pmatrix} \implies 3A(3) = \begin{pmatrix} 3 & 6 \\ 18 & 21 \end{pmatrix}$$

Cele două rezultate coincid. ✔
:::

**c) Determinați $X \in \mathcal{M}_2(\mathbb{R})$ pentru care $2X \cdot A(2) - A(2) = A(6)$**

:::solutie
Izolăm produsul care conține $X$:

$$2X \cdot A(2) = A(6) + A(2)$$

$$A(6) + A(2) = \begin{pmatrix} 1 & 5 \\ 15 & 16 \end{pmatrix} + \begin{pmatrix} 1 & 1 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 2 & 6 \\ 18 & 20 \end{pmatrix}$$

Împărțim la 2:

$$X \cdot A(2) = \begin{pmatrix} 1 & 3 \\ 9 & 10 \end{pmatrix}$$

Cum $\det(A(2)) = 1 \neq 0$, matricea este inversabilă, iar inversa se scrie imediat — schimbi elementele de pe diagonala principală, schimbi semnul celorlalte, totul împărțit la determinant, care aici este $1$:

$$A(2)^{-1} = \begin{pmatrix} 4 & -1 \\ -3 & 1 \end{pmatrix}$$

Înmulțim **la dreapta** cu $A(2)^{-1}$:

$$X = \begin{pmatrix} 1 & 3 \\ 9 & 10 \end{pmatrix} \cdot \begin{pmatrix} 4 & -1 \\ -3 & 1 \end{pmatrix} = \begin{pmatrix} -5 & 2 \\ 6 & 1 \end{pmatrix}$$
:::

:::atentie Ordinea contează
Înmulțirea matricelor nu este comutativă. Aici se înmulțește **la dreapta** cu $A(2)^{-1}$; dacă înmulțești la stânga, obții alt rezultat.
:::

:::raspuns
$X = \begin{pmatrix} -5 & 2 \\ 6 & 1 \end{pmatrix}$
:::

:::alternativa
Dacă nu ești sigur pe inverse: scrii $X = \begin{pmatrix} x & y \\ z & t \end{pmatrix}$, faci produsul $X \cdot A(2)$ și obții un sistem de patru ecuații:

$$x + 3y = 1, \quad x + 4y = 3, \quad z + 3t = 9, \quad z + 4t = 10$$

Rezultă $y = 2$, $x = -5$, $t = 1$, $z = 6$ — același răspuns, cu ceva mai mult calcul.
:::

### 2. Polinomul $f = X^3 - 3X^2 - 2X + m$

**a) Pentru $m = 9$, arătați că $f(-1) = 7$**

:::solutie
$$f(-1) = (-1)^3 - 3 \cdot (-1)^2 - 2 \cdot (-1) + 9 = -1 - 3 + 2 + 9 = 7$$
:::

:::atentie Semnele la puteri
$(-1)^2 = +1$, deci $-3 \cdot (-1)^2 = -3$, iar $-2 \cdot (-1) = +2$. Aici se pierd puncte pe calcul, nu pe metodă.
:::

**b) Determinați $m$ pentru care $2$ este rădăcină a lui $f$**

:::solutie
„$2$ este rădăcină” înseamnă exact $f(2) = 0$:

$$8 - 12 - 4 + m = 0 \implies m - 8 = 0 \implies m = 8$$
:::

:::raspuns
$m = 8$
:::

**c) Restul împărțirii lui $f$ la $g = X - 4$ este $14$. Determinați rădăcinile lui $f$**

Aici se folosește **teorema restului**: restul împărțirii lui $f$ la $X - 4$ este $f(4)$. Nu ai nevoie de nicio împărțire efectivă.

:::solutie
$$f(4) = 64 - 48 - 8 + m = m + 8 = 14 \implies m = 6$$

Deci $f = X^3 - 3X^2 - 2X + 6$. Descompunem prin grupare:

$$f = X^2(X - 3) - 2(X - 3) = (X - 3)(X^2 - 2)$$
:::

:::raspuns
$x_1 = 3$, $x_2 = \sqrt{2}$, $x_3 = -\sqrt{2}$
:::

---

## Subiectul al III-lea

### 1. $f : (-3, +\infty) \to \mathbb{R}$, $f(x) = \dfrac{x^2 - 5}{x + 3}$

**a) Arătați că $f'(x) = \dfrac{x^2 + 6x + 5}{(x + 3)^2}$**

:::solutie
Aplicăm regula de derivare a câtului, $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$, cu $u = x^2 - 5$ și $v = x + 3$:

$$f'(x) = \frac{2x(x + 3) - (x^2 - 5) \cdot 1}{(x + 3)^2}$$

Numărătorul:

$$2x^2 + 6x - x^2 + 5 = x^2 + 6x + 5$$

Deci $f'(x) = \dfrac{x^2 + 6x + 5}{(x + 3)^2}$, pentru orice $x \in (-3, +\infty)$. ✔
:::

:::atentie Paranteza de la scădere
Greșeala care apare cel mai des: uitarea parantezei la $-(x^2 - 5)$, care transformă $+5$ în $-5$ și strică tot restul subiectului.
:::

**b) Ecuația tangentei în punctul de abscisă $x = -1$**

:::solutie
Ecuația tangentei este $y - f(x_0) = f'(x_0)(x - x_0)$, cu $x_0 = -1$.

$$f(-1) = \frac{(-1)^2 - 5}{-1 + 3} = \frac{1 - 5}{2} = -2$$

$$f'(-1) = \frac{(-1)^2 + 6(-1) + 5}{(-1 + 3)^2} = \frac{1 - 6 + 5}{4} = 0$$

Panta fiind $0$, tangenta este orizontală:

$$y - (-2) = 0 \cdot (x + 1) \implies y = -2$$
:::

:::raspuns
$y = -2$
:::

Cu alte cuvinte, $x = -1$ este punct de extrem local al funcției — de aceea derivata se anulează acolo.

**c) Ecuația asimptotei oblice**

:::solutie
Asimptota oblică spre $+\infty$ are forma $y = mx + n$, cu:

$$m = \lim_{x \to +\infty} \frac{f(x)}{x} = \lim_{x \to +\infty} \frac{x^2 - 5}{x^2 + 3x} = 1$$

$$n = \lim_{x \to +\infty} \big(f(x) - x\big) = \lim_{x \to +\infty} \frac{x^2 - 5 - x^2 - 3x}{x + 3} = \lim_{x \to +\infty} \frac{-3x - 5}{x + 3} = -3$$
:::

:::raspuns
$y = x - 3$
:::

:::alternativa Verificare în 10 secunde
Împarte polinoamele. Cum $x^2 - 5 = (x + 3)(x - 3) + 4$, avem:

$$f(x) = x - 3 + \frac{4}{x + 3}$$

Termenul $\frac{4}{x+3}$ tinde la $0$, deci graficul se lipește de dreapta $y = x - 3$. Aceeași concluzie, fără limite.
:::

### 2. $f : (-2, +\infty) \to \mathbb{R}$, $f(x) = \dfrac{e^x}{x + 2}$

**a) Arătați că $\displaystyle\int_0^1 (x + 2) f(x)\,dx = e - 1$**

Cheia este să simplifici **înainte** de a integra.

:::solutie
$$(x + 2) f(x) = (x + 2) \cdot \frac{e^x}{x + 2} = e^x$$

$$\int_0^1 e^x\,dx = e^x \Big|_0^1 = e^1 - e^0 = e - 1$$
:::

**b) Arătați că $\displaystyle\int_0^6 \frac{f(x)}{e^x}\,dx = 2\ln 2$**

:::solutie
Aceeași idee de simplificare:

$$\frac{f(x)}{e^x} = \frac{e^x}{(x + 2) e^x} = \frac{1}{x + 2}$$

$$\int_0^6 \frac{1}{x + 2}\,dx = \ln(x + 2) \Big|_0^6 = \ln 8 - \ln 2 = \ln\frac{8}{2} = \ln 4 = 2\ln 2$$
:::

:::atentie Unde dispare modulul
Primitiva este $\ln|x + 2|$, dar pe intervalul $[0, 6]$ avem $x + 2 > 0$, deci modulul se poate scoate fără discuție. Pe un interval care conține $-2$ nu ai voie.
:::

**c) Determinați $a$ real pentru care $\displaystyle\int_0^1 \left(a - \frac{1}{f(x)}\right) dx = \frac{4}{e}$**

:::solutie
Mai întâi, inversul funcției:

$$\frac{1}{f(x)} = \frac{x + 2}{e^x} = (x + 2)e^{-x}$$

Această integrală se face **prin părți**, cu $u = x + 2$ și $v' = e^{-x}$, deci $v = -e^{-x}$:

$$\int (x + 2)e^{-x}\,dx = -(x + 2)e^{-x} + \int e^{-x}\,dx = -(x + 2)e^{-x} - e^{-x} = -(x + 3)e^{-x}$$

Evaluăm între $0$ și $1$:

$$\int_0^1 (x + 2)e^{-x}\,dx = \Big[-(x + 3)e^{-x}\Big]_0^1 = -\frac{4}{e} + 3 = 3 - \frac{4}{e}$$

Revenim la ecuație, folosind liniaritatea integralei $\left(\int_0^1 a\,dx = a\right)$:

$$a - \left(3 - \frac{4}{e}\right) = \frac{4}{e} \implies a = \frac{4}{e} + 3 - \frac{4}{e} \implies a = 3$$
:::

:::raspuns
$a = 3$
:::

Frumusețea cerinței: termenii cu $\frac{4}{e}$ se anulează, iar răspunsul iese număr întreg. Dacă îți iese ceva urât, ai greșit semnul la integrarea prin părți.

---

## Ce se repetă la M_tehnologic, an de an

Dacă te uiți la cinci variante consecutive, vezi același schelet:

1. **Subiectul I** — calcul cu fracții, o funcție de gradul I, o ecuație exponențială sau logaritmică simplă, un procent, o distanță în reperul xOy, un triunghi dreptunghic.
2. **Subiectul al II-lea, punctul 1** — un determinant $2 \times 2$, o verificare de egalitate matriceală și o ecuație cu matrice rezolvată prin inversă.
3. **Subiectul al II-lea, punctul 2** — valoarea polinomului într-un punct, teorema restului (Bézout) și o descompunere prin grupare.
4. **Subiectul al III-lea** — derivata unui cât, tangenta la grafic, asimptota oblică, apoi două integrale în care simplificarea se vede din prima și una prin părți.

Asta înseamnă că **pregătirea eficientă nu este „să știi toată matematica”, ci să automatizezi vreo 12 tipare**. Un elev care rezolvă 10 variante complete, cronometrat, intră în examen cu un avantaj enorm față de unul care a citit teoria de trei ori.

## Cele patru greșeli care costă cei mai mulți bani

- **Paranteza uitată la scădere** — la derivata câtului și la scăderea de polinoame. Se pierd 5 puncte pentru un semn.
- **Procentul aplicat greșit** — la exercițiul cu scumpirea, se raportează la prețul *vechi*.
- **Ordinea la înmulțirea matricelor** — $A \cdot B \neq B \cdot A$. Dacă $X$ apare la stânga, înmulțești cu inversa tot la dreapta.
- **Rezultat neîncadrat sau nefinalizat** — la cerințele „Arătați că…”, trebuie să ajungi explicit la forma cerută. Corectorul nu completează el ultimul rând.

## Vrei să lucrezi variantele cu cineva lângă tine?

La [AlgoMate](https://algomate.ro/) facem **meditații de matematică pentru Bacalaureat** — pentru toate programele, de la mate-info până la tehnologic și pedagogic — online, cu accent exact pe ce ai citit mai sus: variante complete, cronometrate, corectate pe barem și reluate până când raționamentul devine automat.

- Ședințe individuale sau în grupe de maximum 3 elevi;
- Materiale digitale incluse și teme de consolidare după fiecare sesiune;
- Plata per ședință, fără abonament, anulezi oricând.

Vezi [programele complete](https://algomate.ro/servicii) și [curriculumul pe capitole](https://algomate.ro/curriculum), sau [rezervă direct prima ședință](https://algomate.ro/inscriere) — răspund în aceeași zi.

Dacă ești în anul terminal, îți recomand și articolul despre [calendarul examenelor naționale din 2027](https://algomate.ro/blog/calendar-examene-2027), ca să îți construiești planul de învățare pornind de la date, nu de la intuiție.

---

*Rezolvările de mai sus sunt varianta mea de lucru pentru subiectul E. c) Matematică M_tehnologic (M2), Varianta 4, dat în sesiunea august 2026 a Bacalaureatului, publicat de Centrul Național pentru Curriculum și Evaluare. Baremul oficial poate accepta și alte metode corecte. Subiectele și baremele originale sunt disponibile pe [subiecte.edu.ro](https://subiecte.edu.ro).*