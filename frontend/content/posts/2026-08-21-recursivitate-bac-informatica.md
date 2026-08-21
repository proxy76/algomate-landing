---
title: "Recursivitate la BAC informatică: cinci cerințe tipice, rezolvate în C++"
description: "Recursivitatea este capitolul care separă nota 8 de nota 10 la informatică. Cinci tipuri de cerințe care apar an de an — sumă de cifre, „ce afișează”, palindrom, divide et impera, backtracking — rezolvate integral, cu arborele de apeluri desenat pas cu pas."
publishDate: 2026-08-21
slug: "recursivitate-bac-informatica-cerinte-rezolvate"
category: "Examene"
math: true
tags:
  - Bacalaureat 2027
  - Informatică BAC
  - C++
  - Recursivitate
  - Subiecte rezolvate
---

Recursivitatea este capitolul la care se pierd cele mai multe puncte pe unitate de materie, la informatică. Nu pentru că ar fi grea în sine, ci pentru că este singurul capitol care **nu se poate învăța pe de rost**. Un elev poate memora cum arată sortarea prin selecție. Nu poate memora „cum arată recursivitatea”, pentru că nu arată într-un singur fel.

Vestea bună este că, la examen, cerințele recursive se încadrează în câteva tipare care se repetă an de an. Mai jos sunt cinci, fiecare rezolvat integral.

:::atentie Problemele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele oficiale se publică pe [subiecte.edu.ro](https://subiecte.edu.ro) după fiecare probă — folosește-le pe acelea pentru simulări cronometrate. Codul de aici a fost compilat și rulat înainte de publicare.
:::

## Cele două întrebări care rezolvă orice recursivitate

Înainte de orice cerință, două întrebări, în ordinea asta:

1. **Când mă opresc?** — cazul de bază. O funcție recursivă fără el intră în autoapel infinit până se umple stiva.
2. **Cum mă apropii de oprire?** — pasul. Fiecare autoapel trebuie să primească un argument *strict mai aproape* de cazul de bază.

Dacă poți răspunde la amândouă în cuvinte, codul se scrie singur. Dacă nu, nu te apuca de scris cod — încă nu ai înțeles problema.

---

## 1. Suma cifrelor — tiparul „descompun și adun”

**Cerință.** Scrieți un subprogram recursiv `S` care primește un număr natural `n` și returnează suma cifrelor lui.

Cele două întrebări: mă opresc când numărul a rămas fără cifre, adică la `0`. Mă apropii împărțind la 10, ceea ce taie ultima cifră.

:::solutie
```cpp
int S(int n) {
    if (n == 0) return 0;
    return n % 10 + S(n / 10);
}
```

Ultima cifră este `n % 10`, iar restul numărului este `n / 10`. Suma cifrelor lui `n` este ultima cifră plus suma cifrelor a ceea ce rămâne.
:::

Arborele de apeluri pentru `S(9038)` este o linie dreaptă — fiecare apel îl face pe următorul și așteaptă:

```text
S(9038) = 8 + S(903)
S(903)  = 3 + S(90)
S(90)   = 0 + S(9)
S(9)    = 9 + S(0)
S(0)    = 0
```

Acum se întoarce, de jos în sus: `9`, apoi `0+9 = 9`, apoi `3+9 = 12`, apoi `8+12 = 20`.

:::raspuns
`S(9038)` returnează `20`. Verificare rapidă: $9+0+3+8 = 20$.
:::

:::atentie Cazul de bază nu este `n < 10`
Multe rezolvări scriu `if (n < 10) return n;`. Funcționează pentru numere pozitive, dar pică pe `n = 0` dacă cerința cere altceva pentru zero, și — mai important — te obligă să tratezi separat un caz care nu are nevoie de tratament separat. `n == 0` este mai simplu și mai greu de greșit.
:::

---

## 2. „Ce afișează?” — tiparul în care contează *unde* pui instrucțiunea

Acesta este tipul de cerință la care pică cei mai mulți elevi, pentru că răspunsul nu depinde de ce face funcția, ci de **poziția** afișării față de autoapel.

**Cerință.** Ce se afișează la apelul `F(1234)`?

```cpp
void F(int n) {
    if (n > 0) {
        cout << n % 10;
        F(n / 10);
        cout << n % 10;
    }
}
```

Sunt două afișări: una **înainte** de autoapel și una **după**. Prima se execută la coborâre, a doua la întoarcere. Deci cifrele apar o dată în ordine inversă și o dată în ordine directă.

:::solutie
```text
F(1234)  scrie 4  →  F(123)  scrie 3  →  F(12)  scrie 2  →  F(1)  scrie 1
                                                              F(0) nu face nimic
F(1)     scrie 1  ←  F(12)   scrie 2  ←  F(123) scrie 3  ←  F(1234) scrie 4
```

La coborâre: `4 3 2 1`. La întoarcere, în ordine inversă a apelurilor: `1 2 3 4`.
:::

:::raspuns
`43211234`
:::

:::alternativa Regula scurtă, pentru examen
Instrucțiunile **dinaintea** autoapelului se execută în ordinea apelurilor. Cele de **după** se execută în ordine inversă. Dacă reții doar atât, rezolvi majoritatea cerințelor de tip „ce afișează” fără să desenezi nimic.
:::

Verifică-te singur pe un caz mai mic: `F(50)` afișează `0550`. Dacă ai răspuns `0055` sau `5005`, reia trasarea — nu ai încă automatismul.

---

## 3. Palindrom — tiparul „două capete care se apropie”

**Cerință.** Scrieți un subprogram recursiv care returnează `1` dacă șirul de caractere `s` este palindrom și `0` altfel.

Mă opresc când cele două capete s-au întâlnit sau s-au încrucișat. Mă apropii mutând capătul stâng la dreapta și pe cel drept la stânga.

:::solutie
```cpp
int pal(char s[], int i, int j) {
    if (i >= j) return 1;
    if (s[i] != s[j]) return 0;
    return pal(s, i + 1, j - 1);
}
```

Apelul din programul principal, pentru un șir citit în `s`:

```cpp
cout << pal(s, 0, strlen(s) - 1);
```
:::

:::raspuns
Pentru `"rotator"` returnează `1`, pentru `"examen"` returnează `0`.
:::

:::atentie `i >= j`, nu `i == j`
Cu `i == j` funcția merge doar pentru șiruri de lungime impară, unde cele două capete se opresc exact pe caracterul din mijloc. Pentru lungime pară capetele se încrucișează fără să fie vreodată egale — `i` devine mai mare ca `j` — iar funcția trece pe lângă cazul de bază și citește în afara șirului. Este cea mai frecventă greșeală la acest tip de cerință și costă tot punctajul, pentru că programul dă un rezultat aberant, nu o eroare vizibilă.
:::

---

## 4. Divide et impera — tiparul „împart în două și combin”

**Cerință.** Scrieți un subprogram recursiv care determină valoarea maximă dintr-un tablou `v`, folosind metoda divide et impera.

Aici pasul nu mai taie o bucată mică, ci **înjumătățește**. Mă opresc când intervalul are un singur element.

:::solutie
```cpp
int maxim(int v[], int st, int dr) {
    if (st == dr) return v[st];
    int m = (st + dr) / 2;
    int a = maxim(v, st, m);
    int b = maxim(v, m + 1, dr);
    return a > b ? a : b;
}
```

Cele trei etape ale metodei sunt vizibile în cod: **împarte** (calculul lui `m`), **stăpânește** (cele două autoapeluri), **combină** (comparația finală).
:::

Pentru `v = {7, 2, 19, 4, 19, 3, 11}` și apelul `maxim(v, 0, 6)`, rezultatul este `19`.

:::atentie `m + 1`, nu `m`
Dacă a doua jumătate pornește de la `m` în loc de `m + 1`, elementul din mijloc ajunge în ambele jumătăți. Pentru maxim, rezultatul rămâne din întâmplare corect — dar intervalul nu se mai micșorează când `dr = st + 1`, iar programul intră în autoapel infinit. Este genul de greșeală care trece testul mental și pică la rulare.
:::

:::alternativa Nu confunda „recursiv” cu „divide et impera”
Se poate scrie și așa:

```cpp
int maxim2(int v[], int n) {
    if (n == 1) return v[0];
    int m = maxim2(v, n - 1);
    return v[n - 1] > m ? v[n - 1] : m;
}
```

Este tot recursiv și tot corect, dar **nu** este divide et impera: taie câte un element, nu împarte în două. Dacă cerința spune explicit „prin metoda divide et impera”, varianta aceasta nu ia punctajul.
:::

---

## 5. Backtracking — tiparul „încerc, verific, mă întorc”

**Cerință.** Generați, în ordine lexicografică, toate șirurile de `n` cifre binare care nu conțin două valori de `1` alăturate.

Backtracking-ul este recursivitate cu o buclă înăuntru: pe fiecare poziție încerc pe rând toate valorile posibile, verific dacă valoarea este acceptabilă și, dacă da, merg mai departe.

:::solutie
```cpp
int x[20], n;

void afis(int k) {
    for (int i = 1; i <= k; i++) cout << x[i];
    cout << '\n';
}

void back(int k) {
    for (int val = 0; val <= 1; val++) {
        if (val == 1 && k > 1 && x[k - 1] == 1) continue;
        x[k] = val;
        if (k == n) afis(k);
        else back(k + 1);
    }
}
```

Apelul se face cu `back(1)`, după citirea lui `n`.

Condiția de validare este singura parte specifică problemei: un `1` nu se poate pune dacă pe poziția dinainte este tot `1`. Restul scheletului este identic pentru orice problemă de generare.
:::

Pentru `n = 4`, programul afișează, în ordine:

```text
0000
0001
0010
0100
0101
1000
1001
1010
```

:::raspuns
8 soluții pentru $n = 4$, și 5 soluții pentru $n = 3$.
:::

:::alternativa O observație care merită văzută
Numărul de soluții pentru $n = 1, 2, 3, 4, 5$ este $2, 3, 5, 8, 13$ — șirul lui Fibonacci. Nu este o coincidență: un șir valid de lungime $n$ fie se termină în `0`, și atunci în față poate sta orice șir valid de lungime $n-1$, fie se termină în `1`, caz în care înaintea lui trebuie să fie `0`, deci un șir valid de lungime $n-2$.

La examen nu ți se cere demonstrația, dar relația este o verificare rapidă: dacă programul tău afișează alt număr de soluții, ai greșit condiția.
:::

---

## Cele patru greșeli care costă cel mai des puncte

1. **Cazul de bază lipsă sau prea îngust.** `i == j` în loc de `i >= j`, `n < 10` în loc de `n == 0`. Programul nu se oprește sau citește în afara datelor.
2. **Pasul care nu se apropie de oprire.** Un autoapel cu același argument, sau cu un interval care nu se micșorează, înseamnă autoapel infinit.
3. **Afișarea pusă pe partea greșită a autoapelului.** Vezi cerința 2. Aceeași funcție, cu `cout` mutat, dă alt rezultat.
4. **Variabile locale confundate cu globale.** Într-o funcție recursivă, fiecare apel are propriile variabile locale. Un contor care trebuie să supraviețuiască între apeluri trebuie declarat global sau transmis prin referință — altfel se resetează la fiecare apel și nu vei înțelege de ce.

## Cum exersezi mai departe

Ia fiecare cerință de mai sus și **modific-o**: suma cifrelor pare, palindrom care ignoră spațiile, minimul în loc de maximul, generarea șirurilor fără doi de `0` alăturați. Dacă poți adapta tiparul, l-ai înțeles. Dacă poți doar reproduce codul, încă nu.

Apoi treci pe subiecte oficiale, de pe [subiecte.edu.ro](https://subiecte.edu.ro), cronometrat.

Dacă vrei să lucrezi capitolul acesta sistematic, cu cod scris și rulat la fiecare ședință, asta facem la [meditațiile de informatică pentru BAC](/meditatii-informatica-bac).
