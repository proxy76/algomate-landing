---
title: "Legi de compoziție la BAC M1: forma canonică rezolvă jumătate din Subiectul II.2"
description: "Element neutru, simetrice, asociativitate, ecuații cu x∘x∘x și produse lungi de tipul 1∘2∘…∘2027 — aproape toate se rezolvă dintr-o singură rescriere a legii. Metoda, pe cerințe tipice rezolvate pas cu pas."
publishDate: 2026-12-16
slug: "legi-de-compozitie-bac-m1"
category: "Examene"
math: true
coverImage: /blog/legi-de-compozitie-bac-m1.jpg
tags:
  - Bacalaureat 2027
  - Matematică M1
  - Matematică M_mate-info
  - Legi de compoziție
  - Subiecte rezolvate
---

A doua problemă de la Subiectul al II-lea, la matematică M_mate-info, este aproape în fiecare an o **lege de compoziție**: o operație nouă, definită pe numere reale, cu trei cerințe de câte 5 puncte. În [modelul oficial pentru 2027](/blog/model-subiect-bac-2027-matematica-m-mate-info-rezolvat) a fost $x * y = 2(x-1)(y-2) + 2$.

Vestea bună: la majoritatea legilor date la BAC există o rescriere — **forma canonică** — din care se citesc direct elementul neutru, simetricele, asociativitatea și rezultatul compunerii de $n$ ori. Odată ce o ai, cerințele b) și c) devin aproape mecanice.

:::atentie Cerințele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele oficiale sunt pe [subiecte.edu.ro](https://subiecte.edu.ro). Toate rezultatele numerice din articol au fost verificate și prin calcul direct.
:::

## Forma canonică: ce este și cum o găsești

Multe legi de la BAC au forma

$$x \circ y = a\,xy + b\,x + b\,y + c,$$

cu **același coeficient** $b$ în fața lui $x$ și a lui $y$. O astfel de lege se poate scrie mereu ca

$$x \circ y = a(x - k)(y - k) + k$$

pentru un $k$ potrivit. Pentru a-l găsi, scoți factor comun $a$ și completezi produsul:

$$a\,xy + b\,x + b\,y + c = a\left(x + \tfrac{b}{a}\right)\left(y + \tfrac{b}{a}\right) + c - \tfrac{b^2}{a}$$

deci $k = -\frac{b}{a}$, iar termenul liber care rămâne, $c - \frac{b^2}{a}$, trebuie să iasă tot $k$. La legile alese pentru examen, iese — de aceea sunt alese.

**Exemplu.** $x \circ y = xy - 3x - 3y + 12$. Aici $a = 1$, $b = -3$, deci $k = 3$, iar $12 - 9 = 3$:

$$x \circ y = (x - 3)(y - 3) + 3$$

Verificare prin desfacere: $xy - 3x - 3y + 9 + 3 = xy - 3x - 3y + 12$.

:::atentie Când nu există formă canonică
Dacă coeficienții lui $x$ și $y$ sunt diferiți — ca la $2(x-1)(y-2) + 2$ din modelul 2027 — legea nu e comutativă și nu are forma de mai sus. Asta nu e o problemă, dar înseamnă că la elementul neutru trebuie verificate **ambele** egalități, $e * x = x$ și $x * e = x$. În model, cerința spunea doar $a * x = x$, tocmai ca să evite capcana.
:::

## Ce citești direct din forma canonică

Pentru tot restul articolului: $x \circ y = (x-3)(y-3) + 3$, pe $\mathbb{R}$.

### Comutativitate

$(x-3)(y-3) = (y-3)(x-3)$, deci $x \circ y = y \circ x$. Un rând.

### Asociativitate

:::solutie
$$(x \circ y) \circ z = \left((x \circ y) - 3\right)(z - 3) + 3 = (x-3)(y-3)(z-3) + 3$$

pentru că $(x \circ y) - 3 = (x-3)(y-3)$. Identic, $x \circ (y \circ z) = (x-3)(y-3)(z-3) + 3$. Cele două expresii coincid, deci legea este asociativă.
:::

Observă trucul: în forma canonică, „$x \circ y$ minus $k$” este pur și simplu produsul $(x-k)(y-k)$. Asta face ca orice compunere să se transforme într-un produs.

### Elementul neutru

:::solutie
Căutăm $e$ cu $x \circ e = x$ pentru orice $x$ real:

$$(x-3)(e-3) + 3 = x \iff (x-3)(e-3) = x - 3, \quad \forall x \in \mathbb{R}$$

Pentru $x \neq 3$ putem împărți și obținem $e - 3 = 1$, adică $e = 4$. Verificăm și pentru $x = 3$: $3 \circ 4 = 0 + 3 = 3$. Legea fiind comutativă, $e \circ x = x$ rezultă imediat.
:::

:::raspuns
$e = 4$
:::

În general, pentru $a(x-k)(y-k) + k$, elementul neutru este $e = k + \frac{1}{a}$.

### Elementele simetrizabile

:::solutie
Căutăm $x'$ cu $x \circ x' = 4$:

$$(x-3)(x'-3) + 3 = 4 \iff (x-3)(x'-3) = 1 \iff x' = 3 + \frac{1}{x-3}$$

Asta are sens doar pentru $x \neq 3$. Deci orice $x \neq 3$ este simetrizabil, iar $3$ nu este.
:::

Numărul 3 are un rol special: $x \circ 3 = (x-3) \cdot 0 + 3 = 3$ pentru orice $x$. Se numește **element absorbant** — iar el este cheia cerințelor de tip „calculați produsul lung”.

## Cerințele de tip c), rezolvate

### Compunerea de $n$ ori

Din asociativitate: $x \circ x = (x-3)^2 + 3$, $x \circ x \circ x = (x-3)^3 + 3$ și, în general,

$$\underbrace{x \circ x \circ \cdots \circ x}_{n \text{ ori}} = (x-3)^n + 3$$

**Cerință.** Rezolvați ecuația $x \circ x \circ x = 11$.

:::solutie
$(x-3)^3 + 3 = 11 \implies (x-3)^3 = 8 \implies x - 3 = 2 \implies x = 5$.

Verificare: $5 \circ 5 = 4 + 3 = 7$, iar $7 \circ 5 = 4 \cdot 2 + 3 = 11$.
:::

:::raspuns
$x = 5$
:::

### Produsul lung cu element absorbant

**Cerință.** Calculați $1 \circ 2 \circ 3 \circ \cdots \circ 2027$.

:::solutie
Legea este asociativă și comutativă, deci putem grupa termenii cum vrem. Produsul îl conține pe 3, care este absorbant: orice compunere cu 3 dă 3. Așadar

$$1 \circ 2 \circ 3 \circ \cdots \circ 2027 = (1 \circ 2) \circ 3 \circ (4 \circ \cdots \circ 2027) = 3$$

Mai direct, cu forma canonică: rezultatul este $(1-3)(2-3)(3-3)\cdots(2027-3) + 3$, iar produsul conține factorul $3 - 3 = 0$.
:::

:::raspuns
$3$
:::

Am verificat și prin calcul direct, compunând pe rând toate cele 2027 de numere: rezultatul este 3. Cerința apare des la BAC, cu alte capete — $\frac{1}{2027} \circ \cdots \circ 2027$, sau $\sqrt{1} \circ \sqrt{2} \circ \cdots$ — și se rezolvă mereu la fel: cauți dacă elementul absorbant e printre termeni.

### Partea stabilă

**Cerință.** Arătați că intervalul $(3, +\infty)$ este parte stabilă în raport cu legea $\circ$.

:::solutie
Pentru $x, y \in (3, +\infty)$: $x - 3 > 0$ și $y - 3 > 0$, deci $(x-3)(y-3) > 0$ și $x \circ y = (x-3)(y-3) + 3 > 3$. Așadar $x \circ y \in (3, +\infty)$.
:::

Fără forma canonică, aceeași demonstrație cere studiul semnului unei expresii cu patru termeni.

## Al doilea exemplu: coeficientul $a \neq 1$

$x * y = 2xy - 6x - 6y + 21$. Aici $a = 2$, $b = -6$, deci $k = 3$, iar $21 - \frac{36}{2} = 3$:

$$x * y = 2(x-3)(y-3) + 3$$

Ce se schimbă față de primul exemplu:

- **Elementul neutru** este $e = 3 + \frac{1}{2} = \frac{7}{2}$. Verificare: $x * \frac{7}{2} = 2(x-3) \cdot \frac{1}{2} + 3 = x$.
- **Compunerea de $n$ ori** câștigă un factor: $x * x = 2(x-3)^2 + 3$, apoi $x * x * x = 2 \cdot 2(x-3)^2 \cdot (x-3) + 3 = 4(x-3)^3 + 3$. În general, $2^{n-1}(x-3)^n + 3$.
- **Ecuația** $x * x * x = 35$ devine $4(x-3)^3 = 32$, deci $(x-3)^3 = 8$ și $x = 5$. Verificat direct: $5 * 5 * 5 = 35$.

:::atentie Puterea lui 2 este $n - 1$, nu $n$
Compunerea de $n$ elemente are $n - 1$ operații, iar fiecare operație aduce un factor 2. Cine scrie $2^n(x-3)^n + 3$ obține la $n = 1$ valoarea $2(x-3) + 3$, care nu e $x$ — o verificare de o secundă care prinde greșeala.
:::

## Pe scurt

1. Verifică dacă legea are același coeficient la $x$ și la $y$. Dacă da, scrie-o ca $a(x-k)(y-k) + k$ și verifică prin desfacere.
2. Din forma canonică citești: asociativitatea (produs de trei paranteze), elementul neutru $k + \frac{1}{a}$, elementul absorbant $k$, simetricele, compunerea de $n$ ori.
3. Dacă legea nu are formă canonică, lucrează direct — și verifică ambele părți la element neutru.
4. Verifică orice rezultat prin înlocuire. La legi de compoziție, verificarea durează mai puțin decât calculul.

Ghidul gratuit pentru Subiectul al II-lea de la BAC M1 — matrice și legi de compoziție — este la [resurse](/resurse). Dacă vrei să lucrezi capitolul pe subiectele oficiale ale anilor trecuți, cu cineva care te corectează pe parcurs, asta facem la [meditațiile de matematică online](/meditatii-matematica-online).
