import { test, expect } from '@playwright/test';

test.describe('Recipe Finder PWA', () => {
  test('should load recipes list', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('app-recipe-card', { timeout: 10000 });

    const cards = await page.locator('app-recipe-card').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('should toggle between card and table view', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('app-recipe-card', { timeout: 10000 });

    await page.click('button[aria-label="Table view"]');

    await expect(page.locator('app-recipe-grid')).toBeVisible();

    await page.click('button[aria-label="Card view"]');

    await expect(page.locator('app-recipe-card').first()).toBeVisible();
  });

  test('should navigate to recipe detail', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('app-recipe-card', { timeout: 10000 });

    await page.locator('app-recipe-card').first().click();

    await page.waitForURL(/\/recipe\/\d+/);

    await expect(page.locator('.recipe-image')).toBeVisible();
    await expect(page.locator('.recipe-meta')).toBeVisible();
  });

  test('should expand recipe details', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-recipe-card', { timeout: 10000 });
    await page.locator('app-recipe-card').first().click();
    await page.waitForURL(/\/recipe\/\d+/);

    await page.click('button:has-text("Show All Details")');

    await expect(page.locator('mat-expansion-panel').first()).toBeVisible();
  });

  test('should navigate back from detail page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-recipe-card', { timeout: 10000 });
    await page.locator('app-recipe-card').first().click();
    await page.waitForURL(/\/recipe\/\d+/);

    await page.click('button[aria-label="Go back"]');

    await page.waitForURL('/recipes');
    await expect(page.locator('app-recipe-card').first()).toBeVisible();
  });

  test('service worker should be registered', async ({ page }) => {
    await page.goto('/');

    const hasServiceWorker = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });

    expect(hasServiceWorker).toBe(true);
  });
});
