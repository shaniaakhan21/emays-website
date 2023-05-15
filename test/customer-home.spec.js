import { test, expect } from '@playwright/test';

test('Customer-Homepage', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    for (let i = 0; i < 13; i++) {
        await expect(page).toHaveScreenshot();
        await page.mouse.wheel(0, 500);
    }
});
