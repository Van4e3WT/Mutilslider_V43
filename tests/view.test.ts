import IO from 'Plugin/modules/view/IO';
import Scale from 'Plugin/modules/view/Scale';
import Thumbs from 'Plugin/modules/view/Thumbs';
import View from 'Plugin/modules/view/View';
import { SubViewEvents, ViewEvents } from 'Plugin/modules/utils/EventEmitter';
import { Config } from 'Plugin/custom-types';

const IO_COUNT = 2;
const THUMB_COUNT = 2;

describe('***VIEW***', () => {
  const selector = 'multislider-v43';

  let io: IO;

  describe('IO', () => {
    describe('non-interactive', () => {
      beforeEach(() => {
        io = new IO({
          postfix: 'C',
          localeProps: {},
          tooltipOfValue: true,
        });

        const parent = document.createElement('div');

        for (let i = 0; i < IO_COUNT; i += 1) {
          io.createGroup({
            parent,
            selector,
            isVertical: true,
          });
        }
      });

      test('must return IO parents', () => {
        expect(io.getIOParents().length).toBe(2);
      });

      test('must return IO inputs', () => {
        expect(io.getIOInputs().length).toBe(2);
      });

      test('must set new value', () => {
        io.setIO(0, 30);

        expect(io.getIOInputs()[0].value).toBe('30');
      });

      test('must move IO', () => {
        const prop = 'bottom';

        io.moveIO({
          n: 0,
          prop,
          value: 0,
        });

        expect(io.getIOParents()[0].style[prop]).toBe('0px');
      });

      test('must prevent text highlighting', () => {
        const mockHandle = jest.fn();

        io.getIOInputs().forEach((item) => {
          item.addEventListener('mousedown', mockHandle);
          item.dispatchEvent(new MouseEvent('mousedown'));
        });

        expect(mockHandle).toBeCalledTimes(io.getIOInputs().length);
      });

      test('must init value group listeners', () => {
        const mockHandle = jest.fn();

        io.init();
        io.getIOInputs()[0].value = '40';

        io.getIOInputs().forEach((item) => {
          item.addEventListener('input', mockHandle);
          item.dispatchEvent(new Event('input'));
        });

        expect(mockHandle).toHaveBeenCalledTimes(io.getIOInputs().length);
      });
    });

    describe('interactive', () => {
      beforeEach(() => {
        io = new IO({});

        const parent = document.createElement('div');

        for (let i = 0; i < IO_COUNT; i++) {
          io.createGroup({
            parent,
            selector,
          });
        }

        io.initEvents();
      });

      test('must emit a calculate event and invoke handler', () => {
        const mockCalculateHandler = jest.fn(({ handler }) => {
          handler([10, 20]);
        });

        io.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);

        io.getIOInputs()[0].value = ' 10.0';
        io.getIOInputs()[1].value = 'dfg';

        io.getIOInputs().forEach((output) => {
          output.dispatchEvent(new Event('change'));
        });

        expect(mockCalculateHandler).toHaveBeenCalledTimes(io.getIOInputs().length);
      });

      test('must emit a change event and invoke handler', () => {
        const mockChangeHandler = jest.fn();
        const mockCalculateHandler = jest.fn(({ handler }) => {
          handler([15, 20]);
        });

        io.on(SubViewEvents.CHANGE_VALUE, mockChangeHandler);
        io.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);

        io.getIOInputs()[0].value = '10';
        io.getIOInputs()[1].value = '15,0';

        io.getIOInputs().forEach((output) => {
          output.dispatchEvent(new Event('change'));
        });

        expect(mockChangeHandler).toHaveBeenCalledTimes(io.getIOInputs().length);
      });
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

      scale.update({
        thumbsParent: document.createElement('div'),
        thumbSize: 25,
        axis: {
          styleSelector: 'bottom',
          axis: 'y',
          eventAxis: 'clientY',
          sizeParent: 'height',
          start: 'top',
          end: 'bottom',
          dPos: 1,
        },
        min: 0,
        max: 100,
        step: 5,
      });

      scale.initEvents();
    });

    test('must init with different parameters', () => {
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

    test('must return scale', () => {
      expect(scale.getScale()).toBeInstanceOf(HTMLDivElement);
    });

    test('must return scale divisions', () => {
      const scaleDivisions = scale.getScaleDivisions();

      scaleDivisions.forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      expect(scaleDivisions.length).toBe(5);
    });

    test('must update scale data', () => {
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

    test('must init "click" events on scale', () => {
      const gradientArray = [[-50, 50], [20, 70], [-100, -100], [20, 80], [-50, 50]];
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
      scale.initEvents();

      scale.getScale().dispatchEvent(new Event('click'));

      scale.getScaleDivisions().forEach((item, i) => {
        mockGetValue.mockReturnValue(gradientArray[i]);
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(mockHandle).toHaveBeenCalledTimes(scale.getScaleDivisions().length + 1);
    });

    test('must emit a calculate event and invoke the handler', () => {
      const mockCalculateHandler = jest.fn();

      scale.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);

      scale.getScaleDivisions().forEach((scaleDivision) => {
        scaleDivision.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(mockCalculateHandler).toHaveBeenCalledTimes(scale.getScaleDivisions().length);
    });

    test('must emit a change event and invoke the handler', () => {
      const mockChangeHandler = jest.fn();
      const mockCalculateHandler = jest.fn(({ handler }) => {
        handler([15, 100]);
      });

      scale.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);
      scale.on(SubViewEvents.CHANGE_VALUE, mockChangeHandler);

      scale.getScaleDivisions().forEach((scaleDivision) => {
        scaleDivision.dispatchEvent(new Event('click', { bubbles: true }));
      });

      scale.getScale().dispatchEvent(new Event('click', { bubbles: true }));

      expect(mockChangeHandler).toHaveBeenCalledTimes(scale.getScaleDivisions().length);
    });
  });

  describe('Thumb', () => {
    let thumbs: Thumbs;
    beforeEach(() => {
      thumbs = new Thumbs({
        selector,
      });

      const parent = document.createElement('div');

      for (let i = 0; i < THUMB_COUNT; i++) {
        thumbs.add(parent, true);
      }
    });

    test('must return length', () => {
      expect(thumbs.getLength()).toBe(2);
    });

    test('must return thumb', () => {
      for (let i = 0; i < thumbs.getLength(); i++) {
        expect(thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }
    });

    test('must return computed size', () => {
      thumbs.getThumb(0).style.width = '24px';

      expect(thumbs.getSize()).toBe(24);
    });

    test('must be able to set and get thumb style', () => {
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

    describe('initialized events', () => {
      let thumbsParent: HTMLDivElement;

      beforeEach(() => {
        thumbsParent = document.createElement('div');

        const decoyArray: Array<HTMLElement> = [];

        for (let i = 0; i < thumbs.getLength(); i++) {
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
          min: -100,
          max: 100,
          additionalListeners: decoyArray,
        });
      });

      test('must emit a calculate event and invoke the handler', () => {
        const mockCalculateHandler = jest.fn();

        thumbs.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);

        for (let i = 0; i < thumbs.getLength(); i++) {
          thumbs.getThumb(i).dispatchEvent(new MouseEvent('pointerdown', {
            clientX: (i + 3) * 10,
            clientY: (i + 3) * 10,
          }));

          document.dispatchEvent(new MouseEvent('pointermove', {
            clientX: (i + 2) * 10,
            clientY: (i + 2) * 10,
          }));

          document.dispatchEvent(new Event('pointerup'));
        }

        expect(mockCalculateHandler).toHaveBeenCalledTimes(thumbs.getLength());
      });

      test('must emit a change event and invoke the handler', () => {
        const mockChangeHandler = jest.fn();
        const mockCalculateHandler = jest.fn(({ handler }) => {
          handler([50, 50]);
        });

        thumbs.on(SubViewEvents.CALCULATE_VALUE, mockCalculateHandler);
        thumbs.on(SubViewEvents.CHANGE_VALUE, mockChangeHandler);

        for (let i = 0; i < thumbs.getLength(); i++) {
          thumbs.getThumb(i).dispatchEvent(new MouseEvent('pointerdown', {
            clientX: (i + 3) * 10 * (-1) ** i,
            clientY: (i + 3) * 10 * (-1) ** i,
          }));

          document.dispatchEvent(new MouseEvent('pointermove', {
            clientX: (i + 2) * 10,
            clientY: (i + 2) * 10,
          }));

          document.dispatchEvent(new Event('pointerup'));
        }

        expect(mockChangeHandler).toHaveBeenCalledTimes(thumbs.getLength());
      });
    });
  });

  describe('View', () => {
    let parent: HTMLElement;

    let mockGetMin: jest.Mock;
    let mockGetMax: jest.Mock;
    let mockGetValue: jest.Mock;

    beforeEach(() => {
      parent = document.createElement('div');

      mockGetMin = jest.fn();
      mockGetMax = jest.fn();
      mockGetValue = jest.fn();
    });

    test('must init solo slider', () => {
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

      view.init();

      expect(view.selector).toBe(selector);
      expect(view.thumbsParent).toBeInstanceOf(HTMLElement);

      for (let i = 0; i < view.thumbs.getLength(); i++) {
        expect(view.thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }

      view.scale.getScaleDivisions().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      view.outputs.getIOInputs().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLInputElement);
      });
    });

    test('must init double slider', () => {
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

      view.init();

      expect(view.selector).toBe(selector);
      expect(view.thumbsParent).toBeInstanceOf(HTMLElement);

      for (let i = 0; i < view.thumbs.getLength(); i++) {
        expect(view.thumbs.getThumb(i)).toBeInstanceOf(HTMLElement);
      }

      view.scale.getScaleDivisions().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLElement);
      });

      view.outputs.getIOInputs().forEach((item) => {
        expect(item).toBeInstanceOf(HTMLInputElement);
      });
    });

    test('must emit a change event and invoke handler', () => {
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

      view.init();

      const mockChangeHandler = jest.fn();

      view.on(ViewEvents.CHANGE_VALUE, mockChangeHandler);

      window.dispatchEvent(new Event('resize'));
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(mockChangeHandler).toHaveBeenCalledTimes(2);
    });

    test('must listen clicks on view body', () => {
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

      view.init();

      const mockChangeHandler = jest.fn(({ handler }) => {
        handler([20, 70]);
      });

      view.on(ViewEvents.CALCULATE_VALUE, mockChangeHandler);

      view.thumbsParent.dispatchEvent(new MouseEvent('pointerdown'));

      expect(mockChangeHandler).toHaveBeenCalled();
    });

    test('must emit a calculate event and invoke handler', () => {
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
        tooltipOfValue: false,
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

      view.init();

      const mockCalculateHandler = jest.fn();

      view.on(ViewEvents.CALCULATE_VALUE, mockCalculateHandler);

      view.outputs.getIOInputs().forEach((output) => {
        output.dispatchEvent(new Event('change'));
      });

      view.scale.getScaleDivisions().forEach((scaleDivision) => {
        scaleDivision.dispatchEvent(new Event('click', { bubbles: true }));
      });

      for (let i = 0; i < view.thumbs.getLength(); i++) {
        view.thumbs.getThumb(i).dispatchEvent(new MouseEvent('pointerdown', {
          clientX: (i + 3) * 10,
          clientY: (i + 3) * 10,
        }));

        document.dispatchEvent(new MouseEvent('pointermove', {
          clientX: (i + 2) * 10,
          clientY: (i + 2) * 10,
        }));

        document.dispatchEvent(new Event('pointerup'));
      }

      expect(mockCalculateHandler).toHaveBeenCalledTimes(
        view.outputs.getIOInputs().length
        + view.scale.getScaleDivisions().length
        + view.thumbs.getLength(),
      );
    });
  });
});
