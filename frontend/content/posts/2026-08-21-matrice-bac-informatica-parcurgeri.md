---
title: "Matrice la BAC informatică: parcurgerile care apar an de an"
description: "Diagonale, chenar, zonele determinate de diagonale, interschimbări de linii și parcurgerea pe coloane — condițiile pe indici pentru fiecare, deduse și nu memorate, cu cod C++ compilat și rulat."
publishDate: 2026-08-21
slug: "matrice-bac-informatica-parcurgeri"
category: "Examene"
math: true
tags:
  - Bacalaureat 2027
  - Informatică BAC
  - C++
  - Tablouri bidimensionale
  - Subiecte rezolvate
---

La informatică, tablourile bidimensionale sunt capitolul cu cea mai mare densitate de puncte din toată programa. Motivul este simplu: aproape orice cerință se reduce la **o parcurgere cu o condiție pe indici**. Structura codului nu se schimbă niciodată — două bucle `for` și un `if`. Se schimbă doar condiția din `if`.

Elevii care pierd puncte aici nu au greșit bucla. Au greșit condiția, pentru că au încercat să și-o amintească în loc să o deducă.

Mai jos, cele mai frecvente cinci parcurgeri, fiecare cu felul în care se deduce condiția în trei secunde, la examen, fără să reții nimic pe de rost.

:::atentie Problemele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele se publică pe [subiecte.edu.ro](https://subiecte.edu.ro) după fiecare probă. Codul a fost compilat și rulat înainte de publicare.
:::

Matricea de lucru, pătratică, cu $n = 5$:

```text
     j=0  j=1  j=2  j=3  j=4
i=0    1    2    3    4    5
i=1    6    7    8    9   10
i=2   11   12   13   14   15
i=3   16   17   18   19   20
i=4   21   22   23   24   25
```

---

## 1. Diagonalele — singurele două condiții pe care merită să le reții

**Cerință.** Calculați suma elementelor de pe diagonala principală și suma celor de pe diagonala secundară.

Pe diagonala principală, elementul din colț stânga-sus este `a[0][0]`, următorul `a[1][1]`, și așa mai departe: linia și coloana sunt egale.

Pe cea secundară, primul element este `a[0][n-1]`, apoi `a[1][n-2]`. Linia crește cu 1 exact când coloana scade cu 1, deci **suma lor rămâne constantă**, egală cu $n - 1$.

:::solutie
```cpp
int dp = 0, ds = 0;
for (int i = 0; i < n; i++) {
    dp += a[i][i];
    ds += a[i][n - 1 - i];
}
```

Diagonala principală: $i = j$. Diagonala secundară: $i + j = n - 1$.
:::

:::raspuns
Pentru matricea de mai sus, ambele sume sunt `65`.
:::

:::alternativa De ce ies egale aici
Nu este o greșeală și nici o regulă generală — se întâmplă pentru că matricea aceasta conține numerele de la 1 la 25 în ordine. Pe orice astfel de matrice, elementele simetrice față de centru se compensează. Pe o matrice citită de la tastatură, cele două sume vor fi aproape întotdeauna diferite.
:::

---

## 2. Chenarul — patru cazuri, reunite cu SAU

**Cerință.** Calculați suma elementelor situate pe chenarul (bordura) matricei.

Un element este pe chenar dacă se află pe **prima linie sau pe ultima linie sau pe prima coloană sau pe ultima coloană**. Traducerea în cod este literală.

:::solutie
```cpp
int s = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        if (i == 0 || i == n - 1 || j == 0 || j == n - 1)
            s += a[i][j];
```
:::

:::raspuns
`208`. Verificare: suma tuturor elementelor este $1 + 2 + \dots + 25 = 325$, iar interiorul (submatricea $3 \times 3$ din mijloc) însumează $117$. Într-adevăr, $325 - 117 = 208$.
:::

:::atentie Nu aduna colțurile de două ori
Tentația este să scrii patru bucle separate — una pe prima linie, una pe ultima, una pe prima coloană, una pe ultima. Merge, dar cele patru colțuri aparțin la câte două laturi și se adună de două ori dacă nu scazi explicit. O singură parcurgere cu SAU nu are problema aceasta deloc: fiecare element este vizitat exact o dată, indiferent de câte condiții îndeplinește.
:::

---

## 3. Zonele determinate de diagonale — cerința care pare grea și nu este

**Cerință.** Afișați elementele din zona de nord, adică cele situate strict deasupra ambelor diagonale.

Aici este singurul loc unde merită să te oprești o secundă și să te uiți la desen. Cele două diagonale împart matricea pătratică în patru zone: nord, sud, est și vest.

Fiecare zonă este intersecția a două condiții, iar cele două condiții sunt exact cele de la punctul 1, cu `<` și `>` în loc de `=`:

| Zona | Față de diagonala principală | Față de cea secundară | Condiție |
|---|---|---|---|
| Nord | deasupra: $i < j$ | deasupra: $i + j < n - 1$ | `i < j && i + j < n - 1` |
| Sud | dedesubt: $i > j$ | dedesubt: $i + j > n - 1$ | `i > j && i + j > n - 1` |
| Vest | dedesubt: $i > j$ | deasupra: $i + j < n - 1$ | `i > j && i + j < n - 1` |
| Est | deasupra: $i < j$ | dedesubt: $i + j > n - 1$ | `i < j && i + j > n - 1` |

:::solutie
```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        if (i < j && i + j < n - 1)
            cout << a[i][j] << ' ';
```
:::

:::raspuns
Zona de nord conține `2 3 4 8`, cu suma `17`. Zona de sud conține `18 22 23 24`.
:::

:::atentie „Strict” schimbă răspunsul
Cu `<=` în loc de `<`, elementele de pe diagonale intră în zonă. Pentru matricea de mai sus, nordul ar deveni `1 2 3 4 5 7 8 9 13` — cu totul altceva. Citește cerința de două ori: „strict deasupra”, „inclusiv diagonala” și „deasupra diagonalei principale” sunt trei enunțuri diferite, iar baremul le punctează diferit.
:::

:::alternativa Cum verifici că nu ai greșit zona
Numără elementele. Pentru o matrice $n \times n$ cu $n$ impar, cele patru zone au același număr de elemente, iar restul până la $n^2$ sunt cele de pe diagonale. Aici: $4$ elemente per zonă, $4 \times 4 = 16$, plus cele $9$ de pe diagonale (cele două diagonale au $5 + 5$ elemente, dar centrul este comun) — total $25$. Dacă numărătoarea nu iese, condiția este greșită.
:::

---

## 4. Interschimbarea a două linii — atenție la ce se mută

**Cerință.** Interschimbați linia `p` cu linia `q`.

O linie nu se poate copia dintr-o singură instrucțiune: trebuie parcursă element cu element.

:::solutie
```cpp
for (int j = 0; j < n; j++) {
    int t = a[p][j];
    a[p][j] = a[q][j];
    a[q][j] = t;
}
```

Indicele care variază este **coloana**, pentru că linia este cea care rămâne fixă în fiecare dintre cei doi termeni.
:::

:::raspuns
După interschimbarea liniilor `0` și `3`, prima linie devine `16 17 18 19 20`.
:::

:::atentie La coloane, variază linia
Pentru interschimbarea a două coloane, bucla merge după `i`, iar indicii se scriu `a[i][p]` și `a[i][q]`. Este exact aceeași instrucțiune cu indicii inversați, și exact locul unde se greșește din grabă. Dacă nu ești sigur, scrie pe ciornă un element concret — `a[2][0]` trebuie să ajungă unde? — și indicii se așază singuri.
:::

---

## 5. Parcurgerea pe coloane — bucla exterioară decide ordinea

**Cerință.** Afișați elementele matricei parcurse pe coloane, de sus în jos.

Diferența față de parcurgerea obișnuită este de o singură linie: bucla exterioară este cea după `j`.

:::solutie
```cpp
for (int j = 0; j < n; j++)
    for (int i = 0; i < n; i++)
        cout << a[i][j] << ' ';
```
:::

:::raspuns
Pentru matricea $3 \times 3$ cu elementele `1 2 3 / 4 5 6 / 7 8 9`, se afișează `1 4 7 2 5 8 3 6 9`.
:::

Aceeași structură rezolvă și cerințele de tip „maximul și poziția lui”, care apar în aproape orice variantă:

```cpp
int mx = a[0][0], li = 0, co = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        if (a[i][j] > mx) { mx = a[i][j]; li = i; co = j; }
```

:::atentie Inițializarea cu `0` este o capcană
Dacă pornești cu `int mx = 0;` și matricea conține doar numere negative, răspunsul va fi `0` — o valoare care nu se află în matrice. Inițializează întotdeauna cu **primul element**, nu cu zero. Baremul nu îți dă punctele pentru „ar fi mers pe alte date”.
:::

---

## Ce să reții, de fapt

Din tot articolul, patru condiții:

- diagonala principală: `i == j`
- diagonala secundară: `i + j == n - 1`
- chenar: `i == 0 || i == n-1 || j == 0 || j == n-1`
- zonele: cele două de mai sus, cu `<` și `>` în loc de `==`

Restul se deduce din ele. Iar dacă la examen te blochezi, desenează matricea $5 \times 5$ cu indicii pe margine, exact ca la începutul articolului, și scrie condiția uitându-te la ea. Treizeci de secunde de desen valorează mai mult decât zece minute de încercări.

Pentru lucrul sistematic pe capitol, cu cod scris și rulat la fiecare ședință, asta facem la [meditațiile de informatică pentru BAC](/meditatii-informatica-bac). Iar despre capitolul următor ca dificultate — [recursivitatea](/blog/recursivitate-bac-informatica-cerinte-rezolvate) — este un articol separat.
