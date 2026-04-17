const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const lang of ['it', 'en']) {
    await page.goto('http://localhost:4321');
    await page.evaluate((l) => { localStorage.setItem('language', l); localStorage.setItem('theme', 'light'); }, lang);
    await page.reload();
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `screenshot-about-${lang}-v3.png` });
  }

  await browser.close();
  console.log('Done about v3');
})();
