# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage >> language switcher works
- Location: tests/homepage.spec.ts:26:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Select language')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation "Main navigation" [ref=e3]:
      - link "Marco" [ref=e4] [cursor=pointer]:
        - /url: "#hero"
      - button "Toggle menu" [ref=e5]: ☰
      - list [ref=e6]:
        - listitem [ref=e7]:
          - link "Services" [ref=e8] [cursor=pointer]:
            - /url: "#services"
        - listitem [ref=e9]:
          - link "Work" [ref=e10] [cursor=pointer]:
            - /url: "#work"
        - listitem [ref=e11]:
          - link "About" [ref=e12] [cursor=pointer]:
            - /url: "#about"
      - generic [ref=e13]:
        - button "Toggle dark mode" [ref=e14]:
          - img [ref=e15]
          - img [ref=e17]
        - generic [ref=e23]:
          - button "🇬🇧 EN" [ref=e24]:
            - text: 🇬🇧 EN
            - img [ref=e25]
          - menu [ref=e27]:
            - menuitem "🇬🇧 EN" [ref=e28]:
              - button "🇬🇧 EN" [ref=e29]
            - menuitem "🇮🇹 IT" [ref=e30]:
              - button "🇮🇹 IT" [ref=e31]
      - link "Contact Me →" [ref=e32] [cursor=pointer]:
        - /url: "#contact"
  - main [ref=e33]:
    - generic [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - paragraph [ref=e38]: Full Stack Developer & AI Automation Engineer
          - heading "Your modern website, ready in days — not months" [level=1] [ref=e39]
          - paragraph [ref=e40]: I help small businesses and professionals grow online with fast websites and systems that automate repetitive work.
          - generic [ref=e41]:
            - link "Get in touch →" [ref=e42] [cursor=pointer]:
              - /url: "#contact"
            - link "Browse work ↓" [ref=e43] [cursor=pointer]:
              - /url: "#work"
        - img "Illustrazione sviluppo web" [ref=e45]
      - generic [ref=e65]:
        - text: Technologies
        - generic [ref=e66]:
          - generic [ref=e67]:
            - img "React" [ref=e68]
            - text: React
          - generic [ref=e69]:
            - img "Python" [ref=e70]
            - text: Python
          - generic [ref=e71]:
            - img "n8n" [ref=e72]
            - text: n8n
          - generic [ref=e73]:
            - img "FastAPI" [ref=e74]
            - text: FastAPI
          - generic [ref=e75]:
            - img "Next.js" [ref=e76]
            - text: Next.js
          - generic [ref=e77]:
            - img "AI/LLM" [ref=e78]
            - text: AI/LLM
          - generic [ref=e79]:
            - img "PostgreSQL" [ref=e80]
            - text: PostgreSQL
    - generic [ref=e82]:
      - generic [ref=e83]:
        - paragraph [ref=e84]: Sound familiar?
        - heading "Running a business is hard enough" [level=2] [ref=e85]
        - paragraph [ref=e86]: You shouldn't worry about your website or lose hours to repetitive tasks
      - generic [ref=e87]:
        - generic [ref=e88]:
          - img [ref=e90]
          - heading "Is your website driving customers away?" [level=3] [ref=e92]
          - paragraph [ref=e93]: An outdated or poorly mobile-optimized website destroys trust in seconds. Customers expect professionalism — and they judge you by your website.
        - generic [ref=e94]:
          - img [ref=e96]
          - heading "Spending hours on tasks that could do themselves?" [level=3] [ref=e98]
          - paragraph [ref=e99]: Replying to the same emails, entering data manually, keeping appointments in your head. These activities consume time you could invest in growing your business.
        - generic [ref=e100]:
          - img [ref=e102]
          - heading "Does technology feel like an obstacle?" [level=3] [ref=e104]
          - paragraph [ref=e105]: Too many tools, too much complexity, no one to explain simply. You shouldn't need to be a tech expert to have tools that work.
    - generic [ref=e107]:
      - generic [ref=e108]:
        - paragraph [ref=e109]: What I do
        - heading "Two services. Concrete results." [level=2] [ref=e110]
        - paragraph [ref=e111]: Focused on what really makes a difference for small businesses
      - generic [ref=e112]:
        - generic [ref=e113]:
          - img [ref=e115]
          - text: Web Development
          - heading "Websites that convert visitors into customers" [level=3] [ref=e117]
          - paragraph [ref=e118]: I build fast, secure, and easy-to-manage websites. Every project is tailored to your business, not to impress other developers.
          - list [ref=e119]:
            - listitem [ref=e120]:
              - img [ref=e121]
              - text: "Design responsive: perfetto su telefono, tablet e computer"
            - listitem [ref=e123]:
              - img [ref=e124]
              - text: "Velocità ottimizzata: caricamento in meno di 3 secondi"
            - listitem [ref=e126]:
              - img [ref=e127]
              - text: "SEO di base: i tuoi clienti ti trovano su Google"
            - listitem [ref=e129]:
              - img [ref=e130]
              - text: "CMS incluso: aggiorna contenuti in autonomia"
        - generic [ref=e132]:
          - img [ref=e134]
          - text: AI Automation
          - heading "Let AI do the repetitive work" [level=3] [ref=e136]
          - paragraph [ref=e137]: I connect your tools and automate workflows. You save time, reduce errors, and focus on what really matters.
        - generic [ref=e138]:
          - img [ref=e140]
          - text: Consulting
          - heading "Tailored technology strategy" [level=3] [ref=e142]
          - paragraph [ref=e143]: Analysis of your needs and concrete action plan to digitize your business.
    - generic [ref=e145]:
      - generic [ref=e146]:
        - paragraph [ref=e147]: The process
        - heading "Simple. Fast. No surprises." [level=2] [ref=e148]
        - paragraph [ref=e149]: From first message to live product — here's how we work together
      - generic [ref=e150]:
        - generic [ref=e151]:
          - generic [ref=e152]: "01"
          - heading "Discovery" [level=3] [ref=e153]
          - paragraph [ref=e154]: A call to understand your project and objectives. No commitment. You tell me about your business, challenges, and what you want to achieve. I understand what you really need before proposing a tailored solution.
        - generic [ref=e155]:
          - generic [ref=e156]: "02"
          - heading "Build and develop" [level=3] [ref=e157]
          - paragraph [ref=e158]: I keep you updated throughout the process. You receive regular previews and your feedback is integral to the work. No surprises at delivery.
        - generic [ref=e159]:
          - generic [ref=e160]: "03"
          - heading "Launch and support" [level=3] [ref=e161]
          - paragraph [ref=e162]: "The website goes live, everything works, you're happy. But it doesn't end there: I show you how to manage content and remain available for questions and small changes."
    - generic [ref=e164]:
      - generic [ref=e165]:
        - paragraph [ref=e166]: My work
        - heading "Recent projects" [level=2] [ref=e167]
        - paragraph [ref=e168]: Concrete examples of websites and automations built for clients
      - generic [ref=e169]:
        - generic [ref=e170]:
          - generic:
            - generic:
              - generic:
                - img "Osteria Bellavista website"
          - generic [ref=e171]:
            - generic [ref=e172]: Progetto dimostrativo Web App React
            - heading "Osteria Bellavista — Demo Project" [level=3] [ref=e173]
            - paragraph [ref=e174]: Demo project showcasing an elegant website for an Italian restaurant. Features online reservations, digital menu, and responsive design.
            - link "View project →" [ref=e175] [cursor=pointer]:
              - /url: http://localhost:3000
        - generic [ref=e176]:
          - generic [ref=e177]: Coming soon
          - generic [ref=e178]:
            - heading "CRM Automation" [level=3] [ref=e179]
            - paragraph [ref=e180]: Automation system for lead management and automatic follow-ups.
        - generic [ref=e181]:
          - generic [ref=e182]: Coming soon
          - generic [ref=e183]:
            - heading "Analytics Dashboard" [level=3] [ref=e184]
            - paragraph [ref=e185]: Data visualization and automatic reports for small businesses.
    - generic [ref=e188]:
      - generic [ref=e191]:
        - img "Marco - Sviluppatore Web e Automazione"
        - generic [ref=e192]: M
      - generic [ref=e193]:
        - heading "Hi, I'm Marco" [level=2] [ref=e194]
        - generic [ref=e195]:
          - paragraph [ref=e196]: "I develop websites and automation systems for small businesses that want to grow online without complications. After years of experience in the digital industry, I've chosen to specialize in what I do best: creating digital tools that work, without unnecessary frills."
          - paragraph [ref=e197]: "I believe in simplicity and transparency. I don't sell complicated solutions — I build tools that solve real problems. My approach is direct: I listen, understand, build. No jargon, no impossible promises. Just concrete results."
          - paragraph [ref=e198]: I'm based in Ticino and work primarily with clients in Italian Switzerland and across Switzerland. I speak Italian, German, and English — and I know how important it is to communicate in the client's language.
        - generic [ref=e199]: Web Development AI & Automation Python React n8n FastAPI
    - generic [ref=e201]:
      - heading "Ready to grow your business?" [level=2] [ref=e202]
      - paragraph [ref=e203]: Write to me and I'll respond within 24 hours. A brief conversation helps us understand if I can help you.
      - generic [ref=e204]:
        - generic [ref=e205]:
          - textbox "Your name" [ref=e206]
          - textbox "Your email" [ref=e207]
        - textbox "Tell me about your project" [ref=e208]
        - button "Send message →" [ref=e209]
      - generic [ref=e210]:
        - img [ref=e212]
        - heading "Thank you!" [level=3] [ref=e214]
        - paragraph [ref=e215]: I've received your message and will get back to you as soon as possible.
      - generic [ref=e216]:
        - link "LinkedIn" [ref=e217] [cursor=pointer]:
          - /url: "#"
          - img [ref=e218]
        - link "GitHub" [ref=e220] [cursor=pointer]:
          - /url: "#"
          - img [ref=e221]
  - contentinfo [ref=e223]:
    - paragraph [ref=e225]: © 2026 Marco · Made with ❤️ in Ticino
  - generic [ref=e228]:
    - generic [ref=e229]: "[plugin:vite:import-analysis] Failed to resolve import &quot;virtual:astro:adapter-config/client&quot; from &quot;node_modules/astro/dist/prefetch/index.js?v=7118b965&quot;. Does the file exist?"
    - generic [ref=e230]: /Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/astro/dist/prefetch/index.js:1:39
    - generic [ref=e231]: "1 | import { internalFetchHeaders } from \"virtual:astro:adapter-config/client\"; | ^ 2 | const debug = import.meta.env.DEV ? console.debug : void 0; 3 | const inBrowser = import.meta.env.SSR === false;"
    - generic [ref=e232]: at TransformPluginContext._formatError (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49258:41) at TransformPluginContext.error (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49253:16) at normalizeUrl (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64307:23) at async file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64439:39 at async Promise.all (index 0) at async TransformPluginContext.transform (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64366:7) at async PluginContainer.transform (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49099:18) at async loadAndTransform (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:51978:27) at async viteTransformMiddleware (file:///Users/marco/Documents/AIProjects/Portfolio/portfolio/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:62106:24)
    - generic [ref=e233]:
      - text: Click outside, press Esc key, or fix the code to dismiss.
      - text: You can also disable this overlay by setting
      - code [ref=e234]: server.hmr.overlay
      - text: to
      - code [ref=e235]: "false"
      - text: in
      - code [ref=e236]: vite.config.js
      - text: .
  - generic [ref=e239]:
    - button "Menu" [ref=e240]:
      - img [ref=e242]
      - generic: Menu
    - button "Inspect" [ref=e246]:
      - img [ref=e248]
      - generic: Inspect
    - button "Audit" [ref=e250]:
      - generic [ref=e251]:
        - img [ref=e252]
        - img [ref=e255]
      - generic: Audit
    - button "Settings" [ref=e258]:
      - img [ref=e260]
      - generic: Settings
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Homepage', () => {
  4  |   test('has correct title', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveTitle(/Marco/);
  7  |   });
  8  | 
  9  |   test('navigation is visible', async ({ page }) => {
  10 |     await page.goto('/');
  11 |     await expect(page.getByRole('navigation')).toBeVisible();
  12 |   });
  13 | 
  14 |   test('hero section renders', async ({ page }) => {
  15 |     await page.goto('/');
  16 |     await expect(page.locator('#hero')).toBeVisible();
  17 |   });
  18 | 
  19 |   test('theme toggle works', async ({ page }) => {
  20 |     await page.goto('/');
  21 |     const toggle = page.getByLabel('Toggle dark mode');
  22 |     await toggle.click();
  23 |     await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  24 |   });
  25 | 
  26 |   test('language switcher works', async ({ page }) => {
  27 |     await page.goto('/');
  28 |     const langBtn = page.getByLabel('Select language');
> 29 |     await langBtn.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  30 |     await page.getByRole('menuitem', { name: /english/i }).click();
  31 |     await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  32 |   });
  33 | });
  34 | 
```