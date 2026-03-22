# Osteria Bellavista — Design Specification

**Data:** 2026-03-22
**Tipo:** Demo project per portfolio (Progetto 1 di 3)
**Target audience:** Ristoratori in Ticino/Svizzera
**Obiettivo:** Dimostrare capacità di web development a potenziali clienti nel settore ristorazione

---

## 1. Panoramica

Landing page moderna con sistema di prenotazione tavoli integrato per un ristorante fittizio "Osteria Bellavista" di Lugano. Il progetto è un demo realistico e funzionante, deployato pubblicamente, che un ristoratore può vedere e capire immediatamente il valore.

**Messaggio al cliente:** "Il tuo ristorante merita una presenza online che faccia venire fame prima ancora di arrivare."

---

## 2. Stack Tecnico

| Layer | Tecnologia | Motivazione |
|---|---|---|
| Frontend | React (Vite) | Componente booking interattivo, già nel portfolio |
| Backend | FastAPI (Python) | Stack familiare, Pydantic per validation gratuita |
| Database | SQLite | Sufficiente per demo, zero infrastruttura |
| Email notifiche | smtplib / SendGrid | Notifica al ristorante su nuova prenotazione |
| Deploy frontend | Vercel | Gratis, deploy automatico da GitHub |
| Deploy backend | Railway o Render | Free tier, FastAPI containerizzato |

---

## 3. Struttura Frontend

### Sezioni della landing page (ordine top → bottom)

1. **Hero** — Foto ristorante in background (parallax leggero), nome, tagline, CTA "Prenota un tavolo"
2. **Menu** — Sezioni Antipasti / Primi / Secondi / Dolci (contenuto statico, visivo)
3. **Gallery** — Griglia foto piatti e ambiente
4. **Booking Widget** — Componente interattivo principale (vedi §5)
5. **About + Contatti** — Storia del ristorante, indirizzo, orari, Google Maps embed
6. **Footer** — Copyright, link sociali

### Design

**Palette colori:**
- `#1a1a1a` — Dark base (hero, gallery, footer)
- `#3d6b4f` — Verde oliva (accent principale, CTA, highlights)
- `#c4614a` — Terracotta (accent secondario, sezioni etichette)
- `#e8d5b0` — Sabbia (testo su dark, dettagli caldi)
- `#f7f3ee` — Crema (background sezioni chiare)

**Typography:**
- Titoli: **Playfair Display** (serif, elegante)
- Body: **Inter** (sans-serif, leggibile)

**Layout:** Alternanza sezioni dark (#1a1a1a) e chiare (#f7f3ee) per ritmo visivo. Mobile-first, fully responsive.

**Effetti:**
- Parallax leggero sul hero
- Smooth scroll tra sezioni
- Step indicator nel booking widget

---

## 4. API Backend

### Endpoint

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/slots?date=YYYY-MM-DD` | Ritorna gli slot orari disponibili per la data |
| `POST` | `/bookings` | Crea prenotazione, invia notifica al ristorante |

### Logica disponibilità slot (`GET /slots`)

1. Legge tutti gli slot attivi da `slots_config`
2. Per ogni slot: conta le prenotazioni esistenti per quella data
3. Se `count < max_bookings` → slot disponibile (incluso nella risposta)
4. Se `count >= max_bookings` → slot pieno (escluso dalla risposta)
5. Se nessuno slot disponibile → risposta vuota → frontend mostra "Nessuna disponibilità per questa data — prova con un'altra"

---

## 5. Booking Widget (flusso utente)

Il widget è un componente React multi-step all'interno della landing page:

```
Step 1: Scegli la data (date picker)
   ↓
Step 2: Scegli l'orario (fetch /slots → mostra solo disponibili)
   ↓
Step 3: Inserisci dati (nome, telefono, numero coperti)
   ↓
Step 4: Conferma → POST /bookings → schermata successo
         + email notifica al ristorante
```

**UX rules:**
- Gli slot pieni non vengono mostrati (non grayed out)
- Se una data è completamente piena → messaggio esplicito, non slots disabilitati
- Prenotazione confermata immediatamente (nessun token di conferma via email all'utente)
- Il ristorante riceve email con tutti i dettagli della prenotazione

---

## 6. Modello Dati

### Tabella `bookings`

| Campo | Tipo | Note |
|---|---|---|
| `id` | INTEGER PK | autoincrement |
| `name` | TEXT | max 100 caratteri |
| `phone` | TEXT | opzionale |
| `date` | DATE | formato ISO 8601 |
| `time_slot` | TEXT | es. "19:30" |
| `party_size` | INTEGER | range 1–10 |
| `status` | TEXT | "confirmed" \| "cancelled" |
| `created_at` | DATETIME | auto UTC |

### Tabella `slots_config`

| Campo | Tipo | Note |
|---|---|---|
| `time_slot` | TEXT PK | es. "12:00", "12:30", ..., "21:00" |
| `max_bookings` | INTEGER | numero massimo prenotazioni per slot |
| `is_active` | BOOLEAN | per chiusure straordinarie |

---

## 7. Sicurezza

| Layer | Rischio | Soluzione |
|---|---|---|
| Input | Dati malformati / injection | Pydantic validation su ogni campo (email format, date non passate, party_size 1–10, name max 100 char) |
| API | Spam prenotazioni / bot | Rate limiting con `slowapi`: max 5 richieste/minuto per IP su POST /bookings |
| CORS | Richieste da origini non autorizzate | CORS configurato solo sul dominio Vercel del frontend |
| Dati | Raccolta dati superflua | Minimal data: solo nome, telefono, data, orario, coperti — nessuna email utente, nessun pagamento. GDPR-friendly by design. |

---

## 8. Deploy

```
Frontend (React/Vite)  →  Vercel (auto-deploy da GitHub)
Backend (FastAPI)      →  Railway o Render (free tier)
Database (SQLite)      →  file locale nel container backend
```

URL del demo pubblico da includere nella card portfolio.

---

## 9. Portfolio Card

**Slot:** Progetto 1 (Web App / React) — colore blu
**Tags:** `Web App` `React` `FastAPI` `Python`
**Titolo:** Osteria Bellavista — Sito + Prenotazioni
**Descrizione:** Landing page + sistema prenotazioni per ristorante ticinese. React frontend, FastAPI backend, prenotazione in 4 step con notifica automatica al ristorante.

---

## 10. Fuori scope

- Pannello admin per gestire prenotazioni
- Autenticazione utenti
- Pagamenti online
- CMS per aggiornare menu
- Multi-lingua

Questi possono essere menzionati come "possibili estensioni" nella card portfolio per mostrare visione, senza implementarli nel demo.
