import SliderView from '../src/multislider-v43/plugin/modules/view';
import ISliderModel from '../src/multislider-v43/plugin/modules/interfaces';
import SliderController from '../src/multislider-v43/plugin/modules/controller';
import { Config, ModelConfig } from '../src/multislider-v43/plugin/modules/custom-types';
import { DoubleSliderModel, SoloSliderModel } from '../src/multislider-v43/plugin/modules/model';

describe('***CONTROLLER***', () => {
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
    value1: cfg.value1 ?? cfg.minValue,
  };

  let model: ISliderModel;
  let view: SliderView;
  let controller: SliderController;

  let update: any; // link on mock

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

    update = SliderView.prototype.update = jest.fn(); // mock

    view = new SliderView(model, parent, cfg);

    controller = new SliderController(model, view);
  });

  test('should emit event update view on value changing', () => {
    const calls = update.mock.calls.length;

    model.emit('valueChanged', {
      val1: modelConfig.value1,
      val2: modelConfig.value2,
    });

    expect(update.mock.calls.length - calls).toBe(1);
  });

  test('should emit event update view on resize window', () => {
    const calls = update.mock.calls.length;

    window.dispatchEvent(new Event('resize'));

    expect(update.mock.calls.length - calls).toBe(1);
  });

  test('should emit event update view on DOM content loaded', () => {
    const calls = update.mock.calls.length;

    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(update.mock.calls.length - calls).toBe(1);
  });

  test('should emit event on change value in field output value', () => {
    const calls = update.mock.calls.length;

    view.outputValues.forEach((item) => {
      item.dispatchEvent(new Event('change'));
    });

    expect(update.mock.calls.length - calls).toBe(view.outputValues.length);
  });

  test('should emit event on click to scale division', () => {
    const calls = update.mock.calls.length;

    view.sliderScale.forEach((item) => {
      item.dispatchEvent(new Event('click', { bubbles: true }));
    });

    expect(update.mock.calls.length - calls).toBe(view.sliderScale.length);
  });

  test('should emit event on moving after pointed down', () => {
    const calls = update.mock.calls.length;

    view.sliderThumbs.forEach((item) => {
      item.dispatchEvent(new Event('pointerdown'));
      document.dispatchEvent(new Event('pointermove'));
      document.dispatchEvent(new Event('pointerup'));
    });

    expect(update.mock.calls.length - calls).toBe(view.sliderThumbs.length);
  });
});
