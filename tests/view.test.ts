const puppeteer = require('puppeteer');

describe('***VIEW***', () => {
  const URL = 'http://127.0.0.1:5500/example.html';
  describe('Solo Slider', () => {
    // jest.setTimeout(30000);
    let browser: any;
    let page: any;

    beforeEach(async () => {
      browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [
          '-start-maximized',
        ],
        devTools: true,
        slowMo: 20,
      });

      page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      await page.goto(URL, {
        waitUntil: ['networkidle0', 'domcontentloaded'],
      });
    });

    afterEach(async () => {
      await browser.close();
    });

    test('should build foundation DOM struct', async () => {
      const selector: string = '.multislider-v43';

      // await page.waitForSelector(selector);

      const sliderParent = await page.$(`${selector}.solo`);

      expect(sliderParent).not.toBeUndefined();
      expect(sliderParent).not.toBeNull();

      const sliderHeader = await sliderParent.$(`${selector}-header`);

      expect(sliderHeader).not.toBeUndefined();
      expect(sliderHeader).not.toBeNull();

      const sliderBody = await sliderParent.$(`${selector}-body`);

      expect(sliderBody).not.toBeUndefined();
      expect(sliderBody).not.toBeNull();
    });
  });
});
