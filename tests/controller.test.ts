import View from '../src/multislider-v43/plugin/modules/view/View';
import SliderController from '../src/multislider-v43/plugin/modules/controller/SliderController';
import type { Config, ModelConfig } from '../src/multislider-v43/plugin/modules/utils/custom-types';
import SoloSliderModel from '../src/multislider-v43/plugin/modules/models/SoloSliderModel';
import ISliderModel from '../src/multislider-v43/plugin/modules/models/interfaces/ISliderModel';
import DoubleSliderModel from '../src/multislider-v43/plugin/modules/models/DoubleSliderModel';

describe('***CONTROLLER***', () => {
  describe('Horizontal', () => {
    const cfg: Config = {

      minValue: 0,
      maxValue: 1000,
      step: 1,
      value1: 25,
      value2: 75,

      isVertical: false,
      isRange: true,

      tooltipOfValue: false,
      scaleOfValues: 3,
      isProgressBar: true,

      description: 'Range Slider',
    };
    const modelConfig: ModelConfig = {
      min: cfg.minValue,
      max: cfg.maxValue,
      step: cfg.step,
      value1: cfg.value1,
    };

    let model: ISliderModel;
    let view: View;
    let controller: SliderController;

    let updateMock: jest.Mock;

    beforeEach(() => {
      if (cfg.isRange) {
        modelConfig.value2 = cfg.value2 ?? cfg.maxValue;
        model = new DoubleSliderModel(modelConfig);
      } else {
        model = new SoloSliderModel(modelConfig);
      }

      const parent = document.createElement('div');

      View.prototype.update = jest.fn();
      updateMock = View.prototype.update as jest.Mock;

      view = new View({
        values: model.getValue(),
        parent,
        cfg,
        selector: 'multislider-v43',
      });

      controller = new SliderController({
        model,
        view,
      });
      controller.initListeners();
    });

    test('should emit event update view on value changing', () => {
      const calls = updateMock.mock.calls.length;

      model.emit('valueChanged', {
        val1: modelConfig.value1,
        val2: modelConfig.value2,
      });

      expect(updateMock).toBeCalledTimes(calls + 1);
    });

    test('should emit event on change value in field output value', () => {
      const calls = updateMock.mock.calls.length;

      view.outputs.getIOInputs().forEach((item, i) => {
        view.outputs.setIO(i, 0);
        item.dispatchEvent(new Event('change'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.outputs.getIOInputs().length);
    });

    test('should emit event on click to scale division', () => {
      const calls = updateMock.mock.calls.length;

      view.scale.getScaleDivisions().forEach((item) => {
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(updateMock).toBeCalledTimes(calls + view.scale.getScaleDivisions().length);
    });

    test('should emit event on moving after pointed down', () => {
      const calls = updateMock.mock.calls.length;

      for (let i = 0; i < view.thumbs.getLength(); i += 1) {
        view.thumbs.getThumb(i).dispatchEvent(new Event('pointerdown'));
        document.dispatchEvent(new Event('pointermove'));
        document.dispatchEvent(new Event('pointerup'));
      }

      expect(updateMock).toBeCalledTimes(calls + view.thumbs.getLength());
    });
  });
  describe('Vertical', () => {
    const cfg: Config = {

      minValue: 0,
      maxValue: 100,
      step: 1,
      value1: 5,

      isVertical: true,
      isRange: false,

      tooltipOfValue: false,
      scaleOfValues: 0,
      isProgressBar: false,

      description: 'Range Slider',
    };
    const modelConfig: ModelConfig = {
      min: cfg.minValue,
      max: cfg.maxValue,
      step: cfg.step,
      value1: cfg.value1,
    };

    let model: ISliderModel;
    let view: View;
    let controller: SliderController;

    let updateMock: jest.Mock;

    beforeEach(() => {
      if (cfg.isRange) {
        modelConfig.value2 = cfg.value2 ?? cfg.maxValue;
        model = new DoubleSliderModel(modelConfig);
      } else {
        model = new SoloSliderModel(modelConfig);
      }

      const parent = document.createElement('div');

      View.prototype.update = jest.fn();
      updateMock = View.prototype.update as jest.Mock;

      view = new View({
        values: model.getValue(),
        parent,
        cfg,
        selector: 'multislider-v43',
      });

      controller = new SliderController({
        model,
        view,
      });
      controller.initListeners();
    });

    test('should emit event update view on value changing', () => {
      const calls = updateMock.mock.calls.length;

      model.emit('valueChanged', {
        val1: modelConfig.value1,
      });

      expect(updateMock).toBeCalledTimes(calls + 1);
    });

    test('should emit event on change value in field output value', () => {
      const calls = updateMock.mock.calls.length;

      view.outputs.getIOInputs().forEach((item, i) => {
        view.outputs.setIO(i, 0);
        item.dispatchEvent(new Event('change'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.outputs.getIOInputs().length);
    });

    test('should emit event on click to scale division', () => {
      const calls = updateMock.mock.calls.length;

      view.scale.getScaleDivisions().forEach((item) => {
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(updateMock).toBeCalledTimes(calls + view.scale.getScaleDivisions().length);
    });

    test('should emit event on moving after pointed down', () => {
      const calls = updateMock.mock.calls.length;

      for (let i = 0; i < view.thumbs.getLength(); i += 1) {
        view.thumbs.getThumb(i).dispatchEvent(new Event('pointerdown'));
        document.dispatchEvent(new Event('pointermove'));
        document.dispatchEvent(new Event('pointerup'));
      }

      expect(updateMock).toBeCalledTimes(calls + view.thumbs.getLength());
    });
  });
});
