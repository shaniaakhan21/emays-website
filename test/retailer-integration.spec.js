import { test, expect } from '@playwright/test';

test('Retailer-Integration', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('button', { name: 'RETAILERS' }).click();
    await page.getByRole('link', { name: 'INTEGRATION' }).click();
    for (let i = 0; i < 4; i++) {
        await expect(page).toHaveScreenshot();
        await page.mouse.wheel(0, 500);
    }
});
