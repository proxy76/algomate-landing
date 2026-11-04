---
title: "Integrale la BAC M1: cele șase tipuri de cerințe de la Subiectul III.2, rezolvate"
description: "Integrală directă, schimbare de variabilă, integrare prin părți, primitivă de verificat, arie și volum, șir de integrale — cerințele de la Subiectul III.2 de la BAC matematică M_mate-info, pe tipuri, cu metoda de recunoaștere și greșelile care costă puncte."
publishDate: 2027-01-06
slug: "integrale-bac-m1-subiectul-3-2"
category: "Examene"
math: true
coverImage: /blog/integrale-bac-m1.jpg
tags:
  - Bacalaureat 2027
  - Matematică M1
  - Matematică M_mate-info
  - Integrale
  - Subiecte rezolvate
---

Ultima problemă de la BAC matematică M_mate-info, Subiectul III.2, este despre **integrale**: o funcție dată, apoi trei cerințe de câte 5 puncte. Este, în multe lucrări, problema la care se ajunge cu cel mai puțin timp — și una dintre cele mai previzibile din tot subiectul.

Cerințele a) și b) se încadrează aproape mereu în câteva tipuri fixe, iar c) este fie o arie, fie un volum, fie un șir de integrale. Mai jos, fiecare tip, cu felul în care îl recunoști și o cerință rezolvată. În [modelul oficial pentru 2027](/blog/model-subiect-bac-2027-matematica-m-mate-info-rezolvat) au apărut trei dintre ele: o integrală directă, una prin părți și un șir de integrale.

:::atentie Cerințele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele oficiale sunt pe [subiecte.edu.ro](https://subiecte.edu.ro). Fiecare rezultat a fost verificat și prin integrare numerică.
:::

## Tipul 1 — integrala directă

**Cum îl recunoști:** integrandul este o sumă de funcții cu primitive din tabel — puteri, $\frac{1}{x}$, $e^x$, $\sin$, $\cos$. De obicei este cerința a), și de obicei apare după o simplificare: enunțul dă $f$ și îți cere $\int (f(x) - \text{ceva})\,dx$, iar „ceva” este ales ca să rămână o expresie simplă.

**Cerință.** Arătați că $\displaystyle\int_1^2 \left(3x^2 - \frac{2}{x}\right)dx = 7 - 2\ln 2$.

:::solutie
$$\int_1^2 \left(3x^2 - \frac{2}{x}\right)dx = \left(x^3 - 2\ln x\right)\Big|_1^2 = (8 - 2\ln 2) - (1 - 0) = 7 - 2\ln 2$$
:::

Baremul împarte de obicei 3 puncte pe primitivă și 2 pe calculul final. Scrie primitiva explicit, cu bara și capetele — nu sări direct la rezultat.

## Tipul 2 — schimbarea de variabilă

**Cum îl recunoști:** în integrand apare o funcție și, alături, derivata ei (sau un multiplu al derivatei). $\frac{x}{x^2 + 1}$: numitorul este $x^2 + 1$, iar derivata lui, $2x$, este la numărător, până la un factor 2.

**Cerință.** Calculați $\displaystyle\int_0^1 \frac{x}{x^2 + 1}\,dx$.

:::solutie
Cu $u = x^2 + 1$, $du = 2x\,dx$; pentru $x = 0$, $u = 1$, iar pentru $x = 1$, $u = 2$:

$$\int_0^1 \frac{x}{x^2 + 1}\,dx = \frac{1}{2}\int_1^2 \frac{du}{u} = \frac{1}{2}\ln u\,\Big|_1^2 = \frac{\ln 2}{2}$$
:::

:::raspuns
$\dfrac{\ln 2}{2}$
:::

:::atentie Schimbă și capetele
Cea mai frecventă greșeală: se schimbă variabila, dar capetele rămân 0 și 1. Rezultatul ar fi $\frac{1}{2}\ln u\,\big|_0^1$, care nici nu are sens ($\ln 0$). Ori schimbi capetele odată cu variabila, ori revii la $x$ înainte să le înlocuiești: $\frac{1}{2}\ln(x^2 + 1)\big|_0^1$. Ambele variante sunt corecte; amestecul lor nu este.
:::

## Tipul 3 — integrarea prin părți

**Cum îl recunoști:** un produs de două funcții de tipuri diferite, dintre care una „se simplifică” prin derivare: un polinom înmulțit cu $e^x$, $\ln x$, $\sin x$ sau $\cos x$.

**Regula de alegere:** derivezi funcția care devine mai simplă. Polinomul se derivează lângă $e^x$ sau $\sin x$. Dar lângă $\ln x$, **logaritmul** se derivează — pentru că $(\ln x)' = \frac{1}{x}$ dispare frumos, iar o primitivă pentru $\ln x$ nu o ai din tabel.

**Cerință.** Calculați $\displaystyle\int_1^e x \ln x\,dx$.

:::solutie
Alegem $f(x) = \ln x$, $g'(x) = x$, deci $f'(x) = \frac{1}{x}$, $g(x) = \frac{x^2}{2}$:

$$\int_1^e x\ln x\,dx = \frac{x^2}{2}\ln x\,\Big|_1^e - \int_1^e \frac{x^2}{2} \cdot \frac{1}{x}\,dx = \frac{e^2}{2} - \frac{x^2}{4}\Big|_1^e = \frac{e^2}{2} - \frac{e^2}{4} + \frac{1}{4} = \frac{e^2 + 1}{4}$$
:::

:::raspuns
$\dfrac{e^2 + 1}{4}$
:::

Verifică primul termen la capătul de jos: $\frac{1}{2}\ln 1 = 0$. Este motivul pentru care integralele cu $\ln x$ pornesc aproape mereu de la 1.

## Tipul 4 — „arătați că $F$ este o primitivă a lui $f$”

**Cum îl recunoști:** după formulare. Nu e nevoie de nicio integrală — se derivează $F$ și se arată că dă $f$.

**Cerință.** Arătați că $F : \mathbb{R} \to \mathbb{R}$, $F(x) = (x - 1)e^x$, este o primitivă a funcției $f(x) = xe^x$.

:::solutie
$F$ este derivabilă și $F'(x) = 1 \cdot e^x + (x - 1)e^x = xe^x = f(x)$, pentru orice $x$ real.
:::

Cerința este gratuită — dar se pierd puncte pe ea când elevul încearcă să integreze $f$ și să ajungă la $F$, în loc să o derive pe $F$. Ambele sunt corecte, însă a doua ia de trei ori mai mult.

## Tipul 5 — aria și volumul

**Aria** suprafeței dintre graficul unei funcții $g \geq 0$, axa $Ox$ și dreptele $x = a$, $x = b$ este $\int_a^b g(x)\,dx$. **Volumul** corpului obținut prin rotirea graficului în jurul axei $Ox$ este $\pi\int_a^b g^2(x)\,dx$.

**Cerință.** Pentru $g(x) = xe^x$: a) calculați aria suprafeței delimitate de graficul lui $g$, axa $Ox$ și dreptele $x = 0$, $x = 1$; b) calculați volumul corpului obținut prin rotația graficului lui $g$, $x \in [0, 1]$, în jurul axei $Ox$.

:::solutie
**Aria.** Pe $[0, 1]$, $g(x) \geq 0$, deci aria este chiar integrala. Folosind primitiva de la tipul 4:

$$\mathcal{A} = \int_0^1 xe^x\,dx = (x - 1)e^x\,\Big|_0^1 = 0 - (-1) = 1$$

**Volumul.**

$$V = \pi\int_0^1 x^2 e^{2x}\,dx$$

Prin părți, de două ori, se obține primitiva $e^{2x}\left(\frac{x^2}{2} - \frac{x}{2} + \frac{1}{4}\right)$ — se verifică prin derivare. Așadar

$$V = \pi\left[e^{2x}\left(\frac{x^2}{2} - \frac{x}{2} + \frac{1}{4}\right)\right]_0^1 = \pi\left(\frac{e^2}{4} - \frac{1}{4}\right) = \frac{\pi(e^2 - 1)}{4}$$
:::

:::raspuns
$\mathcal{A} = 1$, $V = \dfrac{\pi(e^2 - 1)}{4}$
:::

:::atentie La arie, verifică semnul funcției
Dacă $g$ ia valori negative pe interval, aria este $\int |g(x)|\,dx$, nu $\int g(x)\,dx$. Pe un interval unde $g < 0$, integrala simplă dă un număr negativ — o arie negativă este semnalul sigur că ai uitat modulul. La volum problema nu apare: $g^2 \geq 0$ oricum.
:::

## Tipul 6 — șirul de integrale

**Cum îl recunoști:** $I_n = \int_0^1 (\ldots)^n \ldots\,dx$, cu cerințe de tipul „arătați că $I_{n+1} + (n+1)I_n = \ldots$”, „arătați că șirul este descrescător” sau „calculați $\lim I_n$”.

**Cerință.** Pentru $n$ natural, $I_n = \displaystyle\int_0^1 x^n e^x\,dx$. a) Arătați că $I_n + nI_{n-1} = e$, pentru orice $n \geq 1$. b) Arătați că $\displaystyle\lim_{n \to \infty} I_n = 0$. c) Calculați $\displaystyle\lim_{n \to \infty} nI_n$.

:::solutie
**a)** Prin părți, derivând $x^n$:

$$I_n = x^n e^x\,\Big|_0^1 - n\int_0^1 x^{n-1}e^x\,dx = e - nI_{n-1}$$

deci $I_n + nI_{n-1} = e$.

**b)** Pentru $x \in [0, 1]$: $1 \leq e^x \leq e$, deci $0 \leq x^n e^x \leq e\,x^n$. Integrând:

$$0 \leq I_n \leq e\int_0^1 x^n\,dx = \frac{e}{n+1}$$

Cum $\frac{e}{n+1} \to 0$, din criteriul cleștelui $I_n \to 0$.

**c)** Din a), scrisă pentru $n + 1$: $(n+1)I_n = e - I_{n+1}$. Cum $I_{n+1} \to 0$, $(n+1)I_n \to e$. Iar

$$nI_n = \frac{n}{n+1} \cdot (n+1)I_n \to 1 \cdot e = e$$
:::

:::raspuns
$\lim I_n = 0$, $\lim nI_n = e$
:::

Tiparul se repetă la aproape orice șir de integrale:

- **Relația de recurență** vine din integrarea prin părți sau dintr-o diferență care se simplifică — ca $I_n - I_{n+4}$ din modelul 2027, unde numitorul dispărea complet.
- **Limita șirului** vine din încadrare: mărginești funcția de sub integrală, integrezi inegalitatea, apoi cleștele.
- **Limita lui $nI_n$** vine din relația de recurență, nu dintr-un calcul nou. Dacă la c) te apuci să calculezi ceva de la zero, aproape sigur ai ratat legătura cu a) și b).

Verificat numeric: $I_0 = e - 1 \approx 1{,}718$, iar $I_3 + 3I_2$ dă $e$ până la a douăsprezecea zecimală.

## Pe scurt

| Tip | Semnalul | Metoda |
|---|---|---|
| Directă | sumă de funcții din tabel | primitive din tabel |
| Schimbare de variabilă | o funcție și derivata ei | $u = $ funcția interioară, cu capete noi |
| Prin părți | polinom × $e^x$, $\ln x$, $\sin x$ | derivezi ce se simplifică |
| Primitivă de verificat | „arătați că $F$ este o primitivă” | derivezi $F$ |
| Arie, volum | „suprafața delimitată”, „corpul de rotație” | $\int g$, respectiv $\pi\int g^2$ |
| Șir de integrale | $I_n$ | recurență prin părți, limită prin încadrare |

Ghidul gratuit pentru Subiectul al III-lea de la BAC M1 — limite, derivate, primitive, integrale, arii și volume — este la [resurse](/resurse). Iar dacă vrei să lucrezi capitolul pe subiectele oficiale ale anilor trecuți, cu cineva care te corectează pe parcurs, asta facem la [meditațiile de matematică online](/meditatii-matematica-online).
