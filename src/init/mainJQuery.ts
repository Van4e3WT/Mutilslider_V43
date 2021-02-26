/* eslint-disable no-param-reassign */
import type { Config, ModelConfig } from './modules/customTypes';
import { DoubleSliderModel, SoloSliderModel } from './modules/model';
import { ISliderModel } from './modules/interfaces';
import SliderView from './modules/view';
import SliderController from './modules/controller';

(function f($) {
  $.fn.multislider = function fMultislider(config: Config) {
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

    const el: HTMLDivElement = this[0];
    if (this.length === 0) throw new Error('Not found element for initialization');

    if (el.childElementCount) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    if (!el.classList.contains('multislider-v43')) {
      el.classList.add('multislider-v43');
    }

    el.classList.remove('vertical-v43');

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

    const view = new SliderView(model, el, cfg);

    const controller = new SliderController(model, view);

    $.fn.multislider.value = function fValue(values: { val1?: number, val2?: number }) {
      model.setValue({ val1: values.val1, val2: values.val2 });
      return model.getValue();
    };
  };
}(jQuery));
