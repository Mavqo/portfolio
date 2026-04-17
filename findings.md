# Findings & Decisions — Portfolio Enhancement

## Requirements
- Migliorare SOLO il frontend del portfolio esistente
- Usare agenti divisi per sezione del sito
- Ogni agente lavora in autonomia sulla propria sezione
- Mantenere Astro 4 + Tailwind 3 stabile
- Aggiungere screenshot reali dei progetti
- Completare i progetti placeholder
- Migliorare UX, conversione e credibilità

## Research Findings
- Portfolio attuale ha 7 sezioni: Hero, Problems, Services, Process, Projects, About, Contact
- Layout: Navigation sticky, Footer minimal, ScrollProgress
- i18n: sistema custom con fetch JSON (`/i18n/{lang}.json`)
- Dark mode: `data-theme` attribute + localStorage
- Build: Astro static → Docker → nginx
- Progetti esistenti dell'utente: leadspark, analytics-dashboard, osteria-bellavista

## Visual/Browser Findings
- **Screenshot 2026-04-03:** Sito live mostra design pulito ma con alcuni elementi generici
  - Hero: illustrazione SVG semplice, manca social proof
  - Problems: 3 card basic con icone generiche, manca la "soluzione"
  - Services: bento grid funzionale, mancano prezzi e CTA diretti
  - Process: 3 step su sfondo scuro, linea gradient, mancano tempistiche
  - Projects: solo 1 progetto reale (Osteria), 2 placeholder "In arrivo" opacizzati
  - About: foto + testo + tag skills, mancano numeri/achievement
  - Contact: form basic + 2 social link placeholder (href="#")
  - Footer: solo copyright, nessun link utile

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Mantenere componenti Astro esistenti | Enhancement incrementale, non redesign totale |
| Usare solo CSS/Tailwind per animazioni | Evita aggiunta di librerie esterne e problemi di build |
| Screenshot progetti da `/assets/` | Stesso pattern usato per Osteria Bellavista |
| Aggiungere `data-animate` per scroll reveal | Sistema già presente in MainLayout.astro con IntersectionObserver |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| - | - |

## Resources
- Sito live: https://portfolio-production-953a.up.railway.app
- Progetto: `/Users/marco/Documents/AIProjects/Portfolio/portfolio`
- Workspace progetti: `/Users/marco/Documents/AIProjects/Portfolio/`
- i18n files: `src/i18n/{it,en,de}.json`
