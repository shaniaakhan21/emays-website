const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    window.scrollTo({ top: 0 });
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};

describe('Desktop', () => {

    beforeAll(async () => {
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1
        });
    });

    beforeEach(() => {
        jest.setTimeout(60000);
    });

    it('Home', async () => {
        await page.goto('http://localhost:8080/#/', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await new Promise(r => setTimeout(r, 500));

        await autoScroll(page);

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);

    it('Integration', async () => {
        await page.goto('http://localhost:8080/#/integration', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await page.waitForTimeout(1000);

        await autoScroll(page);

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);

    it('Environment', async () => {
        await page.goto('http://localhost:8080/#/environment', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await page.waitForTimeout(1000);

        await autoScroll(page);

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);

    it('Partnership', async () => {
        await page.goto('http://localhost:8080/#/partnership', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await new Promise(r => setTimeout(r, 500));

        await autoScroll(page);

        await new Promise(r => setTimeout(r, 500));

        let screenshot = await page.screenshot({
            fullPage: true,
            failureThreshold: 0.1,
            failureThresholdType: 'percent'
        });

        expect(screenshot).toMatchImageSnapshot();
    });

    it('LetsTalk', async () => {
        await page.goto('http://localhost:8080/#/letsTalk', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await new Promise(r => setTimeout(r, 500));

        await autoScroll(page);

        await new Promise(r => setTimeout(r, 500));

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);

    it('Services', async () => {
        await page.goto('http://localhost:8080/#/services', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await new Promise(r => setTimeout(r, 500));

        await autoScroll(page);

        await new Promise(r => setTimeout(r, 500));

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);

    it('Shop With Us', async () => {
        await page.goto('http://localhost:8080/#/shop-with-us', {
            waitUntil: 'networkidle0',
            timeout: 60000,
            networkIdleTimeout: 1000 * 3
        });

        await new Promise(r => setTimeout(r, 500));

        await autoScroll(page);

        await new Promise(r => setTimeout(r, 500));

        let screenshot = await page.screenshot({
            fullPage: true
        });

        expect(screenshot).toMatchImageSnapshot();
    }, 60000);
});
