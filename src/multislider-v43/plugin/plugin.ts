/* eslint-disable no-param-reassign */

import SliderView from './modules/view/view';
import SliderController from './modules/controller/controller';
import SoloSliderModel from './modules/models/solo-model';
import DoubleSliderModel from './modules/models/double-model';
import { Config, ModelConfig } from './modules/utils/custom-types';
import ISliderModel from './modules/models/interfaces/interfaces';

(function f($) {
  $.fn.multislider = function multisliderInit(config: Config) {
    const cfg: Config = {
      minValue: config.minValue ?? 0,
      maxValue: config.maxValue ?? 1000,

      step: config.step ?? 1,

      value1: config.value1 ?? config.minValue,
      value2: config.value2 ?? config.maxValue,

      orientation: config.orientation ?? 'horizontal',
      sliderType: config.sliderType ?? 'solo',

      popUpOfValue: config.popUpOfValue ?? false,
      popUpIsHided: config.popUpIsHided ?? true,
      scaleOfValues: config.scaleOfValues ?? 0,
      isProgressBar: config.isProgressBar ?? true,

      postfix: config.postfix,
      description: config.description ?? 'Range Slider',
      localeProps: config.localeProps,
    };

    if (this.length === 0) {
      throw new Error('Not found element for initialization');
    }

    const baseElement: HTMLDivElement = this[0];

    if (baseElement.childElementCount) {
      while (baseElement.firstChild) {
        baseElement.removeChild(baseElement.firstChild);
      }
    }

    baseElement.classList.remove('multislider-v43_vertical');
    baseElement.classList.add('multislider-v43');

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

    const view = new SliderView(model.getValue(), baseElement, cfg);

    const controller = new SliderController(model, view);
    controller.initListeners();

    $.fn.multislider.value = function setValue(values: { val1?: number, val2?: number }) {
      model.setValue({ val1: values.val1, val2: values.val2 });

      return model.getValue();
    };
  };
}(jQuery));
