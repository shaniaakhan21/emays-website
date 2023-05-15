import { test, expect } from '@playwright/test';

test('Customer-Sustainability', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'SUSTAINABILITY' }).click();
    for (let i = 0; i < 6; i++) {
        await expect(page).toHaveScreenshot();
        await page.mouse.wheel(0, 500);
    }
});
