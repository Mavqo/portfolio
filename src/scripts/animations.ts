/**
 * Global Animations Module
 * Scroll reveal, micro-interactions, and animation utilities
 */

// Scroll reveal with IntersectionObserver
export function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}

// Stagger animation for child elements
export function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  
  staggerContainers.forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      (child as HTMLElement).style.animationDelay = `${index * 100}ms`;
      child.classList.add('stagger-item');
    });
  });
}

// Progress bar animation
export function initProgressBars() {
  const progressBars = document.querySelectorAll('[data-progress]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target as HTMLElement;
        const value = bar.getAttribute('data-progress') || '0';
        setTimeout(() => {
          bar.style.width = `${value}%`;
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Counter animation for stats
export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target as HTMLElement;
        const target = parseInt(counter.getAttribute('data-counter') || '0', 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + suffix;
          }
        }, 16);
        
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Navigation scroll behavior
export function initNavigationScroll() {
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (nav) {
      // Add blur intensity based on scroll
      if (currentScrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      
      // Update active nav link
      updateActiveNavLink();
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-links a[href^="#"]');
  
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop;
    const sectionHeight = (section as HTMLElement).offsetHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id') || '';
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href')?.substring(1);
    if (href === current) {
      link.classList.add('active');
    }
  });
}

// Initialize all animations
export function initAnimations() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initStaggerAnimations();
      initProgressBars();
      initCounters();
      initNavigationScroll();
    });
  } else {
    initScrollReveal();
    initStaggerAnimations();
    initProgressBars();
    initCounters();
    initNavigationScroll();
  }
}

// Auto-initialize
initAnimations();
