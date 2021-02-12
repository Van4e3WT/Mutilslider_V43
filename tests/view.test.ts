const puppeteer = require('puppeteer');

describe('***VIEW***', () => {
  const URL = 'http://127.0.0.1:5500/example.html';
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

  test('should build foundation DOM struct', async () => {
    const sliders = await page.evaluate((sel: string) => {
      const arr: Array<object> = [];
      const elems = document.querySelectorAll(`${sel}.solo`);

      for (let i = 0; i < elems.length; i += 1) {
        const elemHeader = elems[i].querySelector(`${sel}-header`);
        const elemBody = elems[i].querySelector(`${sel}-body`);
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
        const elem = document.querySelector(`${sel}.solo.slider-4`);

        return elem.classList.contains('vertical');
      }, selector);

      expect(isContain).toBeTruthy();
    });

    test('should be contain just one thumb slider', async () => {
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

    test('should be render tooltip if activated "pop-up"', async () => {
      await page.hover(`${selector}.solo.slider-3 ${selector}-body__thumb`);

      const isHoverWork = await page.evaluate((sel: string) => {
        const elem = document.querySelector(`${sel}.solo.slider-3`);
        const tooltip = elem.querySelector(`${sel}-body__popup`);

        return getComputedStyle(tooltip).display === 'block';
      }, selector);

      expect(isHoverWork).toBeTruthy();
    });

    test('should be render scale if it\'s enabled', async () => {
      const sliderParent = await page.$(`${selector}.solo.slider-4`);
      const scaleDivisions = await sliderParent.$$(`${selector}-body__scale-division`);

      expect(scaleDivisions.length).toBeGreaterThan(0);
    });

    test('should be render range element into DOM', async () => {
      const slidersRange = await page.evaluate((sel: string) => {
        const elem1 = document.querySelector(`${sel}.solo.slider-4`);
        const elem2 = document.querySelector(`${sel}.solo.slider-3`);
        const enabled = elem1.querySelector(`${sel}-body__range`);
        const disabled = elem2.querySelector(`${sel}-body__range`);

        return { enabled, disabled };
      }, selector);

      expect(slidersRange.enabled).toBeTruthy();
      expect(slidersRange.disabled).toBeFalsy();
    });
  });

  // describe('Double Slider', () => {
  // orientation
  // slider type by thumbs
  // popUpValue
  // scaleOfValues
  // isProgressBar
  // });
});
