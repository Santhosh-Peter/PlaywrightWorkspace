// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('Search for iPhone Products', async ({ page }) => {
    // Navigate to the Amazon India homepage at https://www.amazon.in
    await page.goto('https://www.amazon.in');

    // Enter the search term "iphone" into the search field
    await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('iphone');

    // Click the search button (magnifying glass icon or "Go" button)
    await page.getByRole('button', { name: 'Go', exact: true }).click();

    // Validate that the page title contains "iphone"
    await expect(page).toHaveTitle(/iphone/);

    // Verify that product listings are displayed
    await expect(page.getByText('results for "iphone"')).toBeVisible();

    // Verify that product titles are displayed
    await expect(page.getByText('Apple iPhone 13 (128GB) - Blue')).toBeVisible();
  });
});