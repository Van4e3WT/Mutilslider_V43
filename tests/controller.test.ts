import SliderView from '../src/multislider-v43/plugin/modules/view/view';
import ISliderModel from '../src/multislider-v43/plugin/modules/interfaces';
import SliderController from '../src/multislider-v43/plugin/modules/controller';
import { Config, ModelConfig } from '../src/multislider-v43/plugin/modules/custom-types';
import SoloSliderModel from '../src/multislider-v43/plugin/modules/models/solo-model';
import DoubleSliderModel from '../src/multislider-v43/plugin/modules/models/double-model';

describe('***CONTROLLER***', () => {
  describe('Horizontal', () => {
    const cfg: Config = {

      minValue: 0,
      maxValue: 1000,
      step: 1,
      value1: 25,
      value2: 75,

      orientation: 'horizontal',
      sliderType: 'double',

      popUpOfValue: false,
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
    let view: SliderView;
    let controller: SliderController;

    let updateMock: any;

    beforeEach(() => {
      switch (cfg.sliderType) {
        case 'solo':
          model = new SoloSliderModel(modelConfig);
          break;

        case 'double':
          modelConfig.value2 = cfg.value2 ?? cfg.maxValue;
          model = new DoubleSliderModel(modelConfig);
          break;

        default:
          throw new Error('Undefined type slider');
      }

      const parent = document.createElement('div');

      SliderView.prototype.update = jest.fn();
      updateMock = SliderView.prototype.update;

      view = new SliderView(model.getValue(), parent, cfg);

      controller = new SliderController(model, view);
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

      view.outputs.getValues().forEach((item) => {
        item.dispatchEvent(new Event('change'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.outputs.getValues().length);
    });

    test('should emit event on click to scale division', () => {
      const calls = updateMock.mock.calls.length;

      view.sliderScale.forEach((item) => {
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(updateMock).toBeCalledTimes(calls + view.sliderScale.length);
    });

    test('should emit event on moving after pointed down', () => {
      const calls = updateMock.mock.calls.length;

      view.sliderThumbs.forEach((item) => {
        item.dispatchEvent(new Event('pointerdown'));
        document.dispatchEvent(new Event('pointermove'));
        document.dispatchEvent(new Event('pointerup'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.sliderThumbs.length);
    });
  });
  describe('Vertical', () => {
    const cfg: Config = {

      minValue: 0,
      maxValue: 100,
      step: 1,
      value1: 5,

      orientation: 'vertical',
      sliderType: 'solo',

      popUpOfValue: false,
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
    let view: SliderView;
    let controller: SliderController;

    let updateMock: any;

    beforeEach(() => {
      switch (cfg.sliderType) {
        case 'solo':
          model = new SoloSliderModel(modelConfig);
          break;

        case 'double':
          modelConfig.value2 = cfg.value2 ?? cfg.maxValue;
          model = new DoubleSliderModel(modelConfig);
          break;

        default:
          throw new Error('Undefined type slider');
      }

      const parent = document.createElement('div');

      SliderView.prototype.update = jest.fn();
      updateMock = SliderView.prototype.update;

      view = new SliderView(model.getValue(), parent, cfg);

      controller = new SliderController(model, view);
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

      view.outputs.getValues().forEach((item) => {
        item.dispatchEvent(new Event('change'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.outputs.getValues().length);
    });

    test('should emit event on click to scale division', () => {
      const calls = updateMock.mock.calls.length;

      view.sliderScale.forEach((item) => {
        item.dispatchEvent(new Event('click', { bubbles: true }));
      });

      expect(updateMock).toBeCalledTimes(calls + view.sliderScale.length);
    });

    test('should emit event on moving after pointed down', () => {
      const calls = updateMock.mock.calls.length;

      view.sliderThumbs.forEach((item) => {
        item.dispatchEvent(new Event('pointerdown'));
        document.dispatchEvent(new Event('pointermove'));
        document.dispatchEvent(new Event('pointerup'));
      });

      expect(updateMock).toBeCalledTimes(calls + view.sliderThumbs.length);
    });
  });
});
