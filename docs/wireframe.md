# Wireframe Specification — Marco Portfolio (Astro)

**Date:** 2026-03-27  
**Framework:** Astro + Tailwind CSS + Framer Motion  
**Responsive Breakpoints:** Mobile (< 640px), Tablet (640px - 1024px), Desktop (> 1024px)

---

## Section Overview

| # | Section | Background | Height | Key Elements |
|---|---------|------------|--------|--------------|
| 1 | Navigation | Sticky, glassmorphism | Fixed (72px) | Logo, links, theme toggle, language switcher |
| 2 | Hero | `--bg-primary` | 100vh (min) | Split layout, headline, CTAs, avatar, tech strip |
| 3 | Problem/Pain Points | `--bg-subtle` | Auto | 3 pain point cards with icons |
| 4 | Services | `--bg-primary` | Auto | 2 service cards side by side |
| 5 | How It Works | `--bg-dark` | Auto | 3 numbered steps on dark background |
| 6 | Projects | `--bg-subtle` | Auto | Featured work grid (Osteria Bellavista) |
| 7 | About | `--bg-primary` | Auto | Photo, bio, skill pills |
| 8 | Contact | `--bg-dark` | Auto | Form with success state |
| 9 | Footer | `--bg-dark-elevated` | Auto | Copyright, social links |

---

## 1. Navigation

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo: Marco]     [Services] [Work] [About]          [🌙] [EN ▼] [CTA →]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- Fixed height: 72px
- 3-column layout: Logo (left) | Links (center) | Utils + CTA (right)
- Links: Services, Work, About (anchor navigation)
- Utils: Theme toggle (moon icon), Language dropdown (flag + code)
- CTA: "Let's talk →" primary button

**Tablet (640px - 1024px)**
- 2-column layout: Logo | Hamburger menu
- Full-screen mobile menu overlay on open
- Theme toggle and language switcher inside menu

**Mobile (< 640px)**
- Same as tablet
- Reduced padding (16px horizontal)
- Logo only (text "Marco")

### Components
- **Logo:** Text-based "Marco" in heading font, clickable (links to #hero)
- **Nav Links:** Underline animation on hover
- **Theme Toggle:** Sun/moon icon swap with rotation animation
- **Language Switcher:** Dropdown with flags (🇬🇧 EN, 🇮🇹 IT, 🇩🇪 DE)
- **CTA Button:** Primary style, hidden on mobile menu

### Animations
- Scroll: Background opacity increases on scroll (glassmorphism effect)
- Active link: Underline indicator for current section
- Mobile menu: Slide-in from right with backdrop blur

---

## 2. Hero Section

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────┐  ┌──────────────────────────────────────┐  │
│ │ [LABEL]                     │  │                                      │  │
│ │                             │  │         AVATAR / ILLUSTRATION        │  │
│ │ HEADLINE: I build           │  │                                      │  │
│ │ websites and                │  │      Abstract tech visualization     │  │
│ │ automations that            │  │      with gradient blob behind       │  │
│ │ work for you.               │  │                                      │  │
│ │                             │  │                                      │  │
│ │ [Subheadline text...]       │  └──────────────────────────────────────┘  │
│ │                             │                                             │
│ │ [Let's talk →] [See work ↓] │                                             │
│ └─────────────────────────────┘                                             │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  Built with: [React] [Python] [n8n] [FastAPI] [Next.js] [LLM] [PG]      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 2-column grid: 55% text | 45% visual
- Text alignment: Left
- Vertical padding: 120px top, 80px bottom
- Tech strip: Full-width, horizontal scroll if needed

**Tablet (640px - 1024px)**
- Single column, text first
- Visual below text, centered, max-width 400px
- Tech strip: 2 rows or horizontal scroll

**Mobile (< 640px)**
- Single column, stacked
- Reduced heading size (responsive clamp)
- Buttons stacked vertically, full-width
- Tech strip: Horizontal scroll with fade edges

### Content

**Label (uppercase)**
```
Freelance Developer & AI Specialist
```

**Headline (H1)**
```
I build websites
and automations
that work for you.
```
- "automations" highlighted with `--color-primary`

**Subheadline**
```
Whether you need a professional website or want to save hours with 
AI automation — I help small businesses grow without the tech headaches.
```

**CTA Buttons**
- Primary: "Let's talk →"
- Secondary: "See my work ↓" (scrolls to #work)

### Avatar/Illustration Area
- Abstract tech visualization (NOT a photo)
- Options:
  1. Gradient blob with floating code symbols
  2. Isometric illustration of developer workflow
  3. Animated SVG composition with React/Python icons
- Background: Subtle gradient mesh

### Tech Strip
- Label: "Built with"
- Icons + labels: React, Python, n8n, FastAPI, Next.js, LLM APIs, PostgreSQL
- Logo style: Devicon icons or Font Awesome
- Spacing: Even distribution, gap 24px

### Animations (Framer Motion)
1. Background mesh fades in (0ms)
2. Label slides up (200ms delay)
3. Headline words stagger (300ms delay, 50ms stagger between lines)
4. Subtext fades up (500ms delay)
5. Buttons slide up (600ms delay)
6. Avatar scales in (400ms delay)
7. Tech strip slides up (800ms delay)

---

## 3. Problem / Pain Points

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     [LABEL: Sound familiar?]                                                │
│     HEADLINE: Running a business is hard enough.                            │
│     SUB: You shouldn't have to worry about your website...                  │
│                                                                             │
│     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │
│     │   [ICON]     │  │   [ICON]     │  │   [ICON]     │                    │
│     │              │  │              │  │              │                    │
│     │   Outdated   │  │   Wasted     │  │   Tech       │                    │
│     │   Website    │  │   Hours      │  │   Overwhelm  │                    │
│     │              │  │              │  │              │                    │
│     │ Description  │  │ Description  │  │ Description  │                    │
│     │ text here... │  │ text here... │  │ text here... │                    │
│     └──────────────┘  └──────────────┘  └──────────────┘                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 3-column grid for cards
- Centered text above cards
- Card max-width: 360px each

**Tablet (640px - 1024px)**
- 2-column grid (2 cards row 1, 1 card centered row 2)
- Or 3-column with smaller cards

**Mobile (< 640px)**
- Single column, stacked cards
- Full-width cards

### Content

**Section Label:** "Sound familiar?"
**Headline:** "Running a business is hard enough."
**Subtext:** "You shouldn't have to worry about your website or waste hours on repetitive tasks."

**Card 1: Outdated Website**
- Icon: Desktop/monitor icon (Font Awesome)
- Title: "Your website looks outdated"
- Text: "Clients judge you in 3 seconds. An old site costs you credibility before you even speak."

**Card 2: Wasted Hours**
- Icon: Clock icon
- Title: "You waste hours on repetitive work"
- Text: "Emails, reports, data entry — tasks that could run automatically while you focus on what matters."

**Card 3: Tech Overwhelm**
- Icon: Bolt/lightning icon
- Title: "Tech feels overwhelming"
- Text: "You need results, not a tech course. I handle the complexity, you see the outcome."

### Card Styling
- Background: `--bg-elevated`
- Border: 1px solid `--bg-subtle`
- Border-radius: 16px
- Padding: 32px
- Icon: 48px container, `--color-primary` background with opacity
- Text: Centered

### Animations
- Scroll-triggered: Cards fade up with 150ms stagger
- Icon: Subtle bounce on card hover
- Card: Lift effect on hover (translateY -4px)

---

## 4. Services

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     [LABEL: What I do]                                                      │
│     HEADLINE: Two services. Real results.                                   │
│     SUB: Focused on what actually moves the needle for small businesses.    │
│                                                                             │
│     ┌─────────────────────────────────┐  ┌─────────────────────────────────┐│
│     │ [TAG: Web Development]          │  │ [TAG: AI Automation]            ││
│     │                                 │  │                                 ││
│     │ HEADLINE: A website that        │  │ HEADLINE: Save 10+ hours a week ││
│     │ converts visitors into clients  │  │ with smart automations          ││
│     │                                 │  │                                 ││
│     │ Description paragraph...        │  │ Description paragraph...        ││
│     │                                 │  │                                 ││
│     │ → Landing pages & business sites│  │ → Email & CRM automation        ││
│     │ → E-commerce & booking systems  │  │ → Custom AI assistants          ││
│     │ → Performance & SEO optimized   │  │ → Data pipelines & reporting    ││
│     │ → Delivered in 2–4 weeks        │  │ → Integrations with any tool    ││
│     │                                 │  │                                 ││
│     └─────────────────────────────────┘  └─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 2-column grid, equal width
- Cards have border, no fill (outline style)
- Gap: 32px

**Tablet (640px - 1024px)**
- 2-column grid, smaller padding
- Or single column if space constrained

**Mobile (< 640px)**
- Single column, stacked
- Full-width cards

### Content

**Section Label:** "What I do"
**Headline:** "Two services. Real results."
**Subtext:** "Focused on what actually moves the needle for small businesses."

**Service Card 1: Web Development**
- Tag: "Web Development" (purple)
- Headline: "A website that converts visitors into clients"
- Description: "Fast, mobile-first, and built to make your business look credible from day one."
- Features:
  - Landing pages & business sites
  - E-commerce & booking systems
  - Performance & SEO optimized
  - Delivered in 2–4 weeks

**Service Card 2: AI Automation**
- Tag: "AI Automation" (cyan)
- Headline: "Save 10+ hours a week with smart automations"
- Description: "Connect your tools, automate your workflows, and let AI handle the repetitive stuff."
- Features:
  - Email & CRM automation
  - Custom AI assistants for your business
  - Data pipelines & reporting
  - Integrations with any tool you use

### Card Styling
- Border: 2px solid `--color-primary`
- Border-radius: 16px
- Padding: 40px
- Background: transparent (outline style)
- Tag: Small pill badge with category color
- Feature list: Arrow bullets (→)

### Animations
- Scroll-triggered: Cards scale in with 150ms stagger
- Hover: Background fills with `--color-primary-subtle`, border lightens

---

## 5. How It Works

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [DARK BACKGROUND]                                                          │
│                                                                             │
│     [LABEL: The process]                                                    │
│     HEADLINE: Simple. Fast. No surprises.                                   │
│     SUB: From first message to live product — here's how we work together.  │
│                                                                             │
│     ┌─────────┐        ┌─────────┐        ┌─────────┐                       │
│     │    1    │   →    │    2    │   →    │    3    │                       │
│     │  [ICON] │        │  [ICON] │        │  [ICON] │                       │
│     │  WE TALK│        │ I BUILD │        │YOU LAUNCH                       │
│     │         │        │         │        │         │                       │
│     │Describe │        │Regular  │        │Review & │                       │
│     │process..│        │updates..│        │go live..│                       │
│     └─────────┘        └─────────┘        └─────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 3-column grid for steps
- Horizontal arrows between steps
- Full-width dark background section

**Tablet (640px - 1024px)**
- 3-column grid, compact
- Vertical layout arrows or hidden arrows

**Mobile (< 640px)**
- Single column, stacked
- Vertical connecting line on left side

### Content

**Section Label:** "The process"
**Headline:** "Simple. Fast. No surprises."
**Subtext:** "From first message to live product — here's how we work together."

**Step 1: We Talk**
- Number: 1 (in purple circle)
- Title: "We talk"
- Text: "Tell me what you need. Free 30-min call to understand your goals and define the scope."

**Step 2: I Build**
- Number: 2
- Title: "I build"
- Text: "I design and develop your solution with regular updates so you're never in the dark."

**Step 3: You Launch**
- Number: 3
- Title: "You launch"
- Text: "We review together, make final tweaks, and go live. I stay available after launch too."

### Styling
- Background: `--bg-dark`
- Text: `--text-dark-primary`
- Step number: 48px circle, `--color-primary` background, white text
- Connecting arrows: Light opacity line or arrow icon

### Animations
- Scroll-triggered: Steps fade up with 150ms stagger
- Numbers: Count-up animation or pulse on scroll into view
- Arrows: Draw-in animation (SVG stroke animation)

---

## 6. Projects

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     [LABEL: My work]                                                        │
│     HEADLINE: Recent Projects                                               │
│     SUB: Case studies and live projects.                                    │
│                                                                             │
│     ┌───────────────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│     │                           │  │                 │  │                 │ │
│     │   [PROJECT IMAGE/THEME]   │  │  [THEME COLOR]  │  │  [THEME COLOR]  │ │
│     │      🍽️ Restaurant        │  │     🤖 Robot    │  │    ⚙️ Gears     │ │
│     │                           │  │                 │  │                 │ │
│     │                           │  │                 │  │                 │ │
│     ├───────────────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│     │ [Web App] [React] [API]   │  │ [AI] [n8n]      │  │ [Automation]    │ │
│     │                           │  │                 │  │                 │ │
│     │ Osteria Bellavista —      │  │ Project Name    │  │ Project Name    │ │
│     │ Sito + Prenotazioni       │  │                 │  │                 │ │
│     │                           │  │ Description...  │  │ Description...  │ │
│     │ [Live demo →]             │  │ Coming soon     │  │ Coming soon     │ │
│     └───────────────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 3-column grid
- First project (Osteria Bellavista) larger or featured
- Or equal cards with Osteria Bellavista first

**Tablet (640px - 1024px)**
- 2-column grid
- Osteria Bellavista full-width top, others below

**Mobile (< 640px)**
- Single column, stacked
- Full-width cards

### Content

**Section Label:** "My work"
**Headline:** "Recent Projects"
**Subtext:** "Case studies and live projects."

**Project 1: Osteria Bellavista (Featured)**
- Image/Theme: Blue gradient with utensils icon
- Tags: Web App, React, FastAPI, Python
- Title: "Osteria Bellavista — Sito + Prenotazioni"
- Description: "Landing page + sistema prenotazioni per ristorante ticinese. React frontend, FastAPI backend, prenotazione in 4 step con notifica automatica al ristorante."
- CTA: "Live demo →" (links to deployed project)

**Project 2: AI Project (Placeholder)**
- Theme: Purple gradient with robot icon
- Tags: AI, n8n
- Title: "Project Name"
- Description: "Short description of the project and the result achieved."
- Status: "Coming soon"

**Project 3: Automation Project (Placeholder)**
- Theme: Teal gradient with gears icon
- Tags: Automation
- Title: "Project Name"
- Description: "Short description of the project and the result achieved."
- Status: "Coming soon"

### Card Styling
- Border-radius: 16px
- Overflow: hidden (for image area)
- Image area: 16:10 aspect ratio, gradient background with icon
- Body padding: 24px
- Tags: Row of small pills
- Hover: Card lifts, shadow increases

### Animations
- Scroll-triggered: Cards fade up with 150ms stagger
- Image area: Subtle parallax or zoom on hover
- CTA button: Arrow slides right on hover

---

## 7. About

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     ┌──────────────────┐  ┌──────────────────────────────────────────────┐ │
│     │                  │  │ HEADLINE: Hi, I'm Marco.                     │ │
│     │   [B&W PHOTO]    │  │                                              │ │
│     │                  │  │ Paragraph 1 about being a freelance          │ │
│     │   Marco photo    │  │ developer in Switzerland...                  │ │
│     │   (rounded       │  │                                              │ │
│     │    corners)      │  │ Paragraph 2 about speaking the client's      │ │
│     │                  │  │ language, not tech jargon...                 │ │
│     │                  │  │                                              │ │
│     │                  │  │ [Web Dev] [AI & Automation] [Python]         │ │
│     │                  │  │ [React] [n8n] [FastAPI]                      │ │
│     │                  │  │                                              │ │
│     └──────────────────┘  └──────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- 2-column: 40% photo | 60% text
- Photo: Max-width 360px, rounded corners (20px)
- Skills: Horizontal wrap row

**Tablet (640px - 1024px)**
- 2-column with smaller photo
- Or single column, photo centered top

**Mobile (< 640px)**
- Single column
- Photo centered, max-width 280px
- Skills wrap naturally

### Content

**Headline:** "Hi, I'm Marco."

**Paragraph 1:**
```
I'm a freelance developer based in Switzerland, specializing in web 
development and AI automation. I work with small businesses and startups 
who want to look professional online and work smarter — without the 
overhead of an agency.
```

**Paragraph 2:**
```
I speak your language, not tech jargon. My goal is simple: build things 
that actually help your business grow.
```

**Skills (pills):**
- Web Dev
- AI & Automation
- Python
- React
- n8n
- FastAPI

### Styling
- Photo: Black & white, 20px border-radius
- Skills pills: `--bg-subtle` background, rounded
- Text: `--text-secondary` for paragraphs

### Animations
- Scroll-triggered: Photo fades in from left, text from right
- Skills pills: Staggered fade up

---

## 8. Contact

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [DARK BACKGROUND]                                                          │
│                                                                             │
│                         HEADLINE: Ready to start a project?                 │
│                                                                              │
│              SUB: Tell me what you need. I'll get back to you               │
│                   within 24 hours.                                          │
│                                                                             │
│                    ┌─────────────────────────────────────┐                  │
│                    │ Your name                           │                  │
│                    ├─────────────────────────────────────┤                  │
│                    │ Your email                          │                  │
│                    ├─────────────────────────────────────┤                  │
│                    │ What do you need help with?         │                  │
│                    │                                     │                  │
│                    │                                     │                  │
│                    ├─────────────────────────────────────┤                  │
│                    │   [Send message →]                  │                  │
│                    └─────────────────────────────────────┘                  │
│                                                                             │
│                         [✓] Message sent!                                   │
│                         I'll get back to you within 24 hours.               │
│                                                                             │
│                                                                             │
│                         [LinkedIn icon]  [GitHub icon]                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Desktop (> 1024px)**
- Centered form, max-width 560px
- Full-width dark background
- Social links centered below form

**Tablet (640px - 1024px)**
- Same, max-width 480px

**Mobile (< 640px)**
- Form full-width with padding
- Stacked inputs naturally

### Content

**Headline:** "Ready to start a project?"
**Subtext:** "Tell me what you need. I'll get back to you within 24 hours."

**Form Fields:**
1. Name (text input, placeholder: "Your name")
2. Email (email input, placeholder: "Your email")
3. Message (textarea, placeholder: "What do you need help with?", min-height: 160px)

**Submit Button:** "Send message →" (light variant on dark bg)

**Success State:**
- Icon: Checkmark circle
- Title: "Message sent!"
- Text: "I'll get back to you within 24 hours."

**Social Links:**
- LinkedIn (icon)
- GitHub (icon)

### Styling
- Background: `--bg-dark`
- Input background: `--bg-dark-elevated`
- Input border: `--bg-dark-subtle`
- Button: White background, dark text

### Animations
- Scroll-triggered: Form fades up
- Input focus: Border color transition, subtle glow
- Submit button: Loading state with spinner
- Success: Form fades out, success message fades in with checkmark animation

---

## 9. Footer

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [DARK BACKGROUND - Elevated]                                               │
│                                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │ © 2026 Marco · Web & AI Automation · Switzerland               [🔗][🐙]│
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**All Breakpoints**
- Single row (or stacked on mobile)
- Copyright left, social icons right
- Reduced padding: 24px vertical

### Content

**Copyright:** "© 2026 Marco · Web & AI Automation · Switzerland"

**Social Icons:**
- LinkedIn
- GitHub

### Styling
- Background: `--bg-dark-elevated` (slightly lighter than contact)
- Border-top: 1px solid `--bg-dark-subtle`
- Text: `--text-dark-secondary`
- Icons: `--text-dark-secondary`, hover to white

### Animations
- Icon hover: Scale up, color change

---

## Responsive Summary

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked sections, hamburger nav, full-width CTAs |
| Tablet | 640px - 1024px | 2-column grids, reduced padding, simplified hero |
| Desktop | > 1024px | Full layouts, side-by-side sections, all animations |

### Container Widths

| Breakpoint | Max-width | Padding |
|------------|-----------|---------|
| Mobile | 100% | 16px |
| Tablet | 100% | 24px |
| Desktop | 1280px | 32px |
| Large | 1536px | 48px |

### Typography Responsive Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 Hero | 2.25rem | 3rem | 3.75rem |
| H2 Section | 1.875rem | 2rem | 2.25rem |
| Body | 1rem | 1rem | 1rem |
| Small | 0.875rem | 0.875rem | 0.875rem |

---

## Animation Summary

| Section | Animation Type | Trigger | Duration |
|---------|---------------|---------|----------|
| Navigation | Glassmorphism on scroll | Scroll > 50px | 200ms |
| Hero | Staggered entrance | Page load | 1000ms total |
| Pain Points | Fade up + stagger | Scroll into view | 600ms |
| Services | Scale in + stagger | Scroll into view | 600ms |
| How It Works | Fade up + number pulse | Scroll into view | 600ms |
| Projects | Fade up + stagger | Scroll into view | 600ms |
| About | Slide in from sides | Scroll into view | 600ms |
| Contact | Fade up | Scroll into view | 500ms |
| Buttons | Lift + shadow | Hover | 200ms |
| Cards | Lift + glow | Hover | 300ms |
| Links | Underline draw | Hover | 200ms |
| Progress bar | ScaleX | Continuous scroll | 100ms |
