const { chromium } = require('playwright');

const sections = [
  { id: 'hero', name: 'hero' },
  { id: 'problem', name: 'problems' },
  { id: 'services', name: 'services' },
  { id: 'how-it-works', name: 'process' },
  { id: 'work', name: 'projects' },
  { id: 'about', name: 'about' },
  { id: 'contact', name: 'contact' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const lang of ['it', 'en']) {
    await page.goto('http://localhost:4321');
    await page.evaluate((l) => { localStorage.setItem('language', l); localStorage.setItem('theme', 'light'); }, lang);
    await page.reload();
    await page.waitForTimeout(1000);

    for (const sec of sections) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, sec.id);
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenshot-${sec.name}-${lang}.png` });
    }

    // Footer scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshot-footer-${lang}.png` });
  }

  await browser.close();
  console.log('Done');
})();
