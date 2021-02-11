const puppeteer = require('puppeteer');

describe('***VIEW***', () => {
  const URL = 'http://127.0.0.1:5500/example.html';
  describe('Solo Slider', () => {
    // jest.setTimeout(30000);
    let browser: any;
    let page: any;

    const selector: string = '.multislider-v43';

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

    test('should build foundation DOM struct', async () => { // переделать этот тест под проверку всех соло слайдеров, как в тесте ниже
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

    test('should be contain just one thumb slider', async () => { // проверить, как это будет работать на двухдиапазонном слайдере, если что, то вернуться и переделать
      const sliders = await page.evaluate((sel: Element) => {
        const arr: Array<Array<Element>> = [];
        const elems = Array.from(document.querySelectorAll(`${sel}.solo`));

        elems.forEach((elem) => {
          const sliderThumb = Array.from(elem.querySelectorAll(`${sel}-body__thumb`));
          arr.push(sliderThumb);
        });
        return arr;
      }, selector);

      sliders.forEach((slider: Array<Element>) => {
        expect(slider.length).toBe(1);
      });
    });

    test('should be rendered scale if it\'s enabled', async () => { // здесь конкретный экземпляр для проверки теста, всё ок
      const sliderParent = await page.$(`${selector}.solo.slider-4`);
      const scaleDivisions = await sliderParent.$$(`${selector}-body__scale-division`);

      expect(scaleDivisions.length).toBeGreaterThan(0);
    });
  });
});
