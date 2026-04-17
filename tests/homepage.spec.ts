import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Marco/);
  });

  test('navigation is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('hero section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByLabel('Toggle dark mode');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('language switcher works', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.getByLabel('Select language');
    await langBtn.click();
    await page.getByRole('menuitem', { name: /english/i }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
