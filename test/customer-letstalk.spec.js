import { test, expect } from '@playwright/test';

test('Customer-LetsTalk', async ({ page, context }) => {
    // Attach api call interceptor
    await context.route('**/api/letsTalk', route => route.fulfill({
        status: 201,
        headers: { 'content-type': 'application/json' },
        body: 'Created'
    }));

    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'Let\'s Talk' }).click();
    await expect(page).toHaveScreenshot();
    await page.mouse.wheel(0, 500);
    await page.getByTestId('name').fill('Test Name');
    await page.getByTestId('email').fill('testmail@grr.la');
    await page.getByTestId('phone').fill('1234567890');
    await page.getByTestId('message').fill('1234567890');

    // Click without checking the privacy policy
    await page.getByTestId('submit').click();
    await expect(page.locator('.message-container > div').first()).toHaveClass(/cds--inline-notification--error/);
    await page.locator('.message-container > div').first().waitFor({ state: 'detached' });

    // Click after checking the privacy policy
    await page.locator('label').filter({ hasText: 'I’ve read and, agree the privacy policy' }).click();
    await expect(page).toHaveScreenshot();
    await page.getByTestId('submit').click();

    await page.waitForResponse(resp => resp.status() === 201);
    await expect(page.locator('.message-container > div').first()).toHaveClass(/cds--inline-notification--success/);
});
