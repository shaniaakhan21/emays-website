import { test, expect } from '@playwright/test';

test('Retailer-Homepage', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('button', { name: 'RETAILERS' }).click();
    for (let i = 0; i < 8; i++) {
        await expect(page).toHaveScreenshot();
        await page.mouse.wheel(0, 500);
    }
});
