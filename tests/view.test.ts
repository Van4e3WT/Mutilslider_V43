import { Config } from 'Plugin/modules/utils/custom-types';
import IO from 'Plugin/modules/view/IO';
import Scale from 'Plugin/modules/view/Scale';
import Thumbs from 'Plugin/modules/view/Thumbs';
import View from 'Plugin/modules/view/View';

describe('***VIEW***', () => {
  const selector = 'multislider-v43';

  describe('IO', () => {
    let io: IO;

    beforeEach(() => {
      io = new IO({
        postfix: 'C',
        localeProps: {},
        tooltipOfValue: true,
        tooltipIsHidden: false,
      });

      const parent = document.createElement('div');

      io.createGroup({
        parent,
        selector,
        isVertical: true,
      });

      io.createGroup({
        parent,
        selector,
        isVertical: true,
      });
    });

    test('should return IO parents', () => {
      expect(io.getIOParents().length).toBe(2);
    });

    test('should return IO inputs', () => {
      expect(io.getIOInputs().length).toBe(2);
    });

    test('should set new value', () => {
      io.setIO(0, 30);

      expect(io.getIOInputs()[0].value).toBe('30');
    });

    test('should move IO', () => {
      const prop = 'bottom';

      io.moveIO({
        n: 0,
        prop,
        value: 0,
      });

      expect(io.getIOParents()[0].style[prop]).toBe('0px');
    });

    test('should prevent text highlighting', () => {
      const mockHandle = jest.fn();

      io.getIOInputs().forEach((item) => {
        item.addEventListener('mousedown', mockHandle);
        item.dispatchEvent(new MouseEvent('mousedown'));
      });

      expect(mockHandle).toBeCalledTimes(io.getIOInputs().length);
    });

    test('should init value group listeners', () => {
      const mockHandle = jest.fn();

      io.init();
      io.getIOInputs()[0].value = '40';

      io.getIOInputs().forEach((item) => {
        item.addEventListener('input', mockHandle);
        item.dispatchEvent(new Event('input'));
      });

      expect(mockHandle).toHaveBeenCalledTimes(io.getIOInputs().length);
    });

    test('should init "change" events on inputs', () => {
      const customIO = new IO({});
      const parent = document.createElement('div');

      const mockHandle = jest.fn();
      const mockSetValue = jest.fn();
      const mockGetValue = jest.fn();
      mockGetValue.mockReturnValue([20, 15, 10]);

      for (let i = 0; i < 3; ++i) {
        customIO.createGroup({
          parent,
          selector,
        });
      }

      customIO.initEvents({
        setValue: mockSetValue,
        getValue: mockGetValue,
      });

      customIO.getIOInputs()[0].value = '20,0';
      customIO.getIOInputs()[1].value = '20 0';

      customIO.getIOInputs().forEach((item) => {
        item.addEventListener('change', mockHandle);
        item.dispatchEvent(new Event('change'));
      });

      expect(mockHandle).toHaveBeenCalledTimes(customIO.getIOInputs().length);
    });
  });

  describe('Scale', () => {
    let scale: Scale;
    beforeEach(() => {
      scale = new Scale({
        selector,
      });

      scale.init({
        count: 5,
        isVertical: true,
      });
    });

    test('should init with different parameters', () => {
      const scaleDefault = new Scale({
        localeProps: {},
      });

      scaleDefault.init({
        count: 7,
        isVertical: false,
      });

      const scaleDivisions = scaleDefault.getScaleDivisions();

      scaleDivisions.forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      expect(scaleDivisions.length).toBe(7);
    });

    test('should return scale', () => {
      expect(scale.getScale()).toBeInstanceOf(HTMLDivElement);
    });

    test('should return scale divisions', () => {
      const scaleDivisions = scale.getScaleDivisions();

      scaleDivisions.forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      expect(scaleDivisions.length).toBe(5);
    });

    test('should update scale data', () => {
      const thumbsParent = document.createElement('div');
      const result = [-100, -50, 0, 50, 100];

      scale.update({
        thumbsParent,
        axis: {
          styleSelector: 'left',
          axis: 'x',
          eventAxis: 'clientX',
          sizeParent: 'width',
          start: 'left',
          end: 'right',
          dPos: -1,
        },
        thumbSize: 24,
        min: -100,
        max: 100,
        step: 10,
      });

      scale.getScaleDivisions().forEach((item, i) => {
        expect(Number(item.dataset.value)).toBe(result[i]);
      });
    });

    test('should init "click" events on scale', () => {
      const gradientArray = [[-50, 50], [20, 70], [-100, -100], [20, 80], [-50, 50]];
      const mockSetValue = jest.fn();
      const mockGetValue = jest.fn();
      const mockHandle = jest.fn();

      const thumbsParent = document.createElement('div');

      scale.update({
        thumbsParent,
        axis: {
          styleSelector: 'left',
          axis: 'x',
          eventAxis: 'clientX',
          sizeParent: 'width',
          start: 'left',
          end: 'right',
          dPos: -1,
        },
        thumbSize: 24,
        min: -100,
        max: 100,
        step: 10,
      });

      scale.getScale().addEventListener('click', mockHandle);
      scale.initEvents({
        setValue: mockSetValue,
        getValue: mockGetValue,
      });

      scale.getScale().dispatchEvent(new Event('click'));

      scale.getScaleDivisions().forEach((item, i) => {
        mockGetValue.mockReturnValue(gradientArray[i]);
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(mockHandle).toHaveBeenCalledTimes(scale.getScaleDivisions().length + 1);
    });
  });

  describe('Thumb', () => {
    let thumbs: Thumbs;
    beforeEach(() => {
      thumbs = new Thumbs({
        selector,
      });

      const parent = document.createElement('div');

      for (let i = 0; i < 2; ++i) {
        thumbs.add(parent, true);
      }
    });

    test('should return length', () => {
      expect(thumbs.getLength()).toBe(2);
    });

    test('should return thumb', () => {
      for (let i = 0; i < thumbs.getLength(); ++i) {
        expect(thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }
    });

    test('should return computed size', () => {
      thumbs.getThumb(0).style.width = '24px';

      expect(thumbs.getSize()).toBe(24);
    });

    test('should be able to set and get thumb style', () => {
      const startValue = 32;

      thumbs.moveThumb({
        n: 0,
        prop: 'bottom',
        value: startValue,
      });

      const finishValue = thumbs.getStyleN({
        n: 0,
        prop: 'bottom',
      });

      expect(finishValue).toBe(`${startValue}px`);
    });

    test('should init thumb events', () => {
      const thumbsParent = document.createElement('div');

      const mockSetValue = jest.fn();
      const mockGetMin = jest.fn();
      const mockGetMax = jest.fn();
      const mockGetValue = jest.fn().mockReturnValue([20, 20]);

      const decoyArray: Array<HTMLElement> = [];

      for (let i = 0; i < thumbs.getLength(); ++i) {
        const decoy = document.createElement('div');
        decoyArray.push(decoy);
      }

      thumbs.initEvents({
        thumbsParent,
        axis: {
          styleSelector: 'bottom',
          axis: 'y',
          eventAxis: 'clientY',
          sizeParent: 'height',
          start: 'top',
          end: 'bottom',
          dPos: 1,
        },
        getValue: mockGetValue,
        setValue: mockSetValue,
        getMin: mockGetMin,
        getMax: mockGetMax,
        additionalListeners: decoyArray,
      });

      for (let i = 0; i < thumbs.getLength(); ++i) {
        const thumbExample = thumbs.getThumb(i);

        thumbExample.dispatchEvent(new MouseEvent('pointerdown', {
          clientX: (i + 1) * 10,
          clientY: (i + 1) * 10,
        }));
        document.dispatchEvent(new MouseEvent('pointermove', {
          clientX: (i + 2) * 10,
          clientY: (i + 2) * 10,
        }));
        document.dispatchEvent(new Event('pointerup'));
      }

      // another testing config

      for (let i = 0; i < thumbs.getLength(); ++i) {
        const thumbExample = thumbs.getThumb(i);

        thumbExample.dispatchEvent(new MouseEvent('pointerdown', {
          clientX: (i + 3) * 10,
          clientY: (i + 3) * 10,
        }));
        document.dispatchEvent(new MouseEvent('pointermove', {
          clientX: (i + 2) * 10,
          clientY: (i + 2) * 10,
        }));
        document.dispatchEvent(new Event('pointerup'));
      }
    });
  });

  describe('View', () => {
    let parent: HTMLElement;

    let mockSetValue: jest.Mock;
    let mockGetMin: jest.Mock;
    let mockGetMax: jest.Mock;
    let mockGetValue: jest.Mock;

    beforeEach(() => {
      parent = document.createElement('div');

      mockSetValue = jest.fn();
      mockGetMin = jest.fn();
      mockGetMax = jest.fn();
      mockGetValue = jest.fn();
    });

    test('should init solo slider', () => {
      const cfg: Config = {
        minValue: -100,
        maxValue: 100,
        value1: 20,
        step: 10,
        isProgressBar: true,
        isRange: false,
        isVertical: false,
        scaleOfValues: 5,
        tooltipOfValue: true,
        tooltipIsHidden: false,
        description: 'Test slider',
        postfix: 'C',
        localeProps: {},
      };

      const view = new View({
        values: [20],
        selector,
        parent,
        cfg,
      });

      mockGetValue.mockReturnValue([20]);

      view.init({
        setValue: mockSetValue,
        getValue: mockGetValue,
        getMin: mockGetMin,
        getMax: mockGetMax,
      });

      expect(view.selector).toBe(selector);
      expect(view.thumbsParent).toBeInstanceOf(HTMLElement);

      for (let i = 0; i < view.thumbs.getLength(); ++i) {
        expect(view.thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }

      view.scale.getScaleDivisions().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      view.outputs.getIOInputs().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLInputElement);
      });
    });

    test('should init double slider', () => {
      const cfg: Config = {
        minValue: -100,
        maxValue: 100,
        value1: 20,
        value2: 70,
        step: 10,
        isProgressBar: true,
        isRange: true,
        isVertical: true,
        scaleOfValues: 5,
        tooltipOfValue: false,
        tooltipIsHidden: false,
        description: 'Test slider',
        postfix: 'C',
        localeProps: {},
      };

      const view = new View({
        values: [20, 70],
        selector,
        parent,
        cfg,
      });

      mockGetValue.mockReturnValue([20, 70]);

      view.init({
        setValue: mockSetValue,
        getValue: mockGetValue,
        getMin: mockGetMin,
        getMax: mockGetMax,
      });

      expect(view.selector).toBe(selector);
      expect(view.thumbsParent).toBeInstanceOf(HTMLElement);

      for (let i = 0; i < view.thumbs.getLength(); ++i) {
        expect(view.thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }

      view.scale.getScaleDivisions().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      view.outputs.getIOInputs().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLInputElement);
      });
    });

    test('should call update listeners', () => {
      const cfg: Config = {
        minValue: -100,
        maxValue: 100,
        step: 10,
        isRange: true,
      };

      const view = new View({
        values: [20, 70],
        selector,
        parent,
        cfg,
      });

      mockGetValue.mockReturnValue([20, 70]);

      view.init({
        setValue: mockSetValue,
        getValue: mockGetValue,
        getMin: mockGetMin,
        getMax: mockGetMax,
      });

      const mockUpdate = jest.fn();

      view.update = mockUpdate;

      window.dispatchEvent(new Event('resize'));
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(mockUpdate).toHaveBeenCalledTimes(2);
    });

    test('should listen clicks on view body', () => {
      mockGetMin.mockReturnValue(-100);
      mockGetMax.mockReturnValue(100);

      const cfg: Config = {
        minValue: -100,
        maxValue: 100,
        value1: 20,
        value2: 70,
        step: 10,
        isProgressBar: true,
        isRange: true,
        isVertical: false,
        scaleOfValues: 5,
        tooltipOfValue: true,
        tooltipIsHidden: true,
        description: 'Test slider',
        postfix: 'C',
      };

      const view = new View({
        values: [30, 60],
        selector,
        parent,
        cfg,
      });

      mockGetValue.mockReturnValue([30, 60]);

      view.init({
        setValue: mockSetValue,
        getValue: mockGetValue,
        getMin: mockGetMin,
        getMax: mockGetMax,
      });

      const mockBodyHandle = jest.fn();

      view.thumbsParent.addEventListener('pointerdown', mockBodyHandle);

      view.thumbsParent.dispatchEvent(new MouseEvent('pointerdown'));

      expect(mockBodyHandle).toHaveBeenCalled();
    });
  });
});
