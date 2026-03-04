

# Puslapio analizė ir pasiūlymai

## Dabartinė būklė

Puslapio SEO pagrindas yra tvirtas: yra `react-helmet-async` dinaminiam meta valdymui, struktūrizuoti JSON-LD duomenys (Organization, WebSite, ProfessionalService), sitemap.xml, robots.txt, OG/Twitter kortelės, dvikalbė sistema (EN/EL).

---

## Rastos problemos ir pasiūlymai

### 1. SEO problemos

**a) Dubliuojami meta tagai** — `index.html` ir `SEOHead.tsx` abu nustato tuos pačius meta tagus (title, description, OG, Twitter). Kai React Helmet atnaujina DOM, liks du rinkiniai meta tagų. Reikia pašalinti dubliuojamus meta tagus iš `index.html`, paliekant tik minimalų rinkinį (charset, viewport, preconnect, favicon).

**b) StructuredData.tsx logotipo URL** — `OrganizationSchema` naudoja `favicon.ico` kaip logotipą (`logo: "https://devcraft101.lovable.app/favicon.ico"`). Geriau naudoti SVG logotipą: `/devcraft-logo.svg`.

**c) Socialinių tinklų nuorodos yra placeholder** — `sameAs` schema.org ir footer nuorodos rodo į `https://facebook.com` ir `https://instagram.com` (ne į tikrus DevCraft profilius). Tai kenkia SEO patikimumui.

**d) FAQPage schema trūksta** — FAQ sekcija egzistuoja, bet nėra `FAQPage` JSON-LD schema, kuri leistų Google rodyti FAQ tiesiai paieškos rezultatuose.

### 2. Veikimo (Performance) pasiūlymai

**a) Šrifto įkėlimas blokuoja renderingą** — `index.css` importuoja Google Fonts per `@import url(...)`, kuris blokuoja CSS parsavimą. Geriau naudoti `<link rel="preload">` iš `index.html` (preconnect jau yra, bet trūksta paties šrifto link tag).

**b) Hero paveikslėlis neturi `srcset`** — `hero-banner.jpg` yra 1920x1080 ir kraunamas visur vienodai, net ir mobile. Galima pridėti mažesnę versiją mobile.

### 3. Accessibility (A11y)

**a) Kalbos selektorius mobile menu dubliuojamas** — Dabar `LanguageSelector` rodomas ir navbar header, ir atidarytame mobile menu. Reikia pašalinti iš menu vidaus.

**b) Skip-to-content nuoroda** — Nėra "Skip to main content" nuorodos, kuri padeda keyboard navigacijai.

### 4. Funkcionalumo pasiūlymai

**a) Kontaktų forma neturi backend** — CTA forma tik validuoja ir rodo "sent" animaciją, bet realiai nepersiunčia duomenų. Reikia Supabase Edge Function arba trečiosios šalies paslaugos (pvz., EmailJS, Resend).

**b) 404 puslapis** — Reikia patikrinti ar `NotFound.tsx` turi tinkamą SEO (noindex) ir dizainą.

---

## Planuojami pakeitimai

### Failai, kuriuos reikia redaguoti:

1. **`index.html`** — Pašalinti dubliuojamus meta tagus (title, description, OG, Twitter, robots, canonical), palikti tik: charset, viewport, preconnect, favicon, Google Fonts `<link>` tag. Pridėti šrifto preload.

2. **`src/index.css`** — Pakeisti `@import url(...)` į komentarą arba pašalinti (nes šriftai bus kraunami per HTML link tag).

3. **`src/components/StructuredData.tsx`** — Atnaujinti `logo` URL į SVG. Pridėti `FAQPage` JSON-LD schemą su visais FAQ klausimais/atsakymais (abiem kalbomis, naudojant `useLang`).

4. **`src/components/landing/Navbar.tsx`** — Pašalinti dubliuojamą `LanguageSelector` iš mobile fullscreen menu (eilutės 156-164), nes jis jau matomas header juostoje.

5. **`src/pages/Index.tsx`** — Importuoti ir pridėti `FAQPageSchema` komponentą.

6. **`src/App.tsx`** — Pridėti skip-to-content nuorodą prieš `<Routes>`.

### Neliečiami failai:
- Kontaktų formos backend (reikia Supabase integracijos — atskiras žingsnis)
- Socialinių tinklų URL (nežinome tikrų profilių)

