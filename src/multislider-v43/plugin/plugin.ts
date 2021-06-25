/* eslint-disable no-param-reassign */

import Utils from './modules/utils/utils';
import SliderView from './modules/view/view';
import SliderController from './modules/controller/controller';
import SoloSliderModel from './modules/models/solo-model';
import DoubleSliderModel from './modules/models/double-model';
import { Config, ModelConfig } from './modules/utils/custom-types';
import ISliderModel from './modules/models/interfaces/interfaces';

(function f($) {
  $.fn.multislider = function multisliderInit(props: Config) {
    const config = Utils.validationConfig(props);

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
      min: config.minValue,
      max: config.maxValue,
      step: config.step,
      value1: config.value1,
    };

    switch (config.sliderType) {
      case 'solo':
        model = new SoloSliderModel(modelCfg);
        break;

      case 'double':
        modelCfg.value2 = config.value2;
        model = new DoubleSliderModel(modelCfg);
        break;

      default:
        throw new Error('Undefined type slider');
    }

    const view = new SliderView(model.getValue(), baseElement, config);

    const controller = new SliderController(model, view);
    controller.initListeners();

    $.fn.multislider.value = (values: { val1?: number, val2?: number }) => {
      if (values) {
        model.setValue({ val1: values.val1, val2: values.val2 });
      }

      return model.getValue();
    };

    $.fn.multislider.onChange = (callback: Function, ...args) => {
      model.on('valueChanged', callback.bind(this, ...args));
    };
  };
}(jQuery));
