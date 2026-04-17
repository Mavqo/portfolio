# Playwright E2E Test Configuration

## Configurazione

### File Creati

| File | Descrizione |
|------|-------------|
| `playwright.config.ts` | Configurazione principale Playwright |
| `tests/homepage.spec.ts` | Test suite per la homepage |

### Script Aggiunti a package.json

```json
{
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:report": "playwright show-report"
}
```

### Modifiche .gitignore

```
# Playwright
test-results/
playwright-report/
```

## Configurazione Playwright

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Test Creati

### Homepage (`tests/homepage.spec.ts`)

| Test | Descrizione | Stato |
|------|-------------|-------|
| `has correct title` | Verifica che il titolo contenga "Marco" | ✅ PASS |
| `navigation is visible` | Verifica che la navigazione sia visibile | ✅ PASS |
| `hero section renders` | Verifica che la sezione hero sia renderizzata | ✅ PASS |
| `theme toggle works` | Verifica il funzionamento del toggle tema | ❌ FAIL |
| `language switcher works` | Verifica il funzionamento dello switch lingua | ❌ FAIL |

## Risultati Esecuzione

**Data**: 2026-04-01  
**Browser**: Chromium + Mobile Chrome  
**Totale Test**: 10 (5 test × 2 browser)

### Riassunto

| Esito | Count |
|-------|-------|
| ✅ Passati | 6 |
| ❌ Falliti | 4 |

### Errori Rilevati

#### 1. Theme Toggle Test
```
Error: locator.click: Test timeout of 30000ms exceeded.
- waiting for getByLabel('Toggle dark mode')
- <vite-error-overlay> intercepts pointer events
```

**Causa**: Il Vite error overlay blocca l'interazione con gli elementi durante il preview.

#### 2. Language Switcher Test
```
Error: locator.click: Test timeout of 30000ms exceeded.
- waiting for getByLabel('Select language')
```

**Causa**: L'elemento con aria-label "Select language" non è presente o ha un selettore diverso.

## Note

- I test di base (titolo, navigazione, hero) funzionano correttamente
- Gli errori dei test interattivi sono dovuti a:
  1. Sovrapposizione del Vite error overlay
  2. Selettori che non corrispondono esattamente agli elementi DOM
- Per fixare i test falliti, è necessario:
  1. Verificare che il server preview non mostri errori Vite
  2. Aggiornare i selettori per theme toggle e language switcher in base alla struttura HTML reale

## Comandi Utili

```bash
# Esegui tutti i test
npm test

# Esegui test con UI interattiva
npm run test:ui

# Visualizza report HTML
npm run test:report

# Esegui test su specifico browser
npx playwright test --project=chromium
```
