/* eslint-disable no-param-reassign */
import SliderView from './modules/view';
import ISliderModel from './modules/interfaces';
import SliderController from './modules/controller';
import { DoubleSliderModel, SoloSliderModel } from './modules/model';
import type { Config, ModelConfig } from './modules/custom-types';

(function f($) {
  $.fn.multislider = function MultisliderInit(config: Config) {
    const cfg: Config = {

      minValue: config.minValue ?? 0,
      maxValue: config.maxValue ?? 1000,
      step: config.step ?? 1,
      value1: config.value1 ?? config.minValue,
      value2: config.value2 ?? config.maxValue,

      orientation: config.orientation ?? 'horizontal',
      sliderType: config.sliderType ?? 'solo',

      popUpOfValue: config.popUpOfValue ?? false,
      scaleOfValues: config.scaleOfValues ?? 0,
      isProgressBar: config.isProgressBar ?? true,

      description: config.description ?? 'Range Slider',
    };

    const baseElement: HTMLDivElement = this[0];
    if (this.length === 0) throw new Error('Not found element for initialization');

    if (baseElement.childElementCount) {
      while (baseElement.firstChild) {
        baseElement.removeChild(baseElement.firstChild);
      }
    }

    if (!baseElement.classList.contains('multislider-v43')) {
      baseElement.classList.add('multislider-v43');
    }

    baseElement.classList.remove('multislider-v43_vertical');

    let model: ISliderModel;
    const modelCfg: ModelConfig = {
      min: cfg.minValue,
      max: cfg.maxValue,
      step: cfg.step,
      value1: cfg.value1,
    };

    switch (cfg.sliderType) {
      case 'solo':
        model = new SoloSliderModel(modelCfg);
        break;

      case 'double':
        modelCfg.value2 = cfg.value2;
        model = new DoubleSliderModel(modelCfg);
        break;

      default:
        throw new Error('Undefined type slider');
    }

    const view = new SliderView(model, baseElement, cfg);

    const controller = new SliderController(model, view);

    $.fn.multislider.value = function setValue(values: { val1?: number, val2?: number }) {
      model.setValue({ val1: values.val1, val2: values.val2 });
      return model.getValue();
    };
  };
}(jQuery));
