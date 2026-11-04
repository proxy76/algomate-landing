---
title: "Subprograme la BAC informatică: cum iei toate cele 10 puncte de la Subiectul III.1"
description: "Prima cerință de la Subiectul al III-lea cere aproape mereu un subprogram. Antetul, parametrii prin referință, tablourile transmise ca parametru și cazurile-limită care costă puncte — patru cerințe tipice, rezolvate în C++ și rulate."
publishDate: 2026-12-09
slug: "subprograme-bac-informatica-subiectul-3"
category: "Examene"
math: true
coverImage: /blog/subprograme-bac-informatica.jpg
tags:
  - Bacalaureat 2027
  - Informatică BAC
  - C++
  - Subprograme
  - Subiecte rezolvate
---

La proba de informatică, Subiectul al III-lea începe aproape întotdeauna cu un subprogram: „Subprogramul *f* are trei parametri… Scrieți definiția completă a subprogramului.” Sunt 10 puncte, iar baremul le împarte previzibil — de exemplu, în [modelul oficial pentru 2027](/blog/model-subiect-bac-2027-informatica-cpp-rezolvat): **2 puncte pe antet**, 5 pe algoritm, 2 pe afișare sau pe valoarea returnată, 1 pe corectitudinea globală.

Ce rezultă de aici: cerința se poate pierde pe jumătate înainte de a scrie vreun algoritm, doar din antet și din felul în care întorci rezultatul. Mai jos sunt regulile, apoi patru cerințe tipice.

:::atentie Cerințele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele oficiale sunt pe [subiecte.edu.ro](https://subiecte.edu.ro). Fiecare subprogram a fost compilat cu `g++ -std=c++14 -Wall` și rulat, iar rezultatele citate sunt cele afișate.
:::

## Trei întrebări înainte de antet

Enunțul conține tot ce trebuie pentru antet, dacă știi unde să te uiți:

1. **Ce primește?** Parametrii „prin care primește” sunt de intrare — se transmit prin valoare.
2. **Ce furnizează, și cum?** „Returnează” înseamnă tipul funcției și `return`. „Furnizează prin parametrul *x*” înseamnă că *x* se transmite **prin referință**, cu `&`. „Afișează” înseamnă `cout` în subprogram și tipul `void`.
3. **Cum se numesc?** Numele subprogramului și ale parametrilor sunt cele din enunț, scrise cu bold. Baremul cere să le respecți.

## 1. Rezultat prin referință — cifre pare și impare

**Cerință.** Subprogramul `cifre` are trei parametri: `n`, prin care primește un număr natural din intervalul $[0, 10^9]$, și `pare` și `impare`, prin care furnizează numărul de cifre pare, respectiv impare ale lui `n`. Scrieți definiția completă a subprogramului.

Exemplu: pentru `n = 2026`, `pare = 4` și `impare = 0`.

:::solutie
```cpp
void cifre(int n, int &pare, int &impare)
{
    pare = 0;
    impare = 0;
    do
    {
        if (n % 10 % 2 == 0) pare++;
        else impare++;
        n = n / 10;
    } while (n != 0);
}
```

Rulat: pentru 2026 dă `4 0`, pentru 13579 dă `0 5`, pentru 0 dă `1 0`.
:::

Două lucruri decid punctajul aici.

**`&` la `pare` și `impare`.** Fără el, subprogramul modifică niște copii locale, iar apelantul nu primește nimic. Programul compilează fără nicio eroare — tocmai de aceea greșeala trece neobservată pe hârtie. Am testat: o variantă fără `&` lasă variabilele apelantului exact cum erau.

**`do…while`, nu `while`.** Intervalul începe de la 0, iar 0 are o cifră — una pară. Cu `while (n != 0)`, bucla nu se execută deloc pentru `n = 0` și subprogramul raportează `0 0`. Rulat, varianta cu `while` dă exact asta. La examen, intervalul din enunț este scris ca să verifice dacă ai observat cazul.

## 2. Funcție care returnează — și refolosirea ei

**Cerință.** a) Scrieți definiția subprogramului `prim`, cu un parametru `n` (număr natural, $n \leq 10^9$), care returnează 1 dacă `n` este prim și 0 altfel. b) Scrieți definiția subprogramului `nrPrime`, cu doi parametri `a` și `b` ($a \leq b$), care returnează câte numere prime sunt în intervalul $[a, b]$, folosind apeluri utile ale subprogramului `prim`.

:::solutie
```cpp
int prim(int n)
{
    if (n < 2) return 0;
    for (int d = 2; d * d <= n; d++)
        if (n % d == 0) return 0;
    return 1;
}

int nrPrime(int a, int b)
{
    int nr = 0;
    for (int x = a; x <= b; x++)
        if (prim(x)) nr++;
    return nr;
}
```

`prim(1)`, `prim(2)`, `prim(9)`, `prim(97)` dau `0 1 0 1`. `nrPrime(10, 30)` returnează `6` — numerele 11, 13, 17, 19, 23, 29.
:::

:::atentie 0 și 1 nu sunt prime
Fără `if (n < 2) return 0;`, bucla nu se execută pentru 0 și 1, iar funcția ajunge direct la `return 1`. Este cea mai frecventă greșeală la acest subprogram și pică exact pe valorile pe care corectorul le testează primele.
:::

`d * d <= n` în loc de `d <= n` sau `d <= n / 2` face diferența dintre câteva zeci de mii de pași și câteva sute de milioane pentru un $n$ prim apropiat de $10^9$. Când enunțul nu cere explicit eficiență, nu se depunctează, dar pe testele cu numere mari un program prea lent nu se termină. Iar „apeluri utile” la b) înseamnă exact asta: cine rescrie verificarea de primalitate în `nrPrime` în loc să cheme `prim` pierde punctajul pentru apel.

## 3. Tablou ca parametru — și dimensiunea care se schimbă

**Cerință.** Subprogramul `dublare` are trei parametri: `v`, un tablou unidimensional cu cel mult 50 de numere întregi, `n`, numărul de elemente ale tabloului, și `x`, un număr întreg. Subprogramul inserează în tablou, după fiecare element egal cu `x`, încă o valoare egală cu `x`. Tabloul modificat și numărul de elemente sunt furnizate tot prin `v` și `n`.

Exemplu: pentru `v = (3, 7, 3, 1, 3)`, `n = 5` și `x = 3`, după apel `v = (3, 3, 7, 3, 3, 1, 3, 3)` și `n = 8`.

:::solutie
```cpp
void dublare(int v[], int &n, int x)
{
    for (int i = n - 1; i >= 0; i--)
        if (v[i] == x)
        {
            for (int j = n - 1; j >= i; j--)
                v[j + 1] = v[j];
            n++;
        }
}
```

Rulat pe exemplu: `3 3 7 3 3 1 3 3` și `n = 8`. Pe `(5, 5)` cu `x = 5`: `5 5 5 5`, `n = 4`. Pe `(1, 2)` cu `x = 9`: tabloul rămâne neschimbat.
:::

Trei detalii:

- **Tabloul nu are nevoie de `&`.** Un tablou transmis ca parametru este deja accesat direct — modificările lui se văd în apelant. **`n` are nevoie**, pentru că se schimbă.
- **Parcurgerea de la dreapta la stânga.** Dacă parcurgi de la stânga, după ce inserezi o copie a lui 3 pe poziția următoare, ajungi la ea, o vezi egală cu 3 și mai inserezi una — la nesfârșit, sau până depășești tabloul. De la dreapta, elementele deja tratate se mută spre dreapta, departe de `i`.
- **Deplasarea pornește de la capăt.** `v[j + 1] = v[j]` pentru `j` de la `n - 1` în jos până la `i`. Invers, ai suprascrie elementele înainte să le muți.

## 4. Subprogram care afișează

Când enunțul spune „subprogramul **afișează** pe ecran…”, tipul este `void`, iar afișarea — în formatul exact din exemplu — face parte din punctaj. În modelul oficial pentru 2027, subprogramul `parcele` trebuia să afișeze perechi de forma `432 cu latura 1;`, iar 2 din cele 10 puncte erau pentru format.

Regula este simplă: copiază separatorii din exemplu caracter cu caracter — spațiu, punct și virgulă, linie nouă sau nimic. Și invers: **nu citi și nu afișa nimic în plus** într-un subprogram care nu o cere. Un `cin >> n` în interiorul unui subprogram care primește `n` ca parametru este o greșeală de înțelegere a cerinței și se depunctează ca atare.

## Lista de verificare, înainte de a preda

1. Numele subprogramului și ale parametrilor sunt exact cele din enunț?
2. Fiecare parametru prin care se **furnizează** ceva are `&`? Niciun parametru de intrare nu are `&` fără motiv?
3. Tipul subprogramului este cel potrivit: `void` dacă afișează sau furnizează prin parametri, `int` (sau alt tip) dacă returnează?
4. Fiecare drum prin funcție se termină cu un `return`?
5. Ai verificat cele două capete ale intervalului din enunț — de obicei 0 sau 1, și valoarea maximă?
6. Variabilele locale sunt declarate în subprogram, nu folosite din `main`?

Ultimele două puncte sunt cele pe care le uită aproape toată lumea, și sunt cele care despart 8 puncte de 10.

## Cum exersezi

Ia fiecare cerință de mai sus și schimb-o: cifre mai mari decât 5 în loc de pare, numere perfecte în loc de prime, ștergere în loc de inserare. Dacă poți adapta antetul și algoritmul fără să te uiți la soluție, ai înțeles tiparul. Apoi treci pe cerințele de la Subiectul III.1 din variantele oficiale ale anilor trecuți.

Pentru capitolele vecine, am scris despre [recursivitate](/blog/recursivitate-bac-informatica-cerinte-rezolvate) și despre [matrice](/blog/matrice-bac-informatica-parcurgeri). Iar dacă vrei să lucrezi sistematic, cu cod scris și corectat la fiecare ședință, asta facem la [meditațiile de informatică pentru BAC](/meditatii-informatica-bac).
