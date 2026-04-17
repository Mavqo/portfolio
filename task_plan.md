# Task Plan: Portfolio Frontend Enhancement

**Data:** 2026-04-03  
**Progetto:** `/Users/marco/Documents/AIProjects/Portfolio/portfolio`  
**Stack:** Astro 4.15 + Tailwind 3.4

---

## Goal
Migliorare l'intero frontend del portfolio personale con enhancement visivi, UX e contenuti, assegnando un agente dedicato a ogni sezione del sito.

## Current Phase
Phase 2

---

## Phases

### Phase 1: Discovery & Analysis
- [x] Analizzare struttura attuale del portfolio (componenti Astro, sezioni, layout)
- [x] Catturare screenshot dello stato attuale (sito live su Railway)
- [x] Documentare codebase e identificare aree di miglioramento
- [x] Definire enhancement per ogni sezione
- **Status:** complete

### Phase 2: Planning & Team Assembly
- [x] Creare project-tree.md con diagramma enhancement
- [x] Assegnare agenti per sezione:
  - Hero Agent
  - Problems Agent
  - Services Agent
  - Process Agent
  - Projects Agent
  - About Agent
  - Contact Agent
  - Navigation/Footer Agent
- [x] Definire mock contracts e dipendenze tra sezioni
- **Status:** complete

### Phase 3: Parallel Development
- [x] Hero: typing effect, social proof, scroll indicator
- [x] Problems: problem→solution cards, micro-illustrazioni, hover reveal
- [x] Services: prezzi, CTA per servizio, feature list complete, rich hover
- [x] Process: icone per step, tempistiche, animated connector
- [x] Projects: completare progetti reali (LeadSpark, Analytics), screenshot, live demo links
- [x] About: stats/achievements, timeline carriera, foto frame moderno
- [x] Contact: calendly link, tipo progetto select, trust indicators
- [x] Nav/Footer: active scroll state, footer con link e social reali
- **Status:** complete

### Phase 4: Integration & Build Verification
- [x] Verificare build Astro senza errori
- [x] Testare responsive su mobile, tablet, desktop
- [x] Verificare dark mode e i18n (it/en)
- [x] Catturare screenshot finale completo
- **Status:** complete

### Phase 5: Browser Preview & Delivery
- [x] Avviare server locale (`npm run preview`)
- [x] Aprire portfolio nel browser per review
- [x] Consegnare risultato all'utente
- **Status:** complete

---

## Key Questions
1. Quali progetti reali includere oltre a Osteria Bellavista? → LeadSpark, Analytics Dashboard
2. I social link esistono? → Aggiungere LinkedIn e GitHub reali di Marco
3. Quali lingue supportare? → Mantenere it/en (de già presente in i18n ma non in UI)
4. Quali prezzi mostrare? → "Da CHF X" senza prezzi fissi troppo dettagliati

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 1 agente = 1 sezione | Facilita parallelizzazione e responsabilità chiara |
| Mantenere Astro 4 + Tailwind 3 | Versione stabile, evitare problemi di compatibilità visti in precedenza |
| Progetti reali: LeadSpark + Analytics | Sono progetti esistenti nel workspace dell'utente |
| Aggiungere stats/about | Aumenta credibility e trust per potenziali clienti |
| Form contact: tipo progetto + calendly | Migliora conversione e qualifica lead |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| - | - | - |

## Notes
- Sito live: https://portfolio-production-953a.up.railway.app
- Backup disponibile: `portfolio_backup_20260403_210849`
- Node 22.x, build time ~2s
