// main.js

// ─── Translations ──────────────────────────────────────────────────────────────
const translations = {
  en: {
    'nav-services': 'Services',
    'nav-work': 'Work',
    'nav-about': 'About',
    'nav-cta': "Let's talk →",
    'hero-label': 'Freelance Developer & AI Specialist',
    'hero-h1': 'I build websites<br>and <span>automations</span><br>that work for you.',
    'hero-sub': 'Whether you need a professional website or want to save hours with AI automation — I help small businesses grow without the tech headaches.',
    'hero-btn-primary': "Let's talk →",
    'hero-btn-outline': 'See my work ↓',
    'tech-label': 'Built with',
    'problem-label': 'Sound familiar?',
    'problem-h2': 'Running a business is hard enough.',
    'problem-sub': "You shouldn't have to worry about your website or waste hours on repetitive tasks.",
    'pain-1-h3': 'Your website looks outdated',
    'pain-1-p': 'Clients judge you in 3 seconds. An old site costs you credibility before you even speak.',
    'pain-2-h3': 'You waste hours on repetitive work',
    'pain-2-p': 'Emails, reports, data entry — tasks that could run automatically while you focus on what matters.',
    'pain-3-h3': 'Tech feels overwhelming',
    'pain-3-p': 'You need results, not a tech course. I handle the complexity, you see the outcome.',
    'services-label': 'What I do',
    'services-h2': 'Two services. Real results.',
    'services-sub': 'Focused on what actually moves the needle for small businesses.',
    'svc1-tag': 'Web Development',
    'svc1-h3': 'A website that converts visitors into clients',
    'svc1-p': 'Fast, mobile-first, and built to make your business look credible from day one.',
    'svc1-li1': 'Landing pages & business sites',
    'svc1-li2': 'E-commerce & booking systems',
    'svc1-li3': 'Performance & SEO optimized',
    'svc1-li4': 'Delivered in 2–4 weeks',
    'svc2-tag': 'AI Automation',
    'svc2-h3': 'Save 10+ hours a week with smart automations',
    'svc2-p': 'Connect your tools, automate your workflows, and let AI handle the repetitive stuff.',
    'svc2-li1': 'Email & CRM automation',
    'svc2-li2': 'Custom AI assistants for your business',
    'svc2-li3': 'Data pipelines & reporting',
    'svc2-li4': 'Integrations with any tool you use',
    'hiw-label': 'The process',
    'hiw-h2': 'Simple. Fast. No surprises.',
    'hiw-sub': 'From first message to live product — here\'s how we work together.',
    'step1-h3': 'We talk',
    'step1-p': 'Tell me what you need. Free 30-min call to understand your goals and define the scope.',
    'step2-h3': 'I build',
    'step2-p': 'I design and develop your solution with regular updates so you\'re never in the dark.',
    'step3-h3': 'You launch',
    'step3-p': 'We review together, make final tweaks, and go live. I stay available after launch too.',
    'projects-label': 'My work',
    'projects-h2': 'Recent Projects',
    'projects-sub': 'Case studies coming soon.',
    'proj-coming': 'Coming soon',
    'proj1-h3': 'Project Name',
    'proj1-p': 'Short description of the project and the result achieved.',
    'proj2-h3': 'Project Name',
    'proj2-p': 'Short description of the project and the result achieved.',
    'proj3-h3': 'Project Name',
    'proj3-p': 'Short description of the project and the result achieved.',
    'about-h2': "Hi, I'm Marco.",
    'about-p1': "I'm a freelance developer based in Switzerland, specializing in web development and AI automation. I work with small businesses and startups who want to look professional online and work smarter — without the overhead of an agency.",
    'about-p2': "I speak your language, not tech jargon. My goal is simple: build things that actually help your business grow.",
    'contact-h2': 'Ready to start a project?',
    'contact-sub': "Tell me what you need. I'll get back to you within 24 hours.",
    'form-name': 'Your name',
    'form-email': 'Your email',
    'form-message': 'What do you need help with?',
    'form-submit': 'Send message →',
    'footer': '© 2026 Marco · Web & AI Automation · Switzerland',
  },
  it: {
    'nav-services': 'Servizi',
    'nav-work': 'Lavori',
    'nav-about': 'Chi sono',
    'nav-cta': 'Parliamone →',
    'hero-label': 'Sviluppatore Freelance & Specialista AI',
    'hero-h1': 'Costruisco siti web<br>e <span>automazioni</span><br>che lavorano per te.',
    'hero-sub': 'Che tu abbia bisogno di un sito professionale o voglia risparmiare ore con l\'automazione AI — aiuto le piccole imprese a crescere senza grattacapi tecnologici.',
    'hero-btn-primary': 'Parliamone →',
    'hero-btn-outline': 'Guarda i miei lavori ↓',
    'tech-label': 'Realizzato con',
    'problem-label': 'Ti suona familiare?',
    'problem-h2': 'Gestire un\'azienda è già abbastanza difficile.',
    'problem-sub': 'Non dovresti preoccuparti del tuo sito o perdere ore in attività ripetitive.',
    'pain-1-h3': 'Il tuo sito sembra datato',
    'pain-1-p': 'I clienti ti giudicano in 3 secondi. Un sito vecchio ti costa credibilità prima ancora che tu parli.',
    'pain-2-h3': 'Sprechi ore in lavoro ripetitivo',
    'pain-2-p': 'Email, report, inserimento dati — attività che potrebbero girare automaticamente mentre ti concentri su ciò che conta.',
    'pain-3-h3': 'La tecnologia sembra opprimente',
    'pain-3-p': 'Hai bisogno di risultati, non di un corso tech. Gestisco io la complessità, tu vedi il risultato.',
    'services-label': 'Cosa faccio',
    'services-h2': 'Due servizi. Risultati concreti.',
    'services-sub': 'Focalizzato su ciò che fa davvero la differenza per le piccole imprese.',
    'svc1-tag': 'Web Development',
    'svc1-h3': 'Un sito che trasforma i visitatori in clienti',
    'svc1-p': 'Veloce, ottimizzato per mobile, e costruito per far sembrare la tua attività credibile fin dal primo giorno.',
    'svc1-li1': 'Landing page e siti aziendali',
    'svc1-li2': 'E-commerce e sistemi di prenotazione',
    'svc1-li3': 'Performance & SEO ottimizzati',
    'svc1-li4': 'Consegnato in 2–4 settimane',
    'svc2-tag': 'AI Automation',
    'svc2-h3': 'Risparmia 10+ ore a settimana con automazioni intelligenti',
    'svc2-p': 'Collega i tuoi strumenti, automatizza i flussi di lavoro e lascia che l\'AI gestisca le cose ripetitive.',
    'svc2-li1': 'Automazione email & CRM',
    'svc2-li2': 'Assistenti AI personalizzati per la tua azienda',
    'svc2-li3': 'Pipeline dati & reportistica',
    'svc2-li4': 'Integrazioni con qualsiasi strumento tu usi',
    'hiw-label': 'Il processo',
    'hiw-h2': 'Semplice. Veloce. Nessuna sorpresa.',
    'hiw-sub': 'Dal primo messaggio al prodotto live — ecco come lavoriamo insieme.',
    'step1-h3': 'Parliamo',
    'step1-p': 'Dimmi di cosa hai bisogno. Chiamata gratuita di 30 minuti per capire i tuoi obiettivi e definire lo scopo.',
    'step2-h3': 'Costruisco',
    'step2-p': 'Progetto e sviluppo la tua soluzione con aggiornamenti regolari così non sei mai al buio.',
    'step3-h3': 'Lanci',
    'step3-p': 'Rivediamo insieme, facciamo le ultime modifiche e andiamo live. Resto disponibile anche dopo il lancio.',
    'projects-label': 'I miei lavori',
    'projects-h2': 'Progetti Recenti',
    'projects-sub': 'Case study in arrivo.',
    'proj-coming': 'In arrivo',
    'proj1-h3': 'Nome Progetto',
    'proj1-p': 'Breve descrizione del progetto e del risultato ottenuto.',
    'proj2-h3': 'Nome Progetto',
    'proj2-p': 'Breve descrizione del progetto e del risultato ottenuto.',
    'proj3-h3': 'Nome Progetto',
    'proj3-p': 'Breve descrizione del progetto e del risultato ottenuto.',
    'about-h2': 'Ciao, sono Marco.',
    'about-p1': 'Sono uno sviluppatore freelance con sede in Svizzera, specializzato in web development e AI automation. Lavoro con piccole imprese e startup che vogliono avere una presenza professionale online e lavorare in modo più intelligente — senza i costi di un\'agenzia.',
    'about-p2': 'Parlo la tua lingua, non il gergo tecnico. Il mio obiettivo è semplice: costruire cose che aiutino davvero la tua azienda a crescere.',
    'contact-h2': 'Pronto a iniziare un progetto?',
    'contact-sub': 'Dimmi di cosa hai bisogno. Ti rispondo entro 24 ore.',
    'form-name': 'Il tuo nome',
    'form-email': 'La tua email',
    'form-message': 'Di cosa hai bisogno?',
    'form-submit': 'Invia messaggio →',
    'footer': '© 2026 Marco · Web & AI Automation · Svizzera',
  },
  de: {
    'nav-services': 'Leistungen',
    'nav-work': 'Projekte',
    'nav-about': 'Über mich',
    'nav-cta': 'Kontakt →',
    'hero-label': 'Freiberuflicher Entwickler & KI-Spezialist',
    'hero-h1': 'Ich baue Websites<br>und <span>Automatisierungen</span><br>die für dich arbeiten.',
    'hero-sub': 'Ob du eine professionelle Website brauchst oder Stunden mit KI-Automatisierung sparen möchtest — ich helfe kleinen Unternehmen zu wachsen, ohne den Technologie-Stress.',
    'hero-btn-primary': 'Kontakt →',
    'hero-btn-outline': 'Meine Arbeit ansehen ↓',
    'tech-label': 'Gebaut mit',
    'problem-label': 'Kommt dir das bekannt vor?',
    'problem-h2': 'Ein Unternehmen zu führen ist schon schwer genug.',
    'problem-sub': 'Du solltest dir keine Sorgen um deine Website machen oder Stunden mit Routineaufgaben verschwenden.',
    'pain-1-h3': 'Deine Website wirkt veraltet',
    'pain-1-p': 'Kunden urteilen in 3 Sekunden. Eine alte Website kostet dich Glaubwürdigkeit, bevor du auch nur ein Wort sagst.',
    'pain-2-h3': 'Du verschwendest Stunden mit Routinearbeit',
    'pain-2-p': 'E-Mails, Berichte, Dateneingabe — Aufgaben, die automatisch laufen könnten, während du dich auf das Wesentliche konzentrierst.',
    'pain-3-h3': 'Technik fühlt sich überwältigend an',
    'pain-3-p': 'Du brauchst Ergebnisse, keinen Technikkurs. Ich übernehme die Komplexität, du siehst das Ergebnis.',
    'services-label': 'Was ich mache',
    'services-h2': 'Zwei Leistungen. Echte Ergebnisse.',
    'services-sub': 'Fokussiert auf das, was für kleine Unternehmen wirklich den Unterschied macht.',
    'svc1-tag': 'Webentwicklung',
    'svc1-h3': 'Eine Website, die Besucher in Kunden verwandelt',
    'svc1-p': 'Schnell, mobiloptimiert und darauf ausgelegt, dein Unternehmen vom ersten Tag an glaubwürdig erscheinen zu lassen.',
    'svc1-li1': 'Landingpages & Unternehmenswebsites',
    'svc1-li2': 'E-Commerce & Buchungssysteme',
    'svc1-li3': 'Performance & SEO optimiert',
    'svc1-li4': 'Lieferung in 2–4 Wochen',
    'svc2-tag': 'KI-Automatisierung',
    'svc2-h3': 'Spare 10+ Stunden pro Woche mit intelligenten Automatisierungen',
    'svc2-p': 'Verbinde deine Tools, automatisiere deine Workflows und lass die KI die Routinearbeit übernehmen.',
    'svc2-li1': 'E-Mail & CRM-Automatisierung',
    'svc2-li2': 'Individuelle KI-Assistenten für dein Unternehmen',
    'svc2-li3': 'Datenpipelines & Reporting',
    'svc2-li4': 'Integrationen mit jedem Tool, das du nutzt',
    'hiw-label': 'Der Prozess',
    'hiw-h2': 'Einfach. Schnell. Keine Überraschungen.',
    'hiw-sub': 'Von der ersten Nachricht bis zum Live-Produkt — so arbeiten wir zusammen.',
    'step1-h3': 'Wir sprechen',
    'step1-p': 'Sag mir, was du brauchst. Kostenloses 30-Minuten-Gespräch, um deine Ziele zu verstehen und den Umfang zu definieren.',
    'step2-h3': 'Ich baue',
    'step2-p': 'Ich entwerfe und entwickle deine Lösung mit regelmäßigen Updates, damit du immer auf dem Laufenden bist.',
    'step3-h3': 'Du startest',
    'step3-p': 'Wir prüfen gemeinsam, nehmen letzte Anpassungen vor und gehen live. Ich bleibe auch nach dem Start erreichbar.',
    'projects-label': 'Meine Arbeit',
    'projects-h2': 'Aktuelle Projekte',
    'projects-sub': 'Fallstudien folgen bald.',
    'proj-coming': 'Demnächst',
    'proj1-h3': 'Projektname',
    'proj1-p': 'Kurze Beschreibung des Projekts und des erzielten Ergebnisses.',
    'proj2-h3': 'Projektname',
    'proj2-p': 'Kurze Beschreibung des Projekts und des erzielten Ergebnisses.',
    'proj3-h3': 'Projektname',
    'proj3-p': 'Kurze Beschreibung des Projekts und des erzielten Ergebnisses.',
    'about-h2': 'Hallo, ich bin Marco.',
    'about-p1': 'Ich bin ein freiberuflicher Entwickler mit Sitz in der Schweiz, spezialisiert auf Webentwicklung und KI-Automatisierung. Ich arbeite mit kleinen Unternehmen und Startups, die professionell online auftreten und intelligenter arbeiten wollen — ohne den Overhead einer Agentur.',
    'about-p2': 'Ich spreche deine Sprache, kein Technik-Kauderwelsch. Mein Ziel ist einfach: Dinge bauen, die deinem Unternehmen wirklich helfen zu wachsen.',
    'contact-h2': 'Bereit, ein Projekt zu starten?',
    'contact-sub': 'Sag mir, was du brauchst. Ich melde mich innerhalb von 24 Stunden.',
    'form-name': 'Dein Name',
    'form-email': 'Deine E-Mail',
    'form-message': 'Womit kann ich dir helfen?',
    'form-submit': 'Nachricht senden →',
    'footer': '© 2026 Marco · Web & KI-Automatisierung · Schweiz',
  },
  fr: {
    'nav-services': 'Services',
    'nav-work': 'Travaux',
    'nav-about': 'À propos',
    'nav-cta': 'Parlons-en →',
    'hero-label': 'Développeur Freelance & Spécialiste IA',
    'hero-h1': 'Je crée des sites web<br>et des <span>automatisations</span><br>qui travaillent pour vous.',
    'hero-sub': 'Que vous ayez besoin d\'un site professionnel ou souhaitiez économiser des heures grâce à l\'automatisation IA — j\'aide les petites entreprises à grandir sans les maux de tête technologiques.',
    'hero-btn-primary': 'Parlons-en →',
    'hero-btn-outline': 'Voir mes travaux ↓',
    'tech-label': 'Réalisé avec',
    'problem-label': 'Ça vous parle ?',
    'problem-h2': 'Gérer une entreprise est déjà assez difficile.',
    'problem-sub': 'Vous ne devriez pas avoir à vous soucier de votre site ou gaspiller des heures sur des tâches répétitives.',
    'pain-1-h3': 'Votre site paraît dépassé',
    'pain-1-p': 'Les clients vous jugent en 3 secondes. Un vieux site vous coûte de la crédibilité avant même que vous parliez.',
    'pain-2-h3': 'Vous perdez des heures en travail répétitif',
    'pain-2-p': 'E-mails, rapports, saisie de données — des tâches qui pourraient tourner automatiquement pendant que vous vous concentrez sur l\'essentiel.',
    'pain-3-h3': 'La tech semble écrasante',
    'pain-3-p': 'Vous avez besoin de résultats, pas d\'un cours de tech. Je gère la complexité, vous voyez le résultat.',
    'services-label': 'Ce que je fais',
    'services-h2': 'Deux services. De vrais résultats.',
    'services-sub': 'Focalisé sur ce qui fait vraiment la différence pour les petites entreprises.',
    'svc1-tag': 'Développement Web',
    'svc1-h3': 'Un site qui transforme les visiteurs en clients',
    'svc1-p': 'Rapide, mobile-first, et conçu pour rendre votre entreprise crédible dès le premier jour.',
    'svc1-li1': 'Landing pages & sites d\'entreprise',
    'svc1-li2': 'E-commerce & systèmes de réservation',
    'svc1-li3': 'Performance & SEO optimisés',
    'svc1-li4': 'Livré en 2–4 semaines',
    'svc2-tag': 'Automatisation IA',
    'svc2-h3': 'Économisez 10h+ par semaine avec des automatisations intelligentes',
    'svc2-p': 'Connectez vos outils, automatisez vos workflows et laissez l\'IA gérer les tâches répétitives.',
    'svc2-li1': 'Automatisation e-mail & CRM',
    'svc2-li2': 'Assistants IA personnalisés pour votre entreprise',
    'svc2-li3': 'Pipelines de données & reporting',
    'svc2-li4': 'Intégrations avec tous vos outils',
    'hiw-label': 'Le processus',
    'hiw-h2': 'Simple. Rapide. Sans surprises.',
    'hiw-sub': 'Du premier message au produit en ligne — voici comment nous travaillons ensemble.',
    'step1-h3': 'On discute',
    'step1-p': 'Dites-moi ce dont vous avez besoin. Appel gratuit de 30 min pour comprendre vos objectifs et définir le périmètre.',
    'step2-h3': 'Je construis',
    'step2-p': 'Je conçois et développe votre solution avec des mises à jour régulières pour que vous soyez toujours informé.',
    'step3-h3': 'Vous lancez',
    'step3-p': 'On révise ensemble, on fait les derniers ajustements et on met en ligne. Je reste disponible après le lancement.',
    'projects-label': 'Mes travaux',
    'projects-h2': 'Projets Récents',
    'projects-sub': 'Études de cas bientôt disponibles.',
    'proj-coming': 'Bientôt',
    'proj1-h3': 'Nom du Projet',
    'proj1-p': 'Courte description du projet et du résultat obtenu.',
    'proj2-h3': 'Nom du Projet',
    'proj2-p': 'Courte description du projet et du résultat obtenu.',
    'proj3-h3': 'Nom du Projet',
    'proj3-p': 'Courte description du projet et du résultat obtenu.',
    'about-h2': 'Bonjour, je suis Marco.',
    'about-p1': 'Je suis un développeur freelance basé en Suisse, spécialisé dans le développement web et l\'automatisation IA. Je travaille avec des petites entreprises et des startups qui veulent une présence professionnelle en ligne et travailler plus intelligemment — sans les coûts d\'une agence.',
    'about-p2': 'Je parle votre langue, pas le jargon tech. Mon objectif est simple : construire des choses qui aident vraiment votre entreprise à grandir.',
    'contact-h2': 'Prêt à démarrer un projet ?',
    'contact-sub': 'Dites-moi ce dont vous avez besoin. Je vous répondrai dans les 24 heures.',
    'form-name': 'Votre nom',
    'form-email': 'Votre e-mail',
    'form-message': 'De quoi avez-vous besoin ?',
    'form-submit': 'Envoyer le message →',
    'footer': '© 2026 Marco · Web & Automatisation IA · Suisse',
  },
};

// ─── i18n ──────────────────────────────────────────────────────────────────────
function applyTranslations(lang) {
  const t = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
}

// ─── Language selector ─────────────────────────────────────────────────────────
const langBtn = document.querySelector('.lang-btn');
const langMenu = document.querySelector('.lang-menu');
const langCurrent = document.querySelector('.lang-current');

function setLang(lang) {
  applyTranslations(lang);
  langCurrent.textContent = lang.toUpperCase();
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  langMenu.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langMenu.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', isOpen);
});

langMenu.querySelectorAll('button[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    setLang(btn.dataset.lang);
    langMenu.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', () => {
  langMenu.classList.remove('open');
  langBtn.setAttribute('aria-expanded', 'false');
});

// ─── Dark mode ─────────────────────────────────────────────────────────────────
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');

  const photoSrc = dark ? 'assets/photo-dark.jpg' : 'assets/photo-light.jpg';
  document.querySelectorAll('.hero-photo img, .about-photo img').forEach(img => {
    img.src = photoSrc;
  });
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// ─── Init persisted preferences ───────────────────────────────────────────────
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

const savedLang = localStorage.getItem('lang') || 'en';
setLang(savedLang);

// ─── Mobile nav toggle ─────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ─── Nav scroll shadow ─────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
});

// ─── Scroll progress bar ───────────────────────────────────────────────────────
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
});

// ─── Hero entrance stagger ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll(
    '.hero-text .label, .hero-text h1, .hero-text .hero-sub, .hero-text .hero-btns, .hero-photo'
  );
  heroEls.forEach(el => el.classList.add('hero-visible'));
});

// ─── Hero bg photo scroll blur ─────────────────────────────────────────────────
const heroBgPhoto = document.querySelector('.hero-bg-photo');
const heroSection = document.getElementById('hero');

if (heroBgPhoto && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrolled = window.scrollY;
    // Start fading in as user leaves the hero top, reach full opacity by hero bottom
    const progress = Math.min(Math.max(scrolled / heroBottom, 0), 1);
    heroBgPhoto.style.opacity = (progress * 0.55).toString();
  }, { passive: true });
}

// ─── Scroll-triggered fade-in (Intersection Observer) ─────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    setTimeout(() => el.classList.add('animated'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
