---
title: "Șiruri de caractere la BAC informatică: cinci cerințe tipice, rezolvate în C++"
description: "strtok, strlen, strchr și parcurgerea caracter cu caracter — pe cerințele care apar an de an la Subiectul III.2: numărarea cuvintelor, transformarea textului, eliminarea vocalelor, cel mai lung cuvânt și un „ce afișează” cu pointeri. Cod compilat și rulat."
publishDate: 2026-12-30
slug: "siruri-de-caractere-bac-informatica"
category: "Examene"
math: true
coverImage: /blog/siruri-de-caractere-bac-informatica.jpg
tags:
  - Bacalaureat 2027
  - Informatică BAC
  - C++
  - Șiruri de caractere
  - Subiecte rezolvate
---

A doua cerință de la Subiectul al III-lea, la informatică, este de foarte mulți ani un program cu **șiruri de caractere**: se citește un text, de obicei cu cuvinte separate prin câte un spațiu, și se cere ceva despre cuvinte sau despre litere. În [modelul oficial pentru 2027](/blog/model-subiect-bac-2027-informatica-cpp-rezolvat) au fost numărate cuvintele cu tot atâtea paranteze câte litere.

Cerințele variază, dar uneltele sunt mereu aceleași patru: `cin.getline`, `strtok`, `strlen` și parcurgerea caracter cu caracter. Mai jos, cinci cerințe tipice, fiecare cu unealta potrivită.

:::atentie Cerințele de mai jos sunt scrise de mine
Sunt formulate în stilul cerințelor de examen, dar **nu sunt subiecte oficiale**. Subiectele și baremele oficiale sunt pe [subiecte.edu.ro](https://subiecte.edu.ro). Fiecare program a fost compilat cu `g++ -std=c++14 -Wall` și rulat pe exemplul dat; ieșirile citate sunt cele afișate.
:::

## Înainte de orice: citirea textului

```cpp
char s[256];
cin.getline(s, 256);
```

Două lucruri care costă puncte dacă sunt greșite:

- **`cin >> s` citește doar până la primul spațiu.** Pentru un text cu mai multe cuvinte, ai citi doar primul cuvânt. Programul nu dă eroare — dă rezultat greșit.
- **Dimensiunea tabloului este lungimea maximă plus 1**, pentru terminatorul `'\0'`. „Cel mult 255 de caractere” înseamnă `char s[256]`.

## 1. Numărarea cuvintelor cu o proprietate — `strtok`

**Cerință.** Se citește un text de cel mult 255 de caractere, cu cuvinte formate din litere mici ale alfabetului englez, separate prin câte un spațiu. Afișați câte cuvinte încep și se termină cu aceeași literă.

Exemplu: pentru `ana are o carte deschisa pe masa` se afișează `2`.

:::solutie
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char s[256], *p;
    int nr = 0;
    cin.getline(s, 256);
    p = strtok(s, " ");
    while (p != NULL)
    {
        if (p[0] == p[strlen(p) - 1]) nr++;
        p = strtok(NULL, " ");
    }
    cout << nr;
    return 0;
}
```

Rulat pe exemplu, afișează `2`.
:::

Cele două cuvinte sunt `ana` și — mai puțin evident — `o`. Un cuvânt dintr-o singură literă începe și se termină cu aceeași literă. Programul îl numără corect fără niciun caz special, pentru că `p[0]` și `p[strlen(p) - 1]` sunt atunci același caracter. Dacă rezolvarea ta are un `if` separat pentru cuvintele de lungime 1, probabil nu e nevoie de el.

:::atentie `strtok` modifică textul
`strtok` înlocuiește separatorii cu `'\0'`. După parcurgere, `s` conține doar primul cuvânt. Dacă cerința îți cere să afișezi și textul inițial, fă o copie cu `strcpy` **înainte** de `strtok`.
:::

## 2. Transformarea textului — parcurgere caracter cu caracter

**Cerință.** Pentru un text de tipul de mai sus, transformați în majusculă prima literă a fiecărui cuvânt și afișați textul obținut.

Aici `strtok` ar fi o alegere proastă: ar distruge spațiile, iar textul trebuie afișat întreg. Se parcurge caracter cu caracter.

:::solutie
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char s[256];
    cin.getline(s, 256);
    for (int i = 0; s[i] != '\0'; i++)
        if (i == 0 || s[i - 1] == ' ')
            s[i] = s[i] - 'a' + 'A';
    cout << s;
    return 0;
}
```

Pentru `ana are o carte deschisa pe masa` afișează `Ana Are O Carte Deschisa Pe Masa`.
:::

„Prima literă a unui cuvânt” înseamnă: prima literă a textului sau o literă precedată de spațiu. `s[i] - 'a' + 'A'` mută litera din intervalul `'a'…'z'` în `'A'…'Z'`, pentru că literele sunt consecutive în codul ASCII. Se poate folosi și `toupper` din `<cctype>`, dar formula arată corectorului că știi de ce funcționează.

Ordinea condițiilor din `if` contează: `i == 0` se verifică primul, iar `s[i - 1]` se evaluează doar pentru `i > 0`. Inversate, la `i = 0` ai citi `s[-1]`, în afara tabloului.

## 3. Eliminarea unor caractere — construiește un șir nou

**Cerință.** Eliminați toate vocalele din text și afișați rezultatul.

:::solutie
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char s[256], t[256];
    int k = 0;
    cin.getline(s, 256);
    for (int i = 0; s[i] != '\0'; i++)
        if (strchr("aeiou", s[i]) == NULL)
            t[k++] = s[i];
    t[k] = '\0';
    cout << t;
    return 0;
}
```

Pentru `examen de bacalaureat la informatica` afișează `xmn d bclrt l nfrmtc`.
:::

`strchr("aeiou", s[i])` întoarce `NULL` dacă `s[i]` nu se află în șirul `"aeiou"` — un mod scurt de a scrie cinci comparații.

:::alternativa De ce nu `strcpy(s + i, s + i + 1)`
Multe culegeri elimină un caracter prin `strcpy(s + i, s + i + 1)`, adică mutând restul textului cu o poziție la stânga. Merge pe compilatoarele folosite la școală, dar standardul C++ spune explicit că `strcpy` cu sursa și destinația suprapuse are comportament nedefinit. Construirea unui șir nou, ca mai sus, este la fel de scurtă, corectă garantat și mai ușor de urmărit. Dacă totuși vrei să lucrezi pe loc, mută caracterele cu o buclă proprie sau cu `memmove`.

Și un detaliu: după o eliminare pe loc, **nu** incrementa `i`, altfel sari peste caracterul care tocmai a ajuns pe poziția `i`. Două vocale alăturate, ca în `ea`, prind greșeala imediat.
:::

Nu uita `t[k] = '\0'` la final. Fără el, `cout << t` afișează tot ce se află în memorie după ultimul caracter copiat, până dă întâmplător de un zero.

## 4. Cel mai lung cuvânt — `strtok` cu memorare

**Cerință.** Afișați cel mai lung cuvânt din text. Dacă sunt mai multe de aceeași lungime maximă, se afișează primul dintre ele.

:::solutie
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char s[256], *p, cel[256] = "";
    cin.getline(s, 256);
    p = strtok(s, " ");
    while (p != NULL)
    {
        if (strlen(p) > strlen(cel)) strcpy(cel, p);
        p = strtok(NULL, " ");
    }
    cout << cel;
    return 0;
}
```

Pentru `un examen de informatica si unul de matematica` afișează `informatica` — 11 litere, față de cele 10 ale lui `matematica`.
:::

`>` strict, nu `>=`, este cel care păstrează **primul** cuvânt de lungime maximă. Cu `>=`, programul l-ar afișa pe ultimul. O singură literă din program decide dacă respecți cerința.

De ce `strcpy(cel, p)` și nu `cel = p`? Tablourile nu se atribuie în C++. Un pointer `char *cel = p` ar funcționa aici, dar doar pentru că `p` arată în interiorul lui `s`, care nu se modifică după aceea. Copia e soluția sigură.

## 5. „Ce afișează?” — pointeri în șir

Cerințele de la Subiectul I sau al II-lea testează adesea dacă știi ce întorc funcțiile pe șiruri.

**Cerință.** Ce afișează secvența de mai jos?

```cpp
char s[20] = "bacalaureat";
cout << strlen(s) << ' ';
cout << strchr(s, 'l') - s << ' ';
cout << s + 7 << ' ';
s[3] = '\0';
cout << s << ' ' << strlen(s);
```

:::solutie
- `strlen(s)` este **11** — numărul de caractere, fără `'\0'`.
- `strchr(s, 'l')` întoarce adresa primului `l`. Scăzând adresa de început `s` obții **poziția** lui: b(0) a(1) c(2) a(3) l(**4**).
- `s + 7` este adresa caracterului de pe poziția 7, iar `cout` afișează de acolo până la final: **reat**.
- `s[3] = '\0'` taie șirul după primele trei caractere: `s` devine **bac**, cu lungimea **3**.
:::

:::raspuns
`11 4 reat bac 3` — verificat prin rulare.
:::

## Lista de verificare

1. Textul se citește cu `cin.getline`, nu cu `cin >>`.
2. Tabloul are lungimea maximă **plus 1**.
3. Dacă afișezi textul transformat, nu folosi `strtok` pe el — sau lucrează pe o copie.
4. Orice șir construit de mână se termină cu `'\0'`.
5. Comparațiile `>` și `>=` decid dacă reții primul sau ultimul element cu o proprietate — citește cerința.
6. Cazurile-limită: un cuvânt de o literă, un text cu un singur cuvânt, două caractere căutate alăturate.

Pentru alte capitole din aceeași probă am scris despre [subprograme](/blog/subprograme-bac-informatica-subiectul-3), [recursivitate](/blog/recursivitate-bac-informatica-cerinte-rezolvate) și [matrice](/blog/matrice-bac-informatica-parcurgeri). Iar dacă vrei să lucrezi sistematic, cu cod scris și corectat la fiecare ședință, asta facem la [meditațiile de informatică pentru BAC](/meditatii-informatica-bac).
