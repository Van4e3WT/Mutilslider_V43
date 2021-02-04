import { ModelConfig } from '../src/init/modules/customTypes';
import { ISliderModel } from '../src/init/modules/interfaces';
import { DoubleSliderModel, SoloSliderModel, swap } from '../src/init/modules/model';

describe('***MODEL***', () => {
  const modelConfig: ModelConfig = {
    min: -100,
    max: 100,
    step: 10,
    value1: 15,
    value2: 70,
  };

  describe('Swap()', () => {
    test('should be swapped params', () => {
      expect(swap(1, 3)[0]).toBe(3);
      expect(swap(1, 3)[1]).toBe(1);
    });
  });

  describe('Solo Slider ', () => {
    let soloSliderModel: ISliderModel;

    beforeEach(() => {
      soloSliderModel = new SoloSliderModel(modelConfig);
    });

    test('should be init by constructor', () => {
      expect(soloSliderModel.getValue().length).not.toBeUndefined();
      expect(soloSliderModel.getValue().length).not.toBeNull();
      expect(soloSliderModel.getValue().length).toBe(1);
    });

    test('getMin() should return the min value', () => {
      expect(soloSliderModel.getMin()).toBe(modelConfig.min);
    });

    test('getMax() should return the max value', () => {
      expect(soloSliderModel.getMax()).toBe(modelConfig.max);
    });

    test('getValue() should return the array', () => {
      expect(soloSliderModel.getValue()).not.toBeUndefined();
      expect(soloSliderModel.getValue()).toBeInstanceOf(Array);
    });

    describe('setValue()', () => {
      test('should set new value1', () => {
        const preValue = soloSliderModel.getValue()[0].value;
        const newValue = 20;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0].value).not.toEqual(preValue);
        expect(soloSliderModel.getValue()[0].value).toBe(newValue);
      });

      test('should handle empty object', () => {
        const preValue = soloSliderModel.getValue()[0].value;

        soloSliderModel.setValue({});

        expect(soloSliderModel.getValue()[0].value).toBe(preValue);
      });

      test('should by default convert value to step', () => {
        const newValue = 33;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0].value).toBe(30);
      });

      test('should set not converted to step value', () => {
        const newValue = 33;

        soloSliderModel.setValue({ val1: newValue }, false);

        expect(soloSliderModel.getValue()[0].value).toBe(newValue);
      });

      test('should set value not greater then max', () => {
        const newValue = soloSliderModel.getMax() + 1000;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0].value)
          .toBeLessThanOrEqual(soloSliderModel.getMax());
      });

      test('should set value not less that min', () => {
        const newValue = soloSliderModel.getMin() - 1000;

        soloSliderModel.setValue({ val1: newValue });

        expect(soloSliderModel.getValue()[0].value)
          .toBeGreaterThanOrEqual(soloSliderModel.getMin());
      });
    });
  });

  describe('Double slider', () => {
    let doubleSliderModel: ISliderModel;

    beforeEach(() => {
      doubleSliderModel = new DoubleSliderModel(modelConfig);
    });

    test('should be init by constructor', () => {
      expect(doubleSliderModel.getValue().length).not.toBeUndefined();
      expect(doubleSliderModel.getValue().length).not.toBeNull();
      expect(doubleSliderModel.getValue().length).toBe(2);
    });

    test('getMin() should return the min value', () => {
      expect(doubleSliderModel.getMin()).toBe(modelConfig.min);
    });

    test('getMax() should return the max value', () => {
      expect(doubleSliderModel.getMax()).toBe(modelConfig.max);
    });

    test('getValue() should return the array', () => {
      expect(doubleSliderModel.getValue()).not.toBeUndefined();
      expect(doubleSliderModel.getValue()).toBeInstanceOf(Array);
    });

    describe('setValue()', () => {
      test('should set new value1', () => {
        const newValue1 = 40;

        doubleSliderModel.setValue({ val1: newValue1 });

        expect(doubleSliderModel.getValue()[0].value).toBe(newValue1);
      });

      test('should set new value2', () => {
        const newValue2 = 60;

        doubleSliderModel.setValue({ val2: newValue2 });

        expect(doubleSliderModel.getValue()[1].value).toBe(newValue2);
      });

      test('should set both values', () => {
        const newValue1 = 40;
        const newValue2 = 60;

        doubleSliderModel.setValue({
          val1: newValue1,
          val2: newValue2,
        });

        expect(doubleSliderModel.getValue()[0].value).toBe(newValue1);
        expect(doubleSliderModel.getValue()[1].value).toBe(newValue2);
      });

      test('should handle empty object', () => {
        const preValues = doubleSliderModel.getValue();

        doubleSliderModel.setValue({});

        expect(doubleSliderModel.getValue()[0]).toBe(preValues[0]);
        expect(doubleSliderModel.getValue()[1]).toBe(preValues[1]);
      });

      test('should by default convert value to step', () => {
        const newValue1 = -26;
        const newValue2 = 62;

        doubleSliderModel.setValue({ val1: newValue1, val2: newValue2 });

        expect(doubleSliderModel.getValue()[0].value).toBe(-30);
        expect(doubleSliderModel.getValue()[1].value).toBe(60);
      });

      test('should not converted to step value', () => {
        const newValue1 = -26;
        const newValue2 = 62;

        doubleSliderModel.setValue({ val1: newValue1, val2: newValue2 }, false);

        expect(doubleSliderModel.getValue()[0].value).toBe(newValue1);
        expect(doubleSliderModel.getValue()[1].value).toBe(newValue2);
      });

      test('should set value1 no greater then value2', () => {
        const newValue1 = 60;

        doubleSliderModel.setValue({ val1: newValue1 });

        expect(doubleSliderModel.getValue()[0].value)
          .toBeLessThanOrEqual(doubleSliderModel.getValue()[1].value);
      });

      test('should set value1 no less then min', () => {
        const newValue1 = doubleSliderModel.getMin() - 1000;

        doubleSliderModel.setValue({ val1: newValue1 });

        expect(doubleSliderModel.getValue()[0].value)
          .toBeGreaterThanOrEqual(doubleSliderModel.getMin());
      });

      test('should set value2 no less then value1', () => {
        const newValue2 = -25;

        doubleSliderModel.setValue({ val2: newValue2 });

        expect(doubleSliderModel.getValue()[1].value)
          .toBeGreaterThanOrEqual(doubleSliderModel.getValue()[0].value);
      });

      test('should set value2 no greater then max', () => {
        const newValue2 = doubleSliderModel.getMax() + 1000;

        doubleSliderModel.setValue({ val2: newValue2 });

        expect(doubleSliderModel.getValue()[1].value)
          .toBeLessThanOrEqual(doubleSliderModel.getMax());
      });
    });
  });
});
