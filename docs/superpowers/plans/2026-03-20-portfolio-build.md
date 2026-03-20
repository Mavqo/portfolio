# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete one-page freelance portfolio website for Marco (Web Dev & AI Automation) as a static HTML/CSS site with no build step.

**Architecture:** Single `index.html` file with embedded CSS and minimal vanilla JS. Sections flow top-to-bottom: Nav → Hero → Tech Strip → Problem → Services → How It Works → Projects → About → Contact → Footer. Form submission handled by Formspree (free tier).

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox), vanilla JS (scroll behavior, mobile nav), Formspree for contact form.

---

## File Structure

```
Portfolio/
├── index.html          # Main page — all sections
├── styles.css          # All styles (extracted for maintainability)
├── main.js             # Scroll effects, mobile nav toggle
├── assets/
│   └── photo.jpg       # Marco's photo (after bg removal — placeholder until ready)
└── docs/
    └── superpowers/
        ├── specs/2026-03-20-portfolio-design.md
        └── plans/2026-03-20-portfolio-build.md
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `Portfolio/index.html`
- Create: `Portfolio/styles.css`
- Create: `Portfolio/main.js`
- Create: `Portfolio/assets/` (directory)

- [ ] **Step 1: Create the directory structure**

```bash
cd /Users/marco/Documents/ClaudeProjects/Portfolio
mkdir -p assets
```

- [ ] **Step 2: Create `index.html` with full semantic HTML (no styles yet)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Marco — Freelance Web Developer & AI Automation Specialist. I help small businesses grow with professional websites and smart automations." />
  <title>Marco — Web & AI Automation</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- NAV -->
  <nav id="nav">
    <div class="nav-logo">Marco</div>
    <button class="nav-toggle" aria-label="Toggle menu">☰</button>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#about">About</a></li>
    </ul>
    <a href="#contact" class="btn btn-primary nav-cta">Let's talk →</a>
  </nav>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-text">
      <p class="label">Freelance Developer & AI Specialist</p>
      <h1>I build websites<br>and <span>automations</span><br>that work for you.</h1>
      <p class="hero-sub">Whether you need a professional website or want to save hours with AI automation — I help small businesses grow without the tech headaches.</p>
      <div class="hero-btns">
        <a href="#contact" class="btn btn-primary">Let's talk →</a>
        <a href="#work" class="btn btn-outline">See my work ↓</a>
      </div>
    </div>
    <div class="hero-photo">
      <img src="assets/photo.jpg" alt="Marco — Web & AI Developer" />
    </div>
  </section>

  <!-- TECH STRIP -->
  <div class="tech-strip">
    <span class="tech-strip-label">Built with</span>
    <div class="tech-logos">
      <span class="tech-logo">React</span>
      <span class="tech-logo">Python</span>
      <span class="tech-logo">n8n</span>
      <span class="tech-logo">FastAPI</span>
      <span class="tech-logo">Next.js</span>
      <span class="tech-logo">LLM APIs</span>
      <span class="tech-logo">PostgreSQL</span>
    </div>
  </div>

  <!-- PROBLEM -->
  <section class="problem" id="problem">
    <p class="label">Sound familiar?</p>
    <h2>Running a business is hard enough.</h2>
    <p class="section-sub">You shouldn't have to worry about your website or waste hours on repetitive tasks.</p>
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-icon">😩</div>
        <h4>Your website looks outdated</h4>
        <p>Clients judge you in 3 seconds. An old site costs you credibility before you even speak.</p>
      </div>
      <div class="pain-card">
        <div class="pain-icon">⏰</div>
        <h4>You waste hours on repetitive work</h4>
        <p>Emails, reports, data entry — tasks that could run automatically while you focus on what matters.</p>
      </div>
      <div class="pain-card">
        <div class="pain-icon">🤯</div>
        <h4>Tech feels overwhelming</h4>
        <p>You need results, not a tech course. I handle the complexity, you see the outcome.</p>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="services" id="services">
    <div class="section-header">
      <p class="label">What I do</p>
      <h2>Two services. Real results.</h2>
      <p class="section-sub">Focused on what actually moves the needle for small businesses.</p>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <span class="service-tag">Web Development</span>
        <h3>A website that converts visitors into clients</h3>
        <p>Fast, mobile-first, and built to make your business look credible from day one.</p>
        <ul class="service-list">
          <li>Landing pages & business sites</li>
          <li>E-commerce & booking systems</li>
          <li>Performance & SEO optimized</li>
          <li>Delivered in 2–4 weeks</li>
        </ul>
      </div>
      <div class="service-card">
        <span class="service-tag">AI Automation</span>
        <h3>Save 10+ hours a week with smart automations</h3>
        <p>Connect your tools, automate your workflows, and let AI handle the repetitive stuff.</p>
        <ul class="service-list">
          <li>Email & CRM automation</li>
          <li>Custom AI assistants for your business</li>
          <li>Data pipelines & reporting</li>
          <li>Integrations with any tool you use</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="how-it-works">
    <p class="label">The process</p>
    <h2>Simple. Fast. No surprises.</h2>
    <p class="section-sub">From first message to live product — here's how we work together.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <h4>We talk</h4>
        <p>Tell me what you need. Free 30-min call to understand your goals and define the scope.</p>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <h4>I build</h4>
        <p>I design and develop your solution with regular updates so you're never in the dark.</p>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <h4>You launch</h4>
        <p>We review together, make final tweaks, and go live. I stay available after launch too.</p>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="projects" id="work">
    <p class="label">My work</p>
    <h2>Recent Projects</h2>
    <p class="section-sub">Case studies coming soon.</p>
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-thumb"><span>Coming soon</span></div>
        <div class="project-body">
          <div class="project-tags"><span class="tag">Web App</span><span class="tag">React</span></div>
          <h4>Project Name</h4>
          <p>Short description of the project and the result achieved.</p>
        </div>
      </div>
      <div class="project-card">
        <div class="project-thumb"><span>Coming soon</span></div>
        <div class="project-body">
          <div class="project-tags"><span class="tag">AI</span><span class="tag">n8n</span></div>
          <h4>Project Name</h4>
          <p>Short description of the project and the result achieved.</p>
        </div>
      </div>
      <div class="project-card">
        <div class="project-thumb"><span>Coming soon</span></div>
        <div class="project-body">
          <div class="project-tags"><span class="tag">Automation</span></div>
          <h4>Project Name</h4>
          <p>Short description of the project and the result achieved.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about" id="about">
    <div class="about-photo">
      <img src="assets/photo.jpg" alt="Marco" />
    </div>
    <div class="about-text">
      <h2>Hi, I'm Marco.</h2>
      <p>I'm a freelance developer based in Switzerland, specializing in web development and AI automation. I work with small businesses and startups who want to look professional online and work smarter — without the overhead of an agency.</p>
      <p>I speak your language, not tech jargon. My goal is simple: build things that actually help your business grow.</p>
      <div class="skills-row">
        <span class="skill-pill">Web Dev</span>
        <span class="skill-pill">AI & Automation</span>
        <span class="skill-pill">Python</span>
        <span class="skill-pill">React</span>
        <span class="skill-pill">n8n</span>
        <span class="skill-pill">FastAPI</span>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <h2>Ready to start a project?</h2>
    <p class="section-sub">Tell me what you need. I'll get back to you within 24 hours.</p>
    <form class="contact-form" action="https://formspree.io/f/PLACEHOLDER" method="POST">
      <input type="text" name="name" placeholder="Your name" required />
      <input type="email" name="email" placeholder="Your email" required />
      <textarea name="message" placeholder="What do you need help with?" required></textarea>
      <button type="submit" class="btn btn-light">Send message →</button>
    </form>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>© 2026 Marco · Web & AI Automation · Switzerland</p>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify HTML opens in browser without errors**

Open `index.html` in browser. Expected: unstyled but structurally correct page with all sections visible.

- [ ] **Step 4: Commit scaffold**

```bash
cd /Users/marco/Documents/ClaudeProjects/Portfolio
git init
git add index.html
git commit -m "feat: add HTML scaffold with all sections"
```

---

## Task 2: CSS — Base & Variables

**Files:**
- Create: `Portfolio/styles.css`

- [ ] **Step 1: Write CSS reset + custom properties**

```css
/* styles.css */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #ffffff;
  --bg-alt: #f8f8fc;
  --bg-dark: #1a1a2e;
  --text: #1a1a2e;
  --text-muted: #666666;
  --accent: #4a4a8a;
  --accent-light: #eeeeff;
  --border: #e5e5f0;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --max-width: 1100px;
  --section-pad: 4rem 6%;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  font-size: 15px;
  overflow-x: hidden;
}

img { max-width: 100%; display: block; }

a { text-decoration: none; color: inherit; }

/* Typography */
h1 { font-size: clamp(2rem, 5vw, 2.8rem); font-weight: 800; line-height: 1.15; }
h2 { font-size: clamp(1.5rem, 3vw, 1.9rem); font-weight: 800; line-height: 1.2; }
h3 { font-size: 1.2rem; font-weight: 700; }
h4 { font-size: 0.95rem; font-weight: 700; }

.label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.section-sub {
  color: var(--text-muted);
  max-width: 540px;
  margin: 0.75rem auto 2.5rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.8rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  border: 2px solid transparent;
}
.btn:hover { opacity: 0.88; transform: translateY(-1px); }

.btn-primary { background: var(--bg-dark); color: #fff; }
.btn-outline { border-color: var(--bg-dark); color: var(--bg-dark); }
.btn-light { background: #fff; color: var(--bg-dark); width: 100%; text-align: center; border: none; }
```

- [ ] **Step 2: Open browser and confirm base styles apply (clean font, no overflow)**

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add CSS reset, variables, and base typography"
```

---

## Task 3: CSS — Nav & Hero

**Files:**
- Modify: `Portfolio/styles.css`

- [ ] **Step 1: Add Nav styles**

```css
/* NAV */
#nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 6%;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  gap: 1.5rem;
}

.nav-logo { font-weight: 800; font-size: 1.1rem; }

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a { font-size: 0.9rem; color: var(--text-muted); transition: color 0.2s; }
.nav-links a:hover { color: var(--text); }

.nav-cta { font-size: 0.85rem; padding: 0.45rem 1.1rem; }

.nav-toggle { display: none; background: none; border: none; font-size: 1.3rem; cursor: pointer; }
```

- [ ] **Step 2: Add Hero styles**

```css
/* HERO */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 5rem 6% 4rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

.hero-text { flex: 1; }

.hero-text .label { margin-bottom: 1rem; }

.hero-text h1 { margin-bottom: 1.2rem; }
.hero-text h1 span { color: var(--accent); }

.hero-sub {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

.hero-photo {
  width: 260px;
  height: 300px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-alt);
}

.hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}
```

- [ ] **Step 3: Verify in browser — nav is sticky, hero layout is split left/right**

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "feat: add nav and hero styles"
```

---

## Task 4: CSS — Tech Strip, Problem, Services

**Files:**
- Modify: `Portfolio/styles.css`

- [ ] **Step 1: Add Tech Strip styles**

```css
/* TECH STRIP */
.tech-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem 6%;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  justify-content: center;
}

.tech-strip-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aaa;
}

.tech-logos { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }

.tech-logo {
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
  opacity: 0.75;
}
```

- [ ] **Step 2: Add Problem section styles**

```css
/* PROBLEM */
.problem {
  background: var(--bg-alt);
  padding: var(--section-pad);
  text-align: center;
}

.pain-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.pain-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  flex: 1;
  min-width: 220px;
  max-width: 260px;
  text-align: left;
}

.pain-icon { font-size: 1.5rem; margin-bottom: 0.6rem; }
.pain-card h4 { margin-bottom: 0.4rem; }
.pain-card p { font-size: 0.85rem; color: var(--text-muted); }
```

- [ ] **Step 3: Add Services styles**

```css
/* SERVICES */
.services {
  padding: var(--section-pad);
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header { text-align: center; margin-bottom: 2rem; }
.section-header .section-sub { margin-bottom: 0; }

.services-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }

.service-card {
  flex: 1;
  min-width: 280px;
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: border-color 0.2s;
}

.service-card:hover { border-color: var(--accent); }

.service-tag {
  display: inline-block;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.service-card h3 { margin-bottom: 0.75rem; }
.service-card > p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }

.service-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }

.service-list li {
  font-size: 0.85rem;
  color: #555;
  padding-left: 1.2rem;
  position: relative;
}

.service-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent);
}
```

- [ ] **Step 4: Verify in browser — all three sections look correct**

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add tech strip, problem, and services styles"
```

---

## Task 5: CSS — How It Works, Projects, About, Contact, Footer

**Files:**
- Modify: `Portfolio/styles.css`

- [ ] **Step 1: Add How It Works styles**

```css
/* HOW IT WORKS */
.how-it-works {
  background: var(--bg-dark);
  color: #fff;
  padding: var(--section-pad);
  text-align: center;
}

.how-it-works .label { color: #8888cc; }
.how-it-works h2 { color: #fff; }
.how-it-works .section-sub { color: #aabbcc; }

.steps {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.step { flex: 1; min-width: 180px; max-width: 220px; }

.step-num {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.step h4 { color: #fff; margin-bottom: 0.4rem; }
.step p { font-size: 0.85rem; color: #8899aa; }
```

- [ ] **Step 2: Add Projects styles**

```css
/* PROJECTS */
.projects {
  background: var(--bg-alt);
  padding: var(--section-pad);
  text-align: center;
}

.projects-grid {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}

.project-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 1;
  min-width: 240px;
  max-width: 300px;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

.project-thumb {
  height: 120px;
  background: linear-gradient(135deg, #e8e8f0, #d0d0e8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
}

.project-body { padding: 1.2rem; }

.project-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 0.6rem; }

.tag {
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.project-body h4 { margin-bottom: 0.3rem; }
.project-body p { font-size: 0.82rem; color: var(--text-muted); }
```

- [ ] **Step 3: Add About styles**

```css
/* ABOUT */
.about {
  padding: var(--section-pad);
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: center;
  flex-wrap: wrap;
}

.about-photo {
  width: 160px;
  height: 180px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-alt);
}

.about-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

.about-text h2 { margin-bottom: 1rem; }
.about-text p { color: var(--text-muted); margin-bottom: 1rem; font-size: 0.95rem; }

.skills-row { display: flex; gap: 8px; flex-wrap: wrap; }

.skill-pill {
  background: var(--bg-dark);
  color: #fff;
  font-size: 0.78rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}
```

- [ ] **Step 4: Add Contact + Footer styles**

```css
/* CONTACT */
.contact {
  background: var(--bg-dark);
  color: #fff;
  padding: var(--section-pad);
  text-align: center;
}

.contact h2 { color: #fff; margin-bottom: 0.75rem; }
.contact .section-sub { color: #aabbcc; margin-bottom: 2rem; }

.contact-form {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: rgba(255,255,255,0.4);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder { color: #778899; }

.contact-form textarea { height: 110px; resize: vertical; }

/* FOOTER */
footer {
  background: #111;
  color: #555;
  text-align: center;
  padding: 1.2rem 6%;
  font-size: 0.82rem;
}
```

- [ ] **Step 5: Verify full page in browser — all sections styled correctly**

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "feat: add how-it-works, projects, about, contact, footer styles"
```

---

## Task 6: CSS — Responsive (Mobile)

**Files:**
- Modify: `Portfolio/styles.css`

- [ ] **Step 1: Add responsive breakpoints**

```css
/* RESPONSIVE */
@media (max-width: 768px) {
  :root { --section-pad: 3rem 5%; }

  /* Nav */
  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 1rem 6%; gap: 1rem; }
  .nav-links.open { display: flex; }
  .nav-toggle { display: block; }
  .nav-cta { display: none; }

  /* Hero */
  .hero { flex-direction: column; padding: 3rem 5% 2.5rem; text-align: center; }
  .hero-text .hero-sub { max-width: 100%; }
  .hero-btns { justify-content: center; }
  .hero-photo { width: 180px; height: 200px; }

  /* Pain grid */
  .pain-card { max-width: 100%; min-width: 100%; }

  /* Services */
  .service-card { min-width: 100%; }

  /* Steps */
  .steps { flex-direction: column; align-items: center; }

  /* Projects */
  .project-card { max-width: 100%; min-width: 100%; }

  /* About */
  .about { flex-direction: column; text-align: center; align-items: center; }
  .skills-row { justify-content: center; }
}
```

- [ ] **Step 2: Test at 375px (iPhone) and 768px widths in browser DevTools**

Expected: no horizontal scroll, all sections stack cleanly, mobile nav toggle visible.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add responsive styles for mobile"
```

---

## Task 7: JavaScript — Nav Toggle + Scroll Effects

**Files:**
- Create: `Portfolio/main.js`

- [ ] **Step 1: Write main.js**

```js
// main.js

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
});
```

- [ ] **Step 2: Test mobile nav toggle in DevTools mobile view**

Expected: clicking ☰ opens/closes nav links. Clicking a link closes the nav.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add mobile nav toggle and scroll shadow"
```

---

## Task 8: Formspree Integration

**Files:**
- Modify: `Portfolio/index.html`

- [ ] **Step 1: Create a free Formspree account at https://formspree.io**

Sign up → New Form → copy the form endpoint URL (format: `https://formspree.io/f/xxxxxxxx`)

- [ ] **Step 2: Replace placeholder in index.html**

Find:
```html
action="https://formspree.io/f/PLACEHOLDER"
```
Replace with your actual Formspree endpoint.

- [ ] **Step 3: Test form submission**

Fill out and submit the form. Check Formspree dashboard for the submission.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: connect contact form to Formspree"
```

---

## Task 9: Photo Integration

**Files:**
- Add: `Portfolio/assets/photo.jpg`

- [ ] **Step 1: Remove background from photo**

Go to https://www.remove.bg → upload Marco's photo → download result with transparent background (PNG).

- [ ] **Step 2: Save as `assets/photo.jpg` (or `photo.png` — update src in index.html accordingly)**

If saving as PNG:
```html
<!-- In index.html, update both img tags -->
<img src="assets/photo.png" alt="Marco — Web & AI Developer" />
```

- [ ] **Step 3: Check photo in browser — Hero and About sections**

Expected: photo displays cleanly, fills the rounded container, no harsh edges.

- [ ] **Step 4: Commit**

```bash
git add assets/
git commit -m "feat: add profile photo to hero and about"
```

---

## Task 10: Final Polish & QA

**Files:**
- Review: `Portfolio/index.html`, `Portfolio/styles.css`

- [ ] **Step 1: Check all anchor links work**

Click each nav link (Services, Work, About) and both hero CTAs. Confirm smooth scroll to correct sections.

- [ ] **Step 2: Check meta description and title**

Open DevTools → Elements → verify `<title>` and `<meta name="description">` are present and accurate.

- [ ] **Step 3: Test on mobile (375px) and tablet (768px)**

No horizontal scroll. All content readable. Nav toggle works.

- [ ] **Step 4: Lighthouse audit (optional but recommended)**

Open DevTools → Lighthouse → run for Performance, Accessibility, SEO.
Target: 90+ on all scores.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: final QA pass and polish"
```

---

## Done When

- [ ] All 10 sections render correctly on desktop and mobile
- [ ] Nav is sticky and mobile-responsive with toggle
- [ ] Contact form submits to Formspree
- [ ] Photo displays in Hero and About
- [ ] No horizontal scroll on any viewport
- [ ] Smooth scroll navigation works
