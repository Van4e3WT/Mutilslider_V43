import IModel from 'Plugin/modules/models/interfaces/IModel';
import SoloModel from 'Plugin/modules/models/SoloModel';
import DoubleModel from 'Plugin/modules/models/DoubleModel';
import { ModelEvents } from 'Plugin/modules/utils/EventEmitter';
import { ModelConfig } from 'Plugin/custom-types';

describe('***MODEL***', () => {
  const modelConfig: ModelConfig = {
    min: -100,
    max: 100,
    step: 10,
    value1: 20,
    value2: 70,
  };

  describe('Solo Slider ', () => {
    let soloSliderModel: IModel;

    beforeEach(() => {
      soloSliderModel = new SoloModel(modelConfig);
    });

    test('must be init by constructor', () => {
      expect(soloSliderModel.getValue()).toEqual([20]);
      expect(soloSliderModel.getMin()).toBe(-100);
      expect(soloSliderModel.getMax()).toBe(100);
    });

    test('getMin() must return the min value', () => {
      expect(soloSliderModel.getMin()).toBe(modelConfig.min);
    });

    test('getMax() must return the max value', () => {
      expect(soloSliderModel.getMax()).toBe(modelConfig.max);
    });

    test('getValue() must return the array', () => {
      expect(soloSliderModel.getValue()).toBeDefined();
      expect(soloSliderModel.getValue()).toBeInstanceOf(Array);
    });

    describe('setValue()', () => {
      test('must set new value1', () => {
        const preValue = soloSliderModel.getValue()[0];
        const newValue = 30;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0]).not.toEqual(preValue);
        expect(soloSliderModel.getValue()[0]).toBe(newValue);
      });

      test('must limit value not greater than max', () => {
        const newValue = soloSliderModel.getMax() + 1000;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0]).toBeLessThanOrEqual(soloSliderModel.getMax());
      });

      test('must limit value not less than min', () => {
        const newValue = soloSliderModel.getMin() - 1000;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0]).toBeGreaterThanOrEqual(soloSliderModel.getMin());
      });

      test('must by default convert value to step', () => {
        const newValue = 33;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0]).toBe(30);
      });

      test('must handle empty object', () => {
        const preValue = soloSliderModel.getValue()[0];

        soloSliderModel.setValue({});

        expect(soloSliderModel.getValue()[0]).toBe(preValue);
      });

      test('must call the event', () => {
        const mockEvent = jest.fn();

        soloSliderModel.on(ModelEvents.CHANGE_VALUE, mockEvent);
        soloSliderModel.setValue({});

        expect(mockEvent).toHaveBeenCalledTimes(1);
      });
    });

    test('must set default value1 to min', () => {
      const defaultSoloModel = new SoloModel({
        min: -100,
        max: 100,
        step: 10,
      });

      expect(defaultSoloModel.getValue()[0]).toBe(defaultSoloModel.getMin());
    });
  });

  describe('Double slider', () => {
    let doubleSliderModel: IModel;

    beforeEach(() => {
      doubleSliderModel = new DoubleModel(modelConfig);
    });

    test('must be init by constructor', () => {
      expect(doubleSliderModel.getValue()).toEqual([20, 70]);
      expect(doubleSliderModel.getMin()).toBe(-100);
      expect(doubleSliderModel.getMax()).toBe(100);
    });

    test('getMin() must return the min value', () => {
      expect(doubleSliderModel.getMin()).toBe(modelConfig.min);
    });

    test('getMax() must return the max value', () => {
      expect(doubleSliderModel.getMax()).toBe(modelConfig.max);
    });

    test('getValue() must return the array', () => {
      expect(doubleSliderModel.getValue()).toBeDefined();
      expect(doubleSliderModel.getValue()).toBeInstanceOf(Array);
    });

    describe('setValue()', () => {
      test('must set new value1', () => {
        const newValue1 = 40;

        doubleSliderModel.setValue({ val1: newValue1 });

        expect(doubleSliderModel.getValue()[0]).toBe(newValue1);
      });

      test('must set new value2', () => {
        const newValue2 = 60;

        doubleSliderModel.setValue({ val2: newValue2 });

        expect(doubleSliderModel.getValue()[1]).toBe(newValue2);
      });

      test('must set both values', () => {
        const newValue1 = 40;
        const newValue2 = 60;

        doubleSliderModel.setValue({
          val1: newValue1,
          val2: newValue2,
        });

        expect(doubleSliderModel.getValue()[0]).toBe(newValue1);
        expect(doubleSliderModel.getValue()[1]).toBe(newValue2);
      });

      test('must swap values if value1 greater than value2 (input: value1, value2)', () => {
        const newValue1 = 60;
        const newValue2 = 40;

        doubleSliderModel.setValue({
          val1: newValue1,
          val2: newValue2,
        });

        expect(doubleSliderModel.getValue()[0]).toBe(newValue2);
        expect(doubleSliderModel.getValue()[1]).toBe(newValue1);
      });

      test('must limit value1 no greater than value2 (input: value1)', () => {
        const newValue1 = 80;

        doubleSliderModel.setValue({
          val1: newValue1,
        });

        expect(doubleSliderModel.getValue()[0]).toBe(modelConfig.value2);
        expect(doubleSliderModel.getValue()[1]).toBe(modelConfig.value2);
      });

      test('must limit value2 no less than value1 (input: value2)', () => {
        const newValue2 = 10;

        doubleSliderModel.setValue({
          val2: newValue2,
        });

        expect(doubleSliderModel.getValue()[0]).toBe(modelConfig.value1);
        expect(doubleSliderModel.getValue()[1]).toBe(modelConfig.value1);
      });

      test('must limit value1 no less then min', () => {
        const newValue1 = doubleSliderModel.getMin() - 1000;

        doubleSliderModel.setValue({ val1: newValue1 });

        expect(doubleSliderModel.getValue()[0]).toBeGreaterThanOrEqual(doubleSliderModel.getMin());
      });

      test('must limit value2 no greater then max', () => {
        const newValue2 = doubleSliderModel.getMax() + 1000;

        doubleSliderModel.setValue({ val2: newValue2 });

        expect(doubleSliderModel.getValue()[1]).toBeLessThanOrEqual(doubleSliderModel.getMax());
      });

      test('must limit both values no greater then max', () => {
        const defaultDoubleModel = new DoubleModel({
          min: -100,
          max: 100,
          step: 10,
          value1: 150,
          value2: 200,
        });

        expect(defaultDoubleModel.getValue()[0]).toBe(defaultDoubleModel.getMax());
        expect(defaultDoubleModel.getValue()[1]).toBe(defaultDoubleModel.getMax());
      });

      test('must limit both values no less then min', () => {
        const defaultDoubleModel = new DoubleModel({
          min: -100,
          max: 100,
          step: 10,
          value1: -150,
          value2: -200,
        });

        expect(defaultDoubleModel.getValue()[0]).toBe(defaultDoubleModel.getMin());
        expect(defaultDoubleModel.getValue()[1]).toBe(defaultDoubleModel.getMin());
      });

      test('must by default convert value to step', () => {
        const newValue1 = -26;
        const newValue2 = 62;

        doubleSliderModel.setValue({ val1: newValue1, val2: newValue2 });

        expect(doubleSliderModel.getValue()[0]).toBe(-30);
        expect(doubleSliderModel.getValue()[1]).toBe(60);
      });

      test('must handle empty object', () => {
        const preValues = doubleSliderModel.getValue();

        doubleSliderModel.setValue({});

        expect(doubleSliderModel.getValue()[0]).toBe(preValues[0]);
        expect(doubleSliderModel.getValue()[1]).toBe(preValues[1]);
      });

      test('must call the event', () => {
        const mockEvent = jest.fn();

        doubleSliderModel.on(ModelEvents.CHANGE_VALUE, mockEvent);
        doubleSliderModel.setValue({});

        expect(mockEvent).toHaveBeenCalledTimes(1);
      });
    });

    test('must set default value1 to min and value2 to max', () => {
      const defaultDoubleModel = new DoubleModel({
        min: -100,
        max: 100,
        step: 10,
      });

      expect(defaultDoubleModel.getValue()[1]).toBe(defaultDoubleModel.getMax());
      expect(defaultDoubleModel.getValue()[0]).toBe(defaultDoubleModel.getMin());
    });
  });
});
