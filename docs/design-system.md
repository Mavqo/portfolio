# Design System — Marco Portfolio (Astro)

**Date:** 2026-03-27  
**Framework:** Astro + Tailwind CSS + Framer Motion  
**Target:** Freelance developer portfolio for Swiss small businesses

---

## 1. Color Palette

### CSS Custom Properties

```css
:root {
  /* Primary Brand Colors */
  --color-primary: #6366f1;          /* Indigo 500 - Main accent */
  --color-primary-light: #818cf8;    /* Indigo 400 - Hover states */
  --color-primary-dark: #4f46e5;     /* Indigo 600 - Active states */
  --color-primary-subtle: rgba(99, 102, 241, 0.1);  /* Subtle backgrounds */
  
  /* Secondary Colors */
  --color-secondary: #06b6d4;        /* Cyan 500 - Secondary accent */
  --color-secondary-light: #22d3ee;  /* Cyan 400 */
  --color-secondary-dark: #0891b2;   /* Cyan 600 */
  
  /* Dark Theme */
  --bg-dark: #0f172a;                /* Slate 900 */
  --bg-dark-elevated: #1e293b;       /* Slate 800 - Cards on dark */
  --bg-dark-subtle: #334155;         /* Slate 700 - Borders on dark */
  --text-dark-primary: #f8fafc;      /* Slate 50 */
  --text-dark-secondary: #94a3b8;    /* Slate 400 */
  
  /* Light Theme */
  --bg-light: #ffffff;               /* Pure white */
  --bg-light-elevated: #f8fafc;      /* Slate 50 - Cards on light */
  --bg-light-subtle: #f1f5f9;        /* Slate 100 - Section alternates */
  --text-light-primary: #0f172a;     /* Slate 900 */
  --text-light-secondary: #64748b;   /* Slate 500 */
  
  /* Semantic Colors */
  --color-success: #10b981;          /* Emerald 500 */
  --color-success-subtle: rgba(16, 185, 129, 0.1);
  --color-warning: #f59e0b;          /* Amber 500 */
  --color-error: #ef4444;            /* Red 500 */
  --color-error-subtle: rgba(239, 68, 68, 0.1);
  --color-info: #3b82f6;             /* Blue 500 */
  
  /* Gradient Definitions */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  --gradient-dark: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  --gradient-mesh: radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
                   radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
                   radial-gradient(at 0% 50%, rgba(99, 102, 241, 0.1) 0px, transparent 50%);
}

/* Dark mode override */
[data-theme="dark"] {
  --bg-primary: var(--bg-dark);
  --bg-elevated: var(--bg-dark-elevated);
  --bg-subtle: var(--bg-dark-subtle);
  --text-primary: var(--text-dark-primary);
  --text-secondary: var(--text-dark-secondary);
}

/* Light mode (default) */
[data-theme="light"],
:root {
  --bg-primary: var(--bg-light);
  --bg-elevated: var(--bg-light-elevated);
  --bg-subtle: var(--bg-light-subtle);
  --text-primary: var(--text-light-primary);
  --text-secondary: var(--text-light-secondary);
}
```

### Color Usage Guidelines

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Page background | `--bg-light` | `--bg-dark` |
| Cards/elevated surfaces | `--bg-light-elevated` | `--bg-dark-elevated` |
| Primary text | `--text-light-primary` | `--text-dark-primary` |
| Secondary text | `--text-light-secondary` | `--text-dark-secondary` |
| Primary buttons | `--color-primary` | `--color-primary` |
| Links | `--color-primary` | `--color-primary-light` |
| Borders | `--bg-light-subtle` | `--bg-dark-subtle` |
| Success states | `--color-success` | `--color-success` |
| Error states | `--color-error` | `--color-error` |

---

## 2. Typography System

### Font Families

```css
:root {
  /* Display & Headings - Modern Geometric Sans */
  --font-heading: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  /* Body Text - Clean, highly readable */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  
  /* Code & Technical Content */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem (16px) | 0.01em | Captions, fine print |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) | 0 | Body small, labels |
| `text-base` | 1rem (16px) | 1.5rem (24px) | 0 | Body text |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) | -0.01em | Lead paragraphs |
| `text-xl` | 1.25rem (20px) | 1.75rem (28px) | -0.01em | Small headings |
| `text-2xl` | 1.5rem (24px) | 2rem (32px) | -0.01em | Section subtitles |
| `text-3xl` | 1.875rem (30px) | 2.25rem (36px) | -0.02em | Section headings (mobile) |
| `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | -0.02em | Hero heading (mobile) |
| `text-5xl` | 3rem (48px) | 1 | -0.02em | Hero heading (tablet) |
| `text-6xl` | 3.75rem (60px) | 1 | -0.03em | Hero heading (desktop) |
| `text-7xl` | 4.5rem (72px) | 1 | -0.03em | Display (large screens) |

### Typography Patterns

```css
/* Section Label (uppercase eyebrow text) */
.section-label {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}

/* Hero Headline */
.hero-headline {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

/* Section Heading */
.section-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.875rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* Body Large (hero subtext) */
.body-large {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Body Default */
.body-default {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
}

/* Code Block */
.code-block {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.6;
}
```

---

## 3. Spacing System

### Base Unit: 4px

| Token | Value | Common Usage |
|-------|-------|--------------|
| `space-1` | 0.25rem (4px) | Icon gaps, tight padding |
| `space-2` | 0.5rem (8px) | Inline spacing, small gaps |
| `space-3` | 0.75rem (12px) | Button padding-y |
| `space-4` | 1rem (16px) | Standard padding, card gaps |
| `space-5` | 1.25rem (20px) | Form field gaps |
| `space-6` | 1.5rem (24px) | Section content gaps |
| `space-8` | 2rem (32px) | Card padding |
| `space-10` | 2.5rem (40px) | Large component gaps |
| `space-12` | 3rem (48px) | Section internal spacing |
| `space-16` | 4rem (64px) | Large section padding |
| `space-20` | 5rem (80px) | XL section padding |
| `space-24` | 6rem (96px) | Section vertical rhythm |
| `space-32` | 8rem (128px) | Major section dividers |

### Layout Spacing

```css
:root {
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Section padding */
  --section-padding-y: clamp(4rem, 8vw, 6rem);
  --section-padding-x: clamp(1rem, 5vw, 3rem);
  
  /* Grid gap */
  --grid-gap: clamp(1rem, 3vw, 2rem);
  
  /* Card padding */
  --card-padding: clamp(1.5rem, 4vw, 2rem);
}
```

### Grid System: 12-Column

```css
/* Grid container */
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--section-padding-x);
}

/* Common column spans */
.col-12 { grid-column: span 12; }
.col-8  { grid-column: span 8; }
.col-6  { grid-column: span 6; }
.col-4  { grid-column: span 4; }
.col-3  { grid-column: span 3; }

/* Responsive adjustments */
@media (max-width: 1024px) {
  .col-lg-6 { grid-column: span 6; }
  .col-lg-12 { grid-column: span 12; }
}

@media (max-width: 768px) {
  .col-md-12 { grid-column: span 12; }
  .grid-container {
    gap: 1rem;
  }
}
```

---

## 4. Component Specifications

### Buttons

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--text-sm);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  line-height: 1;
}

/* Primary Button */
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.btn-secondary:hover {
  background: var(--color-primary-subtle);
  transform: translateY(-2px);
}

/* Outline Button (for dark backgrounds) */
.btn-outline-light {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}
.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
}
.btn-ghost:hover {
  background: var(--bg-subtle);
}

/* Small variant */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-xs);
}

/* Large variant */
.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--text-base);
}

/* With icon */
.btn-icon {
  padding-left: 1.25rem;
}
.btn-icon svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}
.btn-icon:hover svg {
  transform: translateX(4px);
}
```

### Cards

```css
/* Base Card */
.card {
  background: var(--bg-elevated);
  border-radius: 1rem;
  padding: var(--card-padding);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

/* Project Card */
.card-project {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}
.card-project .card-image {
  aspect-ratio: 16 / 10;
  background: var(--gradient-mesh);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-primary);
}
.card-project .card-body {
  padding: var(--card-padding);
}
.card-project:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Service Card */
.card-service {
  border: 2px solid var(--color-primary);
  background: transparent;
}
.card-service:hover {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-light);
}

/* Pain Point Card */
.card-pain {
  background: var(--bg-elevated);
  border: 1px solid var(--bg-subtle);
  text-align: center;
}
.card-pain .card-icon {
  width: 3rem;
  height: 3rem;
  background: var(--color-primary-subtle);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--color-primary);
  font-size: 1.25rem;
}
```

### Form Inputs

```css
/* Form Group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Input Base */
.input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: 0.875rem 1rem;
  border: 2px solid var(--bg-subtle);
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  color: var(--text-primary);
  transition: all 0.2s ease;
  width: 100%;
}
.input:hover {
  border-color: var(--text-secondary);
}
.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}
.input::placeholder {
  color: var(--text-secondary);
}

/* Textarea variant */
.textarea {
  min-height: 8rem;
  resize: vertical;
}

/* Input with icon */
.input-icon-wrapper {
  position: relative;
}
.input-icon-wrapper .icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}
.input-icon-wrapper .input {
  padding-left: 2.75rem;
}

/* Error state */
.input-error {
  border-color: var(--color-error);
}
.input-error:focus {
  box-shadow: 0 0 0 3px var(--color-error-subtle);
}
.error-message {
  font-size: var(--text-sm);
  color: var(--color-error);
}

/* Success state */
.input-success {
  border-color: var(--color-success);
}
```

### Navigation

```css
/* Nav Container */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bg-subtle);
  padding: 1rem 0;
}

[data-theme="dark"] .nav {
  background: rgba(15, 23, 42, 0.8);
}

/* Nav Inner */
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--section-padding-x);
}

/* Logo */
.nav-logo {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
}

/* Nav Links */
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-link {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
}
.nav-link:hover {
  color: var(--color-primary);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.2s ease;
}
.nav-link:hover::after {
  width: 100%;
}

/* Mobile Menu Toggle */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
}
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid var(--bg-subtle);
  }
  .nav-links.is-open {
    display: flex;
  }
}
```

### Tags & Badges

```css
/* Base Tag */
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Tag variants */
.tag-primary {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
}
.tag-secondary {
  background: rgba(6, 182, 212, 0.1);
  color: var(--color-secondary-dark);
}
.tag-outline {
  background: transparent;
  border: 1px solid var(--bg-subtle);
  color: var(--text-secondary);
}
.tag-success {
  background: var(--color-success-subtle);
  color: var(--color-success);
}

/* Skill Pills (About section) */
.skill-pill {
  display: inline-flex;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: var(--bg-subtle);
  border-radius: 0.5rem;
  color: var(--text-primary);
}
```

---

## 5. Animation Specifications

### Page Load Animation Sequence

```typescript
// Framer Motion variants for staggered page load
export const pageLoadVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier
    }
  },
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  },
};
```

### Hero Animation Sequence

```typescript
// Hero section animation timeline
export const heroAnimationSequence = {
  // 1. Background mesh fades in (0ms delay)
  background: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  },
  
  // 2. Label slides up (200ms delay)
  label: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  },
  
  // 3. Headline words stagger (300ms delay, 50ms stagger)
  headline: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.3 }
    }
  },
  
  // 4. Subtext fades up (500ms delay)
  subtext: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.5 }
    }
  },
  
  // 5. CTA buttons slide up (600ms delay)
  buttons: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.6 }
    }
  },
  
  // 6. Avatar/illustration scales in (400ms delay)
  visual: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, delay: 0.4, ease: "easeOut" }
    }
  },
  
  // 7. Tech strip slides up (800ms delay)
  techStrip: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.8 }
    }
  }
};
```

### Scroll-Triggered Animations

```typescript
// Scroll reveal animation
export const scrollRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

// Staggered children reveal (for card grids)
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

// Card hover animation
export const cardHoverVariants = {
  initial: { 
    y: 0, 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
  },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
```

### Hover Micro-interactions

```css
/* Link hover underline animation */
.link-animated {
  position: relative;
  text-decoration: none;
}
.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}
.link-animated:hover::after {
  width: 100%;
}

/* Button hover lift */
.btn-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Card hover glow */
.card-glow {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card-glow:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
  border-color: var(--color-primary-light);
}

/* Icon bounce on hover */
.icon-bounce {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-bounce:hover {
  transform: scale(1.1);
}

/* Smooth focus transitions */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  transition: outline-offset 0.2s ease;
}
```

### Scroll Progress Indicator

```typescript
// Scroll progress bar animation
export const scrollProgressVariants = {
  initial: { scaleX: 0 },
  animate: (scrollProgress: number) => ({
    scaleX: scrollProgress,
    transition: { duration: 0.1, ease: "linear" }
  })
};

// Usage in component
// const { scrollYProgress } = useScroll();
// const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
```

```css
/* Progress bar styles */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform-origin: left;
  z-index: 100;
}
```

### Easing Functions Reference

```css
:root {
  /* Standard easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom easings for polish */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1);
}
```

### Animation Timing Reference

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro-interaction (hover) | 150-200ms | `--ease-out` |
| Button transitions | 200ms | `--ease-out` |
| Card hover lift | 300ms | `--ease-smooth` |
| Page element fade-in | 400-600ms | `--ease-smooth` |
| Hero sequence | 500-800ms | `--ease-smooth` |
| Scroll reveal | 600ms | `--ease-smooth` |
| Stagger delay | 100-150ms | — |
| Page load sequence | 1000-1500ms total | — |

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```typescript
// Framer Motion reduced motion
import { useReducedMotion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeUpVariants}
    />
  );
}
```

---

## 6. Accessibility Standards (WCAG AA)

### Color Contrast Requirements

| Element | Minimum Ratio | Target Colors |
|---------|---------------|---------------|
| Body text on bg | 4.5:1 | `--text-primary` on `--bg-primary` (15:1) |
| Large text on bg | 3:1 | `--text-primary` on `--bg-primary` (15:1) |
| UI components | 3:1 | `--color-primary` on white (4.6:1) |
| Links on bg | 4.5:1 | `--color-primary` on white (4.6:1) |

### Focus Indicators

- All interactive elements must have visible focus states
- Focus outline: 2px solid `--color-primary` with 2px offset
- No focus traps; ensure logical tab order

### Motion & Animation

- Respect `prefers-reduced-motion` media query
- No auto-playing animations longer than 5 seconds
- No flashing content (no more than 3 flashes per second)

### Typography Accessibility

- Minimum body text size: 16px
- Line height minimum: 1.5
- Paragraph width maximum: 75 characters
