const puppeteer = require('puppeteer');

describe('***VIEW***', () => {
  const URL = 'http://127.0.0.1:5500/dist/index.html';
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
      // slowMo: 20,
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
    const sliders = await page.evaluate((sel: string) => {
      const arr: Array<object> = [];
      const elems = document.querySelectorAll(`${sel}.solo`);

      for (let i = 0; i < elems.length; i += 1) {
        const elemHeader = elems[i].querySelector(`${sel}__header`);
        const elemBody = elems[i].querySelector(`${sel}__body`);
        arr.push({ elemHeader, elemBody });
      }

      return arr;
    }, selector);

    sliders.forEach((slider: { elemHeader: Element, elemBody: Element }) => {
      expect(slider.elemHeader).not.toBeUndefined();
      expect(slider.elemHeader).not.toBeNull();

      expect(slider.elemBody).not.toBeUndefined();
      expect(slider.elemBody).not.toBeNull();
    });
  });

  describe('Solo Slider', () => {
    test('should be add vertical class to slider if he is selected', async () => {
      const isContain = await page.evaluate((sel: string) => {
        const elem = document.querySelector(`${sel}.solo.slider-3`);

        return elem.classList.contains('multislider-v43_vertical');
      }, selector);

      expect(isContain).toBeTruthy();
    });

    test('should be contain just one thumb slider', async () => {
      const sliders = await page.evaluate((sel: Element) => {
        const arr: Array<Array<Element>> = [];
        const elems = Array.from(document.querySelectorAll(`${sel}.solo`));

        elems.forEach((elem) => {
          const sliderThumb = Array.from(elem.querySelectorAll(`${sel}__thumb`));
          arr.push(sliderThumb);
        });
        return arr;
      }, selector);

      sliders.forEach((slider: Array<Element>) => {
        expect(slider.length).toBe(1);
      });
    });

    test('should be render tooltip if activated "pop-up"', async () => {
      await page.hover(`${selector}.solo.slider-4 ${selector}__thumb`);

      const isHoverWork = await page.evaluate((sel: string) => {
        const elem = document.querySelector(`${sel}.solo.slider-4`);
        const tooltip = elem.querySelector(`${sel}__popup`);

        return getComputedStyle(tooltip).display === 'block';
      }, selector);

      expect(isHoverWork).toBeTruthy();
    });

    test('should be render scale if it\'s enabled', async () => {
      const sliderParent = await page.$(`${selector}.solo.slider-3`);
      const scaleDivisions = await sliderParent.$$(`${selector}__scale-division`);

      expect(scaleDivisions.length).toBeGreaterThan(0);
    });

    test('should be render range element into DOM', async () => {
      const slidersRange = await page.evaluate((sel: string) => {
        const elem1 = document.querySelector(`${sel}.solo.slider-3`);
        const elem2 = document.querySelector(`${sel}.solo.slider-4`);
        const enabled = elem1.querySelector(`${sel}__range`);
        const disabled = elem2.querySelector(`${sel}__range`);

        return { enabled, disabled };
      }, selector);

      expect(slidersRange.enabled).toBeTruthy();
      expect(slidersRange.disabled).toBeFalsy();
    });
  });

  describe('Double Slider', () => {
    test('should be add vertical class to slider if he is selected', async () => {
      const isContain = await page.evaluate((sel: string) => {
        const elem = document.querySelector(`${sel}.double.slider-1`);

        return elem.classList.contains('multislider-v43_vertical');
      }, selector);

      expect(isContain).toBeTruthy();
    });

    test('should be contain just two thumbs slider\'s', async () => {
      const sliders = await page.evaluate((sel: Element) => {
        const arr: Array<Array<Element>> = [];
        const elems = Array.from(document.querySelectorAll(`${sel}.double`));

        elems.forEach((elem) => {
          const sliderThumb = Array.from(elem.querySelectorAll(`${sel}__thumb`));
          arr.push(sliderThumb);
        });
        return arr;
      }, selector);

      sliders.forEach((slider: Array<Element>) => {
        expect(slider.length).toBe(2);
      });
    });

    test('should be render tooltip if activated "pop-up"', async () => {
      await page.hover(`${selector}.double.slider-1 ${selector}__thumb`);

      const isHoverWork = await page.evaluate((sel: string) => {
        const elem = document.querySelector(`${sel}.double.slider-1`);
        const tooltip = elem.querySelector(`${sel}__popup`);

        return getComputedStyle(tooltip).display === 'block';
      }, selector);

      expect(isHoverWork).toBeTruthy();
    });

    test('should be render scale if it\'s enabled', async () => {
      const sliderParent = await page.$(`${selector}.double.slider-1`);
      const scaleDivisions = await sliderParent.$$(`${selector}__scale-division`);

      expect(scaleDivisions.length).toBeGreaterThan(0);
    });

    test('should be render range element into DOM', async () => {
      const slidersRange = await page.evaluate((sel: string) => {
        const elem1 = document.querySelector(`${sel}.double.slider-1`);
        const elem2 = document.querySelector(`${sel}.double.slider-2`);
        const enabled = elem1.querySelector(`${sel}__range`);
        const disabled = elem2.querySelector(`${sel}__range`);

        return { enabled, disabled };
      }, selector);

      expect(slidersRange.enabled).toBeTruthy();
      expect(slidersRange.disabled).toBeFalsy();
    });
  });
});
