**Role:** Act as a Senior Full-Stack Engineer and Lead UI/UX Designer specializing in EdTech platforms.

**Project Goal:** Create a high-performance, visually stunning landing page for a premium tutoring service ("meditații") based in Romania.

**Design & Animation Specs (Framer Motion Focus):**
1.  **Global Scroll Reveals:** No element should just "appear." All sections must use `whileInView` triggers to fade in and slide up (`y: 50 -> 0`) as the user scrolls.
2.  **Hero Background:** Create a **dynamic background** (e.g., slowly moving abstract blobs with blur filters or a particle network) behind the text to create depth.
3.  **Staggered Grids:** The module cards must not appear all at once. Use `staggerChildren` variants so they pop in one by one (1st, then 2nd, then 3rd).
4.  **Micro-interactions:**
    * **Buttons:** Scale up slightly (`scale: 1.05`) and increase brightness on hover. Tap click effects (`scale: 0.95`).
    * **Cards:** On hover, apply a "Glassmorphism" glow, lift the card up (`y: -10px`), and add a subtle drop-shadow.

**Tech Stack:**
* **Backend:** Python Django (Django Rest Framework for API).
* **Frontend:** React (Vite), TypeScript.
* **Styling:** Tailwind CSS (for layout and typography).
* **Animations:** Framer Motion (for complex transitions and the typewriter effect).

**Design Language:**
* **Vibe:** Professional, modern, trustworthy, yet energetic.
* **Palette:** Deep royal blues, clean whites, and vibrant accent colors (e.g., orange or teal) for call-to-action buttons.
* **Typography:** Professional sans-serif fonts (e.g., Inter or Montserrat).
* **UI Elements:** Glassmorphism cards, smooth gradients, and subtle hover effects.

**Content & Structure (Language: Romanian):**

1.  **Header (Navbar):**
    * Logo text: "AlgoMate" (or similar placeholder).
    * Links: Acasă, Module, Despre Noi, Contact.
    * CTA Button: "Înscrie-te Acum".

2.  **Hero Section (The "Hook"):**
    * **Layout:** Centered, immersive, with a subtle animated background (particles or gradient flow).
    * **Headline:** A large, bold motivational phrase.
    * **Animation:** Implement a **Typewriter Effect** for the final part of the sentence.
    * **Text Logic:**
        * Static text: "Investește în educația ta. Pregătește-te pentru..."
        * Typewriter words (looping): "Excelență.", "Succes.", "Viitor.", "BAC."
    * **Subtext:** "Platforma premium de meditații pentru elevii care țintesc nota 10."

3.  **The Modules Section (Grid Layout):**
    * **Title:** "Programele Noastre"
    * **Card 1:** "Meditații Matematică BAC" (Status: Active/Available). Icon: Math related. Description: "Algebră, Analiză și Geometrie explicate logic."
    * **Card 2:** "Meditații Informatică BAC" (Status: Active/Available). Icon: Code related. Description: "C++ și algoritmi pentru un punctaj maxim."
    * **Card 3:** "Python pentru Liceu" (Status: Coming Soon).
        * *Design:* Grayed out/Desaturated, lower opacity. Badge overlay: "În Curând".

4.  **Why Us Section (Added for completeness):**
    * Title: "De ce să ne alegi?"
    * 3 Bullet points with icons: "Profesori de Top", "Materiale Interactive", "Program Flexibil".

**5. Methodology & Benefits (The "Why Us" Grid)**
* **Design Directive:** Do NOT use a simple list. Create a **Responsive Grid of Feature Cards**. Each card should have a specific icon (Lucide-React) and a short title.
* **Animation:** Cards fade in and scale up (`scale: 0.9` -> `1.0`) when scrolled into view.
* **Content (Map these exactly to cards):**
    1.  **Online Premium:** "Meditații în format ONLINE"
    2.  **Continuitate:** "Activitate pe timpul verii"
    3.  **Interactivitate:** "Videoconferințe pe diverse teme (lecții, probleme, proiecte)"
    4.  **Resurse:** "Materiale personalizate, ușor de accesat"
    5.  **Mentorat:** "Sfaturi pentru a înțelege conceptele complexe"
    6.  **Cursuri Extra:** "Cursuri regulate, separate de meditații (ONLINE)"
    7.  **Evaluare:** "Testări regulate"
    8.  **Consolidare:** "Teme pentru fixarea cunoștințelor"
    9.  **Excelență:** "Teme interactive pentru performanță"
    10. **Feedback:** "Update-uri săptămânale pentru părinți"

6.  **Footer:**
    * Simple links, copyright, and social icons.

**Implementation Instructions:**
1.  Provide the **Django Project Structure** (models.py for the courses, serializers.py, views.py).
* Create a `Module` model (title, description, is_active, coming_soon_label).
* Create a `Feature` model (title, icon_name).
* Expose these via DRF for the frontend to consume.
2.  Provide the **React Components**:
    * `Hero.tsx` (Use `framer-motion` for the typewriter and entrance animations).
    * `CourseCard.tsx` (Handle the "grayed out" logic via props).
    * `LandingPage.tsx` (Assembling the sections).
3.  Ensure all text output is in **Romanian**.
4.  Focus on writing clean, modular code.

**Execute.**