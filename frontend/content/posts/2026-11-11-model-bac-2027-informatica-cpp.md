---
title: "Model subiect BAC 2027 Informatică C++ (mate-info), rezolvat integral"
description: "Modelul oficial pentru proba de informatică de la Bacalaureat 2027, specializarea matematică-informatică, limbajul C/C++: grilele explicate, pseudocodul trasat pas cu pas și programele de la Subiectul al III-lea, compilate și rulate."
publishDate: 2026-11-11
slug: "model-subiect-bac-2027-informatica-cpp-rezolvat"
category: "Examene"
math: true
coverImage: /blog/model-bac-2027-informatica-cpp.jpg
tags:
  - Bacalaureat 2027
  - Model BAC 2027
  - Informatică BAC
  - C++
  - Subiecte rezolvate
---

Modelul de subiect pentru **proba E. d) Informatică, Bacalaureat 2027**, a fost publicat pe 1 noiembrie 2026 pe [subiecte.edu.ro](https://subiecte.edu.ro/2027/bacalaureat/modeledesubiecte/probescrise/). Mai jos este varianta pentru **specializarea matematică-informatică (și intensiv informatică), limbajul C/C++**, rezolvată integral.

Structura rămâne cea cunoscută: Subiectul I are cinci grile de câte 4 puncte, Subiectul al II-lea (40 de puncte) cere trasarea unui algoritm în pseudocod plus două cerințe scurte, iar Subiectul al III-lea (30 de puncte) cere un subprogram, un program cu șiruri de caractere și un program cu fișier și algoritm eficient.

:::atentie Codul de aici a fost compilat și rulat
Fiecare program din articol a fost compilat cu `g++ -std=c++14 -Wall` și rulat pe exemplele din enunț; rezultatele citate sunt cele afișate efectiv. Am verificat toate răspunsurile cu baremul oficial. Baremul punctează orice rezolvare corectă, nu doar cea de aici.
:::

## Subiectul I — grile (20 de puncte)

### 1. Expresia cu valoarea 0

Expresiile sunt comparații `==`, care în C/C++ valorează `1` dacă sunt adevărate și `0` altfel. Trebuie găsită singura comparație falsă. Tot calculul este cu numere întregi, deci `/` este împărțire întreagă.

| Variantă | Membrul drept | Comparația |
|---|---|---|
| A | `27/(3*3*3)` = `27/27` = 1 | `27==1` → **0** |
| B | `(27+1)/3*3` = `28/3*3` = `9*3` = 27 | `27==27` → 1 |
| C | `9+9+9` = 27 | 1 |
| D | `29/3 + 28/3 + 27/3` = `9+9+9` = 27 | 1 |

:::raspuns
**A**
:::

La B, ordinea contează: `/` și `*` au aceeași prioritate și se evaluează de la stânga la dreapta, deci `28/3*3` înseamnă `(28/3)*3`, nu `28/(3*3)`.

### 2. Accesarea unui câmp dintr-un tablou de structuri

`p` este tabloul, `pret` este câmpul. A treia pereche are indicele 2, deci întâi se alege elementul, `p[2]`, apoi câmpul lui: `p[2].pret`.

:::raspuns
**D** — `p[2].pret`
:::

### 3. Subprogram recursiv

```cpp
int f(int n, int k)
{ if(n==0) return 0;
  else if(k*k<=n) return k+f(n/2,k+1);
       else return k+f(n/2,n);
}
```

Aici nu există o scurtătură — se trasează. Atenția trebuie pusă pe a doua ramură: când `k*k > n`, al doilea argument devine **`n`**, nu `k+1`.

:::solutie
```text
f(97,0):  0*0 <= 97  →  0 + f(48,1)
f(48,1):  1*1 <= 48  →  1 + f(24,2)
f(24,2):  2*2 <= 24  →  2 + f(12,3)
f(12,3):  3*3 <= 12  →  3 + f(6,4)
f(6,4):   4*4 >  6   →  4 + f(3,6)     ← k devine n = 6
f(3,6):   6*6 >  3   →  6 + f(1,3)     ← k devine n = 3
f(1,3):   3*3 >  1   →  3 + f(0,1)
f(0,1):   n == 0     →  0
```

Suma: $0 + 1 + 2 + 3 + 4 + 6 + 3 + 0 = 19$. Am rulat funcția: afișează `19`.
:::

:::raspuns
**C** — 19
:::

### 4. Backtracking — a șasea soluție

Se generează submulțimi (ordinea elementelor din set nu contează, deci echipamentele apar în ordinea din mulțime), cu suma exact 200 de lei. Cele trei soluții date confirmă regula: după `(rucsac, ...)` vin toate combinațiile care încep cu rucsacul, apoi cele cu bocancii, apoi cele cu lanterna.

:::solutie
Continuăm de la a treia soluție:

1. (rucsac, lanternă, bidon, hartă) — dat
2. (rucsac, lanternă, busolă) — dat
3. (rucsac, bidon, busolă, hartă) — dat
4. (rucsac, pelerină) — 100 + 100
5. (bocanci) — 200, singur
6. **(lanternă, bidon, pelerină, hartă)** — 50 + 20 + 100 + 30

Varianta C, (lanternă, pelerină, busolă), este și ea o soluție, dar vine **a șaptea**: după lanternă, generarea încearcă întâi bidonul, care e înaintea pelerinei în mulțime.
:::

:::raspuns
**D**
:::

Am verificat ordinea cu un program de backtracking care generează toate soluțiile: sunt opt, iar a șasea este exact cea de mai sus.

### 5. Arbore cu rădăcină

Arborele are cinci niveluri, de la 0 la 4. Nodurile de pe nivelul 4 sunt frunze (0 fii). Pe nivelurile 0, 1 și 3 numărul de fii trebuie să fie diferit de 4 (cel de pe nivelul 2), diferit de 0 și diferit de la un nivel la altul.

:::solutie
Notăm cu $a, b, 4, c$ numărul de fii ai unui nod de pe nivelurile 0, 1, 2, 3. Numărul de noduri este:

$$1 + a + ab + 4ab + 4abc$$

Valorile $a, b, c$ sunt distincte, nenule și diferite de 4, deci cele mai mici posibile sunt $1, 2, 3$, într-o ordine de ales. Termenul $4abc = 24$ este același pentru orice ordine; diferă doar $a + 5ab$, care e minim pentru $a = 1$, $b = 2$, deci $c = 3$:

$$1 + 1 + 2 + 8 + 24 = 36 \text{ noduri, dintre care } 4abc = 24 \text{ pe ultimul nivel.}$$
:::

:::raspuns
**B** — 24
:::

:::atentie Intuiția „pune 1 cât mai jos” este greșită aici
Tentația este să alegi $c = 1$, ca ultimul nivel să fie cât mai mic. Dar atunci $a$ și $b$ trebuie să fie 2 și 3, iar nivelurile 1–3 se umplu: $1 + 2 + 6 + 24 + 24 = 57$ noduri. Minimul total vine din a pune **1 sus**, la rădăcină. Am verificat cu un program care încearcă toate combinațiile: minimul este 36, cu 24 de noduri pe ultimul nivel.
:::

## Subiectul al II-lea (40 de puncte)

### 1. Algoritmul în pseudocod

```text
citește x,y (numere naturale)
n←1
┌cât timp x>0 execută
│ ok←1
│┌cât timp ok=1 execută
││┌dacă x%2=0 atunci
│││ y←y*y; x←[x/2]
│││altfel
│││ x←x-1; ok←0
││└■
│└■
│ n←n*y
└■
scrie n
```

Înainte de orice trasare, merită recunoscut ce face: este **ridicarea rapidă la putere**. Cât timp `x` e par, `y` se ridică la pătrat și `x` se înjumătățește; când `x` e impar, se scade 1 și `y` curent intră în produs. La final, `n` este $y^x$ (cu valorile inițiale).

**a) Ce se afișează pentru 11 și 2?**

:::solutie
```text
x=11 impar → x=10, ok=0          n = 1·2   = 2
x=10 par   → y=4,  x=5
x=5  impar → x=4,  ok=0          n = 2·4   = 8
x=4  par   → y=16, x=2
x=2  par   → y=256, x=1
x=1  impar → x=0,  ok=0          n = 8·256 = 2048
```
:::

:::raspuns
`2048` — adică $2^{11}$.
:::

**b) Primul număr citit este 3. Două valori ale lui `y` din [1,10] pentru care se afișează un număr din [27,127].**

Rezultatul este $y^3$, iar $3^3 = 27$, $4^3 = 64$, $5^3 = 125$ sunt în interval, în timp ce $2^3 = 8$ și $6^3 = 216$ nu sunt. Oricare două dintre **3, 4, 5** iau punctajul.

**c) Programul C/C++**

:::solutie
```cpp
#include <iostream>
using namespace std;

int main()
{
    int x, y, n, ok;
    cin >> x >> y;
    n = 1;
    while (x > 0)
    {
        ok = 1;
        while (ok == 1)
            if (x % 2 == 0)
            {
                y = y * y;
                x = x / 2;
            }
            else
            {
                x = x - 1;
                ok = 0;
            }
        n = n * y;
    }
    cout << n;
    return 0;
}
```

Rulat cu `11 2`, afișează `2048`; cu `3 4`, afișează `64`.
:::

`[x/2]` din pseudocod este partea întreagă — în C++ asta face deja `x / 2` pe întregi. Nu e nevoie de nicio funcție.

**d) Algoritm echivalent, cu structură repetitivă cu test final în locul primei structuri `cât timp`**

Aici se pierd cele mai multe puncte din subiect, iar baremul o spune explicit: 3 puncte sunt pentru „tratarea cazului `x=0`”. O structură cu test final se execută **cel puțin o dată**. Dacă `x` citit este 0, varianta originală nu intră deloc în buclă și afișează 1; o buclă `execută…cât timp` fără protecție ar intra, iar bucla interioară ar rula la nesfârșit (0 este par, deci `x` rămâne 0, iar `ok` nu devine niciodată 0).

:::solutie
```text
citește x,y (numere naturale)
n←1
┌dacă x>0 atunci
│┌execută
││ ok←1
││┌cât timp ok=1 execută
│││┌dacă x%2=0 atunci
││││ y←y*y; x←[x/2]
││││altfel
││││ x←x-1; ok←0
│││└■
││└■
││ n←n*y
│└cât timp x>0
└■
scrie n
```
:::

### 2. Graf orientat — drum și circuit neelementar

Arcele: (4,5), (2,1), (3,1), (1,4), (1,2), (5,3).

:::solutie
**Drum de lungime cel puțin 3:** 1, 4, 5, 3 — folosește arcele (1,4), (4,5), (5,3), deci are lungimea 3.

**Circuit neelementar:** 1, 2, 1, 4, 5, 3, 1. Este un circuit — pornește și se termină în 1 și folosește arce distincte: (1,2), (2,1), (1,4), (4,5), (5,3), (3,1). Nu este elementar, pentru că vârful 1 apare și în interior, nu doar la capete.
:::

Construcția este „lipirea” celor două circuite elementare care trec prin 1: 1→2→1 și 1→4→5→3→1. Un circuit elementar ar lua doar 3 din cele 6 puncte, iar baremul o spune explicit.

### 3. Completarea unui tablou bidimensional

Fiecare linie a tabloului este `2 2 0 0 2 2 7 7`, deci valoarea depinde doar de coloana `j`. Coloanele vin în perechi: `j/2` este 0, 1, 2, 3 pentru perechile (0,1), (2,3), (4,5), (6,7).

:::solutie
```cpp
for(i=0;i<8;i++)
    for(j=0;j<8;j++)
        if (j / 2 == 1) a[i][j] = 0;
        else if (j < 6) a[i][j] = 2;
        else a[i][j] = 7;
```

Exact trei atribuiri, cât permite cerința. Rulată, secvența produce opt linii `2 2 0 0 2 2 7 7`.
:::

## Subiectul al III-lea (30 de puncte)

### 1. Subprogramul `parcele`

Un teren de $x \times y$ metri se împarte în pătrate de latură $d$ exact când $d$ divide și pe $x$, și pe $y$ — adică $d$ este **divizor comun**. Pentru fiecare astfel de $d$, numărul de parcele este $\frac{x}{d} \cdot \frac{y}{d}$.

:::solutie
```cpp
void parcele(int x, int y)
{
    for (int d = 1; d <= x && d <= y; d++)
        if (x % d == 0 && y % d == 0)
            cout << (x / d) * (y / d) << " cu latura " << d << ";";
}
```

Pentru `parcele(18, 24)` afișează exact
`432 cu latura 1;108 cu latura 2;48 cu latura 3;12 cu latura 6;`
:::

Două detalii de format, punctate separat în barem: textul dintre valori este exact ` cu latura ` (cu spațiu înainte și după), iar după fiecare pereche vine `;`, fără spațiu și fără linie nouă. Cât despre tip: în cel mai rău caz, $x = y = 10^4$ și $d = 1$, produsul este $10^8$, care încape în `int`.

### 2. Cuvinte cu tot atâtea paranteze câte litere

:::solutie
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char s[201], *p;
    int nr = 0;
    cin.getline(s, 201);
    p = strtok(s, " ");
    while (p != NULL)
    {
        int litere = 0, paranteze = 0;
        for (int i = 0; p[i] != '\0'; i++)
            if (p[i] >= 'a' && p[i] <= 'z') litere++;
            else if (strchr("()[]{}", p[i]) != NULL) paranteze++;
        if (litere > 0 && litere == paranteze) nr++;
        p = strtok(NULL, " ");
    }
    cout << nr;
    return 0;
}
```

Pe textul din exemplu, `a(b5) xyz [x1]y2 (x) {a6bc} 27 pq {ba}a)`, programul afișează `3`.
:::

Cele trei cuvinte numărate sunt `a(b5)` (2 litere, 2 paranteze), `[x1]y2` (2 și 2) și `{ba}a)` (3 și 3). `(x)` are 1 literă și 2 paranteze, iar `{a6bc}` are 3 litere și 2 paranteze.

:::atentie „Atât paranteze, cât și litere” exclude cuvintele fără niciuna
Un cuvânt ca `27` are 0 litere și 0 paranteze — „în număr egal”, dar fără niciuna dintre ele. Condiția `litere > 0` îl exclude. Fără ea, programul ar număra și cifrele singure. Pe textul `27 xyz`, varianta de mai sus afișează corect `0`.
:::

Tabloul are 201 elemente pentru că textul are cel mult 200 de caractere, iar `cin.getline` mai are nevoie de unul pentru terminatorul `'\0'`.

### 3. Clasamentul echipelor — fișier și algoritm eficient

Fiecare număr din fișier lipește trei informații: numărul problemei (o cifră), punctajul (una sau două cifre) și indicativul echipei (două cifre). Indicativul este mereu ultimele două cifre: `x % 100`. Ce rămâne, `x / 100`, este problema urmată de punctaj — trei cifre dacă punctajul are două cifre, două cifre dacă are una. De aici: punctajul este `(x/100) % 100` când `x/100 > 99` și `(x/100) % 10` altfel.

**a) Descrierea algoritmului**

Citim numerele pe rând și, pentru fiecare, adunăm punctajul la totalul echipei și numărăm separat problemele cu 99 de puncte, în doi vectori indexați după indicativ. După citire, parcurgem indicativele crescător — adică în ordinea înscrierii — și păstrăm echipa cu totalul cel mai mare; la egalitate de total câștigă cea cu mai multe punctaje de 99, iar la egalitate și aici o păstrăm pe cea găsită prima. Algoritmul este eficient: fișierul se parcurge o singură dată, fără a memora numerele citite, iar la final se parcurg doar cele 90 de indicative posibile. Timpul este liniar în numărul de valori din fișier.

**b) Programul**

:::solutie
```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main()
{
    ifstream f("bac.txt");
    int total[100] = {0}, maxime[100] = {0}, apare[100] = {0};
    int x;
    while (f >> x)
    {
        int echipa = x % 100;
        int rest = x / 100;                       // problema + punctaj
        int punctaj = (rest > 99) ? rest % 100 : rest % 10;
        total[echipa] += punctaj;
        if (punctaj == 99) maxime[echipa]++;
        apare[echipa] = 1;
    }
    int prima = -1;
    for (int e = 10; e <= 99; e++)                // ordinea înscrierii
        if (apare[e])
            if (prima == -1 || total[e] > total[prima] ||
                (total[e] == total[prima] && maxime[e] > maxime[prima]))
                prima = e;
    cout << prima;
    return 0;
}
```

Pe fișierul din exemplu afișează `12`.
:::

Verificarea pe exemplu, ca să fie clar de unde vine 12:

| Echipa | Punctaje | Total | Câte de 99 |
|---|---|---|---|
| 12 | 99, 80, 80 | 259 | 1 |
| 15 | 90, 70, 99 | 259 | 1 |
| 11 | 90, 80, 89 | 259 | 0 |
| 10 | 99, 0, 99 | 198 | 2 |
| 30 | 20 | 20 | 0 |

Trei echipe la egalitate pe 259; 11 iese a treia (nicio problemă de 99), iar între 12 și 15 decide ordinea înscrierii. Echipa 10 are cele mai multe punctaje de 99, dar criteriul acesta contează doar la egalitate de total.

:::alternativa De ce vectorul `apare`
Baremul compară direct punctajele tuturor indicativelor. Vectorul `apare` adaugă o protecție pentru un caz-limită: dacă toate rezultatele din fișier ar fi 0, o comparație fără el ar putea „câștiga” cu un indicativ care nu a trimis nimic. Pe datele din enunț nu schimbă nimic.
:::

:::atentie Nu memora fișierul
Fișierul poate avea până la $10^6$ numere. Un program care le citește întâi într-un tablou și apoi le sortează funcționează, dar nu este liniar și pierde punctul pentru eficiență. Informația necesară încape în doi vectori de 100 de elemente, completați pe măsură ce citești.
:::

## Ce ne spune modelul

- **Recunoașterea algoritmului scurtează tot Subiectul al II-lea.** Cine vede că pseudocodul calculează $y^x$ rezolvă b) fără nicio trasare.
- **Punctele de la d) sunt despre cazul-limită**, nu despre sintaxă. Transformarea `cât timp` → `execută…cât timp` fără `dacă x>0` este greșeala clasică.
- **Formatul afișării se punctează separat** — la III.1, 2 puncte sunt doar pentru „` cu latura `” și „`;`”.

Pentru capitolele din spatele acestor cerințe, am scris despre [recursivitate](/blog/recursivitate-bac-informatica-cerinte-rezolvate) și despre [parcurgerile de matrice](/blog/matrice-bac-informatica-parcurgeri), tot cu cod rulat. Iar dacă vrei să lucrezi sistematic, cu cod scris și corectat la fiecare ședință, asta facem la [meditațiile de informatică pentru BAC](/meditatii-informatica-bac).
